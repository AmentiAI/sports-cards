import Link from 'next/link'
import { mockCards } from '@/lib/mock-cards'
import CardGrid from '@/components/CardGrid'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PriceSection from '@/components/PriceSection'

export default function Home() {
  const cards = mockCards

  // Filter cards by price ranges
  const budgetCards = cards.filter(card => card.price >= 1 && card.price < 20)
  const midRangeCards = cards.filter(card => card.price >= 20 && card.price < 100)
  const premiumCards = cards.filter(card => card.price >= 100)

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8 pt-16">
        {/* Budget Cards Section */}
        <PriceSection
          title="Budget Collection"
          subtitle="$1 - $20"
          description="Perfect for new collectors and those looking for great value. These cards offer excellent quality at affordable prices."
          cards={budgetCards}
          priceRange="budget"
        />

        {/* Mid-Range Cards Section */}
        <PriceSection
          title="Mid-Range Collection"
          subtitle="$20 - $100"
          description="Mid-tier cards featuring popular players and better conditions. Great for serious collectors building their collection."
          cards={midRangeCards}
          priceRange="mid"
        />

        {/* Premium Cards Section */}
        <PriceSection
          title="Premium Collection"
          subtitle="$100+"
          description="High-end cards for serious collectors. These are the crown jewels of any collection, featuring rare and valuable cards."
          cards={premiumCards}
          priceRange="premium"
        />
      </main>
    </div>
  )
}
