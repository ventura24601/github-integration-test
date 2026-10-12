# Netlify + GitHub Actions

Workflow: [`.github/workflows/netlify-deploy.yml`](../../.github/workflows/netlify-deploy.yml)

| Evento | O que acontece |
|---|---|
| Push na `main` (mudou `app/**` ou `netlify.toml`) | Deploy de **produção** |
| Pull request | Deploy de **preview** em `pr-<número>--tutorial-notas-ventura.netlify.app` e um comentário no PR com o link |
| Manual (`gh workflow run`) | Deploy de produção |

É o mesmo padrão do workflow da Supabase: sem os secrets, o job termina com um aviso em vez de falhar.

## Ativar

1. Gere um token pessoal em **Netlify → User settings → Applications → Personal access tokens** (<https://app.netlify.com/user/applications#personal-access-tokens>).
2. Pegue o ID do site:

```bash
cat .netlify/state.json        # campo "siteId"
```

3. Cadastre os secrets (cada comando pede o valor):

```bash
gh secret set NETLIFY_AUTH_TOKEN
gh secret set NETLIFY_SITE_ID
```

4. Teste:

```bash
gh workflow run netlify-deploy.yml
gh run watch
```

## Por que Actions, e não a integração Git do Netlify?

O Netlify também se conecta direto ao GitHub (`netlify init` ou **Site configuration → Build & deploy → Link repository**) e faz build e deploy sozinho a cada push. As duas opções funcionam. Aqui usamos Actions porque:

- fica igual ao fluxo da Supabase: tudo visível em `gh run list` e no `CI` da barra de PR;
- o build e o deploy ficam versionados no repositório.

Se preferir a integração nativa, rode `netlify init` e **apague** o `netlify-deploy.yml` para não publicar duas vezes.
