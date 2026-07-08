"use client"

import { useState, useEffect } from "react"
import { Save, RefreshCw } from "lucide-react"
import type { CmsSettings } from "@/cms/types"
import { readSettings, writeSettings } from "@/cms/lib/api"

const defaultSettings: CmsSettings = {
  siteName: "Measurely",
  siteUrl: "https://measurely.in",
  siteDescription: "Measurely is a comprehensive collection of free online calculators and measurement tools for finance, health, math, engineering, and everyday life.",
  twitterHandle: "@measurely",
  defaultOgImage: "/og-image.png",
  gaId: "",
  gtmId: "",
  adSenseSlotId: "",
  adminPassword: "admin123",
  disallowRobotsPaths: ["/api/", "/_next/", "/search"],
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<CmsSettings>(defaultSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    readSettings().then((data) => {
      if (data) setSettings(data)
    }).catch(() => {})
  }, [])

  const handleSave = async () => {
    try {
      await writeSettings(settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      console.error("Failed to save settings", e)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-dark-400 mt-1">Site-wide configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Settings"}
        </button>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Site Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Site Name</label>
              <input type="text" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Site URL</label>
              <input type="text" value={settings.siteUrl} onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Description</label>
              <textarea value={settings.siteDescription} onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })} rows={3} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Social & SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Twitter Handle</label>
              <input type="text" value={settings.twitterHandle} onChange={(e) => setSettings({ ...settings, twitterHandle: e.target.value })} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Default OG Image</label>
              <input type="text" value={settings.defaultOgImage} onChange={(e) => setSettings({ ...settings, defaultOgImage: e.target.value })} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Integrations</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Google Analytics ID</label>
              <input type="text" value={settings.gaId} onChange={(e) => setSettings({ ...settings, gaId: e.target.value })} placeholder="G-XXXXXXXXXX" className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Google Tag Manager ID</label>
              <input type="text" value={settings.gtmId} onChange={(e) => setSettings({ ...settings, gtmId: e.target.value })} placeholder="GTM-XXXXXXX" className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">AdSense Slot ID</label>
              <input type="text" value={settings.adSenseSlotId} onChange={(e) => setSettings({ ...settings, adSenseSlotId: e.target.value })} placeholder="ca-pub-..." className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Admin Password</label>
              <input type="password" value={settings.adminPassword} onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
