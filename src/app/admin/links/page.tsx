"use client"

import { useState, useEffect, useMemo } from "react"
import { calculators } from "@/data/calculators"
import { blogs } from "@/data/blogs"
import { CATEGORIES } from "@/lib/constants"
import { getTools, saveTool } from "@/cms/services/tool-service"
import type { CmsToolMeta } from "@/cms/types"
import { Search, Link2, AlertTriangle, CheckCircle, RefreshCw, ExternalLink, Plus, Loader2, ArrowRight } from "lucide-react"

export default function InternalLinkManager() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState<"orphan" | "low-links" | "duplicates" | "articles">("orphan")
  const [cmsTools, setCmsTools] = useState<CmsToolMeta[]>([])
  const [saving, setSaving] = useState<string | null>(null)
  const [addingTo, setAddingTo] = useState<string | null>(null)
  const [addSlug, setAddSlug] = useState("")

  useEffect(() => { getTools().then(setCmsTools) }, [])

  const allToolSlugs = new Set(calculators.map((c) => c.slug))
  const allBlogSlugs = new Set(blogs.map((b) => b.slug))

  const linkGraph = useMemo(() => {
    const incoming = new Map<string, Set<string>>()
    for (const c of calculators) {
      for (const slug of c.relatedSlugs) {
        if (!incoming.has(slug)) incoming.set(slug, new Set())
        incoming.get(slug)!.add(c.slug)
      }
    }
    for (const t of cmsTools) {
      for (const slug of t.relatedSlugs) {
        if (!incoming.has(slug)) incoming.set(slug, new Set())
        incoming.get(slug)!.add(t.slug)
      }
    }
    return incoming
  }, [cmsTools])

  const orphanTools = useMemo(() =>
    calculators.filter((c) => !linkGraph.has(c.slug)),
    [linkGraph]
  )

  const relatedToolScores = useMemo(() =>
    calculators.map((c) => ({
      slug: c.slug, name: c.name, category: c.category,
      relatedCount: linkGraph.get(c.slug)?.size || 0,
      outgoingCount: c.relatedSlugs.length,
    })).sort((a, b) => a.relatedCount - b.relatedCount),
    [linkGraph]
  )

  const lowLinkTools = relatedToolScores.filter((t) => t.relatedCount <= 2)

  const duplicates = useMemo(() => {
    const seen = new Map<string, { name: string; slug: string }[]>()
    for (const c of calculators) {
      for (const slug of c.relatedSlugs) {
        if (!seen.has(slug)) seen.set(slug, [])
        seen.get(slug)!.push({ name: c.name, slug: c.slug })
      }
    }
    for (const t of cmsTools) {
      for (const slug of t.relatedSlugs) {
        if (!seen.has(slug)) seen.set(slug, [])
        if (!seen.get(slug)!.find((s) => s.slug === t.slug)) {
          seen.get(slug)!.push({ name: t.name, slug: t.slug })
        }
      }
    }
    return Array.from(seen.entries()).filter(([, sources]) => sources.length > 1)
      .slice(0, 20).map(([target, sources]) => ({ target, sourceCount: sources.length, sources }))
  }, [cmsTools])

  const articleLinks = useMemo(() => {
    return blogs.map((b) => {
      const links = (b.content.match(/\/[a-z0-9-]+/g) || [])
        .map((l) => l.replace(/^\//, ""))
        .filter((slug) => slug.length > 2 && allToolSlugs.has(slug))
      return { title: b.title, slug: b.slug, links }
    }).filter((a) => a.links.length > 0)
  }, [])

  const filteredOrphans = orphanTools.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddLink = async (fromSlug: string) => {
    if (!addSlug || !allToolSlugs.has(addSlug)) return
    setSaving(fromSlug)
    try {
      const existing = await getTools()
      const cms = existing.find((t) => t.slug === fromSlug)
      const related = new Set([...(cms?.relatedSlugs || []), ...(calculators.find((c) => c.slug === fromSlug)?.relatedSlugs || [])])
      if (related.has(addSlug)) { setSaving(null); setAddingTo(null); return }
      await saveTool(fromSlug, {
        name: cms?.name || calculators.find((c) => c.slug === fromSlug)?.name || fromSlug,
        slug: fromSlug,
        category: cms?.category || calculators.find((c) => c.slug === fromSlug)?.category || "",
        description: cms?.description || "",
        shortDescription: cms?.shortDescription || "",
        metaTitle: cms?.metaTitle || "",
        metaDescription: cms?.metaDescription || "",
        keywords: cms?.keywords?.join(", ") || "",
        formula: cms?.formula || "",
        status: cms?.status || "published",
        faqs: cms?.faqs || [],
        relatedSlugs: [...related, addSlug],
        relatedArticleSlugs: cms?.relatedArticleSlugs || [],
        featuredImage: cms?.featuredImage || "",
        featuredImageAlt: cms?.featuredImageAlt || "",
        gallery: cms?.gallery || [],
        author: cms?.author || "",
        publishDate: cms?.publishDate || "",
        canonicalUrl: cms?.canonicalUrl || "",
        ogImage: cms?.ogImage || "",
        ogTitle: cms?.ogTitle || "",
        ogDescription: cms?.ogDescription || "",
        twitterCard: cms?.twitterCard || "summary_large_image",
        robots: cms?.robots || "",
        breadcrumb: cms?.breadcrumb || [],
        contentBlocks: cms?.contentBlocks || [],
        toolCode: cms?.toolCode || "",
        examples: cms?.examples || [],
        internalLinks: cms?.internalLinks || [],
        schema: JSON.stringify(cms?.schema || {}),
      })
      setCmsTools(await getTools())
      setAddingTo(null)
    } catch { alert("Failed to add link") }
    finally { setSaving(null) }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Internal Link Manager</h1>
        <p className="text-dark-400 mt-1">Monitor and improve internal linking across the site</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-400 mb-2"><AlertTriangle className="w-4 h-4" /><span className="text-sm font-medium">Orphan Tools</span></div>
          <p className="text-2xl font-bold text-white">{orphanTools.length}</p>
          <p className="text-dark-500 text-xs mt-1">No incoming related links</p>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-400 mb-2"><AlertTriangle className="w-4 h-4" /><span className="text-sm font-medium">Low Links</span></div>
          <p className="text-2xl font-bold text-white">{lowLinkTools.length}</p>
          <p className="text-dark-500 text-xs mt-1">0-2 incoming links</p>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-purple-400 mb-2"><Link2 className="w-4 h-4" /><span className="text-sm font-medium">Dup. Targets</span></div>
          <p className="text-2xl font-bold text-white">{duplicates.length}</p>
          <p className="text-dark-500 text-xs mt-1">Tools linked from 2+ sources</p>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-400 mb-2"><CheckCircle className="w-4 h-4" /><span className="text-sm font-medium">Avg Links</span></div>
          <p className="text-2xl font-bold text-white">
            {(relatedToolScores.reduce((a, b) => a + b.relatedCount, 0) / Math.max(relatedToolScores.length, 1)).toFixed(1)}
          </p>
          <p className="text-dark-500 text-xs mt-1">Per tool average</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {(["orphan", "low-links", "duplicates", "articles"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"}`}>
            {t === "orphan" ? `Orphans (${orphanTools.length})` :
             t === "low-links" ? `Low Links (${lowLinkTools.length})` :
             t === "duplicates" ? `Duplicates (${duplicates.length})` :
             `Articles (${articleLinks.length})`}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input type="text" placeholder={`Search ${tab === "orphan" ? "orphan tools" : tab === "low-links" ? "tools" : tab === "duplicates" ? "duplicate targets" : "articles"}...`}
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
        {tab === "orphan" && (
          <>
            <div className="p-4 border-b border-dark-700"><h2 className="text-white font-semibold text-sm">Orphan Tools (no incoming related links)</h2></div>
            {filteredOrphans.length === 0 ? (
              <div className="p-4 text-center text-dark-500 text-sm">{search ? "No matching tools." : "No orphan tools found. All tools are well-connected!"}</div>
            ) : (
              <div className="divide-y divide-dark-700/50">
                {filteredOrphans.slice(0, 50).map((tool) => (
                  <div key={tool.slug} className="flex items-center justify-between p-4 hover:bg-dark-800/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-dark-900 flex items-center justify-center flex-shrink-0">
                        <Link2 className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-white text-sm font-medium">{tool.name}</span>
                        <code className="block text-dark-500 text-xs mt-0.5">/{tool.slug}</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs bg-dark-700 px-2 py-1 rounded text-dark-400">{tool.category}</span>
                      <button onClick={() => setAddingTo(addingTo === tool.slug ? null : tool.slug)}
                        className="flex items-center gap-1 px-2 py-1 bg-primary-600/10 hover:bg-primary-600/20 text-primary-400 rounded text-xs transition-colors">
                        <Plus className="w-3 h-3" /> Add link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "low-links" && (
          <>
            <div className="p-4 border-b border-dark-700"><h2 className="text-white font-semibold text-sm">Tools with Low Incoming Links</h2></div>
            <div className="divide-y divide-dark-700/50">
              {lowLinkTools.filter((t) => t.name.toLowerCase().includes(search.toLowerCase())).slice(0, 50).map((tool) => (
                <div key={tool.slug} className="flex items-center justify-between p-4 hover:bg-dark-800/30 transition-colors">
                  <div>
                    <span className="text-white text-sm font-medium">{tool.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-dark-700 text-dark-300">{tool.relatedCount} incoming</span>
                      <span className="text-xs text-dark-500">{tool.outgoingCount} outgoing</span>
                    </div>
                  </div>
                  <span className="text-xs bg-dark-700 px-2 py-1 rounded text-dark-400">{tool.category}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "duplicates" && (
          <>
            <div className="p-4 border-b border-dark-700"><h2 className="text-white font-semibold text-sm">Duplicate Link Targets (linked from multiple sources)</h2></div>
            {duplicates.length === 0 ? (
              <div className="p-4 text-center text-dark-500 text-sm">No duplicate patterns detected.</div>
            ) : (
              <div className="divide-y divide-dark-700/50">
                {duplicates.filter((d) => d.target.includes(search.toLowerCase())).slice(0, 30).map((dup) => (
                  <div key={dup.target} className="p-4 hover:bg-dark-800/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">{calculators.find((c) => c.slug === dup.target)?.name || dup.target}</span>
                      <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Linked from {dup.sourceCount} tools</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {dup.sources.map((s) => (
                        <span key={s.slug} className="text-xs text-dark-400 bg-dark-700 px-2 py-0.5 rounded">{s.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "articles" && (
          <>
            <div className="p-4 border-b border-dark-700"><h2 className="text-white font-semibold text-sm">Articles with Internal Tool Links</h2></div>
            {articleLinks.length === 0 ? (
              <div className="p-4 text-center text-dark-500 text-sm">No articles with internal tool links found.</div>
            ) : (
              <div className="divide-y divide-dark-700/50">
                {articleLinks.filter((a) => a.title.toLowerCase().includes(search.toLowerCase())).slice(0, 30).map((article) => (
                  <div key={article.slug} className="p-4 hover:bg-dark-800/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">{article.title}</span>
                      <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">{article.links.length} links</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {article.links.map((slug) => {
                        const tool = calculators.find((c) => c.slug === slug)
                        return (
                          <span key={slug} className="text-xs text-dark-400 bg-dark-700 px-2 py-0.5 rounded">{tool?.name || slug}</span>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {addingTo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setAddingTo(null)}>
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-5 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-semibold mb-3">Add Related Link to {calculators.find((c) => c.slug === addingTo)?.name || addingTo}</h3>
            <select value={addSlug} onChange={(e) => setAddSlug(e.target.value)}
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm mb-3">
              <option value="">Select a tool...</option>
              {calculators.filter((c) => c.slug !== addingTo).map((c) => (
                <option key={c.slug} value={c.slug}>{c.name} ({c.category})</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button onClick={() => handleAddLink(addingTo)} disabled={!addSlug || saving === addingTo}
                className="flex items-center gap-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg text-sm transition-colors">
                {saving === addingTo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Add Link
              </button>
              <button onClick={() => setAddingTo(null)} className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-sm transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
