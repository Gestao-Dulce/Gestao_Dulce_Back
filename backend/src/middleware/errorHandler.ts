import { Request, Response, NextFunction } from "express";

/**
 * Tratamento global de erros — retorna JSON padronizado.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("[ERROR]", err.stack || err.message);

  const statusCode = (err as any).statusCode || 500;
  const isProd = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    error: isProd && statusCode === 500 ? "Erro interno do servidor." : (err.message || "Erro interno do servidor."),
  });
}

