'use client'

import { SportsCard } from '@/lib/mock-cards'
import CardGrid from './CardGrid'
import { useState, useEffect, useRef } from 'react'
import { Sparkles, Zap, Crown } from 'lucide-react'

interface PriceSectionProps {
  title: string
  subtitle: string
  description: string
  cards: SportsCard[]
  priceRange: 'budget' | 'mid' | 'premium'
}

export default function PriceSection({ title, subtitle, description, cards, priceRange }: PriceSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const displayCards = showAll ? cards : cards.slice(0, 8)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getPriceRangeStyles = (range: string) => {
    switch (range) {
      case 'budget':
        return {
          bgGradient: 'from-green-500/10 via-emerald-500/5 to-green-500/10',
          borderGradient: 'from-green-400 to-emerald-500',
          accentColor: 'text-green-400',
          glowColor: 'shadow-neon-green',
          icon: <Sparkles className="text-green-400" size={32} />,
          buttonGradient: 'from-green-500 to-emerald-600',
          cardBg: 'bg-gradient-to-br from-green-50/50 to-emerald-50/50'
        }
      case 'mid':
        return {
          bgGradient: 'from-blue-500/10 via-cyan-500/5 to-blue-500/10',
          borderGradient: 'from-blue-400 to-cyan-500',
          accentColor: 'text-blue-400',
          glowColor: 'shadow-neon-blue',
          icon: <Zap className="text-blue-400" size={32} />,
          buttonGradient: 'from-blue-500 to-cyan-600',
          cardBg: 'bg-gradient-to-br from-blue-50/50 to-cyan-50/50'
        }
      case 'premium':
        return {
          bgGradient: 'from-purple-500/10 via-pink-500/5 to-purple-500/10',
          borderGradient: 'from-purple-400 to-pink-500',
          accentColor: 'text-purple-400',
          glowColor: 'shadow-neon-gold',
          icon: <Crown className="text-purple-400" size={32} />,
          buttonGradient: 'from-purple-500 to-pink-600',
          cardBg: 'bg-gradient-to-br from-purple-50/50 to-pink-50/50'
        }
      default:
        return {
          bgGradient: 'from-gray-500/10 via-slate-500/5 to-gray-500/10',
          borderGradient: 'from-gray-400 to-slate-500',
          accentColor: 'text-gray-400',
          glowColor: 'shadow-gray-500',
          icon: <Sparkles className="text-gray-400" size={32} />,
          buttonGradient: 'from-gray-500 to-slate-600',
          cardBg: 'bg-gradient-to-br from-gray-50/50 to-slate-50/50'
        }
    }
  }

  const styles = getPriceRangeStyles(priceRange)

  if (cards.length === 0) {
    return null
  }

  return (
    <section 
      ref={sectionRef}
      className={`relative mb-20 overflow-hidden rounded-3xl border-2 border-transparent bg-gradient-to-r ${styles.bgGradient} backdrop-blur-sm`}
      style={{
        background: `linear-gradient(135deg, ${styles.bgGradient.replace('from-', '').replace('via-', '').replace('to-', '').replace('/10', '')})`
      }}
    >
      {/* Animated Border */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${styles.borderGradient} opacity-20`}></div>
      
      {/* Floating Particles */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
      <div className="absolute top-8 right-8 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-4 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>

      <div className={`relative p-8 md:p-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header with Stunning Effects */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative group">
              <div className={`absolute -inset-2 bg-gradient-to-r ${styles.borderGradient} rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
              <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-4 ${styles.glowColor}`}>
                {styles.icon}
              </div>
            </div>
            <div className="ml-6 text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2 animate-slide-in-right">
                {title}
              </h2>
              <p className={`text-2xl md:text-3xl font-bold ${styles.accentColor} animate-slide-in-right`} style={{ animationDelay: '0.2s' }}>
                {subtitle}
              </p>
            </div>
          </div>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            {description}
          </p>
          
          <div className="animate-fade-scale" style={{ animationDelay: '0.6s' }}>
            <span className={`inline-block px-6 py-3 rounded-full text-lg font-bold ${styles.accentColor} bg-white/20 backdrop-blur-md border border-white/30 ${styles.glowColor}`}>
              {cards.length} Cards Available
            </span>
          </div>
        </div>

        {/* Cards Grid with Staggered Animation */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.8s' }}>
          <CardGrid cards={displayCards} />
        </div>

        {/* Show More Button with Amazing Effects */}
        {cards.length > 8 && (
          <div className="text-center mt-12 animate-fade-scale" style={{ animationDelay: '1s' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${styles.buttonGradient} rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
              <div className={`relative bg-gradient-to-r ${styles.buttonGradient} px-8 py-4 rounded-2xl`}>
                {showAll ? 'Show Less' : `View All ${cards.length} Cards`}
                <div className="ml-3 group-hover:rotate-180 transition-transform duration-300">
                  {showAll ? '↑' : '↓'}
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
