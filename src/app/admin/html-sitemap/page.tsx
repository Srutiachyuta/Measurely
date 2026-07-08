"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { calculators } from "@/data/calculators"
import { blogs } from "@/data/blogs"
import { comparisons } from "@/data/comparisons"
import { CATEGORIES } from "@/lib/constants"
import { Globe, Copy, CheckCircle, ExternalLink } from "lucide-react"

export default function HtmlSitemapPage() {
  const [section, setSection] = useState<string>("all")
  const [copied, setCopied] = useState(false)

  const groups = useMemo(() => {
    const g: { label: string; key: string; items: { label: string; href: string }[] }[] = [
      {
        label: "Main Pages",
        key: "pages",
        items: [
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "Blog", href: "/blog" },
          { label: "Categories", href: "/categories" },
          { label: "Compare", href: "/compare" },
          { label: "Search", href: "/search" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms", href: "/terms" },
          { label: "Disclaimer", href: "/disclaimer" },
          { label: "Cookie Policy", href: "/cookie-policy" },
          { label: "Editorial Policy", href: "/editorial-policy" },
        ],
      },
      {
        label: "Calculators",
        key: "tools",
        items: calculators.map((c) => ({ label: c.name, href: `/${c.slug}` })),
      },
      {
        label: "Articles",
        key: "articles",
        items: blogs.map((b) => ({ label: b.title, href: `/${b.slug}` })),
      },
      {
        label: "Categories",
        key: "categories",
        items: CATEGORIES.map((c) => ({ label: c.name, href: `/${c.slug}` })),
      },
      {
        label: "Comparisons",
        key: "comparisons",
        items: comparisons.map((c) => ({ label: c.name, href: `/${c.slug}` })),
      },
    ]
    return g
  }, [])

  const filtered = section === "all" ? groups : groups.filter((g) => g.key === section)
  const total = groups.reduce((acc, g) => acc + g.items.length, 0)

  const generateHtml = () => {
    let html = `<!-- HTML Sitemap for Measurely -->\n<ul>\n`
    for (const group of groups) {
      html += `  <li><strong>${group.label}</strong>\n    <ul>\n`
      for (const item of group.items) {
        html += `      <li><a href="https://measurely.in${item.href}">${item.label}</a></li>\n`
      }
      html += `    </ul>\n  </li>\n`
    }
    html += `</ul>`
    return html
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateHtml())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">HTML Sitemap</h1>
          <p className="text-dark-400 mt-1">{total} total URLs across all content</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-700 text-white rounded-lg text-sm hover:bg-dark-700 transition-colors"
        >
          {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy HTML"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSection("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${section === "all" ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"}`}>
          All ({total})
        </button>
        {groups.map((g) => (
          <button key={g.key} onClick={() => setSection(g.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${section === g.key ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"}`}>
            {g.label} ({g.items.length})
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filtered.map((group) => (
          <div key={group.key} className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary-400" />
              {group.label}
              <span className="text-xs font-normal text-dark-400">({group.items.length})</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-dark-700 text-dark-300 hover:text-white text-sm transition-colors group">
                  <ExternalLink className="w-3 h-3 text-dark-600 group-hover:text-primary-400 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-3">Generated HTML</h2>
        <pre className="bg-dark-900 rounded-lg p-4 overflow-x-auto text-xs text-green-400 font-mono max-h-64 overflow-y-auto">{generateHtml()}</pre>
      </div>
    </div>
  )
}
