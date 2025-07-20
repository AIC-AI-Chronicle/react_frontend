import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, User, Bot, Database, LogOut, Settings } from 'lucide-react'

const Header = ({ onLogout, isAdmin }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }

  const handleLogout = () => {
    setShowProfileDropdown(false)
    onLogout()
  }

  return (
    <header className="bg-primary-secondary/95 backdrop-blur-custom border-b border-border sticky top-0 z-50 h-20 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Link to="/" className="no-underline flex items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/logo/logo.png" 
                alt="AI Chronicle Logo" 
                className="w-12 h-12 rounded-lg object-cover shadow-lg border-2 border-accent-cyan/20"
              />
              <div className="hidden sm:block">
                <div className="text-sm text-accent-cyan font-medium">
                  AI Chronicle {isAdmin && <span className="text-red-400">Admin</span>}
                </div>
                <div className="text-xs text-text-muted">
                  {isAdmin ? 'Administrator Panel' : 'Powered by AI'}
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex gap-8 items-center">
          {isAdmin ? (
            <>
              <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/admin/users" className="nav-link">Users</Link>
              <Link to="/admin/news" className="nav-link">News</Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/latest" className="nav-link">Latest</Link>
              <Link to="/trending" className="nav-link">Trending</Link>
              <Link to="/categories" className="nav-link">Categories</Link>
              <Link to="/about" className="nav-link">About</Link>
            </>
          )}
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search size={20} className="absolute left-3 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder={isAdmin ? "Search admin panel..." : "Search news..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-primary-card border border-border rounded-lg py-2.5 pl-10 pr-3 text-text-primary text-sm w-64 transition-all duration-300 focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] placeholder:text-text-muted"
            />
          </div>
          
          <div className="flex gap-2">
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={handleProfileClick}
                className="bg-transparent border border-border text-text-secondary p-2 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-accent-cyan/10 hover:border-accent-cyan hover:text-accent-cyan"
              >
                <User size={20} />
              </button>
              
              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileDropdown(false)}
                  ></div>
                  
                  {/* Dropdown Content */}
                  <div className="absolute right-0 top-12 w-48 bg-primary-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="p-2">
                      <Link 
                        to="/profile"
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center gap-3 w-full px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-accent-cyan/10 rounded-lg transition-all duration-300"
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </Link>
                      
                      <Link 
                        to="/settings"
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center gap-3 w-full px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-accent-cyan/10 rounded-lg transition-all duration-300"
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </Link>
                      
                      <div className="border-t border-border my-1"></div>
                      
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 