-- Permite senha_hash NULL para suportar o fluxo de "primeiro acesso".
-- Quando NULL, o usuário será solicitado a definir uma senha no primeiro login.
ALTER TABLE public.usuarios ALTER COLUMN senha_hash DROP NOT NULL;
