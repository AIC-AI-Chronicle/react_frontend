import { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  Edit, 
  Trash2, 
  UserPlus, 
  Shield, 
  User, 
  Calendar, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Users, 
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Copy,
  Settings,
  Lock,
  Unlock,
  Crown,
  UserCheck,
  UserX
} from 'lucide-react'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [expandedUsers, setExpandedUsers] = useState(new Set())
  const [togglingUsers, setTogglingUsers] = useState(new Set())
  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    regular: 0,
    active: 0,
    inactive: 0
  })

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    
    try {
      const adminToken = localStorage.getItem('admin_token')
      if (!adminToken) {
        throw new Error('Admin token not found')
      }

      const response = await fetch('https://aic-backend.azurewebsites.net/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setUsers(data)
      
      // Calculate stats
      const adminCount = data.filter(user => user.is_admin).length
      const regularCount = data.filter(user => !user.is_admin).length
      const activeCount = data.filter(user => user.is_active).length
      const inactiveCount = data.filter(user => !user.is_active).length

      setStats({
        total: data.length,
        admins: adminCount,
        regular: regularCount,
        active: activeCount,
        inactive: inactiveCount
      })

    } catch (err) {
      setError(err.message || 'Failed to fetch users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchUsers()
  }, [])

  // Toggle user expansion
  const toggleUser = (userId) => {
    setExpandedUsers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  // Toggle user active status
  const toggleUserActive = async (userId, currentStatus) => {
    setTogglingUsers(prev => new Set(prev).add(userId))
    setError('')
    
    try {
      const adminToken = localStorage.getItem('admin_token')
      if (!adminToken) {
        throw new Error('Admin token not found')
      }

      const response = await fetch(`https://aic-backend.azurewebsites.net/admin/users/${userId}/toggle-active`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Update the user's active status in the local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, is_active: !user.is_active }
            : user
        )
      )
      
      // Update stats
      setStats(prevStats => ({
        ...prevStats,
        active: currentStatus ? prevStats.active - 1 : prevStats.active + 1,
        inactive: currentStatus ? prevStats.inactive + 1 : prevStats.inactive - 1
      }))

      console.log('Toggle response:', data.message)
      
    } catch (err) {
      setError(err.message || 'Failed to toggle user status')
      console.error('Error toggling user status:', err)
    } finally {
      setTogglingUsers(prev => {
        const newSet = new Set(prev)
        newSet.delete(userId)
        return newSet
      })
    }
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  // Get role badge
  const getRoleBadge = (isAdmin) => {
    if (isAdmin) {
      return (
        <span className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Crown size={12} />
          Admin
        </span>
      )
    }
    return (
      <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
        <User size={12} />
        User
      </span>
    )
  }

  // Get status badge
  const getStatusBadge = (isActive) => {
    if (isActive) {
      return (
        <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <UserCheck size={12} />
          Active
        </span>
      )
    }
    return (
      <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
        <UserX size={12} />
        Inactive
      </span>
    )
  }

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = filterRole === 'all' ||
                       (filterRole === 'admin' && user.is_admin) ||
                       (filterRole === 'user' && !user.is_admin)
    
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'active' && user.is_active) ||
                         (filterStatus === 'inactive' && !user.is_active)
    
    return matchesSearch && matchesRole && matchesStatus
  })

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'created_at':
        aValue = new Date(a.created_at)
        bValue = new Date(b.created_at)
        break
      case 'email':
        aValue = a.email?.toLowerCase()
        bValue = b.email?.toLowerCase()
        break
      case 'full_name':
        aValue = a.full_name?.toLowerCase()
        bValue = b.full_name?.toLowerCase()
        break
      case 'id':
        aValue = a.id
        bValue = b.id
        break
      default:
        aValue = a[sortBy]
        bValue = b[sortBy]
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">User Management</h1>
          <p className="text-text-secondary">Manage and monitor user accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-primary-bg rounded-lg font-semibold hover:bg-accent-blue transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-300">
            <UserPlus size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Total Users</p>
              <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Crown className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Admins</p>
              <p className="text-2xl font-bold text-text-primary">{stats.admins}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Regular Users</p>
              <p className="text-2xl font-bold text-text-primary">{stats.regular}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Active</p>
              <p className="text-2xl font-bold text-text-primary">{stats.active}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <UserX className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Inactive</p>
              <p className="text-2xl font-bold text-text-primary">{stats.inactive}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-primary-secondary border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-cyan w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Role Filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 bg-primary-secondary border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-cyan"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="user">Regular Users</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-primary-secondary border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-cyan"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-primary-secondary border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-cyan"
            >
              <option value="created_at">Created Date</option>
              <option value="email">Email</option>
              <option value="full_name">Name</option>
              <option value="id">ID</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 bg-primary-secondary border border-border rounded-lg text-text-secondary hover:text-accent-cyan transition-all duration-300"
            >
              {sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card border-l-4 border-l-red-500 bg-red-500/5">
          <div className="flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="space-y-4">
        {loading ? (
          <div className="card">
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-accent-cyan animate-spin" />
              <span className="ml-3 text-text-secondary">Loading users...</span>
            </div>
          </div>
        ) : sortedUsers.length === 0 ? (
          <div className="card">
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary">No users found</p>
            </div>
          </div>
        ) : (
          sortedUsers.map((user) => (
            <div key={user.id} className="card">
              <div className="space-y-4">
                {/* User Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-accent-cyan/10 text-accent-cyan px-2 py-1 rounded-full text-xs font-medium">
                        ID: {user.id}
                      </span>
                      {getRoleBadge(user.is_admin)}
                      {getStatusBadge(user.is_active)}
                    </div>
                    
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                      {user.full_name}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Joined: {formatDate(user.created_at)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleUser(user.id)}
                      className="p-2 bg-primary-secondary rounded-lg text-text-secondary hover:text-accent-cyan transition-all duration-300"
                    >
                      {expandedUsers.has(user.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <Eye size={14} />
                    View Profile
                  </button>
                  
                  <button className="flex items-center gap-2 px-3 py-1 bg-primary-secondary text-text-secondary rounded-lg text-sm hover:bg-accent-cyan/10 hover:text-accent-cyan transition-all duration-300">
                    <Edit size={14} />
                    Edit
                  </button>
                  
                  <button
                    onClick={() => copyToClipboard(user.email)}
                    className="flex items-center gap-2 px-3 py-1 bg-primary-secondary text-text-secondary rounded-lg text-sm hover:bg-accent-cyan/10 hover:text-accent-cyan transition-all duration-300"
                  >
                    <Copy size={14} />
                    Copy Email
                  </button>
                  
                  {user.is_active ? (
                    <button 
                      onClick={() => toggleUserActive(user.id, true)}
                      disabled={togglingUsers.has(user.id)}
                      className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-lg text-sm hover:bg-orange-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {togglingUsers.has(user.id) ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <Lock size={14} />
                      )}
                      {togglingUsers.has(user.id) ? 'Deactivating...' : 'Deactivate'}
                    </button>
                  ) : (
                    <button 
                      onClick={() => toggleUserActive(user.id, false)}
                      disabled={togglingUsers.has(user.id)}
                      className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-sm hover:bg-green-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {togglingUsers.has(user.id) ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <Unlock size={14} />
                      )}
                      {togglingUsers.has(user.id) ? 'Activating...' : 'Activate'}
                    </button>
                  )}
                  
                  {!user.is_admin ? (
                    <button className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-sm hover:bg-purple-500 hover:text-white transition-all duration-300">
                      <Crown size={14} />
                      Make Admin
                    </button>
                  ) : (
                    <button className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-lg text-sm hover:bg-orange-500 hover:text-white transition-all duration-300">
                      <User size={14} />
                      Remove Admin
                    </button>
                  )}
                  
                  <button className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-all duration-300">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedUsers.has(user.id) && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    {/* User Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                          <User size={14} />
                          User Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-text-muted">Full Name:</span>
                            <span className="text-text-primary ml-2">{user.full_name}</span>
                          </div>
                          <div>
                            <span className="text-text-muted">Email:</span>
                            <span className="text-text-primary ml-2">{user.email}</span>
                          </div>
                          <div>
                            <span className="text-text-muted">User ID:</span>
                            <span className="text-text-primary ml-2 font-mono">{user.id}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                          <Settings size={14} />
                          Account Status
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-text-muted">Role:</span>
                            <span className="ml-2">{user.is_admin ? 'Administrator' : 'Regular User'}</span>
                          </div>
                          <div>
                            <span className="text-text-muted">Status:</span>
                            <span className="ml-2">{user.is_active ? 'Active' : 'Inactive'}</span>
                          </div>
                          <div>
                            <span className="text-text-muted">Member Since:</span>
                            <span className="text-text-primary ml-2">{formatDate(user.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Actions */}
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-2">Account Actions</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300">
                          <Mail size={14} />
                          Send Email
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-orange-500/10 text-orange-400 rounded-lg text-sm hover:bg-orange-500 hover:text-white transition-all duration-300">
                          <Lock size={14} />
                          Reset Password
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 text-purple-400 rounded-lg text-sm hover:bg-purple-500 hover:text-white transition-all duration-300">
                          <Shield size={14} />
                          Security Log
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-gray-500/10 text-gray-400 rounded-lg text-sm hover:bg-gray-500 hover:text-white transition-all duration-300">
                          <Settings size={14} />
                          Preferences
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Info */}
      {sortedUsers.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>Showing {sortedUsers.length} of {users.length} users</span>
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers 