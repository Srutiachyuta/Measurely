"use client"

import { useState } from "react"
import { Zap, Gauge, Image, FileJson, Globe, RefreshCw } from "lucide-react"

interface PerformanceMetric {
  label: string
  value: string
  status: "good" | "needs-improvement" | "poor"
  description: string
}

export default function PerformancePage() {
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)

  const metrics: PerformanceMetric[] = [
    { label: "LCP", value: "—", status: "good", description: "Largest Contentful Paint — measures loading performance" },
    { label: "FID", value: "—", status: "good", description: "First Input Delay — measures interactivity" },
    { label: "CLS", value: "—", status: "good", description: "Cumulative Layout Shift — measures visual stability" },
    { label: "INP", value: "—", status: "good", description: "Interaction to Next Paint — measures responsiveness" },
    { label: "TBT", value: "—", status: "good", description: "Total Blocking Time — measures load responsiveness" },
    { label: "FCP", value: "—", status: "good", description: "First Contentful Paint — measures perceived load speed" },
  ]

  const recommendations = [
    { icon: Image, title: "Optimize Images", description: "Ensure all images use WebP format with proper dimensions. 1600x900 for hero images.", action: "Run optimizer" },
    { icon: FileJson, title: "Minify JS & CSS", description: "Next.js automatically minifies in production. Verify bundle sizes.", action: "Check bundles" },
    { icon: Globe, title: "CDN & Caching", description: "Enable CDN caching for static assets. Set proper cache headers.", action: "Configure CDN" },
    { icon: Gauge, title: "Reduce JavaScript", description: "Lazy load non-critical components and code-split large modules.", action: "Analyze" },
  ]

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScanned(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Performance Engine</h1>
          <p className="text-dark-400 mt-1">Core Web Vitals monitoring and optimization recommendations</p>
        </div>
        <button
          onClick={handleScan}
          disabled={scanning}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${scanning ? "animate-spin" : ""}`} />
          {scanning ? "Scanning..." : scanned ? "Rescan" : "Run Scan"}
        </button>
      </div>

      {!scanned ? (
        <div className="bg-dark-800 rounded-xl p-12 text-center">
          <Zap className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No Data Yet</h2>
          <p className="text-dark-400 mb-6 max-w-md mx-auto">Run a performance scan to analyze Core Web Vitals and get optimization recommendations for your site.</p>
          <button
            onClick={handleScan}
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Run Performance Scan
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-dark-800 rounded-xl p-4">
                <div className={`w-2 h-2 rounded-full mb-2 ${
                  m.status === "good" ? "bg-green-500" :
                  m.status === "needs-improvement" ? "bg-yellow-500" :
                  "bg-red-500"
                }`} />
                <p className="text-2xl font-bold text-white">{m.value}</p>
                <p className="text-xs text-dark-400">{m.label}</p>
                <p className="text-[10px] text-dark-500 mt-1">{m.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Recommendations</h2>
            <div className="grid gap-4">
              {recommendations.map((r) => {
                const Icon = r.icon
                return (
                  <div key={r.title} className="bg-dark-800 rounded-xl p-4 flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{r.title}</h3>
                        <p className="text-dark-400 text-sm mt-1">{r.description}</p>
                      </div>
                    </div>
                    <button className="text-sm text-primary-400 hover:text-primary-300 whitespace-nowrap">{r.action}</button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-dark-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">Next.js Optimizations</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-dark-700">
                <span className="text-dark-300">Image Optimization</span>
                <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Enabled</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-dark-700">
                <span className="text-dark-300">Font Optimization</span>
                <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Enabled</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-dark-700">
                <span className="text-dark-300">Code Splitting</span>
                <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Enabled</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-dark-700">
                <span className="text-dark-300">Static Generation (SSG)</span>
                <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-dark-700">
                <span className="text-dark-300">Bundle Analysis</span>
                <span className="text-yellow-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Pending</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-dark-300">WebP Image Conversion</span>
                <span className="text-yellow-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Manual</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
