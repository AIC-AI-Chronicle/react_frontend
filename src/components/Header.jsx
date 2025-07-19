import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, Bell, User, Bot, Database } from 'lucide-react'

const Header = ({ onMenuClick, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-primary-secondary/95 backdrop-blur-custom border-b border-border sticky top-0 z-50 h-20 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <button 
            className="bg-transparent border-none text-text-primary cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-accent-cyan/10 hover:text-accent-cyan lg:hidden"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="no-underline flex items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/logo/logo.jpeg" 
                alt="AI Chronicle Logo" 
                className="w-12 h-12 rounded-lg object-cover shadow-lg border-2 border-accent-cyan/20"
              />
              <div className="hidden sm:block">
                <div className="text-sm text-accent-cyan font-medium">AI Chronicle</div>
                <div className="text-xs text-text-muted">Powered by AI</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex gap-8 items-center">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/latest" className="nav-link">Latest</Link>
          <Link to="/trending" className="nav-link">Trending</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
          <Link to="/about" className="nav-link">About</Link>
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search size={20} className="absolute left-3 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search AI news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-primary-card border border-border rounded-lg py-2.5 pl-10 pr-3 text-text-primary text-sm w-64 transition-all duration-300 focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] placeholder:text-text-muted"
            />
          </div>
          
          <div className="flex gap-2">
            <button className="bg-transparent border border-border text-text-secondary p-2 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-accent-cyan/10 hover:border-accent-cyan hover:text-accent-cyan">
              <Bell size={20} />
            </button>
            <button 
              onClick={onLogout}
              className="bg-transparent border border-border text-text-secondary p-2 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-accent-cyan/10 hover:border-accent-cyan hover:text-accent-cyan"
            >
              <User size={20} />
            </button>
            <button className="bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan p-2 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-accent-cyan hover:text-primary-bg">
              <Database size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 