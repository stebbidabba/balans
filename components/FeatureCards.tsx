'use client'

import { useI18n } from '@/contexts/I18nContext'

export default function FeatureCards() {
  const { t } = useI18n()
  
  const formatI18n = (value: any) => {
    const text = String(value ?? '')
    if (!text) return ''
    if (text.includes('_') && !text.includes(' ')) {
      const spaced = text.replace(/_/g, ' ')
      return spaced.replace(/\b\w/g, (m) => m.toUpperCase())
    }
    return text
  }

  const renderCardIcon = (title: string) => {
    const name = String(title || '').toLowerCase()
    let type: 'testosterone' | 'stress' | 'complete' | 'generic' = 'generic'
    if (name.includes('testosterone')) type = 'testosterone'
    else if (name.includes('stress') || name.includes('energy')) type = 'stress'
    else if (name.includes('complete') || name.includes('panel')) type = 'complete'

    const gradientClass =
      type === 'testosterone'
        ? 'from-amber-300/30 via-orange-400/20 to-rose-400/30'
        : type === 'stress'
        ? 'from-emerald-300/30 via-cyan-300/25 to-sky-400/30'
        : type === 'complete'
        ? 'from-purple-400/30 via-fuchsia-400/20 to-indigo-400/30'
        : 'from-brand/25 via-purple-400/20 to-blue-400/25'

    const iconColor = 'text-white'
    const iconSize = 'w-10 h-10'

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
      <div className="w-full h-48 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
        <div className={`h-28 w-28 rounded-2xl bg-gradient-to-br ${gradientClass} border border-white/10 shadow-inner flex items-center justify-center`}>
          <Icon />
        </div>
      </div>
    )
  }

  const cards = [
    {
      title: t('testosterone_kit'),
      desc: t('testosterone_kit_description'),
      image: "/testkit.png",
      bullets: [
        t('feature_saliva_tube'),
        t('feature_results_3_5_days'),
        t('feature_private_dashboard')
      ],
      cta: { label: `${t('order_now')} — 12.900 ISK`, href: "/product/1" }
    },
    {
      title: t('stress_energy_kit'),
      desc: t('stress_energy_kit_description'),
      image: "/stresskit.png",
      bullets: [
        t('feature_morning_evening'),
        t('feature_lab_grade_analysis'),
        t('feature_actionable_insights')
      ],
      cta: { label: `${t('order_now')} — 14.400 ISK`, href: "/product/2" }
    },
    {
      title: t('complete_hormone_panel'),
      desc: t('complete_hormone_panel_description'),
      image: "/testkit.png",
      bullets: [
        t('feature_full_hormone_spectrum'),
        t('feature_advanced_biomarkers'),
        t('feature_expert_guidance')
      ],
      cta: { label: `${t('order_now')} — 19.900 ISK`, href: "/product/3" }
    }
  ]

  return (
    <section className="relative py-24 overflow-visible" style={{ background: 'transparent' }}>
      {/* Same blob structure, colors naturally evolving */}
      <div className="absolute top-[-70%] left-[10%] w-[1600px] h-[1600px] bg-gradient-to-br from-purple-400/8 to-rose-400/6 rounded-full blur-blob" />
      <div className="absolute top-[-50%] right-[5%] w-[1400px] h-[1400px] bg-gradient-to-tl from-pink-400/10 to-orange-400/6 rounded-full blur-blob" />
      <div className="absolute top-[-60%] center w-[1800px] h-[1800px] bg-gradient-to-b from-brand/6 via-rose-400/4 to-amber-400/3 rounded-full blur-blob" style={{ left: '50%', transform: 'translateX(-50%)' }} />
      
      {/* Massive blobs spanning multiple sections */}
      <div className="absolute bottom-[-80%] left-[40%] w-[2200px] h-[2200px] bg-gradient-to-tr from-rose-400/6 via-orange-400/4 to-yellow-400/3 rounded-full blur-blob" />
      <div className="absolute bottom-[-60%] right-[20%] w-[2000px] h-[2000px] bg-gradient-to-bl from-orange-400/5 via-amber-400/3 to-lime-400/2 rounded-full blur-blob" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Choose your kit
          </h2>
          <p className="text-lg text-text-muted">
            Clinically backed. Minimal design.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-8 shadow-soft hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Icon */}
            {renderCardIcon(card.title as unknown as string)}

              {/* Card Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  {formatI18n(card.title)}
                </h3>
                
                <p className="text-text-muted leading-relaxed">
                  {formatI18n(card.desc)}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2">
                  {card.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-center text-sm text-text-muted">
                      <svg className="w-4 h-4 text-brand-alt mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-4">
                  <a
                    href={card.cta.href}
                    className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all group-hover:scale-105"
                  >
                    {card.cta.label}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
