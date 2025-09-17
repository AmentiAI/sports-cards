'use client'

import { SportsCard } from '@/lib/mock-cards'
import Card from './Card'

interface CardGridProps {
  cards: SportsCard[]
}

export default function CardGrid({ cards }: CardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏈</div>
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Cards Available</h3>
        <p className="text-gray-500">Check back soon for new additions to our collection!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}
