import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Service role client — bypasses RLS, server-side only
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseServiceKey) {
  console.warn("SUPABASE_SERVICE_ROLE_KEY is not set. Admin client will not work.")
}

export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey ?? "placeholder"
)
