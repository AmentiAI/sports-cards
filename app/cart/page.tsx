'use client'

import { useCart } from '@/contexts/CartContext'
import { Plus, Minus, Trash2, ShoppingCart, CreditCard, Lock, Shield, Truck, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()

  const handleQuantityChange = (cardId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cardId)
    } else {
      updateQuantity(cardId, newQuantity)
    }
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="gradient-text">Shopping Cart</span>
          </h1>
          <p className="text-slate-300">
            Review your items and proceed to checkout
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
              <ShoppingCart className="w-20 h-20 text-slate-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
              <p className="text-slate-400 mb-8">
                Looks like you haven't added any cards to your cart yet.
              </p>
              <Link href="/" className="btn-primary">
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="glass-effect rounded-xl p-6">
                  <div className="flex space-x-6">
                    {/* Card Image Placeholder */}
                    <div className="w-24 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-slate-400 text-sm font-bold">CARD</span>
                    </div>
                    
                    {/* Card Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                          {item.category}
                        </span>
                        <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                          {item.year}
                        </span>
                        <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm">
                          {item.condition}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-green-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-400/10 rounded-lg"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Quantity:</span>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-bold text-lg w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <div className="text-right">
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 transition-colors text-sm"
                >
                  Clear All Items
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                
                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Subtotal ({getTotalItems()} items):</span>
                    <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-300">Shipping:</span>
                    <span className="text-white font-semibold">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-300">Tax:</span>
                    <span className="text-white font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-slate-600 pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="text-white font-bold">Total:</span>
                      <span className="text-green-400 font-bold text-xl">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {subtotal < 100 && (
                  <div className="mb-6 p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-300 font-semibold">Free shipping on orders over $100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-slate-300 text-sm mt-2">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  </div>
                )}

                {/* Security Badges */}
                <div className="flex items-center justify-center space-x-4 text-slate-400 text-sm mb-6">
                  <div className="flex items-center space-x-1">
                    <Lock size={14} />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield size={14} />
                    <span>Protected</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RotateCcw size={14} />
                    <span>30-Day Return</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-center hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center justify-center mb-4"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </Link>

                <Link
                  href="/"
                  className="w-full btn-outline text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
