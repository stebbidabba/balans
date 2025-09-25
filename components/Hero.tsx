'use client'

import { useState } from 'react'

export default function Hero() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to /api/lead
    console.log('Email submitted:', email)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-visible">
      {/* Background Gradient - Extended */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-end to-bg-start" />
      
      {/* Smooth transition gradient that extends way down */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-transparent via-bg-start/10 to-bg-start/30" />
      
      {/* Blur Blobs - Massive extension into next sections */}
      <div className="absolute top-[10%] right-[10%] w-[800px] h-[800px] bg-brand/35 rounded-full blur-blob" />
      <div className="absolute top-[30%] left-[15%] w-[700px] h-[700px] bg-brand-alt/25 rounded-full blur-blob" />
      
      {/* Massive blobs that extend far beyond the section */}
      <div className="absolute bottom-[-100%] right-[5%] w-[1200px] h-[1200px] bg-brand/20 rounded-full blur-blob" />
      <div className="absolute bottom-[-80%] left-[10%] w-[1000px] h-[1000px] bg-brand-alt/18 rounded-full blur-blob" />
      <div className="absolute bottom-[-120%] center w-[1400px] h-[1400px] bg-purple-500/12 rounded-full blur-blob" style={{ left: '50%', transform: 'translateX(-50%)' }} />
      <div className="absolute bottom-[-60%] right-[30%] w-[800px] h-[800px] bg-cyan-400/10 rounded-full blur-blob" />
      <div className="absolute bottom-[-90%] left-[40%] w-[900px] h-[900px] bg-pink-400/8 rounded-full blur-blob" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center pt-18">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-white">
            The all-in-one home testing platform for{' '}
            <span className="gradient-text">hormone health</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
            Order an at-home kit, send your sample, and get clear results — all under your own private dashboard.
          </p>
          
          {/* Email Form */}
          <div className="pt-8">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full md:w-[320px] h-12 rounded-xl px-4 bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full md:w-auto h-12 px-6 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all whitespace-nowrap"
              >
                Get started
              </button>
            </form>
            <p className="text-sm text-text-muted mt-3">
              No spam. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
