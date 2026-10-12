# Netlify CLI e deploy

O Netlify hospeda o app (`app/`) e o tutorial interativo (`app/public/tutorial/`) como site estático.

## Instalação e login

```bash
npm install -g --prefix ~/.local netlify-cli          # sem sudo
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
netlify login                                          # abre o navegador
netlify status
```

> O `brew install netlify-cli` também funciona, mas puxa muitas dependências (gcc, imagemagick…) e ocupa alguns GB.

## Configuração: `netlify.toml`

Fica na raiz do repositório:

```toml
[build]
  base = "app"
  command = "npm run build"
  publish = "dist"          # app/dist
```

Tanto a CLI quanto o deploy pelo GitHub leem esse arquivo.

## Criar e vincular o site

```bash
netlify sites:create --name meu-site        # cria e já vincula a pasta atual
netlify link                                # ou: vincula a um site que já existe
netlify open                                # abre o painel do site
```

O vínculo fica em `.netlify/state.json` (ignorado pelo Git). Este repositório usa o site **tutorial-notas-ventura**.

## Variáveis de ambiente

O Vite embute as variáveis `VITE_*` no build, então elas precisam existir **no Netlify**, e não só no seu `.env.local`:

```bash
netlify env:set VITE_SUPABASE_URL https://<ref>.supabase.co
netlify env:set VITE_SUPABASE_PUBLISHABLE_KEY sb_publishable_...
netlify env:list
```

> Só coloque aqui chaves que podem ir para o navegador. A `sb_secret_…` **nunca** entra num site estático.

## Build e deploy

```bash
netlify build                                  # build local, com as variáveis do site
netlify deploy --dir app/dist                  # deploy de rascunho (URL única)
netlify deploy --dir app/dist --prod           # produção
```

| Tipo | URL | Quem acessa |
|---|---|---|
| Rascunho | `https://<id>--tutorial-notas-ventura.netlify.app` | Só membros da equipe (pede login do Netlify) |
| Produção | `https://tutorial-notas-ventura.netlify.app` | Público |

## Supabase Auth com o site publicado

O `supabase/config.toml` usa a URL de produção como `site_url` e libera os rascunhos e o localhost nos redirects:

```toml
site_url = "https://tutorial-notas-ventura.netlify.app"
additional_redirect_urls = ["http://localhost:5173", "http://127.0.0.1:5173", "https://*--tutorial-notas-ventura.netlify.app"]
```

Aplique no projeto com `supabase config diff` e depois `supabase config push`.

## Outros comandos úteis

```bash
netlify logs:deploy          # logs do último deploy
netlify watch                # espera o deploy terminar
netlify sites:list
```
