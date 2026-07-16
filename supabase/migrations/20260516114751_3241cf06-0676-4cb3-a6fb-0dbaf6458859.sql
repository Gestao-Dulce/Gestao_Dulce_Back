
-- Enums
CREATE TYPE public.categoria_custo AS ENUM ('fixo', 'variavel');
CREATE TYPE public.forma_pagamento AS ENUM ('dinheiro', 'pix', 'cartao', 'faturado');
CREATE TYPE public.status_conta AS ENUM ('pendente', 'pago');

-- Clientes
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  contato TEXT,
  localizacao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Custos
CREATE TABLE public.custos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  descricao TEXT NOT NULL,
  categoria public.categoria_custo NOT NULL DEFAULT 'variavel',
  valor NUMERIC(12,2) NOT NULL CHECK (valor >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Vendas
CREATE TABLE public.vendas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE RESTRICT,
  produto TEXT NOT NULL,
  quantidade NUMERIC(12,2) NOT NULL CHECK (quantidade > 0),
  valor_unitario NUMERIC(12,2) NOT NULL CHECK (valor_unitario >= 0),
  valor_total NUMERIC(12,2) NOT NULL CHECK (valor_total >= 0),
  forma_pagamento public.forma_pagamento NOT NULL DEFAULT 'dinheiro',
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contas a pagar
CREATE TABLE public.contas_a_pagar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fornecedor TEXT NOT NULL,
  vencimento DATE NOT NULL,
  valor NUMERIC(12,2) NOT NULL CHECK (valor >= 0),
  status public.status_conta NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS (prototype: open access)
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contas_a_pagar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "open all" ON public.clientes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open all" ON public.custos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open all" ON public.vendas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open all" ON public.contas_a_pagar FOR ALL USING (true) WITH CHECK (true);

-- Seed data
INSERT INTO public.clientes (nome, contato, localizacao) VALUES
  ('Padaria Central', '(11) 98765-4321', 'Centro'),
  ('Mercadinho Bela Vista', '(11) 91234-5678', 'Bela Vista'),
  ('Cafeteria Aroma', '(11) 99887-6655', 'Jardins');

INSERT INTO public.custos (data, descricao, categoria, valor) VALUES
  (CURRENT_DATE, 'Ingredientes (açúcar, leite)', 'variavel', 180.50),
  (CURRENT_DATE, 'Combustível entrega', 'variavel', 75.00),
  (CURRENT_DATE - 1, 'Aluguel cozinha', 'fixo', 1200.00),
  (CURRENT_DATE - 2, 'Embalagens', 'variavel', 220.00),
  (CURRENT_DATE - 3, 'Conta de luz', 'fixo', 340.00);

INSERT INTO public.vendas (cliente_id, produto, quantidade, valor_unitario, valor_total, forma_pagamento, data)
SELECT id, 'Brigadeiro gourmet (cx 20un)', 5, 45.00, 225.00, 'pix', CURRENT_DATE FROM public.clientes WHERE nome = 'Padaria Central';
INSERT INTO public.vendas (cliente_id, produto, quantidade, valor_unitario, valor_total, forma_pagamento, data)
SELECT id, 'Bolo de pote', 12, 12.00, 144.00, 'dinheiro', CURRENT_DATE - 1 FROM public.clientes WHERE nome = 'Cafeteria Aroma';
INSERT INTO public.vendas (cliente_id, produto, quantidade, valor_unitario, valor_total, forma_pagamento, data)
SELECT id, 'Trufa sortida (kg)', 3, 80.00, 240.00, 'faturado', CURRENT_DATE - 2 FROM public.clientes WHERE nome = 'Mercadinho Bela Vista';

INSERT INTO public.contas_a_pagar (fornecedor, vencimento, valor, status) VALUES
  ('Distribuidora Doce&Cia', CURRENT_DATE + 3, 850.00, 'pendente'),
  ('Energia Elétrica', CURRENT_DATE + 8, 340.00, 'pendente'),
  ('Aluguel Cozinha', CURRENT_DATE + 12, 1200.00, 'pendente'),
  ('Internet', CURRENT_DATE - 2, 120.00, 'pendente');
