import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// ─── Schema de validação ─────────────────────────────────────────────────────

const produtoSchema = z.object({
  nome: z.string().trim().min(1, "Informe o nome do produto"),
  observacao: z.string().trim().nullable().optional(),
  unidade: z.enum(["unidade", "kg", "caixa"]).default("unidade"),
  valor: z.number().min(0).default(0),
});

// ─── GET /api/produtos ───────────────────────────────────────────────────────

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .order("nome");

    if (error) throw new Error(error.message);
    res.json(data ?? []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/produtos ─────────────────────────────────────────────────────

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = produtoSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const v = parsed.data;

    const { data, error } = await supabase
      .from("produtos")
      .insert({
        nome: v.nome,
        observacao: v.observacao || null,
        unidade: v.unidade,
        valor: v.valor,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PUT /api/produtos/:id ──────────────────────────────────────────────────

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = produtoSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const v = parsed.data;

    const { error } = await supabase
      .from("produtos")
      .update({
        nome: v.nome,
        observacao: v.observacao || null,
        unidade: v.unidade,
        valor: v.valor,
      })
      .eq("id", req.params.id);

    if (error) throw new Error(error.message);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /api/produtos/:id ───────────────────────────────────────────────

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = await supabase
      .from("produtos")
      .delete()
      .eq("id", req.params.id);

    if (error) throw new Error(error.message);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
