# 2 — Interface web (Vite + supabase-js)

Pasta: [`app/`](../../app)

```
app/
├── index.html            # telas de login e de notas
├── .env.example          # modelo do .env.local
└── src/
    ├── supabase.js       # createClient (um cliente para o app todo)
    ├── main.js           # liga botões e formulários aos módulos
    ├── notas.js          # módulo 2: CRUD
    ├── auth.js           # módulo 3
    ├── anexos.js         # módulo 4
    ├── realtime.js       # módulo 5
    ├── exportar.js       # módulo 6
    └── database.types.ts # módulo 7 (gerado)
```

## Criando o cliente

```js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
```

No Vite, só variáveis com o prefixo `VITE_` chegam ao navegador. Por isso a secret key **nunca** deve ter esse prefixo.

## CRUD

```js
await supabase.from("notas").select("*").order("criado_em", { ascending: false });
await supabase.from("notas").insert({ titulo, conteudo }).select().single();
await supabase.from("notas").update({ titulo }).eq("id", id);
await supabase.from("notas").delete().eq("id", id);
```

Repare que não há nenhum `.eq("user_id", …)`: o RLS já filtra pelo usuário logado, e o `insert` preenche `user_id` pelo default da coluna.

## Rodar

```bash
cd app
npm install
npm run dev     # http://localhost:5173
npm run build   # gera app/dist (estático, pode ir para Vercel, Netlify, GitHub Pages…)
```
