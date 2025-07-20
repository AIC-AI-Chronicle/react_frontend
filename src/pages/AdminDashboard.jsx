import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  Play, 
  Square, 
  Bot, 
  Users, 
  Newspaper, 
  BarChart3, 
  Settings, 
  Activity, 
  MessageSquare, 
  Globe, 
  Database, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Zap,
  RefreshCw,
  Wifi,
  WifiOff,
  FileText,
  Server
} from 'lucide-react'

const AdminDashboard = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [serverLogs, setServerLogs] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalArticles: 3456,
    activeConnections: 0,
    systemHealth: 'Excellent',
    lastUpdate: new Date().toLocaleTimeString()
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [systemStatus, setSystemStatus] = useState('idle')
  const [pingCount, setPingCount] = useState(0)
  const [logCount, setLogCount] = useState(0)
  const wsRef = useRef(null)
  const reconnectTimeoutRef = useRef(null)
  const pingIntervalRef = useRef(null)

  // WebSocket connection function
  const connectWebSocket = () => {
    setIsConnecting(true)
    setSystemStatus('connecting')
    
    try {
      // Azure-hosted backend WebSocket URL
      const wsUrl = 'wss://aic-backend.azurewebsites.net/ws/admin'
      wsRef.current = new WebSocket(wsUrl)

      wsRef.current.onopen = () => {
        console.log('WebSocket connected to AIC News Agency')
        setIsConnected(true)
        setIsConnecting(false)
        setSystemStatus('connected')
        addServerLog('INFO', 'WebSocket connection established to AIC News Agency server', 'success')
        
        // Start ping interval to keep connection alive
        startPingInterval()
      }

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          handleWebSocketMessage(data)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
          addServerLog('ERROR', 'Failed to parse message from server', 'error')
        }
      }

      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason)
        setIsConnected(false)
        setIsConnecting(false)
        setSystemStatus('disconnected')
        addServerLog('WARNING', `WebSocket connection lost (Code: ${event.code})`, 'warning')
        
        // Stop ping interval
        stopPingInterval()
        
        // Attempt to reconnect after 5 seconds
        if (event.code !== 1000) { // Don't reconnect if closed normally
          reconnectTimeoutRef.current = setTimeout(() => {
            if (!isConnected) {
              addServerLog('INFO', 'Attempting to reconnect to server...', 'info')
              connectWebSocket()
            }
          }, 5000)
        }
      }

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
        setIsConnecting(false)
        setSystemStatus('error')
        addServerLog('ERROR', 'WebSocket connection error occurred', 'error')
        stopPingInterval()
      }
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
      setIsConnecting(false)
      setSystemStatus('error')
      addServerLog('ERROR', 'Failed to establish WebSocket connection', 'error')
    }
  }

  // Start ping interval
  const startPingInterval = () => {
    pingIntervalRef.current = setInterval(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        // Send a ping message to keep connection alive
        const pingMessage = {
          type: 'ping',
          timestamp: new Date().toISOString()
        }
        wsRef.current.send(JSON.stringify(pingMessage))
      }
    }, 25000) // Send ping every 25 seconds (before 30s timeout)
  }

  // Stop ping interval
  const stopPingInterval = () => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current)
      pingIntervalRef.current = null
    }
  }

  // Disconnect WebSocket
  const disconnectWebSocket = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    
    if (wsRef.current) {
      wsRef.current.close(1000, 'Admin initiated disconnect')
      wsRef.current = null
    }
    setIsConnected(false)
    setSystemStatus('disconnected')
    addServerLog('INFO', 'WebSocket connection terminated by admin', 'info')
    stopPingInterval()
  }

  // Handle incoming WebSocket messages
  const handleWebSocketMessage = (data) => {
    const { agent, message, timestamp, data: messageData } = data
    
    // Handle ping messages from server
    if (message === 'ping') {
      setPingCount(prev => prev + 1)
      addServerLog('DEBUG', 'Server ping received - connection healthy', 'ping')
      return
    }
    
    // Add server log entry
    addServerLog(agent, message, 'received')
    
    // Update stats if data is provided
    if (messageData) {
      if (messageData.connected !== undefined) {
        setStats(prev => ({
          ...prev,
          activeConnections: messageData.connected ? prev.activeConnections + 1 : prev.activeConnections - 1,
          lastUpdate: new Date().toLocaleTimeString()
        }))
      }
      
      // Handle other data updates
      if (messageData.users) {
        setStats(prev => ({ ...prev, totalUsers: messageData.users }))
        addServerLog('INFO', `User count updated: ${messageData.users}`, 'info')
      }
      if (messageData.articles) {
        setStats(prev => ({ ...prev, totalArticles: messageData.articles }))
        addServerLog('INFO', `Article count updated: ${messageData.articles}`, 'info')
      }
      if (messageData.systemHealth) {
        setStats(prev => ({ ...prev, systemHealth: messageData.systemHealth }))
        addServerLog('INFO', `System health updated: ${messageData.systemHealth}`, 'info')
      }
    }
    
    // Add to recent activity
    addRecentActivity(agent, message)
  }

  // Add server log entry
  const addServerLog = (level, message, type = 'info') => {
    const newLog = {
      id: Date.now(),
      level,
      message,
      timestamp: new Date().toLocaleTimeString(),
      type,
      date: new Date().toLocaleDateString()
    }
    setServerLogs(prev => [newLog, ...prev.slice(0, 99)]) // Keep last 100 logs
    setLogCount(prev => prev + 1)
  }

  // Add recent activity
  const addRecentActivity = (agent, action) => {
    const activity = {
      id: Date.now(),
      agent,
      action,
      timestamp: new Date().toLocaleTimeString(),
      type: 'activity'
    }
    setRecentActivity(prev => [activity, ...prev.slice(0, 9)]) // Keep last 10 activities
  }

  // Clear server logs
  const clearLogs = () => {
    setServerLogs([])
    setLogCount(0)
    addServerLog('INFO', 'Server logs cleared by admin', 'info')
  }

  // Get log level color
  const getLogLevelColor = (level) => {
    switch (level.toUpperCase()) {
      case 'ERROR':
        return 'text-red-400 bg-red-500/10 border-red-500/20'
      case 'WARNING':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'INFO':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      case 'DEBUG':
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20'
      case 'SUCCESS':
        return 'text-green-400 bg-green-500/10 border-green-500/20'
      default:
        return 'text-text-secondary bg-primary-secondary'
    }
  }

  // Get log level icon
  const getLogLevelIcon = (level) => {
    switch (level.toUpperCase()) {
      case 'ERROR':
        return <AlertTriangle size={14} />
      case 'WARNING':
        return <AlertTriangle size={14} />
      case 'INFO':
        return <FileText size={14} />
      case 'DEBUG':
        return <Server size={14} />
      case 'SUCCESS':
        return <CheckCircle size={14} />
      default:
        return <FileText size={14} />
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-primary-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary">AI Chronicle Administration Panel</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isConnected 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
              <span className="text-sm font-medium">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <button
              onClick={isConnected ? disconnectWebSocket : connectWebSocket}
              disabled={isConnecting}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isConnected
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-accent-cyan text-primary-bg hover:bg-accent-blue'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isConnecting ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Connecting...
                </>
              ) : isConnected ? (
                <>
                  <Square size={16} />
                  Stop Connection
                </>
              ) : (
                <>
                  <Play size={16} />
                  Start Connection
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Total Users</p>
                <p className="text-2xl font-bold text-text-primary">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Total Articles</p>
                <p className="text-2xl font-bold text-text-primary">{stats.totalArticles.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Newspaper className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Active Connections</p>
                <p className="text-2xl font-bold text-text-primary">{stats.activeConnections}</p>
              </div>
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-accent-cyan" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">System Health</p>
                <p className="text-2xl font-bold text-text-primary">{stats.systemHealth}</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Server Logs */}
          <div className="lg:col-span-2">
            <div className="card h-96">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-text-primary">News Agency Logs</h2>
                  <span className="px-2 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full text-xs font-medium">
                    {logCount} entries
                  </span>
                </div>
                <button
                  onClick={clearLogs}
                  className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <FileText size={14} />
                  Clear Logs
                </button>
              </div>
              
              <div className="h-80 overflow-y-auto space-y-2 scrollbar-thin">
                {serverLogs.length === 0 ? (
                  <div className="text-center text-text-muted py-8">
                    <Server className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No server logs yet. Start the connection to begin monitoring.</p>
                  </div>
                ) : (
                  serverLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 bg-primary-secondary rounded-lg border border-border">
                      <div className={`p-2 rounded-lg border ${getLogLevelColor(log.level)}`}>
                        {getLogLevelIcon(log.level)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${getLogLevelColor(log.level)}`}>
                            {log.level}
                          </span>
                          <span className="text-xs text-text-muted">{log.timestamp}</span>
                        </div>
                        <p className="text-sm text-text-primary">{log.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="card h-96">
              <h2 className="text-xl font-bold text-text-primary mb-4">Recent Activity</h2>
              <div className="space-y-3 overflow-y-auto h-80 scrollbar-thin">
                {recentActivity.length === 0 ? (
                  <div className="text-center text-text-muted py-8">
                    <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                ) : (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-primary-secondary rounded-lg">
                      <div className="p-2 bg-accent-cyan/10 rounded-lg">
                        <Bot className="w-4 h-4 text-accent-cyan" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{activity.agent}</p>
                        <p className="text-xs text-text-secondary">{activity.action}</p>
                        <p className="text-xs text-text-muted mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-bold text-text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/admin/users" className="flex items-center gap-3 p-4 bg-primary-secondary rounded-lg hover:bg-accent-cyan/10 transition-all duration-300 group">
              <Users className="w-6 h-6 text-accent-cyan group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="font-medium text-text-primary">Manage Users</p>
                <p className="text-sm text-text-muted">User administration</p>
              </div>
            </Link>
            
            <Link to="/admin/news" className="flex items-center gap-3 p-4 bg-primary-secondary rounded-lg hover:bg-accent-cyan/10 transition-all duration-300 group">
              <Newspaper className="w-6 h-6 text-accent-cyan group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="font-medium text-text-primary">Manage News</p>
                <p className="text-sm text-text-muted">Content management</p>
              </div>
            </Link>
            
            <Link to="/admin/analytics" className="flex items-center gap-3 p-4 bg-primary-secondary rounded-lg hover:bg-accent-cyan/10 transition-all duration-300 group">
              <BarChart3 className="w-6 h-6 text-accent-cyan group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="font-medium text-text-primary">Analytics</p>
                <p className="text-sm text-text-muted">View statistics</p>
              </div>
            </Link>
            
            <Link to="/admin/settings" className="flex items-center gap-3 p-4 bg-primary-secondary rounded-lg hover:bg-accent-cyan/10 transition-all duration-300 group">
              <Settings className="w-6 h-6 text-accent-cyan group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="font-medium text-text-primary">Settings</p>
                <p className="text-sm text-text-muted">System configuration</p>
              </div>
            </Link>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-bold text-text-primary mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">WebSocket Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  systemStatus === 'connected' 
                    ? 'bg-green-500/10 text-green-400' 
                    : systemStatus === 'connecting'
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Last Update</span>
                <span className="text-text-primary text-sm">{stats.lastUpdate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Ping Count</span>
                <span className="text-text-primary text-sm">{pingCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Log Entries</span>
                <span className="text-text-primary text-sm">{logCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Connection Type</span>
                <span className="text-text-primary text-sm">WebSocket</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-bold text-text-primary mb-4">Connection Info</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Server URL</span>
                <span className="text-text-primary text-sm">wss://aic-backend.azurewebsites.net</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Endpoint</span>
                <span className="text-text-primary text-sm">/ws/admin</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Protocol</span>
                <span className="text-text-primary text-sm">WebSocket</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Auto Reconnect</span>
                <span className="text-text-primary text-sm">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard 