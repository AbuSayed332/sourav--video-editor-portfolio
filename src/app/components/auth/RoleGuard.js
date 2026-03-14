'use client'
import { useAuth } from '../../contexts/AuthContext'
import { Shield, Lock } from 'lucide-react'

const RoleGuard = ({ 
  children, 
  requiredRole = 'viewer', 
  requiredPermission = null,
  fallback = null 
}) => {
  const { user, hasRole, hasPermission } = useAuth()

  // Check role-based access
  const hasRequiredRole = hasRole(requiredRole)
  
  // Check permission-based access
  const hasRequiredPermission = requiredPermission ? hasPermission(requiredPermission) : true

  const hasAccess = hasRequiredRole && hasRequiredPermission

  if (!hasAccess) {
    if (fallback) {
      return fallback
    }

    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-800 rounded-lg border border-red-500/30">
        <Lock className="w-16 h-16 text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Access Denied</h3>
        <p className="text-gray-400 mb-2">
          You don't have permission to access this resource.
        </p>
        <p className="text-sm text-gray-500">
          Required role: <span className="text-red-400 font-medium">{requiredRole}</span>
          {requiredPermission && (
            <span> | Required permission: <span className="text-red-400 font-medium">{requiredPermission}</span></span>
          )}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Your role: <span className="text-yellow-400 font-medium">{user?.role || 'None'}</span>
        </p>
      </div>
    )
  }

  return children
}

export default RoleGuard