"use client"

import { useState, useEffect } from "react"
import { calculators } from "@/data/calculators"
import { blogs } from "@/data/blogs"
import { comparisons } from "@/data/comparisons"
import { CATEGORIES } from "@/lib/constants"
import { getTools } from "@/cms/services/tool-service"
import { getSeoOverrides } from "@/cms/services/seo-service"
import type { CmsToolMeta, SeoOverride } from "@/cms/types"
import {
  Calculator, FileText, FolderTree, Tags, Users, TrendingUp,
  FileCheck, Clock, AlertTriangle, BarChart3, ArrowUp, ArrowDown,
  Layers, Image, Search, Shield, Zap, DollarSign, ExternalLink,
  CheckCircle, Loader2, RefreshCw
} from "lucide-react"

interface HealthItem {
  label: string
  good: boolean
  detail?: string
}

function StatCard({ icon: Icon, label, value, sub, trend, color }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; trend?: { value: string; up: boolean }; color: string
}) {
  return (
    <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 hover:border-dark-600 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark-400 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {sub && <p className="text-dark-500 text-xs mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3 text-xs">
          {trend.up ? <ArrowUp className="w-3 h-3 text-green-400" /> : <ArrowDown className="w-3 h-3 text-red-400" />}
          <span className={trend.up ? "text-green-400" : "text-red-400"}>{trend.value}</span>
        </div>
      )}
    </div>
  )
}

