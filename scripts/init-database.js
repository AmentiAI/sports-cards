const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

// Mock data for sample cards
const mockCards = [
  {
    name: "Michael Jordan Rookie Card",
    player: "Michael Jordan",
    team: "Chicago Bulls",
    year: 1986,
    brand: "Fleer",
    set: "Fleer Basketball",
    cardNumber: "57",
    category: "Basketball",
    condition: "Near Mint",
    cardType: "both",
    status: "available",
    digitalPrice: 2000.00,
    physicalPrice: 2500.00,
    description: "The most iconic basketball card ever produced. Michael Jordan's rookie card from the 1986-87 Fleer set.",
    imageUrl: null,
    backImageUrl: null,
    digitalAssetId: "mj86_001",
    isListed: true,
    isSold: false
  },
  {
    name: "Derek Jeter Rookie Card",
    player: "Derek Jeter",
    team: "New York Yankees",
    year: 1993,
    brand: "SP",
    set: "SP Baseball",
    cardNumber: "279",
    category: "Baseball",
    condition: "Mint",
    price: 1200.00,
    description: "Derek Jeter's rookie card from the 1993 SP set. One of the most valuable modern baseball cards.",
    imageUrl: null,
    backImageUrl: null,
    isSold: false
  },
  {
    name: "Barry Sanders Rookie Card",
    player: "Barry Sanders",
    team: "Detroit Lions",
    year: 1989,
    brand: "Score",
    set: "Score Football",
    cardNumber: "645",
    category: "Football",
    condition: "Excellent",
    price: 850.00,
    description: "Barry Sanders rookie card from the 1989 Score set. Features the legendary running back.",
    imageUrl: null,
    backImageUrl: null,
    isSold: false
  },
  {
    name: "Kobe Bryant Rookie Card",
    player: "Kobe Bryant",
    team: "Los Angeles Lakers",
    year: 1996,
    brand: "Topps Chrome",
    set: "Topps Chrome Basketball",
    cardNumber: "138",
    category: "Basketball",
    condition: "Near Mint",
    price: 1800.00,
    description: "Kobe Bryant's rookie card from the 1996 Topps Chrome set. A must-have for basketball collectors.",
    imageUrl: null,
    backImageUrl: null,
    isSold: false
  },
  {
    name: "Ken Griffey Jr. Rookie Card",
    player: "Ken Griffey Jr.",
    team: "Seattle Mariners",
    year: 1989,
    brand: "Upper Deck",
    set: "Upper Deck Baseball",
    cardNumber: "1",
    category: "Baseball",
    condition: "Mint",
    price: 950.00,
    description: "Ken Griffey Jr.'s iconic rookie card from the 1989 Upper Deck set. Card #1 in the series.",
    imageUrl: null,
    backImageUrl: null,
    isSold: false
  }
]

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database schema...')
    
    // Read and execute the schema
    const schemaPath = path.join(__dirname, '..', 'lib', 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    await pool.query(schema)
    console.log('✅ Database schema created successfully')
    
    // Check if cards already exist
    const cardCount = await pool.query('SELECT COUNT(*) FROM sports_cards')
    const count = parseInt(cardCount.rows[0].count)
    
    if (count === 0) {
      console.log('🔄 No cards found, inserting sample data...')
      
      for (const card of mockCards) {
      const query = `
        INSERT INTO sports_cards (
          name, player, team, year, brand, set_name, card_number, 
          category, condition, card_type, status, digital_price, physical_price, 
          description, image_url, back_image_url, digital_asset_id, is_listed, is_sold
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      `
      
      await pool.query(query, [
        card.name, card.player, card.team, card.year, card.brand, card.set,
        card.cardNumber, card.category, card.condition, 
        card.cardType || 'both', card.status || 'available',
        card.digitalPrice || null, card.physicalPrice || card.price,
        card.description, card.imageUrl, card.backImageUrl, 
        card.digitalAssetId || null, card.isListed || false, card.isSold || false
      ])
      }
      
      console.log(`✅ Inserted ${mockCards.length} sample cards`)
    } else {
      console.log(`✅ Found ${count} cards in database`)
    }
    
    // Create default admin user
    const adminQuery = `
      INSERT INTO admin_users (username, email, password_hash)
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
    `
    
    await pool.query(adminQuery, [
      'admin',
      'admin@sportscards.com',
      'admin123' // In production, this should be hashed
    ])
    
    console.log('✅ Default admin user created (username: admin, password: admin123)')
    console.log('🎉 Database initialization completed successfully!')
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message)
    throw error
  } finally {
    await pool.end()
  }
}

initializeDatabase()

