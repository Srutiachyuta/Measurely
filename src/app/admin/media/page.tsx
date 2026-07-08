"use client"

import { useState, useEffect, useCallback } from "react"
import { Upload, Image as ImageIcon, Trash2, Copy, Search, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface MediaItem {
  id: string
  filename: string
  originalName: string
  url: string
  type: "image" | "svg" | "other"
  width: number
  height: number
  altText: string
  fileSize: number
  createdAt: string
}

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const loadMedia = useCallback(async () => {
    try {
      const res = await fetch("/api/cms/upload")
      const data = await res.json()
      setMedia(Array.isArray(data) ? data : [])
    } catch { setMedia([]) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { loadMedia() }, [loadMedia])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append("file", file)
        await fetch("/api/cms/upload", { method: "POST", body: fd })
      }
      await loadMedia()
    } catch { alert("Upload failed") }
    finally { setUploading(false); e.target.value = "" }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this file?")) return
    try {
      await fetch("/api/cms/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      setMedia(media.filter((m) => m.id !== id))
    } catch { alert("Delete failed") }
  }

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const updateAlt = async (id: string, alt: string) => {
    const updated = media.map((m) => m.id === id ? { ...m, altText: alt } : m)
    setMedia(updated)
    const item = updated.find((m) => m.id === id)
    if (item) {
      try {
        const existing = await (await fetch("/api/cms/data?file=media.json")).json()
        const idx = (existing as MediaItem[]).findIndex((m: MediaItem) => m.id === id)
        if (idx >= 0) {
          (existing as MediaItem[])[idx].altText = alt
          await fetch("/api/cms/data?file=media.json", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(existing) })
        }
      } catch { /* ignore */ }
    }
  }

  const filtered = media.filter((m) =>
    m.filename.toLowerCase().includes(search.toLowerCase()) ||
    m.originalName.toLowerCase().includes(search.toLowerCase())
  )

  const totalSize = media.reduce((acc, m) => acc + m.fileSize, 0)
  const imageCount = media.filter((m) => m.type === "image").length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="text-dark-400 mt-1">{media.length} files ({imageCount} images, {(totalSize / 1024 / 1024).toFixed(1)} MB)</p>
        </div>
        <label className={`flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Uploading..." : "Upload Files"}
          <input type="file" multiple className="hidden" accept="image/*,.svg" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input type="text" placeholder="Search media files..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
        </div>
      ) : media.length === 0 ? (
        <div className="border-2 border-dashed border-dark-700 rounded-xl p-16 text-center">
          <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-dark-500" />
          </div>
          <p className="text-dark-400 text-sm">No media files yet.</p>
          <p className="text-dark-500 text-xs mt-1">Upload images, SVGs, and other media files.</p>
          <label className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-sm cursor-pointer transition-colors">
            <Upload className="w-4 h-4" /> Upload Your First File
            <input type="file" multiple className="hidden" accept="image/*,.svg" onChange={handleUpload} />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="group relative bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelected(selected === item.id ? null : item.id)}>
              <div className="aspect-square bg-dark-900 flex items-center justify-center overflow-hidden">
                {item.url ? (
                  <img src={item.url} alt={item.altText || item.originalName} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg class="w-8 h-8 text-dark-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>' }} />
                ) : (
                  <ImageIcon className="w-8 h-8 text-dark-600" />
                )}
              </div>
              <div className="p-2.5">
                <p className="text-dark-300 text-xs truncate" title={item.originalName}>{item.filename}</p>
                <p className="text-dark-500 text-[10px]">{(item.fileSize / 1024).toFixed(1)} KB</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button onClick={(e) => { e.stopPropagation(); copyUrl(item.url, item.id) }}
                  className="p-1.5 bg-dark-900/80 rounded-lg text-dark-400 hover:text-white">
                  {copied === item.id ? <CheckCircle className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }}
                  className="p-1.5 bg-dark-900/80 rounded-lg text-dark-400 hover:text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              {selected === item.id && (
                <div className="absolute inset-0 bg-dark-900/95 p-3 flex flex-col justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                  <input type="text" value={item.altText} onChange={(e) => updateAlt(item.id, e.target.value)}
                    placeholder="ALT text..." className="w-full px-2 py-1.5 bg-dark-800 border border-dark-700 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary-500" />
                  <p className="text-dark-500 text-[10px]">{item.width}x{item.height}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
