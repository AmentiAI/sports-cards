'use client'

import { SportsCard } from '@/lib/mock-cards'
import { Eye, Star, Crown, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface CardProps {
  card: SportsCard
}

export default function Card({ card }: CardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Mint': return 'condition-badge bg-green-600'
      case 'Near Mint': return 'condition-badge bg-green-700'
      case 'Excellent': return 'condition-badge bg-blue-600'
      case 'Very Good': return 'condition-badge bg-yellow-600'
      case 'Good': return 'condition-badge bg-orange-600'
      case 'Fair': return 'condition-badge bg-red-600'
      case 'Poor': return 'condition-badge bg-red-700'
      default: return 'condition-badge bg-slate-600'
    }
  }

  const getPriceRange = (price: number) => {
    if (price < 20) return 'text-green-400'
    if (price < 100) return 'text-blue-400'
    return 'text-purple-400'
  }

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-container p-6 card-hover">
        {/* Card Image */}
        <div className="relative aspect-[3/4] bg-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
          {card.imageUrl ? (
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-center text-slate-400">
              <div className="text-4xl mb-2">🏈</div>
              <p className="text-sm font-medium">No Image</p>
            </div>
          )}
          
          {/* Condition Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getConditionColor(card.condition)}`}>
              {card.condition}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Action Buttons on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <Link href={`/card/${card.id}`}>
                <button className="p-2 bg-white/90 text-slate-700 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-300 hover:scale-110 shadow-lg">
                  <Eye size={18} />
                </button>
              </Link>
              <button
                className="p-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg"
                title="Contact for purchase"
              >
                <DollarSign size={18} />
              </button>
            </div>
          </div>

          {/* Sold Badge */}
          {card.isSold && (
            <div className="absolute top-3 left-3 sold-badge">
              SOLD
            </div>
          )}

          {/* Premium Badge for High-Value Cards */}
          {card.price >= 100 && (
            <div className="absolute top-3 left-3 premium-badge">
              <Crown size={12} className="mr-1" />
              PREMIUM
            </div>
          )}
        </div>

        {/* Card Details */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            {card.name}
          </h3>
          
          <div className="space-y-1">
            <p className="text-slate-300 font-medium text-sm">
              {card.player} • {card.team}
            </p>
            <p className="text-slate-400 text-sm">
              {card.year} {card.brand} #{card.cardNumber}
            </p>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <span className={`text-2xl font-bold ${getPriceRange(card.price)}`}>
              ${card.price.toLocaleString()}
            </span>
            
            {/* Rating Stars */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-slate-500'} group-hover:scale-110 transition-transform duration-300`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}