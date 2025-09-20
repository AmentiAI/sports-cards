const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function migrateToMarketplace() {
  try {
    console.log('🔄 Migrating database to marketplace schema...')
    
    // Add new enum types
    console.log('Adding new enum types...')
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE card_type AS ENUM ('digital', 'physical', 'both');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)
    
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE card_status AS ENUM ('available', 'listed', 'sold', 'shipped', 'delivered');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)
    
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE transaction_type AS ENUM ('purchase', 'sale', 'trade', 'transfer', 'refund');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)
    
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)
    
    // Add new columns to sports_cards table
    console.log('Adding new columns to sports_cards table...')
    await pool.query(`
      ALTER TABLE sports_cards 
      ADD COLUMN IF NOT EXISTS card_type card_type DEFAULT 'both',
      ADD COLUMN IF NOT EXISTS status card_status DEFAULT 'available',
      ADD COLUMN IF NOT EXISTS digital_price DECIMAL(10,2),
      ADD COLUMN IF NOT EXISTS physical_price DECIMAL(10,2),
      ADD COLUMN IF NOT EXISTS digital_asset_id VARCHAR(255),
      ADD COLUMN IF NOT EXISTS current_owner_id INTEGER,
      ADD COLUMN IF NOT EXISTS is_listed BOOLEAN DEFAULT FALSE;
    `)
    
    // Add username and wallet columns to users table
    console.log('Adding new columns to users table...')
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS username VARCHAR(100),
      ADD COLUMN IF NOT EXISTS wallet_balance DECIMAL(10,2) DEFAULT 0.00,
      ADD COLUMN IF NOT EXISTS reputation_score INTEGER DEFAULT 100,
      ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
    `)
    
    // Create new tables
    console.log('Creating new marketplace tables...')
    
    // User Wallets table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_wallets (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        balance DECIMAL(10,2) DEFAULT 0.00,
        frozen_balance DECIMAL(10,2) DEFAULT 0.00,
        currency VARCHAR(10) DEFAULT 'USD',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)
    
    // Digital Card Ownership table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS digital_card_ownership (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        card_id INTEGER REFERENCES sports_cards(id),
        quantity INTEGER DEFAULT 1,
        acquired_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        acquisition_type transaction_type DEFAULT 'purchase',
        UNIQUE(user_id, card_id)
      );
    `)
    
    // Marketplace Listings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS marketplace_listings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        card_id INTEGER REFERENCES sports_cards(id),
        listing_type card_type NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        quantity INTEGER DEFAULT 1,
        description TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        expires_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)
    
    // Transactions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        buyer_id INTEGER REFERENCES users(id),
        seller_id INTEGER REFERENCES users(id),
        card_id INTEGER REFERENCES sports_cards(id),
        transaction_type transaction_type NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        quantity INTEGER DEFAULT 1,
        status transaction_status DEFAULT 'pending',
        digital_transfer_id VARCHAR(255),
        shipping_address TEXT,
        tracking_number VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)
    
    // Trading Offers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS trade_offers (
        id SERIAL PRIMARY KEY,
        initiator_id INTEGER REFERENCES users(id),
        receiver_id INTEGER REFERENCES users(id),
        offered_card_id INTEGER REFERENCES sports_cards(id),
        requested_card_id INTEGER REFERENCES sports_cards(id),
        additional_cash DECIMAL(10,2) DEFAULT 0.00,
        status VARCHAR(20) DEFAULT 'pending',
        expires_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)
    
    // Create indexes
    console.log('Creating indexes...')
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_sports_cards_card_type ON sports_cards(card_type);
      CREATE INDEX IF NOT EXISTS idx_sports_cards_status ON sports_cards(status);
      CREATE INDEX IF NOT EXISTS idx_sports_cards_digital_price ON sports_cards(digital_price);
      CREATE INDEX IF NOT EXISTS idx_sports_cards_physical_price ON sports_cards(physical_price);
      CREATE INDEX IF NOT EXISTS idx_sports_cards_is_listed ON sports_cards(is_listed);
      CREATE INDEX IF NOT EXISTS idx_sports_cards_owner ON sports_cards(current_owner_id);
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
      CREATE INDEX IF NOT EXISTS idx_user_wallets_user_id ON user_wallets(user_id);
      CREATE INDEX IF NOT EXISTS idx_digital_ownership_user ON digital_card_ownership(user_id);
      CREATE INDEX IF NOT EXISTS idx_digital_ownership_card ON digital_card_ownership(card_id);
      CREATE INDEX IF NOT EXISTS idx_marketplace_listings_user ON marketplace_listings(user_id);
      CREATE INDEX IF NOT EXISTS idx_marketplace_listings_card ON marketplace_listings(card_id);
      CREATE INDEX IF NOT EXISTS idx_marketplace_listings_active ON marketplace_listings(is_active);
      CREATE INDEX IF NOT EXISTS idx_marketplace_listings_type ON marketplace_listings(listing_type);
      CREATE INDEX IF NOT EXISTS idx_transactions_buyer ON transactions(buyer_id);
      CREATE INDEX IF NOT EXISTS idx_transactions_seller ON transactions(seller_id);
      CREATE INDEX IF NOT EXISTS idx_transactions_card ON transactions(card_id);
      CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
      CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);
      CREATE INDEX IF NOT EXISTS idx_trade_offers_initiator ON trade_offers(initiator_id);
      CREATE INDEX IF NOT EXISTS idx_trade_offers_receiver ON trade_offers(receiver_id);
      CREATE INDEX IF NOT EXISTS idx_trade_offers_status ON trade_offers(status);
    `)
    
    // Update existing cards with marketplace data
    console.log('Updating existing cards with marketplace data...')
    await pool.query(`
      UPDATE sports_cards 
      SET 
        card_type = 'both'::card_type,
        status = CASE WHEN is_sold THEN 'sold'::card_status ELSE 'available'::card_status END,
        digital_price = price * 0.8,
        physical_price = price,
        is_listed = NOT is_sold
      WHERE card_type IS NULL;
    `)
    
    // Add some sample marketplace listings
    console.log('Creating sample marketplace listings...')
    await pool.query(`
      INSERT INTO marketplace_listings (user_id, card_id, listing_type, price, description)
      SELECT 
        1, 
        id, 
        card_type::card_type, 
        CASE WHEN card_type = 'digital' THEN digital_price ELSE physical_price END,
        'Available in the marketplace'
      FROM sports_cards 
      WHERE is_listed = true
      ON CONFLICT DO NOTHING;
    `)
    
    console.log('✅ Database migration completed successfully!')
    console.log('🎉 Your sports cards site is now a digital marketplace!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    throw error
  } finally {
    await pool.end()
  }
}

migrateToMarketplace()
