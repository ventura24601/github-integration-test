# github-integration-test

Repositório de referência pessoal para trabalhar com **Git/GitHub** e **Supabase** pela linha de comando. Ele serve como guia de consulta, tem um tutorial prático com um app de exemplo e funciona como projeto de teste das integrações.

## Comece aqui

```bash
./scripts/check-tools.sh   # o que está instalado e autenticado
./scripts/projeto.sh       # escolhe ou cria o projeto Supabase e vincula a este repo
```

| Ferramenta     | Instalação                              | Login              |
|----------------|-----------------------------------------|--------------------|
| Git            | `xcode-select --install`                | —                  |
| GitHub CLI     | `brew install gh`                       | `gh auth login`    |
| Supabase CLI   | `brew install supabase/tap/supabase`    | `supabase login`   |
| Docker         | Docker Desktop ou OrbStack              | — (só para rodar a Supabase local) |

## Tutorial: app de Notas

App em Vite + supabase-js que usa, módulo a módulo, as principais funcionalidades da Supabase. Veja o [índice do tutorial](docs/tutorial/README.md).

| # | Módulo |
|---|---|
| 0 | [Escolher ou criar o projeto](docs/tutorial/00-projeto.md) |
| 1 | [Banco + migrations + RLS](docs/tutorial/01-banco.md) |
| 2 | [Interface web](docs/tutorial/02-interface.md) |
| 3 | [Auth](docs/tutorial/03-auth.md) |
| 4 | [Storage](docs/tutorial/04-storage.md) |
| 5 | [Realtime](docs/tutorial/05-realtime.md) |
| 6 | [Edge Function](docs/tutorial/06-edge-function.md) |
| 7 | [Tipos + CI](docs/tutorial/07-tipos-e-ci.md) |

```bash
cd app && npm install && npm run dev   # http://localhost:5173
```

## Guias de referência

### GitHub
0. [Criar um repositório novo e clonar](docs/github/00-novo-repositorio.md): pelo Claude, pelo `gh` ou pelo site
1. [Git básico](docs/github/01-git-basico.md): commits, branches, desfazer mudanças
2. [GitHub CLI](docs/github/02-github-cli.md): repositórios, PRs, Actions e secrets pelo terminal

### Supabase CLI
1. [Instalação e login](docs/supabase/01-instalacao-e-login.md)
2. [Projetos e vínculo com o repositório](docs/supabase/02-projetos-e-link.md)
3. [Banco e migrations](docs/supabase/03-banco-e-migrations.md)
4. [Edge Functions, secrets e tipos](docs/supabase/04-edge-functions-secrets-tipos.md)
5. [Supabase + GitHub Actions](docs/supabase/05-github-actions.md)

## Estrutura

```
.
├── app/                    # app de Notas (Vite + supabase-js)
├── docs/
│   ├── github/             # guias de Git e GitHub CLI
│   ├── supabase/           # referência da Supabase CLI
│   └── tutorial/           # tutorial passo a passo do app
├── scripts/
│   ├── check-tools.sh      # verifica ferramentas e logins
│   └── projeto.sh          # escolhe/cria o projeto Supabase e vincula
├── supabase/
│   ├── config.toml         # configuração do projeto
│   ├── migrations/         # SQL versionado (tabela notas, bucket anexos)
│   └── functions/          # Edge Functions (exportar-notas)
├── .github/workflows/      # deploy automático das migrations e funções
└── .env.example            # variáveis necessárias (copie para .env)
```

## Cola rápida

```bash
# GitHub
gh repo create meu-projeto --private --add-readme --clone
gh pr create --fill && gh pr checks

# Supabase
supabase projects list
supabase link --project-ref <ref>
supabase migration new <nome>
supabase db push
supabase functions deploy <nome> --use-api
supabase gen types typescript --linked > app/src/database.types.ts
```
