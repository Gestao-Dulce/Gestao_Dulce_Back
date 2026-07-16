import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BE5Wis3r.mjs";
import { B as Button } from "./router-CVdnCVMw.mjs";
import { I as Input, L as Label } from "./label-DejT35X0.mjs";
import { T as Textarea } from "./textarea-CjyMvsr7.mjs";
import { C as Card, a as CardHeader, b as CardContent } from "./card-C9FC8QL0.mjs";
import { e as brl, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BH2DWyPf.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, A as AlertDialog, f as AlertDialogTrigger, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction } from "./alert-dialog-N36W3UXL.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DWqCSSHs.mjs";
import { C as CurrencyInput } from "./currency-input-DtVQ5nkF.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/seroval.mjs";
import { d as Printer, e as Plus, g as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./index-DoFzyMbP.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "tslib";
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
import "./server-Cx9svbWa.mjs";
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
import "../_libs/supabase__phoenix.mjs";
const UNIDADES = ["unidade", "kg", "caixa"];
function ProdutosPage() {
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [busca, setBusca] = reactExports.useState("");
  const {
    data: produtos = []
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("produtos").select("*").order("nome");
      if (error) throw error;
      return data ?? [];
    }
  });
  const remover = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("produtos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Produto excluído");
      qc.invalidateQueries({
        queryKey: ["produtos"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const filtrados = produtos.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()) || (p.observacao ?? "").toLowerCase().includes(busca.toLowerCase()));
  const imprimirRelatorio = () => {
    const linhas = filtrados.map((p) => `<tr>
      <td>${p.nome}</td>
      <td>${p.unidade.charAt(0).toUpperCase() + p.unidade.slice(1)}</td>
      <td style="text-align:right">${brl(p.valor)}</td>
      <td>${p.observacao ?? "—"}</td>
    </tr>`).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Relatório de Produtos — Doces Lucelian</title>
      <style>
        body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#1a1a1a}
        h1{color:#c8102e;margin:0 0 4px}
        .meta{color:#666;font-size:12px;margin-bottom:16px}
        table{width:100%;border-collapse:collapse;font-size:12px}
        th,td{padding:8px;border-bottom:1px solid #e5e5e5;text-align:left}
        th{background:#fafafa;text-transform:uppercase;font-size:10px;letter-spacing:.05em}
      </style></head><body>
      <h1>Doces Lucelian — Relatório de Produtos</h1>
      <div class="meta">Emitido em ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")} • ${filtrados.length} produto(s)${busca ? ` • Busca: "${busca}"` : ""}</div>
      <table>
        <thead><tr><th>Nome</th><th>Unidade</th><th style="text-align:right">Valor</th><th>Observação</th></tr></thead>
        <tbody>${linhas || `<tr><td colspan="4" style="text-align:center;padding:24px;color:#888">Sem produtos.</td></tr>`}</tbody>
      </table>
      <script>window.onload=()=>window.print();<\/script>
    </body></html>`;
    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) return toast.error("Permita pop-ups para imprimir");
    w.document.write(html);
    w.document.close();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Produtos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cadastro de produtos com unidade, valor e observações." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: imprimirRelatorio, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4 mr-1" }),
          " Relatório"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          setEditing(null);
          setOpen(true);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
          " Novo produto"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar produto...", value: busca, onChange: (e) => setBusca(e.target.value), className: "max-w-sm" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Unidade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Valor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Observação" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          filtrados.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center text-muted-foreground py-8", children: "Nenhum produto cadastrado." }) }),
          filtrados.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: p.nome }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: p.unidade.charAt(0).toUpperCase() + p.unidade.slice(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums", children: brl(p.valor) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm max-w-md truncate", title: p.observacao ?? "", children: p.observacao || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => {
                setEditing(p);
                setOpen(true);
              }, title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5 text-destructive" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir produto?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                      "O produto ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: p.nome }),
                      " será removido do cadastro. Vendas anteriores não serão afetadas."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => remover.mutate(p.id), className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Excluir" })
                  ] })
                ] })
              ] })
            ] }) })
          ] }, p.id))
        ] })
      ] }) })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(ProdutoDialog, { open, onClose: () => setOpen(false), produto: editing, onSaved: () => qc.invalidateQueries({
      queryKey: ["produtos"]
    }) })
  ] });
}
function ProdutoDialog({
  open,
  onClose,
  produto,
  onSaved
}) {
  const [nome, setNome] = reactExports.useState(produto?.nome ?? "");
  const [observacao, setObservacao] = reactExports.useState(produto?.observacao ?? "");
  const [unidade, setUnidade] = reactExports.useState(produto?.unidade ?? "unidade");
  const [valor, setValor] = reactExports.useState(produto ? Number(produto.valor) : 0);
  const [salvando, setSalvando] = reactExports.useState(false);
  const save = async () => {
    if (!nome.trim()) return toast.error("Informe o nome");
    setSalvando(true);
    const payload = {
      nome: nome.trim(),
      observacao: observacao.trim() || null,
      unidade,
      valor: Number(valor) || 0
    };
    const op = produto ? supabase.from("produtos").update(payload).eq("id", produto.id) : supabase.from("produtos").insert(payload);
    const {
      error
    } = await op;
    setSalvando(false);
    if (error) return toast.error(error.message);
    toast.success(produto ? "Produto atualizado" : "Produto cadastrado");
    onSaved();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: produto ? "Editar produto" : "Novo produto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: nome, onChange: (e) => setNome(e.target.value), autoFocus: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Unidade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: unidade, onValueChange: setUnidade, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: UNIDADES.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: u, children: u }, u)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Valor (R$)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyInput, { value: valor, onValueChange: setValor })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Observação" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: observacao ?? "", onChange: (e) => setObservacao(e.target.value), rows: 3 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: onClose, children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, disabled: salvando, children: salvando ? "Salvando..." : produto ? "Salvar" : "Cadastrar" })
      ] })
    ] })
  ] }) });
}
export {
  ProdutosPage as component
};