function HealthBar({ score, label }: { score: number; label: string }) {
  const color = score >= 80 ? "bg-green-500" : score >= 50 ? "bg-amber-500" : "bg-red-500"
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-dark-300">{label}</span>
        <span className={`font-semibold ${score >= 80 ? "text-green-400" : score >= 50 ? "text-amber-400" : "text-red-400"}`}>{score}%</span>
      </div>
      <div className="w-full bg-dark-900 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color} transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [cmsTools, setCmsTools] = useState<CmsToolMeta[]>([])
  const [seoOverrides, setSeoOverrides] = useState<SeoOverride[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getTools(), getSeoOverrides()]).then(([tools, seo]) => {
      setCmsTools(tools)
      setSeoOverrides(seo)
    }).finally(() => setLoading(false))
  }, [])

  const toolCount = calculators.length
  const articleCount = blogs.length
  const categoryCount = CATEGORIES.length
  const comparisonCount = comparisons.length
  const totalPages = toolCount + articleCount + categoryCount + comparisonCount + 13

  const publishedTools = cmsTools.filter((t) => t.status === "published").length || toolCount
  const draftTools = cmsTools.filter((t) => t.status === "draft").length
  const toolsWithSeo = seoOverrides.filter((s) => s.type === "tool").length

  const missingMeta = calculators.filter((c) => {
    const cms = cmsTools.find((t) => t.slug === c.slug)
    return !(cms?.metaTitle || c.metaTitle)
  }).length

  const missingDesc = calculators.filter((c) => {
    const cms = cmsTools.find((t) => t.slug === c.slug)
    return !(cms?.metaDescription || c.metaDescription)
  }).length

  const withSchema = cmsTools.filter((t) => t.schema && Object.keys(t.schema).length > 0).length

  const seoScore = Math.round(
    ((toolCount - missingMeta) / toolCount * 30) +
    ((toolCount - missingDesc) / toolCount * 30) +
    (toolsWithSeo / toolCount * 20) +
    (withSchema / toolCount * 20)
  )

  const healthChecks: HealthItem[] = [
    { label: "All tools have meta titles", good: missingMeta === 0, detail: missingMeta > 0 ? `${missingMeta} tools missing` : undefined },
    { label: "All tools have meta descriptions", good: missingDesc === 0, detail: missingDesc > 0 ? `${missingDesc} tools missing` : undefined },
    { label: "SEO overrides configured", good: toolsWithSeo > 0, detail: toolsWithSeo > 0 ? `${toolsWithSeo} overrides` : "None configured" },
    { label: "Structured data present", good: withSchema > 0, detail: withSchema > 0 ? `${withSchema} tools with schema` : "No schema found" },
    { label: "Published tools have CMS records", good: publishedTools > 0 },
    { label: "Categories defined", good: categoryCount > 0, detail: `${categoryCount} categories` },
    { label: "Blog articles published", good: articleCount > 0, detail: `${articleCount} articles` },
    { label: "Comparison pages active", good: comparisonCount > 0, detail: `${comparisonCount} comparisons` },
  ]
  const healthScore = Math.round(healthChecks.filter((h) => h.good).length / healthChecks.length * 100)

  const recentArticles = blogs.slice(0, 5)
  const recentCmsTools = cmsTools.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated)).slice(0, 5)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-dark-400 mt-1">Welcome to the Measurely CMS. Here is your site at a glance.</p>
        </div>
        <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-3 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-colors border border-dark-700">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 text-primary-400 animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Calculator} label="Total Tools" value={toolCount}
              sub={`${publishedTools} published, ${draftTools} drafts`} color="bg-blue-500/20 text-blue-400" />
            <StatCard icon={FileText} label="Articles" value={articleCount}
              sub="Blog posts & guides" color="bg-green-500/20 text-green-400" />
            <StatCard icon={Layers} label="Total Pages" value={totalPages}
              sub="Across all content types" color="bg-purple-500/20 text-purple-400" />
            <StatCard icon={Image} label="CMS Tools" value={cmsTools.length}
              sub={`${toolsWithSeo} with SEO overrides`} color="bg-amber-500/20 text-amber-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-400" /> SEO Health
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                  seoScore >= 80 ? "bg-green-500/10 text-green-400 border-2 border-green-500/30" :
                  seoScore >= 50 ? "bg-amber-500/10 text-amber-400 border-2 border-amber-500/30" :
                  "bg-red-500/10 text-red-400 border-2 border-red-500/30"
                }`}>{seoScore}%</div>
                <div className="text-sm text-dark-400">
                  {seoScore >= 80 ? "Good shape" : seoScore >= 50 ? "Needs work" : "Requires attention"}
                  <p className="text-xs text-dark-500 mt-0.5">{missingMeta} missing titles, {missingDesc} missing descriptions</p>
                </div>
              </div>
              <div className="w-full bg-dark-900 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all duration-700 ${seoScore >= 80 ? "bg-green-500" : seoScore >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${seoScore}%` }} />
              </div>
            </div>

            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-400" /> Site Health
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                  healthScore >= 80 ? "bg-green-500/10 text-green-400 border-2 border-green-500/30" :
                  healthScore >= 50 ? "bg-amber-500/10 text-amber-400 border-2 border-amber-500/30" :
                  "bg-red-500/10 text-red-400 border-2 border-red-500/30"
                }`}>{healthScore}%</div>
                <div className="text-sm text-dark-400">
                  {healthScore >= 80 ? "All systems operational" : healthScore >= 50 ? "Some issues found" : "Major issues detected"}
                  <p className="text-xs text-dark-500 mt-0.5">{healthChecks.filter((h) => !h.good).length} of {healthChecks.length} checks failing</p>
                </div>
              </div>
              <div className="w-full bg-dark-900 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all duration-700 ${healthScore >= 80 ? "bg-green-500" : healthScore >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${healthScore}%` }} />
              </div>
            </div>

            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary-400" /> Site Overview
              </h2>
              <div className="space-y-2">
                {[
                  { label: "Finance", count: calculators.filter((c) => c.category === "finance").length, icon: DollarSign },
                  { label: "Health", count: calculators.filter((c) => c.category === "health").length, icon: Heart },
                  { label: "Math", count: calculators.filter((c) => c.category === "math").length, icon: Calculator },
                  { label: "Time", count: calculators.filter((c) => c.category === "time").length, icon: Clock },
                  { label: "Blog Articles", count: articleCount, icon: FileText },
                  { label: "Comparisons", count: comparisonCount, icon: Search },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-dark-500" />
                        <span className="text-dark-300 text-sm">{item.label}</span>
                      </div>
                      <span className="text-white font-semibold text-sm">{item.count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-400" /> Recent Articles
              </h2>
              <div className="space-y-2">
                {recentArticles.map((article) => (
                  <a key={article.slug} href={`/admin/articles/${article.slug}`}
                    className="block p-3 rounded-lg bg-dark-900/50 hover:bg-dark-800 transition-colors">
                    <p className="text-white text-sm font-medium truncate">{article.title}</p>
                    <p className="text-dark-500 text-xs mt-1">{article.category} &middot; {article.publishedAt}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-400" /> Recently Updated Tools
              </h2>
              <div className="space-y-2">
                {recentCmsTools.length > 0 ? recentCmsTools.map((tool) => {
                  const calc = calculators.find((c) => c.slug === tool.slug)
                  return (
                    <a key={tool.slug} href={`/admin/tools/${tool.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-dark-900/50 hover:bg-dark-800 transition-colors">
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">{tool.name}</p>
                        <p className="text-dark-500 text-xs">{tool.category} &middot; v{tool.version || 1}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${
                        tool.status === "published" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                      }`}>{tool.status}</span>
                    </a>
                  )
                }) : (
                  <p className="text-dark-500 text-sm text-center py-6">No CMS tools updated yet. Edit a tool to see it here.</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary-400" /> Health Checks
              </h2>
              <div className="space-y-2">
                {healthChecks.map((check, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
                    {check.good ? (
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm text-dark-300">{check.label}</p>
                      {check.detail && <p className="text-xs text-dark-500">{check.detail}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-400" /> Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Browse Tools", href: "/admin/tools", icon: Calculator },
                  { label: "Write Article", href: "/admin/articles", icon: FileText },
                  { label: "SEO Manager", href: "/admin/seo", icon: Search },
                  { label: "Media Library", href: "/admin/media", icon: Image },
                  { label: "Schema Engine", href: "/admin/schema", icon: Shield },
                  { label: "Site Audit", href: "/admin/audit", icon: AlertTriangle },
                  { label: "Categories", href: "/admin/categories", icon: FolderTree },
                  { label: "Build Site", href: "/admin/build-status", icon: TrendingUp },
                ].map((action) => {
                  const Icon = action.icon
                  return (
                    <a key={action.label} href={action.href}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-dark-900/50 hover:bg-dark-800 hover:border-primary-500/30 border border-dark-700 transition-all text-center">
                      <Icon className="w-5 h-5 text-primary-400" />
                      <span className="text-dark-300 text-xs">{action.label}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Heart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}
