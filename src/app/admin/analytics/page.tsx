"use client"

import { useState } from "react"
import { TrendingUp, Users, Eye, MousePointerClick, Calendar } from "lucide-react"

interface AnalyticsData {
  date: string
  pageViews: number
  visitors: number
}

export default function AnalyticsDashboard() {
  const [data] = useState<AnalyticsData[]>([])
  const [newDate, setNewDate] = useState("")
  const [newViews, setNewViews] = useState("")
  const [newVisitors, setNewVisitors] = useState("")

  const addEntry = () => {
    if (!newDate || !newViews || !newVisitors) return
    setNewDate("")
    setNewViews("")
    setNewVisitors("")
  }

  const totalViews = data.reduce((a, d) => a + d.pageViews, 0)
  const totalVisitors = data.reduce((a, d) => a + d.visitors, 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-dark-400 mt-1">Manual analytics data entry and visualization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Eye className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Page Views</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Visitors</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalVisitors.toLocaleString()}</p>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <MousePointerClick className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Pages / Visit</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {totalVisitors > 0 ? (totalViews / totalVisitors).toFixed(1) : "0"}
          </p>
        </div>
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 mb-6">
        <h2 className="text-white font-semibold text-sm mb-4">Add Daily Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-dark-400 mb-1">Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs text-dark-400 mb-1">Page Views</label>
            <input
              type="number"
              value={newViews}
              onChange={(e) => setNewViews(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs text-dark-400 mb-1">Visitors</label>
            <input
              type="number"
              value={newVisitors}
              onChange={(e) => setNewVisitors(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addEntry}
              className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Add Entry
            </button>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-16 bg-dark-800/30 border border-dark-700 rounded-xl">
          <TrendingUp className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">No analytics data yet.</p>
          <p className="text-dark-500 text-sm mt-1">Add daily stats above to track your site performance.</p>
        </div>
      ) : (
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium uppercase">Date</th>
                <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium uppercase">Page Views</th>
                <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium uppercase">Visitors</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i} className="border-b border-dark-700/50">
                  <td className="px-4 py-3 text-white text-sm">{d.date}</td>
                  <td className="px-4 py-3 text-dark-300 text-sm text-right">{d.pageViews.toLocaleString()}</td>
                  <td className="px-4 py-3 text-dark-300 text-sm text-right">{d.visitors.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
