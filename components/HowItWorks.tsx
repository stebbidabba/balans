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
      {/* Continuing the same background structure with color evolution */}
      <div className="absolute top-[-50%] right-[20%] w-[1400px] h-[1400px] bg-gradient-to-bl from-rose-400/8 to-yellow-400/5 rounded-full blur-blob" />
      <div className="absolute top-[-30%] left-[25%] w-[1200px] h-[1200px] bg-gradient-to-tr from-orange-400/7 to-lime-400/4 rounded-full blur-blob" />
      <div className="absolute top-[-40%] center w-[1600px] h-[1600px] bg-gradient-to-b from-amber-400/5 via-yellow-400/3 to-emerald-400/2 rounded-full blur-blob" style={{ left: '50%', transform: 'translateX(-50%)' }} />

      {/* Massive spanning blobs continuing the flow */}
      <div className="absolute bottom-[-80%] left-[15%] w-[2400px] h-[2400px] bg-gradient-to-tr from-yellow-400/6 via-lime-400/4 to-cyan-400/2 rounded-full blur-blob" />
      <div className="absolute bottom-[-60%] right-[35%] w-[2200px] h-[2200px] bg-gradient-to-bl from-lime-400/5 via-emerald-400/3 to-teal-400/2 rounded-full blur-blob" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            How it works
          </h2>
        </div>

        {/* Steps Grid - Regular Spacing */}
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