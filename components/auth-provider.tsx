"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase-client"
import type { User } from "@supabase/supabase-js"
import type { AuthChangeEvent } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Create supabase client once and reuse
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Error getting session:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes & token-refresh failures
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session) => {
      if (event === "SIGNED_OUT") {
        // refresh token is invalid or user signed out elsewhere ─ purge auth state
        await supabase.auth.signOut().catch(() => {}) // best-effort
        setUser(null)
        setLoading(false)
        // eslint-disable-next-line no-restricted-globals
        if (location.pathname !== "/login") window.location.href = "/login"
        return
      }

      // normal auth events
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = "/"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
}
