import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Globe, Activity, Shield, Cpu, MousePointer, Mail, 
  ArrowRight, Check, Menu, X, Zap, BarChart3, Users
} from 'lucide-react'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Cloud Dashboard — Login Anywhere",
      description: "Manage links, clicks and campaigns from any browser, any device. Your dashboard lives at trafficscale.app, not stuck on one PC."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Always-On Tracking Links",
      description: "Every link you generate runs at trafficscale.app/r/xxx — clicks keep flowing even when your computer is off, sleeping, or unplugged."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Massive Proxy Pool",
      description: "Plug in residential, ISP or mobile proxies. Built-in checker validates them at scale across parallel batches."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "CPI Job Orchestrator",
      description: "Run Cost-Per-Install campaigns across distributed worker devices with smart routing and per-device fingerprinting."
    },
    {
      icon: <MousePointer className="w-6 h-6" />,
      title: "Form Filler + Real User Traffic",
      description: "Auto-fill landing pages and emulate genuine human patterns through real Chrome — not headless bots."
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Validation Suite",
      description: "Verify deliverability, separate cleaned lists, and feed only valid leads into your campaigns."
    }
  ]

  const stats = [
    { label: "Active Users", value: "12,000+", icon: <Users className="w-5 h-5" /> },
    { label: "Links Tracked", value: "2.5M+", icon: <Zap className="w-5 h-5" /> },
    { label: "Clicks Processed", value: "50M+", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Proxies Tested", value: "1M+", icon: <Shield className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-grid pointer-events-none"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TrafficScale</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#stats" className="nav-link">Stats</a>
              <a href="#guide" className="nav-link">Guide</a>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary text-sm">Get Started</Link>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-dark-800/95 backdrop-blur-xl border-b border-white/5">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-400 hover:text-white py-2">Features</a>
              <a href="#stats" className="block text-gray-400 hover:text-white py-2">Stats</a>
              <a href="#guide" className="block text-gray-400 hover:text-white py-2">Guide</a>
              <Link to="/login" className="block text-gray-400 hover:text-white py-2">Login</Link>
              <Link to="/register" className="btn-primary block text-center text-sm">Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Built for Scale
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Everything you need to{' '}
            <span className="gradient-text">run traffic at scale</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            From single landing-page tests to multi-thousand-PC campaigns — one platform, fully self-hosted under your license.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="btn-primary flex items-center gap-2 text-lg">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-secondary flex items-center gap-2 text-lg">
              Login to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card text-center">
                <div className="flex justify-center mb-3 text-brand-blue">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful tools for serious marketers
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Everything you need to manage, track, and scale your traffic campaigns in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon mb-5">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section id="guide" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-sm font-medium mb-4">
              <Check className="w-4 h-4" />
              Quick Start Guide
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get started in minutes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              { step: 1, title: "Create Account", desc: "Sign up with your email and get instant access to the cloud dashboard." },
              { step: 2, title: "Generate Tracking Links", desc: "Create smart links that track every click with detailed analytics." },
              { step: 3, title: "Add Proxies", desc: "Import your proxy list and validate them with one click." },
              { step: 4, title: "Launch Campaigns", desc: "Set up CPI jobs or Real User Traffic campaigns and watch the results." },
            ].map((item) => (
              <div key={item.step} className="glass-card p-6 flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to scale your traffic?
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Join thousands of marketers who trust TrafficScale to manage their campaigns.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="btn-primary flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/login" className="btn-secondary">
                  Login to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TrafficScale</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 TrafficScale. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
