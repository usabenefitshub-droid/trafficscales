import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Settings, User, Lock, Key, Bell, Shield, Save, Check, Eye, EyeOff } from 'lucide-react'

const SettingsPage = () => {
  const { user, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: 'TrafficScale Inc.',
    timezone: 'UTC-5'
  })

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [apiKey, setApiKey] = useState('ts_live_xxxxxxxxxxxxxxxxxxxx')
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    jobComplete: true,
    proxyDead: true,
    updates: true
  })

  const handleSaveProfile = () => {
    updateProfile({ name: profile.name, email: profile.email })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChangePassword = () => {
    if (password.new === password.confirm && password.new.length > 0) {
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        setPassword({ current: '', new: '', confirm: '' })
      }, 3000)
    }
  }

  const regenerateApiKey = () => {
    const newKey = 'ts_live_' + Math.random().toString(36).substring(2, 26)
    setApiKey(newKey)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'password', label: 'Password', icon: <Lock className="w-4 h-4" /> },
    { id: 'api', label: 'API Keys', icon: <Key className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account and preferences</p>
      </div>

      {/* Security Tip */}
      <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-brand-blue mt-0.5" />
          <div>
            <p className="text-sm text-brand-blue/90">
              <span className="font-semibold">Security tip:</span> After first login, change your password to a strong one. Enable 2FA for extra security.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-white border border-brand-blue/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white text-2xl font-bold">
              {profile.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
              <p className="text-sm text-gray-400">{profile.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                  {user?.plan || 'Pro'} Plan
                </span>
                <span className="text-xs text-gray-500">License: {user?.licenseKey || 'TS-PRO-2024-XXXX'}</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({...profile, company: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
              <select 
                value={profile.timezone}
                onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                className="input-field"
              >
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">GMT (UTC+0)</option>
                <option value="UTC+1">Central European (UTC+1)</option>
                <option value="UTC+5.5">India (UTC+5:30)</option>
                <option value="UTC+8">China/Singapore (UTC+8)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={handleSaveProfile}
              className="btn-primary flex items-center gap-2"
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <div className="glass-card p-6 space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>

          <div className="space-y-5 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password.current}
                  onChange={(e) => setPassword({...password, current: e.target.value})}
                  placeholder="Enter current password"
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <input
                type="password"
                value={password.new}
                onChange={(e) => setPassword({...password, new: e.target.value})}
                placeholder="Enter new password"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) => setPassword({...password, confirm: e.target.value})}
                placeholder="Confirm new password"
                className="input-field"
              />
            </div>

            <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
              <p className="text-sm text-yellow-400/80">
                <span className="font-semibold">Password requirements:</span> At least 8 characters, including uppercase, lowercase, number, and special character.
              </p>
            </div>

            <button 
              onClick={handleChangePassword}
              className="btn-primary flex items-center gap-2"
            >
              {saved ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {saved ? 'Password Updated!' : 'Update Password'}
            </button>
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === 'api' && (
        <div className="glass-card p-6 space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Live API Key</label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={apiKey}
                    readOnly
                    className="input-field font-mono text-sm pr-20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">Live</span>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(apiKey)}
                  className="btn-secondary"
                >
                  Copy
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Use this key to authenticate API requests from your desktop app.</p>
            </div>

            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
              <p className="text-sm text-red-400/80">
                <span className="font-semibold">Warning:</span> Regenerating your API key will invalidate the old one. Your desktop app will need to be reconfigured.
              </p>
            </div>

            <button 
              onClick={regenerateApiKey}
              className="btn-secondary flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              Regenerate API Key
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="glass-card p-6 space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>

          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'browser', label: 'Browser Notifications', desc: 'Receive push notifications in browser' },
              { key: 'jobComplete', label: 'Job Completion', desc: 'Notify when a job finishes running' },
              { key: 'proxyDead', label: 'Proxy Alerts', desc: 'Notify when proxies go dead' },
              { key: 'updates', label: 'Product Updates', desc: 'Get notified about new features and updates' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-white">{item.label}</h4>
                  <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key]})}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications[item.key] ? 'bg-brand-blue' : 'bg-dark-600'
                  }`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    notifications[item.key] ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000) }}
              className="btn-primary flex items-center gap-2"
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save Preferences'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
