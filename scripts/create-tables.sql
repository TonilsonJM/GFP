-- Criar tabela users_accounts para sistema customizado de login
CREATE TABLE IF NOT EXISTS public.users_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  plan TEXT DEFAULT 'FREE', -- FREE ou PRO
  status TEXT DEFAULT 'ACTIVE', -- ACTIVE ou BLOCKED
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Criar índice para email (para buscas rápidas)
CREATE INDEX IF NOT EXISTS idx_users_accounts_email ON public.users_accounts(email);

-- Criar índice para status (para filtros)
CREATE INDEX IF NOT EXISTS idx_users_accounts_status ON public.users_accounts(status);

-- Criar índice para plan (para relatórios)
CREATE INDEX IF NOT EXISTS idx_users_accounts_plan ON public.users_accounts(plan);

-- Mensagem de sucesso
-- Execute este script no SQL Editor do Supabase para criar as tabelas
