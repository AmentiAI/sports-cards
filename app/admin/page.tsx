'use client'

import { useState } from 'react'
import { SportsCard } from '@/lib/mock-cards'
import { mockCards } from '@/lib/mock-cards'
import AdminHeader from '@/components/AdminHeader'
import CardList from '@/components/CardList'
import CardForm from '@/components/CardForm'
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

  const handleFormSubmit = (formData?: any) => {
    if (formData) {
      if (editingCard) {
        // Update existing card
        setCards(cards.map(card => 
          card.id === editingCard.id 
            ? { ...formData, id: editingCard.id }
            : card
        ))
      } else {
        // Add new card
        const newCard: SportsCard = {
          ...formData,
          id: Math.max(...cards.map(c => c.id), 0) + 1
        }
        setCards([...cards, newCard])
      }
    }
    setShowForm(false)
    setEditingCard(null)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <AdminHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Add New Card
            </button>
          </div>
        </div>

        {showForm ? (
          <div className="glass-effect rounded-xl p-8">
            <CardForm
              card={editingCard}
              onSuccess={handleFormSubmit}
              onCancel={() => {
                setShowForm(false)
                setEditingCard(null)
              }}
            />
          </div>
        ) : (
          <CardList
            cards={cards}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}
