'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import Link from 'next/link'

interface TestResult {
  id?: number | string
  order_id: string | null
  kit_code?: string | null
  hormone_type: string
  result_value: number | null
  unit: string | null
  reference_range_min: number | null
  reference_range_max: number | null
  status?: string | null
  notes?: string | null
  tested_at: string | null
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
      if (!result.order_id) return
      const key = String(result.order_id)
      if (!grouped[key]) {
        const order = orders.find(o => o.id === result.order_id)
        if (order) grouped[key] = { order, results: [] }
      }
      if (grouped[key]) grouped[key].results.push(result)
    })
    return Object.values(grouped)
  }

  if (loading) {
    return <div className="text-white">Loading your results...</div>
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="text-red-400 text-xl mb-4">{error}</div>
        <Link href="/login" className="text-brand hover:opacity-80">Go to Login</Link>
      </div>
    )
  }

  const groupedResults = groupResultsByOrder()

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Your Test Results</h1>
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
                  {results.map((result, idx) => (
                    <div key={`${result.order_id || 'noorder'}-${result.hormone_type}-${result.tested_at || 'na'}-${idx}`} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-white">{getHormoneDisplayName(result.hormone_type)}</h3>
                        {result.status && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                            {getStatusIcon(result.status)} {result.status.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="text-2xl font-bold text-brand">{result.result_value ?? '-'} {result.unit ?? ''}</div>
                      </div>
                      <div className="mb-3 text-sm text-text-muted">Reference Range: {result.reference_range_min ?? '-'} - {result.reference_range_max ?? '-'} {result.unit ?? ''}</div>
                      <div className="mb-3 text-sm text-text-muted">{getHormoneDescription(result.hormone_type)}</div>
                      {result.notes ? (
                        <div className="pt-3 border-t border-white/10 text-sm text-text-muted"><strong>Lab Notes:</strong> {result.notes}</div>
                      ) : null}
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

        <div className="mt-8">
          <Link href="/account" className="inline-block px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all">← Back to Account</Link>
        </div>
      </div>
    </section>
  )
}


