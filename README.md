# github-integration-test

Repositório de referência pessoal para trabalhar com **Git/GitHub** e **Supabase** pela linha de comando. Ele serve como guia de consulta e também como projeto de teste das integrações.

## Comece aqui

```bash
./scripts/check-tools.sh
```

Esse script mostra quais ferramentas estão instaladas e autenticadas.

| Ferramenta     | Instalação                              | Login              |
|----------------|-----------------------------------------|--------------------|
| Git            | `xcode-select --install`                | —                  |
| GitHub CLI     | `brew install gh`                       | `gh auth login`    |
| Supabase CLI   | `brew install supabase/tap/supabase`    | `supabase login`   |
| Docker         | Docker Desktop ou OrbStack              | — (para Supabase local) |

## Guias

### GitHub
1. [Git básico](docs/github/01-git-basico.md): commits, branches, desfazer mudanças
2. [GitHub CLI](docs/github/02-github-cli.md): repositórios, PRs, Actions e secrets pelo terminal

### Supabase
1. [Instalação e login](docs/supabase/01-instalacao-e-login.md)
2. [Projetos e vínculo com o repositório](docs/supabase/02-projetos-e-link.md): `projects list`, `init`, `link`, ambiente local
3. [Banco e migrations](docs/supabase/03-banco-e-migrations.md): `migration new`, `db push`, `db pull`, dump
4. [Edge Functions, secrets e tipos](docs/supabase/04-edge-functions-secrets-tipos.md)
5. [Supabase + GitHub Actions](docs/supabase/05-github-actions.md): deploy automático a cada merge

## Estrutura

```
.
├── docs/
│   ├── github/        # guias de Git e GitHub CLI
│   ├── supabase/      # guias da Supabase CLI
│   └── exemplos/      # arquivos prontos para copiar (ex.: workflow de deploy)
├── scripts/
│   └── check-tools.sh # verifica ferramentas e logins
├── supabase/          # projeto Supabase (config.toml, migrations, functions)
├── .env.example       # variáveis necessárias (copie para .env)
└── README.md
```

## Cola rápida

```bash
# GitHub
gh pr create --fill && gh pr checks

# Supabase
supabase projects list
supabase link --project-ref <ref>
supabase migration new <nome>
supabase db push
supabase functions deploy <nome>
supabase gen types typescript --linked > types/database.types.ts
```
