import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Links from './pages/Links'
import Clicks from './pages/Clicks'
import Conversions from './pages/Conversions'
import Proxies from './pages/Proxies'
import RealUserTraffic from './pages/RealUserTraffic'
import FormFiller from './pages/FormFiller'
import Settings from './pages/Settings'
import Layout from './components/Layout'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/links" element={
          <ProtectedRoute>
            <Layout><Links /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/clicks" element={
          <ProtectedRoute>
            <Layout><Clicks /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/conversions" element={
          <ProtectedRoute>
            <Layout><Conversions /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/proxies" element={
          <ProtectedRoute>
            <Layout><Proxies /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/real-user-traffic" element={
          <ProtectedRoute>
            <Layout><RealUserTraffic /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/form-filler" element={
          <ProtectedRoute>
            <Layout><FormFiller /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Layout><Settings /></Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
