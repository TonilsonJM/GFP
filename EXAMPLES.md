# Exemplos de Uso do Sistema de Auth Customizado

## 📝 Exemplos de Requisições HTTP

### 1. Registrar Nova Conta

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha@123"
  }'
```

**Response (201 - Sucesso):**
```json
{
  "success": true,
  "message": "Conta criada com sucesso",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "plan": "FREE"
  }
}
```

**Response (400 - Erro de Validação):**
```json
{
  "error": "Senha deve ter pelo menos 6 caracteres"
}
```

**Response (409 - Email Duplicado):**
```json
{
  "error": "Email já cadastrado"
}
```

### 2. Fazer Login

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha@123"
  }'
```

**Response (200 - Sucesso):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "plan": "FREE"
  }
}
```

**Response (401 - Credenciais Inválidas):**
```json
{
  "error": "Email ou senha inválido"
}
```

**Response (403 - Conta Bloqueada):**
```json
{
  "error": "Conta desativada"
}
```

### 3. Fazer Logout

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/logout
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

---

## 💻 Exemplos de Uso em Componentes React

### 1. Usar authClient em Componente

```typescript
// app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/authClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login({ email, password });
      console.log('Login bem-sucedido:', response.user);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="senha"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Autenticando...' : 'Entrar'}
      </button>
    </form>
  );
}
```

### 2. Usar authClient para Registrar

```typescript
// app/auth/register/page.tsx
'use client';

import { register } from '@/lib/authClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await register(formData);
      console.log('Conta criada:', response.user);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Seu nome"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="seu@email.com"
        required
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="senha"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit">Criar Conta</button>
    </form>
  );
}
```

### 3. Botão de Logout

```typescript
// components/LogoutButton.tsx
'use client';

import { logout } from '@/lib/authClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push('/auth/login');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? 'Saindo...' : 'Logout'}
    </button>
  );
}
```

---

## 🗄️ Exemplos de SQL

### 1. Criar Tabela

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

CREATE INDEX idx_users_accounts_email ON public.users_accounts(email);
CREATE INDEX idx_users_accounts_status ON public.users_accounts(status);
CREATE INDEX idx_users_accounts_plan ON public.users_accounts(plan);
```

### 2. Promover Usuário para PRO

```sql
UPDATE users_accounts 
SET plan='PRO', updated_at=now() 
WHERE email='joao@example.com';
```

### 3. Bloquear Usuário

```sql
UPDATE users_accounts 
SET status='BLOCKED', updated_at=now() 
WHERE email='joao@example.com';
```

### 4. Desbloquear Usuário

```sql
UPDATE users_accounts 
SET status='ACTIVE', updated_at=now() 
WHERE email='joao@example.com';
```

### 5. Listar Todos os Usuários

```sql
SELECT 
  id, 
  name, 
  email, 
  plan, 
  status, 
  created_at 
FROM users_accounts 
ORDER BY created_at DESC;
```

### 6. Contar Usuários por Plano

```sql
SELECT plan, COUNT(*) as total 
FROM users_accounts 
GROUP BY plan;
```

### 7. Encontrar Usuário por Email

```sql
SELECT * FROM users_accounts WHERE email='joao@example.com';
```

### 8. Deletar Usuário

```sql
DELETE FROM users_accounts WHERE id='user-id-here';
```

---

## 🔑 Exemplos de JWT Token

### Token Decodificado
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "joao@example.com",
  "iat": 1704067200,
  "exp": 1704672000
}
```

- **iat**: Issued at (timestamp de criação)
- **exp**: Expiration (timestamp de expiração)
- **Validade**: 7 dias

### Verificar Token no Terminal
```bash
# Token é salvo em cookie, então acesse o dashboard
# e veja o cookie "auth_token" nas developer tools (F12)
```

---

## 🛡️ Exemplos de Segurança

### 1. Validação de Senha Forte

Adicione em `lib/auth.ts`:

```typescript
export function validatePasswordStrength(password: string): {
  isStrong: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) errors.push('Mínimo 8 caracteres');
  if (!/[A-Z]/.test(password)) errors.push('Precisa de maiúscula');
  if (!/[a-z]/.test(password)) errors.push('Precisa de minúscula');
  if (!/[0-9]/.test(password)) errors.push('Precisa de número');
  if (!/[!@#$%^&*]/.test(password)) errors.push('Precisa de símbolo');

  return {
    isStrong: errors.length === 0,
    errors,
  };
}
```

### 2. Rate Limiting

Use middleware para limitar tentativas:

```typescript
// middleware.ts (adicionar)
const attempts = new Map<string, number[]>();

function checkRateLimit(email: string, limit = 5, window = 60000) {
  const now = Date.now();
  const userAttempts = attempts.get(email) || [];
  
  // Limpar tentativas fora da janela
  const recentAttempts = userAttempts.filter((time) => now - time < window);
  
  if (recentAttempts.length >= limit) {
    return false; // Bloqueado
  }
  
  recentAttempts.push(now);
  attempts.set(email, recentAttempts);
  return true; // Permitido
}
```

---

## 📱 Fluxo Completo de Usuário

### 1. Novo Usuário se Registra
```
Viita /auth/register
  ↓
Preenche: João, joao@email.com, senha123
  ↓
Clica "Criar Conta"
  ↓
POST /api/auth/register
  ↓
Validação ✓
  ↓
Hash de senha ✓
  ↓
INSERT users_accounts (plan=FREE, status=ACTIVE) ✓
  ↓
JWT criado ✓
  ↓
Cookie salvo (httpOnly) ✓
  ↓
Redirect /dashboard ✓
```

### 2. Usuário Faz Login
```
Visita /auth/login
  ↓
Preenche: joao@email.com, senha123
  ↓
Clica "Entrar"
  ↓
POST /api/auth/login
  ↓
SELECT user by email ✓
  ↓
Verifica password hash ✓
  ↓
Verifica status=ACTIVE ✓
  ↓
JWT criado ✓
  ↓
Cookie salvo ✓
  ↓
Redirect /dashboard ✓
```

### 3. Acessa Rota Protegida
```
Visita /dashboard
  ↓
Middleware intercepta
  ↓
Lê cookie auth_token ✓
  ↓
Verifica JWT (válido?) ✓
  ↓
Permite acesso ✓
  ↓
Mostra dashboard
```

### 4. Faz Logout
```
Clica "Sair" (no dashboard)
  ↓
POST /api/auth/logout
  ↓
Delete cookie auth_token ✓
  ↓
Redirect /auth/login ✓
```

---

## 🚀 Dica de Produção

Antes de fazer deploy:

1. ✅ Mude JWT_SECRET
2. ✅ Configure HTTPS
3. ✅ Ative secure em cookies
4. ✅ Implemente rate limiting
5. ✅ Configure CORS se necessário
6. ✅ Adicione logging
7. ✅ Implemente backup
8. ✅ Teste recovery de senha

---

Sucesso na implementação! 🎉
