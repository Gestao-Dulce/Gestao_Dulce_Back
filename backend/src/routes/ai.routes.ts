import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Todas as rotas de IA exigem autenticação
router.use(requireAuth);

const CANDIDATE_MODELS = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
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

    // 1. Carregar dados das tabelas em paralelo com tratamento de exceções
    const [clientesRes, produtosRes, vendasRes, contasRes] = await Promise.all([
      supabase.from("clientes").select("nome, cpf_cnpj, contato, cidade, bairro"),
      supabase.from("produtos").select("nome, unidade, valor, observacao"),
      supabase.from("vendas").select("data, valor_total, status_pagamento, forma_pagamento, nota_fiscal, clientes(nome), venda_itens(produto, quantidade, valor_unitario, unidade)"),
      supabase.from("contas_a_pagar").select("fornecedor, categoria, descricao, vencimento, valor, status, recorrente"),
    ]);

    const clientes = clientesRes.data ?? [];
    const produtos = produtosRes.data ?? [];
    const vendas = vendasRes.data ?? [];
    const contas = contasRes.data ?? [];

    const dataAtual = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const systemPromptText = `
Você é o assistente inteligente da fábrica de doces **Doces Lucelian (Lucelian Sweet Flow)**.
Sua missão é ajudar o administrador respondendo perguntas de forma concisa, educada e direta baseando-se estritamente nos dados reais fornecidos abaixo.
Utilize formatação Markdown para deixar as respostas organizadas (listas, negritos e tabelas curtas são recomendados).

---
### DADOS REAIS DO SISTEMA (Atualizados em: ${dataAtual})

#### Clientes Cadastrados:
${JSON.stringify(clientes)}

#### Produtos Cadastrados:
${JSON.stringify(produtos)}

#### Histórico de Vendas Realizadas:
${JSON.stringify(vendas)}

#### Contas a Pagar (Despesas/Compromissos):
${JSON.stringify(contas)}
---

### REGRAS E DIRETRIZES:
1. Responda em Português do Brasil (pt-BR).
2. Se a informação solicitada não puder ser deduzida dos dados fornecidos, responda educadamente que não possui essa informação em sua base de dados atual.
3. Se perguntarem sobre usuários do sistema, logins, senhas ou credenciais, diga que por motivos de segurança você não tem acesso a essas informações de contas.
4. Mantenha os cálculos corretos. Se pedirem somas ou faturamentos, calcule com base nos valores numéricos dos dados fornecidos.
`;

    const contents = formatGeminiContents(history, message);

    const payload = {
      system_instruction: {
        parts: [{ text: systemPromptText }],
      },
      contents,
    };

    let lastErrorText = "";
    let aiText = "";

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`;
        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const resJson = (await response.json()) as any;
          aiText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não consegui processar a resposta.";
          lastErrorText = "";
          break;
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
      if (lastErrorText.includes("NOT_FOUND") || lastErrorText.includes("404") || lastErrorText.includes("API key not valid")) {
        friendlyError = "A chave da API do Gemini informada é inválida ou não possui permissão para acessar os modelos. Verifique a GEMINI_API_KEY no seu arquivo backend/.env (obtenha uma nova chave em https://aistudio.google.com/app/apikey).";
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
