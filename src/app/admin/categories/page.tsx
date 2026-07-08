"use client"

import { useState, useEffect } from "react"
import { CATEGORIES } from "@/lib/constants"
import { categoryContent } from "@/data/category-content"
import { calculators } from "@/data/calculators"
import { readJsonFile, writeJsonFile } from "@/cms/lib/api"
import type { CmsCategory } from "@/cms/types"
import { Edit, Save, Merge, Search, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"

export default function CategoryManager() {
  const [cmsCategories, setCmsCategories] = useState<CmsCategory[]>([])
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "", description: "", intro: "", metaTitle: "", metaDescription: "", image: "", slug: "",
  })
  const [mergeMode, setMergeMode] = useState(false)
  const [mergeFrom, setMergeFrom] = useState("")
  const [mergeTo, setMergeTo] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    readJsonFile<CmsCategory[]>("categories.json").then((data) => {
      setCmsCategories(Array.isArray(data) ? data : [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const getToolCount = (slug: string) => calculators.filter((c) => c.category === slug).length
  const getCms = (slug: string) => cmsCategories.find((c) => c.slug === slug)

  const startEdit = (slug: string) => {
    const cat = CATEGORIES.find((c) => c.slug === slug)
    const content = categoryContent[slug]
    const cms = getCms(slug)
    if (!cat) return
    setEditingSlug(slug)
    setEditForm({
      name: cms?.name || cat.name,
      description: cms?.description || cat.description,
      intro: cms?.intro || content?.intro || "",
      metaTitle: cms?.metaTitle || "",
      metaDescription: cms?.metaDescription || "",
      image: "",
      slug,
    })
  }

  const handleSave = async () => {
    if (!editingSlug) return
    setSaving(true)
    try {
      let all = [...cmsCategories]
      const idx = all.findIndex((c) => c.slug === editingSlug)
      const entry: CmsCategory = {
        slug: editingSlug,
        name: editForm.name,
        icon: CATEGORIES.find((c) => c.slug === editingSlug)?.icon || "folder",
        description: editForm.description,
        intro: editForm.intro,
        faqs: categoryContent[editingSlug]?.faqs || [],
        metaTitle: editForm.metaTitle,
        metaDescription: editForm.metaDescription,
        status: "published",
      }
      if (idx >= 0) all[idx] = entry
      else all.push(entry)
      await writeJsonFile("categories.json", all)
      setCmsCategories(all)
      setEditingSlug(null)
    } catch { alert("Failed to save") }
    finally { setSaving(false) }
  }

  const handleMerge = async () => {
    if (!mergeFrom || !mergeTo || mergeFrom === mergeTo) return
    if (!confirm(`Merge all tools from "${mergeFrom}" into "${mergeTo}"? This cannot be undone.`)) return
    setSaving(true)
    try {
      const tools = await readJsonFile<any[]>("tools.json")
      const updated = tools.map((t) => t.category === mergeFrom ? { ...t, category: mergeTo } : t)
      await writeJsonFile("tools.json", updated)
      const cats = cmsCategories.filter((c) => c.slug !== mergeFrom)
      await writeJsonFile("categories.json", cats)
      setCmsCategories(cats)
      setMergeMode(false)
      setMergeFrom("")
      setMergeTo("")
    } catch { alert("Merge failed") }
    finally { setSaving(false) }
  }

  const filtered = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.slug.includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <p className="text-dark-400 mt-1">{CATEGORIES.length} categories, {cmsCategories.length} with CMS overrides</p>
        </div>
        <button onClick={() => setMergeMode(!mergeMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mergeMode ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"
          }`}>
          <Merge className="w-4 h-4" /> {mergeMode ? "Cancel Merge" : "Merge Categories"}
        </button>
      </div>

      {mergeMode && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 mb-6">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" /> Merge Categories</h3>
          <p className="text-dark-400 text-xs mb-4">Move all tools from one category to another, then remove the source category.</p>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-xs text-dark-400 mb-1">From (will be removed)</label>
              <select value={mergeFrom} onChange={(e) => setMergeFrom(e.target.value)}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm">
                <option value="">Select source category...</option>
                {CATEGORIES.map((c) => (<option key={c.slug} value={c.slug}>{c.name} ({getToolCount(c.slug)} tools)</option>))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-dark-400 mb-1">To (target category)</label>
              <select value={mergeTo} onChange={(e) => setMergeTo(e.target.value)}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm">
                <option value="">Select target category...</option>
                {CATEGORIES.filter((c) => c.slug !== mergeFrom).map((c) => (<option key={c.slug} value={c.slug}>{c.name} ({getToolCount(c.slug)} tools)</option>))}
              </select>
            </div>
            <button onClick={handleMerge} disabled={!mergeFrom || !mergeTo || saving || mergeFrom === mergeTo}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg text-sm transition-colors">
              {saving ? "Merging..." : "Merge"}
            </button>
          </div>
        </div>
      )}

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input type="text" placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-primary-400 animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((cat) => {
            const content = categoryContent[cat.slug]
            const cms = getCms(cat.slug)
            const toolCount = getToolCount(cat.slug)
            const isEditing = editingSlug === cat.slug

            return (
              <div key={cat.slug} className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 hover:border-dark-600 transition-colors">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-dark-400 mb-1">Name</label>
                      <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-dark-400 mb-1">Description</label>
                      <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} rows={2}
                        className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-dark-400 mb-1">Intro Content</label>
                      <textarea value={editForm.intro} onChange={(e) => setEditForm({ ...editForm, intro: e.target.value })} rows={3}
                        className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-dark-400 mb-1">Meta Title</label>
                        <input type="text" value={editForm.metaTitle} onChange={(e) => setEditForm({ ...editForm, metaTitle: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-dark-400 mb-1">Meta Description</label>
                        <input type="text" value={editForm.metaDescription} onChange={(e) => setEditForm({ ...editForm, metaDescription: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleSave} disabled={saving}
                        className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-medium transition-colors">
                        <Save className="w-3 h-3" /> {saving ? "Saving..." : "Save"}
                      </button>
                      <button onClick={() => setEditingSlug(null)} className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-300 rounded-lg text-xs transition-colors">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 min-w-0">
                        {cms?.name && (
                          <span className="text-xs bg-primary-500/10 text-primary-400 px-2 py-0.5 rounded mt-0.5 flex-shrink-0">CMS</span>
                        )}
                        <div className="min-w-0">
                          <h3 className="text-white font-semibold truncate">{cat.name}</h3>
                          <p className="text-dark-400 text-sm mt-1 line-clamp-2">{cat.description}</p>
                        </div>
                      </div>
                      <button onClick={() => startEdit(cat.slug)} className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white transition-colors flex-shrink-0 ml-2">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-4 text-xs text-dark-500">
                      <span className="text-white font-medium">{toolCount} tools</span>
                      <span>/ {cat.slug}</span>
                      {content?.faqs && <span>{content.faqs.length} FAQs</span>}
                      {cms?.metaTitle && <CheckCircle className="w-3 h-3 text-green-400" aria-label="SEO configured" />}
                    </div>
                    {cms?.metaTitle && (
                      <div className="mt-2 text-[10px] text-dark-500 truncate">SEO: {cms.metaTitle}</div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
