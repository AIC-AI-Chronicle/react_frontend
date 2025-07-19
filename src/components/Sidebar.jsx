import { Link } from 'react-router-dom'
import { X, Home, TrendingUp, Clock, Grid, Settings, Bookmark, Zap } from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const categories = [
    { name: 'Machine Learning', icon: '🤖', count: 45 },
    { name: 'Deep Learning', icon: '🧠', count: 32 },
    { name: 'Natural Language Processing', icon: '💬', count: 28 },
    { name: 'Computer Vision', icon: '👁️', count: 23 },
    { name: 'Robotics', icon: '🤖', count: 19 },
    { name: 'AI Ethics', icon: '⚖️', count: 15 },
    { name: 'Quantum AI', icon: '⚛️', count: 12 },
    { name: 'AI Startups', icon: '🚀', count: 38 }
  ]

  const trendingTopics = [
    'GPT-5 Release',
    'AI Regulation',
    'Quantum Computing',
    'Autonomous Vehicles',
    'AI in Healthcare',
    'Neural Networks',
    'AI Safety',
    'Machine Learning'
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={`fixed lg:static top-20 lg:top-0 left-0 h-[calc(100vh-80px)] lg:h-full w-80 bg-primary-secondary border-r border-border transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <img 
                src="/logo/logo.jpeg" 
                alt="AI Chronicle Logo" 
                className="w-8 h-8 rounded-lg object-cover"
              />
              <h2 className="gradient-text text-xl font-bold">AI Chronicle</h2>
            </div>
            <button 
              className="bg-transparent border-none text-text-secondary cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-accent-cyan/10 hover:text-accent-cyan lg:hidden"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              <Link to="/" className="flex items-center gap-3 text-text-secondary no-underline p-3 rounded-lg transition-all duration-300 hover:text-text-primary hover:bg-accent-cyan/10" onClick={onClose}>
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link to="/latest" className="flex items-center gap-3 text-text-secondary no-underline p-3 rounded-lg transition-all duration-300 hover:text-text-primary hover:bg-accent-cyan/10" onClick={onClose}>
                <Clock size={20} />
                <span>Latest News</span>
              </Link>
              <Link to="/trending" className="flex items-center gap-3 text-text-secondary no-underline p-3 rounded-lg transition-all duration-300 hover:text-text-primary hover:bg-accent-cyan/10" onClick={onClose}>
                <TrendingUp size={20} />
                <span>Trending</span>
              </Link>
              <Link to="/bookmarks" className="flex items-center gap-3 text-text-secondary no-underline p-3 rounded-lg transition-all duration-300 hover:text-text-primary hover:bg-accent-cyan/10" onClick={onClose}>
                <Bookmark size={20} />
                <span>Bookmarks</span>
              </Link>
              <Link to="/categories" className="flex items-center gap-3 text-text-secondary no-underline p-3 rounded-lg transition-all duration-300 hover:text-text-primary hover:bg-accent-cyan/10" onClick={onClose}>
                <Grid size={20} />
                <span>Categories</span>
              </Link>
            </div>
          </nav>

          {/* Categories */}
          <div className="p-6 border-t border-border">
            <h3 className="flex items-center gap-2 text-text-primary font-semibold mb-4">
              <Zap size={16} />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <Link 
                  key={index} 
                  to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:bg-accent-cyan/10 hover:text-text-primary text-text-secondary no-underline"
                  onClick={onClose}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="bg-accent-cyan/20 text-accent-cyan px-2 py-1 rounded-full text-xs font-medium">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Weather Widget */}
          <div className="p-6 border-t border-border">
            <div className="bg-primary-card rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Current Weather</p>
                  <p className="text-text-primary font-semibold">25°C</p>
                  <p className="text-text-secondary text-sm">Light rain</p>
                </div>
                <div className="text-3xl">🌧️</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar 