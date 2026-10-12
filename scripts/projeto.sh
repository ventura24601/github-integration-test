#!/usr/bin/env bash
# Escolhe (ou cria) o projeto Supabase usado por este repositório:
#   1. lista seus projetos
#   2. vincula um existente ou cria um novo
#   3. grava .env (raiz) e app/.env.local com URL e publishable key
set -euo pipefail
cd "$(dirname "$0")/.."

command -v supabase >/dev/null || { echo "Instale a CLI: brew install supabase/tap/supabase"; exit 1; }
supabase projects list </dev/null >/dev/null 2>&1 || { echo "Faça login primeiro: supabase login"; exit 1; }

json() { python3 -c "import json,sys; d=json.load(sys.stdin); $1"; }
# </dev/null: a CLI não deve consumir as respostas digitadas para os `read` do script.
sb() { supabase "$@" </dev/null; }

echo "== Seus projetos =="
sb projects list --output-format json 2>/dev/null | json '
for i, p in enumerate(d.get("projects", d) if isinstance(d, dict) else d, 1):
    print("  %d) %-30s %s  %s  %s" % (i, p["name"], p["ref"], p["region"], p["status"]))'
echo "  n) criar um projeto novo"
echo
read -rp "Escolha: " escolha

if [[ "$escolha" == "n" ]]; then
  sb orgs list
  read -rp "Org ID: " org
  read -rp "Nome do projeto: " nome
  read -rp "Região [sa-east-1]: " regiao
  regiao=${regiao:-sa-east-1}
  # Senha gerada e mantida só em variável; a CLI não precisa dela depois (usa role temporária).
  senha=$(openssl rand -base64 32 | tr -dc 'A-Za-z0-9' | head -c 28)
  ref=$(sb projects create "$nome" --org-id "$org" --region "$regiao" --db-password "$senha" \
        --output-format json 2>/dev/null | sed -n 's/.*"ref":"\([a-z]*\)".*/\1/p')
  [[ -n "$ref" ]] || { echo "Falha ao criar o projeto."; exit 1; }
  echo "Projeto criado: $ref"
else
  ref=$(sb projects list --output-format json 2>/dev/null | json "
ps = d.get('projects', d) if isinstance(d, dict) else d
print(ps[int('$escolha') - 1]['ref'])")
  senha=""
fi

sb link --project-ref "$ref"

umask 077
printf 'SUPABASE_ACCESS_TOKEN=\nSUPABASE_PROJECT_REF=%s\nSUPABASE_DB_PASSWORD=%s\n' "$ref" "$senha" > .env

chave=$(sb projects api-keys --project-ref "$ref" --output-format json 2>/dev/null | json '
ks = d if isinstance(d, list) else d.get("keys", d)
print(next(k["api_key"] for k in ks if k.get("type") == "publishable"))')
printf 'VITE_SUPABASE_URL=https://%s.supabase.co\nVITE_SUPABASE_PUBLISHABLE_KEY=%s\n' "$ref" "$chave" > app/.env.local

echo
echo "✅ Vinculado a $ref. Gravados .env e app/.env.local."
echo "Próximo passo: supabase db push   (aplica as migrations neste projeto)"
