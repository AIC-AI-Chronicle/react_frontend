import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Eye, Heart, Share2, TrendingUp, Zap, ArrowRight } from 'lucide-react'

const Home = () => {
  const [featuredNews] = useState([
    {
      id: 1,
      title: "OpenAI Announces GPT-5: Revolutionary AI Model with Enhanced Reasoning",
      excerpt: "The latest iteration promises unprecedented capabilities in logical reasoning and problem-solving, marking a significant leap forward in artificial intelligence.",
      category: "Machine Learning",
      author: "Dr. Sarah Chen",
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
      author: "Michael Rodriguez",
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
      author: "Prof. Emily Watson",
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
      author: "Dr. James Wilson",
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
      author: "Alex Thompson",
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
      author: "Dr. Maria Garcia",
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

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">BREAKING NEWS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            The Future of AI is Here
          </h1>
          <p className="text-xl mb-6 text-white/90 max-w-2xl">
            Stay ahead with the latest developments in artificial intelligence, machine learning, and emerging technologies.
          </p>
          <Link to="/latest" className="btn-primary inline-flex items-center gap-2">
            Explore Latest News
            <ArrowRight size={20} />
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-pink/20 rounded-full blur-2xl"></div>
      </section>

      {/* Featured News */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Featured News</h2>
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
                  <span className="text-sm text-text-muted">By {news.author}</span>
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
            <h2 className="text-2xl font-bold text-text-primary">Latest News</h2>
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
                      <span>By {news.author}</span>
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
              <h3 className="text-lg font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-white/90 text-sm mb-4">
                Get the latest AI news delivered to your inbox
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