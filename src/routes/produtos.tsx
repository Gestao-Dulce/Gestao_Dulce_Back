import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CurrencyInput } from "@/components/ui/currency-input";
import { brl } from "@/lib/format";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Printer } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/produtos")({ component: ProdutosPage });

const UNIDADES = ["unidade", "kg", "caixa"];

type Produto = { id: string; nome: string; observacao: string | null; unidade: string; valor: number };

function ProdutosPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Produto | null>(null);
  const [busca, setBusca] = useState("");

  const { data: produtos = [] } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("produtos" as any).select("*").order("nome");
      if (error) throw error;
      return (data ?? []) as unknown as Produto[];
    },
  });

  const remover = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("produtos" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Produto excluído");
      qc.invalidateQueries({ queryKey: ["produtos"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const filtrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (p.observacao ?? "").toLowerCase().includes(busca.toLowerCase())
  );

  const imprimirRelatorio = () => {
    const linhas = filtrados.map((p) => `<tr>
      <td>${p.nome}</td>
      <td>${p.unidade.charAt(0).toUpperCase() + p.unidade.slice(1)}</td>
      <td style="text-align:right">${brl(p.valor)}</td>
      <td>${p.observacao ?? "—"}</td>
    </tr>`).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Relatório de Produtos — Doces Lucelian</title>
      <style>
        body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#1a1a1a}
        h1{color:#c8102e;margin:0 0 4px}
        .meta{color:#666;font-size:12px;margin-bottom:16px}
        table{width:100%;border-collapse:collapse;font-size:12px}
        th,td{padding:8px;border-bottom:1px solid #e5e5e5;text-align:left}
        th{background:#fafafa;text-transform:uppercase;font-size:10px;letter-spacing:.05em}
      </style></head><body>
      <h1>Doces Lucelian — Relatório de Produtos</h1>
      <div class="meta">Emitido em ${new Date().toLocaleString("pt-BR")} • ${filtrados.length} produto(s)${busca ? ` • Busca: "${busca}"` : ""}</div>
      <table>
        <thead><tr><th>Nome</th><th>Unidade</th><th style="text-align:right">Valor</th><th>Observação</th></tr></thead>
        <tbody>${linhas || `<tr><td colspan="4" style="text-align:center;padding:24px;color:#888">Sem produtos.</td></tr>`}</tbody>
      </table>
      <script>window.onload=()=>window.print();<\/script>
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
          <h2 className="text-2xl font-semibold tracking-tight">Produtos</h2>
          <p className="text-sm text-muted-foreground">Cadastro de produtos com unidade, valor e observações.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={imprimirRelatorio}><Printer className="size-4 mr-1" /> Relatório</Button>
          <Button id="tour-produtos-add" onClick={() => { setEditing(null); setOpen(true); }}>
            <Plus className="size-4 mr-1" /> Novo produto
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <Input placeholder="Buscar produto..." value={busca} onChange={(e) => setBusca(e.target.value)} className="max-w-sm" />
        </CardHeader>
        <CardContent>
          <Table id="tour-produtos-table">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Observação</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtrados.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Nenhum produto cadastrado.</TableCell></TableRow>
              )}
              {filtrados.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{p.unidade.charAt(0).toUpperCase() + p.unidade.slice(1)}</TableCell>
                  <TableCell className="text-right tabular-nums">{brl(p.valor)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-md truncate" title={p.observacao ?? ""}>{p.observacao || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      <Button size="icon" variant="ghost" onClick={() => { setEditing(p); setOpen(true); }} title="Editar">
                        <Pencil className="size-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="ghost" title="Excluir"><Trash2 className="size-3.5 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir produto?</AlertDialogTitle>
                            <AlertDialogDescription>
                              O produto <b>{p.nome}</b> será removido do cadastro. Vendas anteriores não serão afetadas.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => remover.mutate(p.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {open && (
        <ProdutoDialog
          open={open}
          onClose={() => setOpen(false)}
          produto={editing}
          onSaved={() => qc.invalidateQueries({ queryKey: ["produtos"] })}
        />
      )}
    </div>
  );
}

function ProdutoDialog({ open, onClose, produto, onSaved }: {
  open: boolean; onClose: () => void; produto: Produto | null; onSaved: () => void;
}) {
  const [nome, setNome] = useState(produto?.nome ?? "");
  const [observacao, setObservacao] = useState(produto?.observacao ?? "");
  const [unidade, setUnidade] = useState(produto?.unidade ?? "unidade");
  const [valor, setValor] = useState<number>(produto ? Number(produto.valor) : 0);
  const [salvando, setSalvando] = useState(false);

  const save = async () => {
    if (!nome.trim()) return toast.error("Informe o nome");
    setSalvando(true);
    const payload = { nome: nome.trim(), observacao: observacao.trim() || null, unidade, valor: Number(valor) || 0 };
    const op = produto
      ? supabase.from("produtos" as any).update(payload).eq("id", produto.id)
      : supabase.from("produtos" as any).insert(payload);
    const { error } = await op;
    setSalvando(false);
    if (error) return toast.error(error.message);
    toast.success(produto ? "Produto atualizado" : "Produto cadastrado");
    onSaved();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>{produto ? "Editar produto" : "Novo produto"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Nome</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Unidade</Label>
              <Select value={unidade} onValueChange={setUnidade}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {UNIDADES.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Valor (R$)</Label>
              <CurrencyInput value={valor} onValueChange={setValor} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Observação</Label>
            <Textarea value={observacao ?? ""} onChange={(e) => setObservacao(e.target.value)} rows={3} />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button onClick={save} disabled={salvando}>{salvando ? "Salvando..." : produto ? "Salvar" : "Cadastrar"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
