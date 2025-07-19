import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import NewsDetail from './pages/NewsDetail'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-primary-bg">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex h-[calc(100vh-80px)]">
          {/* Sidebar - Always visible on desktop, overlay on mobile */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="max-w-7xl mx-auto p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news/:id" element={<NewsDetail />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
