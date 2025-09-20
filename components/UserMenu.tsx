'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { ChevronDown, User, Settings, LogOut, Wallet, Package, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function UserMenu() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </span>
        </div>
        <span className="hidden md:block font-medium">{user.username}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-50">
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                  <p className="text-slate-400 text-sm">@{user.username}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Wallet size={12} className="text-green-400" />
                      <span className="text-green-400 text-sm font-medium">
                        ${user.walletBalance.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp size={12} className="text-blue-400" />
                      <span className="text-blue-400 text-sm">
                        {user.reputationScore} rep
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User size={16} />
                <span>Dashboard</span>
              </Link>
              
              <Link
                href="/dashboard/cards"
                className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Package size={16} />
                <span>My Cards</span>
              </Link>

              <Link
                href="/dashboard/listings"
                className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <TrendingUp size={16} />
                <span>My Listings</span>
              </Link>

              <Link
                href="/dashboard/wallet"
                className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Wallet size={16} />
                <span>Wallet</span>
              </Link>

              <Link
                href="/dashboard/settings"
                className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings size={16} />
                <span>Settings</span>
              </Link>

              <div className="border-t border-slate-700 my-2"></div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-slate-700 transition-colors w-full"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
