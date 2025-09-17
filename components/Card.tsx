'use client'

import { SportsCard } from '@/lib/mock-cards'
import { ShoppingCart, Eye, Star, Crown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import toast from 'react-hot-toast'

interface CardProps {
  card: SportsCard
}

export default function Card({ card }: CardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    if (card.isSold) {
      toast.error('This card is no longer available')
      return
    }

    setIsLoading(true)
    try {
      await addToCart(card, 1)
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setIsLoading(false)
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Mint': return 'text-green-600 bg-green-100 border-green-300'
      case 'Near Mint': return 'text-green-700 bg-green-200 border-green-400'
      case 'Excellent': return 'text-blue-600 bg-blue-100 border-blue-300'
      case 'Very Good': return 'text-yellow-600 bg-yellow-100 border-yellow-300'
      case 'Good': return 'text-orange-600 bg-orange-100 border-orange-300'
      case 'Fair': return 'text-red-600 bg-red-100 border-red-300'
      case 'Poor': return 'text-red-700 bg-red-200 border-red-400'
      default: return 'text-gray-600 bg-gray-100 border-gray-300'
    }
  }

  const getPriceRange = (price: number) => {
    if (price < 20) return { color: 'text-green-400', glow: 'shadow-neon-green' }
    if (price < 100) return { color: 'text-blue-400', glow: 'shadow-neon-blue' }
    return { color: 'text-purple-400', glow: 'shadow-neon-gold' }
  }

  const priceStyle = getPriceRange(card.price)

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-card-red via-card-gold to-card-blue rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-500 ${isHovered ? 'opacity-75' : ''}`}></div>
      
      <div className="relative card-container p-6 card-hover">
        {/* Card Image with 3D Effect */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-2xl mb-6 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
          {card.imageUrl ? (
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="text-center text-gray-500 group-hover:text-gray-700 transition-colors">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🏈</div>
              <p className="text-sm font-semibold">No Image Available</p>
            </div>
          )}
          
          {/* Condition Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getConditionColor(card.condition)} backdrop-blur-sm`}>
              {card.condition}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          
          {/* Action Buttons on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-3">
              <Link href={`/card/${card.id}`}>
                <button className="p-3 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-card-blue hover:bg-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                  <Eye size={20} />
                </button>
              </Link>
              <button
                onClick={handleAddToCart}
                disabled={isLoading || card.isSold}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                  card.isSold
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-card-red text-white hover:bg-card-red/90 hover:shadow-neon-red'
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <ShoppingCart size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Card Details */}
        <div className="space-y-3">
          <h3 className="font-black text-xl text-vintage group-hover:text-card-red transition-colors duration-300 line-clamp-2">
            {card.name}
          </h3>
          
          <div className="space-y-1">
            <p className="text-gray-600 font-semibold text-sm">
              {card.player} • {card.team}
            </p>
            <p className="text-gray-500 text-sm">
              {card.year} {card.brand} #{card.cardNumber}
            </p>
          </div>
          
          {/* Price with Glow Effect */}
          <div className="flex items-center justify-between pt-2">
            <div className="relative">
              <span className={`text-3xl font-black ${priceStyle.color} ${priceStyle.glow}`}>
                ${card.price}
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-card-red to-card-gold rounded-lg blur opacity-20"></div>
            </div>
            
            {/* Rating Stars */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'} group-hover:scale-110 transition-transform duration-300`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Sold Badge */}
          {card.isSold && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
              SOLD
            </div>
          )}

          {/* Premium Badge for High-Value Cards */}
          {card.price >= 100 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg flex items-center">
              <Crown size={12} className="mr-1" />
              PREMIUM
            </div>
          )}
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  )
}
