'use client'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Bell, Search, User, Moon, Sun, Globe, LogOut, Settings, Shield } from 'lucide-react'

export default function AdminHeader() {
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  const getRoleColor = (role) => {
    const colors = {
      'super_admin': 'text-red-400',
      'admin': 'text-purple-400',
      'editor': 'text-blue-400',
      'viewer': 'text-gray-400'
    }
    return colors[role] || 'text-gray-400'
  }

  const getRoleBadge = (role) => {
    const badges = {
      'super_admin': { color: 'bg-red-600', text: 'Super Admin' },
      'admin': { color: 'bg-purple-600', text: 'Admin' },
      'editor': { color: 'bg-blue-600', text: 'Editor' },
      'viewer': { color: 'bg-gray-600', text: 'Viewer' }
    }
    return badges[role] || { color: 'bg-gray-600', text: 'Unknown' }
  }

  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* View Site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="View site"
          >
            <Globe className="w-5 h-5 text-gray-400" />
          </a>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-white font-medium">{user?.name || user?.email || 'Admin User'}</p>
                <p className={`text-sm font-medium ${getRoleColor(user?.role)}`}>
                  {getRoleBadge(user?.role).text}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>
            
            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-700">
                  <p className="font-medium text-white">{user?.name || user?.email}</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getRoleBadge(user?.role).color}`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {getRoleBadge(user?.role).text}
                    </span>
                  </div>
                </div>
                
                <div className="p-2">
                  <button 
                    onClick={() => setShowUserMenu(false)}
                    className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowUserMenu(false)}
                    className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </button>
                  
                  <hr className="border-gray-700 my-2" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}