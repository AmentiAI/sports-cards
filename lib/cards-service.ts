import { DatabaseService } from './database-service'
import { SportsCard } from './mock-cards'

// This service provides a unified interface for fetching cards
// It will try to use the database first, then fall back to mock data if needed
export class CardsService {
  private static useDatabase = true

  static async getCards(filters: {
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    limit?: number
    offset?: number
  } = {}): Promise<SportsCard[]> {
    try {
      if (this.useDatabase) {
        const dbCards = await DatabaseService.getCards(filters)
        return this.convertDbCardsToSportsCards(dbCards)
      }
    } catch (error) {
      console.warn('Database unavailable, falling back to mock data:', error)
      this.useDatabase = false
    }

    // Fallback to mock data
    return this.getMockCards(filters)
  }

  static async getCardById(id: number): Promise<SportsCard | null> {
    try {
      if (this.useDatabase) {
        const dbCard = await DatabaseService.getCardById(id)
        return dbCard ? this.convertDbCardToSportsCard(dbCard) : null
      }
    } catch (error) {
      console.warn('Database unavailable, falling back to mock data:', error)
      this.useDatabase = false
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
      if (this.useDatabase) {
        return await DatabaseService.getCardCountByCategory(category)
      }
    } catch (error) {
      console.warn('Database unavailable, falling back to mock data:', error)
      this.useDatabase = false
    }

    // Fallback to mock data
    const { mockCards } = await import('./mock-cards')
    if (category) {
      return mockCards.filter(card => card.category === category).length
    }
    return mockCards.length
  }

  // Convert database cards to SportsCard format
  private static convertDbCardsToSportsCards(dbCards: any[]): SportsCard[] {
    return dbCards.map(dbCard => this.convertDbCardToSportsCard(dbCard))
  }

  private static convertDbCardToSportsCard(dbCard: any): SportsCard {
    return {
      id: dbCard.id,
      name: dbCard.name,
      player: dbCard.player,
      team: dbCard.team,
      year: dbCard.year,
      brand: dbCard.brand,
      set: dbCard.set,
      cardNumber: dbCard.cardNumber,
      category: dbCard.category,
      condition: dbCard.condition,
      price: parseFloat(dbCard.price),
      description: dbCard.description,
      imageUrl: dbCard.imageUrl,
      backImageUrl: dbCard.backImageUrl,
      isSold: dbCard.isSold
    }
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

