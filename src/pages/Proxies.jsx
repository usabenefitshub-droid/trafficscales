import React, { useState } from 'react'
import { Shield, Plus, Trash2, Play, Check, X, Search, Upload, Globe, Clock, Zap } from 'lucide-react'

const Proxies = () => {
  const [proxies, setProxies] = useState([
    { id: 1, proxy: '192.168.1.100:8080', type: 'Residential', country: 'United States', status: 'active', responseTime: 245, lastChecked: '2 min ago' },
    { id: 2, proxy: '10.0.0.50:3128', type: 'ISP', country: 'United Kingdom', status: 'active', responseTime: 189, lastChecked: '5 min ago' },
    { id: 3, proxy: '172.16.0.25:8080', type: 'Mobile', country: 'Germany', status: 'dead', responseTime: 0, lastChecked: '1 hour ago' },
    { id: 4, proxy: '192.168.2.75:8080', type: 'Residential', country: 'Canada', status: 'active', responseTime: 312, lastChecked: '3 min ago' },
    { id: 5, proxy: '10.1.0.30:3128', type: 'ISP', country: 'Australia', status: 'active', responseTime: 156, lastChecked: '10 min ago' },
    { id: 6, proxy: '172.17.0.15:8080', type: 'Mobile', country: 'France', status: 'testing', responseTime: 0, lastChecked: 'Just now' },
    { id: 7, proxy: '192.168.3.90:8080', type: 'Residential', country: 'Netherlands', status: 'active', responseTime: 278, lastChecked: '8 min ago' },
    { id: 8, proxy: '10.2.0.45:3128', type: 'ISP', country: 'Spain', status: 'dead', responseTime: 0, lastChecked: '2 hours ago' },
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newProxies, setNewProxies] = useState('')
  const [proxyType, setProxyType] = useState('Residential')
  const [testing, setTesting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddProxies = () => {
    if (!newProxies.trim()) return

    const proxyList = newProxies.split('
').filter(p => p.trim())
    const newProxyObjects = proxyList.map((proxy, index) => ({
      id: proxies.length + index + 1,
      proxy: proxy.trim(),
      type: proxyType,
      country: 'Unknown',
      status: 'testing',
      responseTime: 0,
      lastChecked: 'Just now'
    }))

    setProxies([...newProxyObjects, ...proxies])
    setNewProxies('')
    setShowAddModal(false)
  }

  const handleBulkTest = () => {
    setTesting(true)
    setTimeout(() => {
      setProxies(proxies.map(p => ({
        ...p,
        status: Math.random() > 0.3 ? 'active' : 'dead',
        responseTime: p.status === 'active' ? Math.floor(Math.random() * 400) + 100 : 0,
        lastChecked: 'Just now'
      })))
      setTesting(false)
    }, 3000)
  }

  const handleDelete = (id) => {
    setProxies(proxies.filter(p => p.id !== id))
  }

  const filteredProxies = proxies.filter(p => 
    p.proxy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeCount = proxies.filter(p => p.status === 'active').length
  const deadCount = proxies.filter(p => p.status === 'dead').length
  const testingCount = proxies.filter(p => p.status === 'testing').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Proxy Pool</h1>
          <p className="text-gray-400 text-sm mt-1">Manage and test your proxy infrastructure</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleBulkTest}
            disabled={testing}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            {testing ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Test All
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Proxies
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue w-fit mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{proxies.length}</div>
          <div className="text-sm text-gray-400">Total Proxies</div>
        </div>
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-500 w-fit mb-3">
            <Check className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{activeCount}</div>
          <div className="text-sm text-gray-400">Active</div>
        </div>
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-500 w-fit mb-3">
            <X className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{deadCount}</div>
          <div className="text-sm text-gray-400">Dead</div>
        </div>
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 w-fit mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{testingCount}</div>
          <div className="text-sm text-gray-400">Testing</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search proxies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Proxies Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-4 font-medium">Proxy</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Country</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Response Time</th>
                <th className="px-6 py-4 font-medium">Last Checked</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProxies.map((proxy) => (
                <tr key={proxy.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <code className="text-sm text-white">{proxy.proxy}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      proxy.type === 'Residential' ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' :
                      proxy.type === 'ISP' ? 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' :
                      'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                    }`}>
                      {proxy.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{proxy.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      proxy.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      proxy.status === 'dead' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {proxy.status === 'active' && <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse" />}
                      {proxy.status === 'dead' && <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5" />}
                      {proxy.status === 'testing' && <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5 animate-pulse" />}
                      {proxy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {proxy.responseTime > 0 ? (
                      <span className="text-sm text-white">{proxy.responseTime}ms</span>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{proxy.lastChecked}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleDelete(proxy.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Proxies Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add Proxies</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Proxy Type</label>
                <select 
                  value={proxyType}
                  onChange={(e) => setProxyType(e.target.value)}
                  className="input-field"
                >
                  <option value="Residential">Residential</option>
                  <option value="ISP">ISP</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Proxy List</label>
                <textarea
                  value={newProxies}
                  onChange={(e) => setNewProxies(e.target.value)}
                  placeholder="192.168.1.1:8080&#10;10.0.0.1:3128&#10;172.16.0.1:8080"
                  rows={6}
                  className="input-field font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">Enter one proxy per line (format: ip:port)</p>
              </div>

              <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
                <p className="text-sm text-brand-blue/80">
                  <Zap className="w-4 h-4 inline mr-1" />
                  <span className="font-semibold">Bulk Test:</span> After adding, click "Test All" to validate proxies in parallel batches.
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 btn-secondary">
                  Cancel
                </button>
                <button onClick={handleAddProxies} className="flex-1 btn-primary">
                  Add Proxies
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Proxies
