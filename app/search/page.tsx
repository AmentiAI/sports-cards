'use client'

import { useState } from 'react'
import { mockCards, SportsCard } from '@/lib/mock-cards'
import CardGrid from '@/components/CardGrid'
import Header from '@/components/Header'
import SearchFilter from '@/components/SearchFilter'
import { Search, TrendingUp, Star } from 'lucide-react'

export default function SearchPage() {
  const [filteredCards, setFilteredCards] = useState<SportsCard[]>(mockCards)

  // Get popular players for suggestions
  const popularPlayers = Array.from(new Set(mockCards.map(card => card.player)))
    .slice(0, 8)

  // Get popular teams for suggestions
  const popularTeams = Array.from(new Set(mockCards.map(card => card.team)))
    .slice(0, 8)

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="gradient-text">Search Cards</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Find any player, team, or card from our collection
          </p>
          <div className="text-2xl font-bold text-white mb-4">
            {filteredCards.length} Cards Found
          </div>
        </div>

        {/* Search Component */}
        <SearchFilter 
          cards={mockCards}
          onFilteredCards={setFilteredCards}
          placeholder="Search by player name, team, sport, brand, or card name..."
        />

        {/* Popular Searches */}
        {filteredCards.length === mockCards.length && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Popular Searches</h2>
              <p className="text-slate-400">Try searching for these popular players and teams</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Popular Players */}
              <div className="glass-effect rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Popular Players</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularPlayers.map((player) => (
                    <button
                      key={player}
                      onClick={() => {
                        // This would trigger a search for the player
                        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
                        if (searchInput) {
                          searchInput.value = player
                          searchInput.dispatchEvent(new Event('input', { bubbles: true }))
                        }
                      }}
                      className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-full text-sm transition-all duration-300"
                    >
                      {player}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Teams */}
              <div className="glass-effect rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Popular Teams</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTeams.map((team) => (
                    <button
                      key={team}
                      onClick={() => {
                        // This would trigger a search for the team
                        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
                        if (searchInput) {
                          searchInput.value = team
                          searchInput.dispatchEvent(new Event('input', { bubbles: true }))
                        }
                      }}
                      className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-full text-sm transition-all duration-300"
                    >
                      {team}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {filteredCards.length > 0 ? (
          <CardGrid cards={filteredCards} />
        ) : (
          <div className="text-center py-16">
            <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
              <Search className="w-20 h-20 text-slate-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">No Cards Found</h2>
              <p className="text-slate-400 mb-8">
                Try adjusting your search terms or browse by sport categories
              </p>
              <div className="space-y-3">
                <a href="/baseball" className="block btn-outline">
                  Browse Baseball Cards
                </a>
                <a href="/football" className="block btn-outline">
                  Browse Football Cards
                </a>
                <a href="/basketball" className="block btn-outline">
                  Browse Basketball Cards
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

