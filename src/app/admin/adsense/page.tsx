"use client"

import { useState, useEffect } from "react"
import { readSettings, writeSettings } from "@/cms/lib/api"
import type { CmsSettings } from "@/cms/types"
import { DollarSign, RefreshCw, FileText } from "lucide-react"

interface AdPlacement {
  id: string
  name: string
  location: string
  size: string
  status: "active" | "inactive"
  density: "low" | "medium" | "high"
}

export default function AdSenseManagerPage() {
  const [settings, setSettings] = useState<CmsSettings | null>(null)
  const [adSlotId, setAdSlotId] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    readSettings().then(setSettings)
  }, [])

  useEffect(() => {
    if (settings) setAdSlotId(settings.adSenseSlotId || "")
  }, [settings])

  const placements: AdPlacement[] = [
    { id: "sidebar-top", name: "Sidebar Top", location: "Sidebar", size: "300x250", status: "active", density: "medium" },
    { id: "content-middle", name: "Content Middle", location: "Article body", size: "728x90", status: "active", density: "medium" },
    { id: "content-bottom", name: "Content Bottom", location: "Article footer", size: "728x90", status: "active", density: "low" },
    { id: "tool-sidebar", name: "Tool Sidebar", location: "Calculator page", size: "300x600", status: "inactive", density: "low" },
  ]

  const handleSave = async () => {
    if (!settings) return
    setSaving(true)
    try {
      await writeSettings({ ...settings, adSenseSlotId: adSlotId })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      alert("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">AdSense Manager</h1>
        <p className="text-dark-400 mt-1">Manage ad placements, density, and policy compliance</p>
      </div>

      <div className="bg-dark-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">AdSense Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Ad Slot ID</label>
            <input
              type="text"
              value={adSlotId}
              onChange={(e) => setAdSlotId(e.target.value)}
              className="w-full px-4 py-2.5 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 1234567890"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
          >
            {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Active Placements</h2>
        <div className="grid gap-4">
          {placements.map((p) => (
            <div key={p.id} className="bg-dark-800 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{p.name}</h3>
                  <p className="text-dark-400 text-sm">{p.location} &middot; {p.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded ${
                  p.density === "low" ? "bg-green-500/20 text-green-400" :
                  p.density === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {p.density}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  p.status === "active" ? "bg-green-500/20 text-green-400" : "bg-dark-600 text-dark-400"
                }`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-3">Policy Compliance</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-dark-700">
            <span className="text-dark-300">Cookie Consent Active</span>
            <span className="text-green-400">✓</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-dark-700">
            <span className="text-dark-300">Ad Limit (max 3 per page)</span>
            <span className="text-green-400">✓ 2 active</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-dark-700">
            <span className="text-dark-300">Responsive Ad Units</span>
            <span className="text-green-400">✓</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-dark-300">Content Density Check</span>
            <span className="text-yellow-400">Review recommended</span>
          </div>
        </div>
      </div>
    </div>
  )
}
