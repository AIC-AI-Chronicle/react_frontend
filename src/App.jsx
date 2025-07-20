import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import NewsDetail from './pages/NewsDetail'
import Profile from './pages/Profile'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLogin from './pages/adminlogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminNews from './pages/AdminNews'
import AdminUsers from './pages/AdminUsers'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  // Check authentication status on app load
  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token')
    const userToken = localStorage.getItem('access_token')
    const isAdminUser = localStorage.getItem('isAdmin')
    
    if (adminToken && isAdminUser === 'true') {
      setIsAuthenticated(true)
      setIsAdmin(true)
    } else if (userToken) {
      setIsAuthenticated(true)
      setIsAdmin(false)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    setIsAdmin(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsAdmin(false)
    localStorage.removeItem('access_token')
    localStorage.removeItem('admin_token')
    localStorage.removeItem('user_type')
    localStorage.removeItem('isAdmin')
  }

  const handleAdminLogin = () => {
    setIsAuthenticated(true)
    setIsAdmin(true)
  }

  return (
    <Router>
      <div className="h-screen bg-primary-bg overflow-hidden">
        {isAuthenticated ? (
          <>
            <Header onLogout={handleLogout} isAdmin={isAdmin} />
            <div className="h-[calc(100vh-80px)]">
              {/* Main Content - Full width without sidebar */}
              <main className="h-full overflow-y-auto scrollbar-thin">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                  <Routes>
                    {isAdmin ? (
                      // Admin routes
                      <>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                        <Route path="/admin/news" element={<AdminNews />} />
                        <Route path="/admin/analytics" element={<div className="text-white text-center py-20"><h1 className="text-3xl font-bold mb-4">Admin Analytics</h1><p>Analytics panel coming soon!</p></div>} />
                        <Route path="/admin/settings" element={<div className="text-white text-center py-20"><h1 className="text-3xl font-bold mb-4">Admin Settings</h1><p>Settings panel coming soon!</p></div>} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                      </>
                    ) : (
                    
                      <>
                        <Route path="/" element={<Home />} />
                        <Route path="/news/:id" element={<NewsDetail />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </>
                    )}
                  </Routes>
                </div>
              </main>
            </div>
          </>
        ) : (
          <div className="h-full overflow-y-auto">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
              <Route path="/admin/login" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
