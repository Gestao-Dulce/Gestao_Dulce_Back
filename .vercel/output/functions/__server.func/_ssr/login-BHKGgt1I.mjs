import { c as createServerRpc } from "./createServerRpc-Cktco27D.mjs";
import { c as createServerFn } from "./server-Cx9svbWa.mjs";
import bcryptjs from "../_libs/bcryptjs.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
const loginFn_createServerFn_handler = createServerRpc({
  id: "1b16c41c2f4ec5be0b02b54ca085c9661bc4a8cd2eb184e33412ec8df53c6714",
  name: "loginFn",
  filename: "src/routes/login.tsx"
}, (opts) => loginFn.__executeServer(opts));
const loginFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(loginFn_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-6p3ypXLR.mjs");
  const {
    data: existing
  } = await supabaseAdmin.from("usuarios").select("id").eq("email", "admin").maybeSingle();
  if (!existing) {
    const adminHash = await bcryptjs.hash("Doceslucelian$2026", 12);
    await supabaseAdmin.from("usuarios").insert({
      email: "admin",
      senha_hash: adminHash
    });
  }
  const {
    data: user,
    error
  } = await supabaseAdmin.from("usuarios").select("id, email, senha_hash").eq("email", data.email).maybeSingle();
  if (error || !user) {
    throw new Error("Credenciais inválidas. Verifique seu login e senha.");
  }
  if (!user.senha_hash) {
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.email === "admin",
      needsPasswordSetup: true
    };
  }
  const valid = await bcryptjs.compare(data.password, user.senha_hash);
  if (!valid) {
    throw new Error("Credenciais inválidas. Verifique seu login e senha.");
  }
  return {
    id: user.id,
    email: user.email,
    isAdmin: user.email === "admin",
    needsPasswordSetup: false
  };
});
const changePasswordFn_createServerFn_handler = createServerRpc({
  id: "784b0cb0fdaa8dfd7acb2371b9cb04cb742e6060bf1dd865993cd0a082d1aa58",
  name: "changePasswordFn",
  filename: "src/routes/login.tsx"
}, (opts) => changePasswordFn.__executeServer(opts));
const changePasswordFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(changePasswordFn_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-6p3ypXLR.mjs");
  const {
    data: user
  } = await supabaseAdmin.from("usuarios").select("id, senha_hash").eq("email", data.email).maybeSingle();
  if (!user || !user.senha_hash) {
    throw new Error("Usuário não encontrado ou sem senha definida.");
  }
  const valid = await bcryptjs.compare(data.currentPassword, user.senha_hash);
  if (!valid) throw new Error("Senha atual incorreta. Verifique e tente novamente.");
  if (data.newPassword.length < 6) {
    throw new Error("A nova senha deve ter no mínimo 6 caracteres.");
  }
  const newHash = await bcryptjs.hash(data.newPassword, 12);
  const {
    error
  } = await supabaseAdmin.from("usuarios").update({
    senha_hash: newHash
  }).eq("id", user.id);
  if (error) throw new Error(error.message);
  return {
    success: true
  };
});
const setFirstPasswordFn_createServerFn_handler = createServerRpc({
  id: "17d1a3f1318589df35d6836ee7087fc14f590a29332fd46b2e742bda662d97cc",
  name: "setFirstPasswordFn",
  filename: "src/routes/login.tsx"
}, (opts) => setFirstPasswordFn.__executeServer(opts));
const setFirstPasswordFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(setFirstPasswordFn_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-6p3ypXLR.mjs");
  const {
    data: user
  } = await supabaseAdmin.from("usuarios").select("id, email, senha_hash").eq("email", data.email).maybeSingle();
  if (!user) throw new Error("Usuário não encontrado.");
  if (user.senha_hash) {
    throw new Error("Este usuário já possui senha. Use a opção 'Alterar Senha'.");
  }
  if (data.newPassword.length < 6) {
    throw new Error("A senha deve ter no mínimo 6 caracteres.");
  }
  const newHash = await bcryptjs.hash(data.newPassword, 12);
  const {
    error
  } = await supabaseAdmin.from("usuarios").update({
    senha_hash: newHash
  }).eq("id", user.id);
  if (error) throw new Error(error.message);
  return {
    id: user.id,
    email: user.email,
    isAdmin: user.email === "admin",
    needsPasswordSetup: false
  };
});
export {
  changePasswordFn_createServerFn_handler,
  loginFn_createServerFn_handler,
  setFirstPasswordFn_createServerFn_handler
};
