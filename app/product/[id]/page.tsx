"use client"

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { createClient } from '@/lib/supabase-client'
import { useEffect, useState } from 'react'

interface Product {
  id: number
  name: string
  description: string
  longDescription: string
  price: string
  image: string
  features: string[]
  hormones: Array<{
    name: string
    description: string
    optimalRange: string
    currentValue?: string
  }>
  steps: Array<{
    number: string
    title: string
    description: string
  }>
  benefits: string[]
}

// Legacy static copy used before DB hookup; keep as fallback only
const products: Record<string, Product> = {
  '1': {
    id: 1,
    name: 'Testosterone Kit',
    description: 'Track free testosterone with a simple saliva test.',
    longDescription: 'Our Testosterone Kit provides accurate measurement of free testosterone levels using a convenient at-home saliva test. Understanding your testosterone levels is crucial for energy, muscle mass, mood, and overall vitality.',
    price: '$89.00',
    image: '/testkit.png',
    features: [
      'Saliva tube + prepaid return shipping',
      'Results available in 3–5 business days',
      'Private online dashboard access',
      'Personalized recommendations included'
    ],
    hormones: [
      {
        name: 'Free Testosterone',
        description: 'The bioactive form of testosterone available to your body',
        optimalRange: '50-200 pg/mL',
        currentValue: '85'
      }
    ],
    steps: [
      {
        number: '1',
        title: 'Collect',
        description: 'Collect saliva sample in the morning using the provided tube'
      },
      {
        number: '2',
        title: 'Ship',
        description: 'Use prepaid label to send sample to our certified lab'
      },
      {
        number: '3',
        title: 'Results',
        description: 'Access detailed results and recommendations in your dashboard'
      }
    ],
    benefits: [
      'Monitor energy and vitality levels',
      'Track muscle mass and strength indicators',
      'Understand mood and motivation patterns',
      'Optimize workout and recovery timing'
    ]
  },
  '2': {
    id: 2,
    name: 'Stress & Energy Kit',
    description: 'Assess cortisol and related markers to understand stress load.',
    longDescription: 'The Stress & Energy Kit measures cortisol patterns throughout the day to help you understand your stress response and energy cycles. This comprehensive analysis helps optimize your daily routine for better stress management.',
    price: '$99.00',
    image: '/stresskit.png',
    features: [
      'Morning & evening collection tubes',
      'Lab-grade cortisol analysis',
      'Actionable stress management insights',
      'Lifestyle optimization recommendations'
    ],
    hormones: [
      {
        name: 'Cortisol (AM)',
        description: 'Morning cortisol levels indicate stress response readiness',
        optimalRange: '10-25 ng/mL',
        currentValue: '18'
      },
      {
        name: 'Cortisol (PM)', 
        description: 'Evening levels show daily stress recovery patterns',
        optimalRange: '2-8 ng/mL',
        currentValue: '5'
      }
    ],
    steps: [
      {
        number: '1',
        title: 'Morning Sample',
        description: 'Collect first saliva sample within 1 hour of waking'
      },
      {
        number: '2',
        title: 'Evening Sample',
        description: 'Collect second sample before bedtime (8-10 PM)'
      },
      {
        number: '3',
        title: 'Analysis',
        description: 'Receive comprehensive stress pattern analysis and recommendations'
      }
    ],
    benefits: [
      'Understand your natural energy patterns',
      'Identify optimal times for work and rest',
      'Improve sleep quality and recovery',
      'Develop personalized stress management strategies'
    ]
  },
  '3': {
    id: 3,
    name: 'Complete Hormone Panel',
    description: 'Comprehensive testing for testosterone, cortisol, and DHEA.',
    longDescription: 'Our most comprehensive testing option analyzes multiple key hormones that work together to regulate energy, stress response, and overall vitality. Get the complete picture of your hormonal health.',
    price: '$149.00',
    image: '/testkit.png',
    features: [
      'Tests all major hormone markers',
      'Comprehensive analysis report',
      'Detailed health insights',
      'Expert consultation included'
    ],
    hormones: [
      {
        name: 'Free Testosterone',
        description: 'Bioactive testosterone for energy and vitality',
        optimalRange: '50-200 pg/mL',
        currentValue: '72'
      },
      {
        name: 'Cortisol',
        description: 'Stress hormone regulating energy and inflammation',
        optimalRange: '6-18 ng/mL',
        currentValue: '9.7'
      },
      {
        name: 'DHEA',
        description: 'Precursor hormone supporting overall hormone balance',
        optimalRange: '100-350 μg/dL',
        currentValue: '246'
      }
    ],
    steps: [
      {
        number: '1',
        title: 'Complete Collection',
        description: 'Collect samples for all hormone markers using provided materials'
      },
      {
        number: '2',
        title: 'Lab Processing',
        description: 'Certified lab analyzes all markers with comprehensive testing'
      },
      {
        number: '3',
        title: 'Expert Review',
        description: 'Receive detailed report with expert consultation included'
      }
    ],
    benefits: [
      'Complete hormonal health overview',
      'Identify hormone interactions and patterns',
      'Comprehensive optimization recommendations',
      'Expert guidance for complex cases'
    ]
  }
}


export default function ProductPage({ params }: { params: { id: string } }) {
  const [dbProduct, setDbProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const id = params.id
  const { dispatch } = useCart()

  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('products')
          .select('id,name,description,price_isk,image_url')
          .eq('id', id)
          .single()
        if (data) setDbProduct(data)
      } finally { setLoading(false) }
    })()
  }, [id])
  
  const renderProductIcon = (name: string) => {
    const lower = String(name || '').toLowerCase()
    let type: 'testosterone' | 'stress' | 'complete' | 'generic' = 'generic'
    if (lower.includes('testosterone')) type = 'testosterone'
    else if (lower.includes('stress') || lower.includes('energy')) type = 'stress'
    else if (lower.includes('complete') || lower.includes('panel')) type = 'complete'

    const gradientClass =
      type === 'testosterone'
        ? 'from-amber-300/30 via-orange-400/20 to-rose-400/30'
        : type === 'stress'
        ? 'from-emerald-300/30 via-cyan-300/25 to-sky-400/30'
        : type === 'complete'
        ? 'from-purple-400/30 via-fuchsia-400/20 to-indigo-400/30'
        : 'from-brand/25 via-purple-400/20 to-blue-400/25'

    const iconColor = 'text-white'
    const iconSize = 'w-12 h-12'

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
        return (
          <svg className={`${iconSize} ${iconColor}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6z"/>
          </svg>
        )
      }
      if (type === 'complete') {
        return (
          <svg className={`${iconSize} ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h18"/>
            <rect x="4" y="12" width="3" height="6" rx="1"/>
            <rect x="10.5" y="9" width="3" height="9" rx="1"/>
            <rect x="17" y="6" width="3" height="12" rx="1"/>
          </svg>
        )
      }
      return (
        <svg className={`${iconSize} ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 2v5l-5.5 9.5A4 4 0 0 0 7.9 22h8.2a4 4 0 0 0 3.4-5.5L14 7V2"/>
          <path d="M7 15h10"/>
        </svg>
      )
    }

    return (
      <div className="w-full h-80 bg-transparent rounded-xl flex items-center justify-center overflow-hidden mb-6">
        <div className={`h-36 w-36 rounded-2xl bg-gradient-to-br ${gradientClass} border border-white/10 shadow-inner flex items-center justify-center`}>
          <Icon />
        </div>
      </div>
    )
  }
  
  const product = dbProduct || products[id]
  if (!product) return null

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { product_id: id } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      
      {/* Product Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-brand/15 rounded-full blur-blob" />
        <div className="absolute top-[40%] left-[15%] w-[500px] h-[500px] bg-brand-alt/12 rounded-full blur-blob" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-text-muted mb-6">
                  {product.description}
                </p>
                <p className="text-text-muted leading-relaxed">
                  {product.longDescription}
                </p>
              </div>
              
              <div className="text-4xl font-bold text-white">
                {dbProduct ? `${dbProduct.price_isk} ISK` : product.price}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="px-8 py-4 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all"
                >
                  Add to Cart
                </button>
                <button className="px-8 py-4 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.665 16.811a10.316 10.316 0 01-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.372-1.683-.372-.537 0-1.113.123-1.73.372-.616.25-1.114.381-1.495.393-.579.025-1.164-.236-1.754-.785-.375-.336-.835-.896-1.381-1.677-.585-.848-1.068-1.837-1.447-2.968-.406-1.218-.61-2.4-.61-3.544 0-1.31.282-2.44.845-3.391.563-.95 1.314-1.425 2.253-1.425.442 0 1.022.137 1.738.41.715.272 1.174.41 1.376.41.149 0 .655-.161 1.515-.484.818-.306 1.506-.433 2.067-.384 1.529.123 2.678.726 3.444 1.812-1.37.83-2.048 1.991-2.032 3.483.016 1.16.45 2.126 1.301 2.896.386.35.817.621 1.295.814-.104.269-.213.524-.32.766zM15.998 2.38c0 .909-.331 1.758-.992 2.548-.8.94-1.766 1.483-2.813 1.398a2.826 2.826 0 01-.021-.346c0-.873.378-1.808 1.049-2.573.336-.384.763-.704 1.282-.96.518-.253 1.008-.392 1.469-.415.014.12.021.242.021.348z"/>
                  </svg>
                  Pay
                </button>
              </div>
              
              <div className="text-sm text-text-muted">
                <p className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2 text-brand-alt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free shipping
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-brand-alt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  FSA / HSA accepted
                </p>
              </div>
            </div>

            {/* Right - Product Icon */}
            <div className="glass-card rounded-2xl p-8">
              {renderProductIcon(product.name)}
              
              {/* Hormone Display */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  {product.hormones.length > 1 ? 'Key Hormones Tested' : 'Hormone Tested'}
                </h3>
                {product.hormones.map((hormone: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{hormone.name}</span>
                      <span className="text-brand font-semibold">Optimal</span>
                    </div>
                    <div className="text-sm text-text-muted">
                      Range: {hormone.optimalRange}
                    </div>
                    {/* Simple range indicator */}
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-400 via-emerald-400 to-red-400 rounded-full relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-400"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-blob" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Simple steps to get your hormone insights and start optimizing your health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.steps.map((step: any, index: number) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-brand-alt/10 rounded-full blur-blob" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                What You'll Learn
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.benefits.map((benefit: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-brand-alt mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-text-muted leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
