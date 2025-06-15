import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Client-side Supabase client (singleton)
let supabaseClient: ReturnType<typeof createClientComponentClient> | null = null

export const createClient = () => {
  // Only create a new client if one doesn't exist
  if (typeof window !== "undefined" && !supabaseClient) {
    supabaseClient = createClientComponentClient()
  }

  // For server-side, always create a new instance
  if (typeof window === "undefined") {
    return createClientComponentClient()
  }

  return supabaseClient!
}

export const createServerClient = () => createServerComponentClient({ cookies })
