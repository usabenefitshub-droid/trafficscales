import React, { useState } from 'react'
import { Users, Plus, Play, Pause, Trash2, Clock, Globe, Monitor, Check, X, Search, Calendar } from 'lucide-react'

const RealUserTraffic = () => {
  const [jobs, setJobs] = useState([
    { id: 1, name: 'CPI Campaign - App Install A', type: 'CPI', targetUrl: 'https://play.google.com/store/apps/...', schedule: 'Every 30 min', status: 'running', device: 'Mobile', proxy: '192.168.1.100', lastRun: '5 min ago', totalRuns: 156 },
    { id: 2, name: 'RUT - Landing Page B', type: 'RUT', targetUrl: 'https://example.com/landing', schedule: 'Every 1 hour', status: 'running', device: 'Desktop', proxy: '10.0.0.50', lastRun: '12 min ago', totalRuns: 89 },
    { id: 3, name: 'CPI Campaign - App Install C', type: 'CPI', targetUrl: 'https://apps.apple.com/app/...', schedule: 'Every 15 min', status: 'paused', device: 'Mobile', proxy: '172.16.0.25', lastRun: '2 hours ago', totalRuns: 234 },
    { id: 4, name: 'RUT - Form Submit D', type: 'RUT', targetUrl: 'https://example.com/form', schedule: 'Every 45 min', status: 'running', device: 'Desktop', proxy: '192.168.2.75', lastRun: '8 min ago', totalRuns: 67 },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newJob, setNewJob] = useState({
    name: '',
    type: 'RUT',
    targetUrl: '',
    schedule: 'Every 30 min',
    device: 'Desktop',
    proxy: ''
  })

  const handleCreateJob = () => {
    if (!newJob.name || !newJob.targetUrl) return

    const job = {
      id: jobs.length + 1,
      ...newJob,
      status: 'running',
      lastRun: 'Just now',
      totalRuns: 0
    }

    setJobs([job, ...jobs])
    setNewJob({ name: '', type: 'RUT', targetUrl: '', schedule: 'Every 30 min', device: 'Desktop', proxy: '' })
    setShowCreateModal(false)
  }

  const toggleStatus = (id) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: job.status === 'running' ? 'paused' : 'running' } : job
    ))
  }

  const handleDelete = (id) => {
    setJobs(jobs.filter(job => job.id !== id))
  }

  const runningCount = jobs.filter(j => j.status === 'running').length
  const pausedCount = jobs.filter(j => j.status === 'paused').length
  const totalRuns = jobs.reduce((sum, j) => sum + j.totalRuns, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Real User Traffic</h1>
          <p className="text-gray-400 text-sm mt-1">Schedule and manage CPI & RUT jobs</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Job
        </button>
      </div>

      {/* Info Banner */}
      <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
        <div className="flex items-start gap-3">
          <Monitor className="w-5 h-5 text-brand-blue mt-0.5" />
          <div>
            <p className="text-sm text-brand-blue/90">
              <span className="font-semibold">Desktop App Required:</span> Heavy features (RUT, Form Filler) require the desktop app. Jobs execute on your PC using real Chrome — not headless bots.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue w-fit mb-3">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{jobs.length}</div>
          <div className="text-sm text-gray-400">Total Jobs</div>
        </div>
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-500 w-fit mb-3">
            <Play className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{runningCount}</div>
          <div className="text-sm text-gray-400">Running</div>
        </div>
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 w-fit mb-3">
            <Pause className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{pausedCount}</div>
          <div className="text-sm text-gray-400">Paused</div>
        </div>
        <div className="stat-card">
          <div className="p-2 rounded-lg bg-brand-purple/10 text-brand-purple w-fit mb-3">
            <Check className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{totalRuns}</div>
          <div className="text-sm text-gray-400">Total Runs</div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-4 font-medium">Job Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Target URL</th>
                <th className="px-6 py-4 font-medium">Schedule</th>
                <th className="px-6 py-4 font-medium">Device</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Runs</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-brand-purple" />
                      </div>
                      <span className="text-sm font-medium text-white">{job.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.type === 'CPI' 
                        ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' 
                        : 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20'
                    }`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400 truncate max-w-[200px] block">{job.targetUrl}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{job.schedule}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{job.device}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === 'running' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {job.status === 'running' ? (
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse" />
                      ) : (
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5" />
                      )}
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-white">{job.totalRuns}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleStatus(job.id)}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      >
                        {job.status === 'running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleDelete(job.id)}
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

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create New Job</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Name</label>
                <input
                  type="text"
                  value={newJob.name}
                  onChange={(e) => setNewJob({...newJob, name: e.target.value})}
                  placeholder="e.g., CPI Campaign - App Install"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Type</label>
                <select 
                  value={newJob.type}
                  onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                  className="input-field"
                >
                  <option value="RUT">Real User Traffic (RUT)</option>
                  <option value="CPI">Cost Per Install (CPI)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target URL</label>
                <input
                  type="url"
                  value={newJob.targetUrl}
                  onChange={(e) => setNewJob({...newJob, targetUrl: e.target.value})}
                  placeholder="https://example.com/your-target"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Schedule</label>
                  <select 
                    value={newJob.schedule}
                    onChange={(e) => setNewJob({...newJob, schedule: e.target.value})}
                    className="input-field"
                  >
                    <option value="Every 15 min">Every 15 min</option>
                    <option value="Every 30 min">Every 30 min</option>
                    <option value="Every 1 hour">Every 1 hour</option>
                    <option value="Every 2 hours">Every 2 hours</option>
                    <option value="Every 6 hours">Every 6 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Device</label>
                  <select 
                    value={newJob.device}
                    onChange={(e) => setNewJob({...newJob, device: e.target.value})}
                    className="input-field"
                  >
                    <option value="Desktop">Desktop</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Proxy (Optional)</label>
                <input
                  type="text"
                  value={newJob.proxy}
                  onChange={(e) => setNewJob({...newJob, proxy: e.target.value})}
                  placeholder="192.168.1.1:8080"
                  className="input-field"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 btn-secondary">
                  Cancel
                </button>
                <button onClick={handleCreateJob} className="flex-1 btn-primary">
                  Create Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RealUserTraffic
