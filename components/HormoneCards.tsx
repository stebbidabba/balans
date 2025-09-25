'use client'

import HormoneCard from './HormoneCard'

export default function HormoneCards() {
  const hormoneData = [
    {
      hormoneName: 'Cortisol',
      status: 'Normal' as const,
      value: 9.7,
      unit: 'ng/ml',
      minValue: 0,
      maxValue: 25,
      normalRange: {
        min: 6,
        max: 18
      }
    },
    {
      hormoneName: 'Testosterone',
      status: 'Low' as const,
      value: 285,
      unit: 'ng/dL',
      minValue: 0,
      maxValue: 1000,
      normalRange: {
        min: 300,
        max: 900
      }
    },
    {
      hormoneName: 'DHEA',
      status: 'High' as const,
      value: 420,
      unit: 'μg/dL',
      minValue: 0,
      maxValue: 500,
      normalRange: {
        min: 100,
        max: 350
      }
    }
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Your Results
      </h2>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {hormoneData.map((hormone, index) => (
          <HormoneCard
            key={index}
            {...hormone}
            className="w-full"
          />
        ))}
      </div>
    </div>
  )
}
