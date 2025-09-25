'use client'

export default function HowItWorks() {
  const steps = [
    { step: "1", title: "Order", desc: "We ship your kit within 24h." },
    { step: "2", title: "Collect", desc: "Follow the 3-minute instructions." },
    { step: "3", title: "Return", desc: "Drop at post box with prepaid label." },
    { step: "4", title: "Results", desc: "See your results and next steps online." }
  ]

  return (
    <section id="how" className="relative py-24 overflow-visible" style={{ background: 'transparent' }}>
      {/* Continue receiving effects from above */}
      <div className="absolute top-[-50%] right-[20%] w-[700px] h-[700px] bg-brand/10 rounded-full blur-blob" />
      <div className="absolute top-[-30%] left-[25%] w-[600px] h-[600px] bg-pink-400/8 rounded-full blur-blob" />
      
      {/* Final fade effects */}
      <div className="absolute bottom-[-20%] left-[15%] w-[500px] h-[500px] bg-brand-alt/6 rounded-full blur-blob" />
      <div className="absolute bottom-[-10%] right-[35%] w-[400px] h-[400px] bg-brand/5 rounded-full blur-blob" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            How it works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((stepItem, index) => (
            <div key={index} className="text-center group">
              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/20 border-2 border-brand/30 mb-6 group-hover:bg-brand/30 transition-all duration-300">
                <span className="text-2xl font-bold text-brand">
                  {stepItem.step}
                </span>
              </div>

              {/* Step Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">
                  {stepItem.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>

              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-brand/30 to-transparent transform translate-x-4" 
                     style={{ width: 'calc(100% - 2rem)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}