import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, Link2, MousePointer, TrendingUp, Shield,
  Users, FileText, ArrowUpRight, ArrowDownRight, Zap, Globe,
  Smartphone, Monitor
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLinks: 24,
    totalClicks: 15680,
    totalConversions: 342,
    activeProxies: 156,
    activeJobs: 8,
    conversionRate: 2.18
  })

  const [recentLinks, setRecentLinks] = useState([
    { id: 1, name: 'Facebook Ad Campaign A', url: 'trafficscale.app/r/abc123', clicks: 4520, conversions: 98, status: 'active' },
    { id: 2, name: 'Google Ads Campaign B', url: 'trafficscale.app/r/def456', clicks: 3210, conversions: 67, status: 'active' },
    { id: 3, name: 'Instagram Story C', url: 'trafficscale.app/r/ghi789', clicks: 1890, conversions: 45, status: 'active' },
    { id: 4, name: 'TikTok Video D', url: 'trafficscale.app/r/jkl012', clicks: 980, conversions: 23, status: 'paused' },
  ])

  const [clickData, setClickData] = useState([
    { name: 'Mon', clicks: 1200, conversions: 28 },
    { name: 'Tue', clicks: 1800, conversions: 42 },
    { name: 'Wed', clicks: 2400, conversions: 55 },
    { name: 'Thu', clicks: 2100, conversions: 48 },
    { name: 'Fri', clicks: 2800, conversions: 62 },
    { name: 'Sat', clicks: 3200, conversions: 75 },
    { name: 'Sun', clicks: 2180, conversions: 32 },
  ])

  const [deviceData, setDeviceData] = useState([
    { name: 'Desktop', value: 45, icon: <Monitor className="w-4 h-4" /> },
    { name: 'Mobile', value: 40, icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Tablet', value: 15, icon: <Globe className="w-4 h-4" /> },
  ])

  const statCards = [
    { 
      title: 'Total Links', 
      value: stats.totalLinks, 
      icon: <Link2 className="w-5 h-5" />, 
      color: 'brand-blue',
      change: '+12%',
      up: true
    },
    { 
      title: 'Total Clicks', 
      value: stats.totalClicks.toLocaleString(), 
      icon: <MousePointer className="w-5 h-5" />, 
      color: 'brand-purple',
      change: '+28%',
      up: true
    },
    { 
      title: 'Conversions', 
      value: stats.totalConversions, 
      icon: <TrendingUp className="w-5 h-5" />, 
      color: 'green-500',
      change: '+15%',
      up: true
    },
    { 
      title: 'Active Proxies', 
      value: stats.activeProxies, 
      icon: <Shield className="w-5 h-5" />, 
      color: 'brand-cyan',
      change: '-3%',
      up: false
    },
  ]

  const quickActions = [
    { label: 'New Link', path: '/links', icon: <Link2 className="w-5 h-5" />, color: 'from-brand-blue to-brand-purple' },
    { label: 'Add Proxies', path: '/proxies', icon: <Shield className="w-5 h-5" />, color: 'from-brand-purple to-brand-cyan' },
    { label: 'New Job', path: '/real-user-traffic', icon: <Users className="w-5 h-5" />, color: 'from-brand-cyan to-brand-blue' },
    { label: 'Form Filler', path: '/form-filler', icon: <FileText className="w-5 h-5" />, color: 'from-green-500 to-brand-cyan' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Overview of your traffic campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Last updated: Just now</span>
          <button className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-400 hover:text-white transition-colors">
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}/10 text-${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="glass-card p-5 hover:border-white/10 transition-all duration-300 group"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <span className="text-sm font-medium text-white">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Clicks Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Clicks & Conversions</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-blue"></span>
                <span className="text-gray-400">Clicks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-purple"></span>
                <span className="text-gray-400">Conversions</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={clickData}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e3a" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="clicks" stroke="#3b82f6" fillOpacity={1} fill="url(#colorClicks)" strokeWidth={2} />
              <Area type="monotone" dataKey="conversions" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorConversions)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Device Breakdown */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Device Breakdown</h3>
          <div className="space-y-4">
            {deviceData.map((device, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    {device.icon}
                    <span className="text-sm">{device.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{device.value}%</span>
                </div>
                <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-purple rounded-full transition-all duration-500"
                    style={{ width: `${device.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stats.conversionRate}%</div>
              <div className="text-sm text-gray-400">Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Links */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Top Performing Links</h3>
          <Link to="/links" className="text-sm text-brand-blue hover:text-brand-purple transition-colors">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="pb-3 font-medium">Campaign Name</th>
                <th className="pb-3 font-medium">Short URL</th>
                <th className="pb-3 font-medium">Clicks</th>
                <th className="pb-3 font-medium">Conversions</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentLinks.map((link) => (
                <tr key={link.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <span className="text-sm font-medium text-white">{link.name}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-brand-blue">{link.url}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-white">{link.clicks.toLocaleString()}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-white">{link.conversions}</span>
                  </td>
                  <td className="py-4">
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
                  <td className="py-4">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
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

export default Dashboard
