'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Order {
  id: string
  email: string
  status: string
  total_amount: number
  created_at: string
  products?: any[]
  kit_codes?: string[]
}

interface TestResult {
  hormone_type: string
  result_value: number
  unit: string
  reference_range_min: number
  reference_range_max: number
  status: string
  notes: string
}

export default function AdminResultsPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      hormone_type: 'testosterone',
      result_value: 0,
      unit: 'ng/mL',
      reference_range_min: 2.5,
      reference_range_max: 8.5,
      status: 'normal',
      notes: ''
    },
    {
      hormone_type: 'cortisol',
      result_value: 0,
      unit: 'μg/dL',
      reference_range_min: 6.0,
      reference_range_max: 23.0,
      status: 'normal',
      notes: ''
    },
    {
      hormone_type: 'dhea',
      result_value: 0,
      unit: 'ng/mL',
      reference_range_min: 0.5,
      reference_range_max: 3.0,
      status: 'normal',
      notes: ''
    }
  ])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders')
      if (!response.ok) throw new Error('Failed to fetch orders')
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    }
  }

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const updateTestResult = (index: number, field: keyof TestResult, value: any) => {
    const updated = [...testResults]
    updated[index] = { ...updated[index], [field]: value }
    
    // Auto-calculate status based on reference range
    if (field === 'result_value' && value > 0) {
      const result = updated[index]
      if (value < result.reference_range_min) {
        result.status = 'low'
      } else if (value > result.reference_range_max) {
        result.status = 'high'
      } else {
        result.status = 'normal'
      }
    }
    
    setTestResults(updated)
  }

  const submitResults = async () => {
    if (!selectedOrder) {
      setError('Please select an order')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          kitCode: selectedOrder.kit_codes?.[0] || `KT-${selectedOrder.id.slice(-6)}`,
          testResults: testResults.filter(result => result.result_value > 0)
        })
      })

      if (!response.ok) throw new Error('Failed to save results')

      setSuccess('Results saved successfully!')
      
      // Reset form
      setTestResults(testResults.map(result => ({ ...result, result_value: 0, notes: '' })))
      setSelectedOrder(null)
      
      // Refresh orders
      await fetchOrders()
    } catch (err) {
      console.error('Error saving results:', err)
      setError(err instanceof Error ? err.message : 'Failed to save results')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'normal': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

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
            <h1 className="text-4xl font-bold text-white mb-4">Lab Results Entry</h1>
            <p className="text-text-muted">Enter hormone test results from your Absorbance 96 machine</p>
          </div>

          {/* Order Selection */}
          <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Select Order</h2>
            
            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by order ID or customer email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            {/* Orders List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedOrder?.id === order.id
                      ? 'bg-brand/20 border border-brand/30'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">Order #{order.id.slice(0, 8)}...</p>
                      <p className="text-text-muted text-sm">{order.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{order.total_amount} ISK</p>
                      <p className="text-text-muted text-sm">{order.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results Entry Form */}
          {selectedOrder && (
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Enter Results for Order #{selectedOrder.id}
              </h2>
              
              <div className="space-y-6">
                {testResults.map((result, index) => (
                  <div key={result.hormone_type} className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4 capitalize">
                      {result.hormone_type}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Result Value */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Result Value
                        </label>
                        <input
                          type="number"
                          step="0.001"
                          value={result.result_value || ''}
                          onChange={(e) => updateTestResult(index, 'result_value', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                      </div>
                      
                      {/* Unit */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Unit
                        </label>
                        <input
                          type="text"
                          value={result.unit}
                          onChange={(e) => updateTestResult(index, 'unit', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                      </div>
                      
                      {/* Status */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Status
                        </label>
                        <div className={`px-3 py-2 rounded-lg ${getStatusColor(result.status)} font-medium`}>
                          {result.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    {/* Reference Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Reference Range Min
                        </label>
                        <input
                          type="number"
                          step="0.001"
                          value={result.reference_range_min}
                          onChange={(e) => updateTestResult(index, 'reference_range_min', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Reference Range Max
                        </label>
                        <input
                          type="number"
                          step="0.001"
                          value={result.reference_range_max}
                          onChange={(e) => updateTestResult(index, 'reference_range_max', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                      </div>
                    </div>
                    
                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Lab Notes
                      </label>
                      <textarea
                        value={result.notes}
                        onChange={(e) => updateTestResult(index, 'notes', e.target.value)}
                        placeholder="Enter any observations or notes..."
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Submit Button */}
              <div className="mt-6">
                <button
                  onClick={submitResults}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {loading ? 'Saving Results...' : 'Save Results & Complete Order'}
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-400">{success}</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
