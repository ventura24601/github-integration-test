#!/usr/bin/env bash
# Verifica se as ferramentas usadas neste guia estão instaladas e autenticadas.

check() {
  if command -v "$1" >/dev/null 2>&1; then
    printf "✅ %-10s %s\n" "$1" "$($1 --version 2>/dev/null | head -1)"
  else
    printf "❌ %-10s não instalado — %s\n" "$1" "$2"
  fi
}

echo "== Ferramentas =="
check git      "xcode-select --install"
check gh       "brew install gh"
check supabase "brew install supabase/tap/supabase"
check docker   "instale o Docker Desktop ou OrbStack (necessário para supabase start)"
check node     "brew install node"
check netlify  "npm install -g --prefix ~/.local netlify-cli (e adicione ~/.local/bin ao PATH)"

echo
echo "== Autenticação =="
if gh auth status >/dev/null 2>&1; then echo "✅ GitHub CLI autenticado"; else echo "❌ GitHub CLI: rode 'gh auth login'"; fi
if supabase projects list </dev/null >/dev/null 2>&1; then echo "✅ Supabase CLI autenticado"; else echo "❌ Supabase CLI: rode 'supabase login'"; fi
if netlify status </dev/null 2>/dev/null | grep -q "Email:"; then echo "✅ Netlify CLI autenticado"; else echo "❌ Netlify CLI: rode 'netlify login'"; fi
