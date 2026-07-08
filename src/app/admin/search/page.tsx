"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { getEnabledPlugins } from "@/cms/plugins"
import { Search as SearchIcon, FileText, Calculator, Image, FolderTree, Hash, ExternalLink, Loader2, Command, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"
import { calculators } from "@/data/calculators"
import { blogs } from "@/data/blogs"
import { CATEGORIES } from "@/lib/constants"
import { comparisons } from "@/data/comparisons"
import { readJsonFile } from "@/cms/lib/api"
import type { CmsMediaItem, CmsTag, CmsAuthor } from "@/cms/types"

interface SearchResult {
  type: "tool" | "article" | "page" | "category" | "comparison" | "media" | "tag" | "author"
  title: string
  href: string
  description: string
  badge?: string
}

const QUICK_ACTIONS = [
  { label: "Browse Tools", href: "/admin/tools", icon: Calculator, shortcut: "G T" },
  { label: "Write Article", href: "/admin/articles", icon: FileText, shortcut: "G A" },
  { label: "Media Library", href: "/admin/media", icon: Image, shortcut: "G M" },
  { label: "SEO Manager", href: "/admin/seo", icon: TrendingUp, shortcut: "G S" },
  { label: "Categories", href: "/admin/categories", icon: FolderTree, shortcut: "G C" },
  { label: "Schema Engine", href: "/admin/schema", icon: Hash, shortcut: "G H" },
  { label: "Site Audit", href: "/admin/audit", icon: Zap, shortcut: "G U" },
  { label: "Dashboard", href: "/admin", icon: Command, shortcut: "G D" },
]

export default function SiteSearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [media, setMedia] = useState<CmsMediaItem[]>([])
  const [tags, setTags] = useState<CmsTag[]>([])
  const [authors, setAuthors] = useState<CmsAuthor[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    Promise.all([
      readJsonFile<CmsMediaItem[]>("media.json").catch(() => []),
      readJsonFile<CmsTag[]>("tags.json").catch(() => []),
      readJsonFile<CmsAuthor[]>("authors.json").catch(() => []),
    ]).then(([m, t, a]) => {
      setMedia(Array.isArray(m) ? m : [])
      setTags(Array.isArray(t) ? t : [])
      setAuthors(Array.isArray(a) ? a : [])
    })
  }, [])

  const plugins = getEnabledPlugins()
  const adminPages = useMemo(() => plugins.map((p) => ({
    type: "page" as const, title: p.name, href: p.href, description: p.description, badge: p.badge,
  })), [plugins])

  const handleSearch = useCallback((q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return }
    setSearched(true)
    const query = q.toLowerCase()
    const found: SearchResult[] = []

    calculators.filter((c) => c.name.toLowerCase().includes(query) || c.slug.includes(query) || c.description.toLowerCase().includes(query) || c.category.includes(query))
      .slice(0, 8).forEach((c) => found.push({ type: "tool", title: c.name, href: `/admin/tools/${c.slug}`, description: c.description, badge: c.category }))

    blogs.filter((b) => b.title.toLowerCase().includes(query) || b.slug.includes(query) || b.excerpt.toLowerCase().includes(query) || b.tags.some((t: string) => t.includes(query)))
      .slice(0, 8).forEach((b) => found.push({ type: "article", title: b.title, href: `/admin/articles/${b.slug}`, description: b.excerpt, badge: b.category }))

    CATEGORIES.filter((c) => c.name.toLowerCase().includes(query) || c.slug.includes(query) || c.description.toLowerCase().includes(query))
      .slice(0, 5).forEach((c) => found.push({ type: "category", title: c.name, href: `/admin/categories`, description: c.description, badge: c.slug }))

    comparisons.filter((c) => c.name.toLowerCase().includes(query) || c.slug.includes(query))
      .slice(0, 5).forEach((c) => found.push({ type: "comparison", title: c.name, href: `/${c.slug}`, description: `${c.slug} comparison` }))

    media.filter((m) => m.filename.toLowerCase().includes(query) || m.originalName.toLowerCase().includes(query) || m.altText?.toLowerCase().includes(query))
      .slice(0, 5).forEach((m) => found.push({ type: "media", title: m.originalName || m.filename, href: `/admin/media`, description: `${m.width}x${m.height} · ${(m.fileSize / 1024).toFixed(0)}KB`, badge: m.type }))

    tags.filter((t) => t.name.toLowerCase().includes(query))
      .slice(0, 5).forEach((t) => found.push({ type: "tag", title: t.name, href: `/admin/tags`, description: `${t.count || 0} items` }))

    authors.filter((a) => a.name.toLowerCase().includes(query))
      .slice(0, 5).forEach((a) => found.push({ type: "author", title: a.name, href: `/admin/authors`, description: a.role || "Author" }))

    adminPages.filter((p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
      .slice(0, 8).forEach((p) => found.push({ type: "page", title: p.title, href: p.href, description: p.description, badge: p.badge }))

    setResults(found)
  }, [media, tags, authors, adminPages])

  useEffect(() => {
    const timer = setTimeout(() => handleSearch(query), 150)
    return () => clearTimeout(timer)
  }, [query, handleSearch])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "tool": return <Calculator className="w-4 h-4 text-blue-400" />
      case "article": return <FileText className="w-4 h-4 text-green-400" />
      case "category": return <FolderTree className="w-4 h-4 text-amber-400" />
      case "comparison": return <SearchIcon className="w-4 h-4 text-purple-400" />
      case "media": return <Image className="w-4 h-4 text-cyan-400" />
      case "tag": return <Hash className="w-4 h-4 text-pink-400" />
      case "author": return <FileText className="w-4 h-4 text-indigo-400" />
      default: return <Command className="w-4 h-4 text-dark-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <SearchIcon className="w-6 h-6" /> Global Search
        </h1>
        <p className="text-dark-400 mt-1">Search across tools, articles, categories, media, and admin pages. Press <kbd className="px-1.5 py-0.5 bg-dark-700 rounded text-xs text-dark-200 font-mono">Ctrl+K</kbd> to focus.</p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
        <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-dark-800 border-2 border-dark-700 focus:border-primary-500 rounded-xl text-white placeholder-dark-400 text-lg focus:outline-none transition-colors"
          placeholder="Search anything... (Ctrl+K)" autoFocus />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-white text-sm">Clear</button>
        )}
      </div>

      {!searched && !query && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.label} href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-primary-500/30 hover:bg-dark-800 transition-all text-center group">
                <Icon className="w-6 h-6 text-primary-400 group-hover:scale-110 transition-transform" />
                <span className="text-dark-300 text-sm">{action.label}</span>
                <span className="text-dark-600 text-[10px] font-mono">{action.shortcut}</span>
              </Link>
            )
          })}
        </div>
      )}

      {searched && (
        <div className="space-y-2">
          <p className="text-dark-400 text-sm">
            {results.length > 0 ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"` : `No results for "${query}"`}
          </p>
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((r, i) => (
                <Link key={`${r.type}-${r.href}-${i}`} href={r.href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-dark-800/50 hover:bg-dark-800 border border-dark-700 hover:border-dark-600 transition-all group">
                  <div className="w-9 h-9 rounded-lg bg-dark-900 flex items-center justify-center flex-shrink-0">
                    {getIcon(r.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        r.type === "tool" ? "bg-blue-500/10 text-blue-400" :
                        r.type === "article" ? "bg-green-500/10 text-green-400" :
                        r.type === "category" ? "bg-amber-500/10 text-amber-400" :
                        r.type === "comparison" ? "bg-purple-500/10 text-purple-400" :
                        r.type === "media" ? "bg-cyan-500/10 text-cyan-400" :
                        r.type === "tag" ? "bg-pink-500/10 text-pink-400" :
                        r.type === "author" ? "bg-indigo-500/10 text-indigo-400" :
                        "bg-dark-700 text-dark-400"
                      }`}>{r.type}</span>
                      {r.badge && <span className="text-[10px] text-dark-500">{r.badge}</span>}
                    </div>
                    <p className="text-white text-sm font-medium truncate">{r.title}</p>
                    <p className="text-dark-400 text-xs truncate">{r.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-dark-600 group-hover:text-primary-400 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-12 text-center">
              <SearchIcon className="w-12 h-12 text-dark-600 mx-auto mb-3" />
              <p className="text-dark-400">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-dark-500 text-xs mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
