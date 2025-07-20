import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Bot, ArrowLeft, Shield } from 'lucide-react'
import { adminLogin } from '../api'

const AdminLogin = ({ onAdminLogin }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    if (apiError) setApiError('')
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    if (!validateForm()) {
      return
    }
    setIsLoading(true)
    try {
      const data = await adminLogin({
        email: formData.email,
        password: formData.password
      })
      // Save admin token and user type to localStorage
      localStorage.setItem('admin_token', data.access_token)
      localStorage.setItem('user_type', data.user_type)
      localStorage.setItem('isAdmin', 'true')
      localStorage.setItem('admin_email', formData.email)
      setIsLoading(false)
      onAdminLogin()
      navigate('/admin/dashboard')
    } catch (err) {
      setIsLoading(false)
      setApiError(err.message || 'Admin login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-cyan-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Admin Login Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/logo/logo.png" 
                  alt="AI Chronicle Admin Logo" 
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-300">Sign in to AI Chronicle Admin Panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {apiError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-2 text-sm mb-2">
                {apiError}
              </div>
            )}
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-white/20 focus:border-cyan-500 focus:ring-cyan-500/50'
                }`}
                placeholder="admin@aicnews.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 pr-12 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-white/20 focus:border-cyan-500 focus:ring-cyan-500/50'
                  }`}
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-4 py-3">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-cyan-400 font-medium text-sm">Admin Access Only</p>
                  <p className="text-cyan-300 text-xs mt-1">This login is restricted to authorized administrators only.</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:from-cyan-600 hover:to-cyan-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Accessing Admin Panel...
                </div>
              ) : (
                'Access Admin Panel'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Regular User Login Link */}
          <div className="text-center">
            <p className="text-gray-300">
              Regular user?{' '}
              <Link 
                to="/login" 
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin 