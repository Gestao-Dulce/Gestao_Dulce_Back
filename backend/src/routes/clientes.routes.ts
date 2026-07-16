import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Todas as rotas exigem autenticação
router.use(requireAuth);

// ─── Schema de validação ─────────────────────────────────────────────────────

const clienteSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  cpf_cnpj: z.string().trim().max(20).optional().or(z.literal("")),
  contato: z.string().trim().max(60).optional().or(z.literal("")),
  localizacao: z.string().trim().max(120).optional().or(z.literal("")),
  cep: z.string().trim().max(10).optional().or(z.literal("")),
  rua: z.string().trim().max(160).optional().or(z.literal("")),
  numero: z.string().trim().max(20).optional().or(z.literal("")),
  bairro: z.string().trim().max(120).optional().or(z.literal("")),
  cidade: z.string().trim().max(120).optional().or(z.literal("")),
});

// ─── GET /api/clientes — Lista com vendas agregadas ──────────────────────────

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("clientes")
      .select("*, vendas(valor_total, status_pagamento, data_pagamento)")
      .order("nome");

    if (error) throw new Error(error.message);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/clientes/select — Lista simplificada para selects ──────────────

router.get("/select", async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("clientes")
      .select("id, nome")
      .order("nome");

    if (error) throw new Error(error.message);
    res.json(data ?? []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/clientes — Criar ─────────────────────────────────────────────

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = clienteSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const v = parsed.data;

    const payload = {
      nome: v.nome,
      cpf_cnpj: v.cpf_cnpj || null,
      contato: v.contato || null,
      localizacao: v.localizacao || null,
      cep: v.cep || null,
      rua: v.rua || null,
      numero: v.numero || null,
      bairro: v.bairro || null,
      cidade: v.cidade || null,
    };

    const { data, error } = await supabase
      .from("clientes")
      .insert(payload)
      .select("id, nome")
      .single();

    if (error) throw new Error(error.message);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PUT /api/clientes/:id — Atualizar ──────────────────────────────────────

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = clienteSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const v = parsed.data;

    const payload = {
      nome: v.nome,
      cpf_cnpj: v.cpf_cnpj || null,
      contato: v.contato || null,
      localizacao: v.localizacao || null,
      cep: v.cep || null,
      rua: v.rua || null,
      numero: v.numero || null,
      bairro: v.bairro || null,
      cidade: v.cidade || null,
    };

    const { error } = await supabase
      .from("clientes")
      .update(payload)
      .eq("id", req.params.id);

    if (error) throw new Error(error.message);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /api/clientes/:id — Excluir ──────────────────────────────────────

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = await supabase
      .from("clientes")
      .delete()
      .eq("id", req.params.id);

    if (error) throw new Error(error.message);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
