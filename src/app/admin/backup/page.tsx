"use client"

import { useState } from "react"
import { Download, Upload, Database, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react"

export default function BackupRestore() {
  const [backingUp, setBackingUp] = useState(false)
  const [backupDone, setBackupDone] = useState(false)

  const handleBackup = async () => {
    setBackingUp(true)
    try {
      const files = [
        "settings.json", "tools.json", "articles.json", "categories.json",
        "tags.json", "authors.json", "seo-overrides.json", "redirects.json",
        "media.json", "analytics.json", "search-queries.json", "error-log.json",
      ]
      const backup: Record<string, unknown> = {}
      for (const file of files) {
        const res = await fetch(`/api/cms/data?file=${file}`)
        if (res.ok) backup[file] = await res.json()
      }
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `measurely-backup-${new Date().toISOString().split("T")[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      setBackupDone(true)
      setTimeout(() => setBackupDone(false), 3000)
    } catch (e) {
      console.error("Backup failed", e)
    }
    setBackingUp(false)
  }

  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      for (const [filename, content] of Object.entries(data)) {
        await fetch(`/api/cms/data?file=${filename}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(content),
        })
      }
      alert("Restore complete! Refresh the page to see changes.")
    } catch (e) {
      alert("Restore failed: invalid backup file")
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Backup & Restore</h1>
        <p className="text-dark-400 mt-1">Download and restore CMS data backups</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Backup</h2>
              <p className="text-dark-400 text-sm">Download all CMS data as JSON</p>
            </div>
          </div>
          <button
            onClick={handleBackup}
            disabled={backingUp}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {backingUp ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : backupDone ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {backingUp ? "Backing up..." : backupDone ? "Backup Complete!" : "Download Backup"}
          </button>
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Restore</h2>
              <p className="text-dark-400 text-sm">Upload a backup JSON file</p>
            </div>
          </div>
          <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            Upload Backup File
            <input type="file" accept=".json" onChange={handleRestore} className="hidden" />
          </label>
          <p className="text-dark-500 text-xs mt-2">
            Warning: This will overwrite all CMS data.
          </p>
        </div>
      </div>
    </div>
  )
}
