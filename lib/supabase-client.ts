// lib/supabase-client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Don’t crash the client; allow callers to fall back gracefully
    if (typeof window !== 'undefined') {
      console.warn('Supabase env vars missing on client; using local fallbacks');
    }
    return null as any;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
