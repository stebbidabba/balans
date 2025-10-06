import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />

      <section className="relative pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl border border-white/10 p-4 lg:p-6 sticky top-28">
                <div className="mb-4">
                  <h2 className="text-white font-semibold text-lg">Account</h2>
                </div>
                <nav className="space-y-1">
                  <Link href="/account/results" className="group flex items-start gap-3 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-colors">
                    <span className="mt-[2px] text-white/70 group-hover:text-white">🧪</span>
                    <span>
                      <div className="font-medium">Results</div>
                      <div className="text-xs text-white/60">View your hormone test results.</div>
                    </span>
                  </Link>
                  <Link href="/account/orders" className="group flex items-start gap-3 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-colors">
                    <span className="mt-[2px] text-white/70 group-hover:text-white">🚚</span>
                    <span>
                      <div className="font-medium">Order Status</div>
                      <div className="text-xs text-white/60">Track your sample shipment and processing.</div>
                    </span>
                  </Link>
                  <Link href="/account/transactions" className="group flex items-start gap-3 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-colors">
                    <span className="mt-[2px] text-white/70 group-hover:text-white">🧾</span>
                    <span>
                      <div className="font-medium">Transactions</div>
                      <div className="text-xs text-white/60">View past purchases or invoices.</div>
                    </span>
                  </Link>
                  <Link href="/account/charts" className="group flex items-start gap-3 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-colors">
                    <span className="mt-[2px] text-white/70 group-hover:text-white">📈</span>
                    <span>
                      <div className="font-medium">Charts</div>
                      <div className="text-xs text-white/60">See your hormone trends over time.</div>
                    </span>
                  </Link>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <main className="lg:col-span-9">
              {children}
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


