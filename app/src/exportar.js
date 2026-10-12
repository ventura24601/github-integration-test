// Módulo 6 — Edge Function: chama `exportar-notas` e baixa o Markdown.
// functions.invoke envia o access token da sessão automaticamente.
import { supabase } from "./supabase.js";

export async function exportarNotas() {
  const { data, error } = await supabase.functions.invoke("exportar-notas", { method: "GET" });
  if (error) throw error;

  const blob = data instanceof Blob ? data : new Blob([data], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "notas.md";
  link.click();
  URL.revokeObjectURL(link.href);
}
