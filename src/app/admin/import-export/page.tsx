"use client"

import { useState } from "react"
import { Download, Upload, FileText, FileSpreadsheet, CheckCircle, AlertTriangle } from "lucide-react"

export default function ImportExport() {
  const [exporting, setExporting] = useState(false)
  const [exportDone, setExportDone] = useState(false)

  const handleExport = () => {
    setExporting(true)
    try {
      const data = {
        exportedAt: new Date().toISOString(),
        version: "1.0",
        description: "Measurely CMS Content Export",
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `measurely-export-${new Date().toISOString().split("T")[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      setExportDone(true)
      setTimeout(() => setExportDone(false), 3000)
    } catch (e) {
      console.error("Export failed", e)
    }
    setExporting(false)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Import & Export</h1>
        <p className="text-dark-400 mt-1">Export all content or import from external sources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Export Content</h2>
              <p className="text-dark-400 text-sm">Download all content as JSON</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {exportDone ? <CheckCircle className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            {exportDone ? "Exported!" : "Export All Content"}
          </button>
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Import Content</h2>
              <p className="text-dark-400 text-sm">Import from JSON or CSV</p>
            </div>
          </div>
          <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            Upload File to Import
            <input type="file" accept=".json,.csv" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  )
}
