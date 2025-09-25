import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Shop - Balans',
  description: 'Shop our hormone testing kits and wellness products for better health insights.',
}

export default function ShopPage() {
  const products = [
    {
      id: 1,
      name: 'Testosterone Kit',
      description: 'Track free testosterone with a simple saliva test.',
      price: '$89',
      image: '/testkit.png',
      features: [
        'Saliva tube + prepaid return',
        'Results in 3–5 days',
        'Private online dashboard',
        'Personalized recommendations'
      ],
      popular: false,
      available: true
    },
    {
      id: 2,
      name: 'Stress & Energy Kit',
      description: 'Assess cortisol and related markers to understand stress load.',
      price: '$99',
      image: '/stresskit.png',
      features: [
        'Morning & evening collection',
        'Lab-grade analysis',
        'Actionable insights',
        'Lifestyle recommendations'
      ],
      popular: true,
      available: true
    },
    {
      id: 3,
      name: 'Complete Hormone Panel',
      description: 'Comprehensive testing for testosterone, cortisol, and DHEA.',
      price: '$149',
      image: '/testkit.png',
      features: [
        'All hormone markers',
        'Comprehensive analysis',
        'Detailed health report',
        'Expert consultation included'
      ],
      popular: false,
      available: true
    },
    {
      id: 4,
      name: "Women's Panel",
      description: 'Comprehensive hormone testing designed specifically for women.',
      price: 'TBA',
      image: '/testkit.png',
      features: [
        'Estrogen & progesterone',
        'Thyroid function markers',
        'Cortisol & DHEA analysis',
        'Cycle-specific insights'
      ],
      popular: false,
      available: false,
      comingSoon: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-brand/20 rounded-full blur-blob" />
        <div className="absolute top-[40%] left-[15%] w-[500px] h-[500px] bg-brand-alt/15 rounded-full blur-blob" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Shop Hormone Testing Kits
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Choose from our scientifically-backed testing kits to gain insights into your hormone health and optimize your wellbeing.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-blob" />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-brand-alt/12 rounded-full blur-blob" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`relative glass-card rounded-xl p-8 hover:shadow-xl transition-all duration-300 group ${
                  !product.available ? 'opacity-90' : ''
                }`}
              >
                {/* Popular Badge */}
                {product.popular && product.available && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-brand text-black text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Coming Soon Badge */}
                {product.comingSoon && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Product Image */}
                <div className={`w-full h-48 bg-gradient-to-br from-brand/20 to-brand-alt/20 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative ${
                  !product.available ? 'grayscale' : ''
                }`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={`w-full h-full object-contain p-4 ${
                      !product.available ? 'opacity-60' : ''
                    }`}
                  />
                  {!product.available && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-purple-500/90 text-white px-4 py-2 rounded-lg font-semibold">
                        Coming Soon
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-text-muted">
                        <svg className="w-4 h-4 text-brand-alt mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price and CTA */}
                  <div className="pt-4 space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-white">
                        {product.price}
                      </span>
                    </div>
                    
                    {product.available ? (
                      <a 
                        href={`/product/${product.id}`}
                        className="block w-full px-6 py-3 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all group-hover:scale-105 text-center"
                      >
                        View Details
                      </a>
                    ) : (
                      <button 
                        disabled
                        className="w-full px-6 py-3 rounded-xl bg-gray-600 text-gray-300 font-semibold cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-[30%] left-[20%] w-[350px] h-[350px] bg-brand/8 rounded-full blur-blob" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Why Choose Balans?
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Our testing kits are designed with your convenience and accuracy in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Lab Certified</h3>
              <p className="text-text-muted">
                All tests processed by certified partner laboratories with validated methodologies.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-alt/20 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-brand-alt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">100% Private</h3>
              <p className="text-text-muted">
                Your results are encrypted and only accessible through your secure dashboard.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Fast Results</h3>
              <p className="text-text-muted">
                Get your comprehensive results and recommendations in just 3-5 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
