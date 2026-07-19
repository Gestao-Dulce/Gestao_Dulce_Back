-- Insumos por produto (para cálculo de custo e precificação)
CREATE TABLE public.produto_insumos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  quantidade NUMERIC(12,4) NOT NULL DEFAULT 1 CHECK (quantidade > 0),
  custo_unitario NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (custo_unitario >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.produto_insumos TO anon, authenticated;
GRANT ALL ON public.produto_insumos TO service_role;

ALTER TABLE public.produto_insumos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "open all" ON public.produto_insumos FOR ALL USING (true) WITH CHECK (true);
