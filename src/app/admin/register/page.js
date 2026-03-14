'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { Eye, EyeOff, Lock, Mail, User, Shield, AlertCircle, CheckCircle } from 'lucide-react'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import { handleApiError, formatValidationErrors } from '../../../utils/errorHandler'

export default function AdminRegister() {
  const router = useRouter()
  const { register } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'viewer'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [passwordStrength, setPasswordStrength] = useState(0)

  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/\d/.test(password)) strength += 1
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1
    return strength
  }

  const getPasswordStrengthText = (strength) => {
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
    return levels[strength] || 'Very Weak'
  }

  const getPasswordStrengthColor = (strength) => {
    const colors = [
      'text-red-500',
      'text-orange-500', 
      'text-yellow-500',
      'text-blue-500',
      'text-green-500'
    ]
    return colors[strength] || 'text-red-500'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    setValidationErrors([])

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (passwordStrength < 3) {
      setError('Password is too weak. Please use at least 8 characters with uppercase, lowercase, and numbers.')
      setLoading(false)
      return
    }

    try {
      // Use the register function from the AuthContext
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess('Account created successfully! Redirecting to login...')
      
      setTimeout(() => {
        router.push('/admin/login')
      }, 2000)
    } catch (error) {
      console.error('Registration failed:', error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        setError(data?.message || `An error occurred: ${status}`);
        if (data.message && Array.isArray(data.message)) {
          setValidationErrors(formatValidationErrors(data.message));
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError('Network error. Please check your connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(error.message || 'An unexpected error occurred during registration.');
      }
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Check password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value))
    }
    
    // Clear messages when user starts typing
    if (error) setError('')
    if (success) setSuccess('')
    if (validationErrors.length > 0) setValidationErrors([])
  }

  const roles = [
    { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
    { value: 'editor', label: 'Editor', description: 'Create and edit content' },
    { value: 'admin', label: 'Admin', description: 'Full management access' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-gray-800 border-gray-700">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Create Admin Account</h1>
            <p className="text-gray-400">Register for dashboard access</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300 text-sm">{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300 text-sm font-medium">{error}</span>
              </div>
              
              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <ul className="text-red-300 text-sm space-y-1 mt-2 ml-7">
                  {validationErrors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={50}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent appearance-none"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Note: Admin approval may be required for higher-level roles
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={8}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Password Strength:</span>
                    <span className={getPasswordStrengthColor(passwordStrength)}>
                      {getPasswordStrengthText(passwordStrength)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        passwordStrength <= 1 ? 'bg-red-500' :
                        passwordStrength <= 2 ? 'bg-orange-500' :
                        passwordStrength <= 3 ? 'bg-yellow-500' :
                        passwordStrength <= 4 ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-1">
                  {formData.password === formData.confirmPassword ? (
                    <p className="text-green-400 text-xs flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Passwords match
                    </p>
                  ) : (
                    <p className="text-red-400 text-xs flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Passwords do not match
                    </p>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || formData.password !== formData.confirmPassword || !formData.name.trim() || !formData.email.trim()}
              className="w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link 
                href="/admin/login" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400 mb-2">Security Requirements:</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Minimum 8 characters</li>
              <li>• At least one uppercase letter</li>
              <li>• At least one lowercase letter</li>
              <li>• At least one number</li>
              <li>• Special characters recommended</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { Eye, EyeOff, Lock, Mail, User, Shield, AlertCircle, CheckCircle, Code } from 'lucide-react'
// import Button from '../../components/common/Button'
// import Card from '../../components/common/Card'

// export default function AdminRegister() {
//   const router = useRouter()
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'viewer'
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')
//   const [debugInfo, setDebugInfo] = useState('')
//   const [showDebug, setShowDebug] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')
//     setSuccess('')
//     setDebugInfo('')

//     // Client-side validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match')
//       setLoading(false)
//       return
//     }

//     if (formData.password.length < 8) {
//       setError('Password must be at least 8 characters long')
//       setLoading(false)
//       return
//     }

//     try {
//       const requestData = {
//         name: formData.name.trim(),
//         email: formData.email.trim().toLowerCase(),
//         password: formData.password
//       }

//       // Debug: Log the request
//       console.log('Sending registration request:', {
//         url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: requestData
//       })

//       setDebugInfo(`Request URL: ${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register
// Request Method: POST
// Request Body: ${JSON.stringify(requestData, null, 2)}`)

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       })

//       console.log('Response status:', response.status)
//       console.log('Response headers:', Object.fromEntries(response.headers.entries()))

//       let responseData
//       const contentType = response.headers.get('content-type')
      
//       if (contentType && contentType.includes('application/json')) {
//         responseData = await response.json()
//       } else {
//         responseData = await response.text()
//       }

//       console.log('Response data:', responseData)

//       // Update debug info with response
//       setDebugInfo(prev => `${prev}

// Response Status: ${response.status} ${response.statusText}
// Response Headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)}
// Response Body: ${JSON.stringify(responseData, null, 2)}`)

//       if (!response.ok) {
//         let errorMessage = 'Registration failed'

//         if (typeof responseData === 'object' && responseData !== null) {
//           // Handle NestJS validation errors
//           if (Array.isArray(responseData.message)) {
//             errorMessage = responseData.message.join(', ')
//           } else if (responseData.message) {
//             errorMessage = responseData.message
//           } else if (responseData.error) {
//             errorMessage = responseData.error
//           }
//         } else if (typeof responseData === 'string') {
//           errorMessage = responseData
//         }

//         setError(`Error ${response.status}: ${errorMessage}`)
//         setLoading(false)
//         return
//       }

//       setSuccess('Account created successfully! Redirecting to login...')
      
//       setTimeout(() => {
//         router.push('/admin/login')
//       }, 2000)
      
//     } catch (networkError) {
//       console.error('Network error:', networkError)
//       setError(`Network Error: ${networkError.message}. Check if your backend is running on the correct port.`)
      
//       setDebugInfo(prev => `${prev}

// Network Error: ${networkError.message}
// Check:
// 1. Is your NestJS server running?
// 2. Is it running on the correct port (${process.env.NEXT_PUBLIC_API_BASE_URL})?
// 3. Is CORS configured properly?`)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value
//     })
    
//     // Clear messages when user starts typing
//     if (error) setError('')
//     if (success) setSuccess('')
//   }

//   const testApiConnection = async () => {
//     try {
//       console.log('Testing API connection...')
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`, {
//         method: 'GET',
//       })
      
//       if (response.ok) {
//         setSuccess('API connection successful!')
//       } else {
//         setError(`API connection failed: ${response.status}`)
//       }
//     } catch (error) {
//       setError(`API connection failed: ${error.message}`)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
//       <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
//         <div className="p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <User className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-2xl font-bold text-white mb-2">Create Admin Account</h1>
//             <p className="text-gray-400">Register for dashboard access</p>
//           </div>

//           {/* Debug Toggle */}
//           <div className="mb-6 flex justify-between items-center">
//             <Button
//               type="button"
//               variant="outline"
//               size="sm"
//               onClick={testApiConnection}
//               className="flex items-center space-x-2"
//             >
//               <Code className="w-4 h-4" />
//               <span>Test API</span>
//             </Button>
            
//             <button
//               type="button"
//               onClick={() => setShowDebug(!showDebug)}
//               className="text-sm text-gray-400 hover:text-white transition-colors"
//             >
//               {showDebug ? 'Hide' : 'Show'} Debug Info
//             </button>
//           </div>

//           {/* Debug Info */}
//           {showDebug && debugInfo && (
//             <div className="mb-6 p-4 bg-black border border-gray-600 rounded-lg">
//               <p className="text-xs text-gray-400 mb-2">Debug Information:</p>
//               <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap">
//                 {debugInfo}
//               </pre>
//             </div>
//           )}

//           {/* Success Message */}
//           {success && (
//             <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg flex items-center space-x-2">
//               <CheckCircle className="w-5 h-5 text-green-400" />
//               <span className="text-green-300 text-sm">{success}</span>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
//               <div className="flex items-center space-x-2 mb-2">
//                 <AlertCircle className="w-5 h-5 text-red-400" />
//                 <span className="text-red-300 text-sm font-medium">{error}</span>
//               </div>
//             </div>
//           )}

//           {/* Registration Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Full Name *
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     minLength={2}
//                     maxLength={50}
//                     className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     placeholder="John Doe"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     placeholder="john@example.com"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Password *
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     required
//                     minLength={8}
//                     className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     placeholder="Min 8 characters"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Confirm Password *
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     placeholder="Repeat password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               disabled={loading || formData.password !== formData.confirmPassword || !formData.name.trim() || !formData.email.trim()}
//               className="w-full flex items-center justify-center space-x-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   <span>Creating Account...</span>
//                 </>
//               ) : (
//                 <span>Create Account</span>
//               )}
//             </Button>
//           </form>

//           {/* Login Link */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-400 text-sm">
//               Already have an account?{' '}
//               <Link 
//                 href="/admin/login" 
//                 className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
//               >
//                 Sign in here
//               </Link>
//             </p>
//           </div>

//           {/* API Info */}
//           <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
//             <p className="text-sm text-gray-400 mb-2">API Configuration:</p>
//             <div className="text-xs text-gray-500 space-y-1">
//               <p><strong>Backend URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL}</p>
//               <p><strong>Register Endpoint:</strong> /auth/register</p>
//               <p><strong>Expected Fields:</strong> name, email, password, role</p>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   )
// }