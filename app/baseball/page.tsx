import { mockCards } from '@/lib/mock-cards'
import CardGrid from '@/components/CardGrid'
import Header from '@/components/Header'

export default function BaseballPage() {
  const baseballCards = mockCards.filter(card => card.category === 'Baseball')

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="gradient-text">Baseball Cards</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Classic baseball cards from the golden era of the 90s
          </p>
          <div className="text-2xl font-bold text-white mb-4">
            {baseballCards.length} Cards Available
          </div>
        </div>

        <CardGrid cards={baseballCards} />
      </main>
    </div>
  )
}
