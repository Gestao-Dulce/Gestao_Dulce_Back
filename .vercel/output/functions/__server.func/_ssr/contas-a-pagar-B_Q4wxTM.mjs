import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-Y2DWLo6B.mjs";
import { B as Button, a as cn } from "./router-DQIUr6qS.mjs";
import { L as Label, I as Input } from "./label-CyHelp1K.mjs";
import { C as Card, a as CardHeader, c as CardTitle, b as CardContent } from "./card-DkMdN979.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-KxvOlvUs.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, A as AlertDialog, f as AlertDialogTrigger, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction } from "./alert-dialog-cfR4xNXz.mjs";
import { B as Badge } from "./badge-r0OVu10N.mjs";
import { h as hoje, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, f as dataBR, e as brl, g as addMeses } from "./select-DyQZEzIP.mjs";
import { S as Switch$1, a as SwitchThumb } from "../_libs/radix-ui__react-switch.mjs";
import { C as CurrencyInput } from "./currency-input-ASfevy7Q.mjs";
import { i as imprimir } from "./report-BbKMnZIj.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { e as Printer, f as Plus, y as Repeat, z as TriangleAlert, h as Pencil, t as CircleCheck, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./server-DsAWY7-c.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
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
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Switch$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchThumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Switch$1.displayName;
const catLabel = {
  fornecedor: "Fornecedor",
  folha_pagamento: "Folha de pagamento",
  outros: "Outros"
};
function quintoDiaUtil(year, month) {
  let count = 0;
  for (let d = 1; d <= 31; d++) {
    const dt = new Date(year, month, d);
    if (dt.getMonth() !== month) break;
    const wd = dt.getDay();
    if (wd !== 0 && wd !== 6) {
      count++;
      if (count === 5) {
        const mm = String(month + 1).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        return `${year}-${mm}-${dd}`;
      }
    }
  }
  return "";
}
const emptyForm = {
  categoria: "fornecedor",
  fornecedor: "",
  descricao: "",
  vencimento: "",
  valor: 0,
  funcionario_nome: "",
  funcionario_cargo: "",
  funcionario_documento: "",
  recorrente: false
};
function ContasPage() {
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [editId, setEditId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [usarQuintoDiaUtil, setUsarQuintoDiaUtil] = reactExports.useState(false);
  const mesAtual = `${(/* @__PURE__ */ new Date()).getFullYear()}-${String((/* @__PURE__ */ new Date()).getMonth() + 1).padStart(2, "0")}`;
  const [mesFiltro, setMesFiltro] = reactExports.useState(mesAtual);
  const [busca, setBusca] = reactExports.useState("");
  const [sortKey, setSortKey] = reactExports.useState("vencimento");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const hojeDate = /* @__PURE__ */ new Date();
  const quintoUtilStr = quintoDiaUtil(hojeDate.getFullYear(), hojeDate.getMonth());
  const {
    data: contas = []
  } = useQuery({
    queryKey: ["contas"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("contas_a_pagar").select("*").order("vencimento");
      if (error) throw error;
      return data;
    }
  });
  const setF = (k, v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const aplicarQuintoDiaUtil = (ativo) => {
    setUsarQuintoDiaUtil(ativo);
    if (ativo && quintoUtilStr) setF("vencimento", quintoUtilStr);
  };
  const abrirNovo = () => {
    setEditId(null);
    setForm(emptyForm);
    setUsarQuintoDiaUtil(false);
    setOpen(true);
  };
  const abrirEditar = (c) => {
    setEditId(c.id);
    setForm({
      categoria: c.categoria,
      fornecedor: c.fornecedor ?? "",
      descricao: c.descricao ?? "",
      vencimento: c.vencimento,
      valor: Number(c.valor),
      funcionario_nome: c.funcionario_nome ?? "",
      funcionario_cargo: c.funcionario_cargo ?? "",
      funcionario_documento: c.funcionario_documento ?? "",
      recorrente: c.recorrente
    });
    setUsarQuintoDiaUtil(false);
    setOpen(true);
  };
  const salvar = useMutation({
    mutationFn: async () => {
      const v = form;
      const fornecedorFinal = v.categoria === "folha_pagamento" ? v.funcionario_nome.trim() || v.fornecedor.trim() : v.fornecedor.trim();
      if (!fornecedorFinal) throw new Error(v.categoria === "folha_pagamento" ? "Informe o nome do funcionário" : "Informe o fornecedor");
      if (!v.vencimento) throw new Error("Informe o vencimento");
      if (!(v.valor > 0)) throw new Error("Valor deve ser maior que zero");
      const payload = {
        categoria: v.categoria,
        fornecedor: fornecedorFinal,
        descricao: v.descricao || null,
        vencimento: v.vencimento,
        valor: v.valor,
        funcionario_nome: v.categoria === "folha_pagamento" ? v.funcionario_nome || null : null,
        funcionario_cargo: v.categoria === "folha_pagamento" ? v.funcionario_cargo || null : null,
        funcionario_documento: v.categoria === "folha_pagamento" ? v.funcionario_documento || null : null,
        recorrente: v.recorrente
      };
      if (editId) {
        const {
          error
        } = await supabase.from("contas_a_pagar").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const {
          error
        } = await supabase.from("contas_a_pagar").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editId ? "Conta atualizada" : "Conta agendada");
      setOpen(false);
      setEditId(null);
      setForm(emptyForm);
      qc.invalidateQueries({
        queryKey: ["contas"]
      });
      qc.invalidateQueries({
        queryKey: ["dashboard"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const toggle = useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      const {
        error
      } = await supabase.from("contas_a_pagar").update({
        status
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["contas"]
    })
  });
  const pagarRecorrente = useMutation({
    mutationFn: async (c) => {
      const {
        error: e1
      } = await supabase.from("contas_a_pagar").insert({
        categoria: c.categoria,
        fornecedor: c.fornecedor,
        descricao: c.descricao,
        vencimento: c.vencimento,
        valor: c.valor,
        funcionario_nome: c.funcionario_nome,
        funcionario_cargo: c.funcionario_cargo,
        funcionario_documento: c.funcionario_documento,
        recorrente: false,
        status: "pago"
      });
      if (e1) throw e1;
      let proxima = addMeses(1, c.vencimento);
      if (c.categoria === "folha_pagamento") {
        const d = new Date(proxima);
        const q = quintoDiaUtil(d.getUTCFullYear(), d.getUTCMonth());
        if (q) proxima = q;
      }
      const {
        error: e2
      } = await supabase.from("contas_a_pagar").update({
        vencimento: proxima
      }).eq("id", c.id);
      if (e2) throw e2;
    },
    onSuccess: () => {
      toast.success("Pagamento registrado, próxima ocorrência agendada");
      qc.invalidateQueries({
        queryKey: ["contas"]
      });
      qc.invalidateQueries({
        queryKey: ["dashboard"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const finalizarRecorrencia = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("contas_a_pagar").update({
        finalizado_em: hoje()
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Recorrência finalizada");
      qc.invalidateQueries({
        queryKey: ["contas"]
      });
    }
  });
  const remover = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("contas_a_pagar").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Conta excluída");
      qc.invalidateQueries({
        queryKey: ["contas"]
      });
      qc.invalidateQueries({
        queryKey: ["dashboard"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const [anoF, mesF] = mesFiltro.split("-").map(Number);
  const inicioMes = `${anoF}-${String(mesF).padStart(2, "0")}-01`;
  const fimMes = new Date(anoF, mesF, 0).toISOString().slice(0, 10);
  const mesLabel = new Date(anoF, mesF - 1, 1).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric"
  });
  const pendentes = contas.filter((c) => c.status === "pendente");
  const recorrentesAtivos = pendentes.filter((c) => c.recorrente && !c.finalizado_em);
  const filtradas = pendentes.filter((c) => c.vencimento >= inicioMes && c.vencimento <= fimMes).filter((c) => c.fornecedor.toLowerCase().includes(busca.toLowerCase())).sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });
  const totalFiltrado = filtradas.reduce((s, c) => s + Number(c.valor), 0);
  const pagas = contas.filter((c) => c.status === "pago");
  const hojeStr = hoje();
  const vencidas = pendentes.filter((c) => c.vencimento < hojeStr).map((c) => ({
    ...c,
    diasAtraso: Math.ceil((new Date(hojeStr).getTime() - new Date(c.vencimento).getTime()) / 864e5)
  })).sort((a, b) => b.diasAtraso - a.diasAtraso);
  const totalVencidas = vencidas.reduce((s, c) => s + Number(c.valor), 0);
  const sortBy = (k) => {
    if (sortKey === k) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  };
  const arrow = (k) => sortKey === k ? sortDir === "asc" ? " ↑" : " ↓" : "";
  const gerarRelatorio = () => {
    imprimir({
      titulo: "Relatório de contas a pagar",
      meta: `Mês: ${mesLabel}`,
      colunas: [{
        label: "Fornecedor / Funcionário"
      }, {
        label: "Categoria"
      }, {
        label: "Vencimento"
      }, {
        label: "Valor",
        align: "right"
      }],
      linhas: filtradas.map((c) => [c.fornecedor, catLabel[c.categoria], dataBR(c.vencimento), brl(c.valor)]),
      rodape: ["Total no período", "", "", brl(totalFiltrado)]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Contas a pagar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Compromissos por período e folha de pagamento." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: gerarRelatorio, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4 mr-1" }),
          " Relatório"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: abrirNovo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
          " Nova conta"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => {
      setOpen(o);
      if (!o) {
        setEditId(null);
        setForm(emptyForm);
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editId ? "Editar conta" : "Nova conta" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        salvar.mutate();
      }, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Categoria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.categoria, onValueChange: (v) => setF("categoria", v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fornecedor", children: "Fornecedor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "folha_pagamento", children: "Folha de pagamento" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "outros", children: "Outros" })
            ] })
          ] })
        ] }),
        form.categoria === "folha_pagamento" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Funcionário" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.funcionario_nome, onChange: (e) => setF("funcionario_nome", e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cargo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.funcionario_cargo, onChange: (e) => setF("funcionario_cargo", e.target.value) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Documento (CPF / matrícula)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.funcionario_documento, onChange: (e) => setF("funcionario_documento", e.target.value) })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Fornecedor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.fornecedor, onChange: (e) => setF("fornecedor", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.descricao, onChange: (e) => setF("descricao", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vencimento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.vencimento, onChange: (e) => setF("vencimento", e.target.value) }),
            form.categoria === "folha_pagamento" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-md border border-border px-2 py-1.5 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs cursor-pointer flex-1", children: [
                "5º dia útil do mês",
                quintoUtilStr && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-[10px] text-muted-foreground", children: [
                  "cai em ",
                  dataBR(quintoUtilStr)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: usarQuintoDiaUtil, onCheckedChange: aplicarQuintoDiaUtil })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Valor (R$)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyInput, { value: form.valor, onValueChange: (n) => setF("valor", n) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-md border border-border px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat, { className: "size-4" }),
            " Conta recorrente"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: form.recorrente, onCheckedChange: (v) => setF("recorrente", v) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: salvar.isPending, children: salvar.isPending ? "Salvando..." : editId ? "Salvar alterações" : "Agendar" })
      ] })
    ] }) }),
    vencidas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/60 bg-destructive/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between flex-wrap gap-2 text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-5" }),
          "Contas vencidas · ",
          vencidas.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal tabular-nums", children: brl(totalVencidas) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fornecedor / Funcionário" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Categoria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Vencimento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Atraso" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Valor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: vencidas.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-destructive/5 hover:bg-destructive/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-destructive", children: c.fornecedor }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: catLabel[c.categoria] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-destructive", children: dataBR(c.vencimento) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive text-destructive-foreground hover:bg-destructive pointer-events-none", children: [
            c.diasAtraso,
            "d em atraso"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums font-semibold text-destructive", children: brl(c.valor) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => abrirEditar(c), title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => c.recorrente && !c.finalizado_em ? pagarRecorrente.mutate(c) : toggle.mutate({
              id: c.id,
              status: "pago"
            }), children: "Pagar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDelete, { nome: c.fornecedor, onConfirm: () => remover.mutate(c.id) })
          ] }) })
        ] }, c.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar fornecedor...", value: busca, onChange: (e) => setBusca(e.target.value), className: "max-w-xs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "month", value: mesFiltro, onChange: (e) => setMesFiltro(e.target.value || mesAtual), className: "w-[180px]" }),
        mesFiltro !== mesAtual && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setMesFiltro(mesAtual), children: "Mês atual" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-sm", children: [
          "Total em ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: mesLabel }),
          ": ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary tabular-nums", children: brl(totalFiltrado) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "cursor-pointer", onClick: () => sortBy("fornecedor"), children: [
            "Fornecedor / Funcionário",
            arrow("fornecedor")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "cursor-pointer", onClick: () => sortBy("categoria"), children: [
            "Categoria",
            arrow("categoria")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "cursor-pointer", onClick: () => sortBy("vencimento"), children: [
            "Vencimento",
            arrow("vencimento")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "text-right cursor-pointer", onClick: () => sortBy("valor"), children: [
            "Valor",
            arrow("valor")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          filtradas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center text-muted-foreground py-8", children: "Nada no período." }) }),
          filtradas.map((c) => {
            const dd = Math.ceil((new Date(c.vencimento).getTime() - new Date(hojeStr).getTime()) / 864e5);
            const vencida = dd < 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  c.fornecedor,
                  c.recorrente && !c.finalizado_em && /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat, { className: "size-3 text-primary" })
                ] }),
                c.funcionario_cargo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.funcionario_cargo })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: catLabel[c.categoria] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: dataBR(c.vencimento) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: vencida ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive text-destructive-foreground hover:bg-destructive pointer-events-none", children: [
                "Vencida há ",
                Math.abs(dd),
                "d"
              ] }) : dd === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-warning text-warning-foreground hover:bg-warning pointer-events-none", children: "Vence hoje" }) : dd <= 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-warning text-warning-foreground hover:bg-warning pointer-events-none", children: [
                "Vence em ",
                dd,
                "d"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "hover:bg-secondary pointer-events-none", children: [
                "Em ",
                dd,
                "d"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums font-semibold", children: brl(c.valor) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => abrirEditar(c), title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => c.recorrente && !c.finalizado_em ? pagarRecorrente.mutate(c) : toggle.mutate({
                  id: c.id,
                  status: "pago"
                }), children: "Pagar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDelete, { nome: c.fornecedor, onConfirm: () => remover.mutate(c.id) })
              ] }) })
            ] }, c.id);
          })
        ] })
      ] }) })
    ] }),
    recorrentesAtivos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat, { className: "size-4 text-primary" }),
        " Recorrentes ativos (",
        recorrentesAtivos.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fornecedor / Funcionário" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Categoria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Vencimento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Valor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: recorrentesAtivos.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: c.fornecedor }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: catLabel[c.categoria] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: dataBR(c.vencimento) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums", children: brl(c.valor) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => abrirEditar(c), title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => finalizarRecorrencia.mutate(c.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3.5 mr-1" }),
              " Finalizar"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDelete, { nome: c.fornecedor, onConfirm: () => remover.mutate(c.id) })
          ] }) })
        ] }, c.id)) })
      ] }) })
    ] }),
    pagas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
        "Pagas (",
        pagas.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fornecedor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Vencimento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Valor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: pagas.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "line-through", children: c.fornecedor }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: dataBR(c.vencimento) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums", children: brl(c.valor) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => toggle.mutate({
              id: c.id,
              status: "pendente"
            }), children: "Reabrir" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDelete, { nome: c.fornecedor, onConfirm: () => remover.mutate(c.id) })
          ] }) })
        ] }, c.id)) })
      ] }) })
    ] })
  ] });
}
function ConfirmDelete({
  nome,
  onConfirm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5 text-destructive" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir conta?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Esta ação não pode ser desfeita. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: nome }),
          " será removida permanentemente."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: onConfirm, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Excluir" })
      ] })
    ] })
  ] });
}
export {
  ContasPage as component
};
