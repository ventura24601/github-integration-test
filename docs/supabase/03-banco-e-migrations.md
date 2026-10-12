# Banco de dados e migrations

Migrations são arquivos SQL versionados em `supabase/migrations/`. Elas são a "fonte da verdade" do schema e é por elas que o banco local e o remoto ficam iguais.

## Criar uma migration

```bash
supabase migration new criar_tabela_clientes
```

Gera `supabase/migrations/<timestamp>_criar_tabela_clientes.sql`. Edite o arquivo:

```sql
create table public.clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  criado_em timestamptz not null default now()
);

alter table public.clientes enable row level security;
```

## Aplicar

```bash
supabase db reset            # local: recria o banco do zero com todas as migrations + seed.sql
supabase db push             # remoto: aplica as migrations pendentes no projeto vinculado
supabase db push --dry-run   # mostra o que seria aplicado, sem aplicar
supabase migration list      # compara migrations locais x remotas
```

## Trazer mudanças feitas pelo dashboard

Se alguém alterou o banco direto pelo Studio do projeto remoto:

```bash
supabase db pull             # gera uma migration com as diferenças do remoto
```

Se a mudança foi feita no Studio **local**:

```bash
supabase db diff -f nome_da_mudanca
```

## Backup / dump

```bash
supabase db dump -f schema.sql                 # só o schema
supabase db dump --data-only -f dados.sql      # só os dados
```

## Boas práticas

- Nunca edite uma migration que já foi aplicada no remoto; crie uma nova.
- Sempre habilite RLS (`enable row level security`) em tabelas do schema `public`.
- Teste com `supabase db reset` antes de `supabase db push`.
