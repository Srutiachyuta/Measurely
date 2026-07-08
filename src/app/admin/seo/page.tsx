"use client"

import { useState, useMemo, useEffect } from "react"
import { calculators } from "@/data/calculators"
import { blogs } from "@/data/blogs"
import { comparisons } from "@/data/comparisons"
import { CATEGORIES } from "@/lib/constants"
import { getSeoOverrides, saveSeoOverride } from "@/cms/services/seo-service"
import type { SeoOverride } from "@/cms/types"
import { Search, Save, AlertTriangle, CheckCircle, X, ExternalLink } from "lucide-react"

interface SeoItem {
  slug: string
  title: string
  type: "tool" | "article" | "comparison" | "category"
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  robots: string
  ogImage: string
  hasOverride: boolean
}

export default function SeoManager() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState<"tools" | "articles" | "comparisons" | "categories">("tools")
  const [overrides, setOverrides] = useState<SeoOverride[]>([])
  const [saving, setSaving] = useState<string | null>(null)
  const [savedSlug, setSavedSlug] = useState<string | null>(null)

  useEffect(() => {
    getSeoOverrides().then(setOverrides)
  }, [])

  const getOverride = (slug: string, type: string): SeoOverride | undefined => {
    return overrides.find((o) => o.slug === slug && o.type === type)
  }

  const items: SeoItem[] = useMemo(() => {
    const result: SeoItem[] = []
    const source = tab === "tools" ? calculators : tab === "articles" ? blogs : tab === "comparisons" ? comparisons : CATEGORIES
    const type = tab === "tools" ? "tool" : tab === "articles" ? "article" : tab === "comparisons" ? "comparison" : "category"

    for (const item of source as any[]) {
      const slug = item.slug
      const title = item.name || item.title
      const override = getOverride(slug, type)
      result.push({
        slug,
        title,
        type: type as SeoItem["type"],
        metaTitle: override?.metaTitle || item.metaTitle || item.title || "",
        metaDescription: override?.metaDescription || item.metaDescription || "",
        canonicalUrl: override?.canonicalUrl || "",
        robots: override?.robots || "index,follow",
        ogImage: override?.ogImage || "",
        hasOverride: !!override,
      })
    }
    return result
  }, [tab, overrides])

  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.slug.includes(search.toLowerCase())
  )

  const handleSave = async (item: SeoItem) => {
    const key = `${item.type}:${item.slug}`
    setSaving(key)
    try {
      await saveSeoOverride({
        slug: item.slug,
        type: item.type,
        metaTitle: item.metaTitle,
        metaDescription: item.metaDescription,
        canonicalUrl: item.canonicalUrl,
        robots: item.robots,
        ogImage: item.ogImage,
      })
      setSavedSlug(key)
      setTimeout(() => setSavedSlug(null), 2000)
      setOverrides((prev) => {
        const idx = prev.findIndex((o) => o.slug === item.slug && o.type === item.type)
        const entry: SeoOverride = { slug: item.slug, type: item.type, metaTitle: item.metaTitle, metaDescription: item.metaDescription, canonicalUrl: item.canonicalUrl, robots: item.robots, ogImage: item.ogImage }
        if (idx >= 0) {
          const updated = [...prev]
          updated[idx] = entry
          return updated
        }
        return [...prev, entry]
      })
    } catch {
      alert("Failed to save")
    } finally {
      setSaving(null)
    }
  }

  const updateItem = (slug: string, field: keyof SeoItem, value: string) => {
    setOverrides((prev) => {
      const item = items.find((i) => i.slug === slug)
      if (!item) return prev
      const newItem = { ...item, [field]: value }
      const existing = prev.findIndex((o) => o.slug === slug && o.type === item.type)
      const entry: SeoOverride = { slug: newItem.slug, type: newItem.type, metaTitle: newItem.metaTitle, metaDescription: newItem.metaDescription, canonicalUrl: newItem.canonicalUrl, robots: newItem.robots, ogImage: newItem.ogImage }
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = entry
        return updated
      }
      return [...prev, entry]
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">SEO Manager</h1>
        <p className="text-dark-400 mt-1">Manage meta tags, canonical URLs, Open Graph, and robots directives</p>
      </div>

      <div className="flex gap-2 mb-6">
        {(["tools", "articles", "comparisons", "categories"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
      </div>

      <div className="space-y-3">
        {filtered.map((item) => {
          const key = `${item.type}:${item.slug}`
          return (
            <div key={item.slug} className={`bg-dark-800/50 border rounded-xl p-4 ${item.hasOverride ? "border-primary-500/40" : "border-dark-700"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">{item.title}</span>
                  <code className="text-dark-500 text-xs">/{item.slug}</code>
                  {item.hasOverride && <span className="text-[10px] text-primary-400 bg-primary-500/10 px-1.5 py-0.5 rounded">Override</span>}
                </div>
                <button onClick={() => handleSave(item)} disabled={saving === key}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition-colors">
                  <Save className="w-3 h-3" />
                  {saving === key ? "..." : savedSlug === key ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-medium text-dark-400 uppercase tracking-wider mb-1">Meta Title</label>
                  <input type="text" value={item.metaTitle}
                    onChange={(e) => updateItem(item.slug, "metaTitle", e.target.value)}
                    className={`w-full px-2.5 py-1.5 bg-dark-900 border rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 ${item.metaTitle.length > 60 ? "border-amber-500/50" : "border-dark-700"}`} />
                  <span className={`text-[10px] ${item.metaTitle.length > 60 ? "text-amber-400" : "text-dark-500"}`}>{item.metaTitle.length} chars</span>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-dark-400 uppercase tracking-wider mb-1">Meta Description</label>
                  <input type="text" value={item.metaDescription}
                    onChange={(e) => updateItem(item.slug, "metaDescription", e.target.value)}
                    className={`w-full px-2.5 py-1.5 bg-dark-900 border rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 ${item.metaDescription.length > 160 ? "border-red-500/50" : item.metaDescription.length > 120 ? "border-amber-500/50" : "border-dark-700"}`} />
                  <span className={`text-[10px] ${item.metaDescription.length > 160 ? "text-red-400" : item.metaDescription.length > 120 ? "text-amber-400" : "text-dark-500"}`}>{item.metaDescription.length} chars</span>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-dark-400 uppercase tracking-wider mb-1">Canonical URL</label>
                  <input type="text" value={item.canonicalUrl}
                    onChange={(e) => updateItem(item.slug, "canonicalUrl", e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-dark-900 border border-dark-700 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 font-mono"
                    placeholder="https://measurely.in/..." />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-dark-400 uppercase tracking-wider mb-1">Robots</label>
                  <select value={item.robots} onChange={(e) => updateItem(item.slug, "robots", e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-dark-900 border border-dark-700 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary-500">
                    <option value="index,follow">index, follow</option>
                    <option value="noindex,follow">noindex, follow</option>
                    <option value="index,nofollow">index, nofollow</option>
                    <option value="noindex,nofollow">noindex, nofollow</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-dark-400 uppercase tracking-wider mb-1">OG Image URL</label>
                  <input type="text" value={item.ogImage}
                    onChange={(e) => updateItem(item.slug, "ogImage", e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-dark-900 border border-dark-700 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 font-mono"
                    placeholder="https://..." />
                </div>
                <div className="flex items-end">
                  <a href={`/${item.slug}`} target="_blank"
                    className="flex items-center gap-1 px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-xs transition-colors">
                    <ExternalLink className="w-3 h-3" /> View
                  </a>
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && <p className="text-dark-400 text-center py-8">No items found.</p>}
      </div>
    </div>
  )
}
