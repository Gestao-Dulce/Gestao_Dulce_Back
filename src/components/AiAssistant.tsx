import { useState, useRef, useEffect } from "react";
import { Cookie, X, Send, Mic, MicOff, User, Loader2, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createServerFn } from "@tanstack/react-start";
import { apiAI } from "@/lib/api";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
];



function formatGeminiContents(history: ChatMessage[], currentMessage: string) {
  const rawTurns: Array<{ role: "user" | "model"; text: string }> = [];

  if (Array.isArray(history)) {
    for (const msg of history) {
      if (!msg || typeof msg.content !== "string" || !msg.content.trim()) continue;
      const role = msg.role === "user" ? "user" : "model";
      rawTurns.push({ role, text: msg.content.trim() });
    }
  }

  rawTurns.push({ role: "user", text: currentMessage.trim() });

  const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

  for (const turn of rawTurns) {
    if (contents.length === 0) {
      contents.push({ role: turn.role, parts: [{ text: turn.text }] });
    } else {
      const last = contents[contents.length - 1];
      if (last.role === turn.role) {
        last.parts[0].text += `\n${turn.text}`;
      } else {
        contents.push({ role: turn.role, parts: [{ text: turn.text }] });
      }
    }
  }

  if (contents.length > 0 && contents[0].role !== "user") {
    contents.shift();
  }

  return contents;
}

function extractGeminiText(resJson: any): string {
  const candidate = resJson?.candidates?.[0];
  if (!candidate) return "";

  const parts = candidate?.content?.parts;
  if (Array.isArray(parts) && parts.length > 0) {
    const textParts = parts
      .map((p: any) => (typeof p === "string" ? p : p?.text))
      .filter((t: any) => typeof t === "string" && t.trim().length > 0);

    if (textParts.length > 0) {
      let text = textParts.join("\n\n");

      // Se houver grounding metadata (resultados do Google Search), adiciona disclaimer de fonte
      const groundingMeta = resJson?.candidates?.[0]?.groundingMetadata;
      const searchQueries = groundingMeta?.webSearchQueries;
      if (searchQueries && searchQueries.length > 0) {
        text += `\n\n---\n🔍 *Busca realizada via Google: ${searchQueries.join(", ")}*`;
      }

      return text;
    }
  }

  if (candidate?.finishReason === "SAFETY") {
    return "A resposta foi retida pelas diretrizes de conteúdo da API.";
  }

  return "";
}

function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const KNOWN_CITIES = [
  "Tupã", "Marília", "Presidente Prudente", "Bauru", "Araçatuba", "Assis",
  "Adamantina", "Osvaldo Cruz", "Bastos", "Lucélia", "Pompeia", "Garça",
  "Lins", "Ourinhos", "Maracaí", "Paraguaçu Paulista", "Rinópolis", "Iacri",
  "Herculândia", "Quintana", "Dracena", "São Paulo", "Campinas", "Santos",
  "Ribeirão Preto", "Sorocaba", "São José do Rio Preto", "Presidente Epitácio",
  "Presidente Venceslau", "Jaú", "Botucatu", "Araraquara", "São Carlos"
];

function extractCityFromMessage(userMessage: string): string {
  const normMsg = normalizeText(userMessage);

  for (const city of KNOWN_CITIES) {
    const normCity = normalizeText(city);
    const regex = new RegExp(`\\b${normCity}\\b`, "i");
    if (regex.test(normMsg)) {
      return city;
    }
  }

  const cityMatch = userMessage.match(/(?:em|de|na cidade de|no município de|para)\s+([a-zA-Zà-úÀ-Ú]+(?:\s+[a-zA-Zà-úÀ-Ú]+)*)/i);
  if (cityMatch && cityMatch[1]) {
    const candidate = cityMatch[1].trim();
    const ignoreTerms = ["supermercado", "supermercados", "padaria", "padarias", "loja", "lojas", "mercado", "mercados", "comércio", "clientes", "doces", "produtos", "vendas", "região", "cidades"];
    if (!ignoreTerms.includes(normalizeText(candidate))) {
      return candidate;
    }
  }

  return "";
}

