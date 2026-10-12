# 6 — Edge Function

Arquivo: [`supabase/functions/exportar-notas/index.ts`](../../supabase/functions/exportar-notas/index.ts)

A função `exportar-notas` devolve as notas do usuário logado como um arquivo Markdown.

## Como ela funciona

```ts
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase({ auth: "user" }, async (_req, ctx) => {
    // ctx.supabase já usa o JWT do usuário → o RLS se aplica
    const { data } = await ctx.supabase.from("notas").select("*");
    // ...
  }),
};
```

- `auth: "user"` recusa chamadas sem um JWT válido (HTTP 401).
- `ctx.supabaseAdmin` existe mas ignora o RLS. Use só quando for realmente necessário.
- O `@supabase/server` valida o JWT, por isso o `config.toml` usa `verify_jwt = false` (a checagem fica no código).

## Comandos

```bash
supabase functions new exportar-notas                 # cria o esqueleto
supabase functions deploy exportar-notas --use-api    # publica (--use-api dispensa Docker)
supabase functions list
```

Para rodar localmente (precisa de Docker): `supabase start` e depois `supabase functions serve`.

## Secrets

```bash
supabase secrets set TITULO_EXPORTACAO="Notas do tutorial"
supabase secrets list
```

Na função: `Deno.env.get("TITULO_EXPORTACAO")`. `SUPABASE_URL` e as chaves do projeto já vêm disponíveis automaticamente.

## Chamando do app

```js
const { data, error } = await supabase.functions.invoke("exportar-notas", { method: "GET" });
```

`functions.invoke` envia o token da sessão sozinho.

## Logs

Dashboard → **Edge Functions → exportar-notas → Logs**.
