# 🚀 Quick Start - Sistema de Auth Customizado

## ⚡ 5 Passos para Começar

### 1️⃣ Execute o SQL no Supabase

1. Abra https://app.supabase.com
2. Selecione seu projeto
3. Vá para **SQL Editor**
4. Copie e execute o conteúdo de `scripts/create-tables.sql`

**Resultado esperado:**
- ✅ Tabela `users_accounts` criada
- ✅ 3 índices criados

### 2️⃣ Verifique o `.env.local`

Certifique-se que tem estas variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_public...
SUPABASE_SERVICE_ROLE_KEY=sb_secret...
JWT_SECRET=your-secret-key-here
```

### 3️⃣ Rode o Projeto

```bash
npm run dev
```

Você verá:
```
✓ Ready in 2.5s
Local:    http://localhost:3000
```

### 4️⃣ Teste o Registro

1. Abra http://localhost:3000/auth/register
2. Preencha:
   - Nome: `Seu Nome`
   - Email: `seu@email.com`
   - Senha: `123456`
3. Clique "Criar Conta 🎉"
4. Deve redirecionar para `/dashboard`

### 5️⃣ Teste o Login

1. Faça logout (botão no dashboard)
2. Abra http://localhost:3000/auth/login
3. Preencha com os dados anteriores
4. Clique "Entrar 🚀"
5. Deve redirecionar para `/dashboard`

---

## ✅ Checklist de Implementação

### Core Auth
- [x] Tabela `users_accounts` criada
- [x] Hash de senha com bcryptjs
- [x] JWT tokens
- [x] Cookies httpOnly
- [x] Proteção de rotas (middleware)

### APIs
- [x] POST `/api/auth/register`
- [x] POST `/api/auth/login`
- [x] POST `/api/auth/logout`

### Páginas
- [x] `/auth/register` - Funcional
- [x] `/auth/login` - Funcional
- [x] `/dashboard` - Protegido + logout

### Segurança
- [x] Validação de entrada
- [x] Hash de senha forte
- [x] JWT com expiração
- [x] Proteção XSS (httpOnly)
- [x] Proteção CSRF (sameSite)

---

## 📁 Arquivos Principais

```
Sistema de Auth Customizado
├── 📁 lib/
│   ├── auth.ts                 ← Funções core
│   ├── authClient.ts           ← Client-side
│   └── supabaseServer.ts       ← Server Supabase
│
├── 📁 app/api/auth/
│   ├── register/route.ts       ← POST /api/auth/register
│   ├── login/route.ts          ← POST /api/auth/login
│   └── logout/route.ts         ← POST /api/auth/logout
│
├── 📁 app/auth/
│   ├── register/page.tsx       ← Página de registro
│   └── login/page.tsx          ← Página de login
│
├── 📁 app/dashboard/
│   └── page.tsx                ← Página protegida
│
├── 📁 types/
│   └── auth.ts                 ← TypeScript interfaces
│
├── 📁 scripts/
│   └── create-tables.sql       ← Criação de tabelas
│
├── middleware.ts               ← Proteção de rotas
├── CUSTOM_AUTH_SETUP.md        ← Guia completo
├── IMPLEMENTATION_SUMMARY.md   ← Resumo técnico
├── EXAMPLES.md                 ← Exemplos de código
└── QUICKSTART.md               ← Este arquivo
```

---

## 🧪 Testar APIs com cURL

### Registrar
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@email.com",
    "password": "senha123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "password": "senha123"
  }' -v
```

Procure por `Set-Cookie: auth_token=...`

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout -v
```

---

## 🔍 Verificar Dados no Supabase

1. Abra https://app.supabase.com
2. Selecione seu projeto
3. Vá para **Table Editor**
4. Clique em `users_accounts`
5. Você deve ver os usuários registrados:

| id | name | email | plan | status |
|---|---|---|---|---|
| uuid | Seu Nome | seu@email.com | FREE | ACTIVE |

---

## 🐛 Troubleshooting

### Erro: "Email já cadastrado"
- Usuário já existe
- Teste com um email diferente

### Erro: "Senha deve ter pelo menos 6 caracteres"
- Use senha com 6+ caracteres
- Exemplo: `senha123`

### Token inválido / Página não abre
- Middleware bloqueou
- Faça login novamente

### Erro ao conectar banco
- Verifique variáveis em `.env.local`
- Verifique tabela existe em Supabase
- Verifique permissões da chave

### Cookies não salvam
- Em produção: precisa de HTTPS
- Em dev: OK com HTTP
- Verifique `secure: false` em `.env.local`

---

## 📚 Leia Também

- **CUSTOM_AUTH_SETUP.md** - Guia completo
- **IMPLEMENTATION_SUMMARY.md** - Detalhes técnicos
- **EXAMPLES.md** - Exemplos de código
- **types/auth.ts** - Tipos TypeScript

---

## 🎯 Próximos Passos (Opcional)

1. **Admin Panel** - Interface para gerenciar usuários
2. **Password Reset** - Recuperação de senha por email
3. **Email Verification** - Confirmar email no registro
4. **2FA** - Autenticação de dois fatores
5. **Logout Remoto** - Invalidar sessão em servidor

---

## 💡 Dicas

✅ **Em desenvolvimento:**
- `JWT_SECRET` pode ser qualquer string
- Cookies HTTP é OK
- Não precisa HTTPS

⚠️ **Em produção:**
- Mude `JWT_SECRET` para algo seguro
  ```bash
  openssl rand -base64 32
  ```
- Configure HTTPS
- Ative `secure: true` nos cookies
- Implemente rate limiting
- Backup automático do banco

---

## 🎉 Pronto!

Seu sistema de autenticação customizado está funcional!

**Próximo passo:** Implementar features de negócio no `/dashboard` 🚀

Dúvidas? Consulte `CUSTOM_AUTH_SETUP.md`
