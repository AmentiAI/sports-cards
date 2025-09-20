const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...')
    const client = await pool.connect()
    console.log('✅ Database connected successfully')
    
    // Test a simple query
    const result = await client.query('SELECT NOW()')
    console.log('✅ Query executed successfully:', result.rows[0])
    
    client.release()
    await pool.end()
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
  }
}

testConnection()

