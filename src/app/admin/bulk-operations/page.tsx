"use client"

import { useState, useEffect } from "react"
import { calculators } from "@/data/calculators"
import { CATEGORIES } from "@/lib/constants"
import { readJsonFile, writeJsonFile } from "@/cms/lib/api"
import type { CmsToolMeta } from "@/cms/types"
import { FolderKanban, Search, RefreshCw, CheckCircle, AlertTriangle, Loader2, Save, Eye, EyeOff, Globe, Trash2 } from "lucide-react"

export default function BulkOperations() {
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = useState(false)
  const [search, setSearch] = useState("")
  const [cmsTools, setCmsTools] = useState<CmsToolMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [operating, setOperating] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    readJsonFile<CmsToolMeta[]>("tools.json").then((data) => {
      setCmsTools(Array.isArray(data) ? data : [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtered = calculators.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.slug.includes(search.toLowerCase())
  )

  const toggleSelectAll = () => {
    if (selectAll) { setSelectedTools(new Set()); setSelectAll(false) }
    else { setSelectedTools(new Set(filtered.map((t) => t.slug))); setSelectAll(true) }
  }

  const toggleTool = (slug: string) => {
    const next = new Set(selectedTools)
    if (next.has(slug)) next.delete(slug)
    else next.add(slug)
    setSelectedTools(next)
    if (next.size !== filtered.length) setSelectAll(false)
    if (next.size === filtered.length && filtered.length > 0) setSelectAll(true)
  }

  const bulkAction = async (action: string, payload?: Partial<CmsToolMeta>) => {
    if (selectedTools.size === 0) return
    setOperating(true)
    setMessage(null)
    try {
      const tools = await readJsonFile<CmsToolMeta[]>("tools.json")
      const arr = Array.isArray(tools) ? tools : []

      for (const slug of selectedTools) {
        const idx = arr.findIndex((t) => t.slug === slug)
        const calc = calculators.find((c) => c.slug === slug)
        const now = new Date().toISOString().split("T")[0]

        const base = idx >= 0 ? { ...arr[idx] } : {
          name: calc?.name || slug, slug, category: calc?.category || "",
          description: calc?.description || "", shortDescription: "",
          metaTitle: calc?.metaTitle || "", metaDescription: calc?.metaDescription || "",
          keywords: [] as string[], faqs: [] as { question: string; answer: string }[],
          relatedSlugs: [] as string[], relatedArticleSlugs: [] as string[],
          formula: calc?.formula || "", status: "published" as const,
          featuredImage: "", featuredImageAlt: "", gallery: [] as any[],
          author: "", publishDate: "", lastUpdated: now, schema: {},
          canonicalUrl: "", ogImage: "", ogTitle: "", ogDescription: "",
          twitterCard: "summary_large_image" as const, robots: "",
          breadcrumb: [] as any[], contentBlocks: [] as any[], toolCode: "",
          examples: [] as any[], internalLinks: [] as any[], version: 1,
        }

        if (action === "category" && payload?.category) base.category = payload.category
        if (action === "status" && payload?.status) base.status = payload.status
        if (action === "metaTitle" && payload?.metaTitle) base.metaTitle = payload.metaTitle
        if (action === "metaDescription" && payload?.metaDescription) base.metaDescription = payload.metaDescription
        base.lastUpdated = now
        base.version = (base.version || 0) + 1

        if (idx >= 0) arr[idx] = base
        else arr.push(base)
      }

      await writeJsonFile("tools.json", arr)
      setCmsTools(arr)
      setMessage({ type: "success", text: `${action === "delete" ? "Deleted" : "Updated"} ${selectedTools.size} tool${selectedTools.size > 1 ? "s" : ""}` })
      if (action === "delete") setSelectedTools(new Set())
    } catch {
      setMessage({ type: "error", text: `Failed to ${action} tools` })
    } finally { setOperating(false) }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete ${selectedTools.size} tool${selectedTools.size > 1 ? "s" : ""}? This cannot be undone.`)) return
    setOperating(true)
    setMessage(null)
    try {
      const tools = await readJsonFile<CmsToolMeta[]>("tools.json")
      const arr = Array.isArray(tools) ? tools : []
      const filtered = arr.filter((t) => !selectedTools.has(t.slug))
      await writeJsonFile("tools.json", filtered)
      setCmsTools(filtered)
      setMessage({ type: "success", text: `Deleted ${selectedTools.size} tool${selectedTools.size > 1 ? "s" : ""}` })
      setSelectedTools(new Set())
    } catch {
      setMessage({ type: "error", text: "Failed to delete tools" })
    } finally { setOperating(false) }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Bulk Operations</h1>
        <p className="text-dark-400 mt-1">Select multiple tools and perform batch actions</p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input type="text" placeholder="Search tools..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <button onClick={toggleSelectAll}
          className="px-4 py-2.5 bg-dark-800 border border-dark-700 text-white rounded-lg text-sm hover:bg-dark-700 transition-colors">
          {selectAll ? "Deselect All" : "Select All"}
        </button>
        <button onClick={() => { readJsonFile<CmsToolMeta[]>("tools.json").then((d) => setCmsTools(Array.isArray(d) ? d : [])).catch(() => {}) }}
          className="px-3 py-2.5 bg-dark-800 border border-dark-700 text-dark-400 hover:text-white rounded-lg text-sm transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {message && (
        <div className={`flex items-center gap-2 p-3 mb-6 rounded-lg text-sm ${
          message.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"
        }`}>
          {message.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      {selectedTools.size > 0 && (
        <div className="bg-primary-600/10 border border-primary-600/20 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-400" />
              <span className="text-primary-300 text-sm font-medium">{selectedTools.size} tool{selectedTools.size > 1 ? "s" : ""} selected</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <select onChange={(e) => { if (e.target.value) bulkAction("category", { category: e.target.value }); e.target.value = "" }}
                disabled={operating} className="px-3 py-1.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-xs">
                <option value="">Change category...</option>
                {CATEGORIES.map((c) => (<option key={c.slug} value={c.slug}>{c.name}</option>))}
              </select>
              <button onClick={() => bulkAction("status", { status: "published" })} disabled={operating}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-xs transition-colors">
                {operating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Eye className="w-3 h-3" />} Publish
              </button>
              <button onClick={() => bulkAction("status", { status: "draft" })} disabled={operating}
                className="flex items-center gap-1 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white rounded-lg text-xs transition-colors">
                {operating ? <Loader2 className="w-3 h-3 animate-spin" /> : <EyeOff className="w-3 h-3" />} Draft
              </button>
              <button onClick={handleDelete} disabled={operating}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-xs transition-colors">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="w-10 px-4 py-3"></th>
              <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">Name</th>
              <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">Slug</th>
              <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">Category</th>
              <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">CMS Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tool) => {
              const cms = cmsTools.find((t) => t.slug === tool.slug)
              return (
                <tr key={tool.slug}
                  className={`border-b border-dark-700/50 hover:bg-dark-800/30 transition-colors ${selectedTools.has(tool.slug) ? "bg-primary-600/5" : ""}`}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selectedTools.has(tool.slug)} onChange={() => toggleTool(tool.slug)}
                      className="rounded border-dark-600 bg-dark-700 text-primary-600 focus:ring-primary-500" />
                  </td>
                  <td className="px-4 py-3 text-white text-sm">{tool.name}</td>
                  <td className="px-4 py-3 text-dark-400 text-sm font-mono">{tool.slug}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-dark-700 text-dark-300">
                      {CATEGORIES.find((c) => c.slug === tool.category)?.name || tool.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {cms ? (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        cms.status === "published" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                      }`}>{cms.status}</span>
                    ) : (
                      <span className="text-dark-500 text-xs">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
