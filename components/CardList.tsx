'use client'

import { SportsCard } from '@/lib/mock-cards'
import { Edit, Trash2, Eye, DollarSign } from 'lucide-react'
import Image from 'next/image'

interface CardListProps {
  cards: SportsCard[]
  onEdit: (card: SportsCard) => void
  onDelete: (id: number) => void
}

export default function CardList({ cards, onEdit, onDelete }: CardListProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Mint': return 'text-green-600 bg-green-100'
      case 'Near Mint': return 'text-green-700 bg-green-200'
      case 'Excellent': return 'text-blue-600 bg-blue-100'
      case 'Very Good': return 'text-yellow-600 bg-yellow-100'
      case 'Good': return 'text-orange-600 bg-orange-100'
      case 'Fair': return 'text-red-600 bg-red-100'
      case 'Poor': return 'text-red-700 bg-red-200'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriceRange = (price: number) => {
    if (price < 20) return { label: 'Budget', color: 'text-green-600 bg-green-100' }
    if (price < 100) return { label: 'Mid-Range', color: 'text-blue-600 bg-blue-100' }
    return { label: 'Premium', color: 'text-purple-600 bg-purple-100' }
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Cards Yet</h3>
        <p className="text-gray-500">Add your first sports card to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const priceRange = getPriceRange(card.price)
        
        return (
          <div
            key={card.id}
            className={`admin-card ${card.isSold ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start space-x-4">
              {/* Card Image */}
              <div className="w-24 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                {card.imageUrl ? (
                  <Image
                    src={card.imageUrl}
                    alt={card.name}
                    width={96}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-2xl mb-1">🏈</div>
                    <p className="text-xs">No Image</p>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-vintage mb-1">
                      {card.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {card.player} • {card.team} • {card.year}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {card.brand} {card.set} #{card.cardNumber}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getConditionColor(card.condition)}`}>
                        {card.condition}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priceRange.color}`}>
                        {priceRange.label}
                      </span>
                      {card.isSold && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold text-red-600 bg-red-100">
                          SOLD
                        </span>
                      )}
                    </div>

                    {card.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {card.description}
                      </p>
                    )}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex flex-col items-end space-y-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-card-red">
                        ${card.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        {card.isSold ? 'Sold' : 'Available'}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(`/card/${card.id}`, '_blank')}
                        className="p-2 text-gray-600 hover:text-card-blue hover:bg-card-blue/10 rounded-lg transition-colors"
                        title="View Card"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => onEdit(card)}
                        className="p-2 text-gray-600 hover:text-card-gold hover:bg-card-gold/10 rounded-lg transition-colors"
                        title="Edit Card"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(card.id!)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Card"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
