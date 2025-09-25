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
                  The future of
                  <br />
                  <span className="bg-gradient-to-r from-brand to-brand-alt bg-clip-text text-transparent">
                    lab technology
                  </span>
                </h1>
                <p className="text-xl text-text-muted leading-relaxed">
                  Revolutionary 96-well microplate reader that redefines portability, precision, 
                  and simplicity in hormone analysis. Experience lab-quality results anywhere.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all hover:scale-105">
                  Request Demo
                </button>
                <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all">
                  Technical Specs
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">96</div>
                  <div className="text-sm text-text-muted">Detection Units</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">0</div>
                  <div className="text-sm text-text-muted">Moving Parts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">USB</div>
                  <div className="text-sm text-text-muted">Plug & Play</div>
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
              
              {/* Floating Info Cards */}
              <div className="absolute -top-4 -left-4 glass-card rounded-xl p-4 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Online</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 glass-card rounded-xl p-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">99.9%</div>
                  <div className="text-xs text-text-muted">Accuracy</div>
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
              Revolutionary by Design
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Every aspect engineered for the modern laboratory—from unprecedented portability 
              to maintenance-free operation.
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
              <h3 className="text-xl font-bold text-white mb-4">World's Most Portable</h3>
              <p className="text-text-muted leading-relaxed">
                Ultra-compact design fits anywhere. Transport between labs effortlessly and 
                decentralize critical workflows.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Plug & Play</h3>
              <p className="text-text-muted leading-relaxed">
                Single USB connection powers the device and connects to analysis software. 
                No complex setup or installation required.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Zero Maintenance</h3>
              <p className="text-text-muted leading-relaxed">
                Solid-state technology with no moving parts. Long-life LEDs ensure 
                years of reliable, maintenance-free operation.
              </p>
            </div>
          </div>

          {/* Technical Innovation */}
          <div className="glass-card rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand/20 border border-brand/30">
                  <span className="text-brand font-medium">Technical Innovation</span>
                </div>
                <h3 className="text-3xl font-bold text-white">
                  96 Individual Detection Units
                </h3>
                <p className="text-lg text-text-muted leading-relaxed">
                  The first microplate reader on the market with 96 individual detection units. 
                  No scanning across wells means faster results, higher precision, and 
                  unprecedented reliability.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-brand mb-1">&lt; 30s</div>
                    <div className="text-sm text-text-muted">Reading Time</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-brand-alt mb-1">±2%</div>
                    <div className="text-sm text-text-muted">Precision</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-brand-alt/20 rounded-2xl blur-xl"></div>
                <img 
                  src="/reader2.jpg" 
                  alt="Absorbance 96 Technical Detail"
                  className="relative w-full h-auto rounded-2xl object-cover"
                />
              </div>
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
              Seamless Workflow Integration
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              From sample to insight in minutes—experience the future of laboratory automation.
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
                    Insert your 96-well plate and connect via USB. The reader automatically 
                    detects and calibrates for optimal performance.
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
                    <h3 className="text-xl font-bold text-white">Instant Analysis</h3>
                  </div>
                  <p className="text-text-muted leading-relaxed">
                    96 individual sensors simultaneously measure all wells in under 30 seconds. 
                    No moving parts means consistent, reliable results every time.
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
                    <h3 className="text-xl font-bold text-white">Real-time Results</h3>
                  </div>
                  <p className="text-text-muted leading-relaxed">
                    View, analyze, and export data instantly through our intuitive software. 
                    Complete integration with your existing laboratory management systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Software Integration Showcase */}
          <div className="glass-card rounded-3xl p-12 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-400/20 border border-emerald-400/30 mb-6">
                    <span className="text-emerald-400 font-medium">Software Integration</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    Complete Laboratory Ecosystem
                  </h3>
                  <p className="text-lg text-text-muted leading-relaxed">
                    Our comprehensive software suite transforms raw data into actionable insights, 
                    seamlessly integrating with your existing laboratory infrastructure.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <h4 className="text-white font-semibold mb-2">Real-time Monitoring</h4>
                    <p className="text-sm text-text-muted">Live data visualization and alerts</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <h4 className="text-white font-semibold mb-2">Data Export</h4>
                    <p className="text-sm text-text-muted">Multiple formats including CSV, XML</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <h4 className="text-white font-semibold mb-2">API Integration</h4>
                    <p className="text-sm text-text-muted">Connect to LIMS and ERP systems</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <h4 className="text-white font-semibold mb-2">Cloud Sync</h4>
                    <p className="text-sm text-text-muted">Secure cloud storage and backup</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
                <div className="relative glass-card rounded-2xl p-6">
                  <img 
                    src="/computer.jpg" 
                    alt="Software Interface"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="relative py-24 overflow-visible">
        <div className="absolute top-[20%] right-[5%] w-[800px] h-[800px] bg-brand/8 rounded-full blur-blob" />
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-blob" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technical Excellence
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Engineered with precision, built for reliability. Every specification optimized 
              for the demanding requirements of modern hormone analysis.
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Left - Technical Specs */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Technical Specifications</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-text-muted font-medium">Microplate Format</span>
                  <span className="text-white font-semibold">96-well standard</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-text-muted font-medium">Detection Technology</span>
                  <span className="text-white font-semibold">96 individual photodiodes</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-text-muted font-medium">Light Source</span>
                  <span className="text-white font-semibold">Long-life LEDs</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-text-muted font-medium">Connection</span>
                  <span className="text-white font-semibold">USB 3.0 plug-and-play</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-text-muted font-medium">Power Source</span>
                  <span className="text-white font-semibold">USB powered</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-text-muted font-medium">Moving Parts</span>
                  <span className="text-white font-semibold">Zero</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-text-muted font-medium">Maintenance Required</span>
                  <span className="text-white font-semibold">None</span>
                </div>
              </div>
            </div>

            {/* Right - Performance Metrics */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Performance Metrics</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-text-muted font-medium">Reading Speed</span>
                    <span className="text-brand font-bold text-xl">&lt; 30 seconds</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-brand to-brand-alt h-2 rounded-full w-[95%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-text-muted font-medium">Precision</span>
                    <span className="text-brand-alt font-bold text-xl">±2% CV</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-brand-alt to-purple-500 h-2 rounded-full w-[98%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-text-muted font-medium">Accuracy</span>
                    <span className="text-emerald-400 font-bold text-xl">99.9%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full w-[99%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-text-muted font-medium">Reliability</span>
                    <span className="text-purple-400 font-bold text-xl">99.99% uptime</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-full"></div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gradient-to-r from-brand/20 to-brand-alt/20">
                      <div className="text-2xl font-bold text-white mb-1">5+ years</div>
                      <div className="text-sm text-text-muted">LED lifespan</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-r from-emerald-400/20 to-cyan-400/20">
                      <div className="text-2xl font-bold text-white mb-1">24/7</div>
                      <div className="text-sm text-text-muted">Operation ready</div>
                    </div>
                  </div>
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