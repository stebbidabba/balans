import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import TimelineCurve from '@/components/TimelineCurve'
import FeatureCards from '@/components/FeatureCards'
import HowItWorks from '@/components/HowItWorks'
import AppShowcase from '@/components/AppShowcase'
import HormoneImportance from '@/components/HormoneImportance'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TimelineCurve />
      <FeatureCards />
      <HormoneImportance />
      <HowItWorks />
      <AppShowcase />
      <FAQ />
      <Footer />
    </main>
  )
}
