import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact - Balans',
  description: 'Get in touch with our team for support, questions, or partnership opportunities.',
}

export default function ContactPage() {
  const socialCards = [
    {
      platform: 'Email',
      handle: 'hello@balans.com',
      description: 'Questions, support, and general inquiries',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      color: 'from-brand to-purple-600',
      href: 'mailto:hello@balans.com'
    },
    {
      platform: 'Instagram',
      handle: '@balanshealth',
      description: 'Behind-the-scenes and health tips',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.48.204 4.955.388a7.418 7.418 0 0 0-2.676 1.74c-.976.976-1.479 2.168-1.74 2.676C.204 5.48.082 6.094.048 7.042.013 7.989 0 8.396 0 12.017c0 3.624.013 4.09.048 5.101.034.947.156 1.562.34 2.087a7.42 7.42 0 0 0 1.74 2.676c.976.976 2.168 1.479 2.676 1.74.525.184 1.14.306 2.087.34C7.99 23.987 8.396 24 12.017 24c3.624 0 4.09-.013 5.101-.048.947-.034 1.562-.156 2.087-.34a7.42 7.42 0 0 0 2.676-1.74c.976-.976 1.479-2.168 1.74-2.676.184-.525.306-1.14.34-2.087C23.987 16.09 24 15.624 24 12.017c0-3.624-.013-4.09-.048-5.101-.034-.947-.156-1.562-.34-2.087a7.418 7.418 0 0 0-1.74-2.676C20.896.525 19.704.022 19.196-.24c-.525-.184-1.14-.306-2.087-.34C16.09.013 15.624 0 12.017 0zm0 2.16c3.557 0 3.98.013 5.385.048.798.036 1.232.166 1.52.276.382.148.656.325.942.611.287.287.463.56.611.942.11.288.24.722.276 1.52.035 1.406.048 1.829.048 5.385 0 3.557-.013 3.98-.048 5.385-.036.798-.166 1.232-.276 1.52a2.611 2.611 0 0 1-.611.942 2.611 2.611 0 0 1-.942.611c-.288.11-.722.24-1.52.276-1.405.035-1.828.048-5.385.048-3.557 0-3.98-.013-5.385-.048-.798-.036-1.232-.166-1.52-.276a2.611 2.611 0 0 1-.942-.611 2.611 2.611 0 0 1-.611-.942c-.11-.288-.24-.722-.276-1.52C2.173 16.037 2.16 15.614 2.16 12.057c0-3.557.013-3.98.048-5.385.036-.798.166-1.232.276-1.52a2.611 2.611 0 0 1 .611-.942 2.611 2.611 0 0 1 .942-.611c.288-.11.722-.24 1.52-.276C8.037 2.173 8.46 2.16 12.017 2.16zm0 3.385a6.472 6.472 0 1 0 0 12.944 6.472 6.472 0 0 0 0-12.944zm0 10.67a4.198 4.198 0 1 1 0-8.396 4.198 4.198 0 0 1 0 8.396zm8.24-10.905a1.512 1.512 0 1 1-3.024 0 1.512 1.512 0 0 1 3.024 0z"/>
        </svg>
      ),
      color: 'from-pink-500 to-orange-400',
      href: 'https://instagram.com/balanshealth'
    },
    {
      platform: 'TikTok',
      handle: '@balanshealth',
      description: 'Quick health tips and insights',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.2-.26z"/>
        </svg>
      ),
      color: 'from-pink-500 to-red-500',
      href: 'https://tiktok.com/@balanshealth'
    },
    {
      platform: 'LinkedIn',
      handle: 'Balans Health',
      description: 'Company updates and partnerships',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'from-blue-600 to-blue-800',
      href: 'https://linkedin.com/company/balanshealth'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      
      {/* Unified Background - Full color flow like home page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Top flowing effects */}
        <div className="absolute top-[5%] right-[10%] w-[1200px] h-[1200px] bg-gradient-to-bl from-brand/8 via-purple-400/6 to-pink-400/4 rounded-full blur-blob" />
        <div className="absolute top-[20%] left-[15%] w-[1000px] h-[1000px] bg-gradient-to-tr from-brand-alt/7 via-cyan-400/5 to-emerald-400/3 rounded-full blur-blob" />
        <div className="absolute top-[40%] center w-[1400px] h-[1400px] bg-gradient-to-b from-purple-500/6 via-violet-400/5 to-blue-400/4 rounded-full blur-blob" style={{ left: '50%', transform: 'translateX(-50%)' }} />
        
        {/* Middle spanning effects */}
        <div className="absolute center left w-[1600px] h-[1600px] bg-gradient-to-tr from-rose-400/6 via-orange-400/4 to-amber-400/3 rounded-full blur-blob" style={{ left: '20%', top: '60%', transform: 'translateY(-50%)' }} />
        <div className="absolute center right w-[1400px] h-[1400px] bg-gradient-to-tl from-teal-400/6 via-cyan-400/4 to-sky-400/3 rounded-full blur-blob" style={{ right: '20%', top: '60%', transform: 'translateY(-50%)' }} />
        
        {/* Bottom effects stopping before footer */}
        <div className="absolute bottom-[15%] right-[25%] w-[1200px] h-[1200px] bg-gradient-to-tl from-indigo-400/6 via-purple-400/4 to-brand/3 rounded-full blur-blob" />
        <div className="absolute bottom-[20%] left-[30%] w-[1000px] h-[1000px] bg-gradient-to-br from-violet-400/5 via-brand/4 to-brand-alt/3 rounded-full blur-blob" />
        <div className="absolute bottom-[10%] center w-[1400px] h-[1400px] bg-gradient-to-t from-brand/4 via-brand-alt/3 to-purple-500/2 rounded-full blur-blob" style={{ left: '50%', transform: 'translateX(-50%)' }} />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-visible">
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto mb-8">
            From questions to partnerships, discover the updates and support shaping your hormone health journey.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative py-16 overflow-visible">
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialCards.map((card, index) => (
              <a
                key={index}
                href={card.href}
                className="group relative glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300 text-center"
                target={card.platform === 'Email' ? '_self' : '_blank'}
                rel={card.platform === 'Email' ? '' : 'noopener noreferrer'}
              >
                {/* Icon Background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {card.icon}
                  </div>
                </div>

                {/* Platform Name */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand transition-colors">
                  {card.platform.toUpperCase()}
                </h3>

                {/* Handle */}
                <div className="text-lg font-medium text-brand mb-3">
                  {card.handle}
                </div>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed">
                  {card.description}
                </p>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand/5 to-brand-alt/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Contact Info */}
      <section className="relative py-16 overflow-visible">
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Need More Help?
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                Our support team is here to help with any questions about your hormone testing journey, 
                technical issues, or partnership opportunities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
                  <p className="text-text-muted text-sm">Get help with your tests and results</p>
                </div>
                
                <div>
                  <div className="w-12 h-12 rounded-full bg-brand-alt/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-brand-alt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                  <p className="text-text-muted text-sm">Explore collaboration opportunities</p>
                </div>
                
                <div>
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Press</h3>
                  <p className="text-text-muted text-sm">Media inquiries and press kit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
