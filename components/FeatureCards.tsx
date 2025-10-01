'use client'

import { useI18n } from '@/contexts/I18nContext'

export default function FeatureCards() {
  const { t } = useI18n()
  
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
              {/* Card Image */}
              <div className="w-full h-48 bg-gradient-to-br from-brand/20 to-brand-alt/20 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Card Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  {card.title}
                </h3>
                
                <p className="text-text-muted leading-relaxed">
                  {card.desc}
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
