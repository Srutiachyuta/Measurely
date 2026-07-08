"use client"

import { useState } from "react"
import { Plus, Trash2, Save, Search } from "lucide-react"

interface Redirect {
  from: string
  to: string
  code: 301 | 302
}

export default function RedirectManager() {
  const [redirects, setRedirects] = useState<Redirect[]>([])
  const [search, setSearch] = useState("")
  const [newFrom, setNewFrom] = useState("")
  const [newTo, setNewTo] = useState("")

  const filtered = redirects.filter(
    (r) =>
      r.from.toLowerCase().includes(search.toLowerCase()) ||
      r.to.toLowerCase().includes(search.toLowerCase())
  )

  const addRedirect = () => {
    if (!newFrom || !newTo) return
    setRedirects([...redirects, { from: newFrom, to: newTo, code: 301 }])
    setNewFrom("")
    setNewTo("")
  }

  const removeRedirect = (index: number) => {
    setRedirects(redirects.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Redirect Manager</h1>
        <p className="text-dark-400 mt-1">{redirects.length} redirects configured</p>
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 mb-6">
        <h2 className="text-white font-semibold text-sm mb-4">Add New Redirect</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs text-dark-400 mb-1">From (old path)</label>
            <input
              type="text"
              value={newFrom}
              onChange={(e) => setNewFrom(e.target.value)}
              placeholder="/old-page"
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-dark-400 mb-1">To (new path)</label>
            <input
              type="text"
              value={newTo}
              onChange={(e) => setNewTo(e.target.value)}
              placeholder="/new-page"
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addRedirect}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input
          type="text"
          placeholder="Search redirects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        />
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">From</th>
              <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">To</th>
              <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">Type</th>
              <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-dark-400 text-sm">
                  {search ? "No matching redirects." : "No redirects configured yet."}
                </td>
              </tr>
            ) : (
              filtered.map((r, i) => (
                <tr key={i} className="border-b border-dark-700/50 hover:bg-dark-800/30">
                  <td className="px-4 py-3">
                    <code className="text-dark-300 text-sm">{r.from}</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-primary-400 text-sm">{r.to}</code>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      r.code === 301 ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {r.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => removeRedirect(i)}
                      className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
