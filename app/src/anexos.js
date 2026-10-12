// Módulo 4 — Storage: anexos no bucket privado `anexos`.
// Caminho: <user_id>/<nota_id>/<arquivo> — a política de Storage exige que a
// primeira pasta seja o id do usuário logado.
import { supabase } from "./supabase.js";

const BUCKET = "anexos";

export async function enviarAnexo(userId, notaId, arquivo) {
  const nomeSeguro = arquivo.name.replace(/[^\w.-]+/g, "_");
  const caminho = `${userId}/${notaId}/${Date.now()}-${nomeSeguro}`;
  const { error } = await supabase.storage.from(BUCKET).upload(caminho, arquivo);
  if (error) throw error;
  return caminho;
}

/** Bucket privado: gera um link temporário (60 s) em vez de URL pública. */
export async function linkDoAnexo(caminho) {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(caminho, 60);
  if (error) throw error;
  return data.signedUrl;
}

export async function apagarAnexo(caminho) {
  const { error } = await supabase.storage.from(BUCKET).remove([caminho]);
  if (error) throw error;
}
