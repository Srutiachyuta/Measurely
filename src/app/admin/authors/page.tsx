"use client"

import { useState, useMemo } from "react"
import { blogs } from "@/data/blogs"
import { Edit, Mail, ExternalLink } from "lucide-react"

export default function AuthorsManager() {
  const authorMap = useMemo(() => {
    const map = new Map<string, { name: string; avatar: string; role: string; bio?: string; articleCount: number }>()
    for (const blog of blogs) {
      const key = blog.author.name
      if (map.has(key)) {
        map.get(key)!.articleCount++
      } else {
        map.set(key, { ...blog.author, articleCount: 1 })
      }
    }
    return Array.from(map.values())
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Authors</h1>
        <p className="text-dark-400 mt-1">{authorMap.length} authors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authorMap.map((author) => (
          <div key={author.name} className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold text-lg flex-shrink-0">
                {author.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold truncate">{author.name}</h3>
                <p className="text-dark-400 text-xs">{author.role}</p>
                <p className="text-dark-500 text-xs mt-1">{author.articleCount} articles</p>
                {author.bio && (
                  <p className="text-dark-400 text-sm mt-2 line-clamp-2">{author.bio}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
