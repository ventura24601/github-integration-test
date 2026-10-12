# Pull requests: do PR aberto ao merge

## Quando o Claude abre um PR

Ao pedir algo como *"faça commits pequenos e abra um PR"*, o Claude cria uma branch, faz os commits, envia ao GitHub (`git push`) e abre o PR (`gh pr create`). No app do Claude (aba Code), aparece esta barra no topo da sessão:

![Barra de PR no Claude: #1, github-integration-test, feat/tutorial-notas, +2.391 −69, CI](../../app/public/tutorial/img/barra-pr-claude.png)

| Parte da barra | O que significa |
|---|---|
| `#1` | Número do PR. Clique para abrir no GitHub. |
| `github-integration-test` | Repositório. |
| `feat/tutorial-notas` | Branch com as mudanças (vai entrar na `main`). |
| `+2.391 −69` | Linhas adicionadas e removidas. Clique para ver o diff. |
| `○ CI` | Status dos checks automáticos (GitHub Actions). `○` = nenhum check rodou ou ainda está rodando; ✓ verde = passou; ✗ vermelho = falhou. |
| `×` | Tira a barra da sessão. **Não** fecha o PR no GitHub. |

## O que fazer em seguida

1. **Revisar o diff.** Clique em `+2.391 −69` ou abra o PR no GitHub e leia a aba *Files changed*. Em PRs grandes, revise commit por commit (aba *Commits*): os micro commits existem para isso.
2. **Olhar o CI.** Se aparecer ✗, abra o menu do `CI` para ver qual check falhou. Você pode pedir ao Claude: *"veja por que o CI falhou e corrija"*. Se estiver `○` e o repositório não tiver workflows para PRs, não há nada a esperar.
3. **Testar localmente**, se for o caso (o próprio PR costuma ter uma seção "Como testar").
4. **Pedir ajustes.** Comente no GitHub ou peça direto ao Claude na mesma sessão. Ele faz novos commits na mesma branch e o PR se atualiza sozinho.
5. **Fazer o merge** quando estiver tudo certo:

```bash
gh pr merge 1 --squash --delete-branch   # junta tudo num commit só na main
gh pr merge 1 --merge --delete-branch    # mantém todos os micro commits na main
```

Ou pelo botão **Merge pull request** no GitHub.

6. **Atualizar a sua máquina:**

```bash
git checkout main
git pull
```

## Squash ou merge?

| Opção | Resultado na `main` | Quando usar |
|---|---|---|
| `--squash` | 1 commit com tudo | PRs pequenos, ou quando os commits intermediários não interessam |
| `--merge` | Todos os commits + 1 commit de merge | Quando o histórico detalhado (micro commits) é útil |
| `--rebase` | Todos os commits, sem commit de merge | Histórico linear com os commits originais |

## Desistir de um PR

```bash
gh pr close 1 --delete-branch
```
