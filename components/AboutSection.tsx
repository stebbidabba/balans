'use client'

export default function AboutSection() {
  return (
    <section 
      id="about"
      role="region"
      aria-label="About — Our Mission"
      className="relative w-full py-32 md:py-32 text-center overflow-hidden"
    >
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-end via-bg-start to-[#081A33]" />
      
      {/* Animated Blur Blobs - Multiple Layers for Depth */}
      <div className="absolute top-[15%] right-[5%] w-[700px] h-[700px] bg-brand/35 rounded-full blur-blob animate-pulse-slow" />
      <div className="absolute top-[35%] left-[10%] w-[600px] h-[600px] bg-brand-alt/30 rounded-full blur-blob" />
      <div className="absolute bottom-[15%] left-[35%] w-[500px] h-[500px] bg-purple-400/25 rounded-full blur-blob animate-pulse" />
      <div className="absolute top-[5%] left-[55%] w-[450px] h-[450px] bg-cyan-300/20 rounded-full blur-blob" />
      <div className="absolute bottom-[30%] right-[20%] w-[400px] h-[400px] bg-pink-400/15 rounded-full blur-blob animate-pulse-slow" />
      <div className="absolute top-[60%] left-[70%] w-[350px] h-[350px] bg-yellow-300/10 rounded-full blur-blob" />
      
      {/* Gradient Overlays for Color Mixing and Depth */}
      <div className="absolute inset-0 bg-gradient-radial from-brand/8 via-transparent to-brand-alt/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-start/70 via-transparent to-purple-500/8" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-400/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/5 via-transparent to-yellow-400/3" />
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <h2 className="text-[44px] md:text-[56px] leading-tight font-semibold text-white/95 mb-8">
          The Company
        </h2>

        {/* Paragraphs */}
        <div className="max-w-[900px] mx-auto space-y-6">
          <p className="text-[18px] md:text-[20px] leading-relaxed text-white/82">
            Individuals have not hit the limits of their potential. Groups of individuals are even farther from their potential.
          </p>
          
          <p className="text-[18px] md:text-[20px] leading-relaxed text-white/82">
            Step by step, we do the hard work to deliver working products that empower everyone to continuously dream bigger, even in the most complex scenarios.
          </p>
          
          <p className="text-[18px] md:text-[20px] leading-relaxed text-white/82">
            We let every individual dream bigger. We let every organization dream bigger. We dream bigger.
          </p>
        </div>
      </div>

      {/* Decorative SVG Fan */}
      <div className="absolute bottom-0 right-0 w-[60vw] md:w-[45vw] pointer-events-none z-0">
        <svg
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMaxYMax slice"
          className="w-full h-auto"
        >
          <defs>
            {/* Main Fan Gradient */}
            <linearGradient id="fanGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFE37A" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#FF9BD5" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#1F7BFF" stopOpacity="0.95" />
            </linearGradient>
            
            {/* Soft Fan Gradient */}
            <linearGradient id="fanGradientSoft" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFE37A" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#FF9BD5" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#5FB0FF" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Fan Fill Paths */}
          <path
            d="M1200,700 L700,700 C700,500 850,380 980,300 C1080,240 1150,180 1200,100 Z"
            fill="url(#fanGradient)"
          />
          
          <path
            d="M1200,700 L860,700 C860,530 980,430 1100,350 C1150,320 1180,260 1200,220 Z"
            fill="url(#fanGradientSoft)"
          />

          {/* Dashed Stroke Arcs */}
          <path
            d="M720,700 C760,520 940,380 1200,260"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            strokeDasharray="10 10"
            fill="none"
          />
          
          <path
            d="M820,700 C860,540 1020,420 1200,320"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            strokeDasharray="10 10"
            fill="none"
          />
          
          <path
            d="M920,700 C950,560 1080,470 1200,380"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            strokeDasharray="10 10"
            fill="none"
          />
        </svg>
      </div>
    </section>
  )
}
