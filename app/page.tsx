import Link from 'next/link'
import { mockCards } from '@/lib/mock-cards'
import CardGrid from '@/components/CardGrid'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PriceSection from '@/components/PriceSection'
import Testimonials from '@/components/Testimonials'
import NewsletterSignup from '@/components/NewsletterSignup'
import CollectorCommunity from '@/components/CollectorCommunity'
import { cardsService } from '@/lib/cards-service'

export default async function Home() {
  // Try to get cards from database, fallback to mock data
  let cards = mockCards
  try {
    const dbCards = await cardsService.getCards()
    cards = dbCards.length > 0 ? dbCards : mockCards
  } catch (error) {
    console.warn('Using mock data as fallback:', error)
  }

  // Sort cards by price (highest first) for homepage showcase
  const sortedCards = [...cards].sort((a, b) => b.price - a.price)
  const featuredCards = sortedCards.slice(0, 6) // Show top 6 most expensive cards

  // Get card counts by category
  const baseballCount = await cardsService.getCardCountByCategory('Baseball')
  const footballCount = await cardsService.getCardCountByCategory('Football')
  const basketballCount = await cardsService.getCardCountByCategory('Basketball')

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8 pt-20">
        {/* Featured Cards Section - Most Expensive */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="gradient-text">Featured Collection</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Our most valuable and sought-after cards
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/premium" className="btn-primary">
                View All Premium Cards
              </a>
              <a href="/budget" className="btn-outline">
                Browse Budget Cards
              </a>
            </div>
          </div>
          <CardGrid cards={featuredCards} />
        </section>

        {/* Sport Categories */}
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Shop by Sport</h2>
            <p className="text-base md:text-lg text-slate-400 px-4">Browse cards by your favorite sport</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
            {/* Baseball */}
            <div className="glass-effect rounded-xl p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300 touch-manipulation">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">⚾</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Baseball</h3>
              <p className="text-green-400 text-base md:text-lg font-semibold mb-3 md:mb-4">Classic 90s Baseball</p>
              <p className="text-slate-400 mb-4 md:mb-6 text-sm md:text-base">Iconic players from the golden era of baseball</p>
              <div className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{baseballCount} Cards</div>
              <a href="/baseball" className="btn-primary w-full text-sm md:text-base">Browse Baseball Cards</a>
            </div>

            {/* Football */}
            <div className="glass-effect rounded-xl p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300 touch-manipulation">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">🏈</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Football</h3>
              <p className="text-blue-400 text-base md:text-lg font-semibold mb-3 md:mb-4">Legendary NFL Stars</p>
              <p className="text-slate-400 mb-4 md:mb-6 text-sm md:text-base">Hall of Fame players and championship moments</p>
              <div className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{footballCount} Cards</div>
              <a href="/football" className="btn-primary w-full text-sm md:text-base">Browse Football Cards</a>
            </div>

            {/* Basketball */}
            <div className="glass-effect rounded-xl p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300 touch-manipulation">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">🏀</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Basketball</h3>
              <p className="text-orange-400 text-base md:text-lg font-semibold mb-3 md:mb-4">NBA Legends</p>
              <p className="text-slate-400 mb-4 md:mb-6 text-sm md:text-base">The greatest players to ever grace the court</p>
              <div className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{basketballCount} Cards</div>
              <a href="/basketball" className="btn-primary w-full text-sm md:text-base">Browse Basketball Cards</a>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-16">
          <div className="glass-effect rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Collection?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Trade digital cards instantly or have them shipped to you. Join the marketplace today!
            </p>
                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <a href="/marketplace" className="btn-primary text-lg px-8 py-4">
                       Browse Marketplace
                     </a>
                     <a href="/baseball" className="btn-outline text-lg px-8 py-4">
                       Browse Baseball Cards
                     </a>
                   </div>
          </div>
        </section>
      </main>

      {/* Engaging sections */}
      <Testimonials />
      <CollectorCommunity />
      <NewsletterSignup />
    </div>
  )
}
