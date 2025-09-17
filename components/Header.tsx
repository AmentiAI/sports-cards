'use client'

import Link from 'next/link'
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react'
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-effect border-b border-slate-700 shadow-xl' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Professional Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg">SC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                VINTAGE 90s
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-wide">
                SPORTS CARDS
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300 font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300 font-medium flex items-center">
                Collections
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link href="/budget" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                    Budget ($1-$20)
                  </Link>
                  <Link href="/mid-range" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                    Mid-Range ($20-$100)
                  </Link>
                  <Link href="/premium" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                    Premium ($100+)
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/admin" className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300 font-medium">
              Admin
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-300">
              <Search size={20} />
            </button>
            
            <Link href="/cart" className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-300">
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {getTotalItems()}
                </div>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-effect border-t border-slate-700">
            <nav className="flex flex-col space-y-1 p-4">
              <Link 
                href="/" 
                className="px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="px-4 py-2">
                <div className="text-sm font-semibold text-slate-400 mb-2">Collections</div>
                <div className="ml-4 space-y-1">
                  <Link 
                    href="/budget" 
                    className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Budget ($1-$20)
                  </Link>
                  <Link 
                    href="/mid-range" 
                    className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mid-Range ($20-$100)
                  </Link>
                  <Link 
                    href="/premium" 
                    className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Premium ($100+)
                  </Link>
                </div>
              </div>
              <Link 
                href="/admin" 
                className="px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}