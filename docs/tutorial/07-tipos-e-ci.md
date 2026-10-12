# 7 — Tipos TypeScript + CI

## Tipos gerados do banco

```bash
cd app
npm run types     # = supabase gen types typescript --linked > src/database.types.ts
```

Mesmo em JavaScript puro, o VS Code usa os tipos via JSDoc (veja [`app/src/supabase.js`](../../app/src/supabase.js)):

```js
/** @type {import("@supabase/supabase-js").SupabaseClient<import("./database.types").Database>} */
export const supabase = createClient(url, key);
```

Com isso, `supabase.from("notas").select("titulo")` passa a ter autocomplete das colunas. Rode `npm run types` sempre que criar uma migration.

## Deploy automático (GitHub Actions)

Workflow: [`.github/workflows/supabase-deploy.yml`](../../.github/workflows/supabase-deploy.yml)

A cada push na `main` que altere `supabase/**`, o workflow:

1. vincula o projeto;
2. roda `supabase db push`;
3. publica as Edge Functions.

### Ativar

1. Gere um token em <https://supabase.com/dashboard/account/tokens>.
2. Cadastre os secrets no repositório (cada comando pede o valor de forma interativa):

```bash
gh secret set SUPABASE_ACCESS_TOKEN
gh secret set SUPABASE_PROJECT_REF
```

Enquanto os secrets não existirem, o workflow termina com um aviso, sem falhar.

### Acompanhar

```bash
gh workflow run supabase-deploy.yml   # dispara manualmente
gh run watch
```

## Fluxo recomendado no dia a dia

```bash
git checkout -b feat/nova-coluna
supabase migration new adicionar_cor_nas_notas
# edite o SQL
supabase db push --dry-run
cd app && npm run types
git add . && git commit -m "Adiciona cor nas notas"
gh pr create --fill
# merge na main → o Actions aplica a migration
```
