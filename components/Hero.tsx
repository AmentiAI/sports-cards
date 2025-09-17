'use client'

import Link from 'next/link'
import { ShoppingBag, Star, Sparkles, Zap, Trophy } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 floating">
        <div className="w-20 h-20 bg-gradient-to-r from-card-red/20 to-card-blue/20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute top-40 right-20 floating" style={{ animationDelay: '1s' }}>
        <div className="w-32 h-32 bg-gradient-to-r from-card-gold/20 to-card-red/20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-20 left-1/4 floating" style={{ animationDelay: '2s' }}>
        <div className="w-24 h-24 bg-gradient-to-r from-card-blue/20 to-card-gold/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Title with Stunning Effects */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-card-red via-card-gold to-card-blue mb-6 leading-tight">
              VINTAGE
              <br />
              <span className="text-5xl md:text-7xl font-orbitron">90s SPORTS CARDS</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-card-red to-card-blue mx-auto mb-8 rounded-full"></div>
          </div>

          {/* Subtitle with Animation */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
              Discover the <span className="text-neon-gold font-bold">GOLDEN ERA</span> of sports cards
            </p>
            <p className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed max-w-4xl mx-auto">
              From legendary rookie cards to championship moments, find the perfect addition to your collection. 
              <br className="hidden md:block" />
              <span className="text-neon-blue">Authenticated • Graded • Guaranteed</span>
            </p>
          </div>

          {/* Action Buttons with Amazing Effects */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/catalog" className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-card-red via-card-gold to-card-blue rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative btn-primary text-xl px-10 py-5 inline-flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="mr-3" size={28} />
                  BROWSE COLLECTION
                  <Sparkles className="ml-3 animate-spin-slow" size={20} />
                </div>
              </Link>
              
              <Link href="/about" className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-card-blue via-card-red to-card-gold rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative btn-outline text-xl px-10 py-5 inline-flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="mr-3" size={28} />
                  LEARN MORE
                  <Zap className="ml-3 animate-bounce-slow" size={20} />
                </div>
              </Link>
            </div>
          </div>
          
          {/* Stats Cards with Stunning Animations */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-card-red to-card-blue rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-card-red to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow">
                    <span className="text-white font-black text-3xl font-orbitron">1000+</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Cards Available</h3>
                  <p className="text-white/70 text-lg">Extensive collection of 90s sports cards</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-card-blue to-card-gold rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-card-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow">
                    <Trophy className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Premium Quality</h3>
                  <p className="text-white/70 text-lg">Carefully graded and authenticated cards</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-card-gold to-card-red rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-card-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow">
                    <span className="text-white font-black text-3xl">$</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Fair Prices</h3>
                  <p className="text-white/70 text-lg">Competitive pricing for collectors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
