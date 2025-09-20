# Sports Cards Marketplace Setup Guide

## 🚀 Quick Start

### 1. Environment Variables
Create a `.env.local` file in the root directory with:

```env
# Database Connection
DBCONN=postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# JWT Secret for authentication (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Database Setup
Run the migration script to set up the marketplace schema:

```bash
node scripts/migrate-to-marketplace.js
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

## 🔐 Authentication Features

### User Registration & Login
- **Registration**: Users can create accounts with email, username, and profile information
- **Login**: Secure JWT-based authentication with 7-day token expiration
- **Profile Management**: Users can update their profile information

### User Dashboard
- **Stats Overview**: Total cards, active listings, wallet balance, total sales
- **Quick Actions**: Add cards, manage listings, view wallet, handle trade offers
- **Recent Activity**: Track sales, offers, and listing status

## 🏪 Marketplace Features

### Card Listing
- **Add Cards**: Users can list their own cards for sale or trade
- **Digital/Physical**: Support for digital-only, physical-only, or both formats
- **Pricing**: Separate pricing for digital and physical versions
- **Image Support**: Front and back card images via URL

### Trading System
- **Trade Offers**: Users can make trade offers with other users
- **Card Selection**: Choose from owned cards to offer in trades
- **Additional Cash**: Add cash to sweeten trade offers
- **Offer Management**: Track sent and received trade offers

### Search & Filtering
- **Advanced Search**: Search by player, team, card name, brand, set, card number
- **Category Filters**: Filter by sport (Baseball, Football, Basketball)
- **Card Type Filters**: Filter by digital, physical, or both
- **Sorting Options**: Sort by price, name, or year

## 💳 Digital Card System

### Card Types
- **Digital Only**: Instant digital transfer, no shipping
- **Physical Only**: Traditional shipping with tracking
- **Both**: Users can choose digital or physical delivery

### Ownership & Transactions
- **Digital Ownership**: Track who owns digital versions of cards
- **Transaction History**: Complete record of all trades and sales
- **Wallet System**: Built-in wallet for digital transactions

## 🛡️ Security Features

### Authentication
- **JWT Tokens**: Secure authentication with token expiration
- **Password Hashing**: bcrypt encryption for user passwords
- **Authorization**: Protected routes and API endpoints

### Data Validation
- **Input Validation**: Server-side validation for all user inputs
- **Ownership Verification**: Ensure users can only trade cards they own
- **Duplicate Prevention**: Prevent duplicate trade offers

## 📱 User Experience

### Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Touch-Friendly**: Large buttons and touch-optimized interactions
- **Modern UI**: Dark theme with glass effects and smooth animations

### Navigation
- **Intuitive Menu**: Easy access to all features
- **User Menu**: Quick access to dashboard, settings, and logout
- **Breadcrumbs**: Clear navigation paths

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Cards & Marketplace
- `GET /api/cards` - Get all cards with filters
- `POST /api/cards` - Create new card
- `GET /api/cards/[id]` - Get specific card
- `GET /api/marketplace/listings` - Get marketplace listings
- `POST /api/marketplace/listings` - Create marketplace listing

### Trading
- `GET /api/marketplace/trade-offers` - Get trade offers
- `POST /api/marketplace/trade-offers` - Create trade offer
- `GET /api/dashboard/stats` - Get user dashboard statistics

## 🎯 Next Steps

### Ready to Implement
1. **Payment Integration**: Add Stripe/PayPal for purchases
2. **Shipping Integration**: Connect to shipping providers
3. **Blockchain Integration**: Add NFT support for digital cards
4. **Mobile App**: Create React Native app
5. **Advanced Analytics**: User behavior and marketplace insights

### Database Schema
The system includes comprehensive tables for:
- Users and authentication
- Sports cards with marketplace fields
- Digital card ownership tracking
- Marketplace listings and transactions
- Trade offers and negotiations
- User wallets and balances

## 🚀 Deployment

The application is ready for deployment to:
- **Vercel**: Zero-config deployment
- **Railway**: Full-stack deployment with database
- **DigitalOcean**: Custom server deployment
- **AWS**: Enterprise-scale deployment

Just ensure your environment variables are set correctly and run `npm run build` to create the production build.
