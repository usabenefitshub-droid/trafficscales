import React, { useState } from 'react'
import { FileText, Plus, Play, Trash2, Check, Globe, Clock, Monitor } from 'lucide-react'

const FormFiller = () => {
  const [templates, setTemplates] = useState([
    { 
      id: 1, 
      name: 'Lead Gen Form A', 
      targetUrl: 'https://example.com/lead-form', 
      fields: [
        { selector: 'input[name="first_name"]', value: 'John', type: 'text' },
        { selector: 'input[name="email"]', value: 'john@example.com', type: 'email' },
        { selector: 'input[name="phone"]', value: '+1234567890', type: 'tel' },
      ],
      status: 'active',
      lastRun: '10 min ago',
      totalRuns: 45
    },
    { 
      id: 2, 
      name: 'Signup Form B', 
      targetUrl: 'https://example.com/signup', 
      fields: [
        { selector: 'input[name="username"]', value: 'user123', type: 'text' },
        { selector: 'input[name="password"]', value: '********', type: 'password' },
        { selector: 'input[name="confirm_password"]', value: '********', type: 'password' },
      ],
      status: 'active',
      lastRun: '25 min ago',
      totalRuns: 32
    },
    { 
      id: 3, 
      name: 'Survey Form C', 
      targetUrl: 'https://example.com/survey', 
      fields: [
        { selector: 'select[name="age"]', value: '25-34', type: 'select' },
        { selector: 'input[name="newsletter"]', value: 'true', type: 'checkbox' },
      ],
      status: 'paused',
      lastRun: '2 hours ago',
      totalRuns: 18
    },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    targetUrl: '',
    fields: [{ selector: '', value: '', type: 'text' }]
  })

  const addField = () => {
    setNewTemplate({
      ...newTemplate,
      fields: [...newTemplate.fields, { selector: '', value: '', type: 'text' }]
    })
  }

  const removeField = (index) => {
    setNewTemplate({
      ...newTemplate,
      fields: newTemplate.fields.filter((_, i) => i !== index)
    })
  }

  const updateField = (index, key, value) => {
    const updatedFields = newTemplate.fields.map((field, i) => 
      i === index ? { ...field, [key]: value } : field
    )
    setNewTemplate({ ...newTemplate, fields: updatedFields })
  }

  const handleCreate = () => {
    if (!newTemplate.name || !newTemplate.targetUrl) return

    const template = {
      id: templates.length + 1,
      ...newTemplate,
      status: 'active',
      lastRun: 'Never',
      totalRuns: 0
    }

    setTemplates([template, ...templates])
    setNewTemplate({ name: '', targetUrl: '', fields: [{ selector: '', value: '', type: 'text' }] })
    setShowCreateModal(false)
  }

  const toggleStatus = (id) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, status: t.status === 'active' ? 'paused' : 'active' } : t
    ))
  }

  const handleDelete = (id) => {
    setTemplates(templates.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Form Filler</h1>
          <p className="text-gray-400 text-sm mt-1">Auto-fill landing pages with real Chrome</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Template
        </button>
      </div>

      {/* Info Banner */}
      <div className="p-4 rounded-xl bg-brand-purple/5 border border-brand-purple/10">
        <div className="flex items-start gap-3">
          <Monitor className="w-5 h-5 text-brand-purple mt-0.5" />
          <div>
            <p className="text-sm text-brand-purple/90">
              <span className="font-semibold">Real Chrome Automation:</span> Forms are filled using real Chrome browser with genuine human patterns — not headless bots. Desktop app required for execution.
            </p>
          </div>
        </div>
      </div>

      {/* Templates */}
      <div className="space-y-4">
        {templates.map((template) => (
          <div key={template.id} className="glass-card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                  <p className="text-sm text-gray-400">{template.targetUrl}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  template.status === 'active' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                }`}>
                  {template.status === 'active' && <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse" />}
                  {template.status}
                </span>
                <button 
                  onClick={() => toggleStatus(template.id)}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  {template.status === 'active' ? <Play className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => handleDelete(template.id)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Form Fields ({template.fields.length})</h4>
                <div className="space-y-2">
                  {template.fields.map((field, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/50">
                      <code className="text-xs text-brand-blue flex-1">{field.selector}</code>
                      <span className="text-xs text-gray-500">{field.type}</span>
                      <span className="text-xs text-gray-400">{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                    <div className="text-2xl font-bold text-white">{template.totalRuns}</div>
                    <div className="text-xs text-gray-400 mt-1">Total Runs</div>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                    <div className="text-sm font-medium text-gray-300">{template.lastRun}</div>
                    <div className="text-xs text-gray-400 mt-1">Last Run</div>
                  </div>
                </div>
                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Run Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="glass-card w-full max-w-2xl p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create Form Template</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Template Name</label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  placeholder="e.g., Lead Gen Form"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Landing Page URL</label>
                <input
                  type="url"
                  value={newTemplate.targetUrl}
                  onChange={(e) => setNewTemplate({...newTemplate, targetUrl: e.target.value})}
                  placeholder="https://example.com/form"
                  className="input-field"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300">Form Fields</label>
                  <button 
                    onClick={addField}
                    className="text-sm text-brand-blue hover:text-brand-purple transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Field
                  </button>
                </div>
                <div className="space-y-3">
                  {newTemplate.fields.map((field, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={field.selector}
                          onChange={(e) => updateField(index, 'selector', e.target.value)}
                          placeholder="CSS Selector (e.g., input[name='email'])"
                          className="input-field text-sm"
                        />
                      </div>
                      <div className="w-32">
                        <select
                          value={field.type}
                          onChange={(e) => updateField(index, 'type', e.target.value)}
                          className="input-field text-sm"
                        >
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="password">Password</option>
                          <option value="tel">Phone</option>
                          <option value="select">Select</option>
                          <option value="checkbox">Checkbox</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => updateField(index, 'value', e.target.value)}
                          placeholder="Value to fill"
                          className="input-field text-sm"
                        />
                      </div>
                      {newTemplate.fields.length > 1 && (
                        <button 
                          onClick={() => removeField(index)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 btn-secondary">
                  Cancel
                </button>
                <button onClick={handleCreate} className="flex-1 btn-primary">
                  Create Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormFiller
