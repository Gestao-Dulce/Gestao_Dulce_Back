import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Todas as rotas de IA exigem autenticação
router.use(requireAuth);

const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
];

function formatGeminiContents(history: any[], currentMessage: string) {
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

// Função auxiliar para buscar estabelecimentos e endereços reais via API oficial de Mapas
async function fetchRealPlaces(userMessage: string) {
  try {
    const msg = userMessage.toLowerCase();
    // Detecta palavras-chave de busca comercial/lugares
    const isPlacesQuery = /supermercado|padaria|loja|confeitaria|mercado|buffet|comercio|estabelecimento|cliente|posto|posto de combustivel/i.test(msg);
    if (!isPlacesQuery) return null;

    // Tenta extrair a cidade informada ou padrões de cidade
    const cityMatch = msg.match(/(?:em|de|para|na cidade de)\s+([a-zA-záàâãéèêíóòôõúç\s]+)/i);
    const queryTerm = userMessage.trim();

    const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryTerm)}&format=json&addressdetails=1&limit=10&countrycodes=br`;
    const res = await fetch(searchUrl, {
      headers: {
        "User-Agent": "GestaoDulceApp/1.0 (contato@doceslucelian.com.br)"
      }
    });

    if (!res.ok) return null;
    const places = await res.json();
    if (!Array.isArray(places) || places.length === 0) return null;

    return places.map((p: any) => {
      const addr = p.address || {};
      const road = addr.road || addr.street || "";
      const houseNumber = addr.house_number || "";
      const suburb = addr.suburb || addr.neighbourhood || addr.city_district || "";
      const city = addr.city || addr.town || addr.municipality || "";
      const state = addr.state || "";
      const fullAddress = [road ? `${road}${houseNumber ? `, ${houseNumber}` : ""}` : "", suburb, city, state].filter(Boolean).join(" - ");

      return {
        nome_oficial: p.display_name?.split(",")[0] || p.name || "Estabelecimento Local",
        categoria: p.type || p.class || "Comércio",
        endereco_completo: fullAddress || p.display_name,
        cidade: city,
        latitude: p.lat,
        longitude: p.lon,
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.display_name)}`
      };
    });
  } catch (err) {
    console.warn("[fetchRealPlaces] Erro ao consultar API de mapas:", err);
    return null;
  }
}

router.post("/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string" || !message.trim()) {
      res.status(400).json({ error: "Mensagem é obrigatória" });
      return;
    }

    const geminiKey = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "").trim();
    if (!geminiKey) {
      res.status(400).json({
        error: "Chave da API do Gemini (GEMINI_API_KEY) não configurada. Insira sua chave obtida gratuitamente no Google AI Studio (https://aistudio.google.com/app/apikey) no arquivo backend/.env."
      });
      return;
    }

    // 1. Carregar dados das tabelas, fontes externas e busca de locais em paralelo com resiliência
    const [clientesRes, produtosRes, vendasRes, contasRes, cotacoesRes, customExternalRes, lugaresReaisRes] = await Promise.allSettled([
      supabase.from("clientes").select("nome, cpf_cnpj, contato, cidade, bairro"),
      supabase.from("produtos").select("nome, unidade, valor, observacao"),
      supabase.from("vendas").select("data, valor_total, status_pagamento, forma_pagamento, nota_fiscal, clientes(nome), venda_itens(produto, quantidade, valor_unitario, unidade)"),
      supabase.from("contas_a_pagar").select("fornecedor, categoria, descricao, vencimento, valor, status, recorrente"),
      fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL").then((r) => (r.ok ? r.json() : null)).catch(() => null),
      process.env.EXTERNAL_DATA_API_URL
        ? fetch(process.env.EXTERNAL_DATA_API_URL).then((r) => (r.ok ? r.json() : null)).catch(() => null)
        : Promise.resolve(null),
      fetchRealPlaces(message),
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

    const systemPromptText = `
Você é o assistente inteligente da fábrica de doces **Doces Lucelian** — Sistema **Gestão Dulce**.
Sua missão é ajudar o administrador respondendo perguntas de forma concisa, educada e direta baseando-se tanto nos dados do sistema interno quanto em fontes externas.
Utilize formatação Markdown para deixar as respostas organizadas (listas, negritos e tabelas curtas são recomendados).

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
${lugaresReais ? `- ESTABELECIMENTOS E ENDEREÇOS REAIS ENCONTRADOS VIA API DE MAPAS: ${JSON.stringify(lugaresReais)}` : ""}
---

### REGRAS E DIRETRIZES:
1. Responda em Português do Brasil (pt-BR) de forma amigável, clara e objetiva.
2. **Perguntas Genéricas & Conhecimento de Mercado**:
   - Responda a qualquer pergunta sobre receitas, mercado de doces, culinária e curiosidades.
3. **Busca de Estabelecimentos e Potenciais Clientes em Cidades**:
   - **FONTE ÚNICA E OFICIAL DE LUGARES**: Apresente estritamente a lista de "ESTABELECIMENTOS E ENDEREÇOS REAIS ENCONTRADOS VIA API DE MAPAS" acima ou os clientes cadastrados no sistema.
   - **NUNCA INVENTE OU SUPONHA** nomes de estabelecimentos ou endereços que não constem na lista acima.
   - Para cada estabelecimento real encontrado, exiba:
     - **Nome Oficial**
     - **Endereço Completo / Bairro**
     - **Link do Google Maps**: [📍 Ver no Google Maps](URL) utilizando a URL retornada nos dados.
   - Se a lista de lugares reais estiver vazia ou indisponível, informe educadamente que não encontrou estabelecimentos no mapa para o termo e forneça o link direto de pesquisa do Google Maps.
`;

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
          console.warn(`[AI Route] Erro no modelo ${modelName} (${response.status}): ${errText}`);
          lastErrorText = errText;

          if (response.status === 401 || response.status === 403) {
            break;
          }
        }
      } catch (err: any) {
        console.warn(`[AI Route] Exceção ao chamar modelo ${modelName}:`, err.message);
        lastErrorText = err.message;
      }
    }

    if (!aiText) {
      let friendlyError = "Falha na comunicação com a API do Gemini.";
      if (lastErrorText.includes("API_KEY_INVALID") || lastErrorText.includes("API key not valid")) {
        friendlyError = "A chave da API do Gemini informada é inválida ou não possui permissão. Verifique a GEMINI_API_KEY no seu arquivo backend/.env (obtenha em https://aistudio.google.com/app/apikey).";
      } else if (lastErrorText.includes("429") || lastErrorText.includes("RESOURCE_EXHAUSTED") || lastErrorText.includes("Quota exceeded")) {
        friendlyError = "O limite temporário de requisições por minuto da versão gratuita do Gemini foi atingido. Por favor, aguarde alguns segundos e tente novamente.";
      } else if (lastErrorText) {
        friendlyError = `Erro da API do Gemini: ${lastErrorText}`;
      }
      res.status(400).json({ error: friendlyError });
      return;
    }

    res.json({ text: aiText });
  } catch (err: any) {
    console.error("[AI Route Error]", err);
    res.status(500).json({ error: err.message || "Erro interno ao processar chat de IA." });
  }
});

export default router;
