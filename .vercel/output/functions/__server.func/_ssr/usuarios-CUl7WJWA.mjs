import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { B as Button, r as resetUserPasswordFn, d as deleteUserFn, c as createUserFn, l as listUsersFn } from "./router-CVdnCVMw.mjs";
import { L as Label, I as Input } from "./label-DejT35X0.mjs";
import { C as Card, a as CardHeader, c as CardTitle, d as CardDescription, b as CardContent } from "./card-C9FC8QL0.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, A as AlertDialog, f as AlertDialogTrigger, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction } from "./alert-dialog-N36W3UXL.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { l as ShieldAlert, a as UserPlus, m as Mail, n as Lock, K as Key, o as LoaderCircle, p as ShieldCheck, q as Clock, R as RotateCcw, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
function UserManagementPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const getSession = () => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(localStorage.getItem("app_session") ?? "null");
    } catch {
      return null;
    }
  };
  const session = getSession();
  const isAdmin = session?.isAdmin === true;
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    refetch
  } = useQuery({
    queryKey: ["usuarios-list"],
    queryFn: () => listUsersFn(),
    enabled: isAdmin
  });
  const createMutation = useMutation({
    mutationFn: (vars) => createUserFn({
      data: vars
    }),
    onSuccess: () => {
      toast.success("Operador cadastrado com sucesso!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      refetch();
    },
    onError: (err) => toast.error(`Erro ao cadastrar: ${err.message}`),
    onSettled: () => setIsSubmitting(false)
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteUserFn({
      data: id
    }),
    onSuccess: () => {
      toast.success("Usuário excluído com sucesso!");
      refetch();
    },
    onError: (err) => toast.error(`Erro ao excluir: ${err.message}`)
  });
  const resetPasswordMutation = useMutation({
    mutationFn: (id) => resetUserPasswordFn({
      data: id
    }),
    onSuccess: () => {
      toast.success("Senha limpa! O usuário deverá definir uma nova senha no próximo login.");
      refetch();
    },
    onError: (err) => toast.error(`Erro ao limpar senha: ${err.message}`)
  });
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }
    setIsSubmitting(true);
    createMutation.mutate({
      email,
      password
    });
  };
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "size-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Acesso Restrito" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-md text-sm", children: "Esta área é de uso exclusivo para o Administrador Geral do sistema." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90", children: "Voltar ao Dashboard" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Gerenciamento de Usuários" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cadastre novos operadores e gerencie acessos ao sistema. As senhas são armazenadas de forma criptografada." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "md:col-span-1 h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-5 text-primary" }),
            "Novo Operador"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "A senha será criptografada antes de ser salva no banco de dados." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateUser, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Login (e-mail ou usuário)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "text", placeholder: "operador@doceslucelian.com", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "pl-10", disabled: isSubmitting })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Senha" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "pl-10", disabled: isSubmitting })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirmPassword", children: "Confirmar senha" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "confirmPassword", type: "password", placeholder: "••••••••", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, className: "pl-10", disabled: isSubmitting })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full font-medium", disabled: isSubmitting, children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 size-4 animate-spin" }),
            "Cadastrando..."
          ] }) : "Cadastrar Operador" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5 text-primary" }),
            "Usuários Cadastrados"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Lista de todos os usuários com acesso ao sistema (senhas não são exibidas)." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoadingUsers ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-10 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-6 animate-spin text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando usuários..." })
        ] }) : users.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10 text-muted-foreground text-sm", children: "Nenhum usuário cadastrado ainda." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-md overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Login" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden sm:table-cell", children: "Cadastrado em" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[80px] text-right", children: "Ações" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: users.map((user) => {
            const isSystemAdmin = user.email === "admin";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.email }),
                isSystemAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary font-semibold uppercase mt-0.5 tracking-wider", children: "Administrador" }),
                !isSystemAdmin && !user.senha_hash && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-amber-600 font-semibold uppercase mt-0.5 tracking-wider", children: "Aguardando 1º acesso" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden sm:table-cell text-muted-foreground text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
                new Date(user.created_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: !isSystemAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-amber-600 hover:text-amber-700 hover:bg-amber-500/10 size-8", disabled: resetPasswordMutation.isPending || deleteMutation.isPending, title: "Limpar senha (solicitar novo cadastro)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-4" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Limpar Senha do Usuário" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                        "A senha de ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: user.email }),
                        " será removida. No próximo login, o usuário precisará definir uma nova senha. Esta ação não exclui o usuário."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => resetPasswordMutation.mutate(user.id), className: "bg-amber-600 text-white hover:bg-amber-700", children: "Limpar Senha" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-destructive hover:text-destructive hover:bg-destructive/10 size-8", disabled: deleteMutation.isPending || resetPasswordMutation.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir Operador" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                        "Tem certeza que deseja excluir o acesso de ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: user.email }),
                        "? Esta ação é irreversível."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => deleteMutation.mutate(user.id), className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Excluir Acesso" })
                    ] })
                  ] })
                ] })
              ] }) })
            ] }, user.id);
          }) })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  UserManagementPage as component
};
