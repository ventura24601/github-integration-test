# GitHub CLI (`gh`)

O `gh` permite fazer quase tudo do GitHub pelo terminal: criar repositórios, abrir PRs, ver CI, gerenciar secrets.

## Instalação e login

```bash
brew install gh
gh auth login          # escolha GitHub.com → HTTPS → login pelo navegador
gh auth status         # confere se está autenticado
```

## Repositórios

```bash
gh repo create meu-projeto --private --source=. --push   # cria no GitHub a partir da pasta atual
gh repo clone <usuario>/<repo>
gh repo view --web                                       # abre o repo no navegador
gh repo list                                             # lista seus repositórios
```

## Pull requests

```bash
gh pr create --fill               # cria PR usando o título/corpo dos commits
gh pr create --draft              # PR em rascunho
gh pr list
gh pr view <numero> --web
gh pr checkout <numero>           # baixa a branch de um PR
gh pr checks                      # status do CI do PR atual
gh pr merge <numero> --squash --delete-branch
```

## Issues

```bash
gh issue create --title "Bug X" --body "Descrição"
gh issue list
gh issue close <numero>
```

## GitHub Actions

```bash
gh run list                       # execuções recentes
gh run watch                      # acompanha a execução em andamento
gh run view <id> --log-failed     # log só das etapas que falharam
gh workflow run <arquivo.yml>     # dispara um workflow manualmente
```

## Secrets (usados pelo CI)

```bash
gh secret set SUPABASE_ACCESS_TOKEN      # pede o valor de forma interativa
gh secret list
```

> Nunca coloque o valor do secret direto no comando — ele fica salvo no histórico do shell.
