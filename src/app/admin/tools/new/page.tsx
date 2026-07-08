"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CATEGORIES } from "@/lib/constants"
import { saveTool, getSuggestedSlug, isSlugTaken } from "@/cms/services/tool-service"
import { ArrowLeft, Save } from "lucide-react"

export default function NewToolPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "", slug: "", category: "finance", description: "", shortDescription: "",
    metaTitle: "", metaDescription: "", keywords: "", formula: "", status: "published" as "draft" | "published",
    featuredImage: "", featuredImageAlt: "", gallery: [] as { src: string; alt: string; caption?: string }[],
    author: "", publishDate: "", canonicalUrl: "", ogImage: "", ogTitle: "", ogDescription: "",
    twitterCard: "summary_large_image" as "summary" | "summary_large_image" | "app" | "player",
    robots: "", breadcrumb: [] as { label: string; href?: string }[],
    contentBlocks: [] as any[], toolCode: "",
    examples: [] as { title: string; inputs: Record<string, string | number>; explanation?: string }[],
    internalLinks: [] as { text: string; href: string }[],
    schema: "", relatedSlugs: [] as string[], relatedArticleSlugs: [] as string[],
    faqs: [] as { question: string; answer: string }[],
  })
  const [saving, setSaving] = useState(false)
  const [slugError, setSlugError] = useState("")

  const handleNameChange = (name: string) => {
    setForm({
      ...form, name,
      slug: form.slug || getSuggestedSlug(name),
      metaTitle: form.metaTitle || `${name} | Free Online Calculator`,
    })
  }

  const handleCreate = async () => {
    if (!form.name.trim()) return
    const slug = form.slug || getSuggestedSlug(form.name)
    const taken = await isSlugTaken(slug)
    if (taken) { setSlugError("Slug is already taken"); return }
    setSlugError("")
    setSaving(true)
    try {
      await saveTool(slug, { ...form, slug })
      router.push("/admin/tools")
    } catch { alert("Failed to create tool") }
    finally { setSaving(false) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/tools" className="p-2 rounded-lg hover:bg-dark-800 text-dark-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">New Tool</h1>
            <p className="text-dark-400 text-sm mt-1">Create a new calculator tool</p>
          </div>
        </div>
        <button onClick={handleCreate} disabled={saving || !form.name.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">
          <Save className="w-4 h-4" /> {saving ? "Creating..." : "Create Tool"}
        </button>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Tool Name</label>
              <input type="text" value={form.name} onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g., Retirement Calculator" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => { setForm({ ...form, slug: e.target.value }); setSlugError("") }}
                className={`w-full px-3 py-2 bg-dark-900 border rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 ${slugError ? "border-red-500" : "border-dark-700"}`} />
              {slugError && <p className="text-red-400 text-xs mt-1">{slugError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {CATEGORIES.map((cat) => (<option key={cat.slug} value={cat.slug}>{cat.name}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Meta Title</label>
              <input type="text" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Meta Description</label>
              <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={3}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Keywords (comma separated)</label>
              <input type="text" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Publish Status</h2>
          <div className="flex gap-2">
            <button onClick={() => setForm({ ...form, status: "published" })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${form.status === "published" ? "bg-green-600 text-white" : "bg-dark-700 text-dark-400 hover:text-white"}`}>Published</button>
            <button onClick={() => setForm({ ...form, status: "draft" })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${form.status === "draft" ? "bg-yellow-600 text-white" : "bg-dark-700 text-dark-400 hover:text-white"}`}>Draft</button>
          </div>
        </div>
      </div>
    </div>
  )
}
