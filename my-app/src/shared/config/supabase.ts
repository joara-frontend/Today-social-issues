import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/entities/issue/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Client-side / RSC read access (anon key, RLS-enforced).
 * `null` until NEXT_PUBLIC_SUPABASE_URL/ANON_KEY are set in `.env.local` —
 * callers should treat a null client as "no backend connected yet".
 */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;

/** Server-only client for the cron job — bypasses RLS via the service role key. */
export function createSupabaseAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
