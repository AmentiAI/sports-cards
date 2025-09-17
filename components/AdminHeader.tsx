'use client'

import Link from 'next/link'
import { ArrowLeft, Home, Plus, List } from 'lucide-react'

export default function AdminHeader() {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft size={20} />
              <span>Back to Store</span>
            </Link>
            <div className="h-6 w-px bg-slate-600"></div>
            <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
          </div>

          <nav className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors">
              <List size={18} />
              <span>All Cards</span>
            </Link>
            <Link href="/admin" className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors">
              <Plus size={18} />
              <span>Add Card</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors">
              <Home size={18} />
              <span>View Store</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}