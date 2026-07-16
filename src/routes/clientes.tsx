import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { brl, dataBR, hoje, formatCPFCNPJ, formatPhone } from "@/lib/format";
import { imprimir } from "@/lib/report";
import { toast } from "sonner";
import { Plus, Pencil, Search, Loader2, Printer, Trash2 } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/clientes")({ component: ClientesPage });

const schema = z.object({
  nome: z.string().trim().min(2).max(120),
  cpf_cnpj: z.string().trim().max(20).optional().or(z.literal("")),
  contato: z.string().trim().max(60).optional().or(z.literal("")),
  localizacao: z.string().trim().max(120).optional().or(z.literal("")),
  cep: z.string().trim().max(10).optional().or(z.literal("")),
  rua: z.string().trim().max(160).optional().or(z.literal("")),
  numero: z.string().trim().max(20).optional().or(z.literal("")),
  bairro: z.string().trim().max(120).optional().or(z.literal("")),
  cidade: z.string().trim().max(120).optional().or(z.literal("")),
});
type Form = z.infer<typeof schema>;

function statusCliente(vendas: any[]): "em_dia" | "pendente" | "atrasado" {
  const naoPagas = vendas.filter((v) => v.status_pagamento !== "pago");
  if (naoPagas.length === 0) return "em_dia";
  const h = hoje();
  if (naoPagas.some((v) => v.data_pagamento && v.data_pagamento < h)) return "atrasado";
  return "pendente";
}

function ClientesPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [sortKey, setSortKey] = useState<"nome" | "cpf_cnpj" | "total" | "created_at">("nome");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [buscandoCep, setBuscandoCep] = useState(false);

  const form = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { nome: "", cpf_cnpj: "", contato: "", localizacao: "", cep: "", rua: "", numero: "", bairro: "", cidade: "" } });

  const { data: clientes = [] } = useQuery({
    queryKey: ["clientes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clientes")
        .select("*, vendas(valor_total, status_pagamento, data_pagamento)")
        .order("nome");
      if (error) throw error;
      return data;
    },
  });

  const upsert = useMutation({
    mutationFn: async (v: Form) => {
      const payload = {
        nome: v.nome,
        cpf_cnpj: v.cpf_cnpj || null,
        contato: v.contato || null,
        localizacao: v.localizacao || null,
        cep: v.cep || null,
        rua: v.rua || null,
        numero: v.numero || null,
        bairro: v.bairro || null,
        cidade: v.cidade || null,
      };
      if (editId) {
        const { error } = await supabase.from("clientes").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("clientes").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editId ? "Cliente atualizado" : "Cliente cadastrado");
      setOpen(false); setEditId(null); form.reset();
      qc.invalidateQueries({ queryKey: ["clientes"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const remover = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("clientes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Cliente excluído");
      qc.invalidateQueries({ queryKey: ["clientes"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const openNew = () => { setEditId(null); form.reset({ nome: "", cpf_cnpj: "", contato: "", localizacao: "", cep: "", rua: "", numero: "", bairro: "", cidade: "" }); setOpen(true); };
  const openEdit = (c: any) => {
    setEditId(c.id);
    form.reset({ nome: c.nome, cpf_cnpj: c.cpf_cnpj ?? "", contato: c.contato ?? "", localizacao: c.localizacao ?? "", cep: c.cep ?? "", rua: c.rua ?? "", numero: c.numero ?? "", bairro: c.bairro ?? "", cidade: c.cidade ?? "" });
    setOpen(true);
  };

  const buscarCep = async () => {
    const cep = (form.getValues("cep") ?? "").replace(/\D/g, "");
    if (cep.length !== 8) { toast.error("CEP inválido"); return; }
    try {
      setBuscandoCep(true);
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) { toast.error("CEP não encontrado"); return; }
      form.setValue("rua", data.logradouro ?? "");
      form.setValue("bairro", data.bairro ?? "");
      form.setValue("cidade", [data.localidade, data.uf].filter(Boolean).join(" / "));
      toast.success("Endereço preenchido");
    } catch {
      toast.error("Falha ao buscar CEP");
    } finally {
      setBuscandoCep(false);
    }
  };

  const enriched = clientes.map((c: any) => ({
    ...c,
    _total: (c.vendas ?? []).reduce((s: number, v: any) => s + Number(v.valor_total), 0),
    _status: statusCliente(c.vendas ?? []),
  }));

  const filtrados = enriched
    .filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()) || (c.cpf_cnpj ?? "").includes(busca))
    .filter((c) => filtroStatus === "todos" || c._status === filtroStatus)
    .sort((a, b) => {
      const av = sortKey === "total" ? a._total : (a as any)[sortKey] ?? "";
      const bv = sortKey === "total" ? b._total : (b as any)[sortKey] ?? "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const sortBy = (k: typeof sortKey) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(k); setSortDir("asc"); }
  };
  const arrow = (k: typeof sortKey) => sortKey === k ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  const statusLabel: Record<string, string> = { em_dia: "Em dia", pendente: "Pendente", atrasado: "Atrasado" };
  const gerarRelatorio = () => {
    imprimir({
      titulo: "Relatório de Clientes",
      meta: filtroStatus !== "todos" ? `Status: ${statusLabel[filtroStatus]}` : undefined,
      colunas: [
        { label: "Nome" }, { label: "CPF/CNPJ" }, { label: "Contato" },
        { label: "Endereço" }, { label: "Status" }, { label: "Total", align: "right" },
      ],
      linhas: filtrados.map((c: any) => [
        c.nome,
        c.cpf_cnpj || "—",
        c.contato || "—",
        [c.rua, c.numero].filter(Boolean).join(", ") + (c.bairro ? ` — ${c.bairro}` : "") + (c.cidade ? ` (${c.cidade})` : "") || "—",
        statusLabel[c._status],
        brl(c._total),
      ]),
      rodape: ["Total geral", "", "", "", "", brl(filtrados.reduce((s, c: any) => s + c._total, 0))],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Clientes</h2>
          <p className="text-sm text-muted-foreground">Cadastro, status financeiro e histórico de compras.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={gerarRelatorio}><Printer className="size-4 mr-1" /> Relatório</Button>
          <Button id="tour-clientes-add" onClick={openNew}><Plus className="size-4 mr-1" /> Novo cliente</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input id="tour-clientes-search" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome ou documento..." className="pl-9" />
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="em_dia">Em dia</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table id="tour-clientes-table">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => sortBy("nome")}>Nome{arrow("nome")}</TableHead>
                <TableHead className="cursor-pointer" onClick={() => sortBy("cpf_cnpj")}>CPF / CNPJ{arrow("cpf_cnpj")}</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => sortBy("total")}>Total{arrow("total")}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtrados.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Nenhum cliente.</TableCell></TableRow>}
              {filtrados.map((c: any) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">
                    {c.nome}
                  </TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">{c.cpf_cnpj || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{c.contato || "—"}</TableCell>
                  <TableCell><ClienteStatus s={c._status} /></TableCell>
                  <TableCell className="text-right tabular-nums">{brl(c._total)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(c)} title="Editar"><Pencil className="size-3.5" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="ghost" title="Excluir"><Trash2 className="size-3.5 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir cliente?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. O cliente <b>{c.nome}</b> será removido permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => remover.mutate(c.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editId ? "Editar cliente" : "Novo cliente"}</DialogTitle></DialogHeader>
          <form onSubmit={form.handleSubmit((v) => upsert.mutate(v))} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome / Razão social</Label>
              <Input {...form.register("nome")} />
              {form.formState.errors.nome && <p className="text-xs text-destructive">{form.formState.errors.nome.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>CPF / CNPJ</Label>
              <Input
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                value={form.watch("cpf_cnpj") ?? ""}
                onChange={(e) => form.setValue("cpf_cnpj", formatCPFCNPJ(e.target.value), { shouldValidate: true })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Contato</Label>
              <Input
                placeholder="(00) 00000-0000"
                value={form.watch("contato") ?? ""}
                onChange={(e) => form.setValue("contato", formatPhone(e.target.value), { shouldValidate: true })}
              />
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
              <div className="space-y-1.5">
                <Label>CEP</Label>
                <Input placeholder="00000-000" {...form.register("cep")} />
              </div>
              <Button type="button" variant="outline" onClick={buscarCep} disabled={buscandoCep}>
                {buscandoCep ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
                <span className="ml-1">Buscar</span>
              </Button>
            </div>
            <div className="space-y-1.5">
              <Label>Rua</Label>
              <Input {...form.register("rua")} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1.5">
                <Label>Número</Label>
                <Input {...form.register("numero")} />
              </div>
              <div className="space-y-1.5">
                <Label>Bairro</Label>
                <Input {...form.register("bairro")} />
              </div>
              <div className="space-y-1.5">
                <Label>Cidade</Label>
                <Input {...form.register("cidade")} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Complemento / Referência</Label>
              <Input {...form.register("localizacao")} />
            </div>
            <Button type="submit" className="w-full" disabled={upsert.isPending}>
              {upsert.isPending ? "Salvando..." : editId ? "Salvar alterações" : "Cadastrar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ClienteStatus({ s }: { s: string }) {
  const base = "pointer-events-none";
  if (s === "em_dia") return <Badge className={`bg-success text-success-foreground hover:bg-success ${base}`}>Em dia</Badge>;
  if (s === "atrasado") return <Badge className={`bg-destructive text-destructive-foreground hover:bg-destructive ${base}`}>Atrasado</Badge>;
  return <Badge className={`bg-warning text-warning-foreground hover:bg-warning ${base}`}>Pendente</Badge>;
}

export { dataBR };
