# 3 — Auth (e-mail e senha)

Arquivo: [`app/src/auth.js`](../../app/src/auth.js)

```js
await supabase.auth.signUp({ email, password });              // criar conta
await supabase.auth.signInWithPassword({ email, password });  // entrar
await supabase.auth.signOut();                                // sair

supabase.auth.onAuthStateChange((evento, session) => {
  // chamado no carregamento e a cada login/logout
});
```

A sessão fica salva no `localStorage`, então recarregar a página mantém o usuário logado. O supabase-js renova o token sozinho.

## Confirmação de e-mail

- **Ligada** (padrão em projetos novos): `signUp` não devolve sessão. O usuário precisa clicar no link do e-mail, que redireciona para o `site_url`.
- **Desligada** (como no `config.toml` deste tutorial): `signUp` já devolve a sessão.

O servidor de e-mail padrão da Supabase tem um limite baixo de envios por hora. Para produção, configure um SMTP próprio em **Authentication → Emails → SMTP Settings**.

## Ver e gerenciar usuários

- Dashboard → **Authentication → Users**
- O `user.id` é o mesmo valor de `auth.uid()` usado nas políticas de RLS e de Storage.

## Outros métodos (não usados aqui)

```js
supabase.auth.signInWithOtp({ email });                 // link mágico / código
supabase.auth.signInWithOAuth({ provider: "github" });  // login social
```

Os provedores sociais são habilitados em **Authentication → Sign In / Providers** ou no `config.toml` (`[auth.external.github]`).
