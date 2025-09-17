'use client'

import Link from 'next/link'
import { ShoppingBag, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Subtle floating elements */}
      <div className="absolute top-20 left-10 floating">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
      </div>
      <div className="absolute top-40 right-20 floating" style={{ animationDelay: '2s' }}>
        <div className="w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-20 left-1/4 floating" style={{ animationDelay: '4s' }}>
        <div className="w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Title */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="gradient-text font-display">
                VINTAGE
              </span>
              <br />
              <span className="text-4xl md:text-6xl font-bold text-white/90">
                90s SPORTS CARDS
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
          </div>

          {/* Subtitle */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl md:text-2xl text-slate-300 mb-4 font-medium">
              Authentic 90s Collection • Professional Grading • Secure Transactions
            </p>
            <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-4xl mx-auto">
              Discover the most valuable sports cards from the golden era of the 90s. 
              Our curated collection features authenticated, professionally graded cards from the most iconic athletes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="#cards" className="btn-primary text-base px-8 py-3">
                <ShoppingBag className="inline-block mr-2 w-5 h-5" />
                Browse Collection
              </Link>
              
              <Link href="#about" className="btn-outline text-base px-8 py-3">
                <Star className="inline-block mr-2 w-5 h-5" />
                Learn More
              </Link>
            </div>
          </div>
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}