import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-Y2DWLo6B.mjs";
import { B as Button, C as Card, b as CardContent, a as CardHeader, c as CardTitle } from "./router-BIKv-0Y-.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as brl, f as dataBR } from "./select-BVpa19Yc.mjs";
import { i as imprimir } from "./report-BbKMnZIj.mjs";
import { B as Badge } from "./badge-Dmt8_ksD.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { k as Printer, z as TrendingUp, y as CircleCheck, W as Wallet, J as TrendingDown } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, a as Bar, P as PieChart, b as Pie, c as Cell } from "../_libs/recharts.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./server-BDTaq3WQ.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const catLabel = {
  fornecedor: "Fornecedor",
  folha_pagamento: "Folha de pagamento",
  outros: "Outros"
};
const periodoLabel = {
  "7": "últimos 7 dias",
  "15": "últimos 15 dias",
  "30": "últimos 30 dias",
  "90": "últimos 90 dias",
  "365": "último ano"
};
function Dashboard() {
  const [periodo, setPeriodo] = reactExports.useState("30");
  const [serie, setSerie] = reactExports.useState("ambos");
  const dias = Number(periodo);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["dashboard", dias],
    queryFn: async () => {
      const hojeStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const em15 = new Date(Date.now() + 15 * 864e5).toISOString().slice(0, 10);
      const inicioPeriodo = new Date(Date.now() - (dias - 1) * 864e5).toISOString().slice(0, 10);
      const [vendasPer, contasPer, contasProx, topClientes, topProdutos] = await Promise.all([supabase.from("vendas").select("data, valor_total, cliente_id, clientes(nome)").gte("data", inicioPeriodo), supabase.from("contas_a_pagar").select("vencimento, valor, status, categoria").gte("vencimento", inicioPeriodo), supabase.from("contas_a_pagar").select("vencimento, valor, fornecedor, categoria").eq("status", "pendente").gte("vencimento", hojeStr).lte("vencimento", em15).order("vencimento"), supabase.from("vendas").select("valor_total, cliente_id, clientes(nome)").gte("data", inicioPeriodo), supabase.from("venda_itens").select("produto, quantidade, valor_unitario, vendas!inner(data)").gte("vendas.data", inicioPeriodo)]);
      const vendasData = vendasPer.data ?? [];
      const contasData = contasPer.data ?? [];
      const faturamento = vendasData.reduce((s, v) => s + Number(v.valor_total), 0);
      const contasPagas = contasData.filter((c) => c.status === "pago").reduce((s, v) => s + Number(v.valor), 0);
      const contasPendentes = contasData.filter((c) => c.status === "pendente").reduce((s, v) => s + Number(v.valor), 0);
      const lucro = faturamento - contasPagas;
      const catMap = /* @__PURE__ */ new Map();
      contasData.forEach((c) => {
        const cur = catMap.get(c.categoria) ?? {
          pago: 0,
          pendente: 0
        };
        if (c.status === "pago") cur.pago += Number(c.valor);
        else cur.pendente += Number(c.valor);
        catMap.set(c.categoria, cur);
      });
      const categorias = [...catMap.entries()].map(([cat, v]) => ({
        categoria: catLabel[cat] ?? cat,
        pago: v.pago,
        pendente: v.pendente,
        total: v.pago + v.pendente
      })).sort((a, b) => b.total - a.total);
      const buckets = [];
      for (let i = dias - 1; i >= 0; i--) {
        const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
        const v = vendasData.filter((x) => x.data === d).reduce((s, x) => s + Number(x.valor_total), 0);
        const c = contasData.filter((x) => x.vencimento === d && x.status === "pago").reduce((s, x) => s + Number(x.valor), 0);
        buckets.push({
          dia: new Date(d).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            timeZone: "UTC"
          }),
          vendas: v,
          contas: c,
          lucro: v - c
        });
      }
      const mapC = /* @__PURE__ */ new Map();
      (topClientes.data ?? []).forEach((v) => {
        if (!v.cliente_id) return;
        const cur = mapC.get(v.cliente_id) ?? {
          nome: v.clientes?.nome ?? "—",
          total: 0
        };
        cur.total += Number(v.valor_total);
        mapC.set(v.cliente_id, cur);
      });
      const rankClientes = [...mapC.values()].sort((a, b) => b.total - a.total).slice(0, 5);
      const mapP = /* @__PURE__ */ new Map();
      (topProdutos.data ?? []).forEach((v) => {
        const cur = mapP.get(v.produto) ?? {
          produto: v.produto,
          total: 0,
          qtd: 0
        };
        cur.total += Number(v.quantidade) * Number(v.valor_unitario);
        cur.qtd += Number(v.quantidade);
        mapP.set(v.produto, cur);
      });
      const rankProdutos = [...mapP.values()].sort((a, b) => b.total - a.total).slice(0, 5);
      return {
        faturamento,
        contasPagas,
        contasPendentes,
        lucro,
        categorias,
        contasProx: contasProx.data ?? [],
        dias: buckets,
        rankClientes,
        rankProdutos
      };
    }
  });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Carregando..." });
  const totalProx = data.contasProx.reduce((s, c) => s + Number(c.valor), 0);
  const lucroPositivo = data.lucro >= 0;
  const label = periodoLabel[periodo];
  const gerarRelatorio = () => {
    imprimir({
      titulo: `Resumo Financeiro — ${label}`,
      colunas: [{
        label: "Indicador"
      }, {
        label: "Valor",
        align: "right"
      }],
      linhas: [["Faturamento bruto", brl(data.faturamento)], ["Contas pagas", brl(data.contasPagas)], ["Contas pendentes", brl(data.contasPendentes)], [lucroPositivo ? "Resultado líquido" : "Prejuízo", brl(data.lucro)], ["A vencer próximos 15 dias", brl(totalProx)], ...data.categorias.map((c) => [`Categoria ${c.categoria} — pago/pendente`, `${brl(c.pago)} / ${brl(c.pendente)}`]), ...data.rankClientes.map((c) => [`Top cliente: ${c.nome}`, brl(c.total)]), ...data.rankProdutos.map((p) => [`Top produto: ${p.produto} (${p.qtd} un)`, brl(p.total)])]
    });
  };
  const chartCats = data.categorias.filter((c) => c.total > 0);
  const cores = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-semibold tracking-tight", children: [
          "Visão geral · ",
          label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Use o filtro de período para alterar a janela analisada." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: periodo, onValueChange: (v) => setPeriodo(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "7", children: "Últimos 7 dias" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "15", children: "Últimos 15 dias" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30", children: "Últimos 30 dias" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "90", children: "Últimos 90 dias" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "365", children: "Último ano" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: gerarRelatorio, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4 mr-1" }),
          " Relatório"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Faturamento bruto", value: brl(data.faturamento), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4" }), sub: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Contas pagas", value: brl(data.contasPagas), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }), sub: "Saídas confirmadas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: lucroPositivo ? "Resultado líquido" : "Prejuízo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: `size-4 ${lucroPositivo ? "text-success" : "text-destructive"}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 text-2xl font-semibold tabular-nums ${lucroPositivo ? "text-success" : "text-destructive"}`, children: brl(data.lucro) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "Faturamento − pagas" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Pendente no período", value: brl(data.contasPendentes), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "size-4" }), sub: "Ver detalhes em Contas a pagar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Movimentação financeira" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Acompanha o filtro acima · ",
            label
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: serie, onValueChange: (v) => setSerie(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ambos", children: "Tudo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "lucro", children: "Apenas resultado líquido" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "vendas_contas", children: "Vendas vs Contas pagas" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: data.dias, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "dia", stroke: "var(--color-muted-foreground)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => brl(v), contentStyle: {
          background: "var(--color-card)",
          border: "1px solid var(--color-border)",
          borderRadius: 8
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
        (serie === "ambos" || serie === "vendas_contas") && /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "vendas", name: "Vendas", fill: "var(--color-success)", radius: [4, 4, 0, 0] }, "vendas"),
        (serie === "ambos" || serie === "vendas_contas") && /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "contas", name: "Contas pagas", fill: "var(--color-destructive)", radius: [4, 4, 0, 0] }, "contas"),
        (serie === "ambos" || serie === "lucro") && /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "lucro", name: "Resultado líquido", fill: "var(--color-chart-4)", radius: [4, 4, 0, 0] }, "lucro")
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
          "Contas por categoria · ",
          label
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: chartCats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: chartCats, dataKey: "total", nameKey: "categoria", innerRadius: 45, outerRadius: 80, paddingAngle: 2, children: chartCats.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: cores[i % cores.length] }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => brl(v), contentStyle: {
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 8
            } })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: chartCats.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-3 rounded-sm", style: {
                  background: cores[i % cores.length]
                } }),
                c.categoria
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums", children: brl(c.total) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground pl-5", children: [
              "Pago ",
              brl(c.pago),
              " · Pendente ",
              brl(c.pendente)
            ] })
          ] }, c.categoria)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Contas a pagar — próximos 15 dias" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground tabular-nums", children: brl(totalProx) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: data.contasProx.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm py-4", children: "Sem compromissos próximos." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: data.contasProx.map((c, idx) => {
          const dd = Math.ceil((new Date(c.vencimento).getTime() - new Date((/* @__PURE__ */ new Date()).toDateString()).getTime()) / 864e5);
          const urgente = dd <= 3;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "py-2.5 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm truncate", children: c.fornecedor }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                catLabel[c.categoria] ?? c.categoria,
                " · Vence em ",
                dataBR(c.vencimento),
                dd === 0 ? " (hoje)" : dd > 0 ? ` (em ${dd}d)` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              urgente && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "urgente" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold tabular-nums", children: brl(c.valor) })
            ] })
          ] }, idx);
        }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
          "Top clientes · ",
          label
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: data.rankClientes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: data.rankClientes.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-6 grid place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold", children: i + 1 }),
            c.nome
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums", children: brl(c.total) })
        ] }, i)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
          "Top produtos · ",
          label
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: data.rankProdutos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: data.rankProdutos.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-6 grid place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold", children: i + 1 }),
            p.produto,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              p.qtd,
              " un)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums", children: brl(p.total) })
        ] }, i)) }) })
      ] })
    ] })
  ] });
}
function Kpi({
  label,
  value,
  icon,
  sub,
  alerta
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: label }),
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 text-2xl font-semibold tabular-nums ${alerta ? "text-destructive" : ""}`, children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: sub })
  ] }) });
}
function Empty() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm py-6 text-center", children: "Sem dados ainda." });
}
export {
  Dashboard as component
};
