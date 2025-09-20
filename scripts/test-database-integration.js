const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function testDatabaseIntegration() {
  try {
    console.log('🔄 Testing database integration...')
    
    // Test 1: Check if tables exist
    console.log('\n1. Checking if tables exist...')
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `)
    
    console.log('✅ Tables found:', tables.rows.map(row => row.table_name).join(', '))
    
    // Test 2: Check sports cards count
    console.log('\n2. Checking sports cards...')
    const cardCount = await pool.query('SELECT COUNT(*) FROM sports_cards')
    console.log(`✅ Total cards in database: ${cardCount.rows[0].count}`)
    
    // Test 3: Check cards by category
    console.log('\n3. Checking cards by category...')
    const categories = await pool.query(`
      SELECT category, COUNT(*) as count 
      FROM sports_cards 
      GROUP BY category 
      ORDER BY category
    `)
    
    categories.rows.forEach(row => {
      console.log(`   ${row.category}: ${row.count} cards`)
    })
    
    // Test 4: Test search functionality
    console.log('\n4. Testing search functionality...')
    const searchResults = await pool.query(`
      SELECT name, player, category, price 
      FROM sports_cards 
      WHERE LOWER(player) LIKE '%jordan%' OR LOWER(player) LIKE '%jeter%'
      ORDER BY price DESC
    `)
    
    console.log('✅ Search results for "jordan" or "jeter":')
    searchResults.rows.forEach(row => {
      console.log(`   ${row.player} - ${row.name} (${row.category}) - $${row.price}`)
    })
    
    // Test 5: Check admin user
    console.log('\n5. Checking admin user...')
    const adminCount = await pool.query('SELECT COUNT(*) FROM admin_users')
    console.log(`✅ Admin users: ${adminCount.rows[0].count}`)
    
    console.log('\n🎉 Database integration test completed successfully!')
    
  } catch (error) {
    console.error('❌ Database integration test failed:', error.message)
  } finally {
    await pool.end()
  }
}

testDatabaseIntegration()

