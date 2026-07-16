import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ShieldAlert, UserPlus, Trash2, Mail, Lock, Key, Clock, ShieldCheck, Loader2, RotateCcw } from "lucide-react";

// ─── Server Function: Listar usuários ─────────────────────────────────────
export const listUsersFn = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("usuarios")
    .select("id, email, created_at")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

// ─── Server Function: Criar usuário ───────────────────────────────────────
export const createUserFn = createServerFn({ method: "POST" })
  .validator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    const bcryptjs = await import("bcryptjs");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Verifica duplicata
    const { data: existing } = await supabaseAdmin
      .from("usuarios")
      .select("id")
      .eq("email", data.email)
      .maybeSingle();
    if (existing) throw new Error("Já existe um usuário com este login.");

    const senha_hash = await bcryptjs.hash(data.password, 12);
    const { error } = await supabaseAdmin
      .from("usuarios")
      .insert({ email: data.email, senha_hash });
    if (error) throw new Error(error.message);
    return { success: true };
  });

// ─── Server Function: Limpar senha (primeiro acesso) ──────────────────────────────────
export const resetUserPasswordFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: user } = await supabaseAdmin
      .from("usuarios")
      .select("email")
      .eq("id", id)
      .maybeSingle();
    if (user?.email === "admin") throw new Error("Não é possível limpar a senha do administrador principal.");
    const { error } = await supabaseAdmin
      .from("usuarios")
      .update({ senha_hash: null })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

// ─── Server Function: Excluir usuário ─────────────────────────────────────
export const deleteUserFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Não permite excluir o admin
    const { data: user } = await supabaseAdmin
      .from("usuarios")
      .select("email")
      .eq("id", id)
      .maybeSingle();
    if (user?.email === "admin") throw new Error("O usuário administrador não pode ser excluído.");
    const { error } = await supabaseAdmin.from("usuarios").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const Route = createFileRoute("/usuarios")({
  component: UserManagementPage,
});

function UserManagementPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verifica sessão admin no localStorage
  const getSession = () => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(localStorage.getItem("app_session") ?? "null"); } catch { return null; }
  };
  const session = getSession();
  const isAdmin = session?.isAdmin === true;

  const { data: users = [], isLoading: isLoadingUsers, refetch } = useQuery({
    queryKey: ["usuarios-list"],
    queryFn: () => listUsersFn(),
    enabled: isAdmin,
  });

  const createMutation = useMutation({
    mutationFn: (vars: { email: string; password: string }) =>
      createUserFn({ data: vars }),
    onSuccess: () => {
      toast.success("Operador cadastrado com sucesso!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      refetch();
    },
    onError: (err: any) => toast.error(`Erro ao cadastrar: ${err.message}`),
    onSettled: () => setIsSubmitting(false),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUserFn({ data: id }),
    onSuccess: () => {
      toast.success("Usuário excluído com sucesso!");
      refetch();
    },
    onError: (err: any) => toast.error(`Erro ao excluir: ${err.message}`),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (id: string) => resetUserPasswordFn({ data: id }),
    onSuccess: () => {
      toast.success("Senha limpa! O usuário deverá definir uma nova senha no próximo login.");
      refetch();
    },
    onError: (err: any) => toast.error(`Erro ao limpar senha: ${err.message}`),
  });

  const handleCreateUser = (e: React.FormEvent) => {
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
    createMutation.mutate({ email, password });
  };

  // Acesso negado
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="size-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
          <ShieldAlert className="size-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Acesso Restrito</h1>
        <p className="text-muted-foreground mt-2 max-w-md text-sm">
          Esta área é de uso exclusivo para o Administrador Geral do sistema.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Gerenciamento de Usuários</h2>
        <p className="text-sm text-muted-foreground">
          Cadastre novos operadores e gerencie acessos ao sistema. As senhas são armazenadas de forma criptografada.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Formulário de cadastro */}
        <Card id="tour-usuarios-add" className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="size-5 text-primary" />
              Novo Operador
            </CardTitle>
            <CardDescription>
              A senha será criptografada antes de ser salva no banco de dados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Login (e-mail ou usuário)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="operador@doceslucelian.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full font-medium" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  "Cadastrar Operador"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de usuários */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              Usuários Cadastrados
            </CardTitle>
            <CardDescription>
              Lista de todos os usuários com acesso ao sistema (senhas não são exibidas).
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingUsers ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Loader2 className="size-6 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Carregando usuários...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground text-sm">
                Nenhum usuário cadastrado ainda.
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <Table id="tour-usuarios-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Login</TableHead>
                      <TableHead className="hidden sm:table-cell">Cadastrado em</TableHead>
                      <TableHead className="w-[80px] text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(users as any[]).map((user) => {
                      const isSystemAdmin = user.email === "admin";
                      return (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{user.email}</span>
                              {isSystemAdmin && (
                                <span className="text-[10px] text-primary font-semibold uppercase mt-0.5 tracking-wider">
                                  Administrador
                                </span>
                              )}
                              {!isSystemAdmin && !user.senha_hash && (
                                <span className="text-[10px] text-amber-600 font-semibold uppercase mt-0.5 tracking-wider">
                                  Aguardando 1º acesso
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground text-xs">
                            <div className="flex items-center gap-1.5">
                              <Clock className="size-3.5" />
                              {new Date(user.created_at).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {!isSystemAdmin && (
                              <div className="flex items-center justify-end gap-1">
                                {/* Botão: Limpar Senha */}
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-amber-600 hover:text-amber-700 hover:bg-amber-500/10 size-8"
                                      disabled={resetPasswordMutation.isPending || deleteMutation.isPending}
                                      title="Limpar senha (solicitar novo cadastro)"
                                    >
                                      <RotateCcw className="size-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Limpar Senha do Usuário</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        A senha de <strong>{user.email}</strong> será removida.
                                        No próximo login, o usuário precisará definir uma nova senha.
                                        Esta ação não exclui o usuário.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => resetPasswordMutation.mutate(user.id)}
                                        className="bg-amber-600 text-white hover:bg-amber-700"
                                      >
                                        Limpar Senha
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>

                                {/* Botão: Excluir */}
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive hover:text-destructive hover:bg-destructive/10 size-8"
                                      disabled={deleteMutation.isPending || resetPasswordMutation.isPending}
                                    >
                                      <Trash2 className="size-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Excluir Operador</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Tem certeza que deseja excluir o acesso de <strong>{user.email}</strong>?
                                        Esta ação é irreversível.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => deleteMutation.mutate(user.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Excluir Acesso
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
