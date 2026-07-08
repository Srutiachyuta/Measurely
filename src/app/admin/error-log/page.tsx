"use client"

import { useState } from "react"
import { AlertTriangle, Trash2, RefreshCw, Info, AlertCircle, XCircle, CheckCircle } from "lucide-react"

interface LogEntry {
  id: string
  level: "info" | "warning" | "error"
  message: string
  timestamp: string
  source: string
}

export default function ErrorLog() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filter, setFilter] = useState<"all" | "error" | "warning" | "info">("all")

  const filtered = filter === "all" ? logs : logs.filter((l) => l.level === filter)

  const clearAll = () => setLogs([])

  const getIcon = (level: string) => {
    switch (level) {
      case "error": return <XCircle className="w-4 h-4 text-red-400" />
      case "warning": return <AlertTriangle className="w-4 h-4 text-amber-400" />
      case "info": return <Info className="w-4 h-4 text-blue-400" />
      default: return <Info className="w-4 h-4 text-dark-400" />
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Error Log</h1>
          <p className="text-dark-400 mt-1">{logs.length} log entries</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-700 text-white rounded-lg text-sm hover:bg-dark-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "error", "warning", "info"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f
                ? "bg-primary-600 text-white"
                : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({f === "all" ? logs.length : logs.filter((l) => l.level === f).length})
          </button>
        ))}
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <CheckCircle className="w-12 h-12 text-green-500/50 mx-auto mb-4" />
            <p className="text-dark-400">No log entries.</p>
            <p className="text-dark-500 text-sm mt-1">All systems running smoothly.</p>
          </div>
        ) : (
          <div className="divide-y divide-dark-700/50">
            {filtered.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-4 hover:bg-dark-800/30 transition-colors">
                <div className="mt-0.5">{getIcon(log.level)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{log.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-dark-500 text-xs">{log.timestamp}</span>
                    <span className="text-dark-600">·</span>
                    <span className="text-dark-500 text-xs">{log.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

