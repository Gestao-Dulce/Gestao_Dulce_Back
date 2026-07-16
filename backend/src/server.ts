import dotenv from "dotenv";
dotenv.config();

// Import app AFTER dotenv so env vars are available
const { default: app } = await import("./app.js");

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log("");
  console.log("  ╔══════════════════════════════════════════════════╗");
  console.log("  ║                                                  ║");
  console.log("  ║   🍬  Doces Lucelian — Backend API               ║");
  console.log(`  ║   🚀  Rodando em http://localhost:${PORT}           ║`);
  console.log("  ║                                                  ║");
  console.log("  ╚══════════════════════════════════════════════════╝");
  console.log("");
  console.log("  Endpoints disponíveis:");
  console.log("    GET    /api/health");
  console.log("    POST   /api/auth/login");
  console.log("    POST   /api/auth/change-password");
  console.log("    POST   /api/auth/set-first-password");
  console.log("    GET    /api/clientes");
  console.log("    GET    /api/clientes/select");
  console.log("    POST   /api/clientes");
  console.log("    PUT    /api/clientes/:id");
  console.log("    DELETE /api/clientes/:id");
  console.log("    GET    /api/vendas");
  console.log("    GET    /api/vendas/produtos-usados");
  console.log("    POST   /api/vendas");
  console.log("    PUT    /api/vendas/:id");
  console.log("    DELETE /api/vendas/:id");
  console.log("    PATCH  /api/vendas/:id/pagar");
  console.log("    GET    /api/produtos");
  console.log("    POST   /api/produtos");
  console.log("    PUT    /api/produtos/:id");
  console.log("    DELETE /api/produtos/:id");
  console.log("    GET    /api/contas");
  console.log("    POST   /api/contas");
  console.log("    PUT    /api/contas/:id");
  console.log("    DELETE /api/contas/:id");
  console.log("    PATCH  /api/contas/:id/status");
  console.log("    POST   /api/contas/:id/pagar-recorrente");
  console.log("    PATCH  /api/contas/:id/finalizar-recorrencia");
  console.log("    GET    /api/usuarios         (admin)");
  console.log("    POST   /api/usuarios         (admin)");
  console.log("    DELETE /api/usuarios/:id      (admin)");
  console.log("    PATCH  /api/usuarios/:id/reset-password (admin)");
  console.log("    GET    /api/dashboard?dias=30");
  console.log("");
});
