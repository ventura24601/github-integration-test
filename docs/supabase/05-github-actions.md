# Supabase + GitHub Actions

Objetivo: ao fazer merge na `main`, aplicar automaticamente as migrations e publicar as Edge Functions.

## 1. Cadastrar os secrets no repositório

```bash
gh secret set SUPABASE_ACCESS_TOKEN    # token de https://supabase.com/dashboard/account/tokens
gh secret set SUPABASE_PROJECT_REF     # ref do projeto
gh secret set SUPABASE_DB_PASSWORD     # opcional: sem ela, a CLI usa uma role temporária
```

## 2. O workflow

Este repositório já tem o workflow em [`.github/workflows/supabase-deploy.yml`](../../.github/workflows/supabase-deploy.yml). Para outro projeto, copie o arquivo para o mesmo caminho.

Se os secrets não estiverem configurados, ele termina com um aviso em vez de falhar.

## 3. Acompanhar

```bash
gh run list --workflow supabase-deploy.yml
gh run watch
```

## Alternativa: integração nativa

O dashboard da Supabase também tem uma integração com GitHub (Project Settings → Integrations → GitHub) que cria **branches de preview** do banco para cada PR. É útil em times; para projetos solo o workflow acima costuma bastar.
