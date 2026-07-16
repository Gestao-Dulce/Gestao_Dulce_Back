ALTER TABLE public.clientes
  ADD COLUMN IF NOT EXISTS rua text,
  ADD COLUMN IF NOT EXISTS bairro text,
  ADD COLUMN IF NOT EXISTS cidade text,
  ADD COLUMN IF NOT EXISTS cep text;

ALTER TYPE public.forma_pagamento ADD VALUE IF NOT EXISTS 'boleto';