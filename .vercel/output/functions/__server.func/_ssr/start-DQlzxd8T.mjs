import { a as createMiddleware } from "./server-B-RH4323.mjs";
import { r as renderErrorPage } from "./index.mjs";
import { s as supabase } from "./client-Y2DWLo6B.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
// tslib helpers (inlined by postbuild.mjs)
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.trys.pop(); continue; }
          else if (t) { _.trys.pop(); t = op; break; }
          if (!(t = _.trys, t = t.length > 0 && t.pop())) { g.done = true; return t; }
          _.ops.push(op); break;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) { if (!ar) ar = Array.prototype.slice.call(from, 0, i); ar[i] = from[i]; }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __assign() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) { s = arguments[i]; for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]; }
    return t;
  };
  return __assign.apply(this, arguments);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return { next: function () { if (o && i >= o.length) o = void 0; return { value: o && o[i++], done: !o }; } };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
  catch (error) { e = { error: error }; }
  finally { try { if (r && !r.done && (m = i["return"])) m.call(i); } finally { if (e) throw e.error; } }
  return ar;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
import "../_libs/supabase__functions-js.mjs";
function dedupeSerializationAdapters(deduped, serializationAdapters) {
  for (let i = 0, len = serializationAdapters.length; i < len; i++) {
    const current = serializationAdapters[i];
    if (!deduped.has(current)) {
      deduped.add(current);
      if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
    }
  }
}
var createStart = (getOptions) => {
  return {
    getOptions: async () => {
      const options = await getOptions();
      if (options.serializationAdapters) {
        const deduped = /* @__PURE__ */ new Set();
        dedupeSerializationAdapters(deduped, options.serializationAdapters);
        options.serializationAdapters = Array.from(deduped);
      }
      return options;
    },
    createMiddleware
  };
};
const attachSupabaseAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }
);
const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }
});
const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [errorMiddleware]
}));
export {
  startInstance
};
