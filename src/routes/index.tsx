import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brl, dataBR } from "@/lib/format";
import { imprimir } from "@/lib/report";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
  PieChart, Pie, Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet, Printer, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Dashboard });

type Periodo = "7" | "15" | "30" | "90" | "365";
type Serie = "ambos" | "lucro" | "vendas_contas";

const catLabel: Record<string, string> = {
  fornecedor: "Fornecedor",
  folha_pagamento: "Folha de pagamento",
  outros: "Outros",
};

const periodoLabel: Record<Periodo, string> = {
  "7": "últimos 7 dias",
  "15": "últimos 15 dias",
  "30": "últimos 30 dias",
  "90": "últimos 90 dias",
  "365": "último ano",
};

function Dashboard() {
  const [periodo, setPeriodo] = useState<Periodo>("30");
  const [serie, setSerie] = useState<Serie>("ambos");

  const dias = Number(periodo);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", dias],
    queryFn: async () => {
      const hojeStr = new Date().toISOString().slice(0, 10);
      const em15 = new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10);
      const inicioPeriodo = new Date(Date.now() - (dias - 1) * 86400000).toISOString().slice(0, 10);

      const [vendasPer, contasPer, contasProx, topClientes, topProdutos] =
        await Promise.all([
          supabase.from("vendas").select("data, valor_total, cliente_id, clientes(nome)").gte("data", inicioPeriodo),
          supabase.from("contas_a_pagar").select("vencimento, valor, status, categoria").gte("vencimento", inicioPeriodo),
          supabase.from("contas_a_pagar").select("vencimento, valor, fornecedor, categoria").eq("status", "pendente").gte("vencimento", hojeStr).lte("vencimento", em15).order("vencimento"),
          supabase.from("vendas").select("valor_total, cliente_id, clientes(nome)").gte("data", inicioPeriodo),
          supabase.from("venda_itens").select("produto, quantidade, valor_unitario, vendas!inner(data)").gte("vendas.data", inicioPeriodo),
        ]);

      const vendasData = vendasPer.data ?? [];
      const contasData = contasPer.data ?? [];

      const faturamento = vendasData.reduce((s, v) => s + Number(v.valor_total), 0);
      const contasPagas = contasData.filter((c: any) => c.status === "pago").reduce((s: number, v: any) => s + Number(v.valor), 0);
      const contasPendentes = contasData.filter((c: any) => c.status === "pendente").reduce((s: number, v: any) => s + Number(v.valor), 0);
      const lucro = faturamento - contasPagas;

      // Categorias no período
      const catMap = new Map<string, { pago: number; pendente: number }>();
      contasData.forEach((c: any) => {
        const cur = catMap.get(c.categoria) ?? { pago: 0, pendente: 0 };
        if (c.status === "pago") cur.pago += Number(c.valor);
        else cur.pendente += Number(c.valor);
        catMap.set(c.categoria, cur);
      });
      const categorias = [...catMap.entries()].map(([cat, v]) => ({
        categoria: catLabel[cat] ?? cat,
        pago: v.pago,
        pendente: v.pendente,
        total: v.pago + v.pendente,
      })).sort((a, b) => b.total - a.total);

      // Buckets diários, baseados no período
      const buckets: { dia: string; vendas: number; contas: number; lucro: number }[] = [];
      for (let i = dias - 1; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
        const v = vendasData.filter((x: any) => x.data === d).reduce((s: number, x: any) => s + Number(x.valor_total), 0);
        const c = contasData.filter((x: any) => x.vencimento === d && x.status === "pago").reduce((s: number, x: any) => s + Number(x.valor), 0);
        buckets.push({
          dia: new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "UTC" }),
          vendas: v,
          contas: c,
          lucro: v - c,
        });
      }

      const mapC = new Map<string, { nome: string; total: number }>();
      (topClientes.data ?? []).forEach((v: any) => {
        if (!v.cliente_id) return;
        const cur = mapC.get(v.cliente_id) ?? { nome: v.clientes?.nome ?? "—", total: 0 };
        cur.total += Number(v.valor_total);
        mapC.set(v.cliente_id, cur);
      });
      const rankClientes = [...mapC.values()].sort((a, b) => b.total - a.total).slice(0, 5);

      const mapP = new Map<string, { produto: string; total: number; qtd: number }>();
      (topProdutos.data ?? []).forEach((v: any) => {
        const cur = mapP.get(v.produto) ?? { produto: v.produto, total: 0, qtd: 0 };
        cur.total += Number(v.quantidade) * Number(v.valor_unitario);
        cur.qtd += Number(v.quantidade);
        mapP.set(v.produto, cur);
      });
      const rankProdutos = [...mapP.values()].sort((a, b) => b.total - a.total).slice(0, 5);

      return {
        faturamento,
        contasPagas,
        contasPendentes,
        lucro,
        categorias,
        contasProx: contasProx.data ?? [],
        dias: buckets,
        rankClientes,
        rankProdutos,
      };
    },
  });

  if (isLoading || !data) return <div className="text-muted-foreground">Carregando...</div>;

  const totalProx = data.contasProx.reduce((s, c: any) => s + Number(c.valor), 0);
  const lucroPositivo = data.lucro >= 0;
  const label = periodoLabel[periodo];

  const gerarRelatorio = () => {
    imprimir({
      titulo: `Resumo Financeiro — ${label}`,
      colunas: [{ label: "Indicador" }, { label: "Valor", align: "right" }],
      linhas: [
        ["Faturamento bruto", brl(data.faturamento)],
        ["Contas pagas", brl(data.contasPagas)],
        ["Contas pendentes", brl(data.contasPendentes)],
        [lucroPositivo ? "Resultado líquido" : "Prejuízo", brl(data.lucro)],
        ["A vencer próximos 15 dias", brl(totalProx)],
        ...data.categorias.map((c) => [`Categoria ${c.categoria} — pago/pendente`, `${brl(c.pago)} / ${brl(c.pendente)}`]),
        ...data.rankClientes.map((c) => [`Top cliente: ${c.nome}`, brl(c.total)]),
        ...data.rankProdutos.map((p) => [`Top produto: ${p.produto} (${p.qtd} un)`, brl(p.total)]),
      ],
    });
  };

  const chartCats = data.categorias.filter((c) => c.total > 0);
  const cores = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Visão geral · {label}</h2>
          <p className="text-sm text-muted-foreground">Use o filtro de período para alterar a janela analisada.</p>
        </div>
        <div className="flex gap-2 items-center">
          <Select value={periodo} onValueChange={(v) => setPeriodo(v as Periodo)}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="15">Últimos 15 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="365">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={gerarRelatorio}><Printer className="size-4 mr-1" /> Relatório</Button>
        </div>
      </div>

      <div id="tour-metrics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Faturamento bruto" value={brl(data.faturamento)} icon={<TrendingUp className="size-4" />} sub={label} />
        <Kpi label="Contas pagas" value={brl(data.contasPagas)} icon={<CheckCircle2 className="size-4" />} sub="Saídas confirmadas" />
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                {lucroPositivo ? "Resultado líquido" : "Prejuízo"}
              </div>
              <Wallet className={`size-4 ${lucroPositivo ? "text-success" : "text-destructive"}`} />
            </div>
            <div className={`mt-2 text-2xl font-semibold tabular-nums ${lucroPositivo ? "text-success" : "text-destructive"}`}>
              {brl(data.lucro)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Faturamento − pagas</div>
          </CardContent>
        </Card>
        <Kpi
          label="Pendente no período"
          value={brl(data.contasPendentes)}
          icon={<TrendingDown className="size-4" />}
          sub="Ver detalhes em Contas a pagar"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
          <div>
            <CardTitle>Movimentação financeira</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Acompanha o filtro acima · {label}</p>
          </div>
          <Select value={serie} onValueChange={(v) => setSerie(v as Serie)}>
            <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ambos">Tudo</SelectItem>
              <SelectItem value="lucro">Apenas resultado líquido</SelectItem>
              <SelectItem value="vendas_contas">Vendas vs Contas pagas</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.dias}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="dia" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip formatter={(v: number) => brl(v)} contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Legend />
              {(serie === "ambos" || serie === "vendas_contas") && <Bar key="vendas" dataKey="vendas" name="Vendas" fill="var(--color-success)" radius={[4, 4, 0, 0]} />}
              {(serie === "ambos" || serie === "vendas_contas") && <Bar key="contas" dataKey="contas" name="Contas pagas" fill="var(--color-destructive)" radius={[4, 4, 0, 0]} />}
              {(serie === "ambos" || serie === "lucro") && <Bar key="lucro" dataKey="lucro" name="Resultado líquido" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Contas por categoria · {label}</CardTitle></CardHeader>
          <CardContent>
            {chartCats.length === 0 ? <Empty /> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartCats} dataKey="total" nameKey="categoria" innerRadius={45} outerRadius={80} paddingAngle={2}>
                        {chartCats.map((_, i) => <Cell key={i} fill={cores[i % cores.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => brl(v)} contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="space-y-2 text-sm">
                  {chartCats.map((c, i) => (
                    <li key={c.categoria} className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="size-3 rounded-sm" style={{ background: cores[i % cores.length] }} />
                          {c.categoria}
                        </span>
                        <span className="font-semibold tabular-nums">{brl(c.total)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground pl-5">
                        Pago {brl(c.pago)} · Pendente {brl(c.pendente)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Contas a pagar — próximos 15 dias</span>
              <span className="text-sm font-normal text-muted-foreground tabular-nums">{brl(totalProx)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.contasProx.length === 0 ? (
              <div className="text-muted-foreground text-sm py-4">Sem compromissos próximos.</div>
            ) : (
              <ul className="divide-y divide-border">
                {data.contasProx.map((c: any, idx: number) => {
                  const dd = Math.ceil((new Date(c.vencimento).getTime() - new Date(new Date().toDateString()).getTime()) / 86400000);
                  const urgente = dd <= 3;
                  return (
                    <li key={idx} className="py-2.5 flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{c.fornecedor}</div>
                        <div className="text-xs text-muted-foreground">
                          {catLabel[c.categoria] ?? c.categoria} · Vence em {dataBR(c.vencimento)}
                          {dd === 0 ? " (hoje)" : dd > 0 ? ` (em ${dd}d)` : ""}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {urgente && <Badge variant="destructive">urgente</Badge>}
                        <div className="font-semibold tabular-nums">{brl(c.valor)}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Top clientes · {label}</CardTitle></CardHeader>
          <CardContent>
            {data.rankClientes.length === 0 ? <Empty /> : (
              <ol className="space-y-2">
                {data.rankClientes.map((c, i) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-3">
                      <span className="size-6 grid place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">{i + 1}</span>
                      {c.nome}
                    </span>
                    <span className="font-semibold tabular-nums">{brl(c.total)}</span>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Top produtos · {label}</CardTitle></CardHeader>
          <CardContent>
            {data.rankProdutos.length === 0 ? <Empty /> : (
              <ol className="space-y-2">
                {data.rankProdutos.map((p, i) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-3">
                      <span className="size-6 grid place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">{i + 1}</span>
                      {p.produto} <span className="text-xs text-muted-foreground">({p.qtd} un)</span>
                    </span>
                    <span className="font-semibold tabular-nums">{brl(p.total)}</span>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Kpi({ label, value, icon, sub, alerta }: { label: string; value: string; icon?: React.ReactNode; sub?: string; alerta?: boolean }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className={`mt-2 text-2xl font-semibold tabular-nums ${alerta ? "text-destructive" : ""}`}>{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
      </CardContent>
    </Card>
  );
}

function Empty() {
  return <div className="text-muted-foreground text-sm py-6 text-center">Sem dados ainda.</div>;
}
