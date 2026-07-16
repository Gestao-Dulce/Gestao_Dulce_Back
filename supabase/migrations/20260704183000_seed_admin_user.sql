-- Garante que a tabela de usuários existe (criada via código, mas seed precisa da tabela)
-- Se a tabela ainda não existir, criamos aqui com segurança
CREATE TABLE IF NOT EXISTS public.usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'usuarios' AND policyname = 'open all'
  ) THEN
    EXECUTE 'CREATE POLICY "open all" ON public.usuarios FOR ALL USING (true) WITH CHECK (true)';
  END IF;
END $$;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.usuarios TO anon, authenticated;
GRANT ALL ON public.usuarios TO service_role;

-- Insere (ou corrige) o usuário admin padrão.
-- Hash bcrypt (custo 12) da senha: Doceslucelian$2026
-- Gerado corretamente via Node.js sem escape de $ pelo shell.
INSERT INTO public.usuarios (email, senha_hash)
VALUES (
  'admin',
  '$2b$12$cZnVUwZxem/HdnkhJJIGzuSjkThLSR6nvi3ovgQTPqfvHCb1OGq7i'
)
ON CONFLICT (email) DO UPDATE
  SET senha_hash = EXCLUDED.senha_hash;

