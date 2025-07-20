import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Settings, 
  Users, 
  BarChart3, 
  FileText, 
  Database, 
  Shield, 
  LogOut,
  TrendingUp,
  Activity,
  Globe
} from 'lucide-react'

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is authenticated
    const adminToken = localStorage.getItem('admin_token')
    const isAdmin = localStorage.getItem('isAdmin')
    
    if (!adminToken || isAdmin !== 'true') {
      navigate('/admin/login')
      return
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('user_type')
    localStorage.removeItem('isAdmin')
    onLogout()
    navigate('/')
  }

  const stats = [
    { label: "Total Articles", value: "1,247", icon: FileText, color: "from-blue-500 to-blue-600" },
    { label: "Active Users", value: "8,932", icon: Users, color: "from-green-500 to-green-600" },
    { label: "Data Sources", value: "156", icon: Database, color: "from-purple-500 to-purple-600" },
    { label: "System Uptime", value: "99.9%", icon: Shield, color: "from-orange-500 to-orange-600" }
  ]

  const quickActions = [
    { title: "Manage Content", icon: FileText, color: "bg-blue-500", action: () => console.log("Manage Content") },
    { title: "User Management", icon: Users, color: "bg-green-500", action: () => console.log("User Management") },
    { title: "Analytics", icon: BarChart3, color: "bg-purple-500", action: () => console.log("Analytics") },
    { title: "System Settings", icon: Settings, color: "bg-orange-500", action: () => console.log("System Settings") }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Admin Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/logo/logo.png" 
                alt="AI Chronicle Admin" 
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-white">AI Chronicle Admin</h1>
                <p className="text-gray-400 text-sm">Administrative Control Panel</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors duration-300"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome, Administrator</h2>
          <p className="text-gray-400">Manage your AI Chronicle platform from this central dashboard.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 text-left group"
              >
                <div className={`p-3 ${action.color} rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold">{action.title}</h4>
              </button>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">API Server</span>
                </div>
                <span className="text-green-400 text-sm">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Database</span>
                </div>
                <span className="text-green-400 text-sm">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Content Delivery</span>
                </div>
                <span className="text-green-400 text-sm">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white text-sm">New article published</p>
                  <p className="text-gray-400 text-xs">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white text-sm">User registration</p>
                  <p className="text-gray-400 text-xs">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white text-sm">Content updated</p>
                  <p className="text-gray-400 text-xs">10 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard 