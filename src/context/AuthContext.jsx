import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('trafficscale_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Demo login - in production this would call an API
    const demoUser = {
      id: '1',
      email: email,
      name: 'Admin User',
      avatar: null,
      licenseKey: 'TS-PRO-2024-XXXX',
      licenseExpiry: '2025-12-31',
      plan: 'Pro'
    }
    setUser(demoUser)
    setIsAuthenticated(true)
    localStorage.setItem('trafficscale_user', JSON.stringify(demoUser))
    return true
  }

  const register = (name, email, password) => {
    const newUser = {
      id: '1',
      email: email,
      name: name,
      avatar: null,
      licenseKey: 'TS-PRO-2024-XXXX',
      licenseExpiry: '2025-12-31',
      plan: 'Pro'
    }
    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem('trafficscale_user', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('trafficscale_user')
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('trafficscale_user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
