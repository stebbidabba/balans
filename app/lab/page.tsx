import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function LabPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      
      {/* Hero Section - More Dynamic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-visible">
        {/* Background Gradient - Extended */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-end to-bg-start" />
        
        {/* Hero Blur Blobs - Massive and Dynamic */}
        <div className="absolute top-[10%] right-[5%] w-[900px] h-[900px] bg-brand/25 rounded-full blur-blob animate-pulse-slow" />
        <div className="absolute top-[30%] left-[10%] w-[800px] h-[800px] bg-brand-alt/20 rounded-full blur-blob" />
        <div className="absolute bottom-[10%] w-[1000px] h-[1000px] bg-purple-500/15 rounded-full blur-blob" style={{ left: '50%', transform: 'translateX(-50%)' }} />
        <div className="absolute top-[60%] right-[20%] w-[600px] h-[600px] bg-cyan-400/12 rounded-full blur-blob animate-pulse" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-18">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="text-brand font-medium">Absorbance 96</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Lab equipment
                  <br />
                  <span className="bg-gradient-to-r from-brand to-brand-alt bg-clip-text text-transparent">
                    that works
                  </span>
                </h1>
                <p className="text-xl text-text-muted leading-relaxed">
                  96-well microplate reader. Portable, precise, simple. 
                  Gets the job done.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all hover:scale-105">
                  Learn More
                </button>
              </div>
              
              {/* What customers actually care about */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">30s</div>
                  <div className="text-sm text-text-muted">Per test</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">USB</div>
                  <div className="text-sm text-text-muted">Setup</div>
                </div>
              </div>
            </div>

            {/* Right - Hero Image with Floating Elements */}
            <div className="relative">
              {/* Main Reader Image with Glow Effect */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/30 to-brand-alt/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-500">
                  <img 
                    src="/reader.jpg" 
                    alt="Absorbance 96 Plate Reader"
                    className="w-full h-auto rounded-2xl object-cover"
                  />
                </div>
              </div>
              
              {/* Simple Info Card */}
              <div className="absolute -bottom-6 -right-6 glass-card rounded-xl p-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">96</div>
                  <div className="text-xs text-text-muted">Wells</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="relative py-24 overflow-visible">
        {/* Continue background effects */}
        <div className="absolute top-[-20%] right-[15%] w-[600px] h-[600px] bg-brand/12 rounded-full blur-blob" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-alt/10 rounded-full blur-blob" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple Design
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Portable, reliable, easy to use.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-brand to-brand-alt flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Portable</h3>
              <p className="text-text-muted leading-relaxed">
                Compact design. Easy to move around.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Simple Setup</h3>
              <p className="text-text-muted leading-relaxed">
                USB connection. No complex setup.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Low Maintenance</h3>
              <p className="text-text-muted leading-relaxed">
                No moving parts. Works reliably.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Workflow Integration */}
      <section className="relative py-24 overflow-visible">
        <div className="absolute top-[-30%] left-[10%] w-[700px] h-[700px] bg-purple-500/8 rounded-full blur-blob" />
        <div className="absolute bottom-[-20%] right-[5%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-blob" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Load sample, get results.
            </p>
          </div>

          {/* Workflow Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="relative">
              <div className="glass-card rounded-2xl p-8 h-full hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-brand-alt/20 rounded-xl blur-lg"></div>
                  <img 
                    src="/reader3.jpg" 
                    alt="Sample Loading"
                    className="relative w-full h-48 object-cover rounded-xl"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
                      <span className="text-black font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Load Sample</h3>
                  </div>
                  <p className="text-text-muted leading-relaxed">
                    Insert plate, connect USB.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card rounded-2xl p-8 h-full hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 rounded-xl blur-lg"></div>
                  <img 
                    src="/analysis.webp" 
                    alt="Analysis Process"
                    className="relative w-full h-48 object-cover rounded-xl"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Analysis</h3>
                  </div>
                  <p className="text-text-muted leading-relaxed">
                    Measures all wells in 30 seconds.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card rounded-2xl p-8 h-full hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-xl blur-lg"></div>
                  <img 
                    src="/computer.jpg" 
                    alt="Results Display"
                    className="relative w-full h-48 object-cover rounded-xl"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
                      <span className="text-black font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Results</h3>
                  </div>
                  <p className="text-text-muted leading-relaxed">
                    Data appears on screen.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What Customers Need to Know */}
      <section className="relative py-24 overflow-visible">
        <div className="absolute top-[20%] right-[5%] w-[800px] h-[800px] bg-brand/8 rounded-full blur-blob" />
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-blob" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What You Need to Know
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              The basics that matter for your lab.
            </p>
          </div>

          {/* Customer-Relevant Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Left - Practical Details */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Practical Details</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-text-muted font-medium">Works with</span>
                  <span className="text-white font-semibold">Standard 96-well plates</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-text-muted font-medium">Setup</span>
                  <span className="text-white font-semibold">Plug in USB</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-text-muted font-medium">Test time</span>
                  <span className="text-white font-semibold">30 seconds</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-text-muted font-medium">Maintenance</span>
                  <span className="text-white font-semibold">None needed</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-text-muted font-medium">Training required</span>
                  <span className="text-white font-semibold">No</span>
                </div>
              </div>
            </div>

            {/* Right - Cost Considerations */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Cost Considerations</h3>
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-white/5">
                  <h4 className="text-white font-semibold mb-2">No ongoing costs</h4>
                  <p className="text-sm text-text-muted">No maintenance, no consumables, no service contracts</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <h4 className="text-white font-semibold mb-2">Fast ROI</h4>
                  <p className="text-sm text-text-muted">Saves time on every test, no downtime</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <h4 className="text-white font-semibold mb-2">Space efficient</h4>
                  <p className="text-sm text-text-muted">Small footprint, no dedicated bench space needed</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <h4 className="text-white font-semibold mb-2">Works anywhere</h4>
                  <p className="text-sm text-text-muted">Portable between locations, no special installation</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}