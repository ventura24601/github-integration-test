# 4 — Storage (anexos)

Arquivos:
- [`supabase/migrations/20261012153512_criar_bucket_anexos.sql`](../../supabase/migrations/20261012153512_criar_bucket_anexos.sql)
- [`app/src/anexos.js`](../../app/src/anexos.js)

## Bucket privado + políticas

O bucket `anexos` é **privado** (limite de 5 MB por arquivo). Os arquivos seguem o caminho:

```
<user_id>/<nota_id>/<timestamp>-<arquivo>
```

As políticas em `storage.objects` só liberam o acesso quando a **primeira pasta** é o id do usuário:

```sql
(storage.foldername(name))[1] = (select auth.uid())::text
```

## No app

```js
// upload
await supabase.storage.from("anexos").upload(caminho, arquivo);

// bucket privado não tem URL pública: gera um link temporário
const { data } = await supabase.storage.from("anexos").createSignedUrl(caminho, 60);

// apagar
await supabase.storage.from("anexos").remove([caminho]);
```

A nota guarda só o caminho (`anexo_path`). O arquivo em si fica no Storage.

## Bucket público (alternativa)

Para imagens que todo mundo pode ver (avatares, por exemplo), crie o bucket com `public = true` e use `getPublicUrl(caminho)`. Nesse caso não há link temporário.

## Pela CLI

```bash
supabase storage ls ss:///anexos --experimental
```
