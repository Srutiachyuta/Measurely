"use client"

import { useState } from "react"
import { BarChart3, Search, TrendingDown, TrendingUp, Plus, Trash2 } from "lucide-react"

interface SearchQuery {
  query: string
  impressions: number
  clicks: number
  ctr: number
  position: number
}

export default function SearchConsoleHelper() {
  const [queries, setQueries] = useState<SearchQuery[]>([])
  const [newQuery, setNewQuery] = useState("")
  const [newImpressions, setNewImpressions] = useState("")
  const [newClicks, setNewClicks] = useState("")
  const [newPosition, setNewPosition] = useState("")

  const addQuery = () => {
    if (!newQuery || !newImpressions || !newClicks || !newPosition) return
    const impressions = parseInt(newImpressions)
    const clicks = parseInt(newClicks)
    setQueries([
      ...queries,
      {
        query: newQuery,
        impressions,
        clicks,
        ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        position: parseFloat(newPosition),
      },
    ])
    setNewQuery("")
    setNewImpressions("")
    setNewClicks("")
    setNewPosition("")
  }

  const removeQuery = (index: number) => {
    setQueries(queries.filter((_, i) => i !== index))
  }

  const totalImpressions = queries.reduce((a, q) => a + q.impressions, 0)
  const totalClicks = queries.reduce((a, q) => a + q.clicks, 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Search Console Helper</h1>
        <p className="text-dark-400 mt-1">Track and analyze search performance data (manual entry)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
          <p className="text-dark-400 text-xs font-medium uppercase">Total Impressions</p>
          <p className="text-2xl font-bold text-white mt-1">{totalImpressions.toLocaleString()}</p>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
          <p className="text-dark-400 text-xs font-medium uppercase">Total Clicks</p>
          <p className="text-2xl font-bold text-white mt-1">{totalClicks.toLocaleString()}</p>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
          <p className="text-dark-400 text-xs font-medium uppercase">Avg CTR</p>
          <p className="text-2xl font-bold text-white mt-1">
            {totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : "0"}%
          </p>
        </div>
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 mb-6">
        <h2 className="text-white font-semibold text-sm mb-4">Add Search Query</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="col-span-2 md:col-span-2">
            <label className="block text-xs text-dark-400 mb-1">Query</label>
            <input
              type="text"
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              placeholder="Search query..."
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs text-dark-400 mb-1">Impressions</label>
            <input
              type="number"
              value={newImpressions}
              onChange={(e) => setNewImpressions(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs text-dark-400 mb-1">Clicks</label>
            <input
              type="number"
              value={newClicks}
              onChange={(e) => setNewClicks(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addQuery}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">Query</th>
              <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium uppercase">Impressions</th>
              <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium uppercase">Clicks</th>
              <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium uppercase">CTR</th>
              <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium uppercase">Position</th>
              <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {queries.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-dark-400 text-sm">
                  No search data yet. Add your first query above.
                </td>
              </tr>
            ) : (
              queries.map((q, i) => (
                <tr key={i} className="border-b border-dark-700/50 hover:bg-dark-800/30">
                  <td className="px-4 py-3 text-white text-sm">{q.query}</td>
                  <td className="px-4 py-3 text-dark-300 text-sm text-right">{q.impressions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-dark-300 text-sm text-right">{q.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-dark-300 text-sm text-right">{q.ctr.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-dark-300 text-sm text-right">{q.position.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => removeQuery(i)} className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-red-400 transition-colors">
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
