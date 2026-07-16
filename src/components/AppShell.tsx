import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, ShoppingBag, CalendarClock, Moon, Sun, Package, UserPlus, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import logoLucelian from "@/assets/logo-lucelian.png";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/produtos", label: "Produtos", icon: Package },
  { to: "/vendas", label: "Vendas", icon: ShoppingBag },
  { to: "/contas-a-pagar", label: "Contas a pagar", icon: CalendarClock },
];

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();

  const getSession = () => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(localStorage.getItem("app_session") ?? "null"); } catch { return null; }
  };
  const session = getSession();
  const isAdmin = session?.isAdmin === true;

  const navigation = [
    ...nav,
    ...(isAdmin ? [{ to: "/usuarios", label: "Usuários", icon: UserPlus }] : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem("app_session");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground hidden md:flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="px-0 py-0">
            <div className="flex items-center justify-center">
              <img src={logoLucelian} alt="Doces Lucelian" className="w-full h-auto object-contain" />
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-sidebar-foreground/70 mt-3 text-center">
              Gestão Financeira
            </div>
          </div>
          <nav className="p-3 flex flex-col gap-1 mt-3">
            {navigation.map(({ to, label, icon: Icon }) => {
              const active = to === "/" ? path === "/" : path.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground gap-3 font-normal cursor-pointer"
          >
            <LogOut className="size-4" />
            Sair
          </Button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="border-b border-border px-6 md:px-10 py-4 flex items-center justify-between bg-card">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">
              Painel
            </div>
            <p className="text-xs text-muted-foreground capitalize mt-1">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Header Mobile logout button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="md:hidden text-muted-foreground hover:text-foreground"
              aria-label="Sair"
            >
              <LogOut className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Alternar tema">
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </header>
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
