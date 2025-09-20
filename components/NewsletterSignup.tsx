'use client'

import { useState } from 'react'
import { Mail, Gift, Star, CheckCircle, Zap } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
      setEmail('')
    }, 2000)
  }

  const benefits = [
    "Exclusive member-only deals",
    "Early access to new arrivals", 
    "Weekly collector tips & insights",
    "Special discounts on bulk purchases"
  ]

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-effect rounded-2xl p-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to the VIP Club! 🎉
              </h2>
              <p className="text-xl text-slate-300 mb-6">
                Check your email for your exclusive 20% discount code
              </p>
              <div className="bg-green-600/20 text-green-300 px-6 py-3 rounded-xl font-semibold text-lg">
                Code: VIP20 - Valid for 48 hours
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-600/20 to-transparent rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Benefits */}
                <div>
                  <div className="inline-flex items-center space-x-2 bg-purple-600/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <Star className="w-4 h-4" />
                    <span>VIP COLLECTOR CLUB</span>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Join Our <span className="gradient-text">Exclusive</span> Collector Community
                  </h2>
                  
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                    Get insider access to rare finds, exclusive deals, and expert collector insights delivered straight to your inbox.
                  </p>

                  <div className="space-y-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center space-x-2 text-green-400 font-semibold mb-2">
                      <Gift className="w-5 h-5" />
                      <span>Instant Welcome Bonus</span>
                    </div>
                    <p className="text-white font-bold text-lg">20% OFF your first purchase + FREE shipping!</p>
                  </div>
                </div>

                {/* Right side - Signup form */}
                <div>
                  <div className="glass-effect rounded-2xl p-8 border border-slate-600/50">
                    <div className="text-center mb-6">
                      <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Get Your Discount Now</h3>
                      <p className="text-slate-400">Join 5,000+ collectors already saving big</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="input-field text-lg py-4"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                            Joining...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Zap className="w-5 h-5 mr-2" />
                            Claim 20% OFF + Free Shipping
                          </span>
                        )}
                      </button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-xs text-slate-500">
                        No spam, ever. Unsubscribe anytime. Your privacy is protected.
                      </p>
                    </div>

                    {/* Social proof */}
                    <div className="mt-6 pt-6 border-t border-slate-600/50">
                      <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>4.9/5 rating</span>
                        </div>
                        <div className="w-px h-4 bg-slate-600"></div>
                        <div>5,000+ members</div>
                        <div className="w-px h-4 bg-slate-600"></div>
                        <div>Trusted since 2020</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


