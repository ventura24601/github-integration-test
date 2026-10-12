# Supabase CLI — instalação e login

## Instalação (macOS)

```bash
brew install supabase/tap/supabase
supabase --version
```

Atualizar:

```bash
brew upgrade supabase
```

## Login

```bash
supabase login
```

Abre o navegador para autorizar a CLI e guarda o token no keychain do macOS. Para conferir:

```bash
supabase projects list
```

### Login sem navegador (CI, servidores)

Gere um token em <https://supabase.com/dashboard/account/tokens> e exporte a variável:

```bash
export SUPABASE_ACCESS_TOKEN=<token>
```

No GitHub Actions, salve como secret (`gh secret set SUPABASE_ACCESS_TOKEN`) em vez de exportar.

## Docker (para rodar o Supabase local)

Comandos como `supabase start`, `supabase db reset` e `supabase functions serve` sobem containers locais e precisam de Docker rodando. Opções no macOS:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [OrbStack](https://orbstack.dev/) (mais leve)

Os comandos que só falam com o projeto remoto (`projects list`, `link`, `db push`, `functions deploy`) **não** precisam de Docker.
