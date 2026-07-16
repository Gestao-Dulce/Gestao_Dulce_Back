import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Todas as rotas de IA exigem autenticação
router.use(requireAuth);

router.post("/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Mensagem é obrigatória" });
      return;
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      res.status(500).json({ error: "Chave da API do Gemini não configurada no servidor" });
      return;
    }

    // 1. Carregar dados de Clientes
    const { data: clientes } = await supabase
      .from("clientes")
      .select("nome, cpf_cnpj, contato, cidade, bairro");

    // 2. Carregar dados de Produtos
    const { data: produtos } = await supabase
      .from("produtos")
      .select("nome, unidade, valor, observacao");

    // 3. Carregar dados de Vendas (com itens)
    const { data: vendas } = await supabase
      .from("vendas")
      .select("data, valor_total, status_pagamento, forma_pagamento, nota_fiscal, clientes(nome), venda_itens(produto, quantidade, valor_unitario, unidade)");

    // 4. Carregar dados de Contas a Pagar
    const { data: contas } = await supabase
      .from("contas_a_pagar")
      .select("fornecedor, categoria, descricao, vencimento, valor, status, recorrente");

    // Formatar data atual para contexto da IA
    const dataAtual = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const contextPrompt = `
Você é o assistente inteligente da fábrica de doces **Doces Lucelian (Lucelian Sweet Flow)**.
Sua missão é ajudar o administrador respondendo perguntas de forma concisa, educada e direta baseando-se estritamente nos dados reais fornecidos abaixo.
Utilize formatação Markdown para deixar as respostas organizadas (listas, negritos e tabelas curtas são recomendados).

---
### DADOS REAIS DO SISTEMA (Atualizados em: ${dataAtual})

#### Clientes Cadastrados:
${JSON.stringify(clientes ?? [])}

#### Produtos Cadastrados:
${JSON.stringify(produtos ?? [])}

#### Histórico de Vendas Realizadas:
${JSON.stringify(vendas ?? [])}

#### Contas a Pagar (Despesas/Compromissos):
${JSON.stringify(contas ?? [])}
---

### REGRAS E DIRETRIZES:
1. Responda em Português do Brasil (pt-BR).
2. Se a informação solicitada não puder ser deduzida dos dados fornecidos, responda educadamente que não possui essa informação em sua base de dados atual.
3. Se perguntarem sobre usuários do sistema, logins, senhas ou credenciais, diga que por motivos de segurança você não tem acesso a essas informações de contas.
4. Mantenha os cálculos corretos. Se pedirem somas ou faturamentos, calcule com base nos valores numéricos dos dados fornecidos.
`;

    // Preparar as mensagens para a API do Gemini
    const contents = [];

    // Adicionar o histórico de mensagens formatado para o Gemini
    if (Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      }
    }

    // Inserir a instrução do sistema e o prompt atual na mensagem do usuário
    contents.push({
      role: "user",
      parts: [{ text: `${contextPrompt}\n\nPergunta do usuário: ${message}` }],
    });

    // Fazer a chamada HTTP REST para o Gemini
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
    
    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Erro na API do Gemini: ${errText}`);
    }

    const resJson = await response.json() as any;
    const aiText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não consegui processar a resposta.";

    res.json({ text: aiText });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
