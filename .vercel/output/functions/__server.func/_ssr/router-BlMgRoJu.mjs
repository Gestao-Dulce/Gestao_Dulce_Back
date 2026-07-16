import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useNavigate, d as useRouterState, O as Outlet, H as HeadContent, S as Scripts, e as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogPortal, d as DialogContent, g as DialogClose, e as DialogTitle, h as DialogOverlay, f as DialogDescription } from "../_libs/radix-ui__react-dialog.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-B-RH4323.mjs";
import { L as LogOut, S as Sun, M as Moon, a as Menu, B as Bot, X, U as User, b as LoaderCircle, c as MicOff, d as Mic, e as Send, f as MessageSquare, g as LayoutDashboard, h as Users, P as Package, i as ShoppingBag, C as CalendarClock, j as UserPlus } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
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
const Sheet = Dialog;
const SheetTrigger = DialogTrigger;
const SheetPortal = DialogPortal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogOverlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = DialogContent.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogTitle.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogDescription.displayName;
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
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
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
  const NavLinks = ({ onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1 w-full", children: navigation.map(({ to, label, icon: Icon }) => {
    const active = to === "/" ? path === "/" : path.startsWith(to);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to,
        onClick,
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
  }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col md:flex-row bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 shrink-0 bg-sidebar text-sidebar-foreground hidden md:flex flex-col justify-between border-r border-sidebar-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoLucelian, alt: "Doces Lucelian", className: "max-w-[150px] h-auto object-contain" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.2em] uppercase text-sidebar-foreground/70 mt-3 text-center", children: "Gestão Financeira" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavLinks, {}) })
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-sidebar-border md:border-border px-4 md:px-10 py-3 md:py-4 flex items-center justify-between bg-sidebar md:bg-card text-sidebar-foreground md:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center justify-between w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.2em] uppercase text-primary font-medium", children: "Painel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize mt-0.5", children: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: toggle, "aria-label": "Alternar tema", children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-4" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex md:hidden items-center justify-between w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: mobileMenuOpen, onOpenChange: setMobileMenuOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "icon", className: "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Menu de navegação" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "left", className: "w-64 bg-sidebar text-sidebar-foreground p-0 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "p-4 border-b border-sidebar-border text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "text-sidebar-foreground flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoLucelian, alt: "Doces Lucelian", className: "max-w-[120px] h-auto object-contain" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] tracking-[0.2em] uppercase text-sidebar-foreground/70 mt-2 block", children: "Gestão Financeira" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavLinks, { onClick: () => setMobileMenuOpen(false) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  onClick: () => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  },
                  className: "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground gap-3 font-normal cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
                    "Sair"
                  ]
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: toggle, "aria-label": "Alternar tema", className: "size-8 text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground", children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoLucelian, alt: "Doces Lucelian", className: "h-8 w-auto object-contain" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 md:p-10 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
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
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const aiChatFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSsrRpc("e345c27d5ab3a542b5dde18807afcb51d5b46f62dbc9d2e5f5819f23467ad139"));
function AiAssistant() {
  const [open, setOpen] = reactExports.useState(false);
  const [messages, setMessages] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [isRecording, setIsRecording] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  const recognitionRef = reactExports.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };
  reactExports.useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);
  reactExports.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = "pt-BR";
      rec.continuous = false;
      rec.interimResults = false;
      rec.onstart = () => {
        setIsRecording(true);
      };
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
        }
      };
      rec.onerror = (event) => {
        console.error("Erro no reconhecimento de voz:", event.error);
        if (event.error !== "no-speech") {
          toast.error("Erro ao reconhecer a voz. Tente novamente.");
        }
        setIsRecording(false);
      };
      rec.onend = () => {
        setIsRecording(false);
      };
      recognitionRef.current = rec;
    }
  }, []);
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Reconhecimento de voz não suportado neste navegador.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setInput("");
      recognitionRef.current.start();
    }
  };
  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    const newMessages = [...messages, {
      role: "user",
      content: userMessage
    }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await aiChatFn({
        message: userMessage,
        history: messages
      });
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: res.text
      }]);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Erro ao obter resposta do assistente.");
    } finally {
      setLoading(false);
    }
  };
  const formatText = (text) => {
    return text.split("\n").map((line, idx) => {
      let formatted = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      formatted = formatted.replace(boldRegex, "<strong>$1</strong>");
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const content = line.trim().substring(2);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "ml-4 list-disc", dangerouslySetInnerHTML: {
          __html: content.replace(boldRegex, "<strong>$1</strong>")
        } }, idx);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 leading-relaxed text-sm", dangerouslySetInnerHTML: {
        __html: formatted
      } }, idx);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 z-50 flex flex-col items-end", children: [
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-[360px] sm:w-[420px] h-[500px] mb-4 flex flex-col shadow-2xl border-primary/20 animate-in fade-in slide-in-from-bottom-6 duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "bg-primary text-primary-foreground py-3 px-4 flex flex-row items-center justify-between rounded-t-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold", children: "Assistente Lucelian" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-80 block", children: "Online" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-primary-foreground hover:bg-primary-foreground/10 size-8", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20", children: [
        messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-10 mx-auto text-primary opacity-60 animate-bounce" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Olá! Sou o assistente da Doces Lucelian." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground max-w-[80%] mx-auto", children: "Você pode me fazer perguntas sobre vendas, produtos cadastrados, contas a pagar e clientes." })
        ] }),
        messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex gap-2 max-w-[85%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("size-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs", msg.role === "user" ? "bg-primary" : "bg-zinc-600"), children: msg.role === "user" ? /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-3 rounded-lg text-sm shadow-sm", msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card text-foreground rounded-tl-none border border-border"), children: formatText(msg.content) })
        ] }, i)),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mr-auto max-w-[85%] items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-7 rounded-full flex items-center justify-center shrink-0 bg-zinc-600 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card text-foreground p-3 rounded-lg border border-border rounded-tl-none shadow-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground animate-pulse", children: "Pesquisando dados..." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "p-3 border-t bg-card rounded-b-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSend, className: "flex gap-1.5 w-full items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Pergunte sobre faturamento, vendas...", value: input, onChange: (e) => setInput(e.target.value), disabled: loading, className: "flex-1 h-9" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: isRecording ? "destructive" : "outline", size: "icon", onClick: toggleRecording, disabled: loading, className: cn("size-9 shrink-0", isRecording && "animate-pulse"), title: isRecording ? "Parar gravação" : "Digitar por voz", children: isRecording ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "icon", disabled: !input.trim() || loading, className: "size-9 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", className: cn("size-14 rounded-full shadow-2xl cursor-pointer transition-transform hover:scale-105 duration-300", open ? "bg-zinc-600 hover:bg-zinc-700" : "bg-primary hover:bg-primary/90"), onClick: () => setOpen(!open), children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-6" }) })
  ] });
}
const appCss = "/assets/styles-BjwFu2wc.css";
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" }),
    !isLoginPage && /* @__PURE__ */ jsxRuntimeExports.jsx(AiAssistant, {})
  ] }) });
}
const $$splitComponentImporter$6 = () => import("./vendas-rkLlUMgl.mjs");
const Route$6 = createFileRoute("/vendas")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./usuarios-DLNYS_ok.mjs");
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
const $$splitComponentImporter$4 = () => import("./produtos-BCs3Na5D.mjs");
const Route$4 = createFileRoute("/produtos")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./login-C1y7dL9A.mjs");
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
const $$splitComponentImporter$2 = () => import("./contas-a-pagar-_emKLF2s.mjs");
const Route$2 = createFileRoute("/contas-a-pagar")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./clientes-DwxX58Sg.mjs");
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
const $$splitComponentImporter = () => import("./index-BnwU96fC.mjs");
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
  Card as C,
  Input as I,
  CardHeader as a,
  CardContent as b,
  CardTitle as c,
  createUserFn as d,
  deleteUserFn as e,
  CardDescription as f,
  cn as g,
  logoLucelian as h,
  loginFn as i,
  changePasswordFn as j,
  buttonVariants as k,
  listUsersFn as l,
  router as m,
  resetUserPasswordFn as r,
  setFirstPasswordFn as s
};
