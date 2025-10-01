'use client'

import { useState } from 'react'
import { useI18n } from '@/contexts/I18nContext'

export default function Footer() {
  const [email, setEmail] = useState('')
  const { t } = useI18n()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to /api/subscribe
    console.log('Email subscribed:', email)
    setEmail('')
  }

  const leftColumns = [
    {
      title: "Balans",
      links: [
        { label: t('footer_testosterone') || "Testosterone Kit", href: "/product/testosterone" },
        { label: t('footer_stress_energy') || "Stress & Energy Kit", href: "/product/stress-energy" },
        { label: t('footer_how') || "How it works", href: "#how" },
        { label: t('footer_science') || "Science", href: "/science" },
        { label: t('footer_faq') || "FAQ", href: "#faq" }
      ]
    },
    {
      title: t('footer_company') || "Company",
      links: [
        { label: t('footer_about') || "About", href: "/about" },
        { label: t('footer_contact') || "Contact", href: "/contact" },
        { label: t('footer_careers') || "Careers", href: "/careers" },
        { label: t('footer_news') || "News", href: "/news" }
      ]
    },
    {
      title: t('footer_resources') || "Resources",
      links: [
        { label: t('footer_insights') || "Insights", href: "/insights" },
        { label: t('footer_guides') || "Guides", href: "/guides" },
        { label: t('footer_support') || "Support", href: "/support" }
      ]
    }
  ]

  return (
    <footer className="relative w-full bg-bg-card text-text-primary py-20 border-t border-divider z-50">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16">
          
          {/* Left Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {leftColumns.map((column, index) => (
              <div key={index} className="space-y-5">
                {index === 0 ? (
                  <div className="flex items-center">
                    <a href="/" className="hover:opacity-80 transition-opacity">
                      <img 
                        src="/whitelogo.png" 
                        alt="Balans" 
                        className="h-8 w-auto cursor-pointer"
                      />
                    </a>
                  </div>
                ) : (
          <h4 className="text-lg leading-[1.2] text-text-muted font-medium">
            {column.title}
          </h4>
                )}
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="block text-sm leading-tight text-text-primary hover:opacity-80 transition-opacity"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right CTA Panel */}
          <div className="space-y-7">
            {/* Contact Card */}
            <div className="space-y-4">
              <h3 className="text-lg leading-[1.2] text-text-muted font-medium">
                {t('footer_have_questions') || 'Have questions?'}
              </h3>
              <a
                href="/contact"
                className="block w-full h-14 rounded-xl bg-brand text-black font-semibold shadow-button hover:opacity-90 transition-all flex items-center justify-center"
              >
                {t('footer_contact_us') || 'Contact us'}
              </a>
            </div>

            {/* Email Capture */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg leading-[1.2] text-text-muted font-medium mb-2">
                  {t('footer_get_updates') || 'Get updates'}
                </h3>
                <p className="text-text-muted text-sm">
                  {t('footer_email_prompt') || "Drop us your email to learn what's next."}
                </p>
              </div>
              
              <form onSubmit={handleEmailSubmit} className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer_email_placeholder') || 'your@email.com'}
                  className="w-full h-14 rounded-xl bg-white/10 backdrop-blur border border-white/20 px-5 pr-14 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 w-10 h-10 rounded-lg bg-brand hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <svg 
                    className="w-5 h-5 text-black" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 4v16m8-8H4" 
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-white/8 pt-6 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-xs text-text-muted">
              {t('footer_copyright') || '© Balans. All rights reserved.'}
            </p>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              <a
                href="/privacy"
                className="text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                {t('footer_privacy') || 'Privacy policy'}
              </a>
              <a
                href="/terms"
                className="text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                {t('footer_terms') || 'Terms of service'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
