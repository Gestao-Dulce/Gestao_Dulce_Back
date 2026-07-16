
-- VENDAS: novos campos
DO $$ BEGIN
  CREATE TYPE status_pagamento AS ENUM ('pago', 'pendente', 'atrasado');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.vendas
  ADD COLUMN IF NOT EXISTS desconto numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS data_pagamento date,
  ADD COLUMN IF NOT EXISTS status_pagamento status_pagamento NOT NULL DEFAULT 'pendente';

-- Tornar produto/quantidade/valor_unitario opcionais (venda agora pode ser por carrinho)
ALTER TABLE public.vendas ALTER COLUMN produto DROP NOT NULL;
ALTER TABLE public.vendas ALTER COLUMN quantidade DROP NOT NULL;
ALTER TABLE public.vendas ALTER COLUMN valor_unitario DROP NOT NULL;

-- VENDA_ITENS: carrinho
CREATE TABLE IF NOT EXISTS public.venda_itens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venda_id uuid NOT NULL REFERENCES public.vendas(id) ON DELETE CASCADE,
  produto text NOT NULL,
  quantidade numeric NOT NULL,
  valor_unitario numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.venda_itens ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "open all" ON public.venda_itens;
CREATE POLICY "open all" ON public.venda_itens FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_venda_itens_venda ON public.venda_itens(venda_id);

-- CUSTOS: recorrente
ALTER TABLE public.custos
  ADD COLUMN IF NOT EXISTS recorrente boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS finalizado_em date;

-- CONTAS A PAGAR: categoria + funcionario + recorrencia
DO $$ BEGIN
  CREATE TYPE categoria_conta AS ENUM ('fornecedor', 'folha_pagamento', 'outros');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.contas_a_pagar
  ADD COLUMN IF NOT EXISTS categoria categoria_conta NOT NULL DEFAULT 'fornecedor',
  ADD COLUMN IF NOT EXISTS funcionario_nome text,
  ADD COLUMN IF NOT EXISTS funcionario_cargo text,
  ADD COLUMN IF NOT EXISTS funcionario_documento text,
  ADD COLUMN IF NOT EXISTS recorrente boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS grupo_recorrencia uuid,
  ADD COLUMN IF NOT EXISTS descricao text;
