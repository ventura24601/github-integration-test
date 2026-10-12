-- Bucket privado para anexos das notas.
-- Convenção de caminho: <user_id>/<nota_id>/<nome-do-arquivo>
insert into storage.buckets (id, name, public, file_size_limit)
values ('anexos', 'anexos', false, 5242880) -- 5 MB
on conflict (id) do nothing;

-- Cada usuário só mexe na pasta que começa com o próprio id.
create policy "anexos: ler os próprios"
on storage.objects for select to authenticated
using (bucket_id = 'anexos' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "anexos: enviar os próprios"
on storage.objects for insert to authenticated
with check (bucket_id = 'anexos' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "anexos: substituir os próprios"
on storage.objects for update to authenticated
using (bucket_id = 'anexos' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "anexos: apagar os próprios"
on storage.objects for delete to authenticated
using (bucket_id = 'anexos' and (storage.foldername(name))[1] = (select auth.uid())::text);
