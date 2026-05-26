import React, { useState } from 'react'
import { Link2, Copy, ExternalLink, Trash2, Plus, Search, Filter, Check } from 'lucide-react'

const Links = () => {
  const [links, setLinks] = useState([
    { id: 1, name: 'Facebook Ad Campaign A', shortUrl: 'trafficscale.app/r/abc123', targetUrl: 'https://example.com/offer1', clicks: 4520, conversions: 98, status: 'active', createdAt: '2024-01-15' },
    { id: 2, name: 'Google Ads Campaign B', shortUrl: 'trafficscale.app/r/def456', targetUrl: 'https://example.com/offer2', clicks: 3210, conversions: 67, status: 'active', createdAt: '2024-01-14' },
    { id: 3, name: 'Instagram Story C', shortUrl: 'trafficscale.app/r/ghi789', targetUrl: 'https://example.com/offer3', clicks: 1890, conversions: 45, status: 'active', createdAt: '2024-01-13' },
    { id: 4, name: 'TikTok Video D', shortUrl: 'trafficscale.app/r/jkl012', targetUrl: 'https://example.com/offer4', clicks: 980, conversions: 23, status: 'paused', createdAt: '2024-01-12' },
    { id: 5, name: 'YouTube Ad E', shortUrl: 'trafficscale.app/r/mno345', targetUrl: 'https://example.com/offer5', clicks: 2340, conversions: 56, status: 'active', createdAt: '2024-01-11' },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newLinkName, setNewLinkName] = useState('')
  const [newTargetUrl, setNewTargetUrl] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8)
  }

  const handleCreateLink = (e) => {
    e.preventDefault()
    if (!newLinkName || !newTargetUrl) return

    const newLink = {
      id: links.length + 1,
      name: newLinkName,
      shortUrl: `trafficscale.app/r/${generateShortCode()}`,
      targetUrl: newTargetUrl,
      clicks: 0,
      conversions: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    }

    setLinks([newLink, ...links])
    setNewLinkName('')
    setNewTargetUrl('')
    setShowCreateModal(false)
  }

  const handleCopy = (shortUrl, id) => {
    navigator.clipboard.writeText(`https://${shortUrl}`)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = (id) => {
    setLinks(links.filter(link => link.id !== id))
  }

  const filteredLinks = links.filter(link => 
    link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tracking Links</h1>
          <p className="text-gray-400 text-sm mt-1">Create and manage your smart tracking links</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Link
        </button>
      </div>

      {/* Info Banner */}
      <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <p className="text-sm text-green-400/90">
              <span className="font-semibold">Always-On Links:</span> Your links work 24/7 — even when your PC is off. Click tracking never stops.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Links Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-4 font-medium">Campaign Name</th>
                <th className="px-6 py-4 font-medium">Short URL</th>
                <th className="px-6 py-4 font-medium">Target URL</th>
                <th className="px-6 py-4 font-medium">Clicks</th>
                <th className="px-6 py-4 font-medium">Conversions</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLinks.map((link) => (
                <tr key={link.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                        <Link2 className="w-4 h-4 text-brand-blue" />
                      </div>
                      <span className="text-sm font-medium text-white">{link.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-brand-blue">{link.shortUrl}</span>
                      <button 
                        onClick={() => handleCopy(link.shortUrl, link.id)}
                        className="p-1 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedId === link.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400 truncate max-w-[200px] block">{link.targetUrl}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-white">{link.clicks.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-white">{link.conversions}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      link.status === 'active' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {link.status === 'active' ? (
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                      ) : (
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5"></span>
                      )}
                      {link.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(link.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Link Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create New Link</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <form onSubmit={handleCreateLink} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  placeholder="e.g., Facebook Ad Campaign A"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Offer URL (Target)</label>
                <input
                  type="url"
                  value={newTargetUrl}
                  onChange={(e) => setNewTargetUrl(e.target.value)}
                  placeholder="https://example.com/your-offer"
                  className="input-field"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">Users will be redirected to this URL when they click your tracking link.</p>
              </div>

              <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
                <p className="text-sm text-brand-blue/80">
                  <span className="font-semibold">Your link will be:</span> trafficscale.app/r/xxxxxx
                </p>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Create Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Links