function filterResponseByCity(text: string, targetCity: string): string {
  if (!targetCity || !text) return text;

  const normTarget = normalizeText(targetCity);
  const otherCities = KNOWN_CITIES.filter((c) => normalizeText(c) !== normTarget);

  const blocks = text.split(/(?=\n(?:-|\*|\d+\.)\s)/);

  const filteredBlocks = blocks.filter((block) => {
    const normBlock = normalizeText(block);

    if (!normBlock.includes("-") && !normBlock.includes("*") && !/^\d+\./.test(block.trim())) {
      return true;
    }

    const mentionedOtherCity = otherCities.find((otherCity) => {
      const normOther = normalizeText(otherCity);
      const regex = new RegExp(`\\b${normOther}\\b`, "i");
      return regex.test(normBlock);
    });

    if (mentionedOtherCity) {
      if (!normBlock.includes(normTarget)) {
        return false;
      }

      const hasOtherCityInAddress =
        new RegExp(`(?:endereço|cidade|bairro|localizado|em)\\s*:[^\\n]*\\b${normalizeText(mentionedOtherCity)}\\b`, "i").test(normBlock) ||
        new RegExp(`-\\s*\\b${normalizeText(mentionedOtherCity)}\\b\\s*-\\s*sp`, "i").test(normBlock);

      if (hasOtherCityInAddress) {
        return false;
      }
    }

    return true;
  });

  return filteredBlocks.join("");
}

