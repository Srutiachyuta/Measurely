"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { calculators } from "@/data/calculators"
import { CATEGORIES } from "@/lib/constants"
import { getTools } from "@/cms/services/tool-service"
import type { CmsToolMeta } from "@/cms/types"
import {
  Plus, Search, Edit, Eye, Copy, Filter,
  ChevronDown, CheckCircle, Clock, AlertCircle,
} from "lucide-react"

export default function ToolManager() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all")
  const [cmsTools, setCmsTools] = useState<CmsToolMeta[]>([])

  useEffect(() => {
    getTools().then(setCmsTools)
  }, [])

  const getCmsMeta = (slug: string) => cmsTools.find((t) => t.slug === slug)

  const filtered = useMemo(() => {
    return calculators.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.slug.includes(search.toLowerCase())
      const matchesCategory = categoryFilter === "all" || t.category === categoryFilter
      const meta = getCmsMeta(t.slug)
      const status = meta?.status || "published"
      const matchesStatus = statusFilter === "all" || status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, categoryFilter, statusFilter, cmsTools])

  const getCategoryName = (slug: string) => {
    return CATEGORIES.find((c) => c.slug === slug)?.name || slug
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tool Manager</h1>
          <p className="text-dark-400 mt-1">{calculators.length} total tools</p>
        </div>
        <Link
          href="/admin/tools/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Tool
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input
            type="text"
            placeholder="Search tools by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "draft" | "published")}
            className="appearance-none pl-4 pr-10 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Slug</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">FAQs</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Related</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tool) => {
                const meta = getCmsMeta(tool.slug)
                const status = meta?.status || "published"
                return (
                  <tr key={tool.slug} className="border-b border-dark-700/50 hover:bg-dark-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-white text-sm font-medium">{tool.name}</span>
                      {meta && <span className="ml-2 text-[10px] text-primary-500">CMS</span>}
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-dark-400 text-xs">{tool.slug}</code>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-dark-700 text-dark-300">
                        {getCategoryName(tool.category)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-dark-400 text-sm">{tool.faqs?.length || 0}</td>
                    <td className="px-4 py-3 text-dark-400 text-sm">{tool.relatedSlugs?.length || 0}</td>
                    <td className="px-4 py-3">
                      {status === "published" ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle className="w-3 h-3" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
                          <Clock className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/tools/${tool.slug}`}
                          className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <a
                          href={`/${tool.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark-400">No tools found matching your filters.</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-dark-500 text-sm">
        Showing {filtered.length} of {calculators.length} tools
      </div>
    </div>
  )
}
