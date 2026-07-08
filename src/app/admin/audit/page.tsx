"use client"

import { useState, useEffect } from "react"
import { calculators } from "@/data/calculators"
import { blogs } from "@/data/blogs"
import { comparisons } from "@/data/comparisons"
import { CATEGORIES } from "@/lib/constants"
import { getTools } from "@/cms/services/tool-service"
import { getSeoOverrides } from "@/cms/services/seo-service"
import { readJsonFile } from "@/cms/lib/api"
import type { CmsToolMeta, SeoOverride, CmsMediaItem } from "@/cms/types"
import {
  CheckSquare, AlertTriangle, XCircle, CheckCircle, Info,
  Search, RefreshCw, FileText, Loader2,
} from "lucide-react"

interface AuditIssue {
  type: "error" | "warning" | "info"
  category: "seo" | "content" | "links" | "schema" | "media"
  message: string
  location: string
  fixable: boolean
}

export default function QualityAudit() {
  const [running, setRunning] = useState(false)
  const [issues, setIssues] = useState<AuditIssue[]>([])
  const [filter, setFilter] = useState<"all" | "error" | "warning" | "info">("all")
  const [ran, setRan] = useState(false)
  const [cmsTools, setCmsTools] = useState<CmsToolMeta[]>([])
  const [seoOverrides, setSeoOverrides] = useState<SeoOverride[]>([])
  const [media, setMedia] = useState<CmsMediaItem[]>([])

  useEffect(() => {
    Promise.all([
      getTools(), getSeoOverrides(),
      readJsonFile<CmsMediaItem[]>("media.json").catch(() => []),
    ]).then(([tools, seo, m]) => {
      setCmsTools(tools)
      setSeoOverrides(seo)
      setMedia(Array.isArray(m) ? m : [])
    })
  }, [])

  const runAudit = () => {
    setRunning(true)
    setIssues([])

    const found: AuditIssue[] = []
    const allSlugs = new Set(calculators.map((c) => c.slug))

    // --- DUPLICATE META TITLES (static + CMS) ---
    const titleMap = new Map<string, string[]>()
    for (const c of calculators) {
      const title = cmsTools.find((t) => t.slug === c.slug)?.metaTitle || c.metaTitle
      const existing = titleMap.get(title) || []
      existing.push(c.slug)
      titleMap.set(title, existing)
    }
    for (const [title, slugs] of titleMap) {
      if (slugs.length > 1) {
        found.push({ type: "error", category: "seo", message: `Duplicate meta title: "${title.slice(0, 60)}" used by ${slugs.length} pages`, location: slugs.join(", "), fixable: true })
      }
    }

    // --- DUPLICATE META DESCRIPTIONS ---
    const descMap = new Map<string, string[]>()
    for (const c of calculators) {
      const desc = cmsTools.find((t) => t.slug === c.slug)?.metaDescription || c.metaDescription
      const existing = descMap.get(desc) || []
      existing.push(c.slug)
      descMap.set(desc, existing)
    }
    for (const [desc, slugs] of descMap) {
      if (slugs.length > 1 && desc.length > 20) {
        found.push({ type: "warning", category: "seo", message: `Duplicate meta description used by ${slugs.length} pages`, location: slugs.join(", "), fixable: true })
      }
    }

    // --- META TITLE LENGTH ---
    for (const c of calculators) {
      const title = cmsTools.find((t) => t.slug === c.slug)?.metaTitle || c.metaTitle
      if (title.length < 30) found.push({ type: "warning", category: "seo", message: `Short meta title (${title.length} chars): ${c.name}`, location: `/${c.slug}`, fixable: true })
      if (title.length > 70) found.push({ type: "warning", category: "seo", message: `Long meta title (${title.length} chars): ${c.name}`, location: `/${c.slug}`, fixable: true })
    }

    // --- META DESCRIPTION LENGTH ---
    for (const c of calculators) {
      const desc = cmsTools.find((t) => t.slug === c.slug)?.metaDescription || c.metaDescription
      if (desc.length < 80) found.push({ type: "warning", category: "seo", message: `Short meta description (${desc.length} chars): ${c.name}`, location: `/${c.slug}`, fixable: true })
      if (desc.length > 160) found.push({ type: "warning", category: "seo", message: `Long meta description (${desc.length} chars): ${c.name}`, location: `/${c.slug}`, fixable: true })
    }

    // --- MISSING META TITLE ---
    for (const c of calculators) {
      const title = cmsTools.find((t) => t.slug === c.slug)?.metaTitle || c.metaTitle
      if (!title) found.push({ type: "error", category: "seo", message: `Missing meta title: ${c.name}`, location: `/${c.slug}`, fixable: true })
    }

    // --- MISSING META DESCRIPTION ---
    for (const c of calculators) {
      const desc = cmsTools.find((t) => t.slug === c.slug)?.metaDescription || c.metaDescription
      if (!desc) found.push({ type: "error", category: "seo", message: `Missing meta description: ${c.name}`, location: `/${c.slug}`, fixable: true })
    }

    // --- MISSING CANONICAL URL ---
    for (const t of cmsTools) {
      if (!t.canonicalUrl) found.push({ type: "info", category: "seo", message: `Missing canonical URL: ${t.name}`, location: `/admin/tools/${t.slug}`, fixable: true })
    }

    // --- MISSING OPEN GRAPH IMAGE ---
    for (const t of cmsTools) {
      if (!t.ogImage) found.push({ type: "info", category: "seo", message: `Missing OG image: ${t.name}`, location: `/admin/tools/${t.slug}`, fixable: true })
    }

    // --- SEO OVERRIDES WITHOUT SCHEMA ---
    for (const ov of seoOverrides) {
      if (ov.type === "tool") {
        const cms = cmsTools.find((t) => t.slug === ov.slug)
        if (cms && (!cms.schema || Object.keys(cms.schema).length === 0)) {
          found.push({ type: "info", category: "schema", message: `SEO override exists but no schema for: ${cms.name}`, location: `/admin/tools/${ov.slug}`, fixable: true })
        }
      }
    }

    // --- BROKEN RELATED LINKS ---
    for (const c of calculators) {
      for (const slug of c.relatedSlugs) {
        if (!allSlugs.has(slug)) {
          found.push({ type: "error", category: "links", message: `Broken related link in "${c.name}": "${slug}" does not exist`, location: `/${c.slug}`, fixable: true })
        }
      }
    }
    for (const t of cmsTools) {
      for (const slug of t.relatedSlugs) {
        if (!allSlugs.has(slug)) {
          found.push({ type: "error", category: "links", message: `Broken CMS related link in "${t.name}": "${slug}" does not exist`, location: `/admin/tools/${t.slug}`, fixable: true })
        }
      }
    }

    // --- ORPHAN TOOLS ---
    const linkedTo = new Map<string, number>()
    for (const c of calculators) {
      for (const slug of c.relatedSlugs) linkedTo.set(slug, (linkedTo.get(slug) || 0) + 1)
    }
    for (const c of calculators) {
      const count = linkedTo.get(c.slug) || 0
      if (count === 0) found.push({ type: "warning", category: "links", message: `Orphan tool: "${c.name}" has no incoming related links`, location: `/${c.slug}`, fixable: true })
    }

    // --- NO RELATED TOOLS ---
    for (const c of calculators) {
      const related = cmsTools.find((t) => t.slug === c.slug)?.relatedSlugs || c.relatedSlugs
      if (related.length === 0) found.push({ type: "info", category: "links", message: `"${c.name}" has no related tools configured`, location: `/${c.slug}`, fixable: true })
    }

    // --- BROKEN INTERNAL LINKS in articles ---
    for (const b of blogs) {
      const internalLinks = b.content.match(/\/[a-z0-9-]+/g) || []
      for (const link of internalLinks) {
        const slug = link.replace(/^\//, "")
        if (!allSlugs.has(slug) && !blogs.find((bb) => bb.slug === slug) && slug.length > 3) {
          found.push({ type: "warning", category: "links", message: `Possible broken internal link in article "${b.title}": ${link}`, location: `/${b.slug}`, fixable: false })
        }
      }
    }

    // --- THIN CONTENT ---
    for (const b of blogs) {
      const wordCount = b.content.trim().split(/\s+/).length
      if (wordCount < 500) found.push({ type: "warning", category: "content", message: `Thin content (~${wordCount} words): "${b.title}"`, location: `/${b.slug}`, fixable: false })
    }

    // --- NO FAQS ---
    for (const c of calculators) {
      const faqs = cmsTools.find((t) => t.slug === c.slug)?.faqs || c.faqs || []
      if (faqs.length === 0) found.push({ type: "info", category: "content", message: `"${c.name}" has no FAQs`, location: `/${c.slug}`, fixable: true })
    }

    // --- MISSING FORMULA ---
    for (const c of calculators) {
      const formula = cmsTools.find((t) => t.slug === c.slug)?.formula || c.formula
      if (!formula) found.push({ type: "info", category: "content", message: `"${c.name}" is missing a formula definition`, location: `/${c.slug}`, fixable: true })
    }

    // --- MISSING FEATURED IMAGE (CMS only) ---
    for (const t of cmsTools) {
      if (!t.featuredImage) found.push({ type: "info", category: "media", message: `Missing featured image: ${t.name}`, location: `/admin/tools/${t.slug}`, fixable: true })
    }

    // --- MISSING ALT TEXT (CMS only) ---
    for (const t of cmsTools) {
      if (t.featuredImage && !t.featuredImageAlt) found.push({ type: "info", category: "media", message: `Missing ALT text for featured image: ${t.name}`, location: `/admin/tools/${t.slug}`, fixable: true })
    }

    // --- MEDIA WITHOUT ALT TEXT ---
    for (const m of media) {
      if (m.type === "image" && !m.altText) found.push({ type: "info", category: "media", message: `Image missing ALT text: ${m.filename}`, location: `/admin/media`, fixable: true })
    }

    // --- BLOG ARTICLES WITHOUT FAQS ---
    for (const b of blogs) {
      if (!b.faqs || b.faqs.length === 0) found.push({ type: "info", category: "content", message: `Article "${b.title}" has no FAQs`, location: `/${b.slug}`, fixable: true })
    }

    // --- COMPARISON WITHOUT FAQS ---
    for (const c of comparisons) {
      if (!c.faqs || c.faqs.length === 0) found.push({ type: "info", category: "content", message: `Comparison "${c.name}" has no FAQs`, location: `/${c.slug}`, fixable: true })
    }

    setIssues(found)
    setRan(true)
    setRunning(false)
  }

  const filtered = filter === "all" ? issues : issues.filter((i) => i.type === filter)
  const errorCount = issues.filter((i) => i.type === "error").length
  const warningCount = issues.filter((i) => i.type === "warning").length
  const infoCount = issues.filter((i) => i.type === "info").length
  const fixableCount = issues.filter((i) => i.fixable).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Quality Audit</h1>
          <p className="text-dark-400 mt-1">Deep scan across static data, CMS overrides, SEO, content, links, schema, and media</p>
        </div>
        <button onClick={runAudit} disabled={running}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">
          {running ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckSquare className="w-4 h-4" />}
          {running ? "Scanning..." : ran ? "Re-scan" : "Run Audit"}
        </button>
      </div>

      {ran && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-400 mb-2"><XCircle className="w-4 h-4" /><span className="text-xs font-medium uppercase">Errors</span></div>
              <p className="text-2xl font-bold text-white">{errorCount}</p>
            </div>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-400 mb-2"><AlertTriangle className="w-4 h-4" /><span className="text-xs font-medium uppercase">Warnings</span></div>
              <p className="text-2xl font-bold text-white">{warningCount}</p>
            </div>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <div className="flex items-center gap-2 text-blue-400 mb-2"><Info className="w-4 h-4" /><span className="text-xs font-medium uppercase">Info</span></div>
              <p className="text-2xl font-bold text-white">{infoCount}</p>
            </div>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-400 mb-2"><CheckCircle className="w-4 h-4" /><span className="text-xs font-medium uppercase">Fixable</span></div>
              <p className="text-2xl font-bold text-white">{fixableCount}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {(["all", "error", "warning", "info"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)} ({f === "all" ? issues.length : issues.filter((i) => i.type === f).length})
              </button>
            ))}
          </div>
        </>
      )}

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
        {!ran ? (
          <div className="text-center py-16">
            <CheckSquare className="w-12 h-12 text-dark-600 mx-auto mb-4" />
            <p className="text-dark-400">No audit results yet.</p>
            <p className="text-dark-500 text-sm mt-1">Click "Run Audit" to scan the project for issues across all content types.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <CheckCircle className="w-12 h-12 text-green-500/50 mx-auto mb-4" />
            <p className="text-dark-400">No {filter !== "all" ? filter : ""} issues found.</p>
          </div>
        ) : (
          <div className="divide-y divide-dark-700/50">
            {filtered.map((issue, i) => (
              <div key={i} className="flex items-start gap-3 p-4 hover:bg-dark-800/30 transition-colors">
                <div className="mt-0.5">
                  {issue.type === "error" ? <XCircle className="w-4 h-4 text-red-400" /> :
                   issue.type === "warning" ? <AlertTriangle className="w-4 h-4 text-amber-400" /> :
                   <Info className="w-4 h-4 text-blue-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{issue.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                      issue.category === "seo" ? "bg-purple-500/10 text-purple-400" :
                      issue.category === "content" ? "bg-blue-500/10 text-blue-400" :
                      issue.category === "links" ? "bg-amber-500/10 text-amber-400" :
                      issue.category === "schema" ? "bg-cyan-500/10 text-cyan-400" :
                      issue.category === "media" ? "bg-pink-500/10 text-pink-400" :
                      "bg-dark-700 text-dark-400"
                    }`}>{issue.category}</span>
                    <code className="text-dark-500 text-xs truncate max-w-[200px]">{issue.location}</code>
                    {issue.fixable && <span className="text-green-500 text-xs">Fixable</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
