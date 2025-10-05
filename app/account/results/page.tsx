'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface TestResult {
  id: number
  order_id: string
  kit_code: string
  hormone_type: string
  result_value: number
  unit: string
  reference_range_min: number
  reference_range_max: number
  status: string
  notes: string
  tested_at: string
  created_at: string
}

interface Order {
  id: string
  email: string
  status: string
  total_amount: number
  created_at: string
  products?: any[]
}

export default function AccountResultsPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const supabase = createClient()
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) {
        setError('Please log in to view your results')
        setLoading(false)
        return
      }

      const response = await fetch('/api/results')
      if (!response.ok) throw new Error('Failed to fetch results')
      const data = await response.json()
      setResults(data.results || [])
      setOrders(data.orders || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch results')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-red-400 bg-red-500/20'
      case 'high': return 'text-orange-400 bg-orange-500/20'
      case 'normal': return 'text-green-400 bg-green-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low': return '↓'
      case 'high': return '↑'
      case 'normal': return '✓'
      default: return '?'
    }
  }

  const getHormoneDisplayName = (hormone: string) => {
    switch (hormone) {
      case 'testosterone': return 'Testosterone'
      case 'cortisol': return 'Cortisol'
      case 'dhea': return 'DHEA'
      default: return hormone
    }
  }

  const getHormoneDescription = (hormone: string) => {
    switch (hormone) {
      case 'testosterone': return 'Primary male sex hormone, important for muscle mass, bone density, and energy'
      case 'cortisol': return 'Stress hormone that regulates metabolism, immune response, and blood pressure'
      case 'dhea': return 'Precursor hormone that supports energy, mood, and immune function'
      default: return 'Hormone level measurement'
    }
  }

  const groupResultsByOrder = () => {
    const grouped: { [key: string]: { order: Order; results: TestResult[] } } = {}
    results.forEach(result => {
      if (!grouped[result.order_id]) {
        const order = orders.find(o => o.id === result.order_id)
        if (order) grouped[result.order_id] = { order, results: [] }
      }
      if (grouped[result.order_id]) grouped[result.order_id].results.push(result)
    })
    return Object.values(grouped)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading your results...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-400 text-xl mb-4">{error}</div>
            <Link href="/login" className="text-brand hover:opacity-80">Go to Login</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const groupedResults = groupResultsByOrder()

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      <section className="relative pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Your Test Results</h1>
            <p className="text-text-muted">Hormone analysis from your lab tests</p>
          </div>

          {groupedResults.length === 0 ? (
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">No results yet</h3>
              <p className="text-text-muted mb-6">Your test results will appear here once analysis is complete</p>
              <Link href="/account/orders" className="inline-block px-8 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-opacity">View My Orders</Link>
            </div>
          ) : (
            <div className="space-y-8">
              {groupedResults.map(({ order, results }) => (
                <div key={order.id} className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-2">Order #{order.id}</h2>
                    <p className="text-text-muted">Tested on {new Date(results[0]?.tested_at || order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {results.map((result) => (
                      <div key={result.id} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium text-white">{getHormoneDisplayName(result.hormone_type)}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>{getStatusIcon(result.status)} {result.status.toUpperCase()}</span>
                        </div>
                        <div className="mb-3">
                          <div className="text-2xl font-bold text-brand">{result.result_value} {result.unit}</div>
                        </div>
                        <div className="mb-3 text-sm text-text-muted">Reference Range: {result.reference_range_min} - {result.reference_range_max} {result.unit}</div>
                        <div className="mb-3 text-sm text-text-muted">{getHormoneDescription(result.hormone_type)}</div>
                        {result.notes && (
                          <div className="pt-3 border-t border-white/10 text-sm text-text-muted"><strong>Lab Notes:</strong> {result.notes}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  {results[0]?.kit_code && (
                    <div className="mt-6 pt-6 border-top border-white/10 text-sm text-text-muted">Kit Code: <span className="font-mono text-white">{results[0].kit_code}</span></div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/account" className="inline-block px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all">← Back to Account</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}


