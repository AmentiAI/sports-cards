import { NextRequest, NextResponse } from 'next/server'
import { initializeDatabase } from '@/lib/init-db'

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Starting database initialization...')
    
    const success = await initializeDatabase()
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully'
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Database initialization failed' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Database initialization error:', error)
    return NextResponse.json(
      { success: false, error: 'Database initialization failed' },
      { status: 500 }
    )
  }
}

