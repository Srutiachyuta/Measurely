"use client"

import { useState } from "react"
import { Bot, RefreshCw, CheckCircle, XCircle } from "lucide-react"

interface AutomationTask {
  id: string
  name: string
  description: string
  lastRun: string | null
  status: "idle" | "running" | "success" | "error"
}

export default function AutomationPage() {
  const [tasks, setTasks] = useState<AutomationTask[]>([
    { id: "sitemap", name: "Auto Sitemap", description: "Automatically regenerate sitemap.xml when content changes", lastRun: null, status: "idle" },
    { id: "related-tools", name: "Auto Related Tools", description: "Suggest and link related tools based on category and tags", lastRun: null, status: "idle" },
    { id: "related-articles", name: "Auto Related Articles", description: "Suggest and link related articles based on content similarity", lastRun: null, status: "idle" },
    { id: "breadcrumbs", name: "Auto Breadcrumbs", description: "Generate breadcrumb structured data for all pages", lastRun: null, status: "idle" },
    { id: "redirects", name: "Auto Redirects", description: "Create redirects when slugs change", lastRun: null, status: "idle" },
    { id: "orphan-check", name: "Orphan Detection", description: "Scan for pages with no internal links pointing to them", lastRun: null, status: "idle" },
  ])

  const runTask = (taskId: string) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: "running" as const } : t)))

    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, status: "success" as const, lastRun: new Date().toISOString().split("T")[0] }
            : t
        )
      )
    }, 2000)
  }

  const runAll = () => {
    tasks.forEach((t) => runTask(t.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Automation Engine</h1>
          <p className="text-dark-400 mt-1">Automate sitemaps, related content, breadcrumbs, and more</p>
        </div>
        <button
          onClick={runAll}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Run All
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-dark-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                task.status === "success" ? "bg-green-500/20" :
                task.status === "error" ? "bg-red-500/20" :
                task.status === "running" ? "bg-blue-500/20" :
                "bg-dark-700"
              }`}>
                {task.status === "success" ? <CheckCircle className="w-5 h-5 text-green-400" /> :
                 task.status === "error" ? <XCircle className="w-5 h-5 text-red-400" /> :
                 <Bot className={`w-5 h-5 ${task.status === "running" ? "text-blue-400 animate-pulse" : "text-dark-400"}`} />}
              </div>
              <div>
                <h3 className="text-white font-medium flex items-center gap-2">
                  {task.name}
                  {task.status === "running" && <RefreshCw className="w-3 h-3 text-blue-400 animate-spin" />}
                </h3>
                <p className="text-dark-400 text-sm">{task.description}</p>
                {task.lastRun && <p className="text-dark-500 text-xs mt-1">Last run: {task.lastRun}</p>}
              </div>
            </div>
            <button
              onClick={() => runTask(task.id)}
              disabled={task.status === "running"}
              className="text-sm text-primary-400 hover:text-primary-300 disabled:text-dark-600 whitespace-nowrap"
            >
              {task.status === "running" ? "Running..." : task.status === "success" ? "Re-run" : "Run"}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-dark-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-3">Automation Schedule</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-dark-700">
            <span className="text-dark-300">Sitemap Regeneration</span>
            <span className="text-dark-400">On content change</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-dark-700">
            <span className="text-dark-300">Related Content Sync</span>
            <span className="text-dark-400">On publish/edit</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-dark-700">
            <span className="text-dark-300">Broken Link Check</span>
            <span className="text-dark-400">Weekly</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-dark-300">Backup</span>
            <span className="text-dark-400">Daily</span>
          </div>
        </div>
      </div>
    </div>
  )
}
