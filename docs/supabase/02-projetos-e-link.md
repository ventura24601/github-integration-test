# Projetos Supabase e vínculo com o repositório

## Listar e criar projetos

```bash
supabase orgs list
supabase projects list
supabase projects create meu-projeto --org-id <org-id> --region sa-east-1 --db-password <senha>
```

> `sa-east-1` = São Paulo. A coluna `REFERENCE ID` de `projects list` é o `project-ref` usado nos próximos comandos.

## Inicializar a pasta `supabase/` num repositório

```bash
supabase init
```

Cria:

```
supabase/
├── config.toml     # configuração do ambiente local (portas, auth, storage…)
├── migrations/     # (criada depois) SQL versionado do banco
├── functions/      # (criada depois) Edge Functions
└── seed.sql        # (opcional) dados de teste para o banco local
```

Tudo em `supabase/` vai para o Git, exceto `.temp/` e `.branches/` (já ignorados).

## Vincular o repositório a um projeto remoto

```bash
supabase link --project-ref <project-ref>
```

Pede a senha do banco (ou use `SUPABASE_DB_PASSWORD`). Depois disso, os comandos com `--linked` ou sem `--project-ref` passam a usar esse projeto.

Para trocar de projeto, basta rodar `supabase link` de novo com outro ref.

## Ambiente local

```bash
supabase start      # sobe Postgres, Auth, Storage, Studio… (precisa de Docker)
supabase status     # mostra URLs e chaves locais
supabase stop       # desliga
```

Studio local: <http://localhost:54323>
