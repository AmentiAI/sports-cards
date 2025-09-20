import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import pool from '@/lib/db'

export async function GET(request: NextRequest) {
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

      const { searchParams } = new URL(request.url)
      const type = searchParams.get('type') || 'received' // 'sent' or 'received'

      let query = `
        SELECT 
          to.*,
          offered_card.name as offered_card_name,
          offered_card.player as offered_card_player,
          offered_card.team as offered_card_team,
          offered_card.year as offered_card_year,
          offered_card.category as offered_card_category,
          offered_card.condition as offered_card_condition,
          offered_card.image_url as offered_card_image,
          requested_card.name as requested_card_name,
          requested_card.player as requested_card_player,
          requested_card.team as requested_card_team,
          requested_card.year as requested_card_year,
          requested_card.category as requested_card_category,
          requested_card.condition as requested_card_condition,
          requested_card.image_url as requested_card_image,
          initiator.username as initiator_username,
          initiator.reputation_score as initiator_reputation,
          receiver.username as receiver_username,
          receiver.reputation_score as receiver_reputation
        FROM trade_offers to
        JOIN sports_cards offered_card ON to.offered_card_id = offered_card.id
        JOIN sports_cards requested_card ON to.requested_card_id = requested_card.id
        JOIN users initiator ON to.initiator_id = initiator.id
        JOIN users receiver ON to.receiver_id = receiver.id
        WHERE ${type === 'sent' ? 'to.initiator_id' : 'to.receiver_id'} = $1
        ORDER BY to.created_at DESC
      `

      const result = await pool.query(query, [userId])

      return NextResponse.json({
        success: true,
        data: result.rows
      })

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Error fetching trade offers:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
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
      const initiatorId = decoded.userId

      const {
        receiverId,
        offeredCardId,
        requestedCardId,
        additionalCash = 0,
        expiresAt
      } = await request.json()

      if (!receiverId || !offeredCardId || !requestedCardId) {
        return NextResponse.json(
          { success: false, message: 'Missing required fields' },
          { status: 400 }
        )
      }

      // Verify the initiator owns the offered card
      const ownershipCheck = await pool.query(
        'SELECT id FROM digital_card_ownership WHERE user_id = $1 AND card_id = $2',
        [initiatorId, offeredCardId]
      )

      if (ownershipCheck.rows.length === 0) {
        return NextResponse.json(
          { success: false, message: 'You do not own the offered card' },
          { status: 403 }
        )
      }

      // Check if receiver owns the requested card
      const receiverOwnershipCheck = await pool.query(
        'SELECT id FROM digital_card_ownership WHERE user_id = $1 AND card_id = $2',
        [receiverId, requestedCardId]
      )

      if (receiverOwnershipCheck.rows.length === 0) {
        return NextResponse.json(
          { success: false, message: 'The receiver does not own the requested card' },
          { status: 403 }
        )
      }

      // Check for duplicate offers
      const duplicateCheck = await pool.query(
        'SELECT id FROM trade_offers WHERE initiator_id = $1 AND receiver_id = $2 AND offered_card_id = $3 AND requested_card_id = $4 AND status = $5',
        [initiatorId, receiverId, offeredCardId, requestedCardId, 'pending']
      )

      if (duplicateCheck.rows.length > 0) {
        return NextResponse.json(
          { success: false, message: 'You already have a pending offer for this trade' },
          { status: 409 }
        )
      }

      // Create the trade offer
      const result = await pool.query(
        `INSERT INTO trade_offers (
          initiator_id, receiver_id, offered_card_id, requested_card_id, 
          additional_cash, status, expires_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [initiatorId, receiverId, offeredCardId, requestedCardId, additionalCash, 'pending', expiresAt || null]
      )

      return NextResponse.json({
        success: true,
        message: 'Trade offer sent successfully',
        offer: result.rows[0]
      })

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Error creating trade offer:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
