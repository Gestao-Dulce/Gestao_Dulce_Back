import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { supabase } from "../config/supabase.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Todas as rotas exigem autenticação + admin
router.use(requireAuth);
router.use(requireAdmin);

// ─── Schema de validação ─────────────────────────────────────────────────────

const createUserSchema = z.object({
  email: z.string().min(1, "Login é obrigatório"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// ─── GET /api/usuarios — Lista todos ─────────────────────────────────────────

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("id, email, created_at")
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    res.json(data ?? []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/usuarios — Criar usuário ──────────────────────────────────────

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const { email, password } = parsed.data;

    // Verifica duplicata
    const { data: existing } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      res.status(409).json({ error: "Já existe um usuário com este login." });
      return;
    }

    const senha_hash = await bcrypt.hash(password, 12);
    const { error } = await supabase
      .from("usuarios")
      .insert({ email, senha_hash });

    if (error) throw new Error(error.message);
    res.status(201).json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /api/usuarios/:id — Excluir usuário ──────────────────────────────

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    // Não permite excluir o admin
    const { data: user } = await supabase
      .from("usuarios")
      .select("email")
      .eq("id", req.params.id)
      .maybeSingle();

    if (user?.email === "admin") {
      res
        .status(403)
        .json({ error: "O usuário administrador não pode ser excluído." });
      return;
    }

    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", req.params.id);

    if (error) throw new Error(error.message);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PATCH /api/usuarios/:id/reset-password — Limpar senha ──────────────────

router.patch(
  "/:id/reset-password",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { data: user } = await supabase
        .from("usuarios")
        .select("email")
        .eq("id", req.params.id)
        .maybeSingle();

      if (user?.email === "admin") {
        res.status(403).json({
          error: "Não é possível limpar a senha do administrador principal.",
        });
        return;
      }

      const { error } = await supabase
        .from("usuarios")
        .update({ senha_hash: null })
        .eq("id", req.params.id);

      if (error) throw new Error(error.message);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
