import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, Settings, FileText, Truck, AlertCircle } from "lucide-react";
import { brl, dataBR } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/etiquetas")({
  component: ShippingLabelsScreen,
});

type SenderConfig = {
  nome: string;
  documento: string; // CPF ou CNPJ
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string; // Ex: SP, RJ
  cep: string;
};

const defaultSender: SenderConfig = {
  nome: "Doces Lucelian",
  documento: "12.345.678/0001-99",
  rua: "Avenida Principal",
  numero: "1500",
  bairro: "Centro",
  cidade: "São Paulo",
  estado: "SP",
  cep: "01000-000",
};

function ShippingLabelsScreen() {
  const [selectedVendaId, setSelectedVendaId] = useState<string>("");
  const [printLabel, setPrintLabel] = useState<boolean>(true);
  const [printDeclaration, setPrintDeclaration] = useState<boolean>(true);
  const [sender, setSender] = useState<SenderConfig>(defaultSender);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Carregar remetente do localStorage na inicialização
  useEffect(() => {
    const saved = localStorage.getItem("remetente_config");
    if (saved) {
      try {
        setSender(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar dados do remetente:", e);
      }
    }
  }, []);

  // Salvar remetente no localStorage
  const saveSender = (newSender: SenderConfig) => {
    setSender(newSender);
    localStorage.setItem("remetente_config", JSON.stringify(newSender));
    setIsSettingsOpen(false);
    toast.success("Dados do remetente salvos com sucesso!");
  };

  // Buscar vendas para o dropdown
  const { data: vendas = [], isLoading } = useQuery({
    queryKey: ["vendas-etiquetas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendas")
        .select("*, clientes(*), venda_itens(*)")
        .order("data", { ascending: false });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const selectedVenda = vendas.find((v) => v.id === selectedVendaId);
  const cliente = selectedVenda?.clientes;
  const itens = selectedVenda?.venda_itens || [];

  const handlePrint = () => {
    if (!selectedVendaId) {
      toast.error("Por favor, selecione uma venda antes de imprimir.");
      return;
    }
    if (!printLabel && !printDeclaration) {
      toast.error("Selecione ao menos um documento para imprimir (Etiqueta ou Declaração).");
      return;
    }
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Bloco de Controle (Ocultado ao imprimir) */}
      <div className="print:hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Etiquetas de Envio</h1>
            <p className="text-sm text-muted-foreground">
              Gere etiquetas de postagem e declarações de conteúdo integradas aos Correios.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsSettingsOpen(true)} className="gap-2">
            <Settings className="size-4" />
            Configurar Remetente
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Parâmetros de Impressão</CardTitle>
            <CardDescription>Escolha a venda e os itens de envio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Seleção de Venda */}
              <div className="space-y-2">
                <Label htmlFor="venda-select">Selecione uma Venda</Label>
                <Select value={selectedVendaId} onValueChange={setSelectedVendaId}>
                  <SelectTrigger id="venda-select" className="w-full">
                    <SelectValue placeholder="Selecione a venda..." />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>
                        Carregando vendas...
                      </SelectItem>
                    ) : vendas.length === 0 ? (
                      <SelectItem value="empty" disabled>
                        Nenhuma venda disponível
                      </SelectItem>
                    ) : (
                      vendas.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          Venda #{v.id.substring(0, 5)} - {v.clientes?.nome || "Cliente avulso"} ({dataBR(v.data)})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Opções de Documento */}
              <div id="tour-etiquetas-docs" className="flex flex-col justify-end space-y-3 pb-1">
                <span className="text-sm font-medium">Documentos para Gerar:</span>
                <div className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="opt-label"
                      checked={printLabel}
                      onCheckedChange={(checked) => setPrintLabel(!!checked)}
                    />
                    <label htmlFor="opt-label" className="text-sm font-medium leading-none cursor-pointer">
                      Etiqueta de Envio
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="opt-dec"
                      checked={printDeclaration}
                      onCheckedChange={(checked) => setPrintDeclaration(!!checked)}
                    />
                    <label htmlFor="opt-dec" className="text-sm font-medium leading-none cursor-pointer">
                      Declaração de Conteúdo
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {selectedVenda && cliente && (!cliente.cep || !cliente.rua) && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/30 rounded-md text-xs">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Dados de endereço ausentes!</span>
                  Este cliente não possui CEP ou endereço completo cadastrado. 
                  Você pode cadastrá-los na aba Clientes para que a etiqueta seja gerada corretamente.
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button id="tour-etiquetas-print" onClick={handlePrint} disabled={!selectedVendaId} className="gap-2">
                <Printer className="size-4" />
                Imprimir Documentos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Configuração de Remetente (Ocultado ao imprimir) */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Configurar Remetente</DialogTitle>
            <DialogDescription>
              Insira os dados do remetente (sua fábrica) para impressão nas etiquetas e declarações.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              saveSender({
                nome: formData.get("nome") as string,
                documento: formData.get("documento") as string,
                rua: formData.get("rua") as string,
                numero: formData.get("numero") as string,
                bairro: formData.get("bairro") as string,
                cidade: formData.get("cidade") as string,
                estado: formData.get("estado") as string,
                cep: formData.get("cep") as string,
              });
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="nome">Razão Social / Nome</Label>
                <Input id="nome" name="nome" defaultValue={sender.nome} required />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="documento">CNPJ ou CPF</Label>
                <Input id="documento" name="documento" defaultValue={sender.documento} required />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="rua">Logradouro / Rua</Label>
                <Input id="rua" name="rua" defaultValue={sender.rua} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="numero">Número</Label>
                <Input id="numero" name="numero" defaultValue={sender.numero} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bairro">Bairro</Label>
                <Input id="bairro" name="bairro" defaultValue={sender.bairro} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" name="cidade" defaultValue={sender.cidade} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="estado">UF / Estado</Label>
                <Input id="estado" name="estado" maxLength={2} placeholder="Ex: SP" defaultValue={sender.estado} required />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" name="cep" placeholder="Ex: 01000-000" defaultValue={sender.cep} required />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ÁREA DE PRÉ-VISUALIZAÇÃO / IMPRESSÃO */}
      {selectedVenda && cliente && (
        <div className="space-y-8 bg-card border rounded-lg p-6 shadow-sm print:shadow-none print:border-none print:bg-transparent print:p-0">
          <h2 className="text-sm font-semibold text-muted-foreground pb-2 border-b print:hidden">
            Pré-visualização do Documento
          </h2>

          {/* 1. ETIQUETA DE ENVIO */}
          {printLabel && (
            <div className="flex justify-center py-4 print:py-0 print:m-0 break-after-page">
              {/* Box da Etiqueta Correios */}
              <div className="w-[380px] border-2 border-black p-4 bg-white text-black font-sans text-xs flex flex-col justify-between h-[520px] shadow-sm print:shadow-none">
                {/* Cabeçalho Correios Simulado */}
                <div className="border-b border-black pb-2 flex items-center justify-between">
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <Truck className="size-4" />
                    <span>ENVELOPE/PACOTE</span>
                  </div>
                  <div className="text-[9px] border border-black px-1 font-mono uppercase font-bold">
                    DESTINATÁRIO
                  </div>
                </div>

                {/* Bloco do Destinatário */}
                <div className="flex-1 py-4 space-y-2">
                  <div>
                    <span className="font-bold uppercase tracking-wider block text-[10px] text-zinc-600">
                      Destinatário:
                    </span>
                    <span className="text-sm font-bold block">{cliente.nome}</span>
                  </div>
                  
                  <div className="space-y-0.5">
                    <span className="font-bold uppercase tracking-wider block text-[10px] text-zinc-600">
                      Endereço:
                    </span>
                    <span className="text-xs block">
                      {cliente.rua || "Endereço não cadastrado"}, {cliente.numero || "S/N"}
                    </span>
                    <span className="text-xs block">
                      {cliente.bairro || "Bairro não informado"} - {cliente.cidade || "Cidade não informada"} / SP
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="font-bold text-sm block">CEP: {cliente.cep || "00000-000"}</span>
                  </div>
                  
                  {/* Código de barras simulado Correios */}
                  <div className="pt-4 flex flex-col items-center">
                    <div className="w-full h-12 bg-black flex items-center justify-center font-mono text-[8px] text-white">
                      ||||||| | ||||| ||||||| | |||||||| ||||||||||| ||| ||
                    </div>
                    <span className="text-[9px] font-mono mt-1 font-bold">
                      *VND{selectedVenda.id.substring(0, 8).toUpperCase()}BR*
                    </span>
                  </div>
                </div>

                {/* Bloco do Remetente */}
                <div className="border-t border-dashed border-black pt-3 mt-4 text-[10px] space-y-1">
                  <div>
                    <span className="font-bold uppercase text-zinc-600">Remetente:</span>{" "}
                    <span className="font-semibold">{sender.nome}</span>
                  </div>
                  <div>
                    <span>
                      {sender.rua}, {sender.numero} - {sender.bairro}
                    </span>
                  </div>
                  <div>
                    <span>
                      {sender.cep} - {sender.cidade} / {sender.estado}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. DECLARAÇÃO DE CONTEÚDO (Padrão A4 Correios) */}
          {printDeclaration && (
            <div className="bg-white text-black p-8 border border-zinc-300 font-sans text-[11px] leading-relaxed max-w-[800px] mx-auto print:border-none print:p-0 print:m-0">
              
              {/* Título da Declaração */}
              <div className="border border-black p-3 text-center font-bold text-sm uppercase flex items-center justify-center gap-2">
                <FileText className="size-5" />
                <span>Declaração de Conteúdo</span>
              </div>

              <p className="mt-3 text-[10px] text-justify text-zinc-600">
                Instruções: Este documento deve ser fixado na parte externa da embalagem, dobrado e com o texto voltado para fora, de forma legível.
              </p>

              {/* Quadro 1: Remetente e Destinatário */}
              <div className="grid grid-cols-2 border border-black mt-3">
                {/* Remetente */}
                <div className="p-3 border-r border-black space-y-1">
                  <div className="font-bold border-b border-zinc-300 pb-1 uppercase">1. REMETENTE</div>
                  <div><span className="font-bold">Nome:</span> {sender.nome}</div>
                  <div><span className="font-bold">CPF/CNPJ:</span> {sender.documento}</div>
                  <div>
                    <span className="font-bold">Endereço:</span> {sender.rua}, {sender.numero} - {sender.bairro}
                  </div>
                  <div><span className="font-bold">Cidade/UF:</span> {sender.cidade}/{sender.estado}</div>
                  <div><span className="font-bold">CEP:</span> {sender.cep}</div>
                </div>

                {/* Destinatário */}
                <div className="p-3 space-y-1">
                  <div className="font-bold border-b border-zinc-300 pb-1 uppercase">2. DESTINATÁRIO</div>
                  <div><span className="font-bold">Nome:</span> {cliente.nome}</div>
                  <div><span className="font-bold">CPF/CNPJ:</span> {cliente.cpf_cnpj || "Não informado"}</div>
                  <div>
                    <span className="font-bold">Endereço:</span> {cliente.rua || "—"}, {cliente.numero || "—"} - {cliente.bairro || "—"}
                  </div>
                  <div><span className="font-bold">Cidade/UF:</span> {cliente.cidade || "—"}/SP</div>
                  <div><span className="font-bold">CEP:</span> {cliente.cep || "—"}</div>
                </div>
              </div>

              {/* Quadro 2: Bens Declarados */}
              <div className="border border-black mt-3">
                <div className="bg-zinc-100 p-2 font-bold uppercase border-b border-black">3. IDENTIFICAÇÃO DOS BENS</div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black bg-zinc-50 font-bold">
                      <th className="p-2 border-r border-zinc-300">Item</th>
                      <th className="p-2 border-r border-zinc-300">Descrição do Produto</th>
                      <th className="p-2 border-r border-zinc-300 text-center">Unidade</th>
                      <th className="p-2 border-r border-zinc-300 text-center">Qtd</th>
                      <th className="p-2 text-right">Val. Unitário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itens.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-zinc-500">
                          Nenhum produto cadastrado nesta venda.
                        </td>
                      </tr>
                    ) : (
                      itens.map((item, idx) => (
                        <tr key={item.id || idx} className="border-b border-zinc-300 last:border-b-0">
                          <td className="p-2 border-r border-zinc-300 text-center">{idx + 1}</td>
                          <td className="p-2 border-r border-zinc-300 font-semibold">{item.produto}</td>
                          <td className="p-2 border-r border-zinc-300 text-center uppercase">{item.unidade || "un"}</td>
                          <td className="p-2 border-r border-zinc-300 text-center">{item.quantidade}</td>
                          <td className="p-2 text-right">{brl(item.valor_unitario)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-2 border border-black p-2 bg-zinc-50 font-bold text-sm">
                <span>VALOR TOTAL DA VENDA (Com desconto):</span>
                <span>{brl(selectedVenda.valor_total)}</span>
              </div>

              {/* Termo de Declaração Correios */}
              <div className="border border-black p-3 mt-3 space-y-2">
                <div className="font-bold uppercase">4. DECLARAÇÃO</div>
                <p className="text-[9px] text-justify text-zinc-700 leading-tight">
                  Declaro que não me enquadro no conceito de contribuinte previsto no art. 4º da Lei Complementar nº 87/1996, 
                  razão pela qual realizo esta postagem de bens não comerciais, responsabilizando-me, sob as penas da lei, 
                  pela veracidade das informações prestadas nesta declaração.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6 text-center text-[10px]">
                  <div className="space-y-1">
                    <div className="border-t border-black w-4/5 mx-auto mt-4"></div>
                    <div>Assinatura do Declarante / Remetente</div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <div>São Paulo, ______ de _____________________ de 2026.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Folha de estilos CSS scoped de Impressão */}
      <style>{`
        @media print {
          /* Esconde elementos do painel web */
          .print\\:hidden, 
          aside, 
          header, 
          footer,
          button, 
          nav {
            display: none !important;
          }

          /* Remove margens e padding padrões */
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
          }

          /* Garante que o container ocupe tela cheia */
          .print\\:border-none {
            border: none !important;
          }

          .print\\:p-0 {
            padding: 0 !important;
          }

          .print\\:m-0 {
            margin: 0 !important;
          }

          /* Força as quebras de página */
          .break-after-page {
            page-break-after: always !important;
            break-after: page !important;
          }
        }
      `}</style>
    </div>
  );
}
