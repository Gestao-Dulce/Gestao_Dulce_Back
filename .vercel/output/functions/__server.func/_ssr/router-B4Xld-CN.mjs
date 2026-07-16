import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useNavigate, d as useRouterState, O as Outlet, H as HeadContent, S as Scripts, e as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CdGkcVaG.mjs";
import { L as LayoutDashboard, U as Users, P as Package, S as ShoppingBag, C as CalendarClock, a as UserPlus, b as LogOut, c as Sun, M as Moon } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, l as literalType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ThemeContext = reactExports.createContext({
  theme: "light",
  toggle: () => {
  }
});
function ThemeProvider({ children }) {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
  }, []);
  reactExports.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: { theme, toggle: () => setTheme((t) => t === "dark" ? "light" : "dark") }, children });
}
const useTheme = () => reactExports.useContext(ThemeContext);
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const logoLucelian = "/assets/logo-lucelian-At4QMhLA.png";
const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/produtos", label: "Produtos", icon: Package },
  { to: "/vendas", label: "Vendas", icon: ShoppingBag },
  { to: "/contas-a-pagar", label: "Contas a pagar", icon: CalendarClock }
];
function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();
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
  const navigation = [
    ...nav,
    ...isAdmin ? [{ to: "/usuarios", label: "Usuários", icon: UserPlus }] : []
  ];
  const handleLogout = () => {
    localStorage.removeItem("app_session");
    window.dispatchEvent(new Event("storage"));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 shrink-0 bg-sidebar text-sidebar-foreground hidden md:flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-0 py-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoLucelian, alt: "Doces Lucelian", className: "w-full h-auto object-contain" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.2em] uppercase text-sidebar-foreground/70 mt-3 text-center", children: "Gestão Financeira" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "p-3 flex flex-col gap-1 mt-3", children: navigation.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to,
              className: cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/60"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4" }),
                label
              ]
            },
            to
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          onClick: handleLogout,
          className: "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground gap-3 font-normal cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
            "Sair"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border px-6 md:px-10 py-4 flex items-center justify-between bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.2em] uppercase text-primary font-medium", children: "Painel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize mt-1", children: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: handleLogout,
              className: "md:hidden text-muted-foreground hover:text-foreground",
              "aria-label": "Sair",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: toggle, "aria-label": "Alternar tema", children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 md:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-Dhsv0TOU.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  ssr: false,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Doces Lucelian — Gestão Financeira" },
      { name: "description", content: "Painel de gestão financeira da Doces Lucelian" },
      { property: "og:title", content: "Doces Lucelian — Gestão Financeira" },
      { name: "twitter:title", content: "Doces Lucelian — Gestão Financeira" },
      { property: "og:description", content: "Painel de gestão financeira da Doces Lucelian" },
      { name: "twitter:description", content: "Painel de gestão financeira da Doces Lucelian" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/6dede5e3-b85f-46ce-bf11-a65204f7b69a" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/6dede5e3-b85f-46ce-bf11-a65204f7b69a" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function PageLoader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground animate-pulse", children: "Carregando..." })
  ] }) });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const isLoginPage = routerState.location.pathname === "/login";
  const getSessionFromStorage = () => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("app_session");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  reactExports.useEffect(() => {
    let mounted = true;
    const checkAuth = () => {
      const s = getSessionFromStorage();
      if (!mounted) return;
      setSession(s);
      setLoading(false);
      if (!s && !isLoginPage) {
        navigate({ to: "/login" });
      } else if (s && isLoginPage) {
        navigate({ to: "/" });
      }
    };
    checkAuth();
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      mounted = false;
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isLoginPage, navigate]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    isLoginPage ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$6 = () => import("./vendas-D18A1YAY.mjs");
const Route$6 = createFileRoute("/vendas")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const $$splitComponentImporter$5 = () => import("./usuarios-vmPcXffu.mjs");
const listUsersFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("71433e0925a862d3dd2f5b0ed01ccd423acd1ec05ae2f5e860f0f136a008906a"));
const createUserFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("6594890a8cb752ac50bf66433c7f49dc3d73bc4563fd30d865ce19261499e7cb"));
const resetUserPasswordFn = createServerFn({
  method: "POST"
}).validator((id) => id).handler(createSsrRpc("53d1ca62673e273a8ca13066698e6b74ef727371d3f30b52aadc77f749552fb3"));
const deleteUserFn = createServerFn({
  method: "POST"
}).validator((id) => id).handler(createSsrRpc("befdb0b870359b571f39014342fc28fede1f7c92472c089db6a741cb26afc0a7"));
const Route$5 = createFileRoute("/usuarios")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./produtos-BaOkWkCV.mjs");
const Route$4 = createFileRoute("/produtos")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./login-D6N9kiK9.mjs");
const loginFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("1b16c41c2f4ec5be0b02b54ca085c9661bc4a8cd2eb184e33412ec8df53c6714"));
const changePasswordFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("784b0cb0fdaa8dfd7acb2371b9cb04cb742e6060bf1dd865993cd0a082d1aa58"));
const setFirstPasswordFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("17d1a3f1318589df35d6836ee7087fc14f590a29332fd46b2e742bda662d97cc"));
const Route$3 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./contas-a-pagar-BqBWKn7s.mjs");
const Route$2 = createFileRoute("/contas-a-pagar")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./clientes-DqhMQNyE.mjs");
const Route$1 = createFileRoute("/clientes")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
objectType({
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
const $$splitComponentImporter = () => import("./index-2_TSQUsE.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VendasRoute = Route$6.update({
  id: "/vendas",
  path: "/vendas",
  getParentRoute: () => Route$7
});
const UsuariosRoute = Route$5.update({
  id: "/usuarios",
  path: "/usuarios",
  getParentRoute: () => Route$7
});
const ProdutosRoute = Route$4.update({
  id: "/produtos",
  path: "/produtos",
  getParentRoute: () => Route$7
});
const LoginRoute = Route$3.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$7
});
const ContasAPagarRoute = Route$2.update({
  id: "/contas-a-pagar",
  path: "/contas-a-pagar",
  getParentRoute: () => Route$7
});
const ClientesRoute = Route$1.update({
  id: "/clientes",
  path: "/clientes",
  getParentRoute: () => Route$7
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  ClientesRoute,
  ContasAPagarRoute,
  LoginRoute,
  ProdutosRoute,
  UsuariosRoute,
  VendasRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  cn as a,
  logoLucelian as b,
  createUserFn as c,
  deleteUserFn as d,
  loginFn as e,
  changePasswordFn as f,
  buttonVariants as g,
  router as h,
  listUsersFn as l,
  resetUserPasswordFn as r,
  setFirstPasswordFn as s
};
