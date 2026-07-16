import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { b as logoLucelian, B as Button, e as loginFn, a as cn, f as changePasswordFn, s as setFirstPasswordFn } from "./router-B4Xld-CN.mjs";
import { L as Label, I as Input } from "./label-nM7b-b3G.mjs";
import { C as Card, a as CardHeader, c as CardTitle, d as CardDescription, b as CardContent } from "./card-CR4NHSTS.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-WjL2W88A.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { r as Sparkles, s as CircleCheck, t as TrendingUp, l as ShieldAlert, m as Mail, n as Lock, E as EyeOff, u as Eye, o as LoaderCircle, v as KeyRound, w as CheckCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "./server-CdGkcVaG.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = reactExports.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props }));
Alert.displayName = "Alert";
const AlertTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h5",
    {
      ref,
      className: cn("mb-1 font-medium leading-none tracking-tight", className),
      ...props
    }
  )
);
AlertTitle.displayName = "AlertTitle";
const AlertDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props }));
AlertDescription.displayName = "AlertDescription";
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [errorMsg, setErrorMsg] = reactExports.useState(null);
  const [showChangePwd, setShowChangePwd] = reactExports.useState(false);
  const [cpEmail, setCpEmail] = reactExports.useState("");
  const [cpCurrentPwd, setCpCurrentPwd] = reactExports.useState("");
  const [cpNewPwd, setCpNewPwd] = reactExports.useState("");
  const [cpConfirmPwd, setCpConfirmPwd] = reactExports.useState("");
  const [showCpCurrent, setShowCpCurrent] = reactExports.useState(false);
  const [showCpNew, setShowCpNew] = reactExports.useState(false);
  const [cpLoading, setCpLoading] = reactExports.useState(false);
  const [cpError, setCpError] = reactExports.useState(null);
  const [cpSuccess, setCpSuccess] = reactExports.useState(false);
  const [showFirstLogin, setShowFirstLogin] = reactExports.useState(false);
  const [firstLoginEmail, setFirstLoginEmail] = reactExports.useState("");
  const [flNewPwd, setFlNewPwd] = reactExports.useState("");
  const [flConfirmPwd, setFlConfirmPwd] = reactExports.useState("");
  const [showFlNew, setShowFlNew] = reactExports.useState(false);
  const [flLoading, setFlLoading] = reactExports.useState(false);
  const [flError, setFlError] = reactExports.useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await loginFn({
        data: {
          email: email.trim(),
          password
        }
      });
      if (result.needsPasswordSetup) {
        setFirstLoginEmail(email.trim());
        setFlNewPwd("");
        setFlConfirmPwd("");
        setFlError(null);
        setShowFirstLogin(true);
      } else {
        localStorage.setItem("app_session", JSON.stringify(result));
        window.dispatchEvent(new Event("storage"));
        navigate({
          to: "/"
        });
      }
    } catch (err) {
      setErrorMsg(err.message ?? "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setCpError(null);
    if (cpNewPwd !== cpConfirmPwd) {
      setCpError("As senhas não coincidem.");
      return;
    }
    if (cpNewPwd.length < 6) {
      setCpError("A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }
    setCpLoading(true);
    try {
      await changePasswordFn({
        data: {
          email: cpEmail.trim(),
          currentPassword: cpCurrentPwd,
          newPassword: cpNewPwd
        }
      });
      setCpSuccess(true);
    } catch (err) {
      setCpError(err.message ?? "Erro ao alterar senha.");
    } finally {
      setCpLoading(false);
    }
  };
  const closeChangePwd = () => {
    setShowChangePwd(false);
    setCpEmail("");
    setCpCurrentPwd("");
    setCpNewPwd("");
    setCpConfirmPwd("");
    setCpError(null);
    setCpSuccess(false);
  };
  const handleFirstLogin = async (e) => {
    e.preventDefault();
    setFlError(null);
    if (flNewPwd !== flConfirmPwd) {
      setFlError("As senhas não coincidem.");
      return;
    }
    if (flNewPwd.length < 6) {
      setFlError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    setFlLoading(true);
    try {
      const result = await setFirstPasswordFn({
        data: {
          email: firstLoginEmail,
          newPassword: flNewPwd
        }
      });
      localStorage.setItem("app_session", JSON.stringify(result));
      window.dispatchEvent(new Event("storage"));
      navigate({
        to: "/"
      });
    } catch (err) {
      setFlError(err.message ?? "Erro ao definir senha.");
    } finally {
      setFlLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen grid md:grid-cols-2 bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-primary via-primary/95 to-rose-950 text-white relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5 text-accent-foreground/50 fill-accent-foreground/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tracking-wider text-[11px] uppercase", children: "Gourmet Management" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center flex-1 max-w-md mx-auto space-y-8 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-48 bg-white/10 rounded-2xl flex items-center justify-center p-4 backdrop-blur-md shadow-2xl border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoLucelian, alt: "Doces Lucelian", className: "w-full h-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold tracking-tight font-script", children: "Doces Lucelian" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 font-light leading-relaxed", children: "Painel Integrado de Gestão Financeira, Controle de Vendas e Fluxo de Caixa." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm space-y-4 shadow-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-5 text-white shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Controle de Estoque e Vendas" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70", children: "Acompanhamento em tempo real de produtos vendidos e saídas." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-5 text-white shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Indicadores Financeiros" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70", children: "Lucratividade, faturamento bruto e conciliação de contas a pagar." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-white/60 relative z-10", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Doces Lucelian. Todos os direitos reservados."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-6 sm:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[420px] space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center md:hidden space-y-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-primary/5 rounded-2xl flex items-center justify-center p-2 shadow-md border border-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoLucelian, alt: "Doces Lucelian", className: "w-full h-auto object-contain" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold font-script tracking-tight text-primary", children: "Doces Lucelian" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Gestão Financeira e Controle Geral" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-2xl md:shadow-lg bg-card/60 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-bold tracking-tight", children: "Entrar no Sistema" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Informe seu login e senha para acessar o painel administrativo." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
            errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", className: "bg-destructive/10 border-destructive/20 text-destructive text-sm py-3 flex items-start gap-2 animate-in fade-in slide-in-from-top-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "size-4 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "leading-relaxed", children: errorMsg })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Login (e-mail ou usuário)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "text", placeholder: "seuemail@exemplo.com ou admin", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "pl-10", disabled: isLoading, autoComplete: "username" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Senha de acesso" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: showPassword ? "text" : "password", placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "pl-10 pr-10", disabled: isLoading, autoComplete: "current-password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors", tabIndex: -1, children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full mt-2 font-medium", disabled: isLoading, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 size-4 animate-spin" }),
              "Autenticando..."
            ] }) : "Acessar Painel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
              setCpEmail(email.trim());
              setCpCurrentPwd("");
              setCpNewPwd("");
              setCpConfirmPwd("");
              setCpError(null);
              setCpSuccess(false);
              setShowChangePwd(true);
            }, className: "text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline", children: "Alterar minha senha" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground md:hidden", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Doces Lucelian. Todos os direitos reservados."
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showChangePwd, onOpenChange: (open) => {
      if (!open) closeChangePwd();
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "size-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Alterar Senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-xs mt-0.5", children: "Confirme seu login e senha atual para definir uma nova senha." })
        ] })
      ] }) }),
      cpSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-4 py-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-14 rounded-full bg-green-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "size-7 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Senha alterada com sucesso!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Use a nova senha no próximo acesso." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: closeChangePwd, className: "mt-2 w-full", children: "Fechar" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleChangePassword, className: "space-y-4 pt-2", children: [
        cpError && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", className: "bg-destructive/10 border-destructive/20 text-destructive text-sm py-2.5 flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "size-4 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: cpError })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-email", children: "Usuário / Login" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cp-email", type: "text", placeholder: "admin", value: cpEmail, onChange: (e) => setCpEmail(e.target.value), required: true, className: "pl-10", disabled: cpLoading, autoComplete: "username" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-current", children: "Senha atual" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cp-current", type: showCpCurrent ? "text" : "password", placeholder: "••••••••", value: cpCurrentPwd, onChange: (e) => setCpCurrentPwd(e.target.value), required: true, className: "pl-10 pr-10", disabled: cpLoading, autoComplete: "current-password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowCpCurrent(!showCpCurrent), className: "absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors", tabIndex: -1, children: showCpCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-new", children: "Nova senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cp-new", type: showCpNew ? "text" : "password", placeholder: "Mínimo 6 caracteres", value: cpNewPwd, onChange: (e) => setCpNewPwd(e.target.value), required: true, className: "pl-10 pr-10", disabled: cpLoading, autoComplete: "new-password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowCpNew(!showCpNew), className: "absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors", tabIndex: -1, children: showCpNew ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-confirm", children: "Confirmar nova senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cp-confirm", type: "password", placeholder: "Repita a nova senha", value: cpConfirmPwd, onChange: (e) => setCpConfirmPwd(e.target.value), required: true, className: "pl-10", disabled: cpLoading, autoComplete: "new-password" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: closeChangePwd, disabled: cpLoading, className: "flex-1", children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: cpLoading, className: "flex-1", children: cpLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 size-4 animate-spin" }),
            "Salvando..."
          ] }) : "Alterar Senha" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showFirstLogin, onOpenChange: () => {
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", hideCloseButton: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-amber-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "size-5 text-amber-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Bem-vindo! Defina sua senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-xs mt-0.5", children: "Este é o seu primeiro acesso. Crie uma senha segura para continuar." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2.5 text-xs text-amber-700 dark:text-amber-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Usuário:" }),
        " ",
        firstLoginEmail
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleFirstLogin, className: "space-y-4", children: [
        flError && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", className: "bg-destructive/10 border-destructive/20 text-destructive text-sm py-2.5 flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "size-4 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: flError })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fl-new", children: "Nova senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "fl-new", type: showFlNew ? "text" : "password", placeholder: "Mínimo 6 caracteres", value: flNewPwd, onChange: (e) => setFlNewPwd(e.target.value), required: true, className: "pl-10 pr-10", disabled: flLoading, autoComplete: "new-password", autoFocus: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowFlNew(!showFlNew), className: "absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors", tabIndex: -1, children: showFlNew ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fl-confirm", children: "Confirmar senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "fl-confirm", type: "password", placeholder: "Repita a nova senha", value: flConfirmPwd, onChange: (e) => setFlConfirmPwd(e.target.value), required: true, className: "pl-10", disabled: flLoading, autoComplete: "new-password" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: flLoading, className: "w-full mt-2", children: flLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 size-4 animate-spin" }),
          "Definindo senha..."
        ] }) : "Definir Senha e Entrar" })
      ] })
    ] }) })
  ] });
}
export {
  LoginPage as component
};
