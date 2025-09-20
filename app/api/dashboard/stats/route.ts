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

      // Get user's card statistics
      const [cardStats, walletStats, salesStats, listingStats, offerStats] = await Promise.all([
        // Total cards owned
        pool.query(`
          SELECT COUNT(*) as total_cards,
                 COUNT(CASE WHEN is_listed = true THEN 1 END) as listed_cards,
                 COUNT(CASE WHEN status = 'sold' THEN 1 END) as sold_cards
          FROM digital_card_ownership dco
          JOIN sports_cards sc ON dco.card_id = sc.id
          WHERE dco.user_id = $1
        `, [userId]),

        // Wallet balance
        pool.query(`
          SELECT balance FROM user_wallets WHERE user_id = $1
        `, [userId]),

        // Total sales
        pool.query(`
          SELECT COALESCE(SUM(amount), 0) as total_sales
          FROM transactions
          WHERE seller_id = $1 AND status = 'completed' AND transaction_type = 'sale'
        `, [userId]),

        // Active listings
        pool.query(`
          SELECT COUNT(*) as active_listings
          FROM marketplace_listings
          WHERE user_id = $1 AND is_active = true AND (expires_at IS NULL OR expires_at > NOW())
        `, [userId]),

        // Pending offers
        pool.query(`
          SELECT COUNT(*) as pending_offers
          FROM trade_offers
          WHERE receiver_id = $1 AND status = 'pending'
        `, [userId])
      ])

      const cardStatsData = cardStats.rows[0]
      const walletData = walletStats.rows[0]
      const salesData = salesStats.rows[0]
      const listingData = listingStats.rows[0]
      const offerData = offerStats.rows[0]

      const stats = {
        totalCards: parseInt(cardStatsData.total_cards) || 0,
        listedCards: parseInt(cardStatsData.listed_cards) || 0,
        soldCards: parseInt(cardStatsData.sold_cards) || 0,
        walletBalance: parseFloat(walletData?.balance) || 0,
        totalSales: parseFloat(salesData.total_sales) || 0,
        activeListings: parseInt(listingData.active_listings) || 0,
        pendingOffers: parseInt(offerData.pending_offers) || 0
      }

      return NextResponse.json({
        success: true,
        stats
      })

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
