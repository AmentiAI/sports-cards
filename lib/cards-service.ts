import { SportsCard } from './mock-cards'

// This service provides a unified interface for fetching cards
// It uses API routes for database operations to avoid client-side Node.js dependencies
export class CardsService {
  static async getCards(filters: {
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    limit?: number
    offset?: number
  } = {}): Promise<SportsCard[]> {
    try {
      // Use API route for database operations
      const params = new URLSearchParams()
      if (filters.category) params.append('category', filters.category)
      if (filters.search) params.append('search', filters.search)
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString())
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
      if (filters.limit) params.append('limit', filters.limit.toString())
      if (filters.offset) params.append('offset', filters.offset.toString())

      const response = await fetch(`/api/cards?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          return data.data
        }
      }
    } catch (error) {
      console.warn('API unavailable, falling back to mock data:', error)
    }

    // Fallback to mock data
    return this.getMockCards(filters)
  }

  static async getCardById(id: number): Promise<SportsCard | null> {
    try {
      const response = await fetch(`/api/cards/${id}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          return data.data
        }
      }
    } catch (error) {
      console.warn('API unavailable, falling back to mock data:', error)
    }

    // Fallback to mock data
    const { mockCards } = await import('./mock-cards')
    return mockCards.find(card => card.id === id) || null
  }

  static async getCardsByCategory(category: string): Promise<SportsCard[]> {
    return this.getCards({ category })
  }

  static async searchCards(searchTerm: string): Promise<SportsCard[]> {
    return this.getCards({ search: searchTerm })
  }

  static async getFeaturedCards(limit: number = 6): Promise<SportsCard[]> {
    return this.getCards({ limit })
  }

  static async getCardCountByCategory(category?: string): Promise<number> {
    try {
      const params = new URLSearchParams()
      if (category) params.append('category', category)
      params.append('count', 'true')

      const response = await fetch(`/api/cards?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          return data.count || 0
        }
      }
    } catch (error) {
      console.warn('API unavailable, falling back to mock data:', error)
    }

    // Fallback to mock data
    const { mockCards } = await import('./mock-cards')
    if (category) {
      return mockCards.filter(card => card.category === category).length
    }
    return mockCards.length
  }


  // Fallback to mock data
  private static async getMockCards(filters: {
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    limit?: number
    offset?: number
  } = {}): Promise<SportsCard[]> {
    const { mockCards } = await import('./mock-cards')
    let filteredCards = [...mockCards]

    // Apply filters
    if (filters.category) {
      filteredCards = filteredCards.filter(card => card.category === filters.category)
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredCards = filteredCards.filter(card =>
        card.player.toLowerCase().includes(searchTerm) ||
        card.team.toLowerCase().includes(searchTerm) ||
        card.name.toLowerCase().includes(searchTerm) ||
        card.brand.toLowerCase().includes(searchTerm) ||
        card.set.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.minPrice) {
      filteredCards = filteredCards.filter(card => card.price >= filters.minPrice!)
    }

    if (filters.maxPrice) {
      filteredCards = filteredCards.filter(card => card.price <= filters.maxPrice!)
    }

    // Sort by price (highest first)
    filteredCards.sort((a, b) => b.price - a.price)

    // Apply pagination
    if (filters.offset) {
      filteredCards = filteredCards.slice(filters.offset)
    }

    if (filters.limit) {
      filteredCards = filteredCards.slice(0, filters.limit)
    }

    return filteredCards
  }
}

// Export a default instance for easy use
export const cardsService = CardsService

