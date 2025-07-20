import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Eye, Heart, Share2, TrendingUp, Zap, ArrowRight, Bot, Shield, Globe, Database, Cpu, Target, Users, BarChart3, Sparkles, Brain, MessageSquare, Rocket, Scale, Atom, Newspaper, Users2, Building2, Car, Gamepad2, Music, Camera, Briefcase, Heart as HeartIcon, AlertTriangle, Search, Filter, RefreshCw, MoreHorizontal, ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react'

const Home = ({ selectedInterests = [] }) => {
  // API States
  const [interestArticles, setInterestArticles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loadingArticles, setLoadingArticles] = useState(false)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [expandedArticles, setExpandedArticles] = useState(new Set())
  const [verificationStatus, setVerificationStatus] = useState({})
  const [verifyingArticles, setVerifyingArticles] = useState(new Set())
  const [youtubeNews] = useState([])

  const [importantNews] = useState([])

  const [featuredNews] = useState([]) 

  const [latestNews] = useState([])

  const [trendingNews] = useState([])

  const [trendingTopics] = useState([])

 

  // Fetch articles based on interests
  const fetchInterestArticles = async (interests) => {
    if (interests.length === 0) return
    
    setLoadingArticles(true)
    try {
      const userToken = localStorage.getItem('access_token')
      if (!userToken) {
        console.log('No user token found')
        return
      }

      const requestBody = {
        interests: interests,
        page: 1,
        page_size: 10
      }

      const response = await fetch('https://aic-backend.azurewebsites.net/user/articles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        const data = await response.json()
        setInterestArticles(data.articles || [])
      } else {
        console.log('Failed to fetch interest articles')
      }
    } catch (error) {
      console.error('Error fetching interest articles:', error)
    } finally {
      setLoadingArticles(false)
    }
  }

  // Search articles
  const searchArticles = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    setLoadingSearch(true)
    try {
      const userToken = localStorage.getItem('access_token')
      if (!userToken) {
        console.log('No user token found')
        return
      }

      const response = await fetch(`https://aic-backend.azurewebsites.net/user/articles/search?q=${encodeURIComponent(query)}&limit=20`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.articles || [])
        setShowSearchResults(true)
      } else {
        console.log('Failed to search articles')
      }
    } catch (error) {
      console.error('Error searching articles:', error)
    } finally {
      setLoadingSearch(false)
    }
  }



  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    searchArticles(searchQuery)
  }

  // Handle article expansion
  const toggleArticleExpansion = (articleId) => {
    setExpandedArticles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(articleId)) {
        newSet.delete(articleId)
      } else {
        newSet.add(articleId)
      }
      return newSet
    })
  }

  // Verify article on blockchain
  const verifyArticle = async (articleId) => {
    if (verifyingArticles.has(articleId)) return
    
    setVerifyingArticles(prev => new Set(prev).add(articleId))
    
    try {
      const userToken = localStorage.getItem('access_token')
      if (!userToken) {
        console.log('No user token found')
        return
      }

      const response = await fetch(`https://aic-backend.azurewebsites.net/blockchain/articles/${articleId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setVerificationStatus(prev => ({
          ...prev,
          [articleId]: {
            success: data.success && data.article?.success,
            verified: data.success && data.article?.success
          }
        }))
      } else {
        setVerificationStatus(prev => ({
          ...prev,
          [articleId]: {
            success: false,
            verified: false
          }
        }))
      }
    } catch (error) {
      console.error('Error verifying article:', error)
      setVerificationStatus(prev => ({
        ...prev,
        [articleId]: {
          success: false,
          verified: false
        }
      }))
    } finally {
      setVerifyingArticles(prev => {
        const newSet = new Set(prev)
        newSet.delete(articleId)
        return newSet
      })
    }
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'sports': 'from-orange-400 to-orange-600',
      'economy': 'from-green-400 to-green-600',
      'business': 'from-blue-400 to-blue-600',
      'science': 'from-purple-400 to-purple-600',
      'health': 'from-pink-400 to-pink-600',
      'climate': 'from-teal-400 to-teal-600',
      'world news': 'from-indigo-400 to-indigo-600',
      'entertainment': 'from-yellow-400 to-yellow-600',
      'technology': 'from-cyan-400 to-cyan-600',
      'politics': 'from-red-400 to-red-600',
      'news': 'from-gray-400 to-gray-600'
    }
    return colors[category?.toLowerCase()] || 'from-gray-400 to-gray-600'
  }

  const [categories] = useState([])

  // Fetch articles when selectedInterests changes
  useEffect(() => {
    if (selectedInterests.length > 0) {
      fetchInterestArticles(selectedInterests)
    } else {
      setInterestArticles([])
    }
  }, [selectedInterests])

  const [stats] = useState([])

  return (
    <div className="space-y-12">
      {/* Search Section */}
      <section>
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <Search className="w-6 h-6 text-accent-cyan" />
            <h2 className="text-2xl font-bold text-text-primary">Search Articles</h2>
          </div>
          
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
              <input
                type="text"
                placeholder="Search for articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-primary-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <button
              type="submit"
              disabled={loadingSearch}
              className="px-6 py-3 bg-accent-cyan text-primary-bg rounded-lg font-semibold hover:bg-accent-blue transition-all duration-300 disabled:opacity-50"
            >
              {loadingSearch ? (
                <div className="flex items-center gap-2">
                  <RefreshCw size={16} className="animate-spin" />
                  Searching...
                </div>
              ) : (
                'Search'
              )}
            </button>
          </form>

          {/* Search Results */}
          {showSearchResults && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-text-primary">
                  Search Results ({searchResults.length})
                </h3>
                <button
                  onClick={() => {
                    setShowSearchResults(false)
                    setSearchQuery('')
                    setSearchResults([])
                  }}
                  className="text-text-muted hover:text-accent-cyan transition-colors duration-300"
                >
                  Clear
                </button>
              </div>
              
              <div className="space-y-4">
                {searchResults.map((article) => (
                  <article key={article.id} className="card group">
                    <div className="flex items-start gap-4">
                      {/* Article Image */}
                      {article.image_url ? (
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0 bg-primary-secondary border border-border"
                        />
                      ) : (
                        <div className="w-32 h-24 flex items-center justify-center rounded-lg bg-black text-white text-xs font-semibold border border-border flex-shrink-0">
                          Image not available
                        </div>
                      )}
                      <div className="flex-1">
                        {/* Verification Section */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <img src="/bnb.png" alt="BNB" className="w-5 h-5" />
                            <span className="text-xs text-text-muted">BNB Chain</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {verificationStatus[article.id] ? (
                              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                verificationStatus[article.id].verified 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {verificationStatus[article.id].verified ? (
                                  <>
                                    <CheckCircle size={12} />
                                    Verified on BNB
                                  </>
                                ) : (
                                  <>
                                    <XCircle size={12} />
                                    Not Verified on BNB
                                  </>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() => verifyArticle(article.id)}
                                disabled={verifyingArticles.has(article.id)}
                                className="flex items-center gap-1 px-3 py-1 bg-accent-cyan/20 text-accent-cyan rounded-full text-xs font-medium hover:bg-accent-cyan/30 transition-all duration-300 disabled:opacity-50"
                              >
                                {verifyingArticles.has(article.id) ? (
                                  <>
                                    <RefreshCw size={12} className="animate-spin" />
                                    Verifying...
                                  </>
                                ) : (
                                  <>
                                    <Shield size={12} />
                                    Verify
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`bg-gradient-to-r ${getCategoryColor(article.tags?.[0])} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                            {article.tags?.[0] || 'News'}
                          </span>
                          <span className="text-sm text-text-muted">{formatDate(article.published_at)}</span>
        </div>
                                                                        <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors duration-300">
                          <a href={article.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {article.title}
                          </a>
                        </h3>
                        <div className="text-text-secondary text-sm mb-3">
                          <div className={`whitespace-pre-wrap leading-relaxed ${
                            expandedArticles.has(article.id) ? '' : 'max-h-32 overflow-hidden'
                          }`}>
                            {article.content || 'No content available'}
            </div>
                          {article.content && article.content.length > 200 && (
                            <button
                              onClick={() => toggleArticleExpansion(article.id)}
                              className="flex items-center gap-1 text-accent-cyan hover:text-accent-blue transition-colors duration-300 mt-2"
                            >
                              {expandedArticles.has(article.id) ? (
                                <>
                                  <ChevronUp size={16} />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown size={16} />
                                  Read More
                                </>
                              )}
                            </button>
                          )}
          </div>
                        <div className="flex items-center gap-4 text-sm text-text-muted">
                          <span className="flex items-center gap-1">
                            <Globe size={14} />
                            Source
                          </span>
            </div>
          </div>
            </div>
                  </article>
                ))}
          </div>
            </div>
          )}
        </div>
      </section>

            {/* Interest-Based Articles */}
      {selectedInterests.length > 0 && (
      <section>
          <div className="card">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-6 h-6 text-accent-cyan" />
              <h2 className="text-2xl font-bold text-text-primary">Personalized Articles</h2>
          </div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Articles for: {selectedInterests[0]}
              </h3>
        </div>
        
            {loadingArticles ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw size={24} className="animate-spin text-accent-cyan" />
                <span className="ml-3 text-text-secondary">Loading articles...</span>
              </div>
            ) : interestArticles.length > 0 ? (
              <div className="space-y-4">
                {interestArticles.map((article) => (
                  <article key={article.id} className="card group">
                    <div className="flex items-start gap-4">
                      {/* Article Image */}
                      {article.image_url ? (
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0 bg-primary-secondary border border-border"
                        />
                      ) : (
                        <div className="w-32 h-24 flex items-center justify-center rounded-lg bg-black text-white text-xs font-semibold border border-border flex-shrink-0">
                          Image not available
                        </div>
                      )}
                      <div className="flex-1">
                        {/* Verification Section */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <img src="/bnb.png" alt="BNB" className="w-5 h-5" />
                            <span className="text-xs text-text-muted">BNB Chain</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {verificationStatus[article.id] ? (
                              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                verificationStatus[article.id].verified 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {verificationStatus[article.id].verified ? (
                                  <>
                                    <CheckCircle size={12} />
                                    Verified on BNB
                                  </>
                                ) : (
                                  <>
                                    <XCircle size={12} />
                                    Not Verified on BNB
                                  </>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() => verifyArticle(article.id)}
                                disabled={verifyingArticles.has(article.id)}
                                className="flex items-center gap-1 px-3 py-1 bg-accent-cyan/20 text-accent-cyan rounded-full text-xs font-medium hover:bg-accent-cyan/30 transition-all duration-300 disabled:opacity-50"
                              >
                                {verifyingArticles.has(article.id) ? (
                                  <>
                                    <RefreshCw size={12} className="animate-spin" />
                                    Verifying...
                                  </>
                                ) : (
                                  <>
                                    <Shield size={12} />
                                    Verify
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`bg-gradient-to-r ${getCategoryColor(article.tags?.[0])} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                            {article.tags?.[0] || 'News'}
                    </span>
                          <span className="text-sm text-text-muted">{formatDate(article.published_at)}</span>
                  </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors duration-300">
                          <a href={article.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {article.title}
                          </a>
                        </h3>
                        <div className="text-text-secondary text-sm mb-3">
                          <div className={`whitespace-pre-wrap leading-relaxed ${
                            expandedArticles.has(article.id) ? '' : 'max-h-32 overflow-hidden'
                          }`}>
                            {article.content || 'No content available'}
                </div>
                          {article.content && article.content.length > 200 && (
                            <button
                              onClick={() => toggleArticleExpansion(article.id)}
                              className="flex items-center gap-1 text-accent-cyan hover:text-accent-blue transition-colors duration-300 mt-2"
                            >
                              {expandedArticles.has(article.id) ? (
                                <>
                                  <ChevronUp size={16} />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown size={16} />
                                  Read More
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                            <Globe size={14} />
                            Source
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
              </div>
            ) : (
              <div className="text-center py-8 text-text-muted">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No articles found for selected interests</p>
              </div>
            )}
        </div>
      </section>
      )}

      {/* Important News Alerts */}
      {importantNews.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-text-primary">Important Alerts</h2>
          </div>
          
          <div className="space-y-4">
            {importantNews.map((news) => (
              <div key={news.id} className={`card border-l-4 ${
                news.priority === 'critical' ? 'border-l-red-500 bg-red-500/5' : 'border-l-orange-500 bg-orange-500/5'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    news.priority === 'critical' ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-500'
                  }`}>
                    <AlertTriangle size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        news.priority === 'critical' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                      }`}>
                        {news.priority === 'critical' ? 'CRITICAL' : 'HIGH PRIORITY'}
                      </span>
                      <span className="text-sm text-text-muted">{news.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{news.title}</h3>
                    <p className="text-text-secondary">{news.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}








    </div>
  )
}

export default Home 