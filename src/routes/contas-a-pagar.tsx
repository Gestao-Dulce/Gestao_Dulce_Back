import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CurrencyInput } from "@/components/ui/currency-input";
import { brl, dataBR, hoje, addMeses } from "@/lib/format";
import { imprimir } from "@/lib/report";
import { toast } from "sonner";
import { Plus, Printer, Pencil, CheckCircle2, Repeat, Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/contas-a-pagar")({ component: ContasPage });

type Categoria = "fornecedor" | "folha_pagamento" | "outros";
const catLabel: Record<Categoria, string> = {
  fornecedor: "Fornecedor",
  folha_pagamento: "Folha de pagamento",
  outros: "Outros",
};

function quintoDiaUtil(year: number, month: number): string {
  let count = 0;
  for (let d = 1; d <= 31; d++) {
    const dt = new Date(year, month, d);
    if (dt.getMonth() !== month) break;
    const wd = dt.getDay();
    if (wd !== 0 && wd !== 6) {
      count++;
      if (count === 5) {
        const mm = String(month + 1).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        return `${year}-${mm}-${dd}`;
      }
    }
  }
  return "";
}

type FormState = {
  categoria: Categoria;
  fornecedor: string;
  descricao: string;
  vencimento: string;
  valor: number;
  funcionario_nome: string;
  funcionario_cargo: string;
  funcionario_documento: string;
  recorrente: boolean;
};

const emptyForm: FormState = {
  categoria: "fornecedor",
  fornecedor: "",
  descricao: "",
  vencimento: "",
  valor: 0,
  funcionario_nome: "",
  funcionario_cargo: "",
  funcionario_documento: "",
  recorrente: false,
};

function ContasPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [usarQuintoDiaUtil, setUsarQuintoDiaUtil] = useState(false);
  const mesAtual = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [mesFiltro, setMesFiltro] = useState<string>(mesAtual);
  const [busca, setBusca] = useState("");
  const [sortKey, setSortKey] = useState<"vencimento" | "fornecedor" | "valor" | "categoria">("vencimento");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const hojeDate = new Date();
  const quintoUtilStr = quintoDiaUtil(hojeDate.getFullYear(), hojeDate.getMonth());

  const { data: contas = [] } = useQuery({
    queryKey: ["contas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contas_a_pagar").select("*").order("vencimento");
      if (error) throw error;
      return data;
    },
  });

  const setF = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const aplicarQuintoDiaUtil = (ativo: boolean) => {
    setUsarQuintoDiaUtil(ativo);
    if (ativo && quintoUtilStr) setF("vencimento", quintoUtilStr);
  };

  const abrirNovo = () => {
    setEditId(null);
    setForm(emptyForm);
    setUsarQuintoDiaUtil(false);
    setOpen(true);
  };

  const abrirEditar = (c: any) => {
    setEditId(c.id);
    setForm({
      categoria: c.categoria,
      fornecedor: c.fornecedor ?? "",
      descricao: c.descricao ?? "",
      vencimento: c.vencimento,
      valor: Number(c.valor),
      funcionario_nome: c.funcionario_nome ?? "",
      funcionario_cargo: c.funcionario_cargo ?? "",
      funcionario_documento: c.funcionario_documento ?? "",
      recorrente: c.recorrente,
    });
    setUsarQuintoDiaUtil(false);
    setOpen(true);
  };

  const salvar = useMutation({
    mutationFn: async () => {
      const v = form;
      const fornecedorFinal =
        v.categoria === "folha_pagamento"
          ? (v.funcionario_nome.trim() || v.fornecedor.trim())
          : v.fornecedor.trim();

      if (!fornecedorFinal) throw new Error(v.categoria === "folha_pagamento" ? "Informe o nome do funcionário" : "Informe o fornecedor");
      if (!v.vencimento) throw new Error("Informe o vencimento");
      if (!(v.valor > 0)) throw new Error("Valor deve ser maior que zero");

      const payload = {
        categoria: v.categoria,
        fornecedor: fornecedorFinal,
        descricao: v.descricao || null,
        vencimento: v.vencimento,
        valor: v.valor,
        funcionario_nome: v.categoria === "folha_pagamento" ? (v.funcionario_nome || null) : null,
        funcionario_cargo: v.categoria === "folha_pagamento" ? (v.funcionario_cargo || null) : null,
        funcionario_documento: v.categoria === "folha_pagamento" ? (v.funcionario_documento || null) : null,
        recorrente: v.recorrente,
      };

      if (editId) {
        const { error } = await supabase.from("contas_a_pagar").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("contas_a_pagar").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editId ? "Conta atualizada" : "Conta agendada");
      setOpen(false);
      setEditId(null);
      setForm(emptyForm);
      qc.invalidateQueries({ queryKey: ["contas"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const toggle = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "pendente" | "pago" }) => {
      const { error } = await supabase.from("contas_a_pagar").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contas"] }),
  });

  const pagarRecorrente = useMutation({
    mutationFn: async (c: any) => {
      // Clone the current occurrence as paid, then advance original to next month
      const { error: e1 } = await supabase.from("contas_a_pagar").insert({
        categoria: c.categoria,
        fornecedor: c.fornecedor,
        descricao: c.descricao,
        vencimento: c.vencimento,
        valor: c.valor,
        funcionario_nome: c.funcionario_nome,
        funcionario_cargo: c.funcionario_cargo,
        funcionario_documento: c.funcionario_documento,
        recorrente: false,
        status: "pago",
      });
      if (e1) throw e1;

      let proxima = addMeses(1, c.vencimento);
      if (c.categoria === "folha_pagamento") {
        const d = new Date(proxima);
        const q = quintoDiaUtil(d.getUTCFullYear(), d.getUTCMonth());
        if (q) proxima = q;
      }
      const { error: e2 } = await supabase.from("contas_a_pagar").update({ vencimento: proxima }).eq("id", c.id);
      if (e2) throw e2;
    },
    onSuccess: () => {
      toast.success("Pagamento registrado, próxima ocorrência agendada");
      qc.invalidateQueries({ queryKey: ["contas"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const finalizarRecorrencia = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contas_a_pagar").update({ finalizado_em: hoje() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Recorrência finalizada");
      qc.invalidateQueries({ queryKey: ["contas"] });
    },
  });

  const remover = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contas_a_pagar").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Conta excluída");
      qc.invalidateQueries({ queryKey: ["contas"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const [anoF, mesF] = mesFiltro.split("-").map(Number);
  const inicioMes = `${anoF}-${String(mesF).padStart(2, "0")}-01`;
  const fimMes = new Date(anoF, mesF, 0).toISOString().slice(0, 10);
  const mesLabel = new Date(anoF, mesF - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const pendentes = contas.filter((c) => c.status === "pendente");
  const recorrentesAtivos = pendentes.filter((c: any) => c.recorrente && !c.finalizado_em);

  const filtradas = pendentes
    .filter((c) => c.vencimento >= inicioMes && c.vencimento <= fimMes)
    .filter((c) => c.fornecedor.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      const av = (a as any)[sortKey], bv = (b as any)[sortKey];
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const totalFiltrado = filtradas.reduce((s, c) => s + Number(c.valor), 0);
  const pagas = contas.filter((c) => c.status === "pago");
  const hojeStr = hoje();

  const vencidas = pendentes
    .filter((c) => c.vencimento < hojeStr)
    .map((c: any) => ({
      ...c,
      diasAtraso: Math.ceil((new Date(hojeStr).getTime() - new Date(c.vencimento).getTime()) / 86400000),
    }))
    .sort((a, b) => b.diasAtraso - a.diasAtraso);
  const totalVencidas = vencidas.reduce((s, c) => s + Number(c.valor), 0);

  const sortBy = (k: typeof sortKey) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(k); setSortDir("asc"); }
  };
  const arrow = (k: typeof sortKey) => sortKey === k ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  const gerarRelatorio = () => {
    imprimir({
      titulo: "Relatório de contas a pagar",
      meta: `Mês: ${mesLabel}`,
      colunas: [
        { label: "Fornecedor / Funcionário" }, { label: "Categoria" },
        { label: "Vencimento" }, { label: "Valor", align: "right" },
      ],
      linhas: filtradas.map((c: any) => [
        c.fornecedor,
        catLabel[c.categoria as Categoria],
        dataBR(c.vencimento),
        brl(c.valor),
      ]),
      rodape: ["Total no período", "", "", brl(totalFiltrado)],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Contas a pagar</h2>
          <p className="text-sm text-muted-foreground">Compromissos por período e folha de pagamento.</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" onClick={gerarRelatorio}><Printer className="size-4 mr-1" /> Relatório</Button>
          <Button onClick={abrirNovo}><Plus className="size-4 mr-1" /> Nova conta</Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setEditId(null); setForm(emptyForm); } }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editId ? "Editar conta" : "Nova conta"}</DialogTitle></DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); salvar.mutate(); }} className="space-y-3">
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={form.categoria} onValueChange={(v) => setF("categoria", v as Categoria)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fornecedor">Fornecedor</SelectItem>
                  <SelectItem value="folha_pagamento">Folha de pagamento</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.categoria === "folha_pagamento" ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Funcionário</Label>
                    <Input value={form.funcionario_nome} onChange={(e) => setF("funcionario_nome", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Cargo</Label>
                    <Input value={form.funcionario_cargo} onChange={(e) => setF("funcionario_cargo", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Documento (CPF / matrícula)</Label>
                  <Input value={form.funcionario_documento} onChange={(e) => setF("funcionario_documento", e.target.value)} />
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <Label>Fornecedor</Label>
                <Input value={form.fornecedor} onChange={(e) => setF("fornecedor", e.target.value)} />
              </div>
            )}

            <div className="space-y-1.5">
              <Label>Descrição</Label>
              <Input value={form.descricao} onChange={(e) => setF("descricao", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Vencimento</Label>
                <Input type="date" value={form.vencimento} onChange={(e) => setF("vencimento", e.target.value)} />
                {form.categoria === "folha_pagamento" && (
                  <div className="flex items-center justify-between rounded-md border border-border px-2 py-1.5 mt-1">
                    <label className="text-xs cursor-pointer flex-1">
                      5º dia útil do mês
                      {quintoUtilStr && <span className="block text-[10px] text-muted-foreground">cai em {dataBR(quintoUtilStr)}</span>}
                    </label>
                    <Switch checked={usarQuintoDiaUtil} onCheckedChange={aplicarQuintoDiaUtil} />
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Valor (R$)</Label>
                <CurrencyInput value={form.valor} onValueChange={(n) => setF("valor", n)} />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
              <div className="flex items-center gap-2 text-sm"><Repeat className="size-4" /> Conta recorrente</div>
              <Switch checked={form.recorrente} onCheckedChange={(v) => setF("recorrente", v)} />
            </div>

            <Button type="submit" className="w-full" disabled={salvar.isPending}>
              {salvar.isPending ? "Salvando..." : editId ? "Salvar alterações" : "Agendar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {vencidas.length > 0 && (
        <Card className="border-destructive/60 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-2 text-destructive">
              <span className="flex items-center gap-2">
                <AlertTriangle className="size-5" />
                Contas vencidas · {vencidas.length}
              </span>
              <span className="text-sm font-normal tabular-nums">{brl(totalVencidas)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fornecedor / Funcionário</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Atraso</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vencidas.map((c: any) => (
                  <TableRow key={c.id} className="bg-destructive/5 hover:bg-destructive/10">
                    <TableCell className="font-medium text-destructive">{c.fornecedor}</TableCell>
                    <TableCell><Badge variant="outline">{catLabel[c.categoria as Categoria]}</Badge></TableCell>
                    <TableCell className="text-destructive">{dataBR(c.vencimento)}</TableCell>
                    <TableCell>
                      <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive pointer-events-none">
                        {c.diasAtraso}d em atraso
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-semibold text-destructive">{brl(c.valor)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button size="icon" variant="ghost" onClick={() => abrirEditar(c)} title="Editar"><Pencil className="size-3.5" /></Button>
                        <Button size="sm" variant="outline" onClick={() => c.recorrente && !c.finalizado_em ? pagarRecorrente.mutate(c) : toggle.mutate({ id: c.id, status: "pago" })}>Pagar</Button>
                        <ConfirmDelete nome={c.fornecedor} onConfirm={() => remover.mutate(c.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>

        <CardHeader>
          <div className="flex flex-wrap gap-2 items-center">
            <Input placeholder="Buscar fornecedor..." value={busca} onChange={(e) => setBusca(e.target.value)} className="max-w-xs" />
            <Input type="month" value={mesFiltro} onChange={(e) => setMesFiltro(e.target.value || mesAtual)} className="w-[180px]" />
            {mesFiltro !== mesAtual && (
              <Button variant="ghost" size="sm" onClick={() => setMesFiltro(mesAtual)}>Mês atual</Button>
            )}
            <div className="ml-auto text-sm">
              Total em <span className="capitalize">{mesLabel}</span>: <span className="font-semibold text-primary tabular-nums">{brl(totalFiltrado)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => sortBy("fornecedor")}>Fornecedor / Funcionário{arrow("fornecedor")}</TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortBy("categoria")}>Categoria{arrow("categoria")}</TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortBy("vencimento")}>Vencimento{arrow("vencimento")}</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => sortBy("valor")}>Valor{arrow("valor")}</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtradas.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Nada no período.</TableCell></TableRow>}
              {filtradas.map((c: any) => {
                const dd = Math.ceil((new Date(c.vencimento).getTime() - new Date(hojeStr).getTime()) / 86400000);
                const vencida = dd < 0;
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-1.5">
                        {c.fornecedor}
                        {c.recorrente && !c.finalizado_em && <Repeat className="size-3 text-primary" />}
                      </div>
                      {c.funcionario_cargo && <div className="text-xs text-muted-foreground">{c.funcionario_cargo}</div>}
                    </TableCell>
                    <TableCell><Badge variant="outline">{catLabel[c.categoria as Categoria]}</Badge></TableCell>
                    <TableCell>{dataBR(c.vencimento)}</TableCell>
                    <TableCell>
                      {vencida ? <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive pointer-events-none">Vencida há {Math.abs(dd)}d</Badge>
                        : dd === 0 ? <Badge className="bg-warning text-warning-foreground hover:bg-warning pointer-events-none">Vence hoje</Badge>
                          : dd <= 3 ? <Badge className="bg-warning text-warning-foreground hover:bg-warning pointer-events-none">Vence em {dd}d</Badge>
                            : <Badge variant="secondary" className="hover:bg-secondary pointer-events-none">Em {dd}d</Badge>}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-semibold">{brl(c.valor)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button size="icon" variant="ghost" onClick={() => abrirEditar(c)} title="Editar"><Pencil className="size-3.5" /></Button>
                        <Button size="sm" variant="outline" onClick={() => c.recorrente && !c.finalizado_em ? pagarRecorrente.mutate(c) : toggle.mutate({ id: c.id, status: "pago" })}>Pagar</Button>
                        <ConfirmDelete nome={c.fornecedor} onConfirm={() => remover.mutate(c.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {recorrentesAtivos.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Repeat className="size-4 text-primary" /> Recorrentes ativos ({recorrentesAtivos.length})</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fornecedor / Funcionário</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recorrentesAtivos.map((c: any) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.fornecedor}</TableCell>
                    <TableCell><Badge variant="outline">{catLabel[c.categoria as Categoria]}</Badge></TableCell>
                    <TableCell>{dataBR(c.vencimento)}</TableCell>
                    <TableCell className="text-right tabular-nums">{brl(c.valor)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button size="icon" variant="ghost" onClick={() => abrirEditar(c)} title="Editar"><Pencil className="size-3.5" /></Button>
                        <Button size="sm" variant="outline" onClick={() => finalizarRecorrencia.mutate(c.id)}>
                          <CheckCircle2 className="size-3.5 mr-1" /> Finalizar
                        </Button>
                        <ConfirmDelete nome={c.fornecedor} onConfirm={() => remover.mutate(c.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {pagas.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Pagas ({pagas.length})</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagas.map((c) => (
                  <TableRow key={c.id} className="text-muted-foreground">
                    <TableCell className="line-through">{c.fornecedor}</TableCell>
                    <TableCell>{dataBR(c.vencimento)}</TableCell>
                    <TableCell className="text-right tabular-nums">{brl(c.valor)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button size="sm" variant="ghost" onClick={() => toggle.mutate({ id: c.id, status: "pendente" })}>Reabrir</Button>
                        <ConfirmDelete nome={c.fornecedor} onConfirm={() => remover.mutate(c.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ConfirmDelete({ nome, onConfirm }: { nome: string; onConfirm: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" title="Excluir"><Trash2 className="size-3.5 text-destructive" /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir conta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. <b>{nome}</b> será removida permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}