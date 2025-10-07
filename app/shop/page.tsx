'use client'

import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import Link from 'next/link'
import PersonalizedProducts from '@/components/PersonalizedProducts'
import { useI18n } from '@/contexts/I18nContext'

export default function ShopPage() {
  const { dispatch } = useCart()
  const { t } = useI18n()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const handleAddToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id.toString(),
        name: product.name,
        price: product.price_isk ? product.price_isk / 100 : parseFloat(product.price?.replace('$', '') || '0'),
        image: product.image_url || product.image || '/testkit.png',
        variant: product.description
      }
    })
    // Cart will not open automatically - user must click cart button
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...')
        const supabase = createClient()
        // If env vars are missing, supabase may be null (soft fallback)
        if (!supabase) {
          console.log('Supabase client not configured; using fallback products')
          setProducts(fallbackProducts)
          return
        }
        const { data, error } = await supabase.from("products")
          .select("id, name, description, price_isk, sku, image_url")
          .eq("active", true)
          .order("created_at", { ascending: true })

        console.log('Supabase response:', { data, error })

        if (error) {
          console.error('Failed to load products:', error)
          setError(error.message)
          // Use fallback products
          console.log('Using fallback products due to error')
          setProducts(fallbackProducts)
        } else if (data && data.length > 0) {
          console.log('Using Supabase products:', data)
          setProducts(data)
        } else {
          // Use fallback products if no data
          console.log('No Supabase data, using fallback products')
          setProducts(fallbackProducts)
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to fetch products')
        console.log('Using fallback products due to exception')
        setProducts(fallbackProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Fallback products with translation keys
  const fallbackProducts = [
    {
      id: 1,
      name: t('testosterone_kit'),
      description: t('testosterone_kit_description'),
      price: '$89',
      price_isk: 12900,
      image: '/testkit.png',
      features: [
        t('feature_saliva_tube'),
        t('feature_results_3_5_days'),
        t('feature_private_dashboard'),
        t('feature_personalized_recommendations')
      ],
      popular: false,
      available: true
    },
    {
      id: 2,
      name: t('stress_energy_kit'),
      description: t('stress_energy_kit_description'),
      price: '$99',
      price_isk: 14400,
      image: '/stresskit.png',
      features: [
        t('feature_morning_evening'),
        t('feature_lab_grade_analysis'),
        t('feature_actionable_insights'),
        t('feature_stress_management_tips')
      ],
      popular: true,
      available: true
    },
    {
      id: 3,
      name: t('complete_hormone_panel'),
      description: t('complete_hormone_panel_description'),
      price: '$139',
      price_isk: 19900,
      image: '/testkit.png',
      features: [
        t('feature_full_hormone_spectrum'),
        t('feature_advanced_biomarkers'),
        t('feature_detailed_health_report'),
        t('feature_expert_guidance')
      ],
      popular: false,
      available: true
    },
    {
      id: 4,
      name: t('womens_panel'),
      description: t('womens_panel_description'),
      price: '$119',
      price_isk: 17000,
      image: '/testkit.png',
      features: [
        t('feature_female_specific'),
        t('feature_cycle_tracking'),
        t('feature_fertility_markers'),
        t('feature_menopause_indicators')
      ],
      popular: false,
      available: false // Coming soon
    }
  ]

  const formatI18n = (value: any) => {
    const text = String(value ?? '')
    if (!text) return ''
    // If looks like a key (snake_case), make it human-friendly
    if (text.includes('_') && !text.includes(' ')) {
      const spaced = text.replace(/_/g, ' ')
      return spaced.replace(/\b\w/g, (m) => m.toUpperCase())
    }
    return text
  }

  const renderProductIcon = (product: any) => {
    const name = String(product.name || '').toLowerCase()
    const isUnavailable = product.available === false

    let type: 'testosterone' | 'stress' | 'complete' | 'women' | 'generic' = 'generic'
    if (name.includes('testosterone')) type = 'testosterone'
    else if (name.includes('stress') || name.includes('energy')) type = 'stress'
    else if (name.includes('complete') || name.includes('panel')) type = 'complete'
    else if (name.includes('women')) type = 'women'

    const gradientClass =
      type === 'testosterone'
        ? 'from-amber-300/30 via-orange-400/20 to-rose-400/30'
        : type === 'stress'
        ? 'from-emerald-300/30 via-cyan-300/25 to-sky-400/30'
        : type === 'complete'
        ? 'from-purple-400/30 via-fuchsia-400/20 to-indigo-400/30'
        : type === 'women'
        ? 'from-pink-300/30 via-rose-300/25 to-purple-300/30'
        : 'from-brand/25 via-purple-400/20 to-blue-400/25'

    const iconColor = isUnavailable ? 'text-white/40' : 'text-white'

    const iconSize = 'w-10 h-10'

    // Icons are simple, crisp, and semantic per kit type
    const Icon = () => {
      if (type === 'testosterone') {
        // Atom-style icon
        return (
          <svg className={`${iconSize} ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="2"/>
            <path d="M2 12c0-2.21 4.477-4 10-4s10 1.79 10 4-4.477 4-10 4-10-1.79-10-4z"/>
            <path d="M6.5 4.5c1.558-1.558 6.15.084 10.269 4.203 4.118 4.118 5.76 8.711 4.203 10.269-1.558 1.558-6.151-.085-10.269-4.203C6.585 10.65 4.943 6.058 6.5 4.5z"/>
            <path d="M17.5 4.5c-1.558-1.558-6.151.085-10.269 4.203C3.113 12.821 1.471 17.414 3.029 18.971c1.558 1.558 6.151-.085 10.269-4.203C17.915 10.65 19.557 6.058 17.5 4.5z"/>
          </svg>
        )
      }
      if (type === 'stress') {
        // Bolt/energy icon
        return (
          <svg className={`${iconSize} ${iconColor}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6z"/>
          </svg>
        )
      }
      if (type === 'complete') {
        // Analytics/graph icon
        return (
          <svg className={`${iconSize} ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h18"/>
            <rect x="4" y="12" width="3" height="6" rx="1"/>
            <rect x="10.5" y="9" width="3" height="9" rx="1"/>
            <rect x="17" y="6" width="3" height="12" rx="1"/>
          </svg>
        )
      }
      if (type === 'women') {
        // Venus/female icon
        return (
          <svg className={`${iconSize} ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="7" r="5"/>
            <path d="M12 12v10M9 19h6"/>
          </svg>
        )
      }
      // Generic beaker
      return (
        <svg className={`${iconSize} ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 2v5l-5.5 9.5A4 4 0 0 0 7.9 22h8.2a4 4 0 0 0 3.4-5.5L14 7V2"/>
          <path d="M7 15h10"/>
        </svg>
      )
    }

    return (
      <div className={`relative mb-7 flex items-center justify-center`}>
        <div className={`h-28 w-28 rounded-2xl bg-gradient-to-br ${gradientClass} border border-white/10 shadow-inner flex items-center justify-center ${isUnavailable ? 'grayscale opacity-70' : ''}`}>
          <Icon />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        
        {/* Background blur effects */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-gradient-to-br from-brand/25 via-purple-500/15 to-blue-500/20 rounded-full blur-blob"></div>
          <div className="absolute top-[20%] -right-[10%] w-[700px] h-[700px] bg-gradient-to-bl from-emerald-400/20 via-cyan-400/15 to-brand/25 rounded-full blur-blob"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/15 via-pink-400/10 to-brand/20 rounded-full blur-blob"></div>
        </div>

        <section className="relative pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
            <div className="animate-pulse">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('loading_products')}</h1>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      
      {/* Background blur effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-gradient-to-br from-brand/25 via-purple-500/15 to-blue-500/20 rounded-full blur-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[700px] h-[700px] bg-gradient-to-bl from-emerald-400/20 via-cyan-400/15 to-brand/25 rounded-full blur-blob"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/15 via-pink-400/10 to-brand/20 rounded-full blur-blob"></div>
      </div>

      <section className="relative pt-32 pb-20 overflow-visible">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-white mb-6">
              {t('shop_hormone_testing_kits')}
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              {t('shop_description')}
            </p>
          </div>

          {/* Personalized Recommendations - Temporarily disabled for debugging */}
          {/* <div className="mb-16">
            <PersonalizedProducts />
          </div> */}

          {/* All Products Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{t('all_products')}</h2>
            <p className="text-text-muted">{t('browse_complete_collection')}</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <div key={product.id} className="group relative">
                <div className="bg-bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:shadow-glow h-full flex flex-col">
                  {/* Product Badge */}
                  {product.popular && (
                    <div className="absolute -top-3 -right-3 bg-brand text-black px-4 py-1 rounded-full text-sm font-semibold shadow-button">
                      {t('popular')}
                    </div>
                  )}

                  {product.available === false && (
                    <div className="absolute -top-3 -right-3 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {t('coming_soon')}
                    </div>
                  )}

                  {/* Product Icon */}
                  {renderProductIcon(product)}

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {formatI18n(product.name)}
                    </h3>
                    <p className="text-text-muted leading-relaxed mb-6 flex-1">
                      {formatI18n(product.description)}
                    </p>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="mb-6">
                        <ul className="space-y-2">
                          {product.features.slice(0, 3).map((feature: string, index: number) => (
                            <li key={index} className="flex items-center text-sm text-text-muted">
                              <svg className="w-4 h-4 text-brand mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {formatI18n(feature)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Price and CTA */}
                    <div className="pt-4 space-y-4">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-white">
                          {product.price_isk ? `${product.price_isk} ISK` : (product.price || t('price_on_request'))}
                        </span>
                      </div>
                      
                      {product.available !== false ? (
                        <div className="space-y-2">
                          <Link 
                            href={`/checkout?product=${product.id}&qty=1`}
                            className="w-full block text-center px-6 py-3 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all group-hover:scale-105"
                          >
                            {t('buy_now')} — {product.price_isk ? `${product.price_isk} ISK` : (product.price || t('price_tbd'))}
                          </Link>
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="w-full px-6 py-2 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-all"
                          >
                            {t('add_to_cart')}
                          </button>
                          <Link 
                            href={`/product/${product.id}`}
                            className="w-full block text-center px-6 py-2 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-all"
                          >
                            {t('view_details')}
                          </Link>
                        </div>
                      ) : (
                        <button 
                          disabled
                          className="w-full px-6 py-3 rounded-xl bg-gray-600 text-gray-300 font-semibold cursor-not-allowed"
                        >
                          {t('coming_soon')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Database Status */}
          {error && (
            <div className="mt-8 text-center">
              <p className="text-sm text-yellow-400">
                {t('fallback_products_note')}: {error}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}