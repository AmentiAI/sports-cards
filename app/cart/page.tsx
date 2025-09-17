'use client'

import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems, isLoading } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000))
    clearCart()
    setIsCheckingOut(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-card-red/20 to-card-blue/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <ShoppingCart size={64} className="text-white/50" />
            </div>
            <h1 className="text-4xl font-black text-white mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-white/70 mb-8">Start building your collection today!</p>
            <Link href="/" className="btn-primary text-xl px-8 py-4">
              Browse Cards
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <Link href="/" className="p-3 text-white/70 hover:text-white transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-4xl font-black text-white">Shopping Cart</h1>
              <p className="text-white/70 text-lg">{getTotalItems()} items in your cart</p>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="px-6 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors border border-red-500/30"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-6">
                  {/* Card Image */}
                  <div className="w-24 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={96}
                        height={128}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <div className="text-3xl">🏈</div>
                      </div>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-white/70 mb-2">{item.player} • {item.team}</p>
                    <p className="text-white/50 text-sm">{item.year} {item.brand} #{item.cardNumber}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-bold text-neon-gold">${item.price}</span>
                      <span className="text-white/70">Condition: {item.condition}</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                      disabled={isLoading}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Minus size={20} className="text-white" />
                    </button>
                    <span className="text-white font-bold text-lg min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                      disabled={isLoading}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Plus size={20} className="text-white" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id!)}
                    disabled={isLoading}
                    className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between text-2xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-neon-gold">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || isLoading}
                className="w-full group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-card-red via-card-gold to-card-blue rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-card-red to-card-gold text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isCheckingOut ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={24} className="mr-3" />
                      Checkout Now
                    </>
                  )}
                </div>
              </button>

              <p className="text-white/50 text-sm text-center mt-4">
                Secure checkout powered by our payment system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
