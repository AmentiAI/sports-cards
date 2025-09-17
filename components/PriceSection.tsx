'use client'

import { SportsCard } from '@/lib/mock-cards'
import CardGrid from './CardGrid'
import { useState, useEffect, useRef } from 'react'
import { DollarSign, TrendingUp, Crown } from 'lucide-react'

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
          accentColor: 'text-green-400',
          icon: <DollarSign className="text-green-400" size={24} />,
          borderColor: 'border-green-500/20',
          bgColor: 'bg-green-500/5'
        }
      case 'mid':
        return {
          accentColor: 'text-blue-400',
          icon: <TrendingUp className="text-blue-400" size={24} />,
          borderColor: 'border-blue-500/20',
          bgColor: 'bg-blue-500/5'
        }
      case 'premium':
        return {
          accentColor: 'text-purple-400',
          icon: <Crown className="text-purple-400" size={24} />,
          borderColor: 'border-purple-500/20',
          bgColor: 'bg-purple-500/5'
        }
      default:
        return {
          accentColor: 'text-slate-400',
          icon: <DollarSign className="text-slate-400" size={24} />,
          borderColor: 'border-slate-500/20',
          bgColor: 'bg-slate-500/5'
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
      className={`relative mb-16 overflow-hidden rounded-xl border ${styles.borderColor} ${styles.bgColor} backdrop-blur-sm`}
    >
      <div className={`relative p-8 md:p-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Professional Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="glass-effect rounded-lg p-4 mr-4">
              {styles.icon}
            </div>
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {title}
              </h2>
              <p className={`text-xl md:text-2xl font-semibold ${styles.accentColor}`}>
                {subtitle}
              </p>
            </div>
          </div>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-8">
            {description}
          </p>
          
          <div className="inline-block px-4 py-2 rounded-full text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-700">
            {cards.length} Cards Available
          </div>
        </div>

        {/* Cards Grid */}
        <div className="transition-all duration-700 delay-200">
          <CardGrid cards={displayCards} />
        </div>

        {/* Show More Button */}
        {cards.length > 8 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-outline text-sm px-6 py-3"
            >
              {showAll ? 'Show Less' : `View All ${cards.length} Cards`}
              <span className="ml-2">{showAll ? '↑' : '↓'}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}