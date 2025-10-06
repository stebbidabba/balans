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
                  <Link href="/account/results" className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-colors">Results</Link>
                  <Link href="/account/orders" className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-colors">Order Status</Link>
                  <Link href="/account/transactions" className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-colors">Transactions</Link>
                  <Link href="/account/charts" className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-colors">Charts</Link>
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


