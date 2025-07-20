import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bot, ArrowRight, Globe, TrendingUp, Shield, Zap, Users, BarChart3, Sparkles, Star, CheckCircle, Play, ChevronRight, Grid, Layers } from 'lucide-react'

// Loading screen component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700">
      <img
        src="/logo/logo.png"
        alt="AI Chronicle Logo"
        className="w-32 h-32 lg:w-48 lg:h-48 rounded-2xl object-cover shadow-2xl animate-pulse"
      />
    </div>
  )
}

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show loading screen for 1.5 seconds
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      setIsVisible(true)
      // Animate features
      const interval = setInterval(() => {
        setCurrentFeature(prev => (prev + 1) % 3)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [loading])

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms analyze thousands of sources in real-time, delivering the most relevant and accurate AI news.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Stay ahead with instant notifications and comprehensive analytics on emerging AI trends and breakthrough technologies.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Shield,
      title: "Verified & Trusted",
      description: "Every piece of content undergoes rigorous fact-checking through multiple verified sources for maximum reliability.",
      color: "from-purple-500 to-pink-600"
    }
  ]

  const stats = [
    { label: "Daily Articles", value: "500+", icon: BarChart3 },
    { label: "Global Sources", value: "200+", icon: Globe },
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Accuracy Rate", value: "99.7%", icon: Shield }
  ]

  const benefits = [
    "Real-time AI news updates",
    "Expert-curated content",
    "Multi-source verification",
    "Personalized insights",
    "Advanced analytics",
    "Mobile-first design"
  ]

  if (loading) return <LoadingScreen />

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Animated Background Grid + Animated Globe Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        {/* Animated Globe/planet effects */}
        <div className="absolute top-[-6rem] left-[-6rem] w-[32rem] h-[32rem] bg-gradient-to-br from-cyan-400/30 via-blue-400/20 to-transparent rounded-full blur-3xl animate-globe1"></div>
        <div className="absolute bottom-[-8rem] right-[-8rem] w-[40rem] h-[40rem] bg-gradient-to-tr from-cyan-500/20 via-blue-400/20 to-transparent rounded-full blur-3xl animate-globe2"></div>
        <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-gradient-to-br from-cyan-300/10 via-blue-300/10 to-transparent rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-globe3"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-gradient-to-br from-white/10 to-cyan-400/10 rounded-full blur-2xl animate-globe4"></div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 px-6 py-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/logo/logo.png" 
                alt="AI Chronicle Logo" 
                className="w-15 h-15 rounded-xl object-cover transition-all duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">AI Chronicle</span>
              <div className="text-xs text-gray-400">Next-Gen AI News</div>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/login" 
              className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Login
            </Link>
            <Link 
              to="/admin/login" 
              className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Admin
            </Link>
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-cyan-600 hover:to-cyan-700 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <section className={`relative px-6 pt-6 pb-12 lg:px-8 lg:pt-8 lg:pb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Side - Content */}
            <div className="space-y-10 mt-[-32px] lg:mt-[-48px]">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">The Future of</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                    AI News
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Experience cutting-edge AI journalism that delivers real-time insights, breakthrough discoveries, 
                  and comprehensive analysis from the world's leading researchers.
                </p>
              </div>

              {/* Benefits List */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to="/signup" 
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-cyan-600 hover:to-cyan-700 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <button className="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <Play size={20} className="transition-transform duration-300 group-hover:scale-110" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <stat.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="relative flex justify-center lg:justify-end mt-[-56px] lg:mt-[-80px]">
              <div className="relative z-10">
                <video
                  src="/roboo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-w-lg rounded-2xl shadow-2xl border border-white/20"
                />
                
                {/* Floating Cards */}
                <div className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Live Updates</p>
                      <p className="text-gray-400 text-xs">Real-time AI news</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Shield className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Verified Sources</p>
                      <p className="text-gray-400 text-xs">99.7% accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`relative px-6 py-16 lg:px-8 lg:py-24 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">AI Chronicle</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the next generation of AI journalism with cutting-edge technology and unparalleled accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`card group transition-all duration-500 ${
                  currentFeature === index ? 'scale-105 shadow-cyan-500/20' : 'scale-100'
                }`}
              >
                <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`relative px-6 py-16 lg:px-8 lg:py-24 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl p-12 border border-cyan-500/20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust AI Chronicle for their daily dose of cutting-edge AI insights and breakthrough discoveries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-cyan-600 hover:to-cyan-700 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                <span>Get Started Free</span>
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
              >
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative px-6 py-8 lg:px-8 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo/logo.png" 
                alt="AI Chronicle Logo" 
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-white font-semibold">AI Chronicle</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>© 2024 AI Chronicle. All rights reserved.</span>
              <Link to="/privacy" className="hover:text-cyan-400 transition-colors duration-300">Privacy</Link>
              <Link to="/terms" className="hover:text-cyan-400 transition-colors duration-300">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing 