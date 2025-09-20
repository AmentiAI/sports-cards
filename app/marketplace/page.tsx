'use client'

import { useState, useEffect } from 'react'
import { SportsCard } from '@/lib/mock-cards'
import MarketplaceCard from '@/components/MarketplaceCard'
import Header from '@/components/Header'
import { cardsService } from '@/lib/cards-service'
import { Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react'

export default function MarketplacePage() {
  const [cards, setCards] = useState<SportsCard[]>([])
  const [filteredCards, setFilteredCards] = useState<SportsCard[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCardType, setSelectedCardType] = useState('')
  const [sortBy, setSortBy] = useState('price_desc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const loadCards = async () => {
      try {
        const allCards = await cardsService.getCards()
        setCards(allCards)
        setFilteredCards(allCards)
      } catch (error) {
        console.error('Error loading cards:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCards()
  }, [])

  useEffect(() => {
    let filtered = [...cards]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(card =>
        card.player.toLowerCase().includes(term) ||
        card.team.toLowerCase().includes(term) ||
        card.name.toLowerCase().includes(term) ||
        card.brand.toLowerCase().includes(term)
      )
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(card => card.category === selectedCategory)
    }

    // Apply card type filter
    if (selectedCardType) {
      filtered = filtered.filter(card => card.cardType === selectedCardType)
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_desc':
        filtered.sort((a, b) => (b.digitalPrice || b.physicalPrice || b.price) - (a.digitalPrice || a.physicalPrice || a.price))
        break
      case 'price_asc':
        filtered.sort((a, b) => (a.digitalPrice || a.physicalPrice || a.price) - (b.digitalPrice || b.physicalPrice || b.price))
        break
      case 'name_asc':
        filtered.sort((a, b) => a.player.localeCompare(b.player))
        break
      case 'name_desc':
        filtered.sort((a, b) => b.player.localeCompare(a.player))
        break
      case 'year_desc':
        filtered.sort((a, b) => b.year - a.year)
        break
      case 'year_asc':
        filtered.sort((a, b) => a.year - b.year)
        break
    }

    setFilteredCards(filtered)
  }, [cards, searchTerm, selectedCategory, selectedCardType, sortBy])

  const categories = ['Baseball', 'Football', 'Basketball']
  const cardTypes = ['digital', 'physical', 'both']

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="gradient-text">Digital Card Marketplace</span>
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            Trade digital cards instantly or have them shipped to you
          </p>
          <div className="text-2xl font-bold text-white">
            {filteredCards.length} Cards Available
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search players, teams..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">All Sports</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'Baseball' && '⚾'} {category === 'Football' && '🏈'} {category === 'Basketball' && '🏀'} {category}
                </option>
              ))}
            </select>

            {/* Card Type Filter */}
            <select
              value={selectedCardType}
              onChange={(e) => setSelectedCardType(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">All Types</option>
              {cardTypes.map(type => (
                <option key={type} value={type} className="capitalize">
                  {type}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
              <option value="year_desc">Year: Newest</option>
              <option value="year_asc">Year: Oldest</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <List size={20} />
              </button>
            </div>

            <div className="text-sm text-slate-400">
              Showing {filteredCards.length} of {cards.length} cards
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-2xl text-slate-300">Loading marketplace...</div>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Cards Found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredCards.map((card) => (
              <MarketplaceCard key={card.id} card={card} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
