import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import vendasRoutes from "./routes/vendas.routes.js";
import produtosRoutes from "./routes/produtos.routes.js";
import contasRoutes from "./routes/contas.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// ─── Security headers (helmet) ───────────────────────────────────────────────

app.use(helmet());

// ─── CORS ────────────────────────────────────────────────────────────────────
// Origens permitidas: localhost (dev) + qualquer domínio definido em ALLOWED_ORIGINS
// Formato ALLOWED_ORIGINS: lista separada por vírgula
//   Ex: ALLOWED_ORIGINS=https://app.doceslucelian.com.br,https://gestao.lucelian.com.br

const allowedOriginsEnv = process.env.ALLOWED_ORIGINS ?? "";
const extraOrigins = allowedOriginsEnv
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Sem origin (Postman, curl, SSR) ou localhost → permite
      if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      // Origens configuradas via env → permite
      if (extraOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`Origem não permitida pelo CORS: ${origin}`));
    },
    credentials: true,
  })
);

// ─── Body parsing ─────────────────────────────────────────────────────────────

app.use(express.json({ limit: "10mb" }));

// ─── Rate limiting — rotas de autenticação ───────────────────────────────────
// Máximo de 10 tentativas por IP a cada 1 minuto nas rotas de auth

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Muitas tentativas. Aguarde 1 minuto e tente novamente." },
});

// ─── Health check ────────────────────────────────────────────────────────────

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Gestão Dulce — Backend API",
  });
});

// ─── Rotas da API ────────────────────────────────────────────────────────────

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/vendas", vendasRoutes);
app.use("/api/produtos", produtosRoutes);
app.use("/api/contas", contasRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);

// ─── Error handler global ───────────────────────────────────────────────────

app.use(errorHandler);

export default app;
