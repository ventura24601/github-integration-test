# github-integration-test

Repositório de teste usado para validar a integração com o GitHub.

## Objetivo

Este repositório existe apenas para verificar se os fluxos básicos de integração com o GitHub funcionam corretamente, como:

- Clonar o repositório
- Criar commits e enviá-los (`git push`)
- Criar branches
- Abrir, revisar e fazer merge de pull requests
- Executar checks de CI (quando configurados)

## Como usar

Clone o repositório:

```bash
git clone https://github.com/ventura24601/github-integration-test.git
cd github-integration-test
```

Crie uma branch, faça uma alteração e envie:

```bash
git checkout -b teste/minha-alteracao
echo "teste" >> teste.txt
git add teste.txt
git commit -m "Teste de integração"
git push -u origin teste/minha-alteracao
```

Em seguida, abra um pull request no GitHub para validar o fluxo completo.

## Observações

- O conteúdo deste repositório não tem valor de produção.
- Arquivos e branches podem ser criados e removidos livremente durante os testes.
