"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { Menu, X, Zap } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, signOut } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    })
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-white/20 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Zap className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-200" />
              <span className="font-bold text-xl text-white text-shadow group-hover:scale-105 transition-transform duration-200">
                MarketingAI Pro
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/generate">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                    Generate
                  </Button>
                </Link>
                <Link href="/copy">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                    Copy
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                    Templates
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                    Settings
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline" className="btn-secondary">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="btn-primary">Get Started</Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white hover:bg-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/20 slide-in-right">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/generate"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Generate
                </Link>
                <Link
                  href="/copy"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Copy
                </Link>
                <Link
                  href="/templates"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Templates
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <Button onClick={handleSignOut} className="w-full mt-2 btn-secondary">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full mt-2 btn-primary">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
