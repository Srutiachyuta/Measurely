"use client"

import { useState, useEffect } from "react"
import { Hammer, RefreshCw, CheckCircle, XCircle, ExternalLink, Clock, GitBranch, Plus, FileText, Loader2, AlertCircle } from "lucide-react"

interface GitFile {
  status: string
  file: string
  staged: boolean
}

interface GitCommit {
  hash: string
  message: string
}

interface GitStatus {
  branch: string
  files: GitFile[]
  commits: GitCommit[]
  stats: { modified: number; added: number; deleted: number; renamed: number }
}

export default function BuildAndGit() {
  const [tab, setTab] = useState<"build" | "git">("build")
  const [building, setBuilding] = useState(false)
  const [buildLog, setBuildLog] = useState<string[]>([])
  const [buildResult, setBuildResult] = useState<"idle" | "success" | "error">("idle")
  const [gitStatus, setGitStatus] = useState<GitStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [commitMsg, setCommitMsg] = useState("")
  const [committing, setCommitting] = useState(false)
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [diff, setDiff] = useState<string | null>(null)

  const loadGit = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/cms/git")
      const data = await res.json()
      if (data.success) setGitStatus(data)
    } catch {} finally { setLoading(false) }
  }

  useEffect(() => { if (tab === "git") loadGit() }, [tab])

  const runBuild = () => {
    setBuilding(true)
    setBuildLog(["[INFO] Starting build process...", "[INFO] Running npm run build..."])
    fetch("/api/cms/build", { method: "POST" })
      .then(async (res) => {
        const text = await res.text()
        setBuildLog((prev) => [...prev, text])
        setBuildResult(res.ok ? "success" : "error")
        setBuildLog((prev) => [...prev, res.ok ? "[SUCCESS] Build completed successfully!" : "[ERROR] Build failed."])
      })
      .catch((err) => { setBuildResult("error"); setBuildLog((prev) => [...prev, `[ERROR] ${err.message}`]) })
      .finally(() => setBuilding(false))
  }

  const stageAll = async () => {
    const res = await fetch("/api/cms/git", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "stage-all" }) })
    const data = await res.json()
    setMsg({ type: data.success ? "success" : "error", text: data.message || data.error })
    if (data.success) loadGit()
    setTimeout(() => setMsg(null), 3000)
  }

  const handleCommit = async () => {
    if (!commitMsg.trim()) return
    setCommitting(true)
    const res = await fetch("/api/cms/git", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "commit", message: commitMsg }) })
    const data = await res.json()
    setMsg({ type: data.success ? "success" : "error", text: data.message || data.error })
    if (data.success) { setCommitMsg(""); loadGit() }
    setCommitting(false)
    setTimeout(() => setMsg(null), 3000)
  }

  const showDiff = async (file?: string) => {
    const res = await fetch("/api/cms/git", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "diff", files: file ? [file] : [] }) })
    const data = await res.json()
    if (data.success) setDiff(data.diff)
  }

  const statusLabels: Record<string, string> = { M: "Modified", A: "Added", D: "Deleted", "??": "Untracked", R: "Renamed" }
  const statusColors: Record<string, string> = {
    M: "text-amber-400 bg-amber-500/10", A: "text-green-400 bg-green-500/10",
    D: "text-red-400 bg-red-500/10", "??": "text-blue-400 bg-blue-500/10", R: "text-purple-400 bg-purple-500/10",
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Build & Git</h1>
          <p className="text-dark-400 mt-1">Build the site and manage Git version control</p>
        </div>
        <a href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-700 text-white rounded-lg text-sm hover:bg-dark-700 transition-colors">
          <ExternalLink className="w-4 h-4" /> View Site
        </a>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab("build")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "build" ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"}`}>
          <Hammer className="w-4 h-4" /> Build
        </button>
        <button onClick={() => setTab("git")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "git" ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"}`}>
          <GitBranch className="w-4 h-4" /> Git
        </button>
      </div>

      {msg && (
        <div className={`flex items-center gap-2 p-3 mb-4 rounded-lg text-sm ${
          msg.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"
        }`}>
          {msg.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {msg.text}
        </div>
      )}

      {tab === "build" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-400 mb-2"><CheckCircle className="w-4 h-4" /><span className="text-xs font-medium uppercase">Build Status</span></div>
              <p className="text-white text-sm">{buildResult === "success" ? "Last build succeeded" : buildResult === "error" ? "Last build failed" : "No builds yet"}</p>
            </div>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <div className="flex items-center gap-2 text-blue-400 mb-2"><FileText className="w-4 h-4" /><span className="text-xs font-medium uppercase">Pages</span></div>
              <p className="text-white text-sm">224 pages</p>
              <p className="text-dark-500 text-xs mt-1">Static + dynamic routes</p>
            </div>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-400 mb-2"><RefreshCw className="w-4 h-4" /><span className="text-xs font-medium uppercase">Status</span></div>
              <p className="text-white text-sm">{buildResult === "idle" ? "Ready" : buildResult === "success" ? "Ready" : "Error"}</p>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button onClick={runBuild} disabled={building}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">
              <Hammer className="w-4 h-4" /> {building ? "Building..." : "Build Now"}
            </button>
          </div>

          <div className="bg-dark-900 border border-dark-700 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-dark-700">
              <h2 className="text-white font-semibold text-sm">Build Log</h2>
              <span className="text-dark-500 text-xs">{buildLog.length} lines</span>
            </div>
            <pre className="p-4 text-xs font-mono text-dark-300 overflow-x-auto max-h-96 overflow-y-auto">
              {buildLog.length === 0 ? (
                <span className="text-dark-500">No build output yet. Click &quot;Build Now&quot; to start.</span>
              ) : (
                buildLog.map((line, i) => (
                  <div key={i} className={`${line.startsWith("[ERROR]") ? "text-red-400" : line.startsWith("[SUCCESS]") ? "text-green-400" : line.startsWith("[INFO]") ? "text-blue-400" : ""}`}>{line}</div>
                ))
              )}
            </pre>
          </div>
        </>
      )}

      {tab === "git" && (
        <>
          {gitStatus && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                <div className="flex items-center gap-2 text-primary-400 mb-2"><GitBranch className="w-4 h-4" /><span className="text-xs font-medium uppercase">Branch</span></div>
                <p className="text-white text-sm font-mono">{gitStatus.branch}</p>
              </div>
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 mb-2"><RefreshCw className="w-4 h-4" /><span className="text-xs font-medium uppercase">Modified</span></div>
                <p className="text-2xl font-bold text-white">{gitStatus.stats.modified}</p>
              </div>
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-400 mb-2"><Plus className="w-4 h-4" /><span className="text-xs font-medium uppercase">Added</span></div>
                <p className="text-2xl font-bold text-white">{gitStatus.stats.added}</p>
              </div>
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-400 mb-2"><XCircle className="w-4 h-4" /><span className="text-xs font-medium uppercase">Deleted</span></div>
                <p className="text-2xl font-bold text-white">{gitStatus.stats.deleted}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mb-4">
            <button onClick={loadGit} disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-700 text-white rounded-lg text-sm hover:bg-dark-700 transition-colors">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} Refresh
            </button>
            <button onClick={stageAll} className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors">
              <Plus className="w-4 h-4" /> Stage All
            </button>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden mb-6">
            <div className="p-4 border-b border-dark-700 flex items-center justify-between">
              <h2 className="text-white font-semibold text-sm">Changed Files</h2>
              <span className="text-dark-500 text-xs">{gitStatus?.files.length || 0} file{(gitStatus?.files.length || 0) !== 1 ? "s" : ""}</span>
            </div>
            {!gitStatus ? (
              <div className="p-8 text-center text-dark-500 text-sm">Loading...</div>
            ) : gitStatus.files.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-dark-400 text-sm">Working tree clean</p>
                <p className="text-dark-500 text-xs mt-1">No uncommitted changes.</p>
              </div>
            ) : (
              <div className="divide-y divide-dark-700/50">
                {gitStatus.files.map((f, i) => (
                  <div key={i} role="button" tabIndex={0} onKeyDown={event => {if(event.key === "Enter" || event.key === " ") {event.preventDefault(); void showDiff(f.file);}}} className="flex items-center justify-between p-3 hover:bg-dark-800/30 transition-colors cursor-pointer" onClick={() => showDiff(f.file)}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded flex-shrink-0 ${statusColors[f.status] || "text-dark-400 bg-dark-700"}`}>
                        {statusLabels[f.status] || f.status}
                      </span>
                      <span className="text-white text-sm truncate font-mono">{f.file}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${f.staged ? "bg-green-500/10 text-green-400" : "text-dark-500 bg-dark-700"}`}>
                      {f.staged ? "Staged" : "Unstaged"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {diff && (
            <div className="bg-dark-900 border border-dark-700 rounded-xl overflow-hidden mb-6">
              <div className="flex items-center justify-between p-4 border-b border-dark-700">
                <h2 className="text-white font-semibold text-sm">Diff</h2>
                <button onClick={() => setDiff(null)} className="text-dark-500 hover:text-white text-xs">Close</button>
              </div>
              <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto max-h-80 overflow-y-auto">{diff || "No diff available"}</pre>
            </div>
          )}

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-white font-semibold text-sm mb-3">Commit Changes</h2>
            <div className="flex gap-3">
              <input type="text" value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)}
                placeholder="Describe your changes..." onKeyDown={(e) => e.key === "Enter" && handleCommit()}
                className="flex-1 px-4 py-2.5 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              <button onClick={handleCommit} disabled={committing || !commitMsg.trim() || (gitStatus?.files.length || 0) === 0}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-sm transition-colors">
                {committing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Commit
              </button>
            </div>
          </div>

          {gitStatus && gitStatus.commits.length > 0 && (
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden mt-6">
              <div className="p-4 border-b border-dark-700"><h2 className="text-white font-semibold text-sm">Recent Commits</h2></div>
              <div className="divide-y divide-dark-700/50">
                {gitStatus.commits.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <code className="text-primary-400 text-xs font-mono">{c.hash.slice(0, 7)}</code>
                    <span className="text-dark-300 text-sm truncate">{c.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
