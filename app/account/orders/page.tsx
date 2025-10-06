'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import Link from 'next/link'

interface Order {
  id: string
  email: string
  status: string
  total_amount: number
  created_at: string
  products?: any[]
  kit_codes?: string[]
  tracking_number?: string
  results_uploaded?: boolean
}

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchUserOrders()
  }, [])

  const fetchUserOrders = async () => {
    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) {
        setError('Please log in to view your orders')
        setLoading(false)
        return
      }
      
      setUser(currentUser)

      // Fetch user's orders
      const response = await fetch('/api/user/orders')
      if (!response.ok) throw new Error('Failed to fetch orders')
      
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-yellow-100 text-yellow-800'
      case 'sample_received': return 'bg-purple-100 text-purple-800'
      case 'processing': return 'bg-orange-100 text-orange-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Order confirmed, preparing your test kit'
      case 'shipped': return 'Test kit shipped, check your email for tracking'
      case 'sample_received': return 'Sample received, analysis in progress'
      case 'processing': return 'Lab analysis in progress'
      case 'completed': return 'Results ready! Check your email'
      default: return 'Order status unknown'
    }
  }

  if (loading) {
    return <div className="text-white">Loading your orders...</div>
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="text-red-400 text-xl mb-4">{error}</div>
        <Link href="/login" className="text-brand hover:opacity-80">Go to Login</Link>
      </div>
    )
  }

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">My Orders</h1>
          <p className="text-text-muted">Track your hormone test orders</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">No orders yet</h3>
            <p className="text-text-muted mb-6">Start your hormone testing journey</p>
            <Link 
              href="/shop"
              className="inline-block px-8 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Browse Tests
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Order #{order.id}
                      </h3>
                      <p className="text-text-muted">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Status Message */}
                  <div className="mb-4 p-3 bg-white/5 rounded-lg">
                    <p className="text-text-muted text-sm">
                      {getStatusMessage(order.status)}
                    </p>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Products</h4>
                      <div className="space-y-1">
                        {order.products?.map((product, index) => (
                          <div key={index} className="text-sm text-text-muted">
                            {product.name} (Qty: {product.quantity})
                          </div>
                        )) || (
                          <div className="text-sm text-text-muted">1 item</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Total</h4>
                      <p className="text-lg font-semibold text-brand">
                        {order.total_amount} ISK
                      </p>
                    </div>
                  </div>

                  {/* Kit Codes */}
                  {order.kit_codes && order.kit_codes.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Kit Codes</h4>
                      <div className="flex flex-wrap gap-2">
                        {order.kit_codes.map((code, index) => (
                          <span key={index} className="px-2 py-1 bg-white/10 text-white text-sm rounded font-mono">
                            {code}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tracking Number */}
                  {order.tracking_number && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Tracking Number</h4>
                      <p className="text-sm text-text-muted font-mono">
                        {order.tracking_number}
                      </p>
                    </div>
                  )}

                  {/* Results Link */}
                  {order.status === 'completed' && (
                    <div className="pt-4 border-t border-white/10">
                      <Link 
                        href={`/orders/${order.id}`}
                        className="inline-block px-4 py-2 bg-brand text-black font-medium rounded-lg hover:opacity-90 transition-opacity"
                      >
                        View Results
                      </Link>
                    </div>
                  )}
                </div>
            ))}
          </div>
        )}

        {/* Back to Account */}
        <div className="mt-8">
          <Link 
            href="/account"
            className="inline-block px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
          >
            ← Back to Account
          </Link>
        </div>
      </div>
    </section>
  )
}
