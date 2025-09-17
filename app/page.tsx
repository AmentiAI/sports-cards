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
    <div className="min-h-screen">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Budget Cards Section */}
        <PriceSection
          title="Budget Cards"
          subtitle="$1 - $20"
          description="Great starter cards for new collectors"
          cards={budgetCards}
          priceRange="budget"
        />

        {/* Mid-Range Cards Section */}
        <PriceSection
          title="Mid-Range Cards"
          subtitle="$20 - $100"
          description="Quality cards for serious collectors"
          cards={midRangeCards}
          priceRange="mid"
        />

        {/* Premium Cards Section */}
        <PriceSection
          title="Premium Cards"
          subtitle="$100+"
          description="Rare and valuable cards for advanced collectors"
          cards={premiumCards}
          priceRange="premium"
        />
      </main>
    </div>
  )
}
