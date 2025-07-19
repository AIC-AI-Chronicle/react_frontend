import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, Bell, User } from 'lucide-react'

const Header = ({ onMenuClick }) => {
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
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Hexagon Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-blue clip-path-hexagon animate-rotate-slow"></div>
              <div className="absolute inset-0 w-[90%] h-[90%] bg-primary-card clip-path-hexagon"></div>
              
              {/* Logo Content */}
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                <span className="text-lg font-extrabold text-text-primary tracking-wider">AiC</span>
                <div className="text-xs font-semibold text-text-primary tracking-wider mt-0.5">AI CHRONICLE</div>
                
                {/* Circuit Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute w-0.5 h-4 bg-accent-cyan rounded opacity-70 top-4 left-5 rotate-45"></div>
                  <div className="absolute w-0.5 h-3 bg-accent-cyan rounded opacity-70 top-6 right-4 -rotate-30"></div>
                  <div className="absolute w-0.5 h-2.5 bg-accent-cyan rounded opacity-70 bottom-5 left-7 rotate-60"></div>
                  
                  {/* Circuit Nodes */}
                  <div className="absolute w-1 h-1 bg-accent-cyan rounded-full animate-pulse-glow top-5 left-6"></div>
                  <div className="absolute w-1 h-1 bg-accent-cyan rounded-full animate-pulse-glow top-7 right-5" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute w-1 h-1 bg-accent-cyan rounded-full animate-pulse-glow bottom-6 left-9" style={{animationDelay: '1s'}}></div>
                </div>
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
            <button className="bg-transparent border border-border text-text-secondary p-2 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-accent-cyan/10 hover:border-accent-cyan hover:text-accent-cyan">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 