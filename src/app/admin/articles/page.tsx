"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { blogs } from "@/data/blogs"
import { getArticles } from "@/cms/services/article-service"
import type { CmsArticle } from "@/cms/types"
import { Plus, Search, Edit, Eye, ChevronDown, CheckCircle, Clock } from "lucide-react"

export default function ArticleManager() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [cmsArticles, setCmsArticles] = useState<CmsArticle[]>([])

  useEffect(() => {
    getArticles().then(setCmsArticles)
  }, [])

  const categories = useMemo(() => {
    const cats = new Set(blogs.map((b) => b.category))
    return Array.from(cats).sort()
  }, [])

  const getCmsMeta = (slug: string) => cmsArticles.find((a) => a.slug === slug)

  const filtered = useMemo(() => {
    return blogs.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.slug.includes(search.toLowerCase())
      const matchesCategory = categoryFilter === "all" || a.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [search, categoryFilter])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Article Manager</h1>
          <p className="text-dark-400 mt-1">{blogs.length} total articles</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Author</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Published</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Reading</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => {
                const meta = getCmsMeta(article.slug)
                const status = meta?.status || "published"
                return (
                  <tr key={article.slug} className="border-b border-dark-700/50 hover:bg-dark-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-white text-sm font-medium">
                          {article.title}
                          {meta && <span className="ml-2 text-[10px] text-primary-500">CMS</span>}
                        </span>
                        <code className="block text-dark-500 text-xs mt-0.5">{article.slug}</code>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-dark-700 text-dark-300">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-dark-400 text-sm">{article.author.name}</td>
                    <td className="px-4 py-3 text-dark-400 text-sm">{article.publishedAt}</td>
                    <td className="px-4 py-3 text-dark-400 text-sm">{article.readingTime} min</td>
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
                          href={`/admin/articles/${article.slug}`}
                          className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <a
                          href={`/${article.slug}`}
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
            <p className="text-dark-400">No articles found matching your filters.</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-dark-500 text-sm">
        Showing {filtered.length} of {blogs.length} articles
      </div>
    </div>
  )
}
