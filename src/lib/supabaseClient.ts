import { createClient, SupabaseClient } from "@supabase/supabase-js";

// These environment variables must be set in .env.local
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single Supabase client instance
export const supabase: SupabaseClient = createClient(
	supabaseUrl,
	supabaseAnonKey
);
