"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
})

export const useAdminAuth = () => useContext(AuthContext)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("cms_auth")
    if (stored === "true") setIsAuthenticated(true)
  }, [])

  const login = (password: string): boolean => {
    const valid = password === "admin123" || password === process.env.NEXT_PUBLIC_CMS_PASSWORD
    if (valid) {
      setIsAuthenticated(true)
      sessionStorage.setItem("cms_auth", "true")
    }
    return valid
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("cms_auth")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
