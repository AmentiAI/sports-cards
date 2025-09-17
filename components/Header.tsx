'use client'

import Link from 'next/link'
import { ShoppingCart, User, Search, Menu, X, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { getTotalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Amazing Effects */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-card-red via-card-gold to-card-blue rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-card-red to-card-blue rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-black text-xl font-orbitron">SC</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white group-hover:text-neon-gold transition-colors duration-300">
                SPORTS CARDS
              </span>
              <span className="text-xs text-white/70 font-orbitron tracking-widest">
                VINTAGE 90s COLLECTION
              </span>
            </div>
          </Link>

          {/* Navigation with Glassmorphism */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="group relative px-6 py-3 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10">
              <span className="relative z-10 font-semibold">HOME</span>
              <div className="absolute inset-0 bg-gradient-to-r from-card-red/20 to-card-blue/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link href="/catalog" className="group relative px-6 py-3 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10">
              <span className="relative z-10 font-semibold">CATALOG</span>
              <div className="absolute inset-0 bg-gradient-to-r from-card-blue/20 to-card-gold/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link href="/about" className="group relative px-6 py-3 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10">
              <span className="relative z-10 font-semibold">ABOUT</span>
              <div className="absolute inset-0 bg-gradient-to-r from-card-gold/20 to-card-red/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </nav>

          {/* Action Buttons with Stunning Effects */}
          <div className="flex items-center space-x-3">
            <button className="group relative p-3 text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl">
              <Search size={22} className="group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-card-blue/20 to-card-gold/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <Link href="/cart" className="group relative p-3 text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl">
              <ShoppingCart size={22} className="group-hover:scale-110 transition-transform duration-300" />
              {getTotalItems() > 0 && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-card-red to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {getTotalItems()}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-card-red/20 to-card-gold/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link href="/admin" className="group relative p-3 text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl">
              <User size={22} className="group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-card-gold/20 to-card-blue/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden group relative p-3 text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} className="group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Menu size={24} className="group-hover:scale-110 transition-transform duration-300" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-card-gold/20 to-card-red/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Glassmorphism */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 shadow-2xl">
            <nav className="flex flex-col space-y-2 p-4">
              <Link 
                href="/" 
                className="group relative px-6 py-4 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10 font-semibold text-lg">HOME</span>
                <div className="absolute inset-0 bg-gradient-to-r from-card-red/20 to-card-blue/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/catalog" 
                className="group relative px-6 py-4 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10 font-semibold text-lg">CATALOG</span>
                <div className="absolute inset-0 bg-gradient-to-r from-card-blue/20 to-card-gold/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/about" 
                className="group relative px-6 py-4 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10 font-semibold text-lg">ABOUT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-card-gold/20 to-card-red/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
