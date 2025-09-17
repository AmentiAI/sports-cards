'use client'

import { useState } from 'react'
import { SportsCard } from '@/lib/mock-cards'
import { mockCards } from '@/lib/mock-cards'
import AdminHeader from '@/components/AdminHeader'
import CardList from '@/components/CardList'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [cards, setCards] = useState<SportsCard[]>(mockCards)
  const [showForm, setShowForm] = useState(false)
  const [editingCard, setEditingCard] = useState<SportsCard | null>(null)

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this card?')) {
      setCards(cards.filter(card => card.id !== id))
      toast.success('Card deleted successfully')
    }
  }

  const handleEdit = (card: SportsCard) => {
    setEditingCard(card)
    setShowForm(true)
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setEditingCard(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-vintage">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setCards(mockCards)
                toast.success('Mock data loaded!')
              }}
              className="btn-secondary"
            >
              Load Mock Data
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Add New Card
            </button>
          </div>
        </div>

        <CardList
          cards={cards}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
