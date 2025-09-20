import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import pool from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const cardId = searchParams.get('cardId')
    const listingType = searchParams.get('type')
    const active = searchParams.get('active')

    let query = `
      SELECT 
        ml.*,
        sc.name as card_name,
        sc.player,
        sc.team,
        sc.year,
        sc.brand,
        sc.set_name as "set",
        sc.card_number as "cardNumber",
        sc.category,
        sc.condition,
        sc.card_type as "cardType",
        sc.status,
        sc.digital_price as "digitalPrice",
        sc.physical_price as "physicalPrice",
        sc.image_url as "imageUrl",
        sc.back_image_url as "backImageUrl",
        u.username as seller_username,
        u.reputation_score as seller_reputation
      FROM marketplace_listings ml
      JOIN sports_cards sc ON ml.card_id = sc.id
      JOIN users u ON ml.user_id = u.id
      WHERE 1=1
    `
    const params: any[] = []
    let paramCount = 0

    if (userId) {
      paramCount++
      query += ` AND ml.user_id = $${paramCount}`
      params.push(userId)
    }

    if (cardId) {
      paramCount++
      query += ` AND ml.card_id = $${paramCount}`
      params.push(cardId)
    }

    if (listingType) {
      paramCount++
      query += ` AND ml.listing_type = $${paramCount}`
      params.push(listingType)
    }

    if (active === 'true') {
      query += ` AND ml.is_active = true AND (ml.expires_at IS NULL OR ml.expires_at > NOW())`
    }

    query += ` ORDER BY ml.created_at DESC`

    const result = await pool.query(query, params)

    return NextResponse.json({
      success: true,
      data: result.rows
    })

  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch listings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
      const userId = decoded.userId

      const {
        cardId,
        listingType,
        price,
        quantity = 1,
        description,
        expiresAt
      } = await request.json()

      if (!cardId || !listingType || !price) {
        return NextResponse.json(
          { success: false, message: 'Missing required fields' },
          { status: 400 }
        )
      }

      // Verify the user owns this card
      const ownershipCheck = await pool.query(
        'SELECT id FROM digital_card_ownership WHERE user_id = $1 AND card_id = $2',
        [userId, cardId]
      )

      if (ownershipCheck.rows.length === 0) {
        return NextResponse.json(
          { success: false, message: 'You do not own this card' },
          { status: 403 }
        )
      }

      // Create the listing
      const result = await pool.query(
        `INSERT INTO marketplace_listings (
          user_id, card_id, listing_type, price, quantity, description, 
          is_active, expires_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [userId, cardId, listingType, price, quantity, description, true, expiresAt || null]
      )

      return NextResponse.json({
        success: true,
        message: 'Listing created successfully',
        listing: result.rows[0]
      })

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Error creating listing:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
