import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      username,
      firstName,
      lastName,
      password,
      phone,
      address,
      city,
      state,
      zipCode,
      country = 'USA'
    } = await request.json()

    // Validation
    if (!email || !username || !firstName || !lastName || !password) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if email or username already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    )

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email or username already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await pool.query(
      `INSERT INTO users (
        email, username, first_name, last_name, password_hash,
        phone, address, city, state, zip_code, country,
        wallet_balance, reputation_score, is_verified, is_admin
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id, email, username, first_name, last_name, phone, address, city, state, zip_code, country, wallet_balance, reputation_score, is_verified, is_admin, created_at, updated_at`,
      [
        email, username, firstName, lastName, hashedPassword,
        phone || null, address || null, city || null, state || null, zipCode || null, country,
        0.00, 100, false, false
      ]
    )

    const user = result.rows[0]

    // Create user wallet
    await pool.query(
      'INSERT INTO user_wallets (user_id, balance, frozen_balance, currency) VALUES ($1, $2, $3, $4)',
      [user.id, 0.00, 0.00, 'USD']
    )

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
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
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
