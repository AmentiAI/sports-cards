import Link from 'next/link'
import { Phone, Mail, MapPin, Shield, CreditCard } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="gradient-text">VINTAGE 90s</span>
              <br />
              <span className="text-sm text-slate-400">SPORTS CARDS</span>
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              Your trusted source for authentic 90s sports cards. 
              Professional grading, secure transactions, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-400" />
              </div>
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/baseball" className="text-slate-300 hover:text-white transition-colors text-sm">
                  ⚾ Baseball Cards
                </Link>
              </li>
              <li>
                <Link href="/football" className="text-slate-300 hover:text-white transition-colors text-sm">
                  🏈 Football Cards
                </Link>
              </li>
              <li>
                <Link href="/basketball" className="text-slate-300 hover:text-white transition-colors text-sm">
                  🏀 Basketball Cards
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Price Ranges */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Price Ranges</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/budget" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Budget ($1-$20)
                </Link>
              </li>
              <li>
                <Link href="/mid-range" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Mid-Range ($20-$100)
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Premium ($100+)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact & Legal</h4>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm">(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm">info@vintage90scards.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm">123 Sports Card Lane</span>
              </div>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Vintage 90s Sports Cards. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm mt-2 md:mt-0">
              Authentic • Professional • Trusted
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
