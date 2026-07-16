import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CurrencyInput } from "@/components/ui/currency-input";
import { brl, dataBR, hoje } from "@/lib/format";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Pencil, Printer, UserPlus, PackagePlus, CheckCircle } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/vendas")({ component: VendasPage });

const formaLabel: Record<string, string> = { dinheiro: "Dinheiro", pix: "PIX", cartao: "Cartão", boleto: "Boleto", faturado: "Boleto" };

function imprimirVenda(v: any) {
  const itens = (v.venda_itens ?? []);
  const linhas = itens.length
    ? itens.map((i: any) => `<tr>
        <td>${i.produto}</td>
        <td style="text-align:right">${Number(i.quantidade)}</td>
        <td>${i.unidade ?? "unidade"}</td>
        <td style="text-align:right">${brl(i.valor_unitario)}</td>
        <td style="text-align:right">${brl(Number(i.quantidade) * Number(i.valor_unitario))}</td>
      </tr>`).join("")
    : `<tr><td>${v.produto ?? "—"}</td><td style="text-align:right">${Number(v.quantidade ?? 0)}</td><td>unidade</td><td style="text-align:right">${brl(v.valor_unitario ?? 0)}</td><td style="text-align:right">${brl((Number(v.quantidade ?? 0)) * Number(v.valor_unitario ?? 0))}</td></tr>`;

  const subtotal = itens.reduce((s: number, i: any) => s + Number(i.quantidade) * Number(i.valor_unitario), 0) || Number(v.valor_total ?? 0);
  const desconto = Number(v.desconto ?? 0);

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Venda — Doces Lucelian</title>
    <style>
      body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#1a1a1a;max-width:720px;margin:auto}
      h1{color:#c8102e;margin:0 0 4px;font-size:20px}
      .meta{color:#666;font-size:12px;margin-bottom:16px}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:16px 0;font-size:13px}
      .grid div b{display:block;font-size:10px;text-transform:uppercase;color:#888;letter-spacing:.05em}
      table{width:100%;border-collapse:collapse;font-size:12px;margin-top:8px}
      th,td{padding:8px;border-bottom:1px solid #e5e5e5;text-align:left}
      th{background:#fafafa;text-transform:uppercase;font-size:10px;letter-spacing:.05em}
      tfoot td{font-weight:700;border-top:2px solid #c8102e;border-bottom:none}
      .totais{margin-top:12px;display:flex;justify-content:flex-end}
      .totais table{width:auto;min-width:260px}
    </style></head><body>
    <h1>Doces Lucelian — Comprovante de venda</h1>
    <div class="meta">Emitido em ${new Date().toLocaleString("pt-BR")}</div>
    <div class="grid">
      <div><b>Cliente</b>${v.clientes?.nome ?? "—"}</div>
      <div><b>Data da venda</b>${dataBR(v.data)}</div>
      <div><b>Forma de pagamento</b>${formaLabel[v.forma_pagamento] ?? "—"}</div>
      <div><b>Status</b>${v.status_pagamento === "pago" ? "Pago" : "Pendente"}</div>
      <div><b>Nota fiscal</b>${v.nota_fiscal || "—"}</div>
      <div><b>Data prevista de pagamento</b>${v.data_pagamento ? dataBR(v.data_pagamento) : "—"}</div>
    </div>
    <table>
      <thead><tr><th>Produto</th><th style="text-align:right">Qtd</th><th>Unidade</th><th style="text-align:right">Valor unit.</th><th style="text-align:right">Subtotal</th></tr></thead>
      <tbody>${linhas}</tbody>
    </table>
    <div class="totais"><table>
      <tr><td>Subtotal</td><td style="text-align:right">${brl(subtotal)}</td></tr>
      <tr><td>Desconto</td><td style="text-align:right">- ${brl(desconto)}</td></tr>
      <tr><td><b>Valor total</b></td><td style="text-align:right"><b>${brl(v.valor_total)}</b></td></tr>
    </table></div>
    <script>window.onload=()=>window.print();<\/script>
  </body></html>`;
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) return toast.error("Permita pop-ups para imprimir");
  w.document.write(html);
  w.document.close();
}

type Item = { id: string; produto: string; quantidade: number; valor_unitario: number; unidade: string };

const UNIDADES = ["unidade", "kg", "caixa"];

function calcStatus(v: any): "pago" | "pendente" | "atrasado" {
  if (v.status_pagamento === "pago") return "pago";
  if (v.data_pagamento && v.data_pagamento < hoje()) return "atrasado";
  return "pendente";
}

function VendasPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [sortKey, setSortKey] = useState<string>("data");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [dataIni, setDataIni] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");

  const { data: clientes = [] } = useQuery({
    queryKey: ["clientes-select"],
    queryFn: async () => (await supabase.from("clientes").select("id, nome").order("nome")).data ?? [],
  });

  const { data: produtosCadastrados = [] } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const { data } = await supabase.from("produtos" as any).select("*").order("nome");
      return (data ?? []) as any[];
    },
  });

  const { data: produtosUsados = [] } = useQuery({
    queryKey: ["produtos-usados"],
    queryFn: async () => {
      const { data } = await supabase.from("venda_itens").select("produto").order("produto");
      return Array.from(new Set((data ?? []).map((r: any) => r.produto).filter(Boolean))) as string[];
    },
  });

  const { data: vendas = [] } = useQuery({
    queryKey: ["vendas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendas")
        .select("*, clientes(nome), venda_itens(*)")
        .order("data", { ascending: false })
        .limit(300);
      if (error) throw error;
      return data;
    },
  });

  const remover = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("venda_itens").delete().eq("venda_id", id);
      const { error } = await supabase.from("vendas").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Venda excluída");
      qc.invalidateQueries({ queryKey: ["vendas"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["clientes"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const marcarComoPago = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("vendas").update({ status_pagamento: "pago" }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Venda marcada como paga");
      qc.invalidateQueries({ queryKey: ["vendas"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const filtradas = vendas
    .map((v: any) => ({ ...v, _status: calcStatus(v) }))
    .filter((v) => filtroStatus === "todos" || v._status === filtroStatus)
    .filter((v) => (!dataIni || v.data >= dataIni) && (!dataFim || v.data <= dataFim))
    .filter((v) => {
      const s = busca.toLowerCase();
      return (
        v.clientes?.nome?.toLowerCase().includes(s) ||
        v.nota_fiscal?.toLowerCase().includes(s) ||
        (v.venda_itens ?? []).some((i: any) => i.produto.toLowerCase().includes(s))
      );
    })
    .sort((a: any, b: any) => {
      const get = (x: any) => {
        if (sortKey === "cliente") return x.clientes?.nome ?? "";
        if (sortKey === "produto") return (x.venda_itens?.[0]?.produto) ?? "";
        if (sortKey === "qtd") return (x.venda_itens ?? []).reduce((s: number, i: any) => s + Number(i.quantidade), 0);
        return x[sortKey];
      };
      const av = get(a), bv = get(b);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const sortBy = (k: string) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(k); setSortDir("asc"); }
  };
  const arrow = (k: string) => sortKey === k ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  const totalFiltrado = filtradas.reduce((s: number, v: any) => s + Number(v.valor_total), 0);

  const imprimirRelatorio = () => {
    const linhas = filtradas.map((v: any) => {
      const itens = (v.venda_itens ?? []).map((i: any) => `${i.produto} (${i.quantidade}x ${brl(i.valor_unitario)})`).join("; ") || v.produto || "—";
      return `<tr>
        <td>${dataBR(v.data)}</td>
        <td>${v.clientes?.nome ?? "—"}</td>
        <td>${itens}</td>
        <td>${v.nota_fiscal ?? "—"}</td>
        <td>${formaLabel[v.forma_pagamento]}</td>
        <td>${v._status}</td>
        <td style="text-align:right">${brl(v.valor_total)}</td>
      </tr>`;
    }).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Relatório de Vendas — Doces Lucelian</title>
      <style>
        body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#1a1a1a}
        h1{color:#c8102e;margin:0 0 4px}
        .meta{color:#666;font-size:12px;margin-bottom:16px}
        table{width:100%;border-collapse:collapse;font-size:12px}
        th,td{padding:8px;border-bottom:1px solid #e5e5e5;text-align:left}
        th{background:#fafafa;text-transform:uppercase;font-size:10px;letter-spacing:.05em}
        tfoot td{font-weight:700;border-top:2px solid #c8102e;border-bottom:none}
      </style></head><body>
      <h1>Doces Lucelian — Relatório de Vendas</h1>
      <div class="meta">Emitido em ${new Date().toLocaleString("pt-BR")} • ${filtradas.length} registro(s)
        ${dataIni || dataFim ? ` • Período: ${dataIni ? dataBR(dataIni) : "..."} a ${dataFim ? dataBR(dataFim) : "..."}` : ""}
        ${filtroStatus !== "todos" ? ` • Status: ${filtroStatus}` : ""}
      </div>
      <table>
        <thead><tr><th>Data</th><th>Cliente</th><th>Produtos</th><th>NF</th><th>Pgto</th><th>Status</th><th style="text-align:right">Total</th></tr></thead>
        <tbody>${linhas || `<tr><td colspan="7" style="text-align:center;padding:24px;color:#888">Sem vendas no filtro.</td></tr>`}</tbody>
        <tfoot><tr><td colspan="6">Total geral</td><td style="text-align:right">${brl(totalFiltrado)}</td></tr></tfoot>
      </table>
      <script>window.onload=()=>{window.print();}<\/script>
    </body></html>`;
    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) return toast.error("Permita pop-ups para imprimir");
    w.document.write(html);
    w.document.close();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Vendas</h2>
          <p className="text-sm text-muted-foreground">Carrinho com múltiplos produtos, desconto e status de pagamento.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={imprimirRelatorio}><Printer className="size-4 mr-1" /> Relatório</Button>
          <Button onClick={() => { setEditId(null); setOpen(true); }}><Plus className="size-4 mr-1" /> Nova venda</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 items-center">
            <Input placeholder="Buscar cliente, NF, produto..." value={busca} onChange={(e) => setBusca(e.target.value)} className="max-w-sm" />
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" value={dataIni} onChange={(e) => setDataIni(e.target.value)} className="w-[160px]" title="De" />
            <Input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} className="w-[160px]" title="Até" />
            <div className="ml-auto text-sm text-muted-foreground">Total filtrado: <span className="font-semibold text-foreground tabular-nums">{brl(totalFiltrado)}</span></div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => sortBy("data")}>Data{arrow("data")}</TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortBy("cliente")}>Cliente{arrow("cliente")}</TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortBy("produto")}>Produtos{arrow("produto")}</TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortBy("nota_fiscal")}>NF{arrow("nota_fiscal")}</TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => sortBy("qtd")}>Qtd{arrow("qtd")}</TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortBy("forma_pagamento")}>Pgto{arrow("forma_pagamento")}</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => sortBy("valor_total")}>Total{arrow("valor_total")}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtradas.length === 0 && <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">Nenhuma venda.</TableCell></TableRow>}
              {filtradas.map((v: any) => {
                const itens = v.venda_itens ?? [];
                const qtd = itens.reduce((s: number, i: any) => s + Number(i.quantidade), 0);
                const produtos = itens.map((i: any) => i.produto).join(", ") || v.produto || "—";
                return (
                  <TableRow key={v.id}>
                    <TableCell>{dataBR(v.data)}</TableCell>
                    <TableCell className="font-medium">{v.clientes?.nome ?? "—"}</TableCell>
                    <TableCell className="max-w-xs truncate" title={produtos}>{produtos}</TableCell>
                    <TableCell className="text-muted-foreground text-xs tabular-nums">{v.nota_fiscal || "—"}</TableCell>
                    <TableCell className="text-right tabular-nums">{qtd || Number(v.quantidade ?? 0)}</TableCell>
                    <TableCell><Badge variant="outline">{formaLabel[v.forma_pagamento]}</Badge></TableCell>
                    <TableCell><StatusBadge status={v._status} /></TableCell>
                    <TableCell className="text-right tabular-nums font-semibold">{brl(v.valor_total)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 justify-end">
                        {v._status !== "pago" && (
                          <Button size="icon" variant="ghost" onClick={() => marcarComoPago.mutate(v.id)} title="Marcar como Pago">
                            <CheckCircle className="size-3.5 text-green-600" />
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" onClick={() => { setEditId(v.id); setOpen(true); }} title="Editar">
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => imprimirVenda(v)} title="Imprimir venda">
                          <Printer className="size-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" title="Excluir"><Trash2 className="size-3.5 text-destructive" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir venda?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. A venda de <b>{v.clientes?.nome ?? "—"}</b> em <b>{dataBR(v.data)}</b> será removida permanentemente.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => remover.mutate(v.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {open && (
        <VendaDialog
          open={open}
          onClose={() => setOpen(false)}
          clientes={clientes}
          produtosUsados={produtosUsados}
          produtosCadastrados={produtosCadastrados}
          editId={editId}
          onSaved={() => {
            qc.invalidateQueries({ queryKey: ["vendas"] });
            qc.invalidateQueries({ queryKey: ["dashboard"] });
            qc.invalidateQueries({ queryKey: ["clientes"] });
            qc.invalidateQueries({ queryKey: ["produtos-usados"] });
            qc.invalidateQueries({ queryKey: ["produtos"] });
          }}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const base = "pointer-events-none";
  if (status === "pago") return <Badge className={`bg-success text-success-foreground hover:bg-success ${base}`}>Pago</Badge>;
  if (status === "atrasado") return <Badge className={`bg-destructive text-destructive-foreground hover:bg-destructive ${base}`}>Atrasado</Badge>;
  return <Badge className={`bg-warning text-warning-foreground hover:bg-warning ${base}`}>Pendente</Badge>;
}

function VendaDialog({ open, onClose, clientes, produtosUsados, produtosCadastrados, editId, onSaved }: {
  open: boolean; onClose: () => void; clientes: any[]; produtosUsados: string[]; produtosCadastrados: any[]; editId: string | null; onSaved: () => void;
}) {
  const qc = useQueryClient();
  const [cliente, setCliente] = useState("");
  const [forma, setForma] = useState<"dinheiro" | "pix" | "cartao" | "boleto" | "faturado">("pix");
  const [data, setData] = useState(hoje());
  const [dataPgto, setDataPgto] = useState("");
  const [statusPgto, setStatusPgto] = useState<"pago" | "pendente">("pendente");
  const [notaFiscal, setNotaFiscal] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [itens, setItens] = useState<Item[]>([]);
  const [novoOpen, setNovoOpen] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoContato, setNovoContato] = useState("");
  const [novoDoc, setNovoDoc] = useState("");
  const [salvandoCliente, setSalvandoCliente] = useState(false);
  const [novoProdOpen, setNovoProdOpen] = useState(false);
  const [novoProdItemId, setNovoProdItemId] = useState<string | null>(null);
  const [npNome, setNpNome] = useState("");
  const [npObs, setNpObs] = useState("");
  const [npUnidade, setNpUnidade] = useState("unidade");
  const [npValor, setNpValor] = useState(0);
  const [salvandoProd, setSalvandoProd] = useState(false);

  const abrirNovoProduto = (itemId: string) => {
    setNovoProdItemId(itemId);
    setNpNome(""); setNpObs(""); setNpUnidade("unidade"); setNpValor(0);
    setNovoProdOpen(true);
  };

  const criarProduto = async () => {
    if (!npNome.trim()) return toast.error("Informe o nome do produto");
    setSalvandoProd(true);
    const { data: ins, error } = await supabase.from("produtos" as any)
      .insert({ nome: npNome.trim(), observacao: npObs.trim() || null, unidade: npUnidade, valor: npValor })
      .select("*").single();
    setSalvandoProd(false);
    if (error) return toast.error(error.message);
    await qc.invalidateQueries({ queryKey: ["produtos"] });
    if (novoProdItemId) {
      const p = ins as any;
      setItens((it) => it.map((i) => i.id === novoProdItemId
        ? { ...i, produto: p.nome, unidade: p.unidade, valor_unitario: Number(p.valor) }
        : i));
    }
    toast.success("Produto cadastrado");
    setNovoProdOpen(false);
  };

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const aplicarProdutoCadastrado = (itemId: string, value: string) => {
    const p = produtosCadastrados.find(
      (x: any) => x.nome === value || `${x.nome} (${cap(x.unidade)})` === value
    );
    if (p) {
      setItens((it) => it.map((i) => i.id === itemId
        ? { ...i, produto: p.nome, unidade: p.unidade, valor_unitario: Number(p.valor) }
        : i));
    } else {
      setItens((it) => it.map((i) => i.id === itemId ? { ...i, produto: value } : i));
    }
  };

  const criarCliente = async () => {
    if (!novoNome.trim()) return toast.error("Informe o nome");
    setSalvandoCliente(true);
    const { data: ins, error } = await supabase.from("clientes").insert({
      nome: novoNome.trim(),
      contato: novoContato.trim() || null,
      cpf_cnpj: novoDoc.trim() || null,
    }).select("id, nome").single();
    setSalvandoCliente(false);
    if (error) return toast.error(error.message);
    await qc.invalidateQueries({ queryKey: ["clientes-select"] });
    await qc.invalidateQueries({ queryKey: ["clientes"] });
    setCliente(ins.id);
    toast.success("Cliente cadastrado");
    setNovoOpen(false);
    setNovoNome(""); setNovoContato(""); setNovoDoc("");
  };

  useQuery({
    queryKey: ["venda-edit", editId],
    enabled: !!editId,
    queryFn: async () => {
      const { data: v } = await supabase.from("vendas").select("*, venda_itens(*)").eq("id", editId!).single();
      if (v) {
        setCliente(v.cliente_id);
        setForma(v.forma_pagamento);
        setData(v.data);
        setDataPgto(v.data_pagamento ?? "");
        setStatusPgto(v.status_pagamento === "pago" ? "pago" : "pendente");
        setNotaFiscal(v.nota_fiscal ?? "");
        setDesconto(Number(v.desconto ?? 0));
        const its = (v.venda_itens as any[]) ?? [];
        setItens(its.length > 0
          ? its.map((i) => ({ id: i.id, produto: i.produto, quantidade: Number(i.quantidade), valor_unitario: Number(i.valor_unitario), unidade: i.unidade ?? "unidade" }))
          : v.produto ? [{ id: crypto.randomUUID(), produto: v.produto, quantidade: Number(v.quantidade ?? 1), valor_unitario: Number(v.valor_unitario ?? 0), unidade: "unidade" }] : []
        );
      }
      return v;
    },
  });

  const addItem = () => setItens((it) => [...it, { id: crypto.randomUUID(), produto: "", quantidade: 1, valor_unitario: 0, unidade: "unidade" }]);
  const updItem = (id: string, patch: Partial<Item>) => setItens((it) => it.map((i) => i.id === id ? { ...i, ...patch } : i));
  const delItem = (id: string) => setItens((it) => it.filter((i) => i.id !== id));

  const subtotal = itens.reduce((s, i) => s + i.quantidade * i.valor_unitario, 0);
  const total = Math.max(0, subtotal - desconto);

  const save = async () => {
    if (!cliente) return toast.error("Selecione um cliente");
    if (itens.length === 0) return toast.error("Adicione ao menos um item");
    if (itens.some((i) => !i.produto || i.quantidade <= 0)) return toast.error("Itens inválidos");

    const payload: any = {
      cliente_id: cliente,
      forma_pagamento: forma,
      data,
      data_pagamento: dataPgto || null,
      status_pagamento: statusPgto,
      nota_fiscal: notaFiscal || null,
      desconto,
      valor_total: total,
      produto: itens[0].produto,
      quantidade: itens.reduce((s, i) => s + i.quantidade, 0),
      valor_unitario: itens[0].valor_unitario,
    };

    let vendaId = editId;
    if (editId) {
      const { error } = await supabase.from("vendas").update(payload).eq("id", editId);
      if (error) return toast.error(error.message);
      await supabase.from("venda_itens").delete().eq("venda_id", editId);
    } else {
      const { data: ins, error } = await supabase.from("vendas").insert(payload).select("id").single();
      if (error) return toast.error(error.message);
      vendaId = ins.id;
    }

    const itensIns = itens.map((i) => ({ venda_id: vendaId!, produto: i.produto, quantidade: i.quantidade, valor_unitario: i.valor_unitario, unidade: i.unidade }));
    const { error: e2 } = await supabase.from("venda_itens").insert(itensIns);
    if (e2) return toast.error(e2.message);

    toast.success(editId ? "Venda atualizada" : "Venda registrada");
    onSaved();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{editId ? "Editar venda" : "Nova venda"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Cliente</Label>
              <div className="flex gap-2">
                <Select value={cliente} onValueChange={setCliente}>
                  <SelectTrigger className="flex-1"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    {clientes.map((c) => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" size="icon" title="Novo cliente" onClick={() => setNovoOpen(true)}>
                  <UserPlus className="size-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Data da venda</Label>
              <Input type="date" value={data} onChange={(e) => setData(e.target.value)} />
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Carrinho</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={addItem}><Plus className="size-3.5 mr-1" /> Adicionar produto</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {itens.length === 0 && <div className="text-sm text-muted-foreground py-2">Nenhum item.</div>}
              {itens.length > 0 && (
                <div className="grid grid-cols-[1fr_90px_110px_120px_40px_40px] gap-2 text-xs uppercase tracking-wide text-muted-foreground px-1">
                  <div>Produtos</div>
                  <div>Quantidade</div>
                  <div>Unidade</div>
                  <div>Valor (R$)</div>
                  <div></div>
                  <div></div>
                </div>
              )}
              {itens.map((i) => (
                <div key={i.id} className="grid grid-cols-[1fr_90px_110px_120px_40px_40px] gap-2 items-center">
                  <Select value={i.produto} onValueChange={(v) => aplicarProdutoCadastrado(i.id, v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {produtosCadastrados.map((p: any) => (
                        <SelectItem key={p.id} value={p.nome}>
                          {p.nome} ({cap(p.unidade)})
                        </SelectItem>
                      ))}
                      {i.produto && !produtosCadastrados.some((p: any) => p.nome === i.produto) && (
                        <SelectItem value={i.produto}>{i.produto}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <Input type="number" step="0.01" min="0" placeholder="Qtd" value={i.quantidade} onChange={(e) => updItem(i.id, { quantidade: Number(e.target.value) })} />
                  <Select value={i.unidade} onValueChange={(v) => updItem(i.id, { unidade: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {UNIDADES.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <CurrencyInput value={i.valor_unitario} onValueChange={(n) => updItem(i.id, { valor_unitario: n })} />
                  <Button size="icon" variant="ghost" title="Cadastrar novo produto" onClick={() => abrirNovoProduto(i.id)}><PackagePlus className="size-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => delItem(i.id)}><Trash2 className="size-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Forma pgto</Label>
              <Select value={forma} onValueChange={(v) => setForma(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="cartao">Cartão</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status pagamento</Label>
              <Select value={statusPgto} onValueChange={(v) => setStatusPgto(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Data prevista de pagamento</Label>
              <Input type="date" value={dataPgto} onChange={(e) => setDataPgto(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Nota fiscal</Label>
              <Input value={notaFiscal} onChange={(e) => setNotaFiscal(e.target.value)} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Desconto (R$)</Label>
              <CurrencyInput value={desconto} onValueChange={setDesconto} />
            </div>
          </div>

          <div className="rounded-md border border-border bg-accent/30 px-4 py-3 space-y-1">
            <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span className="tabular-nums">{brl(subtotal)}</span></div>
            <div className="flex justify-between text-sm text-muted-foreground"><span>Desconto</span><span className="tabular-nums">- {brl(desconto)}</span></div>
            <div className="flex justify-between font-semibold text-lg pt-1 border-t border-border"><span>Valor Total</span><span className="tabular-nums text-primary">{brl(total)}</span></div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button onClick={save}>{editId ? "Salvar alterações" : "Registrar venda"}</Button>
          </div>
        </div>
      </DialogContent>

      <Dialog open={novoOpen} onOpenChange={setNovoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Novo cliente</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Nome / Razão social</Label>
              <Input value={novoNome} onChange={(e) => setNovoNome(e.target.value)} autoFocus />
            </div>
            <div className="space-y-1.5">
              <Label>Contato</Label>
              <Input value={novoContato} onChange={(e) => setNovoContato(e.target.value)} placeholder="Telefone, email..." />
            </div>
            <div className="space-y-1.5">
              <Label>CPF / CNPJ</Label>
              <Input value={novoDoc} onChange={(e) => setNovoDoc(e.target.value)} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setNovoOpen(false)}>Cancelar</Button>
              <Button onClick={criarCliente} disabled={salvandoCliente}>
                {salvandoCliente ? "Salvando..." : "Cadastrar e usar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={novoProdOpen} onOpenChange={setNovoProdOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Novo produto</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Nome</Label>
              <Input value={npNome} onChange={(e) => setNpNome(e.target.value)} autoFocus />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Unidade</Label>
                <Select value={npUnidade} onValueChange={setNpUnidade}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {UNIDADES.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Valor (R$)</Label>
                <CurrencyInput value={npValor} onValueChange={setNpValor} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Observação</Label>
              <Textarea value={npObs} onChange={(e) => setNpObs(e.target.value)} rows={3} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setNovoProdOpen(false)}>Cancelar</Button>
              <Button onClick={criarProduto} disabled={salvandoProd}>
                {salvandoProd ? "Salvando..." : "Cadastrar e usar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
