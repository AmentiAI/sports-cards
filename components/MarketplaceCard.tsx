'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, ShoppingCart, Heart, Share2, Package, Smartphone } from 'lucide-react'
import { SportsCard } from '@/lib/mock-cards'

interface MarketplaceCardProps {
  card: SportsCard
}

export default function MarketplaceCard({ card }: MarketplaceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async (cardType: 'digital' | 'physical') => {
    setIsLoading(true)
    try {
      // TODO: Implement cart functionality for digital/physical cards
      console.log(`Adding ${cardType} card to cart:`, card.name)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message
      alert(`${card.name} (${cardType}) added to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddBothToCart = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement cart functionality for both digital and physical cards
      console.log(`Adding both digital and physical card to cart:`, card.name)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message
      alert(`${card.name} (both formats) added to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCardTypeIcon = () => {
    switch (card.cardType) {
      case 'digital':
        return <Smartphone className="w-4 h-4" />
      case 'physical':
        return <Package className="w-4 h-4" />
      case 'both':
        return (
          <div className="flex space-x-1">
            <Smartphone className="w-3 h-3" />
            <Package className="w-3 h-3" />
          </div>
        )
      default:
        return null
    }
  }

  const getStatusColor = () => {
    switch (card.status) {
      case 'available':
        return 'bg-green-600'
      case 'listed':
        return 'bg-blue-600'
      case 'sold':
        return 'bg-red-600'
      case 'shipped':
        return 'bg-yellow-600'
      case 'delivered':
        return 'bg-gray-600'
      default:
        return 'bg-gray-600'
    }
  }

  return (
    <div
      className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {getCardTypeIcon()}
            <span className="text-xs text-slate-400 capitalize">{card.cardType}</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()} text-white`}>
            {card.status}
          </div>
        </div>

        {/* Card Image */}
        <div className="relative aspect-[3/4] bg-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {card.imageUrl ? (
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-slate-400 text-4xl">🏈</div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Action Buttons on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <Link href={`/card/${card.id}`}>
                <button className="p-2 md:p-3 bg-white/90 text-slate-700 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-300 hover:scale-110 shadow-lg touch-manipulation">
                  <Eye size={16} className="md:w-5 md:h-5" />
                </button>
              </Link>
              <button className="p-2 md:p-3 bg-slate-700 text-white hover:bg-slate-600 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg touch-manipulation">
                <Heart size={16} className="md:w-5 md:h-5" />
              </button>
              <button className="p-2 md:p-3 bg-slate-700 text-white hover:bg-slate-600 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg touch-manipulation">
                <Share2 size={16} className="md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{card.name}</h3>
          <p className="text-slate-400 text-sm mb-2">{card.player} • {card.team}</p>
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>{card.year} • {card.brand}</span>
            <span className="capitalize">{card.condition}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          {card.cardType === 'both' ? (
            <div className="space-y-2">
              {card.digitalPrice && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-400">Digital</span>
                  </div>
                  <span className="text-lg font-bold text-blue-400">${card.digitalPrice.toFixed(2)}</span>
                </div>
              )}
              {card.physicalPrice && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-slate-400">Physical</span>
                  </div>
                  <span className="text-lg font-bold text-green-400">${card.physicalPrice.toFixed(2)}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <span className="text-2xl font-bold text-white">
                ${(card.digitalPrice || card.physicalPrice || card.price).toFixed(2)}
              </span>
              <p className="text-xs text-slate-400 capitalize">{card.cardType}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {card.status === 'available' && (
            <>
              {card.cardType === 'both' ? (
                <>
                  {card.digitalPrice && (
                    <button
                      onClick={() => handleAddToCart('digital')}
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <Smartphone size={16} />
                      <span>Buy Digital</span>
                    </button>
                  )}
                  {card.physicalPrice && (
                    <button
                      onClick={() => handleAddToCart('physical')}
                      disabled={isLoading}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <Package size={16} />
                      <span>Buy Physical</span>
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    if (card.cardType === 'both') {
                      handleAddBothToCart()
                    } else {
                      handleAddToCart(card.cardType)
                    }
                  }}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
              )}
            </>
          )}
          
          {card.status === 'sold' && (
            <div className="w-full bg-red-600 text-white py-2 px-4 rounded-lg text-center">
              Sold
            </div>
          )}
        </div>

        {/* Owner Info */}
        {card.currentOwnerId && (
          <div className="mt-3 pt-3 border-t border-slate-700">
            <p className="text-xs text-slate-400">Owned by: User #{card.currentOwnerId}</p>
          </div>
        )}
      </div>
    </div>
  )
}
