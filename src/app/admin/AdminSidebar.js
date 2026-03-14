'use client'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Award, 
  Users, 
  User, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Mail
} from 'lucide-react'

export default function AdminSidebar() {
  const { logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin',
      active: pathname === '/admin'
    },
    {
      label: 'Portfolio',
      icon: FileText,
      href: '/admin/portfolio',
      active: pathname.startsWith('/admin/portfolio')
    },
    {
      label: 'Testimonials',
      icon: MessageSquare,
      href: '/admin/testimonials',
      active: pathname.startsWith('/admin/testimonials')
    },
    {
      label: 'Skills',
      icon: Award,
      href: '/admin/skills',
      active: pathname.startsWith('/admin/skills')
    },
    {
      label: 'Messages',
      icon: Mail,
      href: '/admin/messages',
      active: pathname.startsWith('/admin/messages')
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      active: pathname.startsWith('/admin/analytics')
    },
    {
      label: 'Profile',
      icon: User,
      href: '/admin/profile',
      active: pathname.startsWith('/admin/profile')
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/admin/settings',
      active: pathname.startsWith('/admin/settings')
    }
  ]

  return (
    <div className={`bg-gray-900 border-r border-gray-700 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-gray-400 text-sm">Alex Creative</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button onClick={() => { if (window.confirm('Are you sure you want to logout?')) logout() }} className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors w-full">
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}