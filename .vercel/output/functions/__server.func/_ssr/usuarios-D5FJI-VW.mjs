import { c as createServerRpc } from "./createServerRpc-BwC9GRDM.mjs";
import { c as createServerFn } from "./server-x9rkVVWt.mjs";
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
const listUsersFn_createServerFn_handler = createServerRpc({
  id: "71433e0925a862d3dd2f5b0ed01ccd423acd1ec05ae2f5e860f0f136a008906a",
  name: "listUsersFn",
  filename: "src/routes/usuarios.tsx"
}, (opts) => listUsersFn.__executeServer(opts));
const listUsersFn = createServerFn({
  method: "GET"
}).handler(listUsersFn_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("usuarios").select("id, email, created_at").order("created_at", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const createUserFn_createServerFn_handler = createServerRpc({
  id: "6594890a8cb752ac50bf66433c7f49dc3d73bc4563fd30d865ce19261499e7cb",
  name: "createUserFn",
  filename: "src/routes/usuarios.tsx"
}, (opts) => createUserFn.__executeServer(opts));
const createUserFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createUserFn_createServerFn_handler, async ({
  data
}) => {
  const bcryptjs = await import("../_libs/bcryptjs.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: existing
  } = await supabaseAdmin.from("usuarios").select("id").eq("email", data.email).maybeSingle();
  if (existing) throw new Error("Já existe um usuário com este login.");
  const senha_hash = await bcryptjs.hash(data.password, 12);
  const {
    error
  } = await supabaseAdmin.from("usuarios").insert({
    email: data.email,
    senha_hash
  });
  if (error) throw new Error(error.message);
  return {
    success: true
  };
});
const resetUserPasswordFn_createServerFn_handler = createServerRpc({
  id: "53d1ca62673e273a8ca13066698e6b74ef727371d3f30b52aadc77f749552fb3",
  name: "resetUserPasswordFn",
  filename: "src/routes/usuarios.tsx"
}, (opts) => resetUserPasswordFn.__executeServer(opts));
const resetUserPasswordFn = createServerFn({
  method: "POST"
}).validator((id) => id).handler(resetUserPasswordFn_createServerFn_handler, async ({
  data: id
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: user
  } = await supabaseAdmin.from("usuarios").select("email").eq("id", id).maybeSingle();
  if (user?.email === "admin") throw new Error("Não é possível limpar a senha do administrador principal.");
  const {
    error
  } = await supabaseAdmin.from("usuarios").update({
    senha_hash: null
  }).eq("id", id);
  if (error) throw new Error(error.message);
  return {
    success: true
  };
});
const deleteUserFn_createServerFn_handler = createServerRpc({
  id: "befdb0b870359b571f39014342fc28fede1f7c92472c089db6a741cb26afc0a7",
  name: "deleteUserFn",
  filename: "src/routes/usuarios.tsx"
}, (opts) => deleteUserFn.__executeServer(opts));
const deleteUserFn = createServerFn({
  method: "POST"
}).validator((id) => id).handler(deleteUserFn_createServerFn_handler, async ({
  data: id
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: user
  } = await supabaseAdmin.from("usuarios").select("email").eq("id", id).maybeSingle();
  if (user?.email === "admin") throw new Error("O usuário administrador não pode ser excluído.");
  const {
    error
  } = await supabaseAdmin.from("usuarios").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return {
    success: true
  };
});
export {
  createUserFn_createServerFn_handler,
  deleteUserFn_createServerFn_handler,
  listUsersFn_createServerFn_handler,
  resetUserPasswordFn_createServerFn_handler
};
