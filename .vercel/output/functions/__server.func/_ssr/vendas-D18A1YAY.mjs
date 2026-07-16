import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-Y2DWLo6B.mjs";
import { B as Button } from "./router-B4Xld-CN.mjs";
import { I as Input, L as Label } from "./label-nM7b-b3G.mjs";
import { C as Card, a as CardHeader, b as CardContent, c as CardTitle } from "./card-CR4NHSTS.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as brl, f as dataBR, h as hoje } from "./select-PzeMncBS.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, A as AlertDialog, f as AlertDialogTrigger, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction } from "./alert-dialog-DKoYb0sx.mjs";
import { B as Badge } from "./badge-MdC416p9.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-WjL2W88A.mjs";
import { C as CurrencyInput } from "./currency-input-CemYRw6g.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as Textarea } from "./textarea-BCeeqmEP.mjs";
import "../_libs/seroval.mjs";
import { d as Printer, e as Plus, f as CircleCheckBig, g as Pencil, T as Trash2, a as UserPlus, h as PackagePlus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "./server-CdGkcVaG.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
const formaLabel = {
  dinheiro: "Dinheiro",
  pix: "PIX",
  cartao: "Cartão",
  boleto: "Boleto",
  faturado: "Boleto"
};
function imprimirVenda(v) {
  const itens = v.venda_itens ?? [];
  const linhas = itens.length ? itens.map((i) => `<tr>
        <td>${i.produto}</td>
        <td style="text-align:right">${Number(i.quantidade)}</td>
        <td>${i.unidade ?? "unidade"}</td>
        <td style="text-align:right">${brl(i.valor_unitario)}</td>
        <td style="text-align:right">${brl(Number(i.quantidade) * Number(i.valor_unitario))}</td>
      </tr>`).join("") : `<tr><td>${v.produto ?? "—"}</td><td style="text-align:right">${Number(v.quantidade ?? 0)}</td><td>unidade</td><td style="text-align:right">${brl(v.valor_unitario ?? 0)}</td><td style="text-align:right">${brl(Number(v.quantidade ?? 0) * Number(v.valor_unitario ?? 0))}</td></tr>`;
  const subtotal = itens.reduce((s, i) => s + Number(i.quantidade) * Number(i.valor_unitario), 0) || Number(v.valor_total ?? 0);
  const desconto = Number(v.desconto ?? 0);
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Venda — Doces Lucelian</title>
    <style>
      body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#1a1a1a;max-width:720px;margin:auto}
      h1{color:#c8102e;margin:0 0 4px;font-size:20px}
      .meta{color:#666;font-size:12px;margin-bottom:16px}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:16px 0;font-size:13px}
      .grid div b{display:block;font-size:10px;text-transform:uppercase;color:#888;letter-spacing:.05em}
      table{width:100%;border-collapse:collapse;font-size:12px;margin-top:8px}
      th,td{padding:8px;border-bottom:1px solid #e5e5e5;text-align:left}
      th{background:#fafafa;text-transform:uppercase;font-size:10px;letter-spacing:.05em}
      tfoot td{font-weight:700;border-top:2px solid #c8102e;border-bottom:none}
      .totais{margin-top:12px;display:flex;justify-content:flex-end}
      .totais table{width:auto;min-width:260px}
    </style></head><body>
    <h1>Doces Lucelian — Comprovante de venda</h1>
    <div class="meta">Emitido em ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}</div>
    <div class="grid">
      <div><b>Cliente</b>${v.clientes?.nome ?? "—"}</div>
      <div><b>Data da venda</b>${dataBR(v.data)}</div>
      <div><b>Forma de pagamento</b>${formaLabel[v.forma_pagamento] ?? "—"}</div>
      <div><b>Status</b>${v.status_pagamento === "pago" ? "Pago" : "Pendente"}</div>
      <div><b>Nota fiscal</b>${v.nota_fiscal || "—"}</div>
      <div><b>Data prevista de pagamento</b>${v.data_pagamento ? dataBR(v.data_pagamento) : "—"}</div>
    </div>
    <table>
      <thead><tr><th>Produto</th><th style="text-align:right">Qtd</th><th>Unidade</th><th style="text-align:right">Valor unit.</th><th style="text-align:right">Subtotal</th></tr></thead>
      <tbody>${linhas}</tbody>
    </table>
    <div class="totais"><table>
      <tr><td>Subtotal</td><td style="text-align:right">${brl(subtotal)}</td></tr>
      <tr><td>Desconto</td><td style="text-align:right">- ${brl(desconto)}</td></tr>
      <tr><td><b>Valor total</b></td><td style="text-align:right"><b>${brl(v.valor_total)}</b></td></tr>
    </table></div>
    <script>window.onload=()=>window.print();<\/script>
  </body></html>`;
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) return toast.error("Permita pop-ups para imprimir");
  w.document.write(html);
  w.document.close();
}
const UNIDADES = ["unidade", "kg", "caixa"];
function calcStatus(v) {
  if (v.status_pagamento === "pago") return "pago";
  if (v.data_pagamento && v.data_pagamento < hoje()) return "atrasado";
  return "pendente";
}
function VendasPage() {
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [editId, setEditId] = reactExports.useState(null);
  const [busca, setBusca] = reactExports.useState("");
  const [filtroStatus, setFiltroStatus] = reactExports.useState("todos");
  const [sortKey, setSortKey] = reactExports.useState("data");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [dataIni, setDataIni] = reactExports.useState("");
  const [dataFim, setDataFim] = reactExports.useState("");
  const {
    data: clientes = []
  } = useQuery({
    queryKey: ["clientes-select"],
    queryFn: async () => (await supabase.from("clientes").select("id, nome").order("nome")).data ?? []
  });
  const {
    data: produtosCadastrados = []
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("produtos").select("*").order("nome");
      return data ?? [];
    }
  });
  const {
    data: produtosUsados = []
  } = useQuery({
    queryKey: ["produtos-usados"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("venda_itens").select("produto").order("produto");
      return Array.from(new Set((data ?? []).map((r) => r.produto).filter(Boolean)));
    }
  });
  const {
    data: vendas = []
  } = useQuery({
    queryKey: ["vendas"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("vendas").select("*, clientes(nome), venda_itens(*)").order("data", {
        ascending: false
      }).limit(300);
      if (error) throw error;
      return data;
    }
  });
  const remover = useMutation({
    mutationFn: async (id) => {
      await supabase.from("venda_itens").delete().eq("venda_id", id);
      const {
        error
      } = await supabase.from("vendas").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Venda excluída");
      qc.invalidateQueries({
        queryKey: ["vendas"]
      });
      qc.invalidateQueries({
        queryKey: ["dashboard"]
      });
      qc.invalidateQueries({
        queryKey: ["clientes"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const marcarComoPago = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("vendas").update({
        status_pagamento: "pago"
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Venda marcada como paga");
      qc.invalidateQueries({
        queryKey: ["vendas"]
      });
      qc.invalidateQueries({
        queryKey: ["dashboard"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const filtradas = vendas.map((v) => ({
    ...v,
    _status: calcStatus(v)
  })).filter((v) => filtroStatus === "todos" || v._status === filtroStatus).filter((v) => (!dataIni || v.data >= dataIni) && (!dataFim || v.data <= dataFim)).filter((v) => {
    const s = busca.toLowerCase();
    return v.clientes?.nome?.toLowerCase().includes(s) || v.nota_fiscal?.toLowerCase().includes(s) || (v.venda_itens ?? []).some((i) => i.produto.toLowerCase().includes(s));
  }).sort((a, b) => {
    const get = (x) => {
      if (sortKey === "cliente") return x.clientes?.nome ?? "";
      if (sortKey === "produto") return x.venda_itens?.[0]?.produto ?? "";
      if (sortKey === "qtd") return (x.venda_itens ?? []).reduce((s, i) => s + Number(i.quantidade), 0);
      return x[sortKey];
    };
    const av = get(a), bv = get(b);
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });
  const sortBy = (k) => {
    if (sortKey === k) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  };
  const arrow = (k) => sortKey === k ? sortDir === "asc" ? " ↑" : " ↓" : "";
  const totalFiltrado = filtradas.reduce((s, v) => s + Number(v.valor_total), 0);
  const imprimirRelatorio = () => {
    const linhas = filtradas.map((v) => {
      const itens = (v.venda_itens ?? []).map((i) => `${i.produto} (${i.quantidade}x ${brl(i.valor_unitario)})`).join("; ") || v.produto || "—";
      return `<tr>
        <td>${dataBR(v.data)}</td>
        <td>${v.clientes?.nome ?? "—"}</td>
        <td>${itens}</td>
        <td>${v.nota_fiscal ?? "—"}</td>
        <td>${formaLabel[v.forma_pagamento]}</td>
        <td>${v._status}</td>
        <td style="text-align:right">${brl(v.valor_total)}</td>
      </tr>`;
    }).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Relatório de Vendas — Doces Lucelian</title>
      <style>
        body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#1a1a1a}
        h1{color:#c8102e;margin:0 0 4px}
        .meta{color:#666;font-size:12px;margin-bottom:16px}
        table{width:100%;border-collapse:collapse;font-size:12px}
        th,td{padding:8px;border-bottom:1px solid #e5e5e5;text-align:left}
        th{background:#fafafa;text-transform:uppercase;font-size:10px;letter-spacing:.05em}
        tfoot td{font-weight:700;border-top:2px solid #c8102e;border-bottom:none}
      </style></head><body>
      <h1>Doces Lucelian — Relatório de Vendas</h1>
      <div class="meta">Emitido em ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")} • ${filtradas.length} registro(s)
        ${dataIni || dataFim ? ` • Período: ${dataIni ? dataBR(dataIni) : "..."} a ${dataFim ? dataBR(dataFim) : "..."}` : ""}
        ${filtroStatus !== "todos" ? ` • Status: ${filtroStatus}` : ""}
      </div>
      <table>
        <thead><tr><th>Data</th><th>Cliente</th><th>Produtos</th><th>NF</th><th>Pgto</th><th>Status</th><th style="text-align:right">Total</th></tr></thead>
        <tbody>${linhas || `<tr><td colspan="7" style="text-align:center;padding:24px;color:#888">Sem vendas no filtro.</td></tr>`}</tbody>
        <tfoot><tr><td colspan="6">Total geral</td><td style="text-align:right">${brl(totalFiltrado)}</td></tr></tfoot>
      </table>
      <script>window.onload=()=>{window.print();}<\/script>
    </body></html>`;
    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) return toast.error("Permita pop-ups para imprimir");
    w.document.write(html);
    w.document.close();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Vendas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carrinho com múltiplos produtos, desconto e status de pagamento." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: imprimirRelatorio, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4 mr-1" }),
          " Relatório"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          setEditId(null);
          setOpen(true);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
          " Nova venda"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar cliente, NF, produto...", value: busca, onChange: (e) => setBusca(e.target.value), className: "max-w-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filtroStatus, onValueChange: setFiltroStatus, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "todos", children: "Todos os status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pago", children: "Pago" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pendente", children: "Pendente" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "atrasado", children: "Atrasado" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: dataIni, onChange: (e) => setDataIni(e.target.value), className: "w-[160px]", title: "De" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: dataFim, onChange: (e) => setDataFim(e.target.value), className: "w-[160px]", title: "Até" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-sm text-muted-foreground", children: [
          "Total filtrado: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground tabular-nums", children: brl(totalFiltrado) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "cursor-pointer", onClick: () => sortBy("data"), children: [
            "Data",
            arrow("data")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "cursor-pointer", onClick: () => sortBy("cliente"), children: [
            "Cliente",
            arrow("cliente")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "cursor-pointer", onClick: () => sortBy("produto"), children: [
            "Produtos",
            arrow("produto")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "cursor-pointer", onClick: () => sortBy("nota_fiscal"), children: [
            "NF",
            arrow("nota_fiscal")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "text-right cursor-pointer", onClick: () => sortBy("qtd"), children: [
            "Qtd",
            arrow("qtd")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "cursor-pointer", onClick: () => sortBy("forma_pagamento"), children: [
            "Pgto",
            arrow("forma_pagamento")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "text-right cursor-pointer", onClick: () => sortBy("valor_total"), children: [
            "Total",
            arrow("valor_total")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          filtradas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 9, className: "text-center text-muted-foreground py-8", children: "Nenhuma venda." }) }),
          filtradas.map((v) => {
            const itens = v.venda_itens ?? [];
            const qtd = itens.reduce((s, i) => s + Number(i.quantidade), 0);
            const produtos = itens.map((i) => i.produto).join(", ") || v.produto || "—";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: dataBR(v.data) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: v.clientes?.nome ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs truncate", title: produtos, children: produtos }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-xs tabular-nums", children: v.nota_fiscal || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums", children: qtd || Number(v.quantidade ?? 0) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: formaLabel[v.forma_pagamento] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v._status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums font-semibold", children: brl(v.valor_total) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
                v._status !== "pago" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => marcarComoPago.mutate(v.id), title: "Marcar como Pago", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-3.5 text-green-600" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => {
                  setEditId(v.id);
                  setOpen(true);
                }, title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => imprimirVenda(v), title: "Imprimir venda", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5 text-destructive" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir venda?" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                        "Esta ação não pode ser desfeita. A venda de ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: v.clientes?.nome ?? "—" }),
                        " em ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: dataBR(v.data) }),
                        " será removida permanentemente."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => remover.mutate(v.id), className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Excluir" })
                    ] })
                  ] })
                ] })
              ] }) })
            ] }, v.id);
          })
        ] })
      ] }) })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(VendaDialog, { open, onClose: () => setOpen(false), clientes, produtosUsados, produtosCadastrados, editId, onSaved: () => {
      qc.invalidateQueries({
        queryKey: ["vendas"]
      });
      qc.invalidateQueries({
        queryKey: ["dashboard"]
      });
      qc.invalidateQueries({
        queryKey: ["clientes"]
      });
      qc.invalidateQueries({
        queryKey: ["produtos-usados"]
      });
      qc.invalidateQueries({
        queryKey: ["produtos"]
      });
    } })
  ] });
}
function StatusBadge({
  status
}) {
  const base = "pointer-events-none";
  if (status === "pago") return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `bg-success text-success-foreground hover:bg-success ${base}`, children: "Pago" });
  if (status === "atrasado") return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `bg-destructive text-destructive-foreground hover:bg-destructive ${base}`, children: "Atrasado" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `bg-warning text-warning-foreground hover:bg-warning ${base}`, children: "Pendente" });
}
function VendaDialog({
  open,
  onClose,
  clientes,
  produtosUsados,
  produtosCadastrados,
  editId,
  onSaved
}) {
  const qc = useQueryClient();
  const [cliente, setCliente] = reactExports.useState("");
  const [forma, setForma] = reactExports.useState("pix");
  const [data, setData] = reactExports.useState(hoje());
  const [dataPgto, setDataPgto] = reactExports.useState("");
  const [statusPgto, setStatusPgto] = reactExports.useState("pendente");
  const [notaFiscal, setNotaFiscal] = reactExports.useState("");
  const [desconto, setDesconto] = reactExports.useState(0);
  const [itens, setItens] = reactExports.useState([]);
  const [novoOpen, setNovoOpen] = reactExports.useState(false);
  const [novoNome, setNovoNome] = reactExports.useState("");
  const [novoContato, setNovoContato] = reactExports.useState("");
  const [novoDoc, setNovoDoc] = reactExports.useState("");
  const [salvandoCliente, setSalvandoCliente] = reactExports.useState(false);
  const [novoProdOpen, setNovoProdOpen] = reactExports.useState(false);
  const [novoProdItemId, setNovoProdItemId] = reactExports.useState(null);
  const [npNome, setNpNome] = reactExports.useState("");
  const [npObs, setNpObs] = reactExports.useState("");
  const [npUnidade, setNpUnidade] = reactExports.useState("unidade");
  const [npValor, setNpValor] = reactExports.useState(0);
  const [salvandoProd, setSalvandoProd] = reactExports.useState(false);
  const abrirNovoProduto = (itemId) => {
    setNovoProdItemId(itemId);
    setNpNome("");
    setNpObs("");
    setNpUnidade("unidade");
    setNpValor(0);
    setNovoProdOpen(true);
  };
  const criarProduto = async () => {
    if (!npNome.trim()) return toast.error("Informe o nome do produto");
    setSalvandoProd(true);
    const {
      data: ins,
      error
    } = await supabase.from("produtos").insert({
      nome: npNome.trim(),
      observacao: npObs.trim() || null,
      unidade: npUnidade,
      valor: npValor
    }).select("*").single();
    setSalvandoProd(false);
    if (error) return toast.error(error.message);
    await qc.invalidateQueries({
      queryKey: ["produtos"]
    });
    if (novoProdItemId) {
      const p = ins;
      setItens((it) => it.map((i) => i.id === novoProdItemId ? {
        ...i,
        produto: p.nome,
        unidade: p.unidade,
        valor_unitario: Number(p.valor)
      } : i));
    }
    toast.success("Produto cadastrado");
    setNovoProdOpen(false);
  };
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const aplicarProdutoCadastrado = (itemId, value) => {
    const p = produtosCadastrados.find((x) => x.nome === value || `${x.nome} (${cap(x.unidade)})` === value);
    if (p) {
      setItens((it) => it.map((i) => i.id === itemId ? {
        ...i,
        produto: p.nome,
        unidade: p.unidade,
        valor_unitario: Number(p.valor)
      } : i));
    } else {
      setItens((it) => it.map((i) => i.id === itemId ? {
        ...i,
        produto: value
      } : i));
    }
  };
  const criarCliente = async () => {
    if (!novoNome.trim()) return toast.error("Informe o nome");
    setSalvandoCliente(true);
    const {
      data: ins,
      error
    } = await supabase.from("clientes").insert({
      nome: novoNome.trim(),
      contato: novoContato.trim() || null,
      cpf_cnpj: novoDoc.trim() || null
    }).select("id, nome").single();
    setSalvandoCliente(false);
    if (error) return toast.error(error.message);
    await qc.invalidateQueries({
      queryKey: ["clientes-select"]
    });
    await qc.invalidateQueries({
      queryKey: ["clientes"]
    });
    setCliente(ins.id);
    toast.success("Cliente cadastrado");
    setNovoOpen(false);
    setNovoNome("");
    setNovoContato("");
    setNovoDoc("");
  };
  useQuery({
    queryKey: ["venda-edit", editId],
    enabled: !!editId,
    queryFn: async () => {
      const {
        data: v
      } = await supabase.from("vendas").select("*, venda_itens(*)").eq("id", editId).single();
      if (v) {
        setCliente(v.cliente_id);
        setForma(v.forma_pagamento);
        setData(v.data);
        setDataPgto(v.data_pagamento ?? "");
        setStatusPgto(v.status_pagamento === "pago" ? "pago" : "pendente");
        setNotaFiscal(v.nota_fiscal ?? "");
        setDesconto(Number(v.desconto ?? 0));
        const its = v.venda_itens ?? [];
        setItens(its.length > 0 ? its.map((i) => ({
          id: i.id,
          produto: i.produto,
          quantidade: Number(i.quantidade),
          valor_unitario: Number(i.valor_unitario),
          unidade: i.unidade ?? "unidade"
        })) : v.produto ? [{
          id: crypto.randomUUID(),
          produto: v.produto,
          quantidade: Number(v.quantidade ?? 1),
          valor_unitario: Number(v.valor_unitario ?? 0),
          unidade: "unidade"
        }] : []);
      }
      return v;
    }
  });
  const addItem = () => setItens((it) => [...it, {
    id: crypto.randomUUID(),
    produto: "",
    quantidade: 1,
    valor_unitario: 0,
    unidade: "unidade"
  }]);
  const updItem = (id, patch) => setItens((it) => it.map((i) => i.id === id ? {
    ...i,
    ...patch
  } : i));
  const delItem = (id) => setItens((it) => it.filter((i) => i.id !== id));
  const subtotal = itens.reduce((s, i) => s + i.quantidade * i.valor_unitario, 0);
  const total = Math.max(0, subtotal - desconto);
  const save = async () => {
    if (!cliente) return toast.error("Selecione um cliente");
    if (itens.length === 0) return toast.error("Adicione ao menos um item");
    if (itens.some((i) => !i.produto || i.quantidade <= 0)) return toast.error("Itens inválidos");
    const payload = {
      cliente_id: cliente,
      forma_pagamento: forma,
      data,
      data_pagamento: dataPgto || null,
      status_pagamento: statusPgto,
      nota_fiscal: notaFiscal || null,
      desconto,
      valor_total: total,
      produto: itens[0].produto,
      quantidade: itens.reduce((s, i) => s + i.quantidade, 0),
      valor_unitario: itens[0].valor_unitario
    };
    let vendaId = editId;
    if (editId) {
      const {
        error
      } = await supabase.from("vendas").update(payload).eq("id", editId);
      if (error) return toast.error(error.message);
      await supabase.from("venda_itens").delete().eq("venda_id", editId);
    } else {
      const {
        data: ins,
        error
      } = await supabase.from("vendas").insert(payload).select("id").single();
      if (error) return toast.error(error.message);
      vendaId = ins.id;
    }
    const itensIns = itens.map((i) => ({
      venda_id: vendaId,
      produto: i.produto,
      quantidade: i.quantidade,
      valor_unitario: i.valor_unitario,
      unidade: i.unidade
    }));
    const {
      error: e2
    } = await supabase.from("venda_itens").insert(itensIns);
    if (e2) return toast.error(e2.message);
    toast.success(editId ? "Venda atualizada" : "Venda registrada");
    onSaved();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editId ? "Editar venda" : "Nova venda" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cliente" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cliente, onValueChange: setCliente, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione..." }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: clientes.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.nome }, c.id)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "icon", title: "Novo cliente", onClick: () => setNovoOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Data da venda" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: data, onChange: (e) => setData(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Carrinho" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: addItem, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3.5 mr-1" }),
              " Adicionar produto"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
            itens.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground py-2", children: "Nenhum item." }),
            itens.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_90px_110px_120px_40px_40px] gap-2 text-xs uppercase tracking-wide text-muted-foreground px-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Produtos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Quantidade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Unidade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Valor (R$)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("datalist", { id: "produtos-sugestoes", children: [
              produtosCadastrados.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: `${p.nome} (${cap(p.unidade)})` }, p.id)),
              produtosUsados.filter((p) => !produtosCadastrados.some((pc) => pc.nome === p)).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p }, p))
            ] }),
            itens.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_90px_110px_120px_40px_40px] gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { list: "produtos-sugestoes", placeholder: "Produto (digite ou escolha)", value: i.produto, onChange: (e) => aplicarProdutoCadastrado(i.id, e.target.value) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", min: "0", placeholder: "Qtd", value: i.quantidade, onChange: (e) => updItem(i.id, {
                quantidade: Number(e.target.value)
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: i.unidade, onValueChange: (v) => updItem(i.id, {
                unidade: v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: UNIDADES.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: u, children: u }, u)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyInput, { value: i.valor_unitario, onValueChange: (n) => updItem(i.id, {
                valor_unitario: n
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "Cadastrar novo produto", onClick: () => abrirNovoProduto(i.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackagePlus, { className: "size-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => delItem(i.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
            ] }, i.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Forma pgto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: forma, onValueChange: (v) => setForma(v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "dinheiro", children: "Dinheiro" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pix", children: "PIX" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cartao", children: "Cartão" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "boleto", children: "Boleto" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status pagamento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusPgto, onValueChange: (v) => setStatusPgto(v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pago", children: "Pago" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pendente", children: "Pendente" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Data prevista de pagamento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: dataPgto, onChange: (e) => setDataPgto(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nota fiscal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: notaFiscal, onChange: (e) => setNotaFiscal(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Desconto (R$)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyInput, { value: desconto, onValueChange: setDesconto })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-accent/30 px-4 py-3 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: brl(subtotal) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Desconto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
              "- ",
              brl(desconto)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-lg pt-1 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Valor Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-primary", children: brl(total) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: onClose, children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, children: editId ? "Salvar alterações" : "Registrar venda" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: novoOpen, onOpenChange: setNovoOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Novo cliente" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome / Razão social" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: novoNome, onChange: (e) => setNovoNome(e.target.value), autoFocus: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contato" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: novoContato, onChange: (e) => setNovoContato(e.target.value), placeholder: "Telefone, email..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "CPF / CNPJ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: novoDoc, onChange: (e) => setNovoDoc(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setNovoOpen(false), children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: criarCliente, disabled: salvandoCliente, children: salvandoCliente ? "Salvando..." : "Cadastrar e usar" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: novoProdOpen, onOpenChange: setNovoProdOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Novo produto" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: npNome, onChange: (e) => setNpNome(e.target.value), autoFocus: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Unidade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: npUnidade, onValueChange: setNpUnidade, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: UNIDADES.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: u, children: u }, u)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Valor (R$)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyInput, { value: npValor, onValueChange: setNpValor })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Observação" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: npObs, onChange: (e) => setNpObs(e.target.value), rows: 3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setNovoProdOpen(false), children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: criarProduto, disabled: salvandoProd, children: salvandoProd ? "Salvando..." : "Cadastrar e usar" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  VendasPage as component
};
