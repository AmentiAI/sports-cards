'use client'

import Link from 'next/link'
import { ArrowLeft, Home, Plus, List } from 'lucide-react'

export default function AdminHeader() {
  return (
    <header className="bg-gradient-to-r from-card-red to-card-blue text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft size={20} />
              <span>Back to Store</span>
            </Link>
            <div className="h-6 w-px bg-white/30"></div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>

          <nav className="flex items-center space-x-6">
            <Link href="/admin" className="flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
              <List size={18} />
              <span>All Cards</span>
            </Link>
            <Link href="/admin" className="flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
              <Plus size={18} />
              <span>Add Card</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
              <Home size={18} />
              <span>View Store</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
