import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Mail, Lock, Eye, EyeOff, Loader2, Sparkles, CheckCircle2,
  TrendingUp, ShieldAlert, KeyRound, CheckCheck,
} from "lucide-react";
import logoLucelian from "@/assets/logo-lucelian.png";
import { createServerFn } from "@tanstack/react-start";
import bcryptjs from "bcryptjs";

// ─── Server Function: Autenticar usuário ──────────────────────────────────────
export const loginFn = createServerFn({ method: "POST" })
  .validator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Garante que o admin padrão existe
    const { data: existing } = await supabaseAdmin
      .from("usuarios")
      .select("id")
      .eq("email", "admin")
      .maybeSingle();

    if (!existing) {
      const adminHash = await bcryptjs.hash("Doceslucelian$2026", 12);
      await supabaseAdmin.from("usuarios").insert({ email: "admin", senha_hash: adminHash });
    }

    // Busca o usuário informado
    const { data: user, error } = await supabaseAdmin
      .from("usuarios")
      .select("id, email, senha_hash")
      .eq("email", data.email)
      .maybeSingle();

    if (error || !user) {
      throw new Error("Credenciais inválidas. Verifique seu login e senha.");
    }

    // Senha nula → primeiro acesso (admin limpou a senha)
    if (!user.senha_hash) {
      return {
        id: user.id,
        email: user.email,
        isAdmin: user.email === "admin",
        needsPasswordSetup: true,
      };
    }

    const valid = await bcryptjs.compare(data.password, user.senha_hash);
    if (!valid) {
      throw new Error("Credenciais inválidas. Verifique seu login e senha.");
    }

    return {
      id: user.id,
      email: user.email,
      isAdmin: user.email === "admin",
      needsPasswordSetup: false,
    };
  });

// ─── Server Function: Alterar senha (requer senha atual) ─────────────────────
export const changePasswordFn = createServerFn({ method: "POST" })
  .validator((d: { email: string; currentPassword: string; newPassword: string }) => d)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: user } = await supabaseAdmin
      .from("usuarios")
      .select("id, senha_hash")
      .eq("email", data.email)
      .maybeSingle();

    if (!user || !user.senha_hash) {
      throw new Error("Usuário não encontrado ou sem senha definida.");
    }

    const valid = await bcryptjs.compare(data.currentPassword, user.senha_hash);
    if (!valid) throw new Error("Senha atual incorreta. Verifique e tente novamente.");

    if (data.newPassword.length < 6) {
      throw new Error("A nova senha deve ter no mínimo 6 caracteres.");
    }

    const newHash = await bcryptjs.hash(data.newPassword, 12);
    const { error } = await supabaseAdmin
      .from("usuarios")
      .update({ senha_hash: newHash })
      .eq("id", user.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });

// ─── Server Function: Definir senha no primeiro acesso ───────────────────────
export const setFirstPasswordFn = createServerFn({ method: "POST" })
  .validator((d: { email: string; newPassword: string }) => d)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: user } = await supabaseAdmin
      .from("usuarios")
      .select("id, email, senha_hash")
      .eq("email", data.email)
      .maybeSingle();

    if (!user) throw new Error("Usuário não encontrado.");
    if (user.senha_hash) {
      throw new Error("Este usuário já possui senha. Use a opção 'Alterar Senha'.");
    }

    if (data.newPassword.length < 6) {
      throw new Error("A senha deve ter no mínimo 6 caracteres.");
    }

    const newHash = await bcryptjs.hash(data.newPassword, 12);
    const { error } = await supabaseAdmin
      .from("usuarios")
      .update({ senha_hash: newHash })
      .eq("id", user.id);

    if (error) throw new Error(error.message);

    return {
      id: user.id,
      email: user.email,
      isAdmin: user.email === "admin",
      needsPasswordSetup: false,
    };
  });

// ─── Rota ─────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/login")({
  component: LoginPage,
});

