'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { X, ArrowRight, DollarSign, Package, Users } from 'lucide-react'
import { SportsCard } from '@/lib/mock-cards'

interface TradeOfferModalProps {
  isOpen: boolean
  onClose: () => void
  targetCard: SportsCard
  userCards: SportsCard[]
  onSuccess: () => void
}

export default function TradeOfferModal({ 
  isOpen, 
  onClose, 
  targetCard, 
  userCards, 
  onSuccess 
}: TradeOfferModalProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCard, setSelectedCard] = useState<SportsCard | null>(null)
  const [additionalCash, setAdditionalCash] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCard) return

    setIsLoading(true)

    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch('/api/marketplace/trade-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: targetCard.currentOwnerId,
          offeredCardId: selectedCard.id,
          requestedCardId: targetCard.id,
          additionalCash: additionalCash ? parseFloat(additionalCash) : 0
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        onSuccess()
        onClose()
        setSelectedCard(null)
        setAdditionalCash('')
      }
    } catch (error) {
      console.error('Error creating trade offer:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Make a Trade Offer</h2>
          <p className="text-slate-400">Propose a trade for this card</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Your Card Selection */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Your Card</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {userCards.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-400">No cards available for trade</p>
                </div>
              ) : (
                userCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCard?.id === card.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                        <span className="text-slate-400 text-xs font-bold">CARD</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm truncate">{card.name}</h4>
                        <p className="text-slate-400 text-xs">{card.player} • {card.year}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                            {card.category}
                          </span>
                          <span className="bg-green-600/20 text-green-300 px-2 py-1 rounded-full text-xs">
                            {card.condition}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Trade Arrow */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-slate-400 text-sm">Trade</span>
            </div>
          </div>

          {/* Target Card */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Target Card</h3>
            <div className="p-4 rounded-lg border-2 border-slate-600">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                  <span className="text-slate-400 text-xs font-bold">CARD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate">{targetCard.name}</h4>
                  <p className="text-slate-400 text-xs">{targetCard.player} • {targetCard.year}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                      {targetCard.category}
                    </span>
                    <span className="bg-green-600/20 text-green-300 px-2 py-1 rounded-full text-xs">
                      {targetCard.condition}
                    </span>
                  </div>
                  <div className="mt-2">
                    {targetCard.digitalPrice && (
                      <span className="text-green-400 text-sm font-medium">
                        Digital: ${targetCard.digitalPrice}
                      </span>
                    )}
                    {targetCard.physicalPrice && (
                      <span className="text-blue-400 text-sm font-medium ml-2">
                        Physical: ${targetCard.physicalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Cash */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Additional Cash (Optional)
          </label>
          <div className="relative">
            <input
              type="number"
              value={additionalCash}
              onChange={(e) => setAdditionalCash(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">USD</span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Add cash to make your offer more attractive
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedCard || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <Users size={16} />
              <span>Send Trade Offer</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
