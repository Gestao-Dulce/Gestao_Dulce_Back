import { useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, ShoppingBag, CalendarClock, Moon, Sun, Package, UserPlus, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex flex-col gap-1 w-full">
      {navigation.map(({ to, label, icon: Icon }) => {
        const active = to === "/" ? path === "/" : path.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            onClick={onClick}
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
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Sidebar - Desktop */}
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground hidden md:flex flex-col justify-between border-r border-sidebar-border">
        <div className="flex flex-col">
          <div className="px-4 py-4">
            <div className="flex items-center justify-center">
              <img src={logoLucelian} alt="Doces Lucelian" className="max-w-[150px] h-auto object-contain" />
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-sidebar-foreground/70 mt-3 text-center">
              Gestão Financeira
            </div>
          </div>
          <div className="p-3">
            <NavLinks />
          </div>
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
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-sidebar-border md:border-border px-4 md:px-10 py-3 md:py-4 flex items-center justify-between bg-sidebar md:bg-card text-sidebar-foreground md:text-foreground">
          {/* Desktop header view */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">
                Painel
              </div>
              <p className="text-xs text-muted-foreground capitalize mt-0.5">
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggle} aria-label="Alternar tema">
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile header view */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Left side: Menu toggle for sidebar */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground">
                  <Menu className="size-5" />
                  <span className="sr-only">Menu de navegação</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-sidebar text-sidebar-foreground p-0 flex flex-col justify-between">
                <div>
                  <SheetHeader className="p-4 border-b border-sidebar-border text-left">
                    <SheetTitle className="text-sidebar-foreground flex flex-col items-center">
                      <img src={logoLucelian} alt="Doces Lucelian" className="max-w-[120px] h-auto object-contain" />
                      <span className="text-[9px] tracking-[0.2em] uppercase text-sidebar-foreground/70 mt-2 block">
                        Gestão Financeira
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <NavLinks onClick={() => setMobileMenuOpen(false)} />
                  </div>
                </div>

                <div className="p-4 border-t border-sidebar-border">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground gap-3 font-normal cursor-pointer"
                  >
                    <LogOut className="size-4" />
                    Sair
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Right side: Icon (Logo) and theme toggle */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggle} aria-label="Alternar tema" className="size-8 text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground">
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
              <img src={logoLucelian} alt="Doces Lucelian" className="h-8 w-auto object-contain brightness-0 invert" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
