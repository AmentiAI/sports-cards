'use client'

import { useState, useEffect } from 'react'
import { SportsCard } from '@/lib/mock-cards'
import CardGrid from '@/components/CardGrid'
import Header from '@/components/Header'
import SearchFilter from '@/components/SearchFilter'
import { cardsService } from '@/lib/cards-service'

export default function FootballPage() {
  const [footballCards, setFootballCards] = useState<SportsCard[]>([])
  const [filteredCards, setFilteredCards] = useState<SportsCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCards = async () => {
      try {
        const cards = await cardsService.getCardsByCategory('Football')
        setFootballCards(cards)
        setFilteredCards(cards)
      } catch (error) {
        console.error('Error loading football cards:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCards()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="gradient-text">Football Cards</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Legendary football cards from the 90s gridiron
          </p>
          <div className="text-2xl font-bold text-white mb-4">
            {filteredCards.length} Cards Available
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="text-2xl text-slate-300">Loading football cards...</div>
          </div>
        ) : (
          <>
            <SearchFilter 
              cards={footballCards}
              onFilteredCards={setFilteredCards}
              placeholder="Search football players, teams, or cards..."
              category="Football"
            />

            <CardGrid cards={filteredCards} />
          </>
        )}
      </main>
    </div>
  )
}