// ─── Componente Principal ──────────────────────────────────────────────────────
function LoginPage() {
  const navigate = useNavigate();

  // — Login form —
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // — Dialog: Alterar Senha —
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [cpEmail, setCpEmail] = useState("");
  const [cpCurrentPwd, setCpCurrentPwd] = useState("");
  const [cpNewPwd, setCpNewPwd] = useState("");
  const [cpConfirmPwd, setCpConfirmPwd] = useState("");
  const [showCpCurrent, setShowCpCurrent] = useState(false);
  const [showCpNew, setShowCpNew] = useState(false);
  const [cpLoading, setCpLoading] = useState(false);
  const [cpError, setCpError] = useState<string | null>(null);
  const [cpSuccess, setCpSuccess] = useState(false);

  // — Dialog: Primeiro Acesso —
  const [showFirstLogin, setShowFirstLogin] = useState(false);
  const [firstLoginEmail, setFirstLoginEmail] = useState("");
  const [flNewPwd, setFlNewPwd] = useState("");
  const [flConfirmPwd, setFlConfirmPwd] = useState("");
  const [showFlNew, setShowFlNew] = useState(false);
  const [flLoading, setFlLoading] = useState(false);
  const [flError, setFlError] = useState<string | null>(null);

  // ─── Handler: Login principal ─────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const result = await loginFn({ data: { email: email.trim(), password } });

      if (result.needsPasswordSetup) {
        // Primeiro acesso → abre dialog para definir senha
        setFirstLoginEmail(email.trim());
        setFlNewPwd("");
        setFlConfirmPwd("");
        setFlError(null);
        setShowFirstLogin(true);
      } else {
        localStorage.setItem("app_session", JSON.stringify(result));
        window.dispatchEvent(new Event("storage"));
        navigate({ to: "/" });
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Handler: Alterar Senha ───────────────────────────────────────────────
  const handleChangePassword = async (e: React.FormEvent) => {
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
        data: { email: cpEmail.trim(), currentPassword: cpCurrentPwd, newPassword: cpNewPwd },
      });
      setCpSuccess(true);
    } catch (err: any) {
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

  // ─── Handler: Primeiro Acesso ─────────────────────────────────────────────
  const handleFirstLogin = async (e: React.FormEvent) => {
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
        data: { email: firstLoginEmail, newPassword: flNewPwd },
      });
      localStorage.setItem("app_session", JSON.stringify(result));
      window.dispatchEvent(new Event("storage"));
      navigate({ to: "/" });
    } catch (err: any) {
      setFlError(err.message ?? "Erro ao definir senha.");
    } finally {
      setFlLoading(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <div className="min-h-screen grid md:grid-cols-2 bg-background text-foreground">

        {/* ── Lado esquerdo: Branding ── */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-primary via-primary/95 to-rose-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20" />

          <div className="flex items-center gap-2 relative z-10">
            <Sparkles className="size-5 text-accent-foreground/50 fill-accent-foreground/20" />
            <span className="font-semibold tracking-wider text-[11px] uppercase">Gourmet Management</span>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto space-y-8 relative z-10">
            <div className="w-48 h-48 bg-white/10 rounded-2xl flex items-center justify-center p-4 backdrop-blur-md shadow-2xl border border-white/20">
              <img src={logoLucelian} alt="Doces Lucelian" className="w-full h-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]" />
            </div>
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight font-script">Doces Lucelian</h1>
              <p className="text-white/80 font-light leading-relaxed">
                Painel Integrado de Gestão Financeira, Controle de Vendas e Fluxo de Caixa.
              </p>
            </div>
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm space-y-4 shadow-xl">
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="size-5 text-white shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Controle de Estoque e Vendas</p>
                  <p className="text-xs text-white/70">Acompanhamento em tempo real de produtos vendidos e saídas.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <TrendingUp className="size-5 text-white shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Indicadores Financeiros</p>
                  <p className="text-xs text-white/70">Lucratividade, faturamento bruto e conciliação de contas a pagar.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/60 relative z-10">
            © {new Date().getFullYear()} Doces Lucelian. Todos os direitos reservados.
          </div>
        </div>

        {/* ── Lado direito: Formulário ── */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-[420px] space-y-8">

            {/* Logo mobile */}
            <div className="flex flex-col items-center justify-center md:hidden space-y-4 text-center">
              <div className="w-24 h-24 bg-primary/5 rounded-2xl flex items-center justify-center p-2 shadow-md border border-primary/10">
                <img src={logoLucelian} alt="Doces Lucelian" className="w-full h-auto object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-script tracking-tight text-primary">Doces Lucelian</h2>
                <p className="text-xs text-muted-foreground mt-1">Gestão Financeira e Controle Geral</p>
              </div>
            </div>

            <Card className="border-border shadow-2xl md:shadow-lg bg-card/60 backdrop-blur-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">Entrar no Sistema</CardTitle>
                <CardDescription>
                  Informe seu login e senha para acessar o painel administrativo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {errorMsg && (
                    <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive text-sm py-3 flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                      <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                      <AlertDescription className="leading-relaxed">{errorMsg}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Login (e-mail ou usuário)</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="text"
                        placeholder="seuemail@exemplo.com ou admin"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10"
                        disabled={isLoading}
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha de acesso</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 pr-10"
                        disabled={isLoading}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-2 font-medium" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Autenticando...
                      </>
                    ) : (
                      "Acessar Painel"
                    )}
                  </Button>

                  {/* Link: Alterar Senha */}
                  <div className="pt-1 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setCpEmail(email.trim());
                        setCpCurrentPwd("");
                        setCpNewPwd("");
                        setCpConfirmPwd("");
                        setCpError(null);
                        setCpSuccess(false);
                        setShowChangePwd(true);
                      }}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                    >
                      Alterar minha senha
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-muted-foreground md:hidden">
              © {new Date().getFullYear()} Doces Lucelian. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          Dialog: Alterar Senha
      ══════════════════════════════════════════════════════ */}
      <Dialog open={showChangePwd} onOpenChange={(open) => { if (!open) closeChangePwd(); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <KeyRound className="size-5 text-primary" />
              </div>
              <div>
                <DialogTitle>Alterar Senha</DialogTitle>
                <DialogDescription className="text-xs mt-0.5">
                  Confirme seu login e senha atual para definir uma nova senha.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {cpSuccess ? (
            <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
              <div className="size-14 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCheck className="size-7 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Senha alterada com sucesso!</p>
                <p className="text-sm text-muted-foreground mt-1">Use a nova senha no próximo acesso.</p>
              </div>
              <Button onClick={closeChangePwd} className="mt-2 w-full">Fechar</Button>
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
              {cpError && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive text-sm py-2.5 flex items-start gap-2">
                  <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                  <AlertDescription>{cpError}</AlertDescription>
                </Alert>
              )}

              {/* Login */}
              <div className="space-y-2">
                <Label htmlFor="cp-email">Usuário / Login</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="cp-email"
                    type="text"
                    placeholder="admin"
                    value={cpEmail}
                    onChange={(e) => setCpEmail(e.target.value)}
                    required
                    className="pl-10"
                    disabled={cpLoading}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Senha atual */}
              <div className="space-y-2">
                <Label htmlFor="cp-current">Senha atual</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="cp-current"
                    type={showCpCurrent ? "text" : "password"}
                    placeholder="••••••••"
                    value={cpCurrentPwd}
                    onChange={(e) => setCpCurrentPwd(e.target.value)}
                    required
                    className="pl-10 pr-10"
                    disabled={cpLoading}
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowCpCurrent(!showCpCurrent)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                    {showCpCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Nova senha */}
              <div className="space-y-2">
                <Label htmlFor="cp-new">Nova senha</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="cp-new"
                    type={showCpNew ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={cpNewPwd}
                    onChange={(e) => setCpNewPwd(e.target.value)}
                    required
                    className="pl-10 pr-10"
                    disabled={cpLoading}
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowCpNew(!showCpNew)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                    {showCpNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Confirmar nova senha */}
              <div className="space-y-2">
                <Label htmlFor="cp-confirm">Confirmar nova senha</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="cp-confirm"
                    type="password"
                    placeholder="Repita a nova senha"
                    value={cpConfirmPwd}
                    onChange={(e) => setCpConfirmPwd(e.target.value)}
                    required
                    className="pl-10"
                    disabled={cpLoading}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <Button type="button" variant="outline" onClick={closeChangePwd} disabled={cpLoading} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" disabled={cpLoading} className="flex-1">
                  {cpLoading ? (
                    <><Loader2 className="mr-2 size-4 animate-spin" />Salvando...</>
                  ) : "Alterar Senha"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════
          Dialog: Primeiro Acesso — Definir Senha
      ══════════════════════════════════════════════════════ */}
      <Dialog open={showFirstLogin} onOpenChange={() => { }}>
        <DialogContent className="sm:max-w-md" hideCloseButton>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="size-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <KeyRound className="size-5 text-amber-600" />
              </div>
              <div>
                <DialogTitle>Bem-vindo! Defina sua senha</DialogTitle>
                <DialogDescription className="text-xs mt-0.5">
                  Este é o seu primeiro acesso. Crie uma senha segura para continuar.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2.5 text-xs text-amber-700 dark:text-amber-400">
            <strong>Usuário:</strong> {firstLoginEmail}
          </div>

          <form onSubmit={handleFirstLogin} className="space-y-4">
            {flError && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive text-sm py-2.5 flex items-start gap-2">
                <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                <AlertDescription>{flError}</AlertDescription>
              </Alert>
            )}

            {/* Nova senha */}
            <div className="space-y-2">
              <Label htmlFor="fl-new">Nova senha</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="fl-new"
                  type={showFlNew ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={flNewPwd}
                  onChange={(e) => setFlNewPwd(e.target.value)}
                  required
                  className="pl-10 pr-10"
                  disabled={flLoading}
                  autoComplete="new-password"
                  autoFocus
                />
                <button type="button" onClick={() => setShowFlNew(!showFlNew)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                  {showFlNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Confirmar */}
            <div className="space-y-2">
              <Label htmlFor="fl-confirm">Confirmar senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="fl-confirm"
                  type="password"
                  placeholder="Repita a nova senha"
                  value={flConfirmPwd}
                  onChange={(e) => setFlConfirmPwd(e.target.value)}
                  required
                  className="pl-10"
                  disabled={flLoading}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <Button type="submit" disabled={flLoading} className="w-full mt-2">
              {flLoading ? (
                <><Loader2 className="mr-2 size-4 animate-spin" />Definindo senha...</>
              ) : "Definir Senha e Entrar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
