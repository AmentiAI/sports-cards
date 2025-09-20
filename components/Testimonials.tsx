'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, Shield, Award, CheckCircle } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Mike Rodriguez",
    location: "Chicago, IL",
    rating: 5,
    text: "Finally found my grail card! The 1993 SP Derek Jeter rookie in PSA 10 condition. Authentic, properly graded, and shipped securely. These guys know their stuff!",
    card: "1993 SP Derek Jeter Rookie",
    verified: true,
    purchase: "Premium Collection"
  },
  {
    id: 2,
    name: "Sarah Chen",
    location: "Austin, TX",
    rating: 5,
    text: "Been collecting for 20+ years and this is the most trustworthy site I've found. Every card comes with proper authentication. My collection has never looked better!",
    card: "1996 Topps Chrome Kobe Bryant Rookie",
    verified: true,
    purchase: "Premium Collection"
  },
  {
    id: 3,
    name: "David Thompson",
    location: "Phoenix, AZ",
    rating: 5,
    text: "Incredible selection of 90s cards. The condition descriptions are spot-on and the pricing is fair. Already planning my next purchase!",
    card: "1991 Score Football Barry Sanders",
    verified: true,
    purchase: "Mid-Range Collection"
  },
  {
    id: 4,
    name: "Jennifer Martinez",
    location: "Denver, CO",
    rating: 5,
    text: "As a new collector, I was nervous about buying online. The detailed photos and condition reports put my mind at ease. Highly recommended!",
    card: "1995 Topps Finest Michael Jordan",
    verified: true,
    purchase: "Budget Collection"
  },
  {
    id: 5,
    name: "Robert Kim",
    location: "Seattle, WA",
    rating: 5,
    text: "Outstanding customer service and lightning-fast shipping. The card arrived exactly as described. Will definitely be a repeat customer!",
    card: "1994 SP Ken Griffey Jr.",
    verified: true,
    purchase: "Premium Collection"
  }
]

const trustIndicators = [
  { icon: Shield, text: "100% Authentic", subtext: "All cards verified" },
  { icon: Award, text: "PSA/BGS Graded", subtext: "Professional grading" },
  { icon: CheckCircle, text: "Secure Payment", subtext: "Protected transactions" }
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const currentReview = testimonials[currentTestimonial]

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="gradient-text">Trusted by Collectors</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join thousands of satisfied collectors who've found their dream cards with us
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
              <indicator.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{indicator.text}</h3>
              <p className="text-slate-400 text-sm">{indicator.subtext}</p>
            </div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background quote mark */}
            <Quote className="absolute top-4 right-4 w-16 h-16 text-blue-500/10" />
            
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i < currentReview.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-xl md:text-2xl text-slate-200 text-center mb-8 leading-relaxed font-medium">
                "{currentReview.text}"
              </blockquote>

              {/* Customer info */}
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                    <h4 className="text-lg font-semibold text-white">{currentReview.name}</h4>
                    {currentReview.verified && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <p className="text-slate-400 text-sm">{currentReview.location}</p>
                  <p className="text-blue-400 text-sm font-medium">{currentReview.card}</p>
                </div>
                
                <div className="text-center md:text-right">
                  <span className="inline-block bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                    {currentReview.purchase}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">5,000+</div>
            <div className="text-slate-400 text-sm">Happy Collectors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">99.8%</div>
            <div className="text-slate-400 text-sm">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">15,000+</div>
            <div className="text-slate-400 text-sm">Cards Sold</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">4.9★</div>
            <div className="text-slate-400 text-sm">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}


