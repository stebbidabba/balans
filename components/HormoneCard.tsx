'use client'

interface HormoneCardProps {
  hormoneName: string
  status: 'Normal' | 'Low' | 'High'
  value: number
  unit: string
  minValue: number
  maxValue: number
  normalRange: {
    min: number
    max: number
  }
  className?: string
}

export default function HormoneCard({
  hormoneName,
  status,
  value,
  unit,
  minValue,
  maxValue,
  normalRange,
  className = ''
}: HormoneCardProps) {
  // Calculate position percentage for the thumb
  const valuePosition = ((value - minValue) / (maxValue - minValue)) * 100
  
  // Calculate normal range positions
  const normalStartPosition = ((normalRange.min - minValue) / (maxValue - minValue)) * 100
  const normalEndPosition = ((normalRange.max - minValue) / (maxValue - minValue)) * 100
  const normalWidth = normalEndPosition - normalStartPosition

  // Status colors
  const statusColors = {
    Normal: 'text-emerald-600',
    Low: 'text-red-500',
    High: 'text-red-500'
  }

  return (
    <div className={`relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-1">
          <h3 className="text-xl font-medium text-gray-900">
            {hormoneName}
          </h3>
          <span className={`text-base font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold text-gray-900">
            {value}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {unit}
          </div>
        </div>
      </div>

      {/* Range Bar */}
      <div className="relative">
        {/* Background track */}
        <div className="h-3 bg-gray-200 rounded-full relative overflow-hidden">
          {/* Low range (red) */}
          <div 
            className="absolute h-full bg-red-300 rounded-l-full"
            style={{ width: `${normalStartPosition}%` }}
          />
          
          {/* Normal range (green) */}
          <div 
            className="absolute h-full bg-emerald-300"
            style={{ 
              left: `${normalStartPosition}%`,
              width: `${normalWidth}%`
            }}
          />
          
          {/* High range (red) */}
          <div 
            className="absolute h-full bg-red-300 rounded-r-full"
            style={{ 
              left: `${normalEndPosition}%`,
              width: `${100 - normalEndPosition}%`
            }}
          />
        </div>

        {/* Thumb indicator */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${valuePosition}%` }}
        >
          <div className="w-6 h-6 bg-white rounded-full border-3 border-gray-400 shadow-md">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-100 to-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
