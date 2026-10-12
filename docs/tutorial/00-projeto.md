# 0 — Escolher ou criar o projeto

## Com o script

```bash
./scripts/projeto.sh
```

```
== Seus projetos ==
  1) icomtvplus-oss's Project       bxpbskajkfevmvummghj  us-west-2  ACTIVE_HEALTHY
  2) tutorial-notas                 zgccfwijmnjzvxmasfiu  sa-east-1  ACTIVE_HEALTHY
  n) criar um projeto novo
```

O script:

1. lista seus projetos (`supabase projects list`);
2. vincula o escolhido ou cria um novo (`supabase projects create`);
3. roda `supabase link`;
4. grava `.env` (raiz) e `app/.env.local` com a URL e a **publishable key**.

## Na mão

```bash
supabase projects list
supabase projects create tutorial-notas --org-id <org> --region sa-east-1 --db-password <senha>
supabase link --project-ref <ref>
supabase projects api-keys --project-ref <ref>     # copie a chave "publishable" para app/.env.local
```

## Chaves: qual usar onde

| Chave | Onde | Pode expor? |
|---|---|---|
| `sb_publishable_…` | Front-end (navegador) | Sim. Quem protege os dados é o RLS. |
| `sb_secret_…` | Só em servidor/Edge Functions | **Nunca.** Ignora o RLS. |
| `anon` / `service_role` (JWT) | Equivalentes antigos (legacy) das duas acima | Mesma regra |

## Senha do banco

A CLI atual não precisa da senha para `link`, `db push` e `migration list`: ela cria uma role temporária usando o seu login. Se um dia precisar (para conectar com `psql` ou com um cliente SQL, por exemplo), redefina em **Dashboard → Project Settings → Database → Reset database password**.

## Configuração de Auth do projeto

O `supabase/config.toml` define `site_url` como o site publicado no Netlify, libera `http://localhost:5173` nos redirects e desliga a confirmação de e-mail, para facilitar o tutorial. Para aplicar no projeto remoto:

```bash
supabase config diff     # revise o que vai mudar
supabase config push     # confirma recurso por recurso
```

Em produção, mantenha a confirmação de e-mail **ligada**.
