# 5 — Realtime

Arquivo: [`app/src/realtime.js`](../../app/src/realtime.js)

## Habilitar na tabela

Feito na migration do módulo 1:

```sql
alter publication supabase_realtime add table public.notas;
```

## Escutar no app

```js
supabase
  .channel("notas-do-usuario")
  .on("postgres_changes", { event: "*", schema: "public", table: "notas" }, (payload) => {
    // payload.eventType: INSERT | UPDATE | DELETE
  })
  .subscribe((status) => console.log(status)); // SUBSCRIBED quando conectado
```

O RLS também vale aqui: cada usuário só recebe eventos das próprias notas.

## Testar

1. Abra o app em duas abas, logado com a mesma conta.
2. Crie uma nota numa aba e veja a outra atualizar sozinha.
3. O indicador "● realtime conectado" mostra o status do canal.

## Outros usos do Realtime

- **Broadcast**: mensagens entre clientes sem passar pelo banco (chat, cursores).
- **Presence**: quem está online no canal.
