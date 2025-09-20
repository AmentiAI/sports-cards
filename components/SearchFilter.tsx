'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { SportsCard } from '@/lib/mock-cards'
import { cardsService } from '@/lib/cards-service'

interface SearchFilterProps {
  cards: SportsCard[]
  onFilteredCards: (filteredCards: SportsCard[]) => void
  placeholder?: string
  category?: string // Add category prop for database searches
}

export default function SearchFilter({ cards, onFilteredCards, placeholder = "Search by player name, team, or sport...", category }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSport, setSelectedSport] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  // Get unique sports from cards
  const sports = Array.from(new Set(cards.map(card => card.category))).sort()

  // Debounced search effect
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (searchTerm.length >= 2) {
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch(searchTerm)
      }, 300) // 300ms debounce
    } else if (searchTerm.length === 0) {
      // Clear search immediately when input is empty
      handleSearch('')
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchTerm, selectedSport])

  const handleSearch = useCallback(async (term: string) => {
    await filterCards(term, selectedSport)
  }, [selectedSport])

  const handleSportFilter = useCallback(async (sport: string) => {
    setSelectedSport(sport)
    await filterCards(searchTerm, sport)
  }, [searchTerm])

  const filterCards = async (term: string, sport: string) => {
    setIsSearching(true)
    
    try {
      // If we have a search term, try to search the database for more comprehensive results
      if (term.trim() && term.length >= 2) {
        console.log('🔍 Searching database for:', term)
        
        // Use database service to search
        const searchResults = await cardsService.searchCards(term)
        
        // If we're on a category page, filter by that category
        let filteredResults = searchResults
        if (category) {
          filteredResults = searchResults.filter(card => card.category === category)
        }
        
        // Apply sport filter if selected
        if (sport) {
          filteredResults = filteredResults.filter(card => card.category === sport)
        }
        
        console.log('📊 Database search results:', filteredResults.length)
        onFilteredCards(filteredResults)
      } else {
        // No search term, filter the existing cards
        let filtered = cards

        // Filter by sport
        if (sport) {
          filtered = filtered.filter(card => card.category === sport)
        }

        onFilteredCards(filtered)
      }
    } catch (error) {
      console.error('Search error:', error)
      // Fallback to client-side filtering
      let filtered = cards

      if (term.trim()) {
        const searchTermLower = term.toLowerCase().trim()
        filtered = filtered.filter(card =>
          card.player.toLowerCase().includes(searchTermLower) ||
          card.team.toLowerCase().includes(searchTermLower) ||
          card.category.toLowerCase().includes(searchTermLower) ||
          card.name.toLowerCase().includes(searchTermLower) ||
          card.brand.toLowerCase().includes(searchTermLower) ||
          card.set.toLowerCase().includes(searchTermLower) ||
          card.cardNumber.toLowerCase().includes(searchTermLower)
        )
      }

      if (sport) {
        filtered = filtered.filter(card => card.category === sport)
      }

      onFilteredCards(filtered)
    } finally {
      setIsSearching(false)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedSport('')
    onFilteredCards(cards)
  }

  const hasActiveFilters = searchTerm || selectedSport

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-4 md:mb-6 px-4">
        <div className="relative">
          {isSearching ? (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5" />
          )}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-12 py-3 md:py-4 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-sm md:text-base"
          />
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors touch-manipulation p-1"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-center mb-4 px-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-all duration-300 touch-manipulation"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm md:text-base">Filter by Sport</span>
          {selectedSport && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {selectedSport}
            </span>
          )}
        </button>
      </div>

      {/* Sport Filters */}
      {isFilterOpen && (
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4 md:mb-6 px-4">
          <button
            onClick={() => handleSportFilter('')}
            className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 touch-manipulation ${
              !selectedSport
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            All Sports
          </button>
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => handleSportFilter(sport)}
              className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 touch-manipulation ${
                selectedSport === sport
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
              }`}
            >
              {sport === 'Baseball' && '⚾'} {sport === 'Football' && '🏈'} {sport === 'Basketball' && '🏀'} {sport}
            </button>
          ))}
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg">
            <span className="text-slate-300 text-sm">Active filters:</span>
            {searchTerm && (
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedSport && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                Sport: {selectedSport}
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-slate-400 hover:text-white transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
