import { c as createServerRpc } from "./createServerRpc-BwC9GRDM.mjs";
import { c as createServerFn } from "./server-x9rkVVWt.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
const aiChatFn_createServerFn_handler = createServerRpc({
  id: "e345c27d5ab3a542b5dde18807afcb51d5b46f62dbc9d2e5f5819f23467ad139",
  name: "aiChatFn",
  filename: "src/components/AiAssistant.tsx"
}, (opts) => aiChatFn.__executeServer(opts));
const aiChatFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(aiChatFn_createServerFn_handler, async ({
  data: {
    message,
    history
  }
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const [clientesRes, produtosRes, vendasRes, contasRes] = await Promise.all([supabaseAdmin.from("clientes").select("nome, cpf_cnpj, contato, cidade, bairro"), supabaseAdmin.from("produtos").select("nome, unidade, valor, observacao"), supabaseAdmin.from("vendas").select("data, valor_total, status_pagamento, forma_pagamento, nota_fiscal, clientes(nome), venda_itens(produto, quantidade, valor_unitario, unidade)"), supabaseAdmin.from("contas_a_pagar").select("fornecedor, categoria, descricao, vencimento, valor, status, recorrente")]);
  const dataAtual = (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  const contextPrompt = `
Você é o assistente inteligente da fábrica de doces **Doces Lucelian (Lucelian Sweet Flow)**.
Sua missão é ajudar o administrador respondendo perguntas de forma concisa, educada e direta baseando-se estritamente nos dados reais fornecidos abaixo.
Utilize formatação Markdown para deixar as respostas organizadas (listas, negritos e tabelas curtas são recomendados).

---
### DADOS REAIS DO SISTEMA (Atualizados em: ${dataAtual})

#### Clientes Cadastrados:
${JSON.stringify(clientesRes.data ?? [])}

#### Produtos Cadastrados:
${JSON.stringify(produtosRes.data ?? [])}

#### Histórico de Vendas Realizadas:
${JSON.stringify(vendasRes.data ?? [])}

#### Contas a Pagar (Despesas/Compromissos):
${JSON.stringify(contasRes.data ?? [])}
---

### REGRAS E DIRETRIZES:
1. Responda em Português do Brasil (pt-BR).
2. Se a informação solicitada não puder ser deduzida dos dados fornecidos, responda educadamente que não possui essa informação em sua base de dados atual.
3. Se perguntarem sobre usuários do sistema, logins, senhas ou credenciais, diga que por motivos de segurança você não tem acesso a essas informações de contas.
4. Mantenha os cálculos corretos. Se pedirem somas ou faturamentos, calcule com base nos valores numéricos dos dados fornecidos.
`;
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    throw new Error("Chave da API do Gemini (GEMINI_API_KEY) não configurada no servidor.");
  }
  const contents = [];
  if (Array.isArray(history)) {
    for (const msg of history) {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{
          text: msg.content
        }]
      });
    }
  }
  contents.push({
    role: "user",
    parts: [{
      text: `${contextPrompt}

Pergunta do usuário: ${message}`
    }]
  });
  const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
  const response = await fetch(geminiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents
    })
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro na API do Gemini: ${errText}`);
  }
  const resJson = await response.json();
  const aiText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não consegui processar a resposta.";
  return {
    text: aiText
  };
});
export {
  aiChatFn_createServerFn_handler
};
