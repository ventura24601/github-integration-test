# Tutorial: app de Notas com Supabase

Um app pequeno, construído em módulos. Cada módulo usa uma funcionalidade nova da Supabase.

| # | Módulo | Funcionalidade | Arquivos principais |
|---|---|---|---|
| 0 | [Escolher ou criar o projeto](00-projeto.md) | Projects, link | `scripts/projeto.sh` |
| 1 | [Banco + migrations](01-banco.md) | Postgres, RLS | `supabase/migrations/*_criar_tabela_notas.sql` |
| 2 | [Interface web](02-interface.md) | supabase-js, CRUD | `app/src/notas.js`, `app/src/main.js` |
| 3 | [Auth](03-auth.md) | Login por e-mail e senha | `app/src/auth.js` |
| 4 | [Storage](04-storage.md) | Upload em bucket privado | `supabase/migrations/*_criar_bucket_anexos.sql`, `app/src/anexos.js` |
| 5 | [Realtime](05-realtime.md) | Atualização ao vivo | `app/src/realtime.js` |
| 6 | [Edge Function](06-edge-function.md) | Função serverless + secrets | `supabase/functions/exportar-notas/` |
| 7 | [Tipos + CI](07-tipos-e-ci.md) | gen types, GitHub Actions | `app/src/database.types.ts`, `.github/workflows/` |

## Rodar o app

```bash
./scripts/projeto.sh     # só na primeira vez (ou para trocar de projeto)
supabase db push         # aplica as migrations no projeto
cd app
npm install
npm run dev              # http://localhost:5173
```

## Arquitetura

```
Navegador (app/, Vite)
   │  supabase-js + publishable key + token do usuário
   ▼
Supabase (projeto tutorial-notas)
   ├── Auth ........... cadastro/login, emite o JWT
   ├── Postgres ....... tabela notas (RLS: cada um vê só as suas)
   ├── Storage ........ bucket anexos (pasta = id do usuário)
   ├── Realtime ....... publica mudanças da tabela notas
   └── Edge Function .. exportar-notas (lê as notas com o JWT do usuário)
```
