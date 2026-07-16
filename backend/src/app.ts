import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import vendasRoutes from "./routes/vendas.routes.js";
import produtosRoutes from "./routes/produtos.routes.js";
import contasRoutes from "./routes/contas.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// ─── Middlewares globais ─────────────────────────────────────────────────────

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem origin (ex: Postman, curl) e qualquer localhost
      if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origem não permitida pelo CORS: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

// ─── Health check ────────────────────────────────────────────────────────────

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Doces Lucelian — Backend API",
  });
});

// ─── Rotas da API ────────────────────────────────────────────────────────────

app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/vendas", vendasRoutes);
app.use("/api/produtos", produtosRoutes);
app.use("/api/contas", contasRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ─── Error handler global ───────────────────────────────────────────────────

app.use(errorHandler);

export default app;
