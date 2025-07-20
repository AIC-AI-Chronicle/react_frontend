import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import NewsDetail from './pages/NewsDetail'
import Profile from './pages/Profile'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLogin from './pages/adminlogin'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

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
                    <Route path="/" element={<Home />} />
                    <Route path="/news/:id" element={<NewsDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin/dashboard" element={<div className="text-white text-center py-20"><h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1><p>Welcome to the admin panel!</p></div>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
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
