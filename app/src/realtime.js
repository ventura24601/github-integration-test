// Módulo 5 — Realtime: escuta inserts/updates/deletes na tabela `notas`.
// O RLS também vale aqui: só chegam eventos das notas do próprio usuário.
import { supabase } from "./supabase.js";

let canal = null;

export function escutarNotas(aoMudar, aoMudarStatus) {
  pararDeEscutar();
  canal = supabase
    .channel("notas-do-usuario")
    .on("postgres_changes", { event: "*", schema: "public", table: "notas" }, aoMudar)
    .subscribe((status) => aoMudarStatus(status));
}

export function pararDeEscutar() {
  if (canal) supabase.removeChannel(canal);
  canal = null;
}
