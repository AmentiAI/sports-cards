import fs from 'fs'
import path from 'path'
import pool from './db'

export async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...')
    
    // Read the schema file
    const schemaPath = path.join(process.cwd(), 'lib', 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    // Execute the schema
    await pool.query(schema)
    console.log('✅ Database schema created successfully')
    
    // Check if we have any cards in the database
    const cardCount = await pool.query('SELECT COUNT(*) FROM sports_cards')
    const count = parseInt(cardCount.rows[0].count)
    
    if (count === 0) {
      console.log('🔄 No cards found, inserting sample data...')
      await insertSampleData()
    } else {
      console.log(`✅ Found ${count} cards in database`)
    }
    
    return true
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    return false
  }
}

async function insertSampleData() {
  try {
    // Import mock data
    const { mockCards } = await import('./mock-cards')
    
    // Insert sports cards
    for (const card of mockCards) {
      const query = `
        INSERT INTO sports_cards (
          name, player, team, year, brand, set_name, card_number, 
          category, condition, price, description, image_url, back_image_url, is_sold
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT DO NOTHING
      `
      
      await pool.query(query, [
        card.name,
        card.player,
        card.team,
        card.year,
        card.brand,
        card.set,
        card.cardNumber,
        card.category,
        card.condition,
        card.price,
        card.description,
        card.imageUrl || null,
        card.backImageUrl || null,
        card.isSold
      ])
    }
    
    console.log(`✅ Inserted ${mockCards.length} sample cards`)
    
    // Create a default admin user (password: admin123)
    const adminQuery = `
      INSERT INTO admin_users (username, email, password_hash)
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
    `
    
    // In production, you should hash the password properly
    await pool.query(adminQuery, [
      'admin',
      'admin@sportscards.com',
      'admin123' // This should be hashed in production
    ])
    
    console.log('✅ Default admin user created (username: admin, password: admin123)')
    
  } catch (error) {
    console.error('❌ Failed to insert sample data:', error)
  }
}

