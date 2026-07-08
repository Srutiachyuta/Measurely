"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { calculators } from "@/data/calculators"
import { blogs } from "@/data/blogs"
import { CATEGORIES } from "@/lib/constants"
import { getTool, saveTool, getSuggestedSlug, isSlugTaken, getToolVersions, addRedirect } from "@/cms/services/tool-service"
import { ContentEditor } from "@/cms/components/content-editor"
import { blocksToHtml } from "@/cms/types/content"
import type { ContentBlock } from "@/cms/types/content"
import {
  ArrowLeft, Save, Eye, FileText, Search, Image, Code, Link2, Settings2,
  CheckCircle, AlertTriangle, Info, ExternalLink, Plus, Trash2, Globe,
  Hash, Upload, X, AlertCircle, Share2
} from "lucide-react"

type EditorTab = "content" | "seo" | "media" | "code" | "relations" | "settings"

export default function EditToolPage() {
  const params = useParams()
  const slug = params.slug as string
  const tool = calculators.find((c) => c.slug === slug)

  const [tab, setTab] = useState<EditorTab>("content")
  const [form, setForm] = useState({
    name: "", slug: "", category: "finance", description: "", shortDescription: "",
    metaTitle: "", metaDescription: "", keywords: "", formula: "", status: "published" as "draft" | "published",
    featuredImage: "", featuredImageAlt: "", gallery: [] as { src: string; alt: string; caption?: string }[],
    author: "", publishDate: "", canonicalUrl: "", ogImage: "", ogTitle: "", ogDescription: "",
    twitterCard: "summary_large_image" as "summary" | "summary_large_image" | "app" | "player",
    robots: "", breadcrumb: [] as { label: string; href?: string }[],
    contentBlocks: [] as ContentBlock[], toolCode: "",
    examples: [] as { title: string; inputs: Record<string, string | number>; explanation?: string }[],
    internalLinks: [] as { text: string; href: string }[],
    schema: "", relatedSlugs: [] as string[], relatedArticleSlugs: [] as string[],
    faqs: [] as { question: string; answer: string }[],
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [slugError, setSlugError] = useState("")
  const [cmsLoaded, setCmsLoaded] = useState(false)
  const [versions, setVersions] = useState<{ version: number; lastUpdated: string }[]>([])
  const [originalSlug, setOriginalSlug] = useState(slug)

  useEffect(() => {
    if (!tool) return
    getTool(slug).then((cmsTool) => {
      const c = cmsTool
      setForm({
        name: c?.name || tool!.name,
        slug: c?.slug || tool!.slug,
        category: c?.category || tool!.category,
        description: c?.description || tool!.description,
        shortDescription: c?.shortDescription || "",
        metaTitle: c?.metaTitle || tool!.metaTitle || "",
        metaDescription: c?.metaDescription || tool!.metaDescription || "",
        keywords: c?.keywords?.join(", ") || "",
        formula: c?.formula || tool!.formula || "",
        status: c?.status || "published",
        featuredImage: c?.featuredImage || "",
        featuredImageAlt: c?.featuredImageAlt || "",
        gallery: c?.gallery || [],
        author: c?.author || "",
        publishDate: c?.publishDate || "",
        canonicalUrl: c?.canonicalUrl || "",
        ogImage: c?.ogImage || "",
        ogTitle: c?.ogTitle || "",
        ogDescription: c?.ogDescription || "",
        twitterCard: c?.twitterCard || "summary_large_image",
        robots: c?.robots || "",
        breadcrumb: c?.breadcrumb || [],
        contentBlocks: c?.contentBlocks || [],
        toolCode: c?.toolCode || "",
        examples: c?.examples || [],
        internalLinks: c?.internalLinks || [],
        schema: JSON.stringify(c?.schema || {}, null, 2),
        relatedSlugs: c?.relatedSlugs?.length ? c.relatedSlugs : (tool!.relatedSlugs || []),
        relatedArticleSlugs: c?.relatedArticleSlugs || [],
        faqs: c?.faqs?.length ? c.faqs : (tool!.faqs || []),
      })
      setOriginalSlug(c?.slug || slug)
      setCmsLoaded(true)
    })
    getToolVersions(slug).then(setVersions)
  }, [tool, slug])

  const handleSave = async () => {
    const taken = await isSlugTaken(form.slug, originalSlug)
    if (taken) { setSlugError("Slug is already taken"); return }
    setSlugError("")
    setSaving(true)
    try {
      const savedTool = await saveTool(originalSlug, form)
      if (form.slug !== originalSlug) {
        await addRedirect(originalSlug, form.slug)
      }
      setSaved(true); setTimeout(() => setSaved(false), 2000)
    } catch { alert("Failed to save tool") }
    finally { setSaving(false) }
  }

  const handleNameChange = (name: string) => {
    setForm({ ...form, name, slug: form.slug === getSuggestedSlug(form.name, originalSlug) ? getSuggestedSlug(name, originalSlug) : form.slug })
  }

  const seoAnalysis = useMemo(() => {
    const issues: { type: "error" | "warning" | "info"; message: string; field?: string }[] = []
    if (!form.metaTitle) issues.push({ type: "error", message: "Meta title is empty", field: "metaTitle" })
    else if (form.metaTitle.length < 30) issues.push({ type: "warning", message: `Meta title too short (${form.metaTitle.length}/30)`, field: "metaTitle" })
    else if (form.metaTitle.length > 70) issues.push({ type: "warning", message: `Meta title too long (${form.metaTitle.length}/70)`, field: "metaTitle" })
    if (!form.metaDescription) issues.push({ type: "error", message: "Meta description is empty", field: "metaDescription" })
    else if (form.metaDescription.length < 80) issues.push({ type: "warning", message: `Meta description too short (${form.metaDescription.length}/80)`, field: "metaDescription" })
    else if (form.metaDescription.length > 160) issues.push({ type: "warning", message: `Meta description too long (${form.metaDescription.length}/160)`, field: "metaDescription" })
    if (!form.keywords) issues.push({ type: "warning", message: "No keywords defined", field: "keywords" })
    if (!form.canonicalUrl) issues.push({ type: "info", message: "Canonical URL not set", field: "canonicalUrl" })
    if (!form.ogImage) issues.push({ type: "info", message: "Open Graph image not set", field: "ogImage" })
    if (!form.featuredImage) issues.push({ type: "info", message: "Featured image not set", field: "featuredImage" })
    if (form.description.length < 50) issues.push({ type: "warning", message: "Description is too short", field: "description" })
    if (!form.schema || form.schema === "{}") issues.push({ type: "info", message: "No structured data defined", field: "schema" })
    if (!form.robots) issues.push({ type: "info", message: "Robots directive not set", field: "robots" })
    return issues
  }, [form])

  const seoScore = useMemo(() => {
    const total = 12
    let score = 0
    if (form.metaTitle && form.metaTitle.length >= 30 && form.metaTitle.length <= 70) score++
    if (form.metaDescription && form.metaDescription.length >= 80 && form.metaDescription.length <= 160) score++
    if (form.keywords) score++
    if (form.canonicalUrl) score++
    if (form.ogImage) score++
    if (form.featuredImage) score++
    if (form.description.length >= 50) score++
    if (form.schema && form.schema !== "{}") score++
    if (form.robots) score++
    if (form.ogTitle) score++
    if (form.ogDescription) score++
    if (form.breadcrumb.length > 0) score++
    return Math.round((score / total) * 100)
  }, [form])

  const livePreviewHtml = useMemo(() => {
    if (form.contentBlocks.length === 0) return ""
    return blocksToHtml(form.contentBlocks)
  }, [form.contentBlocks])

  if (!tool) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-400">Tool not found: {slug}</p>
        <Link href="/admin/tools" className="text-primary-400 hover:text-primary-300 mt-2 inline-block">Back to Tool Manager</Link>
      </div>
    )
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/admin/tools" className="p-2 rounded-lg hover:bg-dark-800 text-dark-400 hover:text-white transition-colors flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white truncate">{tool.name}</h1>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                form.status === "published" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
              }`}>{form.status === "published" ? "Published" : "Draft"}</span>
              {cmsLoaded && <span className="text-dark-500 text-xs">v{versions[0]?.version || 1}</span>}
            </div>
            <p className="text-dark-400 text-sm mt-0.5 truncate">/{tool.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href={`/${tool.slug}`} target="_blank" className="flex items-center gap-1.5 px-3 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-colors border border-dark-700">
            <Eye className="w-4 h-4" /> View
          </a>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {[
          { id: "content" as const, label: "Content", icon: FileText },
          { id: "seo" as const, label: "SEO", icon: Search },
          { id: "media" as const, label: "Media", icon: Image },
          { id: "code" as const, label: "Code", icon: Code },
          { id: "relations" as const, label: "Relations", icon: Link2 },
          { id: "settings" as const, label: "Settings", icon: Settings2 },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              tab === t.id ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"
            }`}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* ========== CONTENT TAB ========== */}
        {tab === "content" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Tool Name</label>
                    <input type="text" value={form.name} onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Slug</label>
                    <input type="text" value={form.slug} onChange={(e) => { setForm({ ...form, slug: e.target.value }); setSlugError("") }}
                      className={`w-full px-3 py-2 bg-dark-900 border rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 ${slugError ? "border-red-500" : "border-dark-700"}`} />
                    {slugError && <p className="text-red-400 text-xs mt-1">{slugError}</p>}
                    {form.slug !== originalSlug && cmsLoaded && (
                      <p className="text-amber-400 text-xs mt-1">A 301 redirect will be created from /{originalSlug} to /{form.slug}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-1">Category</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                        {CATEGORIES.map((cat) => (<option key={cat.slug} value={cat.slug}>{cat.name}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-1">Status</label>
                      <div className="flex gap-2">
                        <button onClick={() => setForm({ ...form, status: "published" })}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${form.status === "published" ? "bg-green-600 text-white" : "bg-dark-700 text-dark-400 hover:text-white"}`}>Published</button>
                        <button onClick={() => setForm({ ...form, status: "draft" })}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${form.status === "draft" ? "bg-yellow-600 text-white" : "bg-dark-700 text-dark-400 hover:text-white"}`}>Draft</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Short Description <span className="text-dark-500 font-normal">(for cards & previews)</span></label>
                    <input type="text" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    <p className="text-dark-500 text-xs mt-1">{form.description.length} characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Formula</label>
                    <textarea value={form.formula} onChange={(e) => setForm({ ...form, formula: e.target.value })} rows={2}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Full Article <span className="text-xs font-normal text-dark-400">(block editor)</span></h2>
                <ContentEditor blocks={form.contentBlocks} onChange={(blocks) => setForm({ ...form, contentBlocks: blocks })} />
                {form.contentBlocks.length === 0 && (
                  <p className="text-dark-500 text-sm text-center py-6">Start adding content blocks for the full article.</p>
                )}
              </div>
            </div>

            {/* LIVE PREVIEW */}
            <div className="xl:sticky xl:top-4 self-start">
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-dark-700 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2"><Eye className="w-4 h-4" />Live Preview</h3>
                  <span className="text-dark-500 text-xs">{form.contentBlocks.length} blocks</span>
                </div>
                <div className="p-5 max-h-[70vh] overflow-y-auto">
                  {livePreviewHtml ? (
                    <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: livePreviewHtml }} />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-dark-500">
                      <FileText className="w-10 h-10 mb-3 opacity-50" />
                      <p className="text-sm">Add content blocks to see a live preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== SEO TAB ========== */}
        {tab === "seo" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Meta Tags</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">SEO Title</label>
                    <input type="text" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs ${form.metaTitle.length < 30 || form.metaTitle.length > 70 ? "text-red-400" : "text-green-400"}`}>
                        {form.metaTitle.length} chars
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${form.metaTitle.length >= 30 && form.metaTitle.length <= 70 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                        {form.metaTitle.length >= 30 && form.metaTitle.length <= 70 ? "Good" : form.metaTitle.length < 30 ? "Too short" : "Too long"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Meta Description</label>
                    <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={3}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs ${form.metaDescription.length < 80 || form.metaDescription.length > 160 ? "text-red-400" : "text-green-400"}`}>
                        {form.metaDescription.length} chars
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${form.metaDescription.length >= 80 && form.metaDescription.length <= 160 ? "bg-green-500/10 text-green-400" : form.metaDescription.length < 80 ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"}`}>
                        {form.metaDescription.length < 80 ? "Too short" : form.metaDescription.length > 160 ? "Too long" : "Good"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Keywords <span className="text-dark-500 font-normal">(comma separated)</span></label>
                    <input type="text" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="calculator, finance, loan" />
                  </div>
                </div>
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Canonical & Robots</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Canonical URL</label>
                    <input type="text" value={form.canonicalUrl} onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://measurely.in/calculator-slug" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Robots Directive</label>
                    <select value={form.robots} onChange={(e) => setForm({ ...form, robots: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="">Default (index, follow)</option>
                      <option value="index, follow">index, follow</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="index, nofollow">index, nofollow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Share2 className="w-4 h-4" /> Open Graph & Twitter Card</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">OG Image URL</label>
                    <input type="text" value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://measurely.in/images/og-image.jpg" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-1">OG Title</label>
                      <input type="text" value={form.ogTitle} onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-1">OG Description</label>
                      <input type="text" value={form.ogDescription} onChange={(e) => setForm({ ...form, ogDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Twitter Card Type</label>
                    <select value={form.twitterCard} onChange={(e) => setForm({ ...form, twitterCard: e.target.value as any })}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="summary_large_image">Summary Large Image</option>
                      <option value="summary">Summary</option>
                      <option value="app">App</option>
                      <option value="player">Player</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Hash className="w-4 h-4" /> Structured Data (JSON-LD)</h2>
                <textarea value={form.schema} onChange={(e) => setForm({ ...form, schema: e.target.value })} rows={10}
                  className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-green-400 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Breadcrumb</h2>
                {form.breadcrumb.map((bc, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={bc.label} onChange={(e) => {
                      const b = [...form.breadcrumb]; b[i] = { ...b[i], label: e.target.value }; setForm({ ...form, breadcrumb: b })
                    }} className="flex-1 px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Label" />
                    <input type="text" value={bc.href || ""} onChange={(e) => {
                      const b = [...form.breadcrumb]; b[i] = { ...b[i], href: e.target.value || undefined }; setForm({ ...form, breadcrumb: b })
                    }} className="flex-1 px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="URL (optional)" />
                    <button onClick={() => setForm({ ...form, breadcrumb: form.breadcrumb.filter((_, j) => j !== i) })}
                      className="p-2 text-dark-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => setForm({ ...form, breadcrumb: [...form.breadcrumb, { label: "" }] })}
                  className="text-xs text-primary-400 hover:text-primary-300 mt-2">+ Add breadcrumb item</button>
              </div>
            </div>

            {/* SEO SCORE SIDEBAR */}
            <div className="space-y-6">
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> SEO Score</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                    seoScore >= 80 ? "bg-green-500/10 text-green-400 border-2 border-green-500/30" :
                    seoScore >= 50 ? "bg-amber-500/10 text-amber-400 border-2 border-amber-500/30" :
                    "bg-red-500/10 text-red-400 border-2 border-red-500/30"
                  }`}>{seoScore}%</div>
                  <div className="text-sm text-dark-400">
                    {seoScore >= 80 ? "Looking good!" : seoScore >= 50 ? "Needs improvement" : "Requires attention"}
                    <p className="text-xs text-dark-500 mt-0.5">{seoAnalysis.length} issue{seoAnalysis.length !== 1 ? "s" : ""} detected</p>
                  </div>
                </div>
                <div className="w-full bg-dark-900 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all duration-500 ${
                    seoScore >= 80 ? "bg-green-500" : seoScore >= 50 ? "bg-amber-500" : "bg-red-500"
                  }`} style={{ width: `${seoScore}%` }} />
                </div>
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  {seoAnalysis.filter((i) => i.type === "error").length > 0 ? <AlertCircle className="w-4 h-4 text-red-400" /> :
                   seoAnalysis.filter((i) => i.type === "warning").length > 0 ? <AlertTriangle className="w-4 h-4 text-amber-400" /> :
                   <CheckCircle className="w-4 h-4 text-green-400" />}
                  SEO Issues
                </h3>
                <div className="space-y-2">
                  {seoAnalysis.map((issue, i) => (
                    <div key={i} className={`flex items-start gap-2 p-2 rounded-lg text-xs ${
                      issue.type === "error" ? "bg-red-500/5" : issue.type === "warning" ? "bg-amber-500/5" : "bg-blue-500/5"
                    }`}>
                      {issue.type === "error" ? <AlertCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" /> :
                       issue.type === "warning" ? <AlertTriangle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" /> :
                       <Info className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />}
                      <span className="text-dark-300">{issue.message}</span>
                    </div>
                  ))}
                  {seoAnalysis.length === 0 && <p className="text-dark-500 text-xs">No issues found!</p>}
                </div>
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <a href={`https://search.google.com/search-console?resource_id=${encodeURIComponent("https://measurely.in")}`} target="_blank"
                    className="flex items-center gap-2 text-xs text-dark-300 hover:text-white p-2 rounded-lg hover:bg-dark-700 transition-colors">
                    <Search className="w-3.5 h-3.5" /> Google Search Console
                  </a>
                  <a href={`https://pagespeed.web.dev/analysis?url=https://measurely.in/${tool.slug}`} target="_blank"
                    className="flex items-center gap-2 text-xs text-dark-300 hover:text-white p-2 rounded-lg hover:bg-dark-700 transition-colors">
                    <Globe className="w-3.5 h-3.5" /> PageSpeed Insights
                  </a>
                  <a href={`https://validator.schema.org/#url=https://measurely.in/${tool.slug}`} target="_blank"
                    className="flex items-center gap-2 text-xs text-dark-300 hover:text-white p-2 rounded-lg hover:bg-dark-700 transition-colors">
                    <Hash className="w-3.5 h-3.5" /> Schema Validator
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== MEDIA TAB ========== */}
        {tab === "media" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Featured Image</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Image URL</label>
                    <div className="flex gap-2">
                      <input type="text" value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                        className="flex-1 px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://measurely.in/images/featured.jpg" />
                      <button className="px-3 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-colors">
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-1">ALT Text</label>
                      <input type="text" value={form.featuredImageAlt} onChange={(e) => setForm({ ...form, featuredImageAlt: e.target.value })}
                        className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Describe the image..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-1">Preview</label>
                      {form.featuredImage ? (
                        <img src={form.featuredImage} alt={form.featuredImageAlt || "Featured"} className="w-full h-24 object-cover rounded-lg border border-dark-700" />
                      ) : (
                        <div className="w-full h-24 bg-dark-900 rounded-lg border border-dark-700 flex items-center justify-center text-dark-500 text-xs">No image</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Gallery Images</h2>
                {form.gallery.map((img, i) => (
                  <div key={i} className="flex gap-2 mb-3 p-3 rounded-lg bg-dark-900/50 border border-dark-700">
                    <div className="flex-1 space-y-2">
                      <input type="text" value={img.src} onChange={(e) => {
                        const g = [...form.gallery]; g[i] = { ...g[i], src: e.target.value }; setForm({ ...form, gallery: g })
                      }} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono" placeholder="Image URL" />
                      <div className="flex gap-2">
                        <input type="text" value={img.alt} onChange={(e) => {
                          const g = [...form.gallery]; g[i] = { ...g[i], alt: e.target.value }; setForm({ ...form, gallery: g })
                        }} className="flex-1 px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="ALT text" />
                        <input type="text" value={img.caption || ""} onChange={(e) => {
                          const g = [...form.gallery]; g[i] = { ...g[i], caption: e.target.value }; setForm({ ...form, gallery: g })
                        }} className="flex-1 px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Caption" />
                      </div>
                    </div>
                    <button onClick={() => setForm({ ...form, gallery: form.gallery.filter((_, j) => j !== i) })}
                      className="p-2 text-dark-500 hover:text-red-400 self-start"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => setForm({ ...form, gallery: [...form.gallery, { src: "", alt: "" }] })}
                  className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-colors mt-2">
                  <Plus className="w-4 h-4" /> Add Gallery Image
                </button>
              </div>
            </div>

            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 self-start xl:sticky xl:top-4">
              <h3 className="text-sm font-semibold text-white mb-3">Image Tips</h3>
              <ul className="space-y-2 text-xs text-dark-400">
                <li className="flex items-start gap-2"><Info className="w-3 h-3 mt-0.5 flex-shrink-0" /> Use 1600x900px for featured images</li>
                <li className="flex items-start gap-2"><Info className="w-3 h-3 mt-0.5 flex-shrink-0" /> Always add descriptive ALT text</li>
                <li className="flex items-start gap-2"><Info className="w-3 h-3 mt-0.5 flex-shrink-0" /> Use WebP format for better performance</li>
                <li className="flex items-start gap-2"><Info className="w-3 h-3 mt-0.5 flex-shrink-0" /> Keep file size under 200KB</li>
              </ul>
              {form.featuredImageAlt.length > 0 && form.featuredImageAlt.length < 5 && (
                <p className="text-amber-400 text-xs mt-3 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> ALT text should be descriptive (5+ chars)</p>
              )}
            </div>
          </div>
        )}

        {/* ========== CODE TAB ========== */}
        {tab === "code" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Tool Code</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-dark-500 text-xs">TypeScript / TSX</span>
                    <button onClick={() => {
                      if (form.toolCode) navigator.clipboard.writeText(form.toolCode)
                    }} className="text-xs text-dark-400 hover:text-white px-2 py-1 bg-dark-700 rounded">Copy</button>
                  </div>
                </div>
                <p className="text-dark-400 text-sm mb-4">Edit the calculator implementation code. Changes here affect the tool&apos;s logic.</p>
                <textarea value={form.toolCode} onChange={(e) => setForm({ ...form, toolCode: e.target.value })}
                  rows={25}
                  className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-green-400 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
                  placeholder="// Calculator implementation code
export function compute(inputs) {
  // Your logic here
  return results
}" spellCheck={false} />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-dark-500 text-xs">{form.toolCode.split("\n").length} lines</span>
                  <span className="text-dark-500 text-xs">Auto-save enabled</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 self-start xl:sticky xl:top-4">
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Code Tips</h3>
                <ul className="space-y-2 text-xs text-dark-400">
                  <li className="flex items-start gap-2"><Code className="w-3 h-3 mt-0.5 flex-shrink-0" /> Write clean, well-structured code</li>
                  <li className="flex items-start gap-2"><Code className="w-3 h-3 mt-0.5 flex-shrink-0" /> Use TypeScript for type safety</li>
                  <li className="flex items-start gap-2"><Code className="w-3 h-3 mt-0.5 flex-shrink-0" /> Handle edge cases and validation</li>
                  <li className="flex items-start gap-2"><Code className="w-3 h-3 mt-0.5 flex-shrink-0" /> Test before publishing</li>
                </ul>
              </div>
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Version History</h3>
                {versions.length > 0 ? (
                  <div className="space-y-2">
                    {versions.map((v, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-dark-900/50">
                        <span className="text-white text-sm">v{v.version}</span>
                        <span className="text-dark-500 text-xs">{v.lastUpdated}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-dark-500 text-xs">No history yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========== RELATIONS TAB ========== */}
        {tab === "relations" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Related Tools</h2>
                  <span className="text-dark-500 text-xs">{form.relatedSlugs.length}</span>
                </div>
                <div className="space-y-2 mb-3">
                  {form.relatedSlugs.map((s) => {
                    const rt = calculators.find((c) => c.slug === s)
                    return (
                      <div key={s} className="flex items-center justify-between p-2 rounded-lg bg-dark-900/50">
                        <span className="text-dark-300 text-sm">{rt?.name || s}</span>
                        <button onClick={() => setForm({ ...form, relatedSlugs: form.relatedSlugs.filter((r) => r !== s) })}
                          className="text-dark-500 hover:text-red-400 text-xs">Remove</button>
                      </div>
                    )
                  })}
                  {form.relatedSlugs.length === 0 && <p className="text-dark-500 text-sm">No related tools</p>}
                </div>
                <select onChange={(e) => { if (e.target.value) setForm({ ...form, relatedSlugs: [...form.relatedSlugs, e.target.value] }); e.target.value = "" }}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">Add related tool...</option>
                  {calculators.filter((c) => !form.relatedSlugs.includes(c.slug)).map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Related Articles</h2>
                  <span className="text-dark-500 text-xs">{form.relatedArticleSlugs.length}</span>
                </div>
                <div className="space-y-2 mb-3">
                  {form.relatedArticleSlugs.map((s) => {
                    const ra = blogs.find((b) => b.slug === s)
                    return (
                      <div key={s} className="flex items-center justify-between p-2 rounded-lg bg-dark-900/50">
                        <span className="text-dark-300 text-sm truncate">{ra?.title || s}</span>
                        <button onClick={() => setForm({ ...form, relatedArticleSlugs: form.relatedArticleSlugs.filter((r) => r !== s) })}
                          className="text-dark-500 hover:text-red-400 text-xs ml-2">Remove</button>
                      </div>
                    )
                  })}
                  {form.relatedArticleSlugs.length === 0 && <p className="text-dark-500 text-sm">No related articles</p>}
                </div>
                <select onChange={(e) => { if (e.target.value) setForm({ ...form, relatedArticleSlugs: [...form.relatedArticleSlugs, e.target.value] }); e.target.value = "" }}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">Add related article...</option>
                  {blogs.filter((b) => !form.relatedArticleSlugs.includes(b.slug)).map((b) => (
                    <option key={b.slug} value={b.slug}>{b.title}</option>
                  ))}
                </select>
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Examples</h2>
                  <button onClick={() => setForm({ ...form, examples: [...form.examples, { title: "", inputs: {}, explanation: "" }] })}
                    className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-xs font-medium transition-colors">+ Add Example</button>
                </div>
                {form.examples.map((ex, i) => (
                  <div key={i} className="p-3 rounded-lg bg-dark-900/50 border border-dark-700 mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-dark-500 text-xs font-medium">Example #{i + 1}</span>
                      <button onClick={() => setForm({ ...form, examples: form.examples.filter((_, j) => j !== i) })}
                        className="text-dark-500 hover:text-red-400 text-xs">Remove</button>
                    </div>
                    <div className="space-y-2">
                      <input type="text" value={ex.title} onChange={(e) => {
                        const exs = [...form.examples]; exs[i] = { ...exs[i], title: e.target.value }; setForm({ ...form, examples: exs })
                      }} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Example title" />
                      <textarea value={ex.explanation || ""} onChange={(e) => {
                        const exs = [...form.examples]; exs[i] = { ...exs[i], explanation: e.target.value }; setForm({ ...form, examples: exs })
                      }} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Explanation (optional)" rows={2} />
                    </div>
                  </div>
                ))}
                {form.examples.length === 0 && <p className="text-dark-500 text-sm text-center py-4">No examples yet.</p>}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">FAQs</h2>
                  <button onClick={() => setForm({ ...form, faqs: [...form.faqs, { question: "", answer: "" }] })}
                    className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-xs font-medium transition-colors">+ Add FAQ</button>
                </div>
                <div className="space-y-3">
                  {form.faqs.map((faq, i) => (
                    <div key={i} className="p-3 rounded-lg bg-dark-900/50 border border-dark-700">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-dark-500 text-xs font-medium">FAQ #{i + 1}</span>
                        <button onClick={() => setForm({ ...form, faqs: form.faqs.filter((_, j) => j !== i) })}
                          className="text-dark-500 hover:text-red-400 text-xs">Remove</button>
                      </div>
                      <div className="space-y-2">
                        <input type="text" value={faq.question} onChange={(e) => {
                          const f = [...form.faqs]; f[i] = { ...f[i], question: e.target.value }; setForm({ ...form, faqs: f })
                        }} placeholder="Question"
                          className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        <textarea value={faq.answer} onChange={(e) => {
                          const f = [...form.faqs]; f[i] = { ...f[i], answer: e.target.value }; setForm({ ...form, faqs: f })
                        }} placeholder="Answer" rows={2}
                          className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                      </div>
                    </div>
                  ))}
                  {form.faqs.length === 0 && <p className="text-dark-500 text-sm text-center py-4">No FAQs yet.</p>}
                </div>
              </div>

              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Internal Links</h2>
                  <button onClick={() => setForm({ ...form, internalLinks: [...form.internalLinks, { text: "", href: "" }] })}
                    className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-xs font-medium transition-colors">+ Add Link</button>
                </div>
                {form.internalLinks.map((link, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={link.text} onChange={(e) => {
                      const l = [...form.internalLinks]; l[i] = { ...l[i], text: e.target.value }; setForm({ ...form, internalLinks: l })
                    }} className="flex-1 px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Link text" />
                    <input type="text" value={link.href} onChange={(e) => {
                      const l = [...form.internalLinks]; l[i] = { ...l[i], href: e.target.value }; setForm({ ...form, internalLinks: l })
                    }} className="flex-1 px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono" placeholder="/slug" />
                    <button onClick={() => setForm({ ...form, internalLinks: form.internalLinks.filter((_, j) => j !== i) })}
                      className="p-2 text-dark-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                {form.internalLinks.length === 0 && <p className="text-dark-500 text-sm text-center py-4">No internal links defined.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ========== SETTINGS TAB ========== */}
        {tab === "settings" && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4">Author & Dates</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Author</label>
                  <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Author name" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Publish Date</label>
                    <input type="date" value={form.publishDate} onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">Last Updated</label>
                    <input type="date" value={form.publishDate ? new Date().toISOString().split("T")[0] : ""} disabled
                      className="w-full px-3 py-2 bg-dark-900/50 border border-dark-700 rounded-lg text-dark-500 text-sm cursor-not-allowed" />
                    <p className="text-dark-500 text-xs mt-1">Auto-updated on save</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4">Status</h2>
              <div className="flex gap-2 mb-4">
                <button onClick={() => setForm({ ...form, status: "published" })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${form.status === "published" ? "bg-green-600 text-white" : "bg-dark-700 text-dark-400 hover:text-white"}`}>Published</button>
                <button onClick={() => setForm({ ...form, status: "draft" })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${form.status === "draft" ? "bg-yellow-600 text-white" : "bg-dark-700 text-dark-400 hover:text-white"}`}>Draft</button>
              </div>
              <div className="bg-dark-900/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-300">Content Blocks</span>
                  <span className="text-white">{form.contentBlocks.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-300">FAQs</span>
                  <span className="text-white">{form.faqs.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-300">Related Tools</span>
                  <span className="text-white">{form.relatedSlugs.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-300">Related Articles</span>
                  <span className="text-white">{form.relatedArticleSlugs.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-300">Gallery Images</span>
                  <span className="text-white">{form.gallery.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-300">Examples</span>
                  <span className="text-white">{form.examples.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-300">Internal Links</span>
                  <span className="text-white">{form.internalLinks.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4">Version Info</h2>
              <div className="space-y-2">
                {versions.length > 0 ? versions.map((v, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-dark-900/50">
                    <div className="flex items-center gap-3">
                      <span className="text-primary-400 text-sm font-mono">v{v.version}</span>
                      <span className="text-dark-400 text-xs">{v.lastUpdated}</span>
                    </div>
                    {i === 0 && <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded">Current</span>}
                  </div>
                )) : <p className="text-dark-500 text-sm">Save the tool to create version history.</p>}
              </div>
            </div>

            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4">Danger Zone</h2>
              <p className="text-dark-400 text-sm mb-4">Actions here cannot be undone. Please be certain.</p>
              <button className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors">
                Delete this tool
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
