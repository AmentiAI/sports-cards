export interface SportsCard {
  id: number;
  name: string;
  player: string;
  team: string;
  year: number;
  brand: string;
  set: string;
  cardNumber: string;
  category: 'Baseball' | 'Football' | 'Basketball';
  condition: 'Mint' | 'Near Mint' | 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  cardType: 'digital' | 'physical' | 'both';
  status: 'available' | 'listed' | 'sold' | 'shipped' | 'delivered';
  digitalPrice?: number;
  physicalPrice?: number;
  price: number; // Legacy field for backward compatibility
  description: string;
  imageUrl?: string;
  backImageUrl?: string;
  digitalAssetId?: string;
  currentOwnerId?: number;
  isListed: boolean;
  isSold: boolean; // Legacy field for backward compatibility
}

export const mockCards: SportsCard[] = [
  {
    id: 1,
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
    price: 2500.00,
    description: "The most iconic basketball card of all time. This 1986 Fleer Michael Jordan rookie card is in excellent condition with sharp corners and vibrant colors.",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop",
    backImageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop",
    digitalAssetId: "mj86_001",
    isListed: true,
    isSold: false
  },
  {
    id: 2,
    name: "Ken Griffey Jr. Rookie",
    player: "Ken Griffey Jr.",
    team: "Seattle Mariners",
    year: 1989,
    brand: "Upper Deck",
    set: "Upper Deck Baseball",
    cardNumber: "1",
    category: "Baseball",
    condition: "Mint",
    cardType: "physical",
    status: "available",
    digitalPrice: undefined,
    physicalPrice: 450.00,
    price: 450.00,
    description: "The Kid's iconic Upper Deck rookie card. One of the most sought-after baseball cards from the 90s.",
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=600&fit=crop",
    backImageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=600&fit=crop",
    isListed: true,
    isSold: false
  },
  {
    id: 3,
    name: "Barry Sanders Rookie",
    player: "Barry Sanders",
    team: "Detroit Lions",
    year: 1989,
    brand: "Topps",
    set: "Topps Football",
    cardNumber: "62",
    category: "Football",
    condition: "Excellent",
    cardType: "digital",
    status: "available",
    digitalPrice: 125.00,
    physicalPrice: undefined,
    price: 125.00,
    description: "The elusive running back's rookie card. Known for his incredible agility and rushing yards.",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=600&fit=crop",
    backImageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=600&fit=crop",
    isListed: true,
    isSold: false
  },
  {
    id: 4,
    name: "Kobe Bryant Rookie",
    player: "Kobe Bryant",
    team: "Los Angeles Lakers",
    year: 1996,
    brand: "Topps Chrome",
    set: "Topps Chrome Basketball",
    cardNumber: "138",
    category: "Basketball",
    condition: "Near Mint",
    cardType: "both",
    status: "available",
    digitalPrice: 1500.00,
    physicalPrice: 1800.00,
    price: 1800.00,
    description: "Kobe Bryant's rookie card from the 1996 Topps Chrome set. A must-have for basketball collectors.",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop",
    backImageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop",
    digitalAssetId: "kb96_001",
    isListed: true,
    isSold: false
  },
  {
    id: 5,
    name: "Derek Jeter Rookie",
    player: "Derek Jeter",
    team: "New York Yankees",
    year: 1993,
    brand: "SP",
    set: "SP Baseball",
    cardNumber: "279",
    category: "Baseball",
    condition: "Mint",
    cardType: "physical",
    status: "available",
    digitalPrice: undefined,
    physicalPrice: 1200.00,
    price: 1200.00,
    description: "Derek Jeter's rookie card from the 1993 SP set. One of the most valuable modern baseball cards.",
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=600&fit=crop",
    backImageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=600&fit=crop",
    isListed: true,
    isSold: false
  }
];