import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID required' },
        { status: 400 }
      )
    }

    const query = `
      SELECT 
        ci.id, ci.session_id as "sessionId", ci.quantity,
        sc.id as "cardId", sc.name, sc.player, sc.team, sc.year, 
        sc.brand, sc.set_name as "set", sc.card_number as "cardNumber",
        sc.category, sc.condition, sc.price, sc.description,
        sc.image_url as "imageUrl", sc.back_image_url as "backImageUrl",
        sc.is_sold as "isSold"
      FROM cart_items ci
      JOIN sports_cards sc ON ci.card_id = sc.id
      WHERE ci.session_id = $1
      ORDER BY ci.created_at DESC
    `

    const result = await pool.query(query, [sessionId])

    return NextResponse.json({
      success: true,
      data: result.rows
    })

  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, cardId, quantity = 1 } = body

    if (!sessionId || !cardId) {
      return NextResponse.json(
        { success: false, error: 'Session ID and Card ID required' },
        { status: 400 }
      )
    }

    // Check if item already exists in cart
    const existingQuery = 'SELECT id, quantity FROM cart_items WHERE session_id = $1 AND card_id = $2'
    const existing = await pool.query(existingQuery, [sessionId, cardId])

    if (existing.rows.length > 0) {
      // Update existing item
      const newQuantity = existing.rows[0].quantity + quantity
      const updateQuery = `
        UPDATE cart_items 
        SET quantity = $1, updated_at = CURRENT_TIMESTAMP
        WHERE session_id = $2 AND card_id = $3
        RETURNING *
      `
      const result = await pool.query(updateQuery, [newQuantity, sessionId, cardId])
      
      return NextResponse.json({
        success: true,
        data: result.rows[0],
        message: 'Cart item updated'
      })
    } else {
      // Add new item
      const insertQuery = `
        INSERT INTO cart_items (session_id, card_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *
      `
      const result = await pool.query(insertQuery, [sessionId, cardId, quantity])
      
      return NextResponse.json({
        success: true,
        data: result.rows[0],
        message: 'Item added to cart'
      })
    }

  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add to cart' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, cardId } = body

    if (!sessionId || !cardId) {
      return NextResponse.json(
        { success: false, error: 'Session ID and Card ID required' },
        { status: 400 }
      )
    }

    const query = 'DELETE FROM cart_items WHERE session_id = $1 AND card_id = $2 RETURNING id'
    const result = await pool.query(query, [sessionId, cardId])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart'
    })

  } catch (error) {
    console.error('Error removing from cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove from cart' },
      { status: 500 }
    )
  }
}

