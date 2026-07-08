"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { blogs } from "@/data/blogs"
import { calculators } from "@/data/calculators"
import { getArticle, saveArticle } from "@/cms/services/article-service"
import { ContentEditor } from "@/cms/components/content-editor"
import type { ContentBlock } from "@/cms/types/content"
import { ArrowLeft, Save, Eye } from "lucide-react"

export default function EditArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const article = blogs.find((b) => b.slug === slug)

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
    status: "published" as "draft" | "published",
    author: "",
    featured: false,
  })

  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([])
  const [relatedTools, setRelatedTools] = useState<{ name: string; slug: string; type: "calculator" }[]>([])
  const [relatedSlugs, setRelatedSlugs] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!article) return

    getArticle(slug).then((cmsArticle) => {
      const cms = cmsArticle
      let blocks: ContentBlock[] = []
      if (cms?.content) {
        try { blocks = JSON.parse(cms.content) } catch { blocks = [] }
      }

      setForm({
        title: cms?.title || article!.title,
        slug: cms?.slug || article!.slug,
        excerpt: cms?.excerpt || article!.excerpt,
        metaTitle: cms?.metaTitle || article!.metaTitle,
        metaDescription: cms?.metaDescription || article!.metaDescription,
        category: cms?.category || article!.category,
        categorySlug: cms?.categorySlug || article!.categorySlug,
        tags: (cms?.tags || article!.tags).join(", "),
        keywords: (cms?.keywords || article!.keywords).join(", "),
        status: cms?.status || "published",
        author: cms?.author?.name || article!.author.name,
        featured: cms?.featured || article!.featured,
      })
      setContentBlocks(blocks)
      setFaqs(cms?.faqs?.length ? cms.faqs : (article!.faqs || []))
      setRelatedTools(cms?.relatedTools?.length ? cms.relatedTools : (article!.relatedTools || []))
      setRelatedSlugs(cms?.relatedSlugs?.length ? cms.relatedSlugs : (article!.relatedSlugs || []))
    })
  }, [article, slug])

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-400">Article not found: {slug}</p>
        <Link href="/admin/articles" className="text-primary-400 hover:text-primary-300 mt-2 inline-block">
          Back to Article Manager
        </Link>
      </div>
    )
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveArticle(slug, {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: "",
        contentBlocks,
        category: form.category,
        categorySlug: form.categorySlug,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
        status: form.status,
        author: form.author,
        featured: form.featured,
        faqs,
        relatedSlugs,
        relatedTools,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      alert("Failed to save article")
    } finally {
      setSaving(false)
    }
  }

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }])
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, j) => j !== i))

  const addRelatedTool = (slug: string) => {
    const tool = calculators.find((c) => c.slug === slug)
    if (tool && !relatedTools.find((t) => t.slug === slug)) {
      setRelatedTools([...relatedTools, { name: tool.name, slug, type: "calculator" as const }])
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
            <h1 className="text-2xl font-bold text-white">Edit Article</h1>
            <p className="text-dark-400 text-sm mt-1">/{article.slug}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Article Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Category</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Category Slug</label>
                  <input type="text" value={form.categorySlug} onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Excerpt</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
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
              <span className="ml-2 text-xs font-normal text-dark-400">(add headings, paragraphs, FAQs, formulas, tables & more)</span>
            </h2>
            <ContentEditor blocks={contentBlocks} onChange={setContentBlocks} />
            {contentBlocks.length === 0 && (
              <p className="text-dark-500 text-sm text-center py-6">Start adding content blocks using the button below.</p>
            )}
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Meta Title</label>
                <input type="text" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                <p className="text-dark-500 text-xs mt-1">{form.metaTitle.length} characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Meta Description</label>
                <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={3}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                <p className="text-dark-500 text-xs mt-1">{form.metaDescription.length} characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Keywords (comma separated)</label>
                <input type="text" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">FAQs</h2>
              <button onClick={addFaq} className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-xs font-medium transition-colors">+ Add FAQ</button>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="p-3 rounded-lg bg-dark-900/50 border border-dark-700">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-dark-500 text-xs font-medium">FAQ #{i + 1}</span>
                    <button onClick={() => removeFaq(i)} className="text-dark-500 hover:text-red-400 text-xs">Remove</button>
                  </div>
                  <div className="space-y-2">
                    <input type="text" value={faq.question} onChange={(e) => { const u = [...faqs]; u[i] = { ...u[i], question: e.target.value }; setFaqs(u) }}
                      placeholder="Question" className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    <textarea value={faq.answer} onChange={(e) => { const u = [...faqs]; u[i] = { ...u[i], answer: e.target.value }; setFaqs(u) }}
                      placeholder="Answer" rows={2} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
              ))}
              {faqs.length === 0 && <p className="text-dark-500 text-sm text-center py-4">No FAQs yet.</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Status</h2>
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
              <div className="flex items-center justify-between pt-2 border-t border-dark-700">
                <span className="text-dark-300 text-sm">Content Blocks</span>
                <span className="text-white text-sm">{contentBlocks.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-300 text-sm">FAQs</span>
                <span className="text-white text-sm">{faqs.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Related Tools</h2>
            <div className="space-y-2 mb-3">
              {relatedTools.map((t) => (
                <div key={t.slug} className="flex items-center justify-between p-2 rounded-lg bg-dark-900/50">
                  <span className="text-dark-300 text-sm">{t.name}</span>
                  <button onClick={() => setRelatedTools(relatedTools.filter((r) => r.slug !== t.slug))}
                    className="text-dark-500 hover:text-red-400 text-xs">Remove</button>
                </div>
              ))}
              {relatedTools.length === 0 && <p className="text-dark-500 text-sm">No related tools</p>}
            </div>
            <select
              onChange={(e) => { if (e.target.value) addRelatedTool(e.target.value); e.target.value = "" }}
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Add related tool...</option>
              {calculators.filter((c) => !relatedTools.find((t) => t.slug === c.slug)).map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Related Articles</h2>
            <div className="space-y-2">
              {relatedSlugs.map((s) => {
                const relatedBlog = blogs.find((b) => b.slug === s)
                return (
                  <div key={s} className="flex items-center justify-between p-2 rounded-lg bg-dark-900/50">
                    <span className="text-dark-300 text-sm truncate">{relatedBlog?.title || s}</span>
                    <button onClick={() => setRelatedSlugs(relatedSlugs.filter((r) => r !== s))}
                      className="text-dark-500 hover:text-red-400 text-xs ml-2">Remove</button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Preview</h2>
            <a href={`/${article.slug}`} target="_blank"
              className="flex items-center justify-center gap-2 w-full py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-sm transition-colors">
              <Eye className="w-4 h-4" />
              View Live Page
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
