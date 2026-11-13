"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
})

export const useAdminAuth = () => useContext(AuthContext)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    fetch("/api/cms/auth", { cache: "no-store" })
      .then(response => setIsAuthenticated(response.ok))
      .catch(() => setIsAuthenticated(false))
  }, [])

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/cms/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) })
      setIsAuthenticated(response.ok)
      return response.ok
    } catch { return false }
  }

  const logout = () => {
    setIsAuthenticated(false)
    void fetch("/api/cms/auth", { method: "DELETE" })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
