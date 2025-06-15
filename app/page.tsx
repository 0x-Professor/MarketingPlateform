import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { FloatingChat } from "@/components/floating-chat"
import {
  Mail,
  PenTool,
  BarChart3,
  FileText,
  Zap,
  Shield,
  Rocket,
  Star,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Award,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 hero-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
          <div className="floating-orb orb-4"></div>
          <div className="floating-orb orb-5"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="hero-content">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 mb-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-medium animate-fade-in-up">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Powered by Gemini & LLaMA AI
              <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tight">
              <span className="block animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Marketing
              </span>
              <span
                className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Automation
              </span>
              <span
                className="block text-5xl md:text-6xl lg:text-7xl font-bold mt-4 animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                Powered by AI
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-5xl mx-auto leading-relaxed font-light animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Generate high-converting emails, create compelling copy, and automate your marketing campaigns with our
              <span className="font-semibold text-yellow-400"> advanced AI platform</span>
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <Link href="/signup">
                <Button size="xl" className="hero-btn-primary group">
                  <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                  Start Free Trial
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/generate">
                <Button size="xl" variant="outline" className="hero-btn-secondary group">
                  <Zap className="mr-3 h-6 w-6 group-hover:text-yellow-400 transition-colors" />
                  Try AI Generator
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="stats-card">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">50K+</div>
                <div className="text-white/80 font-medium">Emails Generated</div>
              </div>
              <div className="stats-card">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">98%</div>
                <div className="text-white/80 font-medium">Success Rate</div>
              </div>
              <div className="stats-card">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">24/7</div>
                <div className="text-white/80 font-medium">AI Availability</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 text-purple-300 text-sm font-medium">
              <Award className="w-4 h-4 mr-2" />
              Industry Leading Features
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Everything you need to
              <span className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                scale your marketing
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From email generation to analytics, our platform provides all the tools you need to create and optimize
              your marketing campaigns with AI precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="feature-card group">
              <CardHeader className="text-center p-8">
                <div className="feature-icon-wrapper mb-6">
                  <Mail className="h-12 w-12 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  Email Generator
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Create high-converting email campaigns with AI-powered templates and personalization using Gemini AI.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card group">
              <CardHeader className="text-center p-8">
                <div className="feature-icon-wrapper mb-6">
                  <PenTool className="h-12 w-12 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                  Copy Assistant
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Generate compelling social media posts, ads, and blog content that converts with advanced AI.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card group">
              <CardHeader className="text-center p-8">
                <div className="feature-icon-wrapper mb-6">
                  <BarChart3 className="h-12 w-12 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  Analytics Dashboard
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Track performance with detailed analytics and insights to optimize your campaigns.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card group">
              <CardHeader className="text-center p-8">
                <div className="feature-icon-wrapper mb-6">
                  <FileText className="h-12 w-12 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  Template Library
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Access hundreds of proven templates for every industry and use case.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="benefit-orb benefit-orb-1"></div>
          <div className="benefit-orb benefit-orb-2"></div>
          <div className="benefit-orb benefit-orb-3"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 mb-6 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 text-blue-300 text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Why Choose Us
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                Why choose
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  MarketingAI Pro?
                </span>
              </h2>

              <div className="space-y-8">
                <div className="benefit-item group">
                  <div className="benefit-icon">
                    <Zap className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      Lightning Fast Generation
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Generate complete marketing content in seconds using our dual AI system with Gemini and LLaMA
                      APIs.
                    </p>
                  </div>
                </div>

                <div className="benefit-item group">
                  <div className="benefit-icon">
                    <Shield className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      Enterprise Security
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Your data is protected with bank-level security and encrypted API communications.
                    </p>
                  </div>
                </div>

                <div className="benefit-item group">
                  <div className="benefit-icon">
                    <TrendingUp className="h-8 w-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                      Proven Results
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Our users see 3x higher conversion rates and 50% time savings on average.
                    </p>
                  </div>
                </div>

                <div className="benefit-item group">
                  <div className="benefit-icon">
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      24/7 AI Support
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Get instant help and content generation any time with our always-available AI assistants.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="dashboard-preview">
                <div className="dashboard-header">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="dashboard-nav">
                    <div className="nav-item active">Dashboard</div>
                    <div className="nav-item">Analytics</div>
                    <div className="nav-item">Campaigns</div>
                  </div>
                </div>
                <div className="dashboard-content">
                  <div className="dashboard-stats">
                    <div className="stat-card">
                      <div className="stat-value">12.5K</div>
                      <div className="stat-label">Emails Sent</div>
                      <div className="stat-trend">+23%</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">89%</div>
                      <div className="stat-label">Open Rate</div>
                      <div className="stat-trend">+12%</div>
                    </div>
                  </div>
                  <div className="dashboard-chart">
                    <div className="chart-bars">
                      <div className="chart-bar" style={{ height: "60%" }}></div>
                      <div className="chart-bar" style={{ height: "80%" }}></div>
                      <div className="chart-bar" style={{ height: "45%" }}></div>
                      <div className="chart-bar" style={{ height: "90%" }}></div>
                      <div className="chart-bar" style={{ height: "70%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-32 px-4 bg-black relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30 text-green-300 text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-2" />
            Trusted by Thousands
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16">
            Join <span className="text-green-400">10,000+</span> marketers who trust us
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="company-logo">
              <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">TechCorp</span>
              </div>
            </div>
            <div className="company-logo">
              <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">StartupX</span>
              </div>
            </div>
            <div className="company-logo">
              <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">GrowthCo</span>
              </div>
            </div>
            <div className="company-logo">
              <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">ScaleUp</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                "MarketingAI Pro transformed our email campaigns. We saw a 300% increase in engagement within the first
                month."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  JS
                </div>
                <div>
                  <div className="text-white font-semibold">John Smith</div>
                  <div className="text-gray-400">Marketing Director, TechCorp</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                "The AI-generated copy is incredible. It's like having a world-class copywriter on our team 24/7."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SD
                </div>
                <div>
                  <div className="text-white font-semibold">Sarah Davis</div>
                  <div className="text-gray-400">CEO, StartupX</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                "Best investment we've made. The ROI is incredible and the time savings are massive."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MJ
                </div>
                <div>
                  <div className="text-white font-semibold">Mike Johnson</div>
                  <div className="text-gray-400">Growth Lead, GrowthCo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="cta-orb cta-orb-1"></div>
          <div className="cta-orb cta-orb-2"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-medium">
            <Clock className="w-4 h-4 mr-2 text-green-400" />
            Limited Time Offer
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Ready to transform
            <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              your marketing?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join thousands of marketers who are already using AI to scale their campaigns and achieve better results.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup">
              <Button size="xl" className="hero-btn-primary group">
                <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Start Your Free Trial
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/generate">
              <Button size="xl" variant="outline" className="hero-btn-secondary group">
                <Zap className="mr-3 h-6 w-6 group-hover:text-yellow-400 transition-colors" />
                Try Generator Now
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-white/60 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </div>
        </div>
      </section>

      <FloatingChat />
    </div>
  )
}
