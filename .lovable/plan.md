
# Plano: Protótipo Doces Lucelian — Gestão Financeira

## Escopo
MVP navegável focado em validar usabilidade e visualização financeira. Dados persistidos via Lovable Cloud (Postgres) para que o fluxo "registrar custo → refletir no dashboard" funcione de verdade, não só visualmente.

## Stack
- React + Vite + TypeScript + Tailwind + shadcn/ui (já padrão do projeto)
- Lovable Cloud (Supabase) para persistência
- Recharts para gráficos do dashboard
- React Hook Form + Zod para validação dos formulários

## Estrutura de Telas

```
/                   Dashboard (tela principal)
/custos             Lista + formulário de custos do dia
/clientes           CRUD de clientes
/vendas             Registro de vendas + histórico
/contas-a-pagar     Agenda de compromissos
```

Layout com sidebar fixa (desktop/tablet) + topbar com data atual e saldo do mês.

## Modelo de Dados (Lovable Cloud)

- **clientes**: id, nome, contato, localizacao, created_at
- **custos**: id, data, descricao, categoria (`fixo`|`variavel`), valor, created_at
- **vendas**: id, cliente_id (fk), produto, quantidade, valor_unitario, valor_total, forma_pagamento (`dinheiro`|`pix`|`cartao`|`faturado`), data
- **contas_a_pagar**: id, fornecedor, vencimento, valor, status (`pendente`|`pago`)

RLS habilitada. Como o MVP é interno e sem login nesta fase, políticas permissivas para usuário anônimo (documentado como decisão de protótipo — autenticação fica para v2).

## Funcionalidades por Módulo

### 1. Dashboard (`/`)
- 4 cards de KPI: Faturamento (mês), Custos (mês), Saldo Estimado, Contas a vencer (15d)
- Gráfico de barras: Faturamento vs Custos últimos 7 dias
- Gráfico de linha: Contas a pagar próximas (7/15 dias)
- Ranking top 5 clientes por faturamento
- Ranking top 5 produtos mais vendidos

### 2. Custos do Dia (`/custos`)
- Formulário rápido (data padrão = hoje, descrição, categoria, valor)
- Lista do dia com total acumulado no rodapé
- Filtro por período e categoria

### 3. Clientes (`/clientes`)
- Tabela com busca
- Modal de criação/edição
- Drawer com histórico simplificado de compras ao clicar na linha

### 4. Vendas (`/vendas`)
- Combobox de cliente (com busca)
- Cálculo automático valor_total = quantidade × valor_unitario
- Lista de vendas recentes com filtros por cliente e forma de pagamento

### 5. Contas a Pagar (`/contas-a-pagar`)
- Tabela agrupada por status, ordenada por vencimento
- Toggle pendente/pago inline
- Destaque visual para vencidas e a vencer em ≤3 dias

## Design
- Paleta sóbria com acento da marca (sugestão: rosa/marrom remetendo a doces — confirmo na execução). Tons neutros para densidade de dados.
- Tipografia legível para tablets, números tabulares nos KPIs
- Componentes shadcn: Card, Table, Dialog, Form, Tabs, Badge

## Entregáveis do MVP
1. Schema do banco + seed mínimo para demo
2. 5 telas funcionais navegáveis
3. Dashboard refletindo dados reais em tempo real
4. Validação de formulários com mensagens em PT-BR

## Fora de Escopo (v2+)
- Autenticação e papéis de usuário
- Integração real com Power BI (o dashboard interno já cobre o caso)
- Emissão fiscal, estoque, conciliação bancária
- App mobile nativo

## Perguntas antes de implementar
1. Posso seguir sem login (acesso aberto no protótipo) ou já quer tela de login simples?
2. Confirma paleta sugerida (rosa/marrom suaves) ou prefere outra direção visual?
