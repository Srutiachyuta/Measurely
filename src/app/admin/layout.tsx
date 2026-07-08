"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAdminAuth, AdminAuthProvider } from "@/cms/lib/auth"
import { ToastProvider } from "@/cms/components/toast"
import { getEnabledPlugins } from "@/cms/plugins"
import * as LucideIcons from "lucide-react"
import { Menu, X, LogOut, Lock, Shield, BarChart3 } from "lucide-react"

function LoginGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login } = useAdminAuth()
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  if (isAuthenticated) return <>{children}</>

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="w-full max-w-sm mx-4">
        <div className="bg-dark-800 rounded-2xl shadow-2xl p-8 border border-dark-700">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">CMS Login</h1>
            <p className="text-dark-400 text-sm mt-1">Measurely Admin Panel</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!login(password)) setError(true)
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false) }}
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-400 text-sm mt-2">Invalid password</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="text-dark-500 text-xs text-center mt-6">
            Default password: admin123
          </p>
        </div>
      </div>
    </div>
  )
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const { logout } = useAdminAuth()
  const plugins = getEnabledPlugins()

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  const getIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (LucideIcons as any)[iconName]
    if (!Icon) return null
    return <Icon className="w-4 h-4 flex-shrink-0" />
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-dark-900 border-r border-dark-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-dark-800">
          <Link href="/admin" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-white font-semibold">Measurely CMS</span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-dark-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-0.5 overflow-y-auto h-[calc(100%-65px)]">
          {plugins.map((plugin) => (
            <Link
              key={plugin.href}
              href={plugin.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(plugin.href)
                  ? "bg-primary-600/20 text-primary-400"
                  : "text-dark-400 hover:text-white hover:bg-dark-800"
              }`}
            >
              {getIcon(plugin.icon)}
              <span>{plugin.name}</span>
              {plugin.badge && (
                <span className={`ml-auto text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                  plugin.badge === "new" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {plugin.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="border-t border-dark-800 pt-3 mt-3">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>View Site</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-dark-400 hover:text-red-400 hover:bg-dark-800 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <AdminAuthProvider>
      <LoginGate>
        <ToastProvider>
        <div className="min-h-screen bg-dark-950">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="lg:pl-64">
            <header className="sticky top-0 z-30 bg-dark-900/80 backdrop-blur-sm border-b border-dark-800">
              <div className="flex items-center justify-between px-4 py-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-dark-400 hover:text-white"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 ml-auto">
                  <Link
                    href="/"
                    className="text-xs text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    View Site
                  </Link>
                </div>
              </div>
            </header>
            <main className="p-6">{children}</main>
          </div>
        </div>
      </ToastProvider>
      </LoginGate>
    </AdminAuthProvider>
  )
}
