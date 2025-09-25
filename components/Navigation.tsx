'use client'

import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/whitelogo.png" 
                alt="Balans" 
                className="h-8 w-auto cursor-pointer"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-white hover:text-brand transition-colors flex items-center space-x-1">
                <span>Product</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-bg-card rounded-xl border border-white/10 shadow-soft opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  <a href="/product/1" className="block px-3 py-2 text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Testosterone Kit
                  </a>
                  <a href="/product/2" className="block px-3 py-2 text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Stress & Energy Kit
                  </a>
                  <a href="/product/3" className="block px-3 py-2 text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Complete Hormone Panel
                  </a>
                </div>
              </div>
            </div>
            
            <a href="/shop" className="text-white hover:text-brand transition-colors">
              Shop
            </a>
            
            <a href="/results" className="text-white hover:text-brand transition-colors">
              Process & Results
            </a>
            
            {/* About Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-brand transition-colors flex items-center space-x-1">
                <span>About</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-40 bg-bg-card rounded-xl border border-white/10 shadow-soft opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  <a href="/about" className="block px-3 py-2 text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    The Company
                  </a>
                  <a href="/lab" className="block px-3 py-2 text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    The Lab
                  </a>
                </div>
              </div>
            </div>
            
            <a href="/contact" className="text-white hover:text-brand transition-colors">
              Contact
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-text-muted hover:text-white transition-colors">
              Log in
            </button>
            <button className="px-4 py-2 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all">
              Cart
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="space-y-4">
              <div>
                <div className="text-white font-medium mb-2">Product</div>
                <div className="pl-4 space-y-2">
                  <a href="/product/1" className="block text-text-muted hover:text-white">
                    Testosterone Kit
                  </a>
                  <a href="/product/2" className="block text-text-muted hover:text-white">
                    Stress & Energy Kit
                  </a>
                  <a href="/product/3" className="block text-text-muted hover:text-white">
                    Complete Hormone Panel
                  </a>
                </div>
              </div>
              <a href="/shop" className="block text-white">
                Shop
              </a>
              <a href="/results" className="block text-white">
                Process & Results
              </a>
              <div>
                <div className="text-white font-medium mb-2">About</div>
                <div className="pl-4 space-y-2">
                  <a href="/about" className="block text-text-muted hover:text-white">
                    The Company
                  </a>
                  <a href="/lab" className="block text-text-muted hover:text-white">
                    The Lab
                  </a>
                </div>
              </div>
              <a href="/contact" className="block text-white">
                Contact
              </a>
              <div className="pt-4 space-y-2">
                <button className="block w-full text-left text-text-muted hover:text-white">
                  Log in
                </button>
                <button className="w-full px-4 py-2 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button">
                  Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
