// Módulo 3 — Auth: cadastro, login e logout por e-mail e senha.
import { supabase } from "./supabase.js";

export async function cadastrar(email, senha) {
  const { data, error } = await supabase.auth.signUp({ email, password: senha });
  if (error) throw error;
  // Com "Confirm email" ligado no projeto, a sessão só vem depois da confirmação.
  return { precisaConfirmar: !data.session };
}

export async function entrar(email, senha) {
  const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) throw error;
}

export async function sair() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** Chama `callback(session)` agora e a cada login/logout. */
export function aoMudarSessao(callback) {
  supabase.auth.onAuthStateChange((_evento, session) => callback(session));
}
