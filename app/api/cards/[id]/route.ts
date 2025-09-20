import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cardId = params.id

    const query = `
      SELECT 
        id, name, player, team, year, brand, set_name as "set", 
        card_number as "cardNumber", category, condition, 
        card_type as "cardType", status, digital_price as "digitalPrice", 
        physical_price as "physicalPrice", price, description, 
        image_url as "imageUrl", back_image_url as "backImageUrl", 
        digital_asset_id as "digitalAssetId", current_owner_id as "currentOwnerId",
        is_listed as "isListed", is_sold as "isSold", created_at, updated_at
      FROM sports_cards 
      WHERE id = $1
    `

    const result = await pool.query(query, [cardId])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Card not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })

  } catch (error) {
    console.error('Error fetching card:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch card' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cardId = params.id
    const body = await request.json()
    const {
      name, player, team, year, brand, set, cardNumber,
      category, condition, price, description, imageUrl, backImageUrl, isSold
    } = body

    const query = `
      UPDATE sports_cards SET
        name = $1, player = $2, team = $3, year = $4, brand = $5, 
        set_name = $6, card_number = $7, category = $8, condition = $9, 
        price = $10, description = $11, image_url = $12, back_image_url = $13, 
        is_sold = $14, updated_at = CURRENT_TIMESTAMP
      WHERE id = $15
      RETURNING *
    `

    const result = await pool.query(query, [
      name, player, team, year, brand, set, cardNumber,
      category, condition, price, description, imageUrl || null, 
      backImageUrl || null, isSold || false, cardId
    ])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Card not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })

  } catch (error) {
    console.error('Error updating card:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update card' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cardId = params.id

    const query = 'DELETE FROM sports_cards WHERE id = $1 RETURNING id'

    const result = await pool.query(query, [cardId])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Card not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Card deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting card:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete card' },
      { status: 500 }
    )
  }
}

