import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Eye, Heart, Share2, TrendingUp, Zap, ArrowRight, Bot, Shield, Globe, Database, Cpu, Target, Users, BarChart3, Sparkles, Brain, MessageSquare, Rocket, Scale, Atom, Newspaper, Users2, Building2, Car, Gamepad2, Music, Camera, Briefcase, Heart as HeartIcon } from 'lucide-react'

const Home = () => {
  const [featuredNews] = useState([
    {
      id: 1,
      title: "Global Climate Summit: World Leaders Agree on Historic Carbon Reduction Targets",
      excerpt: "Representatives from 195 countries reach unprecedented agreement to reduce carbon emissions by 50% by 2030, marking a turning point in climate action.",
      category: "Politics",
      author: "Global News Team",
      date: "2 hours ago",
      readTime: "5 min read",
      views: "45.2K",
      likes: "8.7K",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Tech Giant Unveils Revolutionary Smart City Project in Singapore",
      excerpt: "A major technology company launches an ambitious smart city initiative featuring autonomous transportation and AI-powered infrastructure management.",
      category: "Technology",
      author: "Tech Chronicle",
      date: "4 hours ago",
      readTime: "7 min read",
      views: "32.8K",
      likes: "5.2K",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Breakthrough in Renewable Energy: New Solar Panel Technology Achieves 40% Efficiency",
      excerpt: "Scientists develop next-generation solar panels that could revolutionize clean energy production and reduce costs significantly.",
      category: "Science",
      author: "Science Daily",
      date: "6 hours ago",
      readTime: "4 min read",
      views: "28.1K",
      likes: "4.1K",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop"
    }
  ])

  const [latestNews] = useState([
    {
      id: 4,
      title: "Major Sports League Announces Expansion to New Markets",
      excerpt: "Professional sports league reveals plans to add four new teams, creating opportunities for millions of fans and boosting local economies.",
      category: "Sports",
      author: "Sports Central",
      date: "1 hour ago",
      readTime: "3 min read",
      views: "18.4K",
      likes: "2.8K",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Hollywood Blockbuster Breaks Box Office Records Worldwide",
      excerpt: "Latest superhero film becomes the highest-grossing movie of the year, surpassing all expectations and setting new industry standards.",
      category: "Entertainment",
      author: "Entertainment Weekly",
      date: "3 hours ago",
      readTime: "6 min read",
      views: "22.7K",
      likes: "3.9K",
      image: "https://images.unsplash.com/photo-1489599834469-0d5e8b0b0b0b?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Economic Recovery: Unemployment Rate Drops to Pre-Pandemic Levels",
      excerpt: "Latest economic data shows strong recovery with job creation exceeding expectations and consumer confidence reaching new highs.",
      category: "Business",
      author: "Business Insider",
      date: "5 hours ago",
      readTime: "8 min read",
      views: "15.3K",
      likes: "1.7K",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop"
    },
    {
      id: 7,
      title: "Healthcare Innovation: New Treatment Shows Promise for Chronic Diseases",
      excerpt: "Medical researchers announce breakthrough treatment that could help millions of patients suffering from previously untreatable conditions.",
      category: "Health",
      author: "Health News",
      date: "7 hours ago",
      readTime: "4 min read",
      views: "12.8K",
      likes: "1.6K",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop"
    },
    {
      id: 8,
      title: "Education Reform: New Digital Learning Platform Launches Nationwide",
      excerpt: "Revolutionary online education system aims to bridge the digital divide and provide quality education to students in remote areas.",
      category: "Education",
      author: "Education Today",
      date: "9 hours ago",
      readTime: "5 min read",
      views: "9.4K",
      likes: "1.2K",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop"
    }
  ])

  const [trendingNews] = useState([
    {
      id: 9,
      title: "Social Media Platform Faces Backlash Over Privacy Policy Changes",
      excerpt: "Users express concerns as major social network announces controversial updates to data collection practices.",
      category: "Technology",
      author: "Digital News",
      date: "30 minutes ago",
      readTime: "3 min read",
      views: "38.2K",
      likes: "6.1K",
      trending: true
    },
    {
      id: 10,
      title: "Environmental Activists Stage Global Protests for Climate Action",
      excerpt: "Millions of people worldwide participate in coordinated demonstrations demanding immediate action on climate change.",
      category: "Society",
      author: "Global Voice",
      date: "2 hours ago",
      readTime: "6 min read",
      views: "26.7K",
      likes: "4.8K",
      trending: true
    },
    {
      id: 11,
      title: "Space Exploration: Private Company Announces Mars Mission Timeline",
      excerpt: "Ambitious space company reveals detailed plans for human mission to Mars, targeting 2030 launch date.",
      category: "Science",
      author: "Space News",
      date: "4 hours ago",
      readTime: "7 min read",
      views: "29.1K",
      likes: "5.4K",
      trending: true
    }
  ])

  const [trendingTopics] = useState([
    "Climate Action",
    "Tech Innovation",
    "Economic Recovery",
    "Space Exploration",
    "Healthcare Breakthroughs",
    "Education Reform",
    "Social Justice",
    "Digital Privacy"
  ])

  const [categories] = useState([
    { name: "Politics", count: 156, icon: Building2, color: "from-red-400 to-red-600" },
    { name: "Technology", count: 234, icon: Cpu, color: "from-blue-400 to-blue-600" },
    { name: "Business", count: 189, icon: Briefcase, color: "from-green-400 to-green-600" },
    { name: "Sports", count: 145, icon: Gamepad2, color: "from-orange-400 to-orange-600" },
    { name: "Entertainment", count: 167, icon: Music, color: "from-purple-400 to-purple-600" },
    { name: "Health", count: 123, icon: HeartIcon, color: "from-pink-400 to-pink-600" },
    { name: "Science", count: 98, icon: Atom, color: "from-cyan-400 to-cyan-600" },
    { name: "Society", count: 201, icon: Users2, color: "from-indigo-400 to-indigo-600" }
  ])

  const [stats] = useState([
    { label: "Articles Published", value: "15,847", icon: Database },
    { label: "Global Coverage", value: "195", icon: Globe },
    { label: "Accuracy Rate", value: "99.7%", icon: Target },
    { label: "Global Readers", value: "12.5M+", icon: Users }
  ])

  return (
    <div className="space-y-12">
      {/* Hero Section - Fixed Background */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-black to-green-900 p-8 lg:p-16 text-white border border-gray-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-400/10 to-green-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Logo and Brand Section */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-8">
                <div className="relative">
                  <img 
                    src="/logo/logo.png" 
                    alt="AI Chronicle Logo" 
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover shadow-2xl border-4 border-white/20"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">AI</span>
                <span className="block bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                  Chronicle
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 text-gray-300 max-w-2xl leading-relaxed">
                Your gateway to the latest global news, innovations, and insights. 
                Stay informed with comprehensive coverage across all topics and industries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/latest" className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-lg">
                  Explore News
                  <ArrowRight size={24} />
                </Link>
                <button className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <Globe className="w-5 h-5" />
                  Live Updates
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    </div>
                    <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Explore Categories</h2>
          <p className="text-text-secondary">Discover news across different domains and topics</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="card group hover:scale-105 transition-all duration-300"
            >
              <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{category.name}</h3>
              <p className="text-text-muted text-sm">{category.count} articles</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured News */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text-primary mb-2">Featured News</h2>
            <p className="text-text-secondary">Top stories from around the world</p>
          </div>
          <Link to="/featured" className="text-accent-cyan hover:text-accent-blue transition-colors duration-300">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredNews.map((news, index) => (
            <article key={news.id} className="card group">
              {news.image && (
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent-cyan text-primary-bg px-3 py-1 rounded-full text-xs font-semibold">
                      {news.category}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-cyan transition-colors duration-300">
                  <Link to={`/news/${news.id}`}>{news.title}</Link>
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {news.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {news.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {news.views}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 hover:text-accent-cyan transition-colors duration-300">
                      <Heart size={14} />
                      {news.likes}
                    </button>
                    <button className="hover:text-accent-cyan transition-colors duration-300">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm text-text-muted flex items-center gap-1">
                    <Newspaper size={14} />
                    {news.author}
                  </span>
                  <span className="text-sm text-text-muted">{news.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Latest News & Trending News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest News */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Latest News</h2>
            <Link to="/latest" className="text-accent-cyan hover:text-accent-blue transition-colors duration-300">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {latestNews.map((news) => (
              <article key={news.id} className="card group">
                <div className="flex gap-4">
                  {news.image && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-accent-purple/20 text-accent-purple px-2 py-1 rounded-full text-xs font-medium">
                        {news.category}
                      </span>
                      <span className="text-sm text-text-muted">{news.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors duration-300">
                      <Link to={`/news/${news.id}`}>{news.title}</Link>
                    </h3>
                    <p className="text-text-secondary text-sm mb-3">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Newspaper size={14} />
                        {news.author}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {news.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {news.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={14} />
                          {news.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Trending News & Topics */}
        <div className="space-y-8">
          {/* Trending News */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-accent-cyan" />
              <h2 className="text-2xl font-bold text-text-primary">Trending Now</h2>
            </div>
            
            <div className="space-y-4">
              {trendingNews.map((news) => (
                <article key={news.id} className="card group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Trending
                    </span>
                    <span className="text-sm text-text-muted">{news.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors duration-300">
                    <Link to={`/news/${news.id}`}>{news.title}</Link>
                  </h3>
                  <p className="text-text-secondary text-sm mb-3">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                      <Newspaper size={14} />
                      {news.author}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {news.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {news.likes}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-6 h-6 text-accent-cyan" />
              <h2 className="text-2xl font-bold text-text-primary">Trending Topics</h2>
            </div>
            
            <div className="card">
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, index) => (
                  <Link 
                    key={index}
                    to={`/topic/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-accent-cyan/10 text-accent-cyan px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-accent-cyan hover:text-primary-bg no-underline"
                  >
                    #{topic}
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-accent-cyan to-accent-blue rounded-xl">
                <h3 className="text-lg font-bold text-white mb-2">Stay Informed</h3>
                <p className="text-white/90 text-sm mb-4">
                  Get the latest news delivered to your inbox. Subscribe to our comprehensive news service.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:border-white/40"
                  />
                  <button className="bg-white text-primary-bg px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 