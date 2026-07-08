"use client"

import { useState, useMemo } from "react"
import { blogs } from "@/data/blogs"
import { Plus, Search, X } from "lucide-react"

export default function TagsManager() {
  const [search, setSearch] = useState("")
  const [newTag, setNewTag] = useState("")

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const blog of blogs) {
      for (const tag of blog.tags) {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      }
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [])

  const filtered = tagCounts.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tags</h1>
          <p className="text-dark-400 mt-1">{tagCounts.length} unique tags across all articles</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input
          type="text"
          placeholder="Search tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filtered.map((tag) => (
          <div
            key={tag.name}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-dark-800 border border-dark-700 rounded-full text-sm"
          >
            <span className="text-white">{tag.name}</span>
            <span className="text-dark-500 text-xs">({tag.count})</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-dark-400 text-sm">No tags found.</p>
        )}
      </div>
    </div>
  )
}
