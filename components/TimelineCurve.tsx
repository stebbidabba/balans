'use client'

export default function TimelineCurve() {
  const steps = [
    {
      title: "Start",
      desc: "Start by choosing a kit and creating your account.",
      align: "left" as const
    },
    {
      title: "Collect",
      desc: "Collect your saliva sample at home with simple instructions.",
      align: "center" as const
    },
    {
      title: "Analyze",
      desc: "Certified labs process your sample and validate results.",
      align: "center" as const
    },
    {
      title: "Improve",
      desc: "View insights and recommendations to balance hormones.",
      align: "right" as const
    }
  ]

  return (
    <section className="relative py-24 overflow-visible" style={{ background: 'transparent' }}>
      {/* Seamlessly continue the colorful blur effects from hero */}
      <div className="absolute top-[-60%] right-[15%] w-[800px] h-[800px] bg-brand/18 rounded-full blur-blob" />
      <div className="absolute top-[-40%] left-[20%] w-[700px] h-[700px] bg-brand-alt/15 rounded-full blur-blob" />
      <div className="absolute top-[-80%] center w-[1000px] h-[1000px] bg-purple-500/10 rounded-full blur-blob" style={{ left: '50%', transform: 'translateX(-50%)' }} />
      
      {/* Continue effects downward */}
      <div className="absolute bottom-[-50%] right-[30%] w-[900px] h-[900px] bg-cyan-400/12 rounded-full blur-blob" />
      <div className="absolute bottom-[-30%] left-[25%] w-[700px] h-[700px] bg-brand/10 rounded-full blur-blob" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="relative">
          {/* SVG Curve */}
          <div className="relative h-56 mb-12">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6D5CFF" />
                  <stop offset="35%" stopColor="#A971FF" />
                  <stop offset="100%" stopColor="#37E0A6" />
                </linearGradient>
              </defs>
              
              {/* Main Curve Path */}
              <path
                d="M50 180 C300 60, 500 60, 600 110 C700 160, 900 160, 1150 40"
                stroke="url(#curveGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Dots at key points */}
              <circle cx="50" cy="180" r="8" fill="#6D5CFF" />
              <circle cx="400" cy="85" r="8" fill="#8A7CFF" />
              <circle cx="800" cy="135" r="8" fill="#A971FF" />
              <circle cx="1150" cy="40" r="8" fill="#37E0A6" />
            </svg>
          </div>

          {/* Step Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center md:text-${step.align === 'center' ? 'center' : step.align} space-y-3`}
              >
                <h3 className="text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
