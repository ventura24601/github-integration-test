// Cliente único do Supabase, compartilhado por todo o app.
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error("Faltam VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY em app/.env.local");
}

/** @type {import("@supabase/supabase-js").SupabaseClient<import("./database.types").Database>} */
export const supabase = createClient(url, key);
