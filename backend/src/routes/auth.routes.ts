import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { supabase } from "../config/supabase.js";
import { generateToken } from "../middleware/auth.js";

const router = Router();

// ─── Schemas de validação ────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().min(1, "Login é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

const changePasswordSchema = z.object({
  email: z.string().min(1),
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6, "A nova senha deve ter no mínimo 6 caracteres"),
});

const setFirstPasswordSchema = z.object({
  email: z.string().min(1),
  newPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// ─── POST /api/auth/login ────────────────────────────────────────────────────

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const { email, password } = parsed.data;

    // Garante que o admin padrão existe
    const { data: existing } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", "admin")
      .maybeSingle();

    if (!existing) {
      const adminHash = await bcrypt.hash("Doceslucelian$2026", 12);
      await supabase
        .from("usuarios")
        .insert({ email: "admin", senha_hash: adminHash });
    }

    // Busca o usuário
    const { data: user, error } = await supabase
      .from("usuarios")
      .select("id, email, senha_hash")
      .eq("email", email)
      .maybeSingle();

    if (error || !user) {
      res
        .status(401)
        .json({ error: "Credenciais inválidas. Verifique seu login e senha." });
      return;
    }

    // Senha nula → primeiro acesso
    if (!user.senha_hash) {
      res.json({
        id: user.id,
        email: user.email,
        isAdmin: user.email === "admin",
        needsPasswordSetup: true,
        token: null,
      });
      return;
    }

    const valid = await bcrypt.compare(password, user.senha_hash);
    if (!valid) {
      res
        .status(401)
        .json({ error: "Credenciais inválidas. Verifique seu login e senha." });
      return;
    }

    const authUser = {
      id: user.id,
      email: user.email,
      isAdmin: user.email === "admin",
    };

    const token = generateToken(authUser);

    res.json({
      ...authUser,
      needsPasswordSetup: false,
      token,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/auth/change-password ──────────────────────────────────────────

router.post(
  "/change-password",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = changePasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error.errors[0].message });
        return;
      }
      const { email, currentPassword, newPassword } = parsed.data;

      const { data: user } = await supabase
        .from("usuarios")
        .select("id, senha_hash")
        .eq("email", email)
        .maybeSingle();

      if (!user || !user.senha_hash) {
        res
          .status(404)
          .json({ error: "Usuário não encontrado ou sem senha definida." });
        return;
      }

      const valid = await bcrypt.compare(currentPassword, user.senha_hash);
      if (!valid) {
        res
          .status(401)
          .json({ error: "Senha atual incorreta. Verifique e tente novamente." });
        return;
      }

      const newHash = await bcrypt.hash(newPassword, 12);
      const { error } = await supabase
        .from("usuarios")
        .update({ senha_hash: newHash })
        .eq("id", user.id);

      if (error) throw new Error(error.message);

      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── POST /api/auth/set-first-password ───────────────────────────────────────

router.post(
  "/set-first-password",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = setFirstPasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error.errors[0].message });
        return;
      }
      const { email, newPassword } = parsed.data;

      const { data: user } = await supabase
        .from("usuarios")
        .select("id, email, senha_hash")
        .eq("email", email)
        .maybeSingle();

      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado." });
        return;
      }

      if (user.senha_hash) {
        res.status(400).json({
          error: "Este usuário já possui senha. Use a opção 'Alterar Senha'.",
        });
        return;
      }

      const newHash = await bcrypt.hash(newPassword, 12);
      const { error } = await supabase
        .from("usuarios")
        .update({ senha_hash: newHash })
        .eq("id", user.id);

      if (error) throw new Error(error.message);

      const authUser = {
        id: user.id,
        email: user.email,
        isAdmin: user.email === "admin",
      };

      const token = generateToken(authUser);

      res.json({
        ...authUser,
        needsPasswordSetup: false,
        token,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
