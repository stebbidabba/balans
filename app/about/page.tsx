import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About - Balans',
  description: 'Our mission to empower everyone to continuously dream bigger through hormone health testing.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <AboutSection />
      <Footer />
    </div>
  )
}
