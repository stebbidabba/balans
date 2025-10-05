'use client'

export default function HormoneImportance() {
  return (
    <section className="relative py-24 overflow-visible">
      {/* Background accents */}
      <div className="absolute -top-40 left-[10%] w-[1200px] h-[1200px] bg-gradient-to-br from-emerald-400/10 via-cyan-400/8 to-brand/10 rounded-full blur-blob" />
      <div className="absolute -bottom-40 right-[15%] w-[1000px] h-[1000px] bg-gradient-to-tl from-purple-400/10 via-fuchsia-400/8 to-indigo-400/10 rounded-full blur-blob" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Hormone Health Matters
          </h2>
          <p className="text-text-muted max-w-3xl mx-auto">
            Hormones influence energy, mood, sleep, metabolism, and long‑term health. When they drift out of balance, you feel it—often without a clear explanation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pain points */}
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="mb-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-400/20 text-rose-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">Hard To Get Tested</h3>
            <p className="text-text-muted">
              Traditional testing often requires referrals, clinic visits, and limited availability.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="mb-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/20 text-amber-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l9 7-9 7-9-7 9-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">Expensive & Confusing</h3>
            <p className="text-text-muted">
              Multiple appointments and opaque pricing make routine checks costly and stressful.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="mb-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">Balans Makes It Simple</h3>
            <p className="text-text-muted">
              At‑home collection, clear pricing, fast results, and a private dashboard—all for a fraction of typical costs.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-text-muted">
            Check in regularly, spot trends early, and take action with guidance designed for real life.
          </p>
        </div>
      </div>
    </section>
  )
}


