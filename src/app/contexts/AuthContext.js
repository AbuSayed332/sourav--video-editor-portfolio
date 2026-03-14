'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check for existing auth token on mount
    const storedToken = localStorage.getItem('access_token')
    const storedUser = localStorage.getItem('user_data')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      // Verify token is still valid
      verifyToken(storedToken)
    }
    setLoading(false)
  }, [])

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        // Token is invalid, clear auth data
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_data')
        setToken(null)
        setUser(null)
        return false
      }

      const userData = await response.json()
      setUser(userData)
      return true
    } catch (error) {
      console.error('Token verification failed:', error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_data')
      setToken(null)
      setUser(null)
      return false
    }
  }

const login = async (email, password) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    const accessToken = data.access_token
    const userData = data.user

    if (!accessToken) throw new Error('No access token received')

    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('user_data', JSON.stringify(userData))
    setToken(accessToken)
    setUser(userData)

    return { token: accessToken, user: userData }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}
  const register = async (userData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registration failed')
      }

      return data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      // Optional: Call logout endpoint
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      }
    } catch (error) {
      console.error('Logout API error:', error)
      // Continue with local logout even if API fails
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_data')
      setToken(null)
      setUser(null)
    }
  }

  const hasRole = (requiredRole) => {
    if (!user || !user.role) return false
    
    const rolePriority = {
      'super_admin': 4,
      'admin': 3,
      'editor': 2,
      'viewer': 1
    }
    
    const userPriority = rolePriority[user.role] || 0
    const requiredPriority = rolePriority[requiredRole] || 0
    
    return userPriority >= requiredPriority
  }

  const hasPermission = (permission) => {
    if (!user) return false
    
    // Check if user has specific permission
    if (user.permissions && Array.isArray(user.permissions)) {
      return user.permissions.includes(permission)
    }

    // Fallback to role-based permissions
    const rolePermissions = {
      'super_admin': ['*'], // All permissions
      'admin': [
        'portfolio:create', 'portfolio:read', 'portfolio:update', 'portfolio:delete',
        'testimonials:create', 'testimonials:read', 'testimonials:update', 'testimonials:delete',
        'skills:create', 'skills:read', 'skills:update', 'skills:delete',
        'users:read', 'users:update'
      ],
      'editor': [
        'portfolio:create', 'portfolio:read', 'portfolio:update',
        'testimonials:read', 'testimonials:update',
        'skills:create', 'skills:read', 'skills:update'
      ],
      'viewer': [
        'portfolio:read', 'testimonials:read', 'skills:read'
      ]
    }

    const userPermissions = rolePermissions[user.role] || []
    return userPermissions.includes('*') || userPermissions.includes(permission)
  }

  // API call helper with automatic token refresh
  const apiCall = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          ...options.headers,
        },
      })

      // Handle 401 Unauthorized
      if (response.status === 401) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_data')
        setToken(null)
        setUser(null)
        throw new Error('Session expired. Please login again.')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API call failed:', error)
      throw error
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    hasRole,
    hasPermission,
    apiCall,
    verifyToken,
    isAuthenticated: !!user && !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}