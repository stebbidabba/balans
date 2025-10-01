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
  tracking_number?: string
  results_uploaded?: boolean
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showStatusModal, setShowStatusModal] = useState(false)

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
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (!response.ok) throw new Error('Failed to update order')
      
      // Refresh orders
      await fetchOrders()
      setShowStatusModal(false)
      setSelectedOrder(null)
    } catch (err) {
      console.error('Error updating order:', err)
      setError(err instanceof Error ? err.message : 'Failed to update order')
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

  const getStatusActions = (order: Order) => {
    const actions = []
    
    if (order.status === 'confirmed') {
      actions.push({ label: 'Mark as Shipped', status: 'shipped', color: 'bg-yellow-500' })
    }
    if (order.status === 'shipped') {
      actions.push({ label: 'Sample Received', status: 'sample_received', color: 'bg-purple-500' })
    }
    if (order.status === 'sample_received') {
      actions.push({ label: 'Start Processing', status: 'processing', color: 'bg-orange-500' })
    }
    if (order.status === 'processing') {
      actions.push({ label: 'Upload Results', status: 'completed', color: 'bg-green-500' })
    }
    
    return actions
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  const getWorkflowStats = () => {
    return {
      readyToShip: orders.filter(o => o.status === 'confirmed').length,
      samplesToProcess: orders.filter(o => o.status === 'sample_received').length,
      resultsPending: orders.filter(o => o.status === 'processing').length,
      completed: orders.filter(o => o.status === 'completed').length
    }
  }

  const stats = getWorkflowStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading admin dashboard...</div>
        </div>
        <Footer />
      </div>
    )
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
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Lab Admin Dashboard</h1>
            <p className="text-text-muted">Manage orders and lab workflow</p>
          </div>

          {/* Workflow Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Ready to Ship</h3>
              <p className="text-3xl font-bold text-blue-400">{stats.readyToShip}</p>
              <p className="text-sm text-text-muted">Confirmed orders</p>
            </div>
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Samples to Process</h3>
              <p className="text-3xl font-bold text-purple-400">{stats.samplesToProcess}</p>
              <p className="text-sm text-text-muted">Awaiting analysis</p>
            </div>
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Results Pending</h3>
              <p className="text-3xl font-bold text-orange-400">{stats.resultsPending}</p>
              <p className="text-sm text-text-muted">Processing</p>
            </div>
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
              <p className="text-sm text-text-muted">Results delivered</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            {['all', 'confirmed', 'shipped', 'sample_received', 'processing', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === status
                    ? 'bg-brand text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {status === 'all' ? 'All Orders' : status.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">Products</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5">
                      <td className="px-6 py-4 text-sm text-white font-mono">
                        {order.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 text-sm text-text-muted">
                        {order.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-muted">
                        {order.products?.length || 1} item(s)
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        {order.total_amount} ISK
                      </td>
                      <td className="px-6 py-4 text-sm text-text-muted">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {getStatusActions(order).map((action) => (
                            <button
                              key={action.status}
                              onClick={() => {
                                setSelectedOrder(order)
                                setShowStatusModal(true)
                              }}
                              className={`px-3 py-1 text-xs font-medium text-white rounded-lg ${action.color} hover:opacity-80 transition-opacity`}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Status Update Modal */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-card/95 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Update Order Status</h3>
            <p className="text-text-muted mb-6">
              Order {selectedOrder.id.slice(0, 8)}... - {selectedOrder.email}
            </p>
            
            <div className="space-y-3">
              {getStatusActions(selectedOrder).map((action) => (
                <button
                  key={action.status}
                  onClick={() => updateOrderStatus(selectedOrder.id, action.status)}
                  className={`w-full px-4 py-3 text-white font-medium rounded-lg ${action.color} hover:opacity-80 transition-opacity`}
                >
                  {action.label}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => {
                setShowStatusModal(false)
                setSelectedOrder(null)
              }}
              className="w-full mt-4 px-4 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}

