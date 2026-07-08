"use client"

import { useState, useMemo } from "react"
import { calculators } from "@/data/calculators"
import { blogs } from "@/data/blogs"
import { comparisons } from "@/data/comparisons"
import { CATEGORIES } from "@/lib/constants"
import { Map, Search, ExternalLink, RefreshCw } from "lucide-react"

const CUSTOM_PAGES = [
  "/", "/about", "/blog", "/calculators", "/categories", "/compare",
  "/contact", "/privacy-policy", "/terms", "/disclaimer", "/cookie-policy",
  "/editorial-policy", "/search",
]

const STANDALONE_CALCULATORS = [
  "ai-token-cost-calculator", "severance-pay-calculator", "inheritance-tax-calculator",
  "emergency-fund-calculator", "cd-ladder-calculator", "salary-sacrifice-calculator",
  "hsa-tax-savings-calculator", "roth-conversion-tax-calculator",
]

export default function SitemapManager() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "tools" | "articles" | "categories" | "pages">("all")

  const entries = useMemo(() => {
    const all: { url: string; type: string; priority: string; changefreq: string }[] = []

    if (filter === "all" || filter === "pages") {
      CUSTOM_PAGES.forEach((p) => {
        all.push({ url: p, type: "page", priority: p === "/" ? "1.0" : "0.8", changefreq: "daily" })
      })
    }
    if (filter === "all" || filter === "tools") {
      calculators.forEach((c) => {
        all.push({ url: `/${c.slug}`, type: "tool", priority: "0.7", changefreq: "monthly" })
      })
      STANDALONE_CALCULATORS.forEach((s) => {
        all.push({ url: `/${s}`, type: "tool", priority: "0.7", changefreq: "monthly" })
      })
    }
    if (filter === "all" || filter === "articles") {
      blogs.forEach((b) => {
        all.push({ url: `/${b.slug}`, type: "article", priority: "0.8", changefreq: "monthly" })
      })
    }
    if (filter === "all" || filter === "categories") {
      CATEGORIES.forEach((c) => {
        all.push({ url: `/${c.slug}`, type: "category", priority: "0.8", changefreq: "weekly" })
      })
      comparisons.forEach((c) => {
        all.push({ url: `/${c.slug}`, type: "comparison", priority: "0.7", changefreq: "monthly" })
      })
    }
    return all
  }, [filter])

  const filtered = entries.filter((e) =>
    e.url.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Sitemap</h1>
          <p className="text-dark-400 mt-1">{entries.length} URLs in the sitemap</p>
        </div>
        <a
          href="/sitemap.xml"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-700 text-white rounded-lg text-sm hover:bg-dark-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Sitemap
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input
            type="text"
            placeholder="Search URLs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "tools", "articles", "categories", "pages"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-primary-600 text-white"
                  : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">URL</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">Type</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">Priority</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">Change Freq</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={entry.url} className="border-b border-dark-700/50 hover:bg-dark-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <code className="text-dark-300 text-sm">https://measurely.in{entry.url}</code>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      entry.type === "tool" ? "bg-blue-500/10 text-blue-400" :
                      entry.type === "article" ? "bg-green-500/10 text-green-400" :
                      entry.type === "category" ? "bg-amber-500/10 text-amber-400" :
                      "bg-purple-500/10 text-purple-400"
                    }`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-dark-400 text-sm">{entry.priority}</td>
                  <td className="px-4 py-3 text-dark-400 text-sm">{entry.changefreq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
