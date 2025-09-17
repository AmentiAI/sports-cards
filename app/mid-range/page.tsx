import { mockCards } from '@/lib/mock-cards'
import Header from '@/components/Header'
import CardGrid from '@/components/CardGrid'
import { ArrowLeft, TrendingUp, Star, Award } from 'lucide-react'
import Link from 'next/link'

export default function MidRangePage() {
  const midRangeCards = mockCards.filter(card => card.price >= 20 && card.price < 100)

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link href="/" className="p-2 text-slate-400 hover:text-white transition-colors mr-4">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                <span className="gradient-text">Mid-Range Collection</span>
              </h1>
              <p className="text-xl text-slate-300">$20 - $100 • Quality cards for serious collectors</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{midRangeCards.length}</h3>
              <p className="text-slate-400">Cards Available</p>
            </div>
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">$20</h3>
              <p className="text-slate-400">Starting Price</p>
            </div>
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Premium</h3>
              <p className="text-slate-400">Quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {midRangeCards.length > 0 ? (
            <CardGrid cards={midRangeCards} />
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-white mb-4">No Mid-Range Cards Available</h3>
              <p className="text-slate-400 mb-8">Check back soon for new additions!</p>
              <Link href="/" className="btn-primary">Back to Home</Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="glass-effect rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Building Your Collection?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              These mid-range cards offer excellent value with better conditions and popular players. Perfect for collectors looking to upgrade their collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/budget" className="btn-outline">
                View Budget Cards
              </Link>
              <Link href="/premium" className="btn-primary">
                Browse Premium Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
