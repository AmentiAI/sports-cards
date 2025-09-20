'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { 
  Package, 
  TrendingUp, 
  Wallet, 
  Users, 
  ShoppingCart, 
  Plus,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalCards: number
  listedCards: number
  soldCards: number
  walletBalance: number
  totalSales: number
  activeListings: number
  pendingOffers: number
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalCards: 0,
    listedCards: 0,
    soldCards: 0,
    walletBalance: 0,
    totalSales: 0,
    activeListings: 0,
    pendingOffers: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    // Fetch dashboard stats
    fetchDashboardStats()
  }, [isAuthenticated, router])

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch('/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-20">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-slate-300 mt-4">Loading dashboard...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, <span className="gradient-text">{user?.firstName}</span>!
          </h1>
          <p className="text-slate-300">
            Manage your cards, track sales, and grow your collection
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Cards</p>
                <p className="text-2xl font-bold text-white">{stats.totalCards}</p>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Active Listings</p>
                <p className="text-2xl font-bold text-white">{stats.activeListings}</p>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Wallet Balance</p>
                <p className="text-2xl font-bold text-white">${stats.walletBalance.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Sales</p>
                <p className="text-2xl font-bold text-white">${stats.totalSales.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/dashboard/cards/add"
                className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Add New Card</h3>
                    <p className="text-slate-400 text-sm">List a card for sale or trade</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/dashboard/listings"
                className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Manage Listings</h3>
                    <p className="text-slate-400 text-sm">View and edit your listings</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/dashboard/wallet"
                className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Wallet</h3>
                    <p className="text-slate-400 text-sm">View transactions and balance</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/dashboard/offers"
                className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Trade Offers</h3>
                    <p className="text-slate-400 text-sm">Manage incoming offers</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="glass-effect rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Card sold</p>
                    <p className="text-slate-400 text-xs">Michael Jordan Rookie Card</p>
                  </div>
                  <span className="text-green-400 text-sm font-medium">$2,500</span>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">New offer received</p>
                    <p className="text-slate-400 text-xs">Ken Griffey Jr. Rookie</p>
                  </div>
                  <span className="text-blue-400 text-sm font-medium">Trade</span>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Listing expires soon</p>
                    <p className="text-slate-400 text-xs">Barry Sanders Rookie</p>
                  </div>
                  <span className="text-orange-400 text-sm font-medium">2 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/cards"
            className="glass-effect rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300"
          >
            <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white font-medium">My Cards</p>
          </Link>

          <Link
            href="/dashboard/listings"
            className="glass-effect rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300"
          >
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-white font-medium">My Listings</p>
          </Link>

          <Link
            href="/dashboard/wallet"
            className="glass-effect rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300"
          >
            <Wallet className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-white font-medium">Wallet</p>
          </Link>

          <Link
            href="/dashboard/settings"
            className="glass-effect rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300"
          >
            <BarChart3 className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-white font-medium">Settings</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
