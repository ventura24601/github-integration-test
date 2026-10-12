// Módulo 2 — Banco: CRUD da tabela `notas`.
// Não filtramos por user_id: o RLS já garante que cada usuário só veja as próprias notas.
import { supabase } from "./supabase.js";

export async function listarNotas() {
  const { data, error } = await supabase
    .from("notas")
    .select("*")
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return data;
}

export async function criarNota({ titulo, conteudo }) {
  // user_id é preenchido pelo default `auth.uid()` da coluna.
  const { data, error } = await supabase.from("notas").insert({ titulo, conteudo }).select().single();
  if (error) throw error;
  return data;
}

export async function atualizarNota(id, campos) {
  const { data, error } = await supabase.from("notas").update(campos).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function apagarNota(id) {
  const { error } = await supabase.from("notas").delete().eq("id", id);
  if (error) throw error;
}
