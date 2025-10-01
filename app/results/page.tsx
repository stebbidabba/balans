'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useI18n } from '@/contexts/I18nContext'
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

export default function ResultsPage() {
  const { t } = useI18n()
  const [results, setResults] = useState<TestResult[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) {
        setError('Please log in to view your results')
        setLoading(false)
        return
      }
      
      setUser(currentUser)

      // Fetch user's results
      const response = await fetch('/api/results')
      if (!response.ok) throw new Error('Failed to fetch results')
      
      const data = await response.json()
      setResults(data.results || [])
      setOrders(data.orders || [])
    } catch (err) {
      console.error('Error fetching results:', err)
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
        if (order) {
          grouped[result.order_id] = { order, results: [] }
        }
      }
      if (grouped[result.order_id]) {
        grouped[result.order_id].results.push(result)
      }
    })
    
    return Object.values(grouped)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">{t('results_loading') || 'Loading your results...'}</div>
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
            <Link href="/login" className="text-brand hover:opacity-80">
              {t('go_to_login') || 'Go to Login'}
            </Link>
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
      
      {/* Background blur effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-gradient-to-br from-brand/25 via-purple-500/15 to-blue-500/20 rounded-full blur-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[700px] h-[700px] bg-gradient-to-bl from-emerald-400/20 via-cyan-400/15 to-brand/25 rounded-full blur-blob"></div>
      </div>

      <section className="relative pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">{t('results_title') || 'Your Test Results'}</h1>
            <p className="text-text-muted">{t('results_subtitle') || 'Hormone analysis from your lab tests'}</p>
          </div>

          {/* Results */}
          {groupedResults.length === 0 ? (
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">{t('results_empty') || 'No results yet'}</h3>
              <p className="text-text-muted mb-6">{t('results_empty_desc') || 'Your test results will appear here once analysis is complete'}</p>
              <Link 
                href="/account/orders"
                className="inline-block px-8 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                {t('view_my_orders') || 'View My Orders'}
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {groupedResults.map(({ order, results }) => (
                <div key={order.id} className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  {/* Order Header */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {(t('order_hash') || 'Order #')}{order.id}
                    </h2>
                    <p className="text-text-muted">
                      {(t('tested_on') || 'Tested on')} {new Date(results[0]?.tested_at || order.created_at).toLocaleDateString()}
                    </p>
                    {/* Show products ordered */}
                    <div className="mt-2">
                      <p className="text-sm text-text-muted">
                        Products: {order.products?.map(p => `${p.name} (Qty: ${p.quantity})`).join(', ') || '1 item'}
                      </p>
                    </div>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {results.map((result) => (
                      <div key={result.id} className="bg-white/5 rounded-lg p-4">
                        {/* Hormone Header */}
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium text-white">
                            {getHormoneDisplayName(result.hormone_type)}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                            {getStatusIcon(result.status)} {result.status.toUpperCase()}
                          </span>
                        </div>

                        {/* Result Value */}
                        <div className="mb-3">
                          <div className="text-2xl font-bold text-brand">
                            {result.result_value} {result.unit}
                          </div>
                        </div>

                        {/* Reference Range */}
                        <div className="mb-3">
                          <div className="text-sm text-text-muted">
                            {(t('reference_range') || 'Reference Range')}: {result.reference_range_min} - {result.reference_range_max} {result.unit}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                          <p className="text-sm text-text-muted">
                            {getHormoneDescription(result.hormone_type)}
                          </p>
                        </div>

                        {/* Notes */}
                        {result.notes && (
                          <div className="pt-3 border-t border-white/10">
                            <p className="text-sm text-text-muted">
                              <strong>{t('lab_notes') || 'Lab Notes'}:</strong> {result.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Kit Code */}
                  {results[0]?.kit_code && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-sm text-text-muted">
                        {(t('kit_code') || 'Kit Code')}: <span className="font-mono text-white">{results[0].kit_code}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Back to Account */}
          <div className="mt-8 text-center">
            <Link 
              href="/account"
              className="inline-block px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
            >
              ← {(t('back_to_account') || 'Back to Account')}
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}