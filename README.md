# 90s Sports Cards Store

A modern web application for selling vintage 90s sports cards with an admin interface for managing inventory.

## Features

- **Price Range Sections**: Cards organized by price ranges ($1-20, $20-100, $100+)
- **Admin Dashboard**: Complete interface for adding, editing, and managing sports cards
- **Responsive Design**: Modern UI with 90s sports card theme
- **Shopping Cart**: Add cards to cart and manage purchases
- **Card Management**: Full CRUD operations for sports cards
- **Search & Filter**: Find cards by various criteria

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite3
- **UI Components**: Custom components with Lucide React icons
- **Styling**: Tailwind CSS with custom 90s sports theme

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize the database:
   ```bash
   npm run dev
   ```
   Then visit `http://localhost:3000/api/init` to initialize the database.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Admin Interface

1. Navigate to `/admin` to access the admin dashboard
2. Click "Add New Card" to add sports cards to your inventory
3. Fill in all required fields:
   - Card Name
   - Player Name
   - Team
   - Year (1990-1999)
   - Brand (Topps, Upper Deck, Fleer, etc.)
   - Set
   - Card Number
   - Condition
   - Price
   - Description (optional)
   - Image URL (optional)

### Public Store

1. The homepage displays cards organized by price ranges
2. Browse cards in different price categories
3. Click on cards to view details
4. Add cards to cart for purchase

## Card Information

Each sports card includes:
- **Basic Info**: Name, player, team, year
- **Card Details**: Brand, set, card number
- **Condition**: Mint, Near Mint, Excellent, Very Good, Good, Fair, Poor
- **Pricing**: Set your own prices
- **Images**: Optional image URLs
- **Status**: Available or sold

## Price Ranges

- **Budget Cards ($1-$20)**: Great for new collectors
- **Mid-Range Cards ($20-$100)**: Quality cards for serious collectors  
- **Premium Cards ($100+)**: Rare and valuable cards

## Database

The application uses SQLite3 for data storage with the following tables:
- `sports_cards`: Main card inventory
- `cart_items`: Shopping cart items
- `admin_users`: Admin user accounts

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Customize component styles in individual component files

### Adding Features
- New API routes in `app/api/`
- Components in `components/`
- Database operations in `lib/database.ts`

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.
