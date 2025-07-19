import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Eye, Heart, Share2, TrendingUp, Zap, ArrowRight, Bot, Shield, Globe, Database, Cpu, Target, Users, BarChart3, Sparkles } from 'lucide-react'

const Home = () => {
  const [featuredNews] = useState([
    {
      id: 1,
      title: "OpenAI Announces GPT-5: Revolutionary AI Model with Enhanced Reasoning",
      excerpt: "The latest iteration promises unprecedented capabilities in logical reasoning and problem-solving, marking a significant leap forward in artificial intelligence.",
      category: "Machine Learning",
      author: "AI Chronicle Bot",
      date: "2 hours ago",
      readTime: "5 min read",
      views: "12.5K",
      likes: "2.3K",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Quantum Computing Breakthrough: IBM Achieves 1000+ Qubit Processor",
      excerpt: "IBM's latest quantum processor demonstrates unprecedented stability and coherence, bringing us closer to practical quantum applications.",
      category: "Quantum AI",
      author: "AI Chronicle Bot",
      date: "4 hours ago",
      readTime: "7 min read",
      views: "8.9K",
      likes: "1.7K",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "AI Ethics Framework: Global Consortium Releases New Guidelines",
      excerpt: "Leading AI researchers and ethicists collaborate to establish comprehensive guidelines for responsible AI development and deployment.",
      category: "AI Ethics",
      author: "AI Chronicle Bot",
      date: "6 hours ago",
      readTime: "4 min read",
      views: "6.2K",
      likes: "1.1K",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
    }
  ])

  const [latestNews] = useState([
    {
      id: 4,
      title: "Neural Networks Revolutionize Medical Diagnosis",
      excerpt: "New deep learning models achieve 99.2% accuracy in detecting early-stage diseases.",
      category: "Healthcare AI",
      author: "AI Chronicle Bot",
      date: "1 hour ago",
      readTime: "3 min read",
      views: "4.1K",
      likes: "856"
    },
    {
      id: 5,
      title: "Autonomous Vehicles: Tesla's Latest FSD Update",
      excerpt: "Tesla releases Full Self-Driving Beta 12.0 with improved urban navigation capabilities.",
      category: "Autonomous Vehicles",
      author: "AI Chronicle Bot",
      date: "3 hours ago",
      readTime: "6 min read",
      views: "5.7K",
      likes: "1.2K"
    },
    {
      id: 6,
      title: "Natural Language Processing: BERT vs GPT Comparison",
      excerpt: "Comprehensive analysis of transformer architectures and their applications in modern NLP.",
      category: "NLP",
      author: "AI Chronicle Bot",
      date: "5 hours ago",
      readTime: "8 min read",
      views: "3.8K",
      likes: "742"
    }
  ])

  const [trendingTopics] = useState([
    "GPT-5 Release",
    "Quantum Computing",
    "AI Regulation",
    "Neural Networks",
    "Machine Learning",
    "Computer Vision",
    "AI Safety",
    "Robotics"
  ])

  const [stats] = useState([
    { label: "Articles Published", value: "2,847", icon: Database },
    { label: "AI Models Analyzed", value: "156", icon: Cpu },
    { label: "Accuracy Rate", value: "99.7%", icon: Target },
    { label: "Global Readers", value: "1.2M+", icon: Users }
  ])

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-gray-900 to-green-900 p-8 lg:p-16 text-white">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Logo and Brand Section */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-8">
                <div className="relative">
                  <img 
                    src="/logo/logo.jpeg" 
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
                Your gateway to the latest AI innovations, breakthroughs, and insights. 
                Stay informed with cutting-edge technology news and analysis.
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
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-400/20 to-green-500/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-full blur-3xl"></div>
      </section>



      {/* Key Features */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Why Choose AI Chronicle?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Experience the future of journalism with our revolutionary autonomous news platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card group">
            <div className="p-4 bg-accent-cyan/10 rounded-xl mb-6 w-fit group-hover:bg-accent-cyan/20 transition-colors duration-300">
              <Bot className="w-8 h-8 text-accent-cyan" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">Fully Autonomous</h3>
            <p className="text-text-secondary leading-relaxed">
              Zero human intervention. Our AI systems research, write, and publish news articles automatically, 
              ensuring 24/7 coverage of global events.
            </p>
          </div>

          <div className="card group">
            <div className="p-4 bg-accent-purple/10 rounded-xl mb-6 w-fit group-hover:bg-accent-purple/20 transition-colors duration-300">
              <Shield className="w-8 h-8 text-accent-purple" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">Bias-Free Reporting</h3>
            <p className="text-text-secondary leading-relaxed">
              Advanced algorithms eliminate human bias, providing objective, fact-based reporting 
              from multiple verified sources.
            </p>
          </div>

          <div className="card group">
            <div className="p-4 bg-accent-blue/10 rounded-xl mb-6 w-fit group-hover:bg-accent-blue/20 transition-colors duration-300">
              <Database className="w-8 h-8 text-accent-blue" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">BNB Chain Powered</h3>
            <p className="text-text-secondary leading-relaxed">
              Built on BNB Chain for transparency, immutability, and decentralized verification 
              of news sources and content authenticity.
            </p>
          </div>

          <div className="card group">
            <div className="p-4 bg-accent-pink/10 rounded-xl mb-6 w-fit group-hover:bg-accent-pink/20 transition-colors duration-300">
              <Sparkles className="w-8 h-8 text-accent-pink" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">Real-Time Updates</h3>
            <p className="text-text-secondary leading-relaxed">
              Instant news delivery with continuous monitoring of global events, 
              ensuring you're always informed of breaking developments.
            </p>
          </div>

          <div className="card group">
            <div className="p-4 bg-accent-cyan/10 rounded-xl mb-6 w-fit group-hover:bg-accent-cyan/20 transition-colors duration-300">
              <Target className="w-8 h-8 text-accent-cyan" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">99.7% Accuracy</h3>
            <p className="text-text-secondary leading-relaxed">
              Multi-source verification and fact-checking algorithms ensure 
              the highest level of accuracy in all published content.
            </p>
          </div>

          <div className="card group">
            <div className="p-4 bg-accent-purple/10 rounded-xl mb-6 w-fit group-hover:bg-accent-purple/20 transition-colors duration-300">
              <BarChart3 className="w-8 h-8 text-accent-purple" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">Analytics & Insights</h3>
            <p className="text-text-secondary leading-relaxed">
              Advanced analytics provide deep insights into trending topics, 
              sentiment analysis, and comprehensive coverage metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text-primary mb-2">Latest AI News</h2>
            <p className="text-text-secondary">Curated by our autonomous AI systems</p>
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
                    <Bot size={14} />
                    {news.author}
                  </span>
                  <span className="text-sm text-text-muted">{news.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Latest News & Trending Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest News */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Breaking News</h2>
            <Link to="/latest" className="text-accent-cyan hover:text-accent-blue transition-colors duration-300">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {latestNews.map((news) => (
              <article key={news.id} className="card group">
                <div className="flex gap-4">
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
                        <Bot size={14} />
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

        {/* Trending Topics */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-accent-cyan" />
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
              <h3 className="text-lg font-bold text-white mb-2">Join the Revolution</h3>
              <p className="text-white/90 text-sm mb-4">
                Be part of the future of journalism. Subscribe to our autonomous AI news service.
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
  )
}

export default Home 