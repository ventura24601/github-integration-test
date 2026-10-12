-- Tabela de notas: cada nota pertence a um usuário autenticado.
create table public.notas (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  titulo text not null check (char_length(titulo) between 1 and 200),
  conteudo text not null default '',
  anexo_path text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index notas_user_id_idx on public.notas (user_id);

-- Mantém atualizado_em em dia a cada update.
create function public.tocar_atualizado_em()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

create trigger notas_tocar_atualizado_em
before update on public.notas
for each row execute function public.tocar_atualizado_em();

-- RLS: sem políticas, ninguém acessa. Cada política libera só as notas do próprio usuário.
alter table public.notas enable row level security;

create policy "notas: ler as próprias"
on public.notas for select to authenticated
using ((select auth.uid()) = user_id);

create policy "notas: criar as próprias"
on public.notas for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "notas: editar as próprias"
on public.notas for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "notas: apagar as próprias"
on public.notas for delete to authenticated
using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.notas to authenticated;

-- Realtime: publica as mudanças da tabela (o RLS continua valendo para quem escuta).
alter publication supabase_realtime add table public.notas;
