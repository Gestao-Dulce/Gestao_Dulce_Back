-- Convert custos.categoria from enum to text to allow custom categories
ALTER TABLE public.custos ALTER COLUMN categoria DROP DEFAULT;
ALTER TABLE public.custos ALTER COLUMN categoria TYPE text USING categoria::text;
ALTER TABLE public.custos ALTER COLUMN categoria SET DEFAULT 'variavel';

-- Table to store custom cost categories
CREATE TABLE public.custos_categorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.custos_categorias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "open all" ON public.custos_categorias FOR ALL USING (true) WITH CHECK (true);

-- Add unit column for sale items (unidade / kg / caixa)
ALTER TABLE public.venda_itens ADD COLUMN unidade text NOT NULL DEFAULT 'unidade';