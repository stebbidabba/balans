'use client'

import { useEffect, useState, useCallback } from 'react'

type TestResult = {
  order_id: string | null
  sample_id?: string | null
  kit_code?: string | null
  hormone_type: string
  result_value: number | string | null
  unit: string | null
  reference_range_min?: number | string | null
  reference_range_max?: number | string | null
  tested_at: string | null
  status?: string | null
}

export default function ResultsClientFallback() {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetcher = useCallback(async () => {
    try {
      const res = await fetch('/api/results', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load results')
      const data = await res.json()
      setResults(data.results || [])
    } catch (e: any) {
      setError(e?.message || 'Failed to load results')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetcher() }, [fetcher])

  if (loading) return <div className="text-white">Loading results…</div>
  if (error) return <div className="text-red-400">{error}</div>
  if (!results.length) return <div className="text-text-muted">No results found.</div>

  // Group by order or sample as in server renderer
  const grouped = results.reduce((acc: Record<string, TestResult[]>, r) => {
    const key = r.order_id ?? r.sample_id ?? 'unknown'
    acc[key] = acc[key] || []
    acc[key].push(r)
    return acc
  }, {})

  const groups = Object.entries(grouped)

  return (
    <div className="space-y-8">
      {groups.map(([key, items]) => (
        <div key={key} className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">{items[0].order_id ? `Order #${items[0].order_id}` : (items[0].sample_id ? `Sample ${items[0].sample_id}` : 'Results')}</h2>
            <p className="text-text-muted">Tested on {new Date(items[0].tested_at || new Date().toISOString()).toLocaleDateString()}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((r, idx) => (
              <div key={`${key}-${idx}`} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-white">{r.hormone_type}</h3>
                </div>
                <div className="text-2xl font-bold text-brand">{r.result_value ?? '-'} {r.unit ?? ''}</div>
                {(r.reference_range_min || r.reference_range_max) && (
                  <div className="mt-2 text-sm text-text-muted">Range: {r.reference_range_min ?? '-'} – {r.reference_range_max ?? '-'} {r.unit ?? ''}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


