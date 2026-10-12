# Git básico

Referência rápida dos comandos de Git usados no dia a dia.

## Configuração inicial (uma vez por máquina)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
git config --global init.defaultBranch main
```

## Começar um repositório

```bash
# Repositório novo
git init
git remote add origin https://github.com/<usuario>/<repo>.git

# Repositório existente
git clone https://github.com/<usuario>/<repo>.git
```

## Fluxo diário

```bash
git status                      # o que mudou
git pull                        # trazer alterações do remoto
git checkout -b feat/minha-mudanca   # nova branch
git add <arquivo>               # preparar arquivos (ou: git add .)
git commit -m "Descreve a mudança"
git push -u origin feat/minha-mudanca
```

## Consultar histórico

```bash
git log --oneline --graph -20
git diff                        # mudanças não preparadas
git diff --staged               # mudanças preparadas para commit
```

## Desfazer coisas (com cuidado)

```bash
git restore <arquivo>           # descarta mudanças locais de um arquivo
git restore --staged <arquivo>  # tira do "add", mantém a mudança
git commit --amend              # corrige o último commit (só se ainda não fez push)
git revert <hash>               # cria um commit que desfaz outro (seguro após push)
```

## Convenção de nomes de branch

| Prefixo   | Uso                          |
|-----------|------------------------------|
| `feat/`   | nova funcionalidade          |
| `fix/`    | correção de bug              |
| `docs/`   | documentação                 |
| `chore/`  | manutenção, configs          |
