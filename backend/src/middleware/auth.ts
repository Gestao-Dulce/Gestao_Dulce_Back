import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

/**
 * Middleware que exige autenticação via Bearer JWT.
 * Popula req.user com { id, email, isAdmin }.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token de autenticação não fornecido." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
    };
    next();
  } catch {
    res.status(401).json({ error: "Token inválido ou expirado." });
    return;
  }
}

/**
 * Middleware adicional que exige isAdmin = true.
 * Deve ser usado APÓS requireAuth.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user?.isAdmin) {
    res.status(403).json({ error: "Acesso restrito ao administrador." });
    return;
  }
  next();
}

export function generateToken(user: AuthUser): string {
  const expiresIn = (process.env.JWT_EXPIRES_IN || "24h") as jwt.SignOptions["expiresIn"];
  return jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    JWT_SECRET,
    { expiresIn }
  );
}
