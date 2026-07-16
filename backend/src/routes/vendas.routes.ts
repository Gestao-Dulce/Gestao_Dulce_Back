import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// ─── Schemas de validação ────────────────────────────────────────────────────

const itemSchema = z.object({
  produto: z.string().min(1, "Produto é obrigatório"),
  quantidade: z.number().positive("Quantidade deve ser positiva"),
  valor_unitario: z.number().min(0, "Valor unitário inválido"),
  unidade: z.string().default("unidade"),
});

const vendaSchema = z.object({
  cliente_id: z.string().uuid("ID do cliente inválido"),
  forma_pagamento: z.enum(["dinheiro", "pix", "cartao", "boleto", "faturado"]).default("pix"),
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  data_pagamento: z.string().nullable().optional(),
  status_pagamento: z.enum(["pago", "pendente"]).default("pendente"),
  nota_fiscal: z.string().nullable().optional(),
  desconto: z.number().min(0).default(0),
  itens: z.array(itemSchema).min(1, "Adicione ao menos um item"),
});

// ─── GET /api/vendas — Lista com clientes e itens ────────────────────────────

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("vendas")
      .select("*, clientes(nome), venda_itens(*)")
      .order("data", { ascending: false })
      .limit(300);

    if (error) throw new Error(error.message);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/vendas/produtos-usados — Nomes de produtos distintos ───────────

router.get(
  "/produtos-usados",
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const { data } = await supabase
        .from("venda_itens")
        .select("produto")
        .order("produto");

      const unique = Array.from(
        new Set((data ?? []).map((r: any) => r.produto).filter(Boolean))
      );
      res.json(unique);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── POST /api/vendas — Criar venda + itens ──────────────────────────────────

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = vendaSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const v = parsed.data;

    const subtotal = v.itens.reduce(
      (s, i) => s + i.quantidade * i.valor_unitario,
      0
    );
    const valorTotal = Math.max(0, subtotal - v.desconto);

    const payload = {
      cliente_id: v.cliente_id,
      forma_pagamento: v.forma_pagamento,
      data: v.data,
      data_pagamento: v.data_pagamento || null,
      status_pagamento: v.status_pagamento,
      nota_fiscal: v.nota_fiscal || null,
      desconto: v.desconto,
      valor_total: valorTotal,
      produto: v.itens[0].produto,
      quantidade: v.itens.reduce((s, i) => s + i.quantidade, 0),
      valor_unitario: v.itens[0].valor_unitario,
    };

    const { data: venda, error } = await supabase
      .from("vendas")
      .insert(payload)
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    const itensPayload = v.itens.map((i) => ({
      venda_id: venda.id,
      produto: i.produto,
      quantidade: i.quantidade,
      valor_unitario: i.valor_unitario,
      unidade: i.unidade,
    }));

    const { error: e2 } = await supabase
      .from("venda_itens")
      .insert(itensPayload);

    if (e2) throw new Error(e2.message);

    res.status(201).json({ id: venda.id, valor_total: valorTotal });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PUT /api/vendas/:id — Atualizar venda (delete + re-insert itens) ────────

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = vendaSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const v = parsed.data;
    const id = req.params.id;

    const subtotal = v.itens.reduce(
      (s, i) => s + i.quantidade * i.valor_unitario,
      0
    );
    const valorTotal = Math.max(0, subtotal - v.desconto);

    const payload = {
      cliente_id: v.cliente_id,
      forma_pagamento: v.forma_pagamento,
      data: v.data,
      data_pagamento: v.data_pagamento || null,
      status_pagamento: v.status_pagamento,
      nota_fiscal: v.nota_fiscal || null,
      desconto: v.desconto,
      valor_total: valorTotal,
      produto: v.itens[0].produto,
      quantidade: v.itens.reduce((s, i) => s + i.quantidade, 0),
      valor_unitario: v.itens[0].valor_unitario,
    };

    const { error } = await supabase
      .from("vendas")
      .update(payload)
      .eq("id", id);

    if (error) throw new Error(error.message);

    // Remove itens antigos e re-insere
    await supabase.from("venda_itens").delete().eq("venda_id", id);

    const itensPayload = v.itens.map((i) => ({
      venda_id: id,
      produto: i.produto,
      quantidade: i.quantidade,
      valor_unitario: i.valor_unitario,
      unidade: i.unidade,
    }));

    const { error: e2 } = await supabase
      .from("venda_itens")
      .insert(itensPayload);

    if (e2) throw new Error(e2.message);

    res.json({ success: true, valor_total: valorTotal });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /api/vendas/:id — Excluir venda e itens ──────────────────────────

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    // Itens são deletados em cascata pela FK, mas deleta explicitamente por segurança
    await supabase.from("venda_itens").delete().eq("venda_id", id);

    const { error } = await supabase.from("vendas").delete().eq("id", id);
    if (error) throw new Error(error.message);

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PATCH /api/vendas/:id/pagar — Marcar como pago ─────────────────────────

router.patch(
  "/:id/pagar",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = await supabase
        .from("vendas")
        .update({ status_pagamento: "pago" })
        .eq("id", req.params.id);

      if (error) throw new Error(error.message);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
