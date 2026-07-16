import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-Y2DWLo6B.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { B as Button } from "./router-B4Xld-CN.mjs";
import { I as Input, L as Label } from "./label-nM7b-b3G.mjs";
import { C as Card, a as CardHeader, b as CardContent } from "./card-CR4NHSTS.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-WjL2W88A.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, A as AlertDialog, f as AlertDialogTrigger, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction } from "./alert-dialog-DKoYb0sx.mjs";
import { B as Badge } from "./badge-MdC416p9.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as brl, i as formatCPFCNPJ, j as formatPhone, h as hoje } from "./select-PzeMncBS.mjs";
import { f } from "./select-PzeMncBS.mjs";
import { i as imprimir } from "./report-BbKMnZIj.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { d as Printer, e as Plus, z as Search, g as Pencil, T as Trash2, o as LoaderCircle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, l as literalType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
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
const schema = objectType({
  nome: stringType().trim().min(2).max(120),
  cpf_cnpj: stringType().trim().max(20).optional().or(literalType("")),
  contato: stringType().trim().max(60).optional().or(literalType("")),
  localizacao: stringType().trim().max(120).optional().or(literalType("")),
  cep: stringType().trim().max(10).optional().or(literalType("")),
  rua: stringType().trim().max(160).optional().or(literalType("")),
  numero: stringType().trim().max(20).optional().or(literalType("")),
  bairro: stringType().trim().max(120).optional().or(literalType("")),
  cidade: stringType().trim().max(120).optional().or(literalType(""))
});
function statusCliente(vendas) {
  const naoPagas = vendas.filter((v) => v.status_pagamento !== "pago");
  if (naoPagas.length === 0) return "em_dia";
  const h = hoje();
  if (naoPagas.some((v) => v.data_pagamento && v.data_pagamento < h)) return "atrasado";
  return "pendente";
}
function ClientesPage() {
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [editId, setEditId] = reactExports.useState(null);
  const [busca, setBusca] = reactExports.useState("");
  const [filtroStatus, setFiltroStatus] = reactExports.useState("todos");
  const [sortKey, setSortKey] = reactExports.useState("nome");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [buscandoCep, setBuscandoCep] = reactExports.useState(false);
  const form = useForm({
    resolver: u(schema),
    defaultValues: {
      nome: "",
      cpf_cnpj: "",
      contato: "",
      localizacao: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: ""
    }
  });
  const {
    data: clientes = []
  } = useQuery({
    queryKey: ["clientes"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("clientes").select("*, vendas(valor_total, status_pagamento, data_pagamento)").order("nome");
      if (error) throw error;
      return data;
    }
  });
  const upsert = useMutation({
    mutationFn: async (v) => {
      const payload = {
        nome: v.nome,
        cpf_cnpj: v.cpf_cnpj || null,
        contato: v.contato || null,
        localizacao: v.localizacao || null,
        cep: v.cep || null,
        rua: v.rua || null,
        numero: v.numero || null,
        bairro: v.bairro || null,
        cidade: v.cidade || null
      };
      if (editId) {
        const {
          error
        } = await supabase.from("clientes").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const {
          error
        } = await supabase.from("clientes").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editId ? "Cliente atualizado" : "Cliente cadastrado");
      setOpen(false);
      setEditId(null);
      form.reset();
      qc.invalidateQueries({
        queryKey: ["clientes"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const remover = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("clientes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Cliente excluído");
      qc.invalidateQueries({
        queryKey: ["clientes"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const openNew = () => {
    setEditId(null);
    form.reset({
      nome: "",
      cpf_cnpj: "",
      contato: "",
      localizacao: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: ""
    });
    setOpen(true);
  };
  const openEdit = (c) => {
    setEditId(c.id);
    form.reset({
      nome: c.nome,
      cpf_cnpj: c.cpf_cnpj ?? "",
      contato: c.contato ?? "",
      localizacao: c.localizacao ?? "",
      cep: c.cep ?? "",
      rua: c.rua ?? "",
      numero: c.numero ?? "",
      bairro: c.bairro ?? "",
      cidade: c.cidade ?? ""
    });
    setOpen(true);
  };
  const buscarCep = async () => {
    const cep = (form.getValues("cep") ?? "").replace(/\D/g, "");
    if (cep.length !== 8) {
      toast.error("CEP inválido");
      return;
    }
    try {
      setBuscandoCep(true);
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }
      form.setValue("rua", data.logradouro ?? "");
      form.setValue("bairro", data.bairro ?? "");
      form.setValue("cidade", [data.localidade, data.uf].filter(Boolean).join(" / "));
      toast.success("Endereço preenchido");
    } catch {
      toast.error("Falha ao buscar CEP");
    } finally {
      setBuscandoCep(false);
    }
  };
  const enriched = clientes.map((c) => ({
    ...c,
    _total: (c.vendas ?? []).reduce((s, v) => s + Number(v.valor_total), 0),
    _status: statusCliente(c.vendas ?? [])
  }));
  const filtrados = enriched.filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()) || (c.cpf_cnpj ?? "").includes(busca)).filter((c) => filtroStatus === "todos" || c._status === filtroStatus).sort((a, b) => {
    const av = sortKey === "total" ? a._total : a[sortKey] ?? "";
    const bv = sortKey === "total" ? b._total : b[sortKey] ?? "";
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
  const statusLabel = {
    em_dia: "Em dia",
    pendente: "Pendente",
    atrasado: "Atrasado"
  };
  const gerarRelatorio = () => {
    imprimir({
      titulo: "Relatório de Clientes",
      meta: filtroStatus !== "todos" ? `Status: ${statusLabel[filtroStatus]}` : void 0,
      colunas: [{
        label: "Nome"
      }, {
        label: "CPF/CNPJ"
      }, {
        label: "Contato"
      }, {
        label: "Endereço"
      }, {
        label: "Status"
      }, {
        label: "Total",
        align: "right"
      }],
      linhas: filtrados.map((c) => [c.nome, c.cpf_cnpj || "—", c.contato || "—", [c.rua, c.numero].filter(Boolean).join(", ") + (c.bairro ? ` — ${c.bairro}` : "") + (c.cidade ? ` (${c.cidade})` : "") || "—", statusLabel[c._status], brl(c._total)]),
      rodape: ["Total geral", "", "", "", "", brl(filtrados.reduce((s, c) => s + c._total, 0))]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Clientes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cadastro, status financeiro e histórico de compras." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: gerarRelatorio, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4 mr-1" }),
          " Relatório"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openNew, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
          " Novo cliente"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: busca, onChange: (e) => setBusca(e.target.value), placeholder: "Buscar por nome ou documento...", className: "pl-9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filtroStatus, onValueChange: setFiltroStatus, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "todos", children: "Todos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "em_dia", children: "Em dia" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pendente", children: "Pendente" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "atrasado", children: "Atrasado" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "cursor-pointer", onClick: () => sortBy("nome"), children: [
            "Nome",
            arrow("nome")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "cursor-pointer", onClick: () => sortBy("cpf_cnpj"), children: [
            "CPF / CNPJ",
            arrow("cpf_cnpj")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Contato" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableHead, { className: "text-right cursor-pointer", onClick: () => sortBy("total"), children: [
            "Total",
            arrow("total")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          filtrados.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center text-muted-foreground py-8", children: "Nenhum cliente." }) }),
          filtrados.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: c.nome }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground tabular-nums", children: c.cpf_cnpj || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: c.contato || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClienteStatus, { s: c._status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums", children: brl(c._total) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => openEdit(c), title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5 text-destructive" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir cliente?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                      "Esta ação não pode ser desfeita. O cliente ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: c.nome }),
                      " será removido permanentemente."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => remover.mutate(c.id), className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Excluir" })
                  ] })
                ] })
              ] })
            ] }) })
          ] }, c.id))
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editId ? "Editar cliente" : "Novo cliente" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit((v) => upsert.mutate(v)), className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome / Razão social" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("nome") }),
          form.formState.errors.nome && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: form.formState.errors.nome.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "CPF / CNPJ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "000.000.000-00 ou 00.000.000/0000-00", value: form.watch("cpf_cnpj") ?? "", onChange: (e) => form.setValue("cpf_cnpj", formatCPFCNPJ(e.target.value), {
            shouldValidate: true
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contato" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "(00) 00000-0000", value: form.watch("contato") ?? "", onChange: (e) => form.setValue("contato", formatPhone(e.target.value), {
            shouldValidate: true
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto] gap-2 items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "CEP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "00000-000", ...form.register("cep") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", onClick: buscarCep, disabled: buscandoCep, children: [
            buscandoCep ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1", children: "Buscar" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rua" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("rua") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Número" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("numero") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bairro" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("bairro") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cidade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("cidade") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Complemento / Referência" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("localizacao") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: upsert.isPending, children: upsert.isPending ? "Salvando..." : editId ? "Salvar alterações" : "Cadastrar" })
      ] })
    ] }) })
  ] });
}
function ClienteStatus({
  s
}) {
  const base = "pointer-events-none";
  if (s === "em_dia") return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `bg-success text-success-foreground hover:bg-success ${base}`, children: "Em dia" });
  if (s === "atrasado") return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `bg-destructive text-destructive-foreground hover:bg-destructive ${base}`, children: "Atrasado" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `bg-warning text-warning-foreground hover:bg-warning ${base}`, children: "Pendente" });
}
export {
  ClientesPage as component,
  f as dataBR
};
