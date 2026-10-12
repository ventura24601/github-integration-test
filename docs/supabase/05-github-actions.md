# Supabase + GitHub Actions

Objetivo: ao fazer merge na `main`, aplicar automaticamente as migrations e publicar as Edge Functions.

## 1. Cadastrar os secrets no repositório

```bash
gh secret set SUPABASE_ACCESS_TOKEN    # token de https://supabase.com/dashboard/account/tokens
gh secret set SUPABASE_DB_PASSWORD     # senha do banco do projeto
gh secret set SUPABASE_PROJECT_REF     # ref do projeto
```

## 2. Criar o workflow

Copie [`docs/exemplos/supabase-deploy.yml`](../exemplos/supabase-deploy.yml) para `.github/workflows/supabase-deploy.yml`.

O exemplo fica em `docs/` (e não em `.github/workflows/`) para não rodar neste repositório enquanto os secrets não estiverem configurados.

## 3. Acompanhar

```bash
gh run list --workflow supabase-deploy.yml
gh run watch
```

## Alternativa: integração nativa

O dashboard da Supabase também tem uma integração com GitHub (Project Settings → Integrations → GitHub) que cria **branches de preview** do banco para cada PR. É útil em times; para projetos solo o workflow acima costuma bastar.
