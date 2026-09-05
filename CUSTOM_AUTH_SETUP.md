# Sistema de Login Customizado - Setup

## Visão Geral
Sistema de autenticação simplificado usando banco de dados Supabase sem Supabase Auth.

## O que foi criado?

### 1. Tabela no Supabase
- **Arquivo**: `scripts/create-tables.sql`
- **Tabela**: `users_accounts`
- Execute o SQL no Supabase Dashboard → SQL Editor

```sql
CREATE TABLE IF NOT EXISTS public.users_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  plan TEXT DEFAULT 'FREE',
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 2. Libraries Instaladas
```bash
npm install bcryptjs jsonwebtoken
```

- **bcryptjs**: Hash seguro de senhas
- **jsonwebtoken**: Criação e verificação de JWT tokens

### 3. Arquivos Criados

#### Lib de Autenticação (`lib/auth.ts`)
- `hashPassword()`: Hash de senha com bcrypt
- `verifyPassword()`: Verificação de senha
- `createToken()`: Criação de JWT
- `verifyToken()`: Verificação de JWT
- `setAuthCookie()`: Salva token em cookie seguro
- `getAuthCookie()`: Obtém token do cookie
- `clearAuthCookie()`: Limpa autenticação
- `getAuthUser()`: Obtém usuário do token

#### APIs (`app/api/auth/`)

**POST /api/auth/register**
- Recebe: `name`, `email`, `password`
- Valida email e força da senha
- Hash da senha com bcrypt
- Insere em `users_accounts` com `plan='FREE'`
- Retorna token e usuário

**POST /api/auth/login**
- Recebe: `email`, `password`
- Busca usuário e verifica senha
- Verifica status (ACTIVE/BLOCKED)
- Retorna token e usuário

**POST /api/auth/logout**
- Limpa cookie de autenticação
- Redireciona para login

#### Páginas (`app/auth/`)

**`app/auth/register/page.tsx`** (atualizado)
- Chamada para `/api/auth/register`
- Salva token em cookie
- Redireciona para `/dashboard`

**`app/auth/login/page.tsx`** (atualizado)
- Chamada para `/api/auth/login`
- Salva token em cookie
- Redireciona para `/dashboard`

#### Middleware (`middleware.ts`)
- Protege rotas (requer autenticação)
- Rotas públicas: `/`, `/auth/login`, `/auth/register`, `/auth/forgot-password`
- Valida token antes de acessar `/dashboard`
- Redireciona para `/auth/login` se inválido

## Setup Passo a Passo

### 1. Criar Tabela no Supabase
1. Vá para https://app.supabase.com
2. Selecione seu projeto
3. Abra SQL Editor
4. Cole o conteúdo de `scripts/create-tables.sql`
5. Clique "Run" ▶

### 2. Configurar Variáveis de Ambiente
Seu `.env.local` já tem:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
JWT_SECRET=...
```

**IMPORTANTE**: Em produção, mude a `JWT_SECRET` para algo seguro:
```bash
openssl rand -base64 32
```

### 3. Testar Localmente
```bash
npm run dev
```

Visite:
- http://localhost:3000/auth/register → Criar conta
- http://localhost:3000/auth/login → Fazer login
- http://localhost:3000/dashboard → Acessar protegido

## Fluxo de Autenticação

### Registro
```
1. Usuário preenche formulário
2. POST /api/auth/register
3. Hash de senha com bcrypt
4. INSERT em users_accounts (plan=FREE)
5. JWT criado
6. Cookie salvo (httpOnly, secure)
7. Redirect /dashboard
```

### Login
```
1. Usuário preenche email/senha
2. POST /api/auth/login
3. Busca usuario por email
4. Verifica hash de senha
5. Verifica status (ACTIVE/BLOCKED)
6. JWT criado
7. Cookie salvo
8. Redirect /dashboard
```

### Proteção de Rotas
```
1. Middleware intercepta requisição
2. Verifica token no cookie
3. Se válido: deixa passar
4. Se inválido/expirado: redireciona para /login
```

## Planos (FREE/PRO)

Na tabela `users_accounts`:
- `plan='FREE'` → Plano gratuito (padrão para novos usuários)
- `plan='PRO'` → Plano premium

Para admin aprovar upgrade:
```sql
UPDATE users_accounts SET plan='PRO' WHERE id='user-id-here';
```

## Status (ACTIVE/BLOCKED)

- `status='ACTIVE'` → Usuário pode fazer login
- `status='BLOCKED'` → Usuário não pode fazer login

Exemplo bloquear:
```sql
UPDATE users_accounts SET status='BLOCKED' WHERE id='user-id-here';
```

## Segurança

✅ **Implementado**:
- Hash de senha com bcrypt (10 rounds)
- JWT tokens com expiração (7 dias)
- Cookies httpOnly (proteção XSS)
- Cookies secure (HTTPS em produção)
- Validação de email/senha
- Proteção de rotas com middleware
- Índices no banco para performance

⚠️ **Melhorias Futuras**:
- Rate limiting em APIs de auth
- Verificação de email (confirmação)
- Two-factor authentication (2FA)
- Refresh tokens
- Password reset por email
- Auditoria de login

## Troubleshooting

### "Email já cadastrado"
Usuário já existe. Fazer login ao invés de registrar.

### "Email ou senha inválido"
Email não encontrado OU senha errada. Não revelar qual.

### "Conta desativada"
Admin bloqueou a conta (status=BLOCKED).

### Token expirado
Login automaticamente redireciona para /auth/login.

### Erro ao criar conta
- Verificar variáveis de ambiente
- Verificar se tabela `users_accounts` existe
- Verificar permissões no Supabase

## API Endpoints

### POST /api/auth/register
```json
{
  "name": "João",
  "email": "joao@email.com",
  "password": "senha123"
}
```

Resposta (201):
```json
{
  "success": true,
  "message": "Conta criada com sucesso",
  "user": {
    "id": "uuid",
    "name": "João",
    "email": "joao@email.com",
    "plan": "FREE"
  }
}
```

### POST /api/auth/login
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

Resposta (200):
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "user": {
    "id": "uuid",
    "name": "João",
    "email": "joao@email.com",
    "plan": "FREE"
  }
}
```

### POST /api/auth/logout
Resposta (200):
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

## Próximos Passos

1. ✅ Criar tabela
2. ✅ Testar registro
3. ✅ Testar login
4. → Criar página de admin para gerenciar planos
5. → Implementar password reset
6. → Adicionar 2FA
7. → Deploy em produção

Simples e funcional! 🚀
