import Link from 'next/link'
import { mockCards } from '@/lib/mock-cards'
import CardGrid from '@/components/CardGrid'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PriceSection from '@/components/PriceSection'

export default function Home() {
  const cards = mockCards

  // Sort cards by price (highest first) for homepage showcase
  const sortedCards = [...cards].sort((a, b) => b.price - a.price)
  const featuredCards = sortedCards.slice(0, 6) // Show top 6 most expensive cards

  // Filter cards by price ranges
  const budgetCards = cards.filter(card => card.price >= 1 && card.price < 20)
  const midRangeCards = cards.filter(card => card.price >= 20 && card.price < 100)
  const premiumCards = cards.filter(card => card.price >= 100)

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">
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
              <a href="tel:+1234567890" className="btn-outline">
                Contact for Purchase
              </a>
            </div>
          </div>
          <CardGrid cards={featuredCards} />
        </section>

        {/* Price Range Navigation */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Shop by Price Range</h2>
            <p className="text-lg text-slate-400">Find the perfect cards for your budget</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Budget Range */}
            <div className="glass-effect rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">$</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Budget Collection</h3>
              <p className="text-green-400 text-lg font-semibold mb-4">$1 - $20</p>
              <p className="text-slate-400 mb-6">Perfect for new collectors and great value finds</p>
              <div className="text-2xl font-bold text-white mb-4">{budgetCards.length} Cards</div>
              <a href="/budget" className="btn-primary w-full">Shop Budget Cards</a>
            </div>

            {/* Mid-Range */}
            <div className="glass-effect rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">$$</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Mid-Range Collection</h3>
              <p className="text-blue-400 text-lg font-semibold mb-4">$20 - $100</p>
              <p className="text-slate-400 mb-6">Quality cards for serious collectors</p>
              <div className="text-2xl font-bold text-white mb-4">{midRangeCards.length} Cards</div>
              <a href="/mid-range" className="btn-primary w-full">Shop Mid-Range Cards</a>
            </div>

            {/* Premium Range */}
            <div className="glass-effect rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">$$$</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium Collection</h3>
              <p className="text-purple-400 text-lg font-semibold mb-4">$100+</p>
              <p className="text-slate-400 mb-6">Rare and valuable crown jewels</p>
              <div className="text-2xl font-bold text-white mb-4">{premiumCards.length} Cards</div>
              <a href="/premium" className="btn-primary w-full">Shop Premium Cards</a>
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
              Join thousands of collectors who trust us for authentic, professionally graded sports cards from the golden era of the 90s.
            </p>
                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <a href="/budget" className="btn-primary text-lg px-8 py-4">
                       Browse Collection
                     </a>
                     <a href="tel:+1234567890" className="btn-outline text-lg px-8 py-4">
                       Contact for Purchase
                     </a>
                   </div>
          </div>
        </section>
      </main>
    </div>
  )
}
