import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// ─── Schema de validação ─────────────────────────────────────────────────────

const contaSchema = z.object({
  categoria: z.enum(["fornecedor", "folha_pagamento", "outros"]).default("fornecedor"),
  fornecedor: z.string().trim().min(1, "Fornecedor é obrigatório"),
  descricao: z.string().trim().nullable().optional(),
  vencimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Vencimento inválido"),
  valor: z.number().positive("Valor deve ser maior que zero"),
  funcionario_nome: z.string().trim().nullable().optional(),
  funcionario_cargo: z.string().trim().nullable().optional(),
  funcionario_documento: z.string().trim().nullable().optional(),
  recorrente: z.boolean().default(false),
});

const statusSchema = z.object({
  status: z.enum(["pendente", "pago"]),
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function addMeses(meses: number, base: string): string {
  const d = new Date(base);
  d.setMonth(d.getMonth() + meses);
  return d.toISOString().slice(0, 10);
}

function quintoDiaUtil(year: number, month: number): string {
  let count = 0;
  for (let d = 1; d <= 31; d++) {
    const dt = new Date(year, month, d);
    if (dt.getMonth() !== month) break;
    const wd = dt.getDay();
    if (wd !== 0 && wd !== 6) {
      count++;
      if (count === 5) {
        const mm = String(month + 1).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        return `${year}-${mm}-${dd}`;
      }
    }
  }
  return "";
}

function hoje(): string {
  return new Date().toISOString().slice(0, 10);
}

// ─── GET /api/contas ─────────────────────────────────────────────────────────

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("contas_a_pagar")
      .select("*")
      .order("vencimento");

    if (error) throw new Error(error.message);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/contas ────────────────────────────────────────────────────────

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = contaSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const v = parsed.data;

    const payload = {
      categoria: v.categoria,
      fornecedor: v.fornecedor,
      descricao: v.descricao || null,
      vencimento: v.vencimento,
      valor: v.valor,
      funcionario_nome: v.categoria === "folha_pagamento" ? (v.funcionario_nome || null) : null,
      funcionario_cargo: v.categoria === "folha_pagamento" ? (v.funcionario_cargo || null) : null,
      funcionario_documento: v.categoria === "folha_pagamento" ? (v.funcionario_documento || null) : null,
      recorrente: v.recorrente,
    };

    const { data, error } = await supabase
      .from("contas_a_pagar")
      .insert(payload)
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PUT /api/contas/:id ─────────────────────────────────────────────────────

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = contaSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const v = parsed.data;

    const payload = {
      categoria: v.categoria,
      fornecedor: v.fornecedor,
      descricao: v.descricao || null,
      vencimento: v.vencimento,
      valor: v.valor,
      funcionario_nome: v.categoria === "folha_pagamento" ? (v.funcionario_nome || null) : null,
      funcionario_cargo: v.categoria === "folha_pagamento" ? (v.funcionario_cargo || null) : null,
      funcionario_documento: v.categoria === "folha_pagamento" ? (v.funcionario_documento || null) : null,
      recorrente: v.recorrente,
    };

    const { error } = await supabase
      .from("contas_a_pagar")
      .update(payload)
      .eq("id", req.params.id);

    if (error) throw new Error(error.message);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /api/contas/:id ──────────────────────────────────────────────────

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = await supabase
      .from("contas_a_pagar")
      .delete()
      .eq("id", req.params.id);

    if (error) throw new Error(error.message);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PATCH /api/contas/:id/status — Alterar status (pago/pendente) ───────────

router.patch(
  "/:id/status",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = statusSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error.errors[0].message });
        return;
      }

      const { error } = await supabase
        .from("contas_a_pagar")
        .update({ status: parsed.data.status })
        .eq("id", req.params.id);

      if (error) throw new Error(error.message);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── POST /api/contas/:id/pagar-recorrente — Pagar + avançar ────────────────

router.post(
  "/:id/pagar-recorrente",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { data: conta, error: fetchErr } = await supabase
        .from("contas_a_pagar")
        .select("*")
        .eq("id", req.params.id)
        .single();

      if (fetchErr || !conta) {
        res.status(404).json({ error: "Conta não encontrada." });
        return;
      }

      // Clone como pago
      const { error: e1 } = await supabase.from("contas_a_pagar").insert({
        categoria: conta.categoria,
        fornecedor: conta.fornecedor,
        descricao: conta.descricao,
        vencimento: conta.vencimento,
        valor: conta.valor,
        funcionario_nome: conta.funcionario_nome,
        funcionario_cargo: conta.funcionario_cargo,
        funcionario_documento: conta.funcionario_documento,
        recorrente: false,
        status: "pago",
      });
      if (e1) throw new Error(e1.message);

      // Avança o original para o próximo mês
      let proxima = addMeses(1, conta.vencimento);
      if (conta.categoria === "folha_pagamento") {
        const d = new Date(proxima);
        const q = quintoDiaUtil(d.getUTCFullYear(), d.getUTCMonth());
        if (q) proxima = q;
      }

      const { error: e2 } = await supabase
        .from("contas_a_pagar")
        .update({ vencimento: proxima })
        .eq("id", req.params.id);

      if (e2) throw new Error(e2.message);

      res.json({ success: true, proximoVencimento: proxima });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── PATCH /api/contas/:id/finalizar-recorrencia ─────────────────────────────

router.patch(
  "/:id/finalizar-recorrencia",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = await supabase
        .from("contas_a_pagar")
        .update({ finalizado_em: hoje() })
        .eq("id", req.params.id);

      if (error) throw new Error(error.message);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
