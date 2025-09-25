'use client'

import { useState } from 'react'

interface ChartData {
  month: string
  value: number
}

interface HormoneChart {
  name: string
  nameIcelandic: string
  currentValue: number
  unit: string
  change: number
  changeDirection: 'up' | 'down'
  status: 'Normal' | 'Low' | 'High'
  data: ChartData[]
  color: string
}

export default function AppShowcase() {
  const [selectedHormone, setSelectedHormone] = useState(0)

  const hormoneData: HormoneChart[] = [
    {
      name: 'Free Testosterone',
      nameIcelandic: 'Frjáls Testósterón',
      currentValue: 72,
      unit: 'pg/mL',
      change: 12,
      changeDirection: 'up',
      status: 'Normal',
      data: [
        { month: 'Jan', value: 55 },
        { month: 'Feb', value: 60 },
        { month: 'Mar', value: 58 },
        { month: 'Apr', value: 65 },
        { month: 'May', value: 70 },
        { month: 'Jun', value: 72 }
      ],
      color: '#8A7CFF'
    },
    {
      name: 'Cortisol',
      nameIcelandic: 'Kortísól',
      currentValue: 9.7,
      unit: 'ng/mL',
      change: -10,
      changeDirection: 'down',
      status: 'Normal',
      data: [
        { month: 'Jan', value: 21 },
        { month: 'Feb', value: 18 },
        { month: 'Mar', value: 16 },
        { month: 'Apr', value: 15 },
        { month: 'May', value: 13 },
        { month: 'Jun', value: 9.7 }
      ],
      color: '#37E0A6'
    },
    {
      name: 'DHEA',
      nameIcelandic: 'DHEA',
      currentValue: 246,
      unit: 'pg/mL',
      change: 22,
      changeDirection: 'up',
      status: 'Normal',
      data: [
        { month: 'Jan', value: 150 },
        { month: 'Feb', value: 170 },
        { month: 'Mar', value: 185 },
        { month: 'Apr', value: 190 },
        { month: 'May', value: 210 },
        { month: 'Jun', value: 246 }
      ],
      color: '#FF6B9D'
    }
  ]

  const selectedData = hormoneData[selectedHormone]

  // Calculate chart dimensions and paths
  const chartWidth = 400
  const chartHeight = 200
  const padding = 40

  const getChartPath = (data: ChartData[], color: string) => {
    if (data.length === 0) return ''
    
    const maxValue = Math.max(...data.map(d => d.value))
    const minValue = Math.min(...data.map(d => d.value))
    const valueRange = maxValue - minValue || 1
    
    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding)
      const y = padding + (1 - (point.value - minValue) / valueRange) * (chartHeight - 2 * padding)
      return `${x},${y}`
    }).join(' ')
    
    return points
  }

  const getAreaPath = (data: ChartData[]) => {
    if (data.length === 0) return ''
    
    const maxValue = Math.max(...data.map(d => d.value))
    const minValue = Math.min(...data.map(d => d.value))
    const valueRange = maxValue - minValue || 1
    
    let path = `M ${padding} ${chartHeight - padding}`
    
    data.forEach((point, index) => {
      const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding)
      const y = padding + (1 - (point.value - minValue) / valueRange) * (chartHeight - 2 * padding)
      if (index === 0) {
        path += ` L ${x} ${y}`
      } else {
        path += ` L ${x} ${y}`
      }
    })
    
    path += ` L ${padding + (chartWidth - 2 * padding)} ${chartHeight - padding} Z`
    return path
  }

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-end/50 via-transparent to-bg-start/30" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-brand/10 rounded-full blur-blob" />
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-brand-alt/8 rounded-full blur-blob" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            The app
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Charts Section */}
          <div className="space-y-8">
            {/* Hormone Selector */}
            <div className="flex space-x-4 mb-8">
              {hormoneData.map((hormone, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedHormone(index)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedHormone === index
                      ? 'bg-brand text-black font-semibold'
                      : 'bg-white/10 text-text-muted hover:bg-white/20'
                  }`}
                >
                  {hormone.name}
                </button>
              ))}
            </div>

            {/* Main Chart */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {selectedData.name}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-white">
                      {selectedData.currentValue} {selectedData.unit}
                    </span>
                    <span className={`text-sm font-medium ${
                      selectedData.changeDirection === 'up' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {selectedData.changeDirection === 'up' ? '+' : ''}{selectedData.change}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-text-muted">Current</span>
                  <div className="text-lg font-medium text-white">
                    {selectedData.currentValue} {selectedData.unit}
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="relative">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-48">
                  <defs>
                    <linearGradient id={`gradient-${selectedHormone}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={selectedData.color} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={selectedData.color} stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area fill */}
                  <path
                    d={getAreaPath(selectedData.data)}
                    fill={`url(#gradient-${selectedHormone})`}
                  />
                  
                  {/* Line */}
                  <polyline
                    points={getChartPath(selectedData.data, selectedData.color)}
                    fill="none"
                    stroke={selectedData.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Data points */}
                  {selectedData.data.map((point, index) => {
                    const maxValue = Math.max(...selectedData.data.map(d => d.value))
                    const minValue = Math.min(...selectedData.data.map(d => d.value))
                    const valueRange = maxValue - minValue || 1
                    const x = padding + (index / (selectedData.data.length - 1)) * (chartWidth - 2 * padding)
                    const y = padding + (1 - (point.value - minValue) / valueRange) * (chartHeight - 2 * padding)
                    
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="4"
                        fill={selectedData.color}
                        className="drop-shadow-sm"
                      />
                    )
                  })}
                  
                  {/* Month labels */}
                  {selectedData.data.map((point, index) => {
                    const x = padding + (index / (selectedData.data.length - 1)) * (chartWidth - 2 * padding)
                    return (
                      <text
                        key={index}
                        x={x}
                        y={chartHeight - 10}
                        textAnchor="middle"
                        className="fill-text-muted text-xs"
                      >
                        {point.month}
                      </text>
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* App Features */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Track Progress
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    See how your hormone levels change over time and identify patterns that help you understand your body better.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-brand-alt/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand-alt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Personalized Recommendations
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Get tailored recommendations based on your results for nutrition, exercise, and lifestyle changes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Reminders & Plans
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Set up reminders for your next tests and follow personalized plans to improve your hormone balance.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button className="w-full md:w-auto px-8 py-3 rounded-xl bg-brand text-black font-semibold hover:opacity-90 shadow-button transition-all">
                Download the app
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Cards - Original Hormone Cards with Range Bars */}
        <div className="mt-16 grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {/* Cortisol Card */}
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-xl font-medium text-gray-900">Cortisol</h3>
                <span className="text-base font-medium text-emerald-600">Normal</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-900">9.7</div>
                <div className="text-sm text-gray-600 mt-1">ng/ml</div>
              </div>
            </div>
            <div className="relative">
              <div className="h-3 bg-gray-200 rounded-full relative overflow-hidden">
                <div className="absolute h-full bg-red-300 rounded-l-full" style={{ width: '24%' }} />
                <div className="absolute h-full bg-emerald-300" style={{ left: '24%', width: '48%' }} />
                <div className="absolute h-full bg-red-300 rounded-r-full" style={{ left: '72%', width: '28%' }} />
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2" style={{ left: '38.8%' }}>
                <div className="w-6 h-6 bg-white rounded-full border-3 border-gray-400 shadow-md">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-100 to-gray-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Testosterone Card */}
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-xl font-medium text-gray-900">Testosterone</h3>
                <span className="text-base font-medium text-red-500">Low</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-900">285</div>
                <div className="text-sm text-gray-600 mt-1">ng/dL</div>
              </div>
            </div>
            <div className="relative">
              <div className="h-3 bg-gray-200 rounded-full relative overflow-hidden">
                <div className="absolute h-full bg-red-300 rounded-l-full" style={{ width: '30%' }} />
                <div className="absolute h-full bg-emerald-300" style={{ left: '30%', width: '60%' }} />
                <div className="absolute h-full bg-red-300 rounded-r-full" style={{ left: '90%', width: '10%' }} />
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2" style={{ left: '28.5%' }}>
                <div className="w-6 h-6 bg-white rounded-full border-3 border-gray-400 shadow-md">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-100 to-gray-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* DHEA Card */}
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-xl font-medium text-gray-900">DHEA</h3>
                <span className="text-base font-medium text-red-500">High</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-900">420</div>
                <div className="text-sm text-gray-600 mt-1">μg/dL</div>
              </div>
            </div>
            <div className="relative">
              <div className="h-3 bg-gray-200 rounded-full relative overflow-hidden">
                <div className="absolute h-full bg-red-300 rounded-l-full" style={{ width: '20%' }} />
                <div className="absolute h-full bg-emerald-300" style={{ left: '20%', width: '50%' }} />
                <div className="absolute h-full bg-red-300 rounded-r-full" style={{ left: '70%', width: '30%' }} />
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2" style={{ left: '84%' }}>
                <div className="w-6 h-6 bg-white rounded-full border-3 border-gray-400 shadow-md">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-100 to-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
