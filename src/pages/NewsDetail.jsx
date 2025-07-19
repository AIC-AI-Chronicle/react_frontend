import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Eye, Heart, Share2, Bookmark, MessageCircle, Twitter, Facebook, Linkedin } from 'lucide-react'

const NewsDetail = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    // Simulate fetching article data
    setArticle({
      id: parseInt(id),
      title: "OpenAI Announces GPT-5: Revolutionary AI Model with Enhanced Reasoning",
      content: `
        <p class="mb-6 text-lg leading-relaxed">
          OpenAI has officially announced the release of GPT-5, their most advanced language model to date. This revolutionary AI system represents a significant leap forward in artificial intelligence capabilities, particularly in the areas of logical reasoning, problem-solving, and contextual understanding.
        </p>
        
        <h2 class="text-2xl font-bold mb-4 text-text-primary">Enhanced Reasoning Capabilities</h2>
        <p class="mb-6 text-lg leading-relaxed">
          GPT-5 introduces unprecedented reasoning abilities that allow it to tackle complex multi-step problems with remarkable accuracy. The model can now break down intricate scenarios into logical components, analyze relationships between different concepts, and arrive at well-reasoned conclusions.
        </p>
        
        <p class="mb-6 text-lg leading-relaxed">
          "This represents a fundamental shift in how AI systems approach problem-solving," says Dr. Sarah Chen, lead researcher on the GPT-5 project. "We've moved beyond pattern recognition to genuine understanding and reasoning capabilities."
        </p>
        
        <h2 class="text-2xl font-bold mb-4 text-text-primary">Technical Specifications</h2>
        <p class="mb-6 text-lg leading-relaxed">
          The new model features a significantly larger parameter count, improved training methodology, and enhanced architecture that enables better context retention and more nuanced responses. Key improvements include:
        </p>
        
        <ul class="mb-6 space-y-2 text-lg">
          <li class="flex items-start gap-2">
            <span class="text-accent-cyan mt-1">•</span>
            <span>Advanced reasoning modules for complex problem-solving</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent-cyan mt-1">•</span>
            <span>Enhanced context window for better conversation flow</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent-cyan mt-1">•</span>
            <span>Improved safety mechanisms and bias detection</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-accent-cyan mt-1">•</span>
            <span>Multi-modal capabilities for text, image, and audio processing</span>
          </li>
        </ul>
        
        <h2 class="text-2xl font-bold mb-4 text-text-primary">Real-World Applications</h2>
        <p class="mb-6 text-lg leading-relaxed">
          The enhanced reasoning capabilities of GPT-5 open up new possibilities across various industries. From scientific research and medical diagnosis to legal analysis and creative problem-solving, the model's ability to understand complex relationships and draw logical conclusions makes it an invaluable tool for professionals in numerous fields.
        </p>
        
        <p class="mb-6 text-lg leading-relaxed">
          Early testing has shown remarkable results in areas such as mathematical problem-solving, code generation, and creative writing, with the model consistently outperforming previous iterations and competing systems.
        </p>
      `,
      excerpt: "The latest iteration promises unprecedented capabilities in logical reasoning and problem-solving, marking a significant leap forward in artificial intelligence.",
      category: "Machine Learning",
      author: "Dr. Sarah Chen",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      date: "2 hours ago",
      readTime: "8 min read",
      views: "12.5K",
      likes: "2.3K",
      comments: "156",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
      tags: ["GPT-5", "OpenAI", "Machine Learning", "AI", "Natural Language Processing"]
    })

    setRelatedArticles([
      {
        id: 2,
        title: "Quantum Computing Breakthrough: IBM Achieves 1000+ Qubit Processor",
        excerpt: "IBM's latest quantum processor demonstrates unprecedented stability and coherence.",
        category: "Quantum AI",
        author: "Michael Rodriguez",
        date: "4 hours ago",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop"
      },
      {
        id: 3,
        title: "AI Ethics Framework: Global Consortium Releases New Guidelines",
        excerpt: "Leading AI researchers and ethicists collaborate to establish comprehensive guidelines.",
        category: "AI Ethics",
        author: "Prof. Emily Watson",
        date: "6 hours ago",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop"
      },
      {
        id: 4,
        title: "Neural Networks Revolutionize Medical Diagnosis",
        excerpt: "New deep learning models achieve 99.2% accuracy in detecting early-stage diseases.",
        category: "Healthcare AI",
        author: "Dr. James Wilson",
        date: "1 hour ago",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop"
      }
    ])
  }, [id])

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Back Button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-blue transition-colors duration-300"
      >
        <ArrowLeft size={20} />
        Back to News
      </Link>

      {/* Article Header */}
      <article className="card">
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-4">
          <span className="bg-accent-cyan text-primary-bg px-3 py-1 rounded-full text-sm font-semibold">
            {article.category}
          </span>
          <span className="text-text-muted text-sm">{article.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-text-secondary mb-6 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Featured Image */}
        {article.image && (
          <div className="relative mb-6 overflow-hidden rounded-xl">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Article Meta */}
        <div className="flex items-center justify-between mb-6 p-4 bg-primary-secondary rounded-xl">
          <div className="flex items-center gap-4">
            <img 
              src={article.authorAvatar} 
              alt={article.author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-text-primary">{article.author}</p>
              <p className="text-sm text-text-muted">AI Research Specialist</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {article.views}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-a:text-accent-cyan"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
          {article.tags.map((tag, index) => (
            <Link 
              key={index}
              to={`/tag/${tag.toLowerCase()}`}
              className="bg-accent-purple/20 text-accent-purple px-3 py-1 rounded-full text-sm font-medium hover:bg-accent-purple hover:text-white transition-colors duration-300"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isLiked 
                  ? 'bg-accent-cyan text-primary-bg' 
                  : 'bg-primary-secondary text-text-secondary hover:bg-accent-cyan/10 hover:text-accent-cyan'
              }`}
            >
              <Heart size={16} />
              {article.likes}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-secondary text-text-secondary hover:bg-accent-cyan/10 hover:text-accent-cyan transition-all duration-300">
              <MessageCircle size={16} />
              {article.comments}
            </button>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isBookmarked 
                  ? 'bg-accent-purple text-white' 
                  : 'bg-primary-secondary text-text-secondary hover:bg-accent-purple/10 hover:text-accent-purple'
              }`}
            >
              <Bookmark size={16} />
              {isBookmarked ? 'Saved' : 'Save'}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">Share:</span>
            <button className="p-2 rounded-lg bg-primary-secondary text-text-secondary hover:bg-blue-500 hover:text-white transition-all duration-300">
              <Facebook size={16} />
            </button>
            <button className="p-2 rounded-lg bg-primary-secondary text-text-secondary hover:bg-blue-400 hover:text-white transition-all duration-300">
              <Twitter size={16} />
            </button>
            <button className="p-2 rounded-lg bg-primary-secondary text-text-secondary hover:bg-blue-600 hover:text-white transition-all duration-300">
              <Linkedin size={16} />
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((related) => (
            <article key={related.id} className="card group">
              {related.image && (
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img 
                    src={related.image} 
                    alt={related.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent-purple text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {related.category}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-cyan transition-colors duration-300">
                  <Link to={`/news/${related.id}`}>{related.title}</Link>
                </h3>
                <p className="text-text-secondary text-sm">
                  {related.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>By {related.author}</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {related.readTime}
                    </span>
                    <span>{related.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default NewsDetail 