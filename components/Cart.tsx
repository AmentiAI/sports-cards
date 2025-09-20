'use client'

import { useState } from 'react'
import { ShoppingCart, X, Plus, Minus, Trash2, CreditCard, Lock } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const handleQuantityChange = (cardId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cardId)
    } else {
      updateQuantity(cardId, newQuantity)
    }
  }

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-300"
        title="View Cart"
      >
        <ShoppingCart size={20} />
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-slate-900 shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">
                    Shopping Cart ({getTotalItems()})
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">Your cart is empty</h3>
                    <p className="text-slate-400 mb-6">Add some cards to get started!</p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="btn-primary"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="glass-effect rounded-xl p-4">
                        <div className="flex space-x-4">
                          {/* Card Image Placeholder */}
                          <div className="w-16 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-slate-400 text-xs font-bold">CARD</span>
                          </div>
                          
                          {/* Card Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold text-sm mb-1 truncate">
                              {item.name}
                            </h4>
                            <p className="text-slate-400 text-xs mb-2">
                              {item.sport} • {item.year} • {item.condition}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-green-400 font-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                          <span className="text-slate-400 text-sm">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-white font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-slate-700 p-6 space-y-4">
                  {/* Total */}
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-slate-300 font-semibold">Total:</span>
                    <span className="text-white font-bold text-xl">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm">
                    <Lock size={14} />
                    <span>Secure checkout protected</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-bold text-center hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center justify-center"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </Link>
                    
                    <button
                      onClick={() => {
                        clearCart()
                        setIsOpen(false)
                      }}
                      className="w-full btn-outline text-center"
                    >
                      Clear Cart
                    </button>
                    
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

