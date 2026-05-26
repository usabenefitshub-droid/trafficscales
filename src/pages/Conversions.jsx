import React, { useState } from 'react'
import { TrendingUp, Search, Download, DollarSign, Calendar, Link2 } from 'lucide-react'

const Conversions = () => {
  const [conversions] = useState([
    { id: 1, linkName: 'Facebook Ad Campaign A', conversionType: 'Install', value: 2.50, date: '2024-01-15 14:32:01', country: 'United States', device: 'Desktop' },
    { id: 2, linkName: 'Google Ads Campaign B', conversionType: 'Signup', value: 1.00, date: '2024-01-15 14:28:45', country: 'United Kingdom', device: 'Mobile' },
    { id: 3, linkName: 'Instagram Story C', conversionType: 'Install', value: 3.00, date: '2024-01-15 14:25:12', country: 'Germany', device: 'Mobile' },
    { id: 4, linkName: 'Facebook Ad Campaign A', conversionType: 'Purchase', value: 15.00, date: '2024-01-15 14:20:33', country: 'Canada', device: 'Desktop' },
    { id: 5, linkName: 'TikTok Video D', conversionType: 'Install', value: 2.50, date: '2024-01-15 14:15:08', country: 'Australia', device: 'Mobile' },
    { id: 6, linkName: 'YouTube Ad E', conversionType: 'Signup', value: 1.00, date: '2024-01-15 14:10:55', country: 'France', device: 'Desktop' },
  ])

  const [searchQuery, setSearchQuery] = useState('')

  const totalRevenue = conversions.reduce((sum, c) => sum + c.value, 0)
  const totalConversions = conversions.length
  const avgValue = totalRevenue / totalConversions

  const filteredConversions = conversions.filter(c => 
    c.linkName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.conversionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Conversions</h1>
          <p className="text-gray-400 text-sm mt-1">Sales tracking and conversion analytics</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-500 w-fit mb-3">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">${totalRevenue.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue w-fit mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{totalConversions}</div>
          <div className="text-sm text-gray-400">Total Conversions</div>
        </div>
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-brand-purple/10 text-brand-purple w-fit mb-3">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">${avgValue.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Avg. Value</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search conversions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-4 font-medium">Link</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Value</th>
                <th className="px-6 py-4 font-medium">Country</th>
                <th className="px-6 py-4 font-medium">Device</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredConversions.map((conv) => (
                <tr key={conv.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                        <Link2 className="w-4 h-4 text-brand-blue" />
                      </div>
                      <span className="text-sm font-medium text-white">{conv.linkName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                      {conv.conversionType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-green-400">+${conv.value.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white">{conv.country}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{conv.device}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{conv.date}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Conversions
