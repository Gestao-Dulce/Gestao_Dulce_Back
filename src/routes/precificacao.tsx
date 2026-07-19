import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Badge } from "@/components/ui/badge";
import { brl } from "@/lib/format";
import { toast } from "sonner";
import {
  Plus, Pencil, Trash2, Calculator, TrendingUp, TrendingDown,
  Package, Minus, AlertCircle, CheckCircle2, Info, EyeOff, Save, Layers,
} from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/precificacao")({ component: PrecificacaoPage });

// ─── Types ────────────────────────────────────────────────────────────────────
type Produto = { id: string; nome: string; unidade: string; valor: number };
type Insumo = { id: string; produto_id: string; descricao: string; quantidade: number; custo_unitario: number };
type Conta = { id: string; fornecedor: string; valor: number; vencimento: string; status: string; categoria: string };

// ─── Main Page ────────────────────────────────────────────────────────────────
function PrecificacaoPage() {
  const qc = useQueryClient();
  const mesAtual = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [produtoId, setProdutoId] = useState<string>("");
  const [mesFiltro, setMesFiltro] = useState(mesAtual);
  const [qtdProduzida, setQtdProduzida] = useState<number>(100);
  const [margem, setMargem] = useState<number>(40);
  const [openInsumo, setOpenInsumo] = useState(false);
  const [editInsumo, setEditInsumo] = useState<Insumo | null>(null);
  const [custosExcluidos, setCustosExcluidos] = useState<Set<string>>(new Set());
  const [rendimentoLote, setRendimentoLote] = useState<number>(1);

  const toggleExcluirCusto = (id: string) => {
    setCustosExcluidos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const excluirTodos = (excluir: boolean) => {
    setCustosExcluidos(excluir ? new Set(contasDoMes.map((c) => c.id)) : new Set());
  };

  // ── Queries ────────────────────────────────────────────────────────────────
  const { data: produtos = [] } = useQuery<Produto[]>({
    queryKey: ["produtos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("produtos" as any).select("*").order("nome");
      if (error) throw error;
      return (data ?? []) as unknown as Produto[];
    },
  });

  const { data: insumos = [] } = useQuery<Insumo[]>({
    queryKey: ["produto_insumos", produtoId],
    enabled: !!produtoId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("produto_insumos" as any)
        .select("*")
        .eq("produto_id", produtoId)
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as unknown as Insumo[];
    },
  });

  const { data: contas = [] } = useQuery<Conta[]>({
    queryKey: ["contas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contas_a_pagar").select("*").order("vencimento");
      if (error) throw error;
      return (data ?? []) as unknown as Conta[];
    },
  });

  // ── Computed values ────────────────────────────────────────────────────────
  const produtoSelecionado = useMemo(() => produtos.find((p) => p.id === produtoId) ?? null, [produtos, produtoId]);

  const [anoF, mesF] = mesFiltro.split("-").map(Number);
  const inicioMes = `${anoF}-${String(mesF).padStart(2, "0")}-01`;
  const fimMes = new Date(anoF, mesF, 0).toISOString().slice(0, 10);
  const mesLabel = new Date(anoF, mesF - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const contasDoMes = contas.filter(
    (c) => c.vencimento >= inicioMes && c.vencimento <= fimMes
  );
  const totalCustosDoMes = contasDoMes
    .filter((c) => !custosExcluidos.has(c.id))
    .reduce((s, c) => s + Number(c.valor), 0);
  const totalExcluido = contasDoMes
    .filter((c) => custosExcluidos.has(c.id))
    .reduce((s, c) => s + Number(c.valor), 0);

  const custoLote = insumos.reduce(
    (s, ins) => s + Number(ins.quantidade) * Number(ins.custo_unitario),
    0
  );
  const rendimento = rendimentoLote > 0 ? rendimentoLote : 1;
  const custoInsumos = custoLote / rendimento;

  const qtd = qtdProduzida > 0 ? qtdProduzida : 1;
  const custoRateado = totalCustosDoMes / qtd;
  const custoTotal = custoInsumos + custoRateado;
  const precoSugerido = custoTotal * (1 + margem / 100);
  const precoAtual = produtoSelecionado ? Number(produtoSelecionado.valor) : 0;
  const margemAtual = precoAtual > 0 ? ((precoAtual - custoTotal) / precoAtual) * 100 : null;
  const lucroAtual = precoAtual - custoTotal;

  const statusPreco = (): { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode } => {
    if (!produtoSelecionado || precoAtual === 0) return { label: "Sem preço cadastrado", variant: "secondary", icon: <Info className="size-3.5" /> };
    if (precoAtual < custoTotal) return { label: "Abaixo do custo! ⚠", variant: "destructive", icon: <TrendingDown className="size-3.5" /> };
    if (precoAtual < precoSugerido) return { label: "Abaixo da margem desejada", variant: "outline", icon: <AlertCircle className="size-3.5" /> };
    return { label: "Acima do ponto de equilíbrio ✓", variant: "default", icon: <CheckCircle2 className="size-3.5" /> };
  };

  const status = statusPreco();

  // ── Mutation: remover insumo ───────────────────────────────────────────────
  const removerInsumo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("produto_insumos" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Insumo removido");
      qc.invalidateQueries({ queryKey: ["produto_insumos", produtoId] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  // ── Mutation: atualizar preço do produto ──────────────────────────────────
  const atualizarPreco = useMutation({
    mutationFn: async (novoValor: number) => {
      const { error } = await supabase
        .from("produtos" as any)
        .update({ valor: novoValor })
        .eq("id", produtoId);
      if (error) throw error;
    },
    onSuccess: (_, novoValor) => {
      toast.success(`Preço atualizado para ${brl(novoValor)}`);
      qc.invalidateQueries({ queryKey: ["produtos"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Calculator className="size-6 text-primary" />
            Precificação
          </h2>
          <p className="text-sm text-muted-foreground">
            Calcule o custo de produção e descubra o ponto de venda ideal por produto.
          </p>
        </div>
      </div>

      {/* ── Seletor de Produto e Mês ─────────────────────────────────────────── */}
      <Card id="tour-precificacao-config">
        <CardHeader>
          <CardTitle className="text-base">Configuração da análise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Produto</Label>
              <Select value={produtoId} onValueChange={setProdutoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um produto..." />
                </SelectTrigger>
                <SelectContent>
                  {produtos.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nome} ({p.unidade})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Mês de referência de custos</Label>
              <Input
                type="month"
                value={mesFiltro}
                onChange={(e) => setMesFiltro(e.target.value || mesAtual)}
                className="w-full"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Qtd. produzida no mês (unidades para rateio)</Label>
              <Input
                type="number"
                min={1}
                value={qtdProduzida}
                onChange={(e) => setQtdProduzida(Number(e.target.value) || 1)}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Conteúdo principal (visível após selecionar produto) ──────────────── */}
      {!produtoId ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <Package className="size-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um produto acima para iniciar a análise de custo.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* ── Coluna esquerda: Insumos + Custos do mês ─────────────────────── */}
          <div className="xl:col-span-3 space-y-6">
            {/* Insumos */}
            <Card id="tour-precificacao-insumos">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    Insumos de <span className="text-primary">{produtoSelecionado?.nome}</span>
                  </CardTitle>
                  <Button
                    size="sm"
                    onClick={() => { setEditInsumo(null); setOpenInsumo(true); }}
                  >
                    <Plus className="size-4 mr-1" /> Adicionar insumo
                  </Button>
                </div>
                {/* Rendimento do lote */}
                <div className="flex items-center gap-3 mt-3 p-3 rounded-lg bg-muted/50 border">
                  <Layers className="size-4 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">Rendimento do lote</p>
                    <p className="text-xs text-muted-foreground">Quantas unidades este conjunto de insumos produz?</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Input
                      type="number"
                      min={1}
                      step={1}
                      value={rendimentoLote}
                      onChange={(e) => setRendimentoLote(Number(e.target.value) || 1)}
                      className="w-24 h-8 text-sm text-center"
                    />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {produtoSelecionado?.unidade}(s)
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-right">Qtd.</TableHead>
                      <TableHead className="text-right">Custo unit.</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insumos.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8 text-sm">
                          Nenhum insumo cadastrado para este produto.
                        </TableCell>
                      </TableRow>
                    )}
                    {insumos.map((ins) => (
                      <TableRow key={ins.id}>
                        <TableCell className="font-medium">{ins.descricao}</TableCell>
                        <TableCell className="text-right tabular-nums">{Number(ins.quantidade).toLocaleString("pt-BR")}</TableCell>
                        <TableCell className="text-right tabular-nums">{brl(ins.custo_unitario)}</TableCell>
                        <TableCell className="text-right tabular-nums font-semibold">
                          {brl(Number(ins.quantidade) * Number(ins.custo_unitario))}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 justify-end">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => { setEditInsumo(ins); setOpenInsumo(true); }}
                              title="Editar"
                            >
                              <Pencil className="size-3.5" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost" title="Remover">
                                  <Trash2 className="size-3.5 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remover insumo?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    O insumo <b>{ins.descricao}</b> será removido deste produto.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => removerInsumo.mutate(ins.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Remover
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {insumos.length > 0 && (
                  <div className="mt-3 pt-3 border-t space-y-1.5">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Custo total do lote ({rendimentoLote} {produtoSelecionado?.unidade})</span>
                      <span className="tabular-nums font-medium text-foreground">{brl(custoLote)}</span>
                    </div>
                    {rendimentoLote > 1 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">÷ {rendimentoLote} {produtoSelecionado?.unidade}(s) por lote</span>
                        <span className="font-semibold text-primary tabular-nums">{brl(custoInsumos)} / un.</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Custos do mês */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="text-base capitalize">
                    Custos de {mesLabel}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {custosExcluidos.size > 0 && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <EyeOff className="size-3" />
                        {custosExcluidos.size} excluído(s)
                      </Badge>
                    )}
                    <span>
                      Considerado:{" "}
                      <span className="font-semibold text-foreground tabular-nums">{brl(totalCustosDoMes)}</span>
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {contasDoMes.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6 text-sm">
                    Nenhum custo encontrado para <span className="capitalize">{mesLabel}</span>.
                  </p>
                ) : (
                  <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground">
                      Marque os custos que <strong>não</strong> devem entrar no rateio deste produto.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => excluirTodos(false)}
                        disabled={custosExcluidos.size === 0}
                      >
                        Incluir todos
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => excluirTodos(true)}
                        disabled={custosExcluidos.size === contasDoMes.length}
                      >
                        Excluir todos
                      </Button>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">Incluir</TableHead>
                        <TableHead>Fornecedor / Descrição</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contasDoMes.map((c) => {
                        const excluido = custosExcluidos.has(c.id);
                        return (
                          <TableRow
                            key={c.id}
                            className={excluido ? "opacity-40" : ""}
                          >
                            <TableCell>
                              <Checkbox
                                id={`custo-${c.id}`}
                                checked={!excluido}
                                onCheckedChange={() => toggleExcluirCusto(c.id)}
                                aria-label={excluido ? `Incluir ${c.fornecedor} no rateio` : `Excluir ${c.fornecedor} do rateio`}
                              />
                            </TableCell>
                            <TableCell className={`font-medium ${excluido ? "line-through" : ""}`}>
                              {c.fornecedor}
                            </TableCell>
                            <TableCell>
                              <Badge variant={c.status === "pago" ? "default" : "secondary"} className="text-xs">
                                {c.status === "pago" ? "Pago" : "Pendente"}
                              </Badge>
                            </TableCell>
                            <TableCell className={`text-right tabular-nums ${excluido ? "line-through text-muted-foreground" : ""}`}>
                              {brl(c.valor)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  </>
                )}
                <div className="mt-3 pt-3 border-t rounded-md bg-muted/40 px-3 py-2 text-sm flex flex-col gap-1">
                  {totalExcluido > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <EyeOff className="size-3" /> Excluído do rateio
                      </span>
                      <span className="tabular-nums line-through">{brl(totalExcluido)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total considerado</span>
                    <span className="font-semibold tabular-nums">{brl(totalCustosDoMes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      ÷ {qtdProduzida} {produtoSelecionado?.unidade}(s) produzidas
                    </span>
                    <span className="font-semibold tabular-nums text-primary">{brl(custoRateado)} / un.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Coluna direita: Calculadora ──────────────────────────────────── */}
          <div className="xl:col-span-2 space-y-6">
            {/* Resumo de custos */}
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="size-4 text-primary" />
                  Resumo de Custos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rendimentoLote > 1 && (
                  <div className="text-xs text-muted-foreground flex justify-between pb-1 border-b">
                    <span className="flex items-center gap-1"><Layers className="size-3" /> Lote de {rendimentoLote} {produtoSelecionado?.unidade}(s)</span>
                    <span className="tabular-nums">{brl(custoLote)} / lote</span>
                  </div>
                )}
                <CostLine label={rendimentoLote > 1 ? `Insumos (${brl(custoLote)} ÷ ${rendimentoLote})` : "Custo de insumos"} value={custoInsumos} />
                <CostLine label={`Custos fixos rateados (${qtdProduzida} un.)`} value={custoRateado} />
                <div className="border-t pt-3">
                  <CostLine label="Custo total por unidade" value={custoTotal} highlight />
                </div>
              </CardContent>
            </Card>

            {/* Calculadora de margem */}
            <Card id="tour-precificacao-calc">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  Calculadora de Preço
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Margem de lucro desejada</Label>
                    <span className="text-lg font-bold text-primary tabular-nums">{margem}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    step={1}
                    value={margem}
                    onChange={(e) => setMargem(Number(e.target.value))}
                    className="w-full accent-primary h-2 rounded-full cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>100%</span>
                    <span>200%</span>
                  </div>
                </div>

                <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-4 text-center space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Preço sugerido</p>
                    <p className="text-4xl font-bold text-primary tabular-nums">{brl(precoSugerido)}</p>
                    <p className="text-xs text-muted-foreground">
                      Custo {brl(custoTotal)} + {margem}% de margem
                    </p>
                  </div>
                  <Button
                    className="w-full gap-2"
                    onClick={() => atualizarPreco.mutate(parseFloat(precoSugerido.toFixed(2)))}
                    disabled={atualizarPreco.isPending || !produtoId}
                  >
                    <Save className="size-4" />
                    {atualizarPreco.isPending ? "Salvando..." : `Aplicar ${brl(precoSugerido)} ao produto`}
                  </Button>
                </div>

                {/* Comparativo com preço atual */}
                <div className="rounded-lg border bg-card p-4 space-y-3">
                  <p className="text-sm font-medium">Comparativo com preço atual</p>
                  {precoAtual > 0 ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Preço cadastrado</span>
                        <span className="font-semibold tabular-nums">{brl(precoAtual)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Custo total</span>
                        <span className="font-semibold tabular-nums">{brl(custoTotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span className="text-muted-foreground">
                          {lucroAtual >= 0 ? "Lucro por unidade" : "Prejuízo por unidade"}
                        </span>
                        <span className={`font-bold tabular-nums ${lucroAtual >= 0 ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>
                          {lucroAtual >= 0 ? "+" : ""}{brl(lucroAtual)}
                        </span>
                      </div>
                      {margemAtual !== null && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Margem atual</span>
                          <span className={`font-bold tabular-nums ${margemAtual >= 0 ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>
                            {margemAtual.toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      Produto sem preço cadastrado.
                    </p>
                  )}
                </div>

                {/* Badge de status */}
                <div className="flex justify-center">
                  <Badge
                    variant={status.variant}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
                  >
                    {status.icon}
                    {status.label}
                  </Badge>
                </div>

                {/* Diferença entre preço atual e sugerido */}
                {precoAtual > 0 && (
                  <div className="rounded-md bg-muted/60 px-3 py-2 text-xs text-muted-foreground flex items-start gap-2">
                    <Info className="size-3.5 mt-0.5 shrink-0" />
                    <span>
                      {precoAtual >= precoSugerido
                        ? `O preço atual está ${brl(precoAtual - precoSugerido)} acima do preço sugerido com ${margem}% de margem.`
                        : `Para atingir ${margem}% de margem, reajuste o preço em +${brl(precoSugerido - precoAtual)}.`}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Simulação por margem */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Simulação de margens</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Margem</TableHead>
                      <TableHead className="text-right">Preço sugerido</TableHead>
                      <TableHead className="text-right">Lucro / un.</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[10, 20, 30, 40, 50, 60, 80, 100].map((m) => {
                      const p = custoTotal * (1 + m / 100);
                      const l = p - custoTotal;
                      const isAtual = precoAtual > 0 && Math.abs(precoAtual - p) < 0.01;
                      return (
                        <TableRow
                          key={m}
                          className={`cursor-pointer transition-colors ${m === margem ? "bg-primary/10" : ""}`}
                          onClick={() => setMargem(m)}
                        >
                          <TableCell>
                            <span className={`font-medium ${m === margem ? "text-primary" : ""}`}>{m}%</span>
                            {isAtual && <Badge variant="outline" className="ml-2 text-[10px] py-0">atual</Badge>}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">{brl(p)}</TableCell>
                          <TableCell className="text-right tabular-nums text-green-600 dark:text-green-400">+{brl(l)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 text-xs gap-1 px-2"
                              onClick={(e) => { e.stopPropagation(); atualizarPreco.mutate(parseFloat(p.toFixed(2))); }}
                              disabled={atualizarPreco.isPending}
                              title={`Aplicar ${brl(p)} como preço do produto`}
                            >
                              <Save className="size-3" /> Aplicar
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ── Dialog de Insumo ─────────────────────────────────────────────────── */}
      {openInsumo && produtoId && (
        <InsumoDialog
          open={openInsumo}
          onClose={() => setOpenInsumo(false)}
          insumo={editInsumo}
          produtoId={produtoId}
          onSaved={() => qc.invalidateQueries({ queryKey: ["produto_insumos", produtoId] })}
        />
      )}
    </div>
  );
}

// ─── Linha de custo ──────────────────────────────────────────────────────────
function CostLine({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center text-sm ${highlight ? "font-bold text-base" : ""}`}>
      <span className={highlight ? "text-foreground" : "text-muted-foreground"}>{label}</span>
      <span className={`tabular-nums ${highlight ? "text-primary text-lg" : "text-foreground"}`}>{brl(value)}</span>
    </div>
  );
}

// ─── Dialog de cadastro/edição de insumo ─────────────────────────────────────
function InsumoDialog({
  open, onClose, insumo, produtoId, onSaved,
}: {
  open: boolean;
  onClose: () => void;
  insumo: Insumo | null;
  produtoId: string;
  onSaved: () => void;
}) {
  const [descricao, setDescricao] = useState(insumo?.descricao ?? "");
  const [quantidade, setQuantidade] = useState<number>(insumo ? Number(insumo.quantidade) : 1);
  const [custoUnitario, setCustoUnitario] = useState<number>(insumo ? Number(insumo.custo_unitario) : 0);
  const [salvando, setSalvando] = useState(false);

  const subtotal = quantidade * custoUnitario;

  const save = async () => {
    if (!descricao.trim()) return toast.error("Informe a descrição do insumo");
    if (quantidade <= 0) return toast.error("Quantidade deve ser maior que zero");
    setSalvando(true);

    const payload = {
      produto_id: produtoId,
      descricao: descricao.trim(),
      quantidade: Number(quantidade),
      custo_unitario: Number(custoUnitario),
    };

    const op = insumo
      ? supabase.from("produto_insumos" as any).update(payload).eq("id", insumo.id)
      : supabase.from("produto_insumos" as any).insert(payload);

    const { error } = await op;
    setSalvando(false);
    if (error) return toast.error(error.message);
    toast.success(insumo ? "Insumo atualizado" : "Insumo cadastrado");
    onSaved();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{insumo ? "Editar insumo" : "Novo insumo"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Descrição do insumo</Label>
            <Input
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex.: Açúcar refinado, Leite condensado..."
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Quantidade utilizada</Label>
              <Input
                type="number"
                step="0.001"
                min={0.001}
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Custo unitário (R$)</Label>
              <CurrencyInput value={custoUnitario} onValueChange={setCustoUnitario} />
            </div>
          </div>
          {quantidade > 0 && custoUnitario > 0 && (
            <div className="rounded-md bg-muted/60 px-3 py-2 text-sm flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold tabular-nums">{brl(subtotal)}</span>
            </div>
          )}
          <div className="flex gap-2 justify-end pt-1">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button onClick={save} disabled={salvando}>
              {salvando ? "Salvando..." : insumo ? "Salvar" : "Cadastrar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
