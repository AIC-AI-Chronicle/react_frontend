import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, User, Mail, Calendar, Shield, CheckCircle, XCircle, Edit, Settings } from 'lucide-react'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('access_token') || localStorage.getItem('admin_token')
      
      if (!token) {
        setError('No authentication token found')
        setLoading(false)
        return
      }

      const response = await fetch('https://aic-backend.azurewebsites.net/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      setProfile(data)
    } catch (err) {
      setError(err.message || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-blue transition-colors duration-300"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <div className="card text-center">
          <div className="p-8">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">Error Loading Profile</h2>
            <p className="text-text-secondary mb-6">{error}</p>
            <button 
              onClick={fetchProfile}
              className="bg-accent-cyan text-primary-bg px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-accent-blue"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-blue transition-colors duration-300"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <div className="card text-center">
          <div className="p-8">
            <User className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">No Profile Found</h2>
            <p className="text-text-secondary">Unable to load your profile information.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Back Button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-blue transition-colors duration-300"
      >
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      {/* Profile Header */}
      <div className="card">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            {profile.is_admin && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-text-primary mb-2">{profile.full_name}</h1>
            <p className="text-text-secondary text-lg">{profile.email}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                profile.is_active 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {profile.is_active ? <CheckCircle size={14} /> : <XCircle size={14} />}
                {profile.is_active ? 'Active' : 'Inactive'}
              </span>
              {profile.is_admin && (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-red-500/20 text-red-400">
                  <Shield size={14} />
                  Administrator
                </span>
              )}
            </div>
          </div>
          <button className="bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan p-3 rounded-lg transition-all duration-300 hover:bg-accent-cyan hover:text-primary-bg">
            <Edit size={20} />
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-accent-cyan" />
            <h2 className="text-xl font-bold text-text-primary">Personal Information</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-text-muted" />
                <span className="text-text-secondary">Email</span>
              </div>
              <span className="text-text-primary font-medium">{profile.email}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-primary-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-text-muted" />
                <span className="text-text-secondary">Full Name</span>
              </div>
              <span className="text-text-primary font-medium">{profile.full_name}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-primary-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-text-muted" />
                <span className="text-text-secondary">Member Since</span>
              </div>
              <span className="text-text-primary font-medium">{formatDate(profile.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-accent-cyan" />
            <h2 className="text-xl font-bold text-text-primary">Account Status</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary-secondary rounded-lg">
              <span className="text-text-secondary">User ID</span>
              <span className="text-text-primary font-medium">#{profile.id}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-primary-secondary rounded-lg">
              <span className="text-text-secondary">Account Status</span>
              <span className={`font-medium ${
                profile.is_active ? 'text-green-400' : 'text-red-400'
              }`}>
                {profile.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-primary-secondary rounded-lg">
              <span className="text-text-secondary">Role</span>
              <span className={`font-medium ${
                profile.is_admin ? 'text-red-400' : 'text-accent-cyan'
              }`}>
                {profile.is_admin ? 'Administrator' : 'Regular User'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold text-text-primary mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-primary-secondary rounded-lg transition-all duration-300 hover:bg-accent-cyan/10 hover:border-accent-cyan/20 border border-transparent">
            <Edit className="w-5 h-5 text-accent-cyan" />
            <span className="text-text-primary font-medium">Edit Profile</span>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-primary-secondary rounded-lg transition-all duration-300 hover:bg-accent-cyan/10 hover:border-accent-cyan/20 border border-transparent">
            <Settings className="w-5 h-5 text-accent-cyan" />
            <span className="text-text-primary font-medium">Account Settings</span>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-primary-secondary rounded-lg transition-all duration-300 hover:bg-accent-cyan/10 hover:border-accent-cyan/20 border border-transparent">
            <Shield className="w-5 h-5 text-accent-cyan" />
            <span className="text-text-primary font-medium">Security</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile 