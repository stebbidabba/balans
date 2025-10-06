'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'

interface TransactionItem {
  id: string
  created_at: string
  amount_isk: number
  description: string
}

export default function TransactionsPage() {
  const [items, setItems] = useState<TransactionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setError('Please log in to view transactions')
          setLoading(false)
          return
        }

        // Basic placeholder: derive from orders as "transactions"
        const res = await fetch('/api/user/orders')
        if (!res.ok) throw new Error('Failed to load transactions')
        const data = await res.json()
        const mapped: TransactionItem[] = (data.orders || []).map((o: any) => ({
          id: o.id,
          created_at: o.created_at,
          amount_isk: o.total_amount,
          description: 'Order payment'
        }))
        setItems(mapped)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load transactions')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="text-white">Loading transactions...</div>
  }

  if (error) {
    return <div className="text-red-400">{error}</div>
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Transactions</h1>
        <p className="text-text-muted">Payments and refunds associated with your orders</p>
      </div>

      <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-6 py-3 text-sm text-text-muted border-b border-white/10">
          <div>Date</div>
          <div>Description</div>
          <div className="text-right">Amount (ISK)</div>
          <div className="text-right">Status</div>
        </div>
        {items.length === 0 ? (
          <div className="px-6 py-8 text-text-muted">No transactions yet.</div>
        ) : (
          items.map((tx) => (
            <div key={tx.id} className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/5 last:border-0">
              <div className="text-white/90">{new Date(tx.created_at).toLocaleDateString()}</div>
              <div className="text-white">{tx.description}</div>
              <div className="text-right text-white">{new Intl.NumberFormat('is-IS').format(tx.amount_isk)}</div>
              <div className="text-right"><span className="px-2 py-1 rounded-lg text-xs bg-green-500/20 text-green-400">Paid</span></div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


