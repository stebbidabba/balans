'use client'

import { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartContext'
import { createClient } from '../lib/supabase-client'
import type { User } from '@supabase/supabase-js'
import { useI18n } from '@/contexts/I18nContext'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, dispatch } = useCart()
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)
  const { t, lang, setLang } = useI18n()

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Avoid hydration mismatches for elements depending on client-only state
  useEffect(() => {
    setMounted(true)
  }, [])

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
                <span>{t('nav_product')}</span>
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
              {t('nav_shop')}
            </a>
            
            <a href="/results" className="text-white hover:text-brand transition-colors">
              {t('nav_results')}
            </a>
            
            <a href="/about" className="text-white hover:text-brand transition-colors">
              {t('nav_about')}
            </a>
            
            <a href="/contact" className="text-white hover:text-brand transition-colors">
              {t('nav_contact')}
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <a href="/account" className="text-text-muted hover:text-white transition-colors">
                {t('nav_account')}
              </a>
            ) : (
              <>
                <a href="/login" className="text-text-muted hover:text-white transition-colors">
                  {t('nav_login')}
                </a>
                <a href="/signup" className="text-text-muted hover:text-white transition-colors">
                  {t('nav_signup')}
                </a>
              </>
            )}
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'is' : 'en')}
              className="px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              {lang === 'en' ? 'IS' : 'EN'}
            </button>
            <button 
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="px-4 py-2 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all relative"
            >
              {t('nav_cart')}
              {mounted && state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
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
                {t('nav_shop')}
              </a>
              <a href="/results" className="block text-white">
                {t('nav_results')}
              </a>
              <a href="/about" className="block text-white">
                {t('nav_about')}
              </a>
              <a href="/contact" className="block text-white">
                {t('nav_contact')}
              </a>
              <div className="pt-4 space-y-2">
                {user ? (
                  <a href="/account" className="block w-full text-left text-text-muted hover:text-white">
                    {t('nav_account')}
                  </a>
                ) : (
                  <>
                    <a href="/login" className="block w-full text-left text-text-muted hover:text-white">
                      {t('nav_login')}
                    </a>
                    <a href="/signup" className="block w-full text-left text-text-muted hover:text-white">
                      {t('nav_signup')}
                    </a>
                  </>
                )}
                <button 
                  onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                  className="w-full px-4 py-2 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button relative"
                >
                  Cart
                  {mounted && state.items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {state.items.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
