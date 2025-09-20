# Database Setup Guide

This guide explains how the Neon PostgreSQL database is integrated with the Sports Cards website.

## 🗄️ Database Connection

**Connection String:**
```
postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## 📋 Database Schema

### Tables Created:

1. **sports_cards** - Main table for storing sports card data
2. **users** - User account information
3. **orders** - Order management
4. **order_items** - Individual items in orders
5. **cart_items** - Shopping cart items (session-based)
6. **admin_users** - Admin user accounts

### Key Features:

- ✅ **Enum Types**: Card categories, conditions, order status, payment status
- ✅ **Indexes**: Optimized queries for categories, players, teams, prices
- ✅ **Triggers**: Automatic `updated_at` timestamp updates
- ✅ **Foreign Keys**: Proper relational integrity
- ✅ **SSL Connection**: Secure database connection

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install pg @types/pg
```

### 2. Initialize Database
```bash
node scripts/init-database.js
```

### 3. Test Connection
```bash
node scripts/test-database-integration.js
```

## 📊 Sample Data

The database is initialized with 5 sample sports cards:

- **Baseball (2 cards)**: Derek Jeter, Ken Griffey Jr.
- **Football (1 card)**: Barry Sanders  
- **Basketball (2 cards)**: Michael Jordan, Kobe Bryant

## 🔧 API Endpoints

### Cards API
- `GET /api/cards` - Get all cards with optional filters
- `GET /api/cards/[id]` - Get specific card by ID
- `POST /api/cards` - Create new card
- `PUT /api/cards/[id]` - Update card
- `DELETE /api/cards/[id]` - Delete card

### Cart API
- `GET /api/cart?sessionId=xxx` - Get cart items
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Remove item from cart

### Database Management
- `POST /api/init-db` - Initialize database schema and sample data

## 🔄 Database Service Integration

The site uses a hybrid approach:

1. **Primary**: Database queries via `DatabaseService`
2. **Fallback**: Mock data if database is unavailable
3. **Service Layer**: `CardsService` provides unified interface

### Usage Example:
```typescript
import { cardsService } from '@/lib/cards-service'

// Get cards by category
const baseballCards = await cardsService.getCardsByCategory('Baseball')

// Search cards
const searchResults = await cardsService.searchCards('Jordan')

// Get card count
const count = await cardsService.getCardCountByCategory('Basketball')
```

## 🔐 Admin Access

**Default Admin User:**
- Username: `admin`
- Email: `admin@sportscards.com`
- Password: `admin123`

⚠️ **Important**: Change the default password in production!

## 🛠️ Development Commands

```bash
# Test database connection
node scripts/test-db.js

# Initialize/reset database
node scripts/init-database.js

# Test full integration
node scripts/test-database-integration.js
```

## 📈 Performance Features

- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Indexed columns for fast searches
- **Error Handling**: Graceful fallback to mock data
- **Type Safety**: Full TypeScript integration

## 🔒 Security Features

- **SSL Connection**: Encrypted database communication
- **Parameterized Queries**: SQL injection prevention
- **Input Validation**: Type-safe database operations
- **Connection Security**: SSL certificate verification

## 📝 Environment Variables

Add to your `.env.local` file:
```
DBCONN=postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## 🎯 Next Steps

1. **Add More Cards**: Use the admin panel or API to add more sports cards
2. **User Authentication**: Implement user registration and login
3. **Order Processing**: Complete the checkout flow with database integration
4. **Image Upload**: Add image upload functionality for card photos
5. **Search Optimization**: Implement full-text search for better performance

---

✅ **Database integration is complete and fully functional!**

