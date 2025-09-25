'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems = [
    { 
      q: "How accurate are the tests?", 
      a: "We use certified partner labs and validated ELISA methodology with quality controls on each run." 
    },
    { 
      q: "How long do results take?", 
      a: "Typically 3–5 business days after the lab receives your sample." 
    },
    { 
      q: "Is my data private?", 
      a: "Yes. All results are encrypted and only accessible in your dashboard." 
    },
    { 
      q: "Do you ship to Iceland?", 
      a: "Yes, national shipping is supported. International options coming soon." 
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-medium text-white pr-4">
                  {item.q}
                </span>
                <svg
                  className={`w-5 h-5 text-brand transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-divider">
                    <p className="text-text-muted leading-relaxed mt-3">
                      {item.a}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
