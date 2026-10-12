# Edge Functions, secrets e tipos

## Edge Functions

Funções serverless em TypeScript (Deno) que ficam em `supabase/functions/<nome>/index.ts`.

```bash
supabase functions new ola-mundo          # cria o esqueleto
supabase functions serve                  # roda localmente (precisa de Docker)
supabase functions deploy ola-mundo       # publica no projeto vinculado
supabase functions list
```

Testar localmente:

```bash
curl -i http://localhost:54321/functions/v1/ola-mundo \
  -H "Authorization: Bearer <anon-key do supabase status>" \
  -d '{"name":"Danilo"}'
```

## Secrets das funções

```bash
supabase secrets set MINHA_API_KEY=valor
supabase secrets set --env-file supabase/functions/.env   # vários de uma vez
supabase secrets list
supabase secrets unset MINHA_API_KEY
```

Dentro da função: `Deno.env.get("MINHA_API_KEY")`.

## Gerar tipos TypeScript do banco

```bash
supabase gen types typescript --linked > types/database.types.ts   # do projeto remoto
supabase gen types typescript --local  > types/database.types.ts   # do banco local
```

Uso com `@supabase/supabase-js`:

```ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/database.types";

const supabase = createClient<Database>(URL, ANON_KEY);
```
