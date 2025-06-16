import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Client-side Supabase client (singleton)
let supabaseClient: ReturnType<typeof createClientComponentClient> | null = null

export const createClient = () => {
  // Only create a new client if one doesn't exist (client-side only)
  if (typeof window !== "undefined" && !supabaseClient) {
    supabaseClient = createClientComponentClient()
  }

  // For server-side, always create a new instance
  if (typeof window === "undefined") {
    return createClientComponentClient()
  }

  return supabaseClient!
}

// Server-side client - separate function to avoid import issues
export const createServerClient = async () => {
  const cookieStore = await cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}
