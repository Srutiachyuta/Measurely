"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { saveArticle, slugify, isSlugTaken } from "@/cms/services/article-service"
import { ContentEditor } from "@/cms/components/content-editor"
import type { ContentBlock } from "@/cms/types/content"
import { ArrowLeft, Save } from "lucide-react"

export default function NewArticlePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    metaTitle: "",
    metaDescription: "",
    category: "",
    categorySlug: "",
    tags: "",
    keywords: "",
    status: "draft" as "draft" | "published",
    author: "Admin",
    featured: false,
  })
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const [saving, setSaving] = useState(false)
  const [slugError, setSlugError] = useState("")

  const handleTitleChange = (title: string) => {
    setForm({
      ...form,
      title,
      slug: form.slug || slugify(title),
      metaTitle: form.metaTitle || title,
    })
  }

  const handleCreate = async () => {
    if (!form.title.trim()) return

    const finalSlug = form.slug || slugify(form.title)
    const taken = await isSlugTaken(finalSlug)
    if (taken) {
      setSlugError("Slug is already taken")
      return
    }
    setSlugError("")
    setSaving(true)
    try {
      await saveArticle(finalSlug, {
        title: form.title,
        slug: finalSlug,
        excerpt: form.excerpt,
        content: "",
        contentBlocks,
        category: form.category || "Uncategorized",
        categorySlug: form.categorySlug || "uncategorized",
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
        status: form.status,
        author: form.author,
        featured: form.featured,
        faqs: [],
        relatedSlugs: [],
        relatedTools: [],
      })
      router.push(`/admin/articles`)
    } catch {
      alert("Failed to create article")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="p-2 rounded-lg hover:bg-dark-800 text-dark-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">New Article</h1>
            <p className="text-dark-400 text-sm mt-1">Write a new blog article</p>
          </div>
        </div>
        <button
          onClick={handleCreate}
          disabled={saving || !form.title.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? "Creating..." : "Create Article"}
        </button>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Article Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Article title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => { setForm({ ...form, slug: e.target.value }); setSlugError("") }}
                className={`w-full px-3 py-2 bg-dark-900 border rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 ${slugError ? "border-red-500" : "border-dark-700"}`}
              />
              {slugError && <p className="text-red-400 text-xs mt-1">{slugError}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Category</label>
                <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g., Finance" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Category Slug</label>
                <input type="text" value={form.categorySlug} onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g., finance" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Brief summary of the article..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Tags (comma separated)</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">
            Content Editor
            <span className="ml-2 text-xs font-normal text-dark-400">(headings, paragraphs, FAQs, formulas, tables & more)</span>
          </h2>
          <ContentEditor blocks={contentBlocks} onChange={setContentBlocks} />
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
              <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                rows={3} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Keywords (comma separated)</label>
              <input type="text" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Publish Settings</h2>
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => setForm({ ...form, status: "published" })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${form.status === "published" ? "bg-green-600 text-white" : "bg-dark-700 text-dark-400 hover:text-white"}`}
              >Published</button>
              <button
                onClick={() => setForm({ ...form, status: "draft" })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${form.status === "draft" ? "bg-yellow-600 text-white" : "bg-dark-700 text-dark-400 hover:text-white"}`}
              >Draft</button>
            </div>
            <label className="flex items-center gap-2 text-sm text-dark-300 pt-2 border-t border-dark-700">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded bg-dark-700 border-dark-600" />
              Featured article
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
