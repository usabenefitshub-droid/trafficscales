import React, { useState } from 'react'
import { MousePointer, Search, Filter, Download, Globe, Smartphone, Monitor, MapPin, Clock } from 'lucide-react'

const Clicks = () => {
  const [clicks] = useState([
    { id: 1, linkName: 'Facebook Ad Campaign A', ip: '192.168.1.1', country: 'United States', city: 'New York', device: 'Desktop', os: 'Windows 11', browser: 'Chrome 120', time: '2024-01-15 14:32:01', proxy: true },
    { id: 2, linkName: 'Google Ads Campaign B', ip: '10.0.0.1', country: 'United Kingdom', city: 'London', device: 'Mobile', os: 'iOS 17', browser: 'Safari', time: '2024-01-15 14:28:45', proxy: true },
    { id: 3, linkName: 'Instagram Story C', ip: '172.16.0.1', country: 'Germany', city: 'Berlin', device: 'Mobile', os: 'Android 14', browser: 'Chrome 119', time: '2024-01-15 14:25:12', proxy: false },
    { id: 4, linkName: 'Facebook Ad Campaign A', ip: '192.168.2.1', country: 'Canada', city: 'Toronto', device: 'Desktop', os: 'macOS Sonoma', browser: 'Firefox 121', time: '2024-01-15 14:20:33', proxy: true },
    { id: 5, linkName: 'TikTok Video D', ip: '10.1.0.1', country: 'Australia', city: 'Sydney', device: 'Mobile', os: 'iOS 17', browser: 'Chrome 120', time: '2024-01-15 14:15:08', proxy: true },
    { id: 6, linkName: 'YouTube Ad E', ip: '172.17.0.1', country: 'France', city: 'Paris', device: 'Desktop', os: 'Windows 10', browser: 'Edge 120', time: '2024-01-15 14:10:55', proxy: false },
    { id: 7, linkName: 'Google Ads Campaign B', ip: '192.168.3.1', country: 'Netherlands', city: 'Amsterdam', device: 'Mobile', os: 'Android 13', browser: 'Chrome 118', time: '2024-01-15 14:05:22', proxy: true },
    { id: 8, linkName: 'Instagram Story C', ip: '10.2.0.1', country: 'Spain', city: 'Madrid', device: 'Tablet', os: 'iPadOS 17', browser: 'Safari', time: '2024-01-15 14:00:41', proxy: true },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterDevice, setFilterDevice] = useState('all')

  const filteredClicks = clicks.filter(click => {
    const matchesSearch = click.linkName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         click.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         click.ip.includes(searchQuery)
    const matchesDevice = filterDevice === 'all' || click.device.toLowerCase() === filterDevice.toLowerCase()
    return matchesSearch && matchesDevice
  })

  const getDeviceIcon = (device) => {
    switch(device.toLowerCase()) {
      case 'desktop': return <Monitor className="w-4 h-4" />
      case 'mobile': return <Smartphone className="w-4 h-4" />
      default: return <Globe className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Clicks Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">Detailed click data with IP, geo, device & time info</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Clicks', value: '15,680', icon: <MousePointer className="w-5 h-5" />, color: 'brand-blue' },
          { label: 'Unique IPs', value: '8,432', icon: <Globe className="w-5 h-5" />, color: 'brand-purple' },
          { label: 'Countries', value: '47', icon: <MapPin className="w-5 h-5" />, color: 'brand-cyan' },
          { label: 'Via Proxy', value: '12,340', icon: <Shield className="w-5 h-5" />, color: 'green-500' },
        ].map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`p-2 rounded-lg bg-${stat.color}/10 text-${stat.color} w-fit mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by link, country, or IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select 
          value={filterDevice}
          onChange={(e) => setFilterDevice(e.target.value)}
          className="input-field w-full sm:w-48"
        >
          <option value="all">All Devices</option>
          <option value="desktop">Desktop</option>
          <option value="mobile">Mobile</option>
          <option value="tablet">Tablet</option>
        </select>
      </div>

      {/* Clicks Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-4 font-medium">Link</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Device</th>
                <th className="px-6 py-4 font-medium">OS / Browser</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Proxy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClicks.map((click) => (
                <tr key={click.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-white">{click.linkName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-brand-blue bg-brand-blue/10 px-2 py-1 rounded">{click.ip}</code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-white">{click.country}</div>
                        <div className="text-xs text-gray-500">{click.city}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      {getDeviceIcon(click.device)}
                      <span className="text-sm">{click.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{click.os}</div>
                    <div className="text-xs text-gray-500">{click.browser}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{click.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {click.proxy ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                        No
                      </span>
                    )}
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

export default Clicks
