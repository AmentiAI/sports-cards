import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    let query = `
      SELECT 
        id, name, player, team, year, brand, set_name as "set", 
        card_number as "cardNumber", category, condition, price, 
        description, image_url as "imageUrl", back_image_url as "backImageUrl", 
        is_sold as "isSold", created_at, updated_at
      FROM sports_cards 
      WHERE 1=1
    `
    const params: any[] = []
    let paramCount = 0

    // Add filters
    if (category) {
      paramCount++
      query += ` AND category = $${paramCount}`
      params.push(category)
    }

    if (search) {
      paramCount++
      query += ` AND (
        LOWER(player) LIKE $${paramCount} OR 
        LOWER(team) LIKE $${paramCount} OR 
        LOWER(name) LIKE $${paramCount} OR 
        LOWER(brand) LIKE $${paramCount} OR 
        LOWER(set_name) LIKE $${paramCount}
      )`
      params.push(`%${search.toLowerCase()}%`)
    }

    if (minPrice) {
      paramCount++
      query += ` AND price >= $${paramCount}`
      params.push(parseFloat(minPrice))
    }

    if (maxPrice) {
      paramCount++
      query += ` AND price <= $${paramCount}`
      params.push(parseFloat(maxPrice))
    }

    // Add ordering and pagination
    query += ` ORDER BY price DESC`
    
    if (limit) {
      paramCount++
      query += ` LIMIT $${paramCount}`
      params.push(parseInt(limit))
    }

    if (offset) {
      paramCount++
      query += ` OFFSET $${paramCount}`
      params.push(parseInt(offset))
    }

    const result = await pool.query(query, params)
    
    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    })

  } catch (error) {
    console.error('Error fetching cards:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cards' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name, player, team, year, brand, set, cardNumber,
      category, condition, price, description, imageUrl, backImageUrl
    } = body

    const query = `
      INSERT INTO sports_cards (
        name, player, team, year, brand, set_name, card_number,
        category, condition, price, description, image_url, back_image_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `

    const result = await pool.query(query, [
      name, player, team, year, brand, set, cardNumber,
      category, condition, price, description, imageUrl || null, backImageUrl || null
    ])

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })

  } catch (error) {
    console.error('Error creating card:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create card' },
      { status: 500 }
    )
  }
}

