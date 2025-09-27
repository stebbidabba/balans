'use client'

import Navigation from '@/components/Navigation'
import HormoneCards from '@/components/HormoneCards'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'

export default function ProcessAndResultsPage() {
  const { dispatch } = useCart()
  
  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: '1',
        name: 'Testosterone Kit',
        price: 89,
        image: '/testkit.png',
        variant: 'Track free testosterone with a simple saliva test.'
      }
    })
    // Cart will not open automatically - user must click cart button
  }
  const processSteps = [
    {
      number: "1",
      title: "Order Your Kit",
      description: "Choose your hormone testing kit and complete your secure checkout. Your kit ships within 24 hours with everything you need."
    },
    {
      number: "2", 
      title: "Collect Sample",
      description: "Follow our simple 3-minute instructions to collect your saliva sample at home. No needles, no lab visits required."
    },
    {
      number: "3",
      title: "Send to Lab",
      description: "Use the prepaid shipping label to send your sample to our certified partner laboratory for professional analysis."
    },
    {
      number: "4",
      title: "Get Results",
      description: "Access your comprehensive hormone analysis and personalized recommendations through your private dashboard."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      
      {/* Unified Background - Full color flow like home page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Rich top effects */}
        <div className="absolute top-[8%] right-[12%] w-[1400px] h-[1400px] bg-gradient-to-bl from-brand/9 via-purple-400/7 to-pink-400/5 rounded-full blur-blob" />
        <div className="absolute top-[25%] left-[18%] w-[1200px] h-[1200px] bg-gradient-to-tr from-brand-alt/8 via-cyan-400/6 to-emerald-400/4 rounded-full blur-blob" />
        <div className="absolute top-[45%] center w-[1600px] h-[1600px] bg-gradient-to-b from-purple-500/7 via-violet-400/6 to-blue-400/5 rounded-full blur-blob" style={{ left: '50%', transform: 'translateX(-50%)' }} />
        
        {/* Middle spanning effects */}
        <div className="absolute center left w-[1800px] h-[1800px] bg-gradient-to-tr from-rose-400/7 via-orange-400/5 to-amber-400/4 rounded-full blur-blob" style={{ left: '15%', top: '65%', transform: 'translateY(-50%)' }} />
        <div className="absolute center right w-[1600px] h-[1600px] bg-gradient-to-tl from-teal-400/7 via-cyan-400/5 to-sky-400/4 rounded-full blur-blob" style={{ right: '15%', top: '65%', transform: 'translateY(-50%)' }} />
        
        {/* Bottom effects stopping before footer */}
        <div className="absolute bottom-[20%] right-[20%] w-[1400px] h-[1400px] bg-gradient-to-tl from-indigo-400/7 via-purple-400/5 to-brand/4 rounded-full blur-blob" />
        <div className="absolute bottom-[25%] left-[25%] w-[1200px] h-[1200px] bg-gradient-to-br from-violet-400/6 via-brand/5 to-brand-alt/4 rounded-full blur-blob" />
        <div className="absolute bottom-[15%] center w-[1600px] h-[1600px] bg-gradient-to-t from-brand/5 via-brand-alt/4 to-purple-500/3 rounded-full blur-blob" style={{ left: '50%', transform: 'translateX(-50%)' }} />
        <div className="absolute bottom-[30%] right-[40%] w-[1000px] h-[1000px] bg-gradient-to-tl from-purple-400/4 via-violet-400/3 to-indigo-400/2 rounded-full blur-blob" />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-visible">
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Process and Results
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Discover how our streamlined testing process delivers accurate hormone insights 
              to help you optimize your health and wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-16 overflow-visible">
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            
            {/* Left Side - Title and Description */}
            <div className="lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                how it works
              </h2>
              <p className="text-lg text-text-muted leading-relaxed mb-8">
                Our simple 4-step process makes hormone testing convenient, accurate, and completely private. 
                Get lab-quality results from the comfort of your home.
              </p>
              
                  <button 
                    onClick={handleAddToCart}
                    className="px-8 py-4 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all"
                  >
                    Add to Cart
                  </button>
              
              <div className="mt-8 text-sm text-text-muted">
                <p>Need testing for larger organizations?</p>
                <a href="/contact" className="text-brand hover:text-brand-alt transition-colors">
                  Contact us for bulk pricing
                </a>
              </div>
            </div>

            {/* Right Side - Process Steps */}
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center">
                      <span className="text-xl font-bold text-black">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-brand mb-4">
                      {step.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative py-16 overflow-visible">
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Results
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Here's what your comprehensive hormone analysis looks like, with clear insights 
              and actionable recommendations for optimizing your health.
            </p>
          </div>
          
          <HormoneCards />
        </div>
      </section>

      {/* App Guidance Section */}
      <section className="relative py-16 overflow-visible">
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Beyond Results
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto">
              The Balans app doesn't just show you numbers—it guides you on your journey to optimal hormone health 
              with personalized recommendations, tracking tools, and expert insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - App Features */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Progress Tracking
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Monitor your hormone levels over time with beautiful charts and trend analysis. 
                    See how lifestyle changes impact your hormonal balance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-brand-alt/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand-alt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Personalized Action Plans
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Get custom recommendations for nutrition, exercise, sleep, and supplements 
                    based on your specific hormone profile and health goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Smart Reminders
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Never miss important health actions with intelligent reminders for retesting, 
                    supplement schedules, and lifestyle habit tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Expert Insights
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Access educational content, research-backed articles, and expert tips 
                    to deepen your understanding of hormone health and optimization.
                  </p>
                </div>
              </div>
            </div>

            {/* Right - App Preview/Mockup */}
            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-full h-80 bg-gradient-to-br from-brand/20 to-brand-alt/20 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand/30 flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-text-muted text-sm">
                    Balans Mobile App<br/>
                    Coming Soon
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Your Health Companion
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                The complete hormone optimization experience in your pocket. 
                Track, learn, and improve your health with science-backed guidance.
              </p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Evidence-Based</h4>
              <p className="text-text-muted text-sm leading-relaxed">
                All recommendations are backed by peer-reviewed research and validated by 
                hormone health experts and endocrinologists.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Personalized</h4>
              <p className="text-text-muted text-sm leading-relaxed">
                Every recommendation is tailored to your unique hormone profile, lifestyle, 
                age, and health goals for maximum effectiveness.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-alt/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-alt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Actionable</h4>
              <p className="text-text-muted text-sm leading-relaxed">
                Simple, practical steps you can implement immediately. No overwhelming 
                information—just clear guidance for better hormone health.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
