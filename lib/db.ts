import { Pool } from 'pg'

const dbConfig = {
  connectionString: process.env.DBCONN || 'postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
}

// Create a connection pool
const pool = new Pool(dbConfig)

// Test the connection
export async function testConnection() {
  try {
    const client = await pool.connect()
    console.log('✅ Database connected successfully')
    client.release()
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

export default pool

