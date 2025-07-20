import { useState, useEffect } from 'react'
import { 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Database, 
  Globe, 
  Hash,
  ChevronDown,
  ChevronUp,
  Copy
} from 'lucide-react'

const AdminNews = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [limit, setLimit] = useState(50)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [expandedArticles, setExpandedArticles] = useState(new Set())
  const [stats, setStats] = useState({
    total: 0,
    successful: 0
  })

  // Fetch articles from API
  const fetchArticles = async () => {
    setLoading(true)
    setError('')
    
    try {
      const adminToken = localStorage.getItem('admin_token')
      if (!adminToken) {
        throw new Error('Admin token not found')
      }

      const response = await fetch(`https://aic-backend.azurewebsites.net/admin/articles?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setArticles(data)
      
      // Calculate stats
      setStats({
        total: data.length,
        successful: data.length
      })

    } catch (err) {
      setError(err.message || 'Failed to fetch articles')
      console.error('Error fetching articles:', err)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchArticles()
  }, [])

  // Toggle article expansion
  const toggleArticle = (articleId) => {
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

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  // Get status badge
  const getStatusBadge = (article) => {
    return (
      <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
        Success
      </span>
    )
  }

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.original_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.original_link?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'created_at':
        aValue = new Date(a.created_at)
        bValue = new Date(b.created_at)
        break
      case 'processed_at':
        aValue = new Date(a.processed_at)
        bValue = new Date(b.processed_at)
        break
      case 'id':
        aValue = a.id
        bValue = b.id
        break
      case 'title':
        aValue = a.original_title?.toLowerCase()
        bValue = b.original_title?.toLowerCase()
        break
      default:
        aValue = a[sortBy]
        bValue = b[sortBy]
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">News Management</h1>
          <p className="text-text-secondary">Manage and monitor AI-generated news articles</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchArticles}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-primary-bg rounded-lg font-semibold hover:bg-accent-blue transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Database className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Total Articles</p>
              <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Successful</p>
              <p className="text-2xl font-bold text-text-primary">{stats.successful}</p>
            </div>
          </div>
        </div>
        

      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Limit Input */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-text-secondary">Limit:</label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value) || 50)}
                min="1"
                max="1000"
                className="w-20 px-3 py-2 bg-primary-secondary border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-cyan"
              />
              <button
                onClick={fetchArticles}
                disabled={loading}
                className="px-4 py-2 bg-accent-cyan text-primary-bg rounded-lg font-semibold hover:bg-accent-blue transition-all duration-300 disabled:opacity-50"
              >
                Get
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-primary-secondary border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-cyan w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">


            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-primary-secondary border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-cyan"
            >
              <option value="created_at">Created Date</option>
              <option value="processed_at">Processed Date</option>
              <option value="id">ID</option>
              <option value="title">Title</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 bg-primary-secondary border border-border rounded-lg text-text-secondary hover:text-accent-cyan transition-all duration-300"
            >
              {sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card border-l-4 border-l-red-500 bg-red-500/5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-4">
        {loading ? (
          <div className="card">
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-accent-cyan animate-spin" />
              <span className="ml-3 text-text-secondary">Loading articles...</span>
            </div>
          </div>
        ) : sortedArticles.length === 0 ? (
          <div className="card">
            <div className="text-center py-12">
              <Database className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary">No articles found</p>
            </div>
          </div>
        ) : (
          sortedArticles.map((article) => (
            <div key={article.id} className="card">
              <div className="space-y-4">
                {/* Article Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-accent-cyan/10 text-accent-cyan px-2 py-1 rounded-full text-xs font-medium">
                        ID: {article.id}
                      </span>
                      {getStatusBadge(article)}
                      <span className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">
                        Cycle: {article.cycle_number}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">
                      {article.original_title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Created: {formatDate(article.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        Processed: {formatDate(article.processed_at)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleArticle(article.id)}
                      className="p-2 bg-primary-secondary rounded-lg text-text-secondary hover:text-accent-cyan transition-all duration-300"
                    >
                      {expandedArticles.has(article.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Article Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={article.original_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300"
                  >
                    <ExternalLink size={14} />
                    View Original
                  </a>
                  
                  <button
                    onClick={() => copyToClipboard(article.original_link)}
                    className="flex items-center gap-2 px-3 py-1 bg-primary-secondary text-text-secondary rounded-lg text-sm hover:bg-accent-cyan/10 hover:text-accent-cyan transition-all duration-300"
                  >
                    <Copy size={14} />
                    Copy Link
                  </button>
                  

                </div>

                {/* Expanded Content */}
                {expandedArticles.has(article.id) && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    {/* Source Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                          <Globe size={14} />
                          Source Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-text-muted">Source:</span>
                            <span className="text-text-primary ml-2">{article.source}</span>
                          </div>
                          <div>
                            <span className="text-text-muted">Pipeline ID:</span>
                            <span className="text-text-primary ml-2 font-mono text-xs">{article.pipeline_id}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                          <Hash size={14} />
                          Processing Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-text-muted">Similar Articles:</span>
                            <span className="text-text-primary ml-2">{article.authenticity_score?.similar_articles_count || 0}</span>
                          </div>
                          <div>
                            <span className="text-text-muted">Cycle Number:</span>
                            <span className="text-text-primary ml-2">{article.cycle_number}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Generated Content */}
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-2">Generated Content</h4>
                      <div className="bg-primary-secondary rounded-lg p-4 max-h-40 overflow-y-auto">
                        <pre className="text-sm text-text-secondary whitespace-pre-wrap">
                          {article.generated_content || 'No content generated'}
                        </pre>
                      </div>
                    </div>


                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Info */}
      {sortedArticles.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>Showing {sortedArticles.length} of {articles.length} articles</span>
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminNews 