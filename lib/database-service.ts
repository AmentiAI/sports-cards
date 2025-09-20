import pool from './db'
import { SportsCard } from './mock-cards'

export interface DatabaseCard {
  id: number
  name: string
  player: string
  team: string
  year: number
  brand: string
  set: string
  cardNumber: string
  category: 'Baseball' | 'Football' | 'Basketball'
  condition: 'Mint' | 'Near Mint' | 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor'
  price: number
  description: string
  imageUrl?: string
  backImageUrl?: string
  isSold: boolean
  createdAt: Date
  updatedAt: Date
}

export class DatabaseService {
  // Get all cards with optional filters
  static async getCards(filters: {
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    limit?: number
    offset?: number
  } = {}): Promise<DatabaseCard[]> {
    try {
      let query = `
        SELECT 
          id, name, player, team, year, brand, set_name as "set", 
          card_number as "cardNumber", category, condition, price, 
          description, image_url as "imageUrl", back_image_url as "backImageUrl", 
          is_sold as "isSold", created_at as "createdAt", updated_at as "updatedAt"
        FROM sports_cards 
        WHERE 1=1
      `
      const params: any[] = []
      let paramCount = 0

      if (filters.category) {
        paramCount++
        query += ` AND category = $${paramCount}`
        params.push(filters.category)
      }

      if (filters.search) {
        paramCount++
        query += ` AND (
          LOWER(player) LIKE $${paramCount} OR 
          LOWER(team) LIKE $${paramCount} OR 
          LOWER(name) LIKE $${paramCount} OR 
          LOWER(brand) LIKE $${paramCount} OR 
          LOWER(set_name) LIKE $${paramCount}
        )`
        params.push(`%${filters.search.toLowerCase()}%`)
      }

      if (filters.minPrice) {
        paramCount++
        query += ` AND price >= $${paramCount}`
        params.push(filters.minPrice)
      }

      if (filters.maxPrice) {
        paramCount++
        query += ` AND price <= $${paramCount}`
        params.push(filters.maxPrice)
      }

      query += ` ORDER BY price DESC`

      if (filters.limit) {
        paramCount++
        query += ` LIMIT $${paramCount}`
        params.push(filters.limit)
      }

      if (filters.offset) {
        paramCount++
        query += ` OFFSET $${paramCount}`
        params.push(filters.offset)
      }

      const result = await pool.query(query, params)
      return result.rows

    } catch (error) {
      console.error('Error fetching cards from database:', error)
      return []
    }
  }

  // Get a single card by ID
  static async getCardById(id: number): Promise<DatabaseCard | null> {
    try {
      const query = `
        SELECT 
          id, name, player, team, year, brand, set_name as "set", 
          card_number as "cardNumber", category, condition, price, 
          description, image_url as "imageUrl", back_image_url as "backImageUrl", 
          is_sold as "isSold", created_at as "createdAt", updated_at as "updatedAt"
        FROM sports_cards 
        WHERE id = $1
      `
      
      const result = await pool.query(query, [id])
      return result.rows[0] || null

    } catch (error) {
      console.error('Error fetching card by ID:', error)
      return null
    }
  }

  // Get cards by category
  static async getCardsByCategory(category: string): Promise<DatabaseCard[]> {
    return this.getCards({ category })
  }

  // Search cards
  static async searchCards(searchTerm: string): Promise<DatabaseCard[]> {
    return this.getCards({ search: searchTerm })
  }

  // Get featured cards (most expensive)
  static async getFeaturedCards(limit: number = 6): Promise<DatabaseCard[]> {
    return this.getCards({ limit })
  }

  // Get card count by category
  static async getCardCountByCategory(category?: string): Promise<number> {
    try {
      let query = 'SELECT COUNT(*) FROM sports_cards'
      const params: any[] = []

      if (category) {
        query += ' WHERE category = $1'
        params.push(category)
      }

      const result = await pool.query(query, params)
      return parseInt(result.rows[0].count)

    } catch (error) {
      console.error('Error getting card count:', error)
      return 0
    }
  }

  // Add card to database
  static async addCard(card: Omit<DatabaseCard, 'id' | 'createdAt' | 'updatedAt'>): Promise<DatabaseCard | null> {
    try {
      const query = `
        INSERT INTO sports_cards (
          name, player, team, year, brand, set_name, card_number,
          category, condition, price, description, image_url, back_image_url, is_sold
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING 
          id, name, player, team, year, brand, set_name as "set", 
          card_number as "cardNumber", category, condition, price, 
          description, image_url as "imageUrl", back_image_url as "backImageUrl", 
          is_sold as "isSold", created_at as "createdAt", updated_at as "updatedAt"
      `

      const result = await pool.query(query, [
        card.name, card.player, card.team, card.year, card.brand, card.set,
        card.cardNumber, card.category, card.condition, card.price,
        card.description, card.imageUrl || null, card.backImageUrl || null, card.isSold
      ])

      return result.rows[0]

    } catch (error) {
      console.error('Error adding card:', error)
      return null
    }
  }

  // Update card
  static async updateCard(id: number, updates: Partial<DatabaseCard>): Promise<DatabaseCard | null> {
    try {
      const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt')
      const setClause = fields.map((field, index) => {
        const dbField = field === 'set' ? 'set_name' : 
                       field === 'cardNumber' ? 'card_number' :
                       field === 'imageUrl' ? 'image_url' :
                       field === 'backImageUrl' ? 'back_image_url' :
                       field === 'isSold' ? 'is_sold' : field
        return `${dbField} = $${index + 2}`
      }).join(', ')

      const query = `
        UPDATE sports_cards 
        SET ${setClause}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING 
          id, name, player, team, year, brand, set_name as "set", 
          card_number as "cardNumber", category, condition, price, 
          description, image_url as "imageUrl", back_image_url as "backImageUrl", 
          is_sold as "isSold", created_at as "createdAt", updated_at as "updatedAt"
      `

      const values = [id, ...fields.map(field => updates[field as keyof DatabaseCard])]
      const result = await pool.query(query, values)

      return result.rows[0] || null

    } catch (error) {
      console.error('Error updating card:', error)
      return null
    }
  }

  // Delete card
  static async deleteCard(id: number): Promise<boolean> {
    try {
      const query = 'DELETE FROM sports_cards WHERE id = $1'
      const result = await pool.query(query, [id])
      
      return (result.rowCount || 0) > 0

    } catch (error) {
      console.error('Error deleting card:', error)
      return false
    }
  }
}

