# Criar um repositório novo e clonar localmente

Há três caminhos. Todos terminam com uma pasta local ligada a um repositório no GitHub.

## Opção 1 — Pedir ao Claude (Claude Code)

Abra o Claude Code na pasta onde você guarda seus projetos (por exemplo `~/Documents/Projects`) e peça em linguagem natural:

> Crie um repositório privado no GitHub chamado `meu-projeto`, com README e .gitignore de Node, e clone ele em ~/Documents/Projects/meu-projeto.

Por baixo dos panos, o Claude usa o `gh` (que já está autenticado) e o `git`, ou seja, exatamente os comandos da opção 2. Outros pedidos úteis:

> Clone o repositório `ventura24601/github-integration-test` aqui.

> Transforme esta pasta num repositório Git, crie o repo no GitHub como privado e faça o primeiro push.

> Crie uma branch, faça commits pequenos das mudanças e abra um PR.

Dica: depois de clonar, abra uma nova sessão do Claude Code **dentro** da pasta do projeto para ele trabalhar no contexto certo.

## Opção 2 — Terminal com `gh` (mais rápido)

```bash
# Cria no GitHub e já clona na pasta atual
gh repo create meu-projeto --private --add-readme --gitignore Node --clone
cd meu-projeto
```

Já tem uma pasta local com código e quer subir para um repo novo:

```bash
cd minha-pasta
git init
git add .
git commit -m "Primeiro commit"
gh repo create meu-projeto --private --source=. --push
```

## Opção 3 — Site do GitHub + `git clone`

1. Acesse <https://github.com/new>, preencha o nome, escolha **Private** e marque **Add a README file**.
2. Clique em **Create repository**.
3. No botão verde **Code**, copie a URL HTTPS.
4. No terminal:

```bash
cd ~/Documents/Projects
git clone https://github.com/<usuario>/meu-projeto.git
cd meu-projeto
```

## Conferir se está tudo ligado

```bash
git remote -v        # deve mostrar origin → github.com/<usuario>/meu-projeto
git status           # deve mostrar "On branch main"
gh repo view --web   # abre o repo no navegador
```

## Clonar um repositório que já existe

```bash
gh repo clone <usuario>/<repo>                        # usando gh
git clone https://github.com/<usuario>/<repo>.git     # usando só git
gh repo list                                          # lista seus repos para achar o nome
```