async function fetchRealPlacesFrontend(userMessage: string) {
  try {
    const msg = userMessage.trim();
    const isPlacesQuery = /supermercado|padaria|loja|confeitaria|mercado|buffet|comercio|estabelecimento|cliente|posto|açougue|distribuidora|tupã|marília|Presidente prudente|bauru|araçatuba|cidade/i.test(msg);
    if (!isPlacesQuery) return null;

    const targetCity = extractCityFromMessage(msg);

    // Limpa a mensagem para termos de busca focados
    let cleanQuery = msg
      .replace(/quais|onde|tem|são|os|as|me|mostre|lista|de|em|na|no|cidade|município|encontre|estabelecimentos|locais/gi, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (targetCity && !normalizeText(cleanQuery).includes(normalizeText(targetCity))) {
      cleanQuery = `${cleanQuery} ${targetCity}`;
    }

    const searchQuery = `${cleanQuery} ${targetCity ? "" : "SP Brasil"}`.trim();

    const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1&limit=25&countrycodes=br`;
    let res = await fetch(searchUrl, {
      headers: {
        "User-Agent": "GestaoDulceApp/1.0 (contato@doceslucelian.com.br)"
      }
    });

    if (!res.ok) return null;
    let places = await res.json();

    if (!Array.isArray(places) || places.length === 0) {
      const fallbackQuery = targetCity ? `${cleanQuery} ${targetCity} SP Brasil` : `${msg} SP Brasil`;
      const fallbackUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fallbackQuery)}&format=json&addressdetails=1&limit=25&countrycodes=br`;
      const fbRes = await fetch(fallbackUrl, {
        headers: { "User-Agent": "GestaoDulceApp/1.0 (contato@doceslucelian.com.br)" }
      });
      if (fbRes.ok) {
        places = await fbRes.json();
      }
    }

    if (!Array.isArray(places) || places.length === 0) return null;

    // Filtra estritamente por cidade se uma cidade alvo tiver sido identificada
    if (targetCity) {
      const normTarget = normalizeText(targetCity);
      places = places.filter((p: any) => {
        const addr = p.address || {};
        const pCity = normalizeText(addr.city || addr.town || addr.municipality || addr.village || addr.county || "");
        const displayName = normalizeText(p.display_name || "");
        const fullAddr = normalizeText(Object.values(addr).join(" "));
        return pCity.includes(normTarget) || displayName.includes(normTarget) || fullAddr.includes(normTarget);
      });
    }

    if (places.length === 0) return null;

    return places.map((p: any) => {
      const addr = p.address || {};
      const name = p.name || p.display_name?.split(",")[0] || "Estabelecimento Comercial";
      const road = addr.road || addr.street || addr.pedestrian || "";
      const houseNumber = addr.house_number || "";
      const suburb = addr.suburb || addr.neighbourhood || addr.city_district || "";
      const city = addr.city || addr.town || addr.municipality || addr.village || targetCity || "";
      const state = addr.state || "";

      const fullAddress = [
        road ? `${road}${houseNumber ? `, ${houseNumber}` : ""}` : "",
        suburb ? `Bairro: ${suburb}` : "",
        city,
        state
      ].filter(Boolean).join(" - ");

      return {
        nome_oficial: name,
        tipo_comercio: p.type || p.class || "Comércio",
        endereco_completo: fullAddress || p.display_name,
        cidade: city,
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " " + (fullAddress || city))}`
      };
    });
  } catch {
    return null;
  }
}

// ─── Server Function: Processar chat com Gemini e dados do Supabase ──────────
export const aiChatFn = createServerFn({ method: "POST" })
  .validator((d: { message: string; history: ChatMessage[] }) => d)
  .handler(async ({ data: { message, history } }) => {
    // Importa o cliente administrativo do Supabase no lado do servidor
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 1. Carregar dados das tabelas e fontes externas em paralelo com resiliência
    const [clientesRes, produtosRes, vendasRes, contasRes, cotacoesRes, customExternalRes, lugaresReaisRes] = await Promise.allSettled([
      supabaseAdmin.from("clientes").select("nome, cpf_cnpj, contato, cidade, bairro"),
      supabaseAdmin.from("produtos").select("nome, unidade, valor, observacao"),
      supabaseAdmin.from("vendas").select("data, valor_total, status_pagamento, forma_pagamento, nota_fiscal, clientes(nome), venda_itens(produto, quantidade, valor_unitario, unidade)"),
      supabaseAdmin.from("contas_a_pagar").select("fornecedor, categoria, descricao, vencimento, valor, status, recorrente"),
      fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL").then((r) => (r.ok ? r.json() : null)).catch(() => null),
      process.env.EXTERNAL_DATA_API_URL
        ? fetch(process.env.EXTERNAL_DATA_API_URL).then((r) => (r.ok ? r.json() : null)).catch(() => null)
        : Promise.resolve(null),
      fetchRealPlacesFrontend(message),
    ]);

    const clientes = clientesRes.status === "fulfilled" && clientesRes.value.data ? clientesRes.value.data : [];
    const produtos = produtosRes.status === "fulfilled" && produtosRes.value.data ? produtosRes.value.data : [];
    const vendas = vendasRes.status === "fulfilled" && vendasRes.value.data ? vendasRes.value.data : [];
    const contas = contasRes.status === "fulfilled" && contasRes.value.data ? contasRes.value.data : [];
    const cotacoes = cotacoesRes.status === "fulfilled" ? cotacoesRes.value : null;
    const dadosExternos = customExternalRes.status === "fulfilled" ? customExternalRes.value : null;
    const lugaresReais = lugaresReaisRes.status === "fulfilled" ? lugaresReaisRes.value : null;

    const dataAtual = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const targetCity = extractCityFromMessage(message);

    const cityConstraintNotice = targetCity
      ? `\n\nATENÇÃO - FILTRO DE CIDADE PARA: "${targetCity.toUpperCase()}"\n` +
        `O usuário solicitou informações sobre a cidade de ${targetCity}.\n`
      : "";

    // Apenas intercepta com o link do Google Maps se for busca de ESTABELECIMENTOS/LOCAIS FÍSICOS e NÃO for pesquisa de preços/produtos
    const isPriceOrProductQuery = /preço|preco|preços|precos|quanto custa|valor|comparar|comparação|marca|marcas|peso|gramas|kg|quilo|embalagem|produtos|ingredientes|matéria-prima|materia prima|fornecedor|fornecedores/i.test(message);

    const hasSearchVerb = /onde|quais|encontrar|encontre|buscar|busca|mostrar|listar|lista|opções|opcoes|indicação|indicacao|indicações|indicacoes/i.test(message);
    const hasPlaceCategory = /supermercados?|padarias?|confeitariais?|lojas?|mercados?|buffets?|comércios?|comercios?|estabelecimentos?|postos?|açougues?|distribuidoras?|lanchonetes?|restaurantes?/i.test(message);

    // Precisa ter explicitamente a intenção de buscar locais + (categoria de comércio OU menção de cidade) E NÃO ser busca de preços
    const isExplicitPlacesSearch = !isPriceOrProductQuery && ((hasSearchVerb && (hasPlaceCategory || Boolean(targetCity))) || (Boolean(targetCity) && hasPlaceCategory));

    if (isExplicitPlacesSearch) {
      // Identifica a categoria/termo principal da busca
      const categoryMatch = message.match(/(supermercados?|padarias?|confeitariais?|lojas?|mercados?|buffets?|comércios?|comercios?|estabelecimentos?|postos?|açougues?|distribuidoras?|lanchonetes?|restaurantes?)/i);
      const category = categoryMatch ? categoryMatch[1].toLowerCase() : "estabelecimentos comerciais";
      
      const cityText = targetCity || "Tupã";
      const searchQuery = `${category} em ${cityText} SP`;
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;

      const responseText = `Aqui está o link oficial do Google Maps para visualizar os **${category}** em **${cityText}**:\n\n` +
        `📍 [Ver no Google Maps](${mapsUrl})\n\n` +
        `**Indicações úteis no Google Maps:**\n` +
        `- Clique no link acima para abrir a busca exata no aplicativo ou navegador.\n` +
        `- Ative o filtro **"Aberto agora"** para ver apenas os locais em funcionamento no momento.\n` +
        `- Consulte avaliações, fotos, telefones de contato e rotas direto no mapa.`;

      return { text: responseText };
    }

    const systemPromptText = `
Você é o assistente inteligente da fábrica de doces **Doces Lucelian** — Sistema **Gestão Dulce**.
Sua missão é ajudar o administrador respondendo perguntas de forma concisa, educada e direta baseando-se nos dados do sistema interno e em fontes externas na internet.
Utilize formatação Markdown para deixar as respostas organizadas (listas, negritos e links).
${cityConstraintNotice}
---
### DADOS REAIS DO SISTEMA INTERNO (Atualizados em: ${dataAtual})

#### Clientes Cadastrados:
${JSON.stringify(clientes)}

#### Produtos Cadastrados:
${JSON.stringify(produtos)}

#### Histórico de Vendas Realizadas:
${JSON.stringify(vendas)}

#### Contas a Pagar (Despesas/Compromissos):
${JSON.stringify(contas)}

---
### DADOS E COTAÇÕES EXTERNAS EM TEMPO REAL:
- Cotações Financeiras de Moedas: ${JSON.stringify(cotacoes ?? "Indisponível no momento")}
${dadosExternos ? `- Integração de API Externa Customizada: ${JSON.stringify(dadosExternos)}` : ""}
---

### REGRAS E DIRETRIZES:
1. Responda em Português do Brasil (pt-BR) de forma amigável, clara e objetiva.
2. **Perguntas Genéricas & Conhecimento de Mercado**:
   - Responda a qualquer pergunta sobre receitas, mercado de doces, culinária e curiosidades.
3. **Pesquisa e Comparação de Preços / Produtos na Internet**:
   - Quando o usuário solicitar **preços, marcas, peso/gramatura, embalagens, comparação de valores ou análise de concorrência/ingredientes**:
     - **Forneça detalhes completos de produtos vendidos no mercado e na internet**: apresente tabelas/listas com **Nome do Produto, Marca, Peso/Quantidade, Faixa de Preço Média e Onde Encontrar/Sites de Referência**.
     - Utilize a busca em tempo real para trazer informações exatas e atualizadas do mercado de doces e confeitaria.
4. **Solicitações de Estabelecimentos Comercial por Cidade**:
   - Quando o usuário solicitar apenas onde ficam estabelecimentos físicos numa cidade, forneça o link direto de pesquisa do Google Maps conforme orientações.
${cityConstraintNotice}`;

    const geminiKey = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "").trim();
    if (!geminiKey) {
      throw new Error("Chave da API do Gemini (GEMINI_API_KEY) não configurada. Insira sua chave obtida no Google AI Studio (https://aistudio.google.com/app/apikey) no arquivo backend/.env.");
    }

    const contents = formatGeminiContents(history, message);

    const payload = {
      system_instruction: {
        parts: [{ text: systemPromptText }],
      },
      contents,
      tools: [{ googleSearch: {} }],
    };

    let lastErrorText = "";
    let aiText = "";

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`;
        let response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        // Se falhar (ex: 429 por cota de busca ou incompatibilidade de ferramentas), tenta sem a propriedade tools
        if (!response.ok && payload.tools && response.status !== 401 && response.status !== 403) {
          const payloadNoTools = { ...payload };
          delete (payloadNoTools as any).tools;
          response = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadNoTools),
          });
        }

        if (response.ok) {
          const resJson = (await response.json()) as any;
          const extractedText = extractGeminiText(resJson);
          if (extractedText) {
            aiText = extractedText;
            lastErrorText = "";
            break;
          }
        } else {
          const errText = await response.text();
          console.warn(`[AiAssistant serverFn] Erro no modelo ${modelName} (${response.status}): ${errText}`);
          lastErrorText = errText;

          if (response.status === 401 || response.status === 403) {
            break;
          }
        }
      } catch (err: any) {
        console.warn(`[AiAssistant serverFn] Exceção ao chamar ${modelName}:`, err.message);
        lastErrorText = err.message;
      }
    }

    if (!aiText) {
      let friendlyError = "Falha na comunicação com a API do Gemini.";
      if (lastErrorText.includes("API_KEY_INVALID") || lastErrorText.includes("API key not valid")) {
        friendlyError = "A chave da API do Gemini informada é inválida ou não possui permissão. Verifique a GEMINI_API_KEY no arquivo backend/.env (obtenha em https://aistudio.google.com/app/apikey).";
      } else if (lastErrorText.includes("429") || lastErrorText.includes("RESOURCE_EXHAUSTED") || lastErrorText.includes("Quota exceeded")) {
        friendlyError = "O limite temporário de requisições por minuto da versão gratuita do Gemini foi atingido. Por favor, aguarde alguns segundos e tente novamente.";
      } else if (lastErrorText) {
        friendlyError = `Erro da API do Gemini: ${lastErrorText}`;
      }
      throw new Error(friendlyError);
    }

    const filteredAiText = filterResponseByCity(aiText, targetCity);

    return { text: filteredAiText };
  });

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  // Setup Web Speech API for voice recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = "pt-BR";
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsRecording(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
        }
      };

      rec.onerror = (event: any) => {
        console.error("Erro no reconhecimento de voz:", event.error);
        if (event.error !== "no-speech") {
          toast.error("Erro ao reconhecer a voz. Tente novamente.");
        }
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Reconhecimento de voz não suportado neste navegador.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setInput("");
      recognitionRef.current.start();
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Stop recording if active
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const newMessages = [...messages, { role: "user", content: userMessage } as ChatMessage];
    setMessages(newMessages);
    setLoading(true);

    try {
      let responseText = "";
      try {
        // Tenta enviar via backend Express centralizado primeiro
        const res = await apiAI.chat(userMessage, messages);
        responseText = res.text;
      } catch (apiErr) {
        console.warn("Express backend AI endpoint indisponível ou falhou, usando serverFn fallback:", apiErr);
        const res = await aiChatFn({ data: { message: userMessage, history: messages } });
        responseText = res.text;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: responseText }]);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao obter resposta do assistente.");
    } finally {
      setLoading(false);
    }
  };

  // Simple Markdown formatter for rendering AI bold, links and lists
  const formatText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      let formatted = line;

      // Handle Bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      formatted = formatted.replace(boldRegex, "<strong>$1</strong>");

      // Handle Links [text](url)
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      formatted = formatted.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary font-medium underline hover:opacity-80 inline-flex items-center gap-1">$1 ↗</a>');

      // Handle Bullet points starting with - or *
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const content = line.trim().substring(2);
        const formattedContent = content
          .replace(boldRegex, "<strong>$1</strong>")
          .replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary font-medium underline hover:opacity-80 inline-flex items-center gap-1">$1 ↗</a>');
        return (
          <li
            key={idx}
            className="ml-4 list-disc"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        );
      }

      return (
        <p
          key={idx}
          className="mb-1 leading-relaxed text-sm"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {open && (
        <Card
          className={cn(
            "mb-4 flex flex-col shadow-2xl border-primary/20 animate-in fade-in slide-in-from-bottom-6 transition-all duration-300",
            isExpanded
              ? "w-[calc(100vw-3rem)] sm:w-[700px] md:w-[850px] h-[calc(100vh-6rem)] max-h-[800px]"
              : "w-[360px] sm:w-[420px] h-[500px]"
          )}
        >
          <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-white p-0.5 border-2 border-amber-300/60 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                <img src="/lulu-avatar.png" alt="Lulu" className="size-full object-cover scale-110" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">Lulu — Assistente de Doces</CardTitle>
                <span className="text-[10px] opacity-80 block">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 size-8"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Restaurar tamanho" : "Expandir janela"}
              >
                {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 size-8"
                onClick={() => setOpen(false)}
                title="Fechar chat"
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
            {messages.length === 0 && (
              <div className="text-center py-8 space-y-2">
                <div className="size-20 mx-auto rounded-full bg-white p-1 shadow-lg border-2 border-primary/40 flex items-center justify-center animate-bounce overflow-hidden">
                  <img src="/lulu-avatar.png" alt="Lulu" className="size-full object-cover scale-110" />
                </div>
                <p className="text-xs font-semibold text-foreground">Olá! Sou a Lulu, assistente da Doces Lucelian.</p>
                <p className="text-[11px] text-muted-foreground max-w-[80%] mx-auto">
                  Pergunte-me qualquer coisa sobre vendas, produtos cadastrados, contas a pagar e clientes!
                </p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "size-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs overflow-hidden shadow-sm",
                    msg.role === "user" ? "bg-primary" : "bg-white border border-primary/20 p-0.5"
                  )}
                >
                  {msg.role === "user" ? (
                    <User className="size-4" />
                  ) : (
                    <img src="/lulu-avatar.png" alt="Lulu" className="size-full object-cover scale-110" />
                  )}
                </div>
                <div
                  className={cn(
                    "p-3 rounded-lg text-sm shadow-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-card text-foreground rounded-tl-none border border-border"
                  )}
                >
                  {formatText(msg.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 mr-auto max-w-[85%] items-center">
                <div className="size-8 rounded-full flex items-center justify-center shrink-0 bg-white border border-primary/20 p-0.5 shadow-sm overflow-hidden">
                  <img src="/lulu-avatar.png" alt="Lulu" className="size-full object-cover scale-110 animate-pulse" />
                </div>
                <div className="bg-card text-foreground p-3 rounded-lg border border-border rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground animate-pulse">Pesquisando dados...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="p-3 border-t bg-card rounded-b-lg">
            <form onSubmit={handleSend} className="flex gap-1.5 w-full items-center">
              <Input
                placeholder="Pergunte sobre faturamento, vendas..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 h-9"
              />
              
              {/* Voice recognition button */}
              <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={toggleRecording}
                disabled={loading}
                className={cn("size-9 shrink-0", isRecording && "animate-pulse")}
                title={isRecording ? "Parar gravação" : "Digitar por voz"}
              >
                {isRecording ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </Button>

              <Button type="submit" size="icon" disabled={!input.trim() || loading} className="size-9 shrink-0">
                <Send className="size-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Floating Action Button */}
      <Button
        id="tour-ai-chat"
        size="icon"
        className={cn(
          "size-16 rounded-full shadow-2xl cursor-pointer transition-transform hover:scale-105 duration-300 p-0 overflow-hidden",
          open ? "bg-zinc-600 hover:bg-zinc-700" : "bg-white hover:bg-zinc-100 border-2 border-primary"
        )}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X className="size-7 text-white" />
        ) : (
          <img src="/lulu-avatar.png" alt="Lulu" className="size-full object-cover scale-110" />
        )}
      </Button>
    </div>
  );
}
