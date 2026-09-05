# Implementation Plan: remove-supabase-from-auth-pages

## Overview

Remover a dependência Supabase da página de recuperação de senha (forgot-password), confirmar que login e register já estão limpos, verificar se supabaseClient é usado em outro lugar, e validar o build e deploy sem quebras.

## Tasks

- [x] 1. Auditar uso de supabaseClient em todo o projeto
  - Confirmar que login/page.tsx e register/page.tsx **não usam** supabase (chamam /api/auth/* em vez disso)
  - Confirmar que forgot-password/page.tsx é o único arquivo de página que importa supabase
  - Documentar todas as referências encontradas em AuthContext.tsx, supabaseServer.ts e API routes
  - Confirmar que supabaseClient.ts é importado apenas em forgot-password/page.tsx dentre as páginas
  - _Requisitos: Identificação clara de onde supabase é usado_

- [x] 2. Remover import e desabilitar formulário em forgot-password/page.tsx
  - Remover linha: `import { supabase } from '@/lib/supabaseClient';`
  - Adicionar aviso visual no topo do formulário: "Essa funcionalidade está em manutenção"
  - Desabilitar o formulário inteiro (disabled state)
  - Remover lógica de handleSubmit que usa supabase.auth.resetPasswordForEmail
  - Manter a estrutura UI e estilos visuais
  - _Requisitos: Remoção limpa de supabase, usuário informado sobre indisponibilidade_

- [x] 3. Adicionar placeholder funcional em forgot-password/page.tsx
  - Substituir handleSubmit por versão que apenas mostra mensagem: "Esse recurso está sendo reconstruído"
  - Manter botão de retorno para login e register funcionando
  - Garantir que nenhum erro ocorre ao clicar no botão (agora desabilitado)
  - _Requisitos: UX clara sem quebras de funcionalidade_

- [x] 4. Executar build de verificação
  - Rodar: `npm run build` (ou o comando de build do seu projeto)
  - Verificar que não há erros TypeScript sobre imports faltantes
  - Verificar que a página forgot-password é gerada corretamente
  - Confirmar que não há warnings relacionados a supabase
  - _Requisitos: Build bem-sucedido sem erros ou warnings_

- [x] 5. Testar página no desenvolvimento local
  - Navegar para `/auth/forgot-password` em desenvolvimento
  - Confirmar que a página carrega sem erros de console
  - Confirmar que o formulário está desabilitado e mostra aviso
  - Clicar em "Voltar para Login" e "Criar Conta" - verificar navegação
  - _Requisitos: Nenhum erro em runtime, UX sem quebras_

- [x] 6. Validar que supabaseClient.ts pode ser removido com segurança (apenas verificação, não remova ainda)
  - Confirmar que supabaseClient.ts **não é importado** em nenhum arquivo após remoção de forgot-password
  - Verificar grep: `grep -r "from '@/lib/supabaseClient'" app/` retorna vazio
  - Documentar resultado da verificação
  - **Nota: Não remova supabaseClient.ts agora** - deixar para decisão futura se nécessário
  - _Requisitos: Confirmação de que a remoção é segura_

- [x] 7. Checkpoint - Verificar integridade da aplicação
  - Todos os builds completam sem erro
  - Nenhuma página de autenticação apresenta erros
  - Login, register e forgot-password carregam corretamente
  - Perguntar ao usuário se há dúvidas ou se precisa de ajustes

## Notes

- As páginas de login e register já estão limpas (usam `/api/auth/*` em vez de supabase direto)
- O supabase continua sendo usado em `AuthContext.tsx`, `supabaseServer.ts` e API routes (isso é correto, não remover)
- O objetivo é apenas remover supabase da page de forgot-password, não do projeto todo
- A página será desabilitada com aviso visual claro ao usuário

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2", "3"] },
    { "id": 2, "tasks": ["4", "5"] },
    { "id": 3, "tasks": ["6"] },
    { "id": 4, "tasks": ["7"] }
  ]
}
```
