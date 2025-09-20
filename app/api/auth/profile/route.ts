import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import pool from '@/lib/db'

export async function PUT(request: NextRequest) {
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
      
      const {
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zipCode,
        country
      } = await request.json()

      // Update user profile
      const result = await pool.query(
        `UPDATE users SET 
          first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          phone = COALESCE($3, phone),
          address = COALESCE($4, address),
          city = COALESCE($5, city),
          state = COALESCE($6, state),
          zip_code = COALESCE($7, zip_code),
          country = COALESCE($8, country),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
        RETURNING id, email, username, first_name, last_name, phone, address, city, state, zip_code, country, wallet_balance, reputation_score, is_verified, is_admin, created_at, updated_at`,
        [firstName, lastName, phone, address, city, state, zipCode, country, decoded.userId]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        )
      }

      const user = result.rows[0]

      const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zip_code,
        country: user.country,
        walletBalance: parseFloat(user.wallet_balance),
        reputationScore: user.reputation_score,
        isVerified: user.is_verified,
        isAdmin: user.is_admin,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }

      return NextResponse.json({
        success: true,
        message: 'Profile updated successfully',
        user: userData
      })

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
