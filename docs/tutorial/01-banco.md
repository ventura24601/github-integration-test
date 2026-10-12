# 1 — Banco + migrations

Arquivo: [`supabase/migrations/20261012153509_criar_tabela_notas.sql`](../../supabase/migrations/20261012153509_criar_tabela_notas.sql)

## O que a migration cria

- Tabela `public.notas` com `user_id` preenchido automaticamente por `auth.uid()`
- Trigger que atualiza `atualizado_em` a cada edição
- **RLS** com 4 políticas (select, insert, update, delete), todas com a regra `auth.uid() = user_id`
- Inclusão da tabela na publicação `supabase_realtime` (usada no módulo 5)

## Por que RLS é o centro de tudo

A publishable key fica no navegador, então qualquer pessoa pode usá-la. O que impede alguém de ler as notas dos outros é o RLS:

```sql
create policy "notas: ler as próprias"
on public.notas for select to authenticated
using ((select auth.uid()) = user_id);
```

Sem login (`anon`), nenhuma política se aplica, então a consulta volta vazia. Teste:

```bash
curl "https://<ref>.supabase.co/rest/v1/notas" -H "apikey: <publishable key>"
# → []
```

## Comandos

```bash
supabase migration new criar_tabela_notas   # cria o arquivo vazio
supabase db push --dry-run                   # mostra o que será aplicado
supabase db push                             # aplica no projeto vinculado
supabase migration list                      # local x remoto
```

Para mudar a tabela depois, **crie outra migration** (ex.: `supabase migration new adicionar_cor_nas_notas`). Nunca edite uma que já foi aplicada.
