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
    if (price < 20) return { label: 'Budget', color: 'text-green-400 bg-green-600/20' }
    if (price < 100) return { label: 'Mid-Range', color: 'text-blue-400 bg-blue-600/20' }
    return { label: 'Premium', color: 'text-purple-400 bg-purple-600/20' }
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">No Cards Yet</h3>
        <p className="text-slate-400">Add your first sports card to get started!</p>
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
              <div className="w-20 h-28 bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                {card.imageUrl ? (
                  <Image
                    src={card.imageUrl}
                    alt={card.name}
                    width={80}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <div className="text-2xl mb-1">🏈</div>
                    <p className="text-xs">No Image</p>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {card.name}
                    </h3>
                    <p className="text-slate-300 text-sm mb-2">
                      {card.player} • {card.team} • {card.year}
                    </p>
                    <p className="text-xs text-slate-400 mb-3">
                      {card.brand} {card.set} #{card.cardNumber}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getConditionColor(card.condition)}`}>
                        {card.condition}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${priceRange.color}`}>
                        {priceRange.label}
                      </span>
                      {card.isSold && (
                        <span className="sold-badge text-xs">
                          SOLD
                        </span>
                      )}
                    </div>

                    {card.description && (
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {card.description}
                      </p>
                    )}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex flex-col items-end space-y-3">
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-400">
                        ${card.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-400">
                        {card.isSold ? 'Sold' : 'Available'}
                      </div>
                    </div>

                    <div className="flex space-x-1">
                      <button
                        onClick={() => window.open(`/card/${card.id}`, '_blank')}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-600/20 rounded-lg transition-colors"
                        title="View Card"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(card)}
                        className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-600/20 rounded-lg transition-colors"
                        title="Edit Card"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(card.id!)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-600/20 rounded-lg transition-colors"
                        title="Delete Card"
                      >
                        <Trash2 size={16} />
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