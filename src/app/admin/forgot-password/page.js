'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to send reset email')
      }

      setSuccess('Password reset instructions have been sent to your email address.')
      setEmail('')
      
    } catch (error) {
      setError(error.message || 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
    if (success) setSuccess('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Forgot Password</h1>
            <p className="text-gray-400">Enter your email to receive reset instructions</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300 text-sm">{success}</span>
              </div>
              <p className="text-green-400 text-xs mt-2">
                Check your spam folder if you don't see the email within a few minutes.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          {!success ? (
            <>
              {/* Reset Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Reset Instructions</span>
                  )}
                </Button>
              </form>

              {/* Instructions */}
              <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Instructions:</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Enter the email address associated with your account</li>
                  <li>• Click "Send Reset Instructions"</li>
                  <li>• Check your email for a reset link</li>
                  <li>• Follow the link to create a new password</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                We've sent password reset instructions to your email address.
              </p>
              <Button
                onClick={() => {
                  setSuccess('')
                  setEmail('')
                }}
                variant="outline"
                className="mb-4"
              >
                Send Another Email
              </Button>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link 
              href="/admin/login" 
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors inline-flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Still having trouble?{' '}
              <a 
                href="mailto:support@yoursite.com" 
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}