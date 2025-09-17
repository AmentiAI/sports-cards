'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SportsCard } from '@/lib/mock-cards'
import toast from 'react-hot-toast'

interface CartItem extends SportsCard {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (card: SportsCard, quantity?: number) => void
  removeFromCart: (cardId: number) => void
  updateQuantity: (cardId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Generate a session ID for this user session
  const getSessionId = () => {
    if (typeof window !== 'undefined') {
      let sessionId = localStorage.getItem('cart_session_id')
      if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        localStorage.setItem('cart_session_id', sessionId)
      }
      return sessionId
    }
    return 'session_' + Date.now()
  }

  // Load cart items on mount
  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = async () => {
    // Load from localStorage for now
    setIsLoading(true)
    try {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('sports_cards_cart')
        if (savedCart) {
          setItems(JSON.parse(savedCart))
        }
      }
    } catch (error) {
      console.error('Failed to load cart items:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (card: SportsCard, quantity: number = 1) => {
    if (card.isSold) {
      toast.error('This card is no longer available')
      return
    }

    setIsLoading(true)
    try {
      // Update local state
      setItems(prev => {
        const existingItem = prev.find(item => item.id === card.id)
        let newItems
        if (existingItem) {
          newItems = prev.map(item =>
            item.id === card.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        } else {
          newItems = [...prev, { ...card, quantity }]
        }
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('sports_cards_cart', JSON.stringify(newItems))
        }
        
        return newItems
      })
      toast.success('Added to cart!')
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromCart = async (cardId: number) => {
    setIsLoading(true)
    try {
      setItems(prev => {
        const newItems = prev.filter(item => item.id !== cardId)
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('sports_cards_cart', JSON.stringify(newItems))
        }
        return newItems
      })
      toast.success('Removed from cart')
    } catch (error) {
      toast.error('Failed to remove from cart')
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (cardId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cardId)
      return
    }

    setIsLoading(true)
    try {
      setItems(prev => {
        const newItems = prev.map(item =>
          item.id === cardId ? { ...item, quantity } : item
        )
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('sports_cards_cart', JSON.stringify(newItems))
        }
        return newItems
      })
    } catch (error) {
      toast.error('Failed to update quantity')
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    setIsLoading(true)
    try {
      setItems([])
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sports_cards_cart')
      }
      toast.success('Cart cleared')
    } catch (error) {
      toast.error('Failed to clear cart')
    } finally {
      setIsLoading(false)
    }
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
