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

function extractCityFromMessage(userMessage: string): string {
  const msg = userMessage.trim();
  const knownCities = [
    "Tupã", "Marília", "Presidente Prudente", "Bauru", "Araçatuba", "Assis",
    "Adamantina", "Osvaldo Cruz", "Bastos", "Lucélia", "Pompeia", "Garça",
    "Lins", "Ourinhos", "Maracaí", "Paraguaçu Paulista", "Rinópolis", "Iacri",
    "Herculândia", "Quintana", "Dracena", "São Paulo", "Campinas", "Santos",
    "Ribeirão Preto", "Sorocaba", "São José do Rio Preto"
  ];

  for (const city of knownCities) {
    const regex = new RegExp(`\\b${city}\\b`, "i");
    if (regex.test(msg)) {
      return city;
    }
  }

  const cityMatch = msg.match(/(?:em|de|na cidade de|no município de)\s+([A-ZÀ-Ú][a-zà-ú]+(?:\s+[A-ZÀ-Ú][a-zà-ú]+)*)/i);
  if (cityMatch && cityMatch[1]) {
    const candidate = cityMatch[1].trim();
    const ignoreTerms = ["supermercado", "supermercados", "padaria", "padarias", "loja", "lojas", "mercado", "mercados", "comércio", "clientes", "doces"];
    if (!ignoreTerms.includes(candidate.toLowerCase())) {
      return candidate;
    }
  }

  return "";
}

// Função auxiliar para buscar estabelecimentos e endereços reais via API oficial de Mapas
async function fetchRealPlaces(userMessage: string) {
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

    if (targetCity && !cleanQuery.toLowerCase().includes(targetCity.toLowerCase())) {
      cleanQuery = `${cleanQuery} ${targetCity}`;
    }

    const searchQuery = `${cleanQuery} ${targetCity ? "" : "SP Brasil"}`.trim();

    const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1&limit=20&countrycodes=br`;
    let res = await fetch(searchUrl, {
      headers: {
        "User-Agent": "GestaoDulceApp/1.0 (contato@doceslucelian.com.br)"
      }
    });

    if (!res.ok) return null;
    let places = await res.json();

    if (!Array.isArray(places) || places.length === 0) {
      const fallbackQuery = targetCity ? `${cleanQuery} ${targetCity} SP Brasil` : `${msg} SP Brasil`;
      const fallbackUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fallbackQuery)}&format=json&addressdetails=1&limit=20&countrycodes=br`;
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
      const cityLower = targetCity.toLowerCase();
      places = places.filter((p: any) => {
        const addr = p.address || {};
        const pCity = (addr.city || addr.town || addr.municipality || addr.village || addr.county || addr.suburb || "").toLowerCase();
        const displayName = (p.display_name || "").toLowerCase();
        return pCity.includes(cityLower) || displayName.includes(cityLower);
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
   - **FILTRAGEM RIGOROSA DE CIDADE (CRÍTICO)**: Quando o usuário solicitar estabelecimentos (supermercados, padarias, lojas, confeitarias, etc.) de uma CIDADE ESPECÍFICA (ex: Tupã, Marília, etc.), você DEVE listar E recomendar APENAS estabelecimentos que pertençam E estejam COMPROVADAMENTE localizados NESSA MESMA CIDADE solicitada.
   - JAMAIS inclua, misture ou mencione estabelecimentos de outras cidades, municípios vizinhos ou regiões diferentes da cidade solicitada (a menos que o usuário peça explicitamente por "região" ou "cidades vizinhas").
   - Se a lista de API de Mapas ou os resultados do Google Search trouxerem estabelecimentos de outras cidades, FILTRE-OS E IGNORE-OS completamente antes de responder.
   - Sempre liste os nomes dos estabelecimentos e seus respectivos endereços no corpo da resposta em formato de lista Markdown.
   - **Estrutura Obrigatória de Apresentação**:
     - **[Nome do Estabelecimento]**
       - **Endereço**: Rua/Avenida, Número (se disponível), Bairro e Cidade
       - **Link do Mapa**: [📍 Ver no Google Maps](https://www.google.com/maps/search/termo+cidade)
   - Utilize a lista de lugares reais fornecida acima quando presente. Se não estiver presente, utilize a ferramenta de busca do Google (Google Search) para obter e apresentar os estabelecimentos reais da cidade com seus respectivos endereços.
   - JAMAIS responda apenas com um link genérico sem listar os estabelecimentos antes!
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
