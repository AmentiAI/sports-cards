'use client'

import { useState, useEffect } from 'react'
import { SportsCard } from '@/lib/mock-cards'
import { X, Upload } from 'lucide-react'
import toast from 'react-hot-toast'

interface CardFormProps {
  card?: SportsCard | null
  onSuccess: (formData?: any) => void
  onCancel: () => void
}

const conditions = ['Mint', 'Near Mint', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor']
const categories = ['Baseball', 'Football', 'Basketball']

export default function CardForm({ card, onSuccess, onCancel }: CardFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    player: '',
    team: '',
    year: new Date().getFullYear(),
    brand: '',
    set: '',
    cardNumber: '',
    category: 'Basketball' as SportsCard['category'],
    condition: 'Near Mint' as SportsCard['condition'],
    price: 0,
    description: '',
    imageUrl: '',
    backImageUrl: '',
    isSold: false
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (card) {
      setFormData({
        name: card.name || '',
        player: card.player || '',
        team: card.team || '',
        year: card.year || new Date().getFullYear(),
        brand: card.brand || '',
        set: card.set || '',
        cardNumber: card.cardNumber || '',
        category: card.category || 'Basketball',
        condition: card.condition || 'Near Mint',
        price: card.price || 0,
        description: card.description || '',
        imageUrl: card.imageUrl || '',
        backImageUrl: card.backImageUrl || '',
        isSold: card.isSold || false
      })
    }
  }, [card])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Pass form data to parent component
      onSuccess(formData)
      toast.success(card ? 'Card updated successfully!' : 'Card created successfully!')
    } catch (error) {
      toast.error('Failed to save card')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="relative">
      <button
        onClick={onCancel}
        className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
      >
        <X size={24} />
      </button>

      <h2 className="text-2xl font-bold text-vintage mb-6">
        {card ? 'Edit Card' : 'Add New Card'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., Michael Jordan Rookie Card"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Player Name *
            </label>
            <input
              type="text"
              name="player"
              value={formData.player}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., Michael Jordan"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Team *
            </label>
            <input
              type="text"
              name="team"
              value={formData.team}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., Chicago Bulls"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Year *
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              min="1990"
              max="1999"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Brand *
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., Topps, Upper Deck, Fleer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Set *
            </label>
            <input
              type="text"
              name="set"
              value={formData.set}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., 1991 Topps"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Number *
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., 57"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Condition *
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="input-field"
            >
              {conditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="input-field"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Front Image URL *
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="https://example.com/front-image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Back Image URL *
            </label>
            <input
              type="url"
              name="backImageUrl"
              value={formData.backImageUrl}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="https://example.com/back-image.jpg"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="input-field"
              placeholder="Describe the card's features, condition details, etc."
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isSold"
                checked={formData.isSold}
                onChange={handleChange}
                className="w-4 h-4 text-card-red rounded focus:ring-card-red"
              />
              <span className="text-sm font-semibold text-gray-700">Mark as sold</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : (card ? 'Update Card' : 'Create Card')}
          </button>
        </div>
      </form>
    </div>
  )
}
