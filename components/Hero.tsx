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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-4">
              <span className="gradient-text font-display block">
                VINTAGE
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white/90 block mt-2">
                90s SPORTS CARDS
              </span>
            </h1>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 md:mb-8 rounded-full"></div>
          </div>

          {/* Subtitle */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-3 md:mb-4 font-medium px-4">
              Authentic 90s Collection • Professional Grading • Secure Transactions
            </p>
            <p className="text-base sm:text-lg text-slate-400 mb-4 md:mb-6 leading-relaxed max-w-4xl mx-auto px-4">
              Own the cards that defined a generation. Our authenticated, PSA-graded collection features the most sought-after cards from Michael Jordan, Derek Jeter, Kobe Bryant, and more legends.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 text-xs sm:text-sm text-slate-300 mb-8 md:mb-12 px-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>5,000+ Happy Collectors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>100% Authentic Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>30-Day Return Policy</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4">
              <Link href="/baseball" className="btn-primary text-sm sm:text-base px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
                <ShoppingBag className="inline-block mr-2 w-4 h-4 md:w-5 md:h-5" />
                Browse Baseball Cards
              </Link>
              
              <Link href="/football" className="btn-outline text-sm sm:text-base px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
                <Star className="inline-block mr-2 w-4 h-4 md:w-5 md:h-5" />
                Browse Football Cards
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