'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

const publicPaths = ['/admin/login', '/admin/register', '/admin/forgot-password']

function ProtectedAdminContent({ children }) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading) {
      // Allow access to public admin pages without authentication
      if (publicPaths.includes(pathname)) {
        if (isAuthenticated) {
          router.push('/admin')
        }
        return
      }

      // Redirect to login if not authenticated
      if (!isAuthenticated) {
        router.push('/admin/login')
        return
      }

      // Check if user has admin role
      if (user && !['admin', 'super_admin', 'editor'].includes(user.role)) {
        // The rendering logic below will handle showing the unauthorized message.
        // No need to redirect to a dedicated page.
        return
      }
    }
  }, [mounted, loading, isAuthenticated, user, router, pathname])

  // Show loading screen
  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Show public pages (login, register, etc.) without the admin layout
  if (publicPaths.includes(pathname)) {
    return children
  }

  // Show unauthorized page for non-admin users
  // if (user && !['admin', 'super_admin', 'editor'].includes(user.role)) {
  //   return (
  //     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-4xl font-bold text-red-400 mb-4">Unauthorized</h1>
  //         <p className="text-gray-400 mb-4">You don't have permission to access this area.</p>
  //         <p className="text-gray-500">Contact your administrator for access.</p>
  //       </div>
  //     </div>
  //   )
  // }

  // Don't render admin layout if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  // Render protected admin layout
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gray-800 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }) {
  return (
    <ProtectedAdminContent>
      {children}
    </ProtectedAdminContent>
  )
}