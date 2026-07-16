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
  console.error("[ERROR]", err.message);

  const statusCode = (err as any).statusCode || 500;
  res.status(statusCode).json({
    error: err.message || "Erro interno do servidor.",
  });
}
