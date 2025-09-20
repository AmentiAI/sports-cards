-- Sports Cards Database Schema

-- Create enum types
CREATE TYPE card_category AS ENUM ('Baseball', 'Football', 'Basketball');
CREATE TYPE card_condition AS ENUM ('Mint', 'Near Mint', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor');
CREATE TYPE card_type AS ENUM ('digital', 'physical', 'both');
CREATE TYPE card_status AS ENUM ('available', 'listed', 'sold', 'shipped', 'delivered');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE transaction_type AS ENUM ('purchase', 'sale', 'trade', 'transfer', 'refund');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');

-- Sports Cards table
CREATE TABLE IF NOT EXISTS sports_cards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    player VARCHAR(255) NOT NULL,
    team VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    brand VARCHAR(100) NOT NULL,
    set_name VARCHAR(255) NOT NULL,
    card_number VARCHAR(50) NOT NULL,
    category card_category NOT NULL,
    condition card_condition NOT NULL,
    card_type card_type NOT NULL DEFAULT 'both',
    status card_status NOT NULL DEFAULT 'available',
    digital_price DECIMAL(10,2),
    physical_price DECIMAL(10,2),
    description TEXT,
    image_url VARCHAR(500),
    back_image_url VARCHAR(500),
    digital_asset_id VARCHAR(255), -- For blockchain/NFT integration
    current_owner_id INTEGER REFERENCES users(id),
    is_listed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'USA',
    wallet_balance DECIMAL(10,2) DEFAULT 0.00,
    reputation_score INTEGER DEFAULT 100,
    is_verified BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    session_id VARCHAR(255),
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    status order_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    shipping_address TEXT,
    billing_address TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    card_id INTEGER REFERENCES sports_cards(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items table (for session-based cart)
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    card_id INTEGER REFERENCES sports_cards(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Wallets table (for digital transactions)
CREATE TABLE IF NOT EXISTS user_wallets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    balance DECIMAL(10,2) DEFAULT 0.00,
    frozen_balance DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Digital Card Ownership table
CREATE TABLE IF NOT EXISTS digital_card_ownership (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    card_id INTEGER REFERENCES sports_cards(id),
    quantity INTEGER DEFAULT 1,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    acquisition_type transaction_type DEFAULT 'purchase',
    UNIQUE(user_id, card_id)
);

-- Marketplace Listings table
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

-- Transactions table (for all marketplace transactions)
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER REFERENCES users(id),
    seller_id INTEGER REFERENCES users(id),
    card_id INTEGER REFERENCES sports_cards(id),
    transaction_type transaction_type NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    status transaction_status DEFAULT 'pending',
    digital_transfer_id VARCHAR(255), -- For digital transfers
    shipping_address TEXT,
    tracking_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trading Offers table
CREATE TABLE IF NOT EXISTS trade_offers (
    id SERIAL PRIMARY KEY,
    initiator_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    offered_card_id INTEGER REFERENCES sports_cards(id),
    requested_card_id INTEGER REFERENCES sports_cards(id),
    additional_cash DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, declined, expired
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users table (separate from regular users)
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sports_cards_category ON sports_cards(category);
CREATE INDEX IF NOT EXISTS idx_sports_cards_player ON sports_cards(player);
CREATE INDEX IF NOT EXISTS idx_sports_cards_team ON sports_cards(team);
CREATE INDEX IF NOT EXISTS idx_sports_cards_card_type ON sports_cards(card_type);
CREATE INDEX IF NOT EXISTS idx_sports_cards_status ON sports_cards(status);
CREATE INDEX IF NOT EXISTS idx_sports_cards_digital_price ON sports_cards(digital_price);
CREATE INDEX IF NOT EXISTS idx_sports_cards_physical_price ON sports_cards(physical_price);
CREATE INDEX IF NOT EXISTS idx_sports_cards_year ON sports_cards(year);
CREATE INDEX IF NOT EXISTS idx_sports_cards_is_listed ON sports_cards(is_listed);
CREATE INDEX IF NOT EXISTS idx_sports_cards_owner ON sports_cards(current_owner_id);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

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

CREATE INDEX IF NOT EXISTS idx_cart_items_session ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_session_id ON orders(session_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_sports_cards_updated_at BEFORE UPDATE ON sports_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_wallets_updated_at BEFORE UPDATE ON user_wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_marketplace_listings_updated_at BEFORE UPDATE ON marketplace_listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trade_offers_updated_at BEFORE UPDATE ON trade_offers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

