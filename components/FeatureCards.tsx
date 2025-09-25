'use client'

export default function FeatureCards() {
  const cards = [
    {
      title: "Testosterone Kit",
      desc: "Track free testosterone with a simple saliva test.",
      image: "/testkit.png",
      bullets: [
        "Saliva tube + prepaid return",
        "Results in 3–5 days",
        "Private online dashboard"
      ],
      cta: { label: "Order now — $89", href: "/product/1" }
    },
    {
      title: "Stress & Energy Kit",
      desc: "Assess cortisol and related markers to understand stress load.",
      image: "/stresskit.png",
      bullets: [
        "Morning & evening collection",
        "Lab-grade analysis",
        "Actionable insights"
      ],
      cta: { label: "Order now — $99", href: "/product/2" }
    },
    {
      title: "Complete Hormone Panel",
      desc: "Comprehensive testing for testosterone, cortisol, and DHEA.",
      image: "/testkit.png",
      bullets: [
        "Tests all major hormones",
        "Comprehensive analysis",
        "Expert consultation included"
      ],
      cta: { label: "Order now — $149", href: "/product/3" }
    }
  ]

  return (
    <section className="relative py-24 overflow-visible" style={{ background: 'transparent' }}>
      {/* Seamlessly receive effects from previous section */}
      <div className="absolute top-[-70%] left-[10%] w-[1000px] h-[1000px] bg-brand/12 rounded-full blur-blob" />
      <div className="absolute top-[-50%] right-[5%] w-[800px] h-[800px] bg-brand-alt/14 rounded-full blur-blob" />
      <div className="absolute top-[-60%] center w-[900px] h-[900px] bg-cyan-400/8 rounded-full blur-blob" style={{ left: '50%', transform: 'translateX(-50%)' }} />
      
      {/* Continue effects further down */}
      <div className="absolute bottom-[-40%] left-[40%] w-[800px] h-[800px] bg-pink-400/10 rounded-full blur-blob" />
      <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-brand/8 rounded-full blur-blob" />
      
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
