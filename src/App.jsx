import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import NewsDetail from './pages/NewsDetail'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <div className="min-h-screen bg-primary-bg">
        {isAuthenticated ? (
          <>
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />
            <div className="flex h-[calc(100vh-80px)]">
              {/* Sidebar - Always visible on desktop, overlay on mobile */}
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              
              {/* Main Content */}
              <main className="flex-1 overflow-y-auto scrollbar-thin">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news/:id" element={<NewsDetail />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </main>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App
