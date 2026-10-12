// Exporta as notas do usuário logado como um arquivo Markdown.
//
// - auth: "user" exige um JWT válido (o access token da sessão do app).
// - ctx.supabase já vem com o token do usuário, então o RLS garante que só
//   as notas dele sejam lidas.
// - TITULO_EXPORTACAO é um secret opcional (supabase secrets set TITULO_EXPORTACAO=...).
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase({ auth: "user" }, async (_req, ctx) => {
    const { data: notas, error } = await ctx.supabase
      .from("notas")
      .select("titulo, conteudo, anexo_path, criado_em")
      .order("criado_em", { ascending: true });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const titulo = Deno.env.get("TITULO_EXPORTACAO") ?? "Minhas notas";
    const linhas = [
      `# ${titulo}`,
      "",
      `Exportado para ${ctx.userClaims?.email ?? "usuário"} em ${new Date().toISOString()}`,
      `Total: ${notas.length} nota(s)`,
    ];

    for (const nota of notas) {
      linhas.push("", `## ${nota.titulo}`, "", nota.conteudo || "_(sem conteúdo)_");
      if (nota.anexo_path) linhas.push("", `Anexo: \`${nota.anexo_path}\``);
    }

    return new Response(linhas.join("\n") + "\n", {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": 'attachment; filename="notas.md"',
      },
    });
  }),
};

/* Para testar (com o app rodando, pegue o access token da sessão):

  curl -i https://<project-ref>.supabase.co/functions/v1/exportar-notas \
    --header "Authorization: Bearer <access_token>"

*/
