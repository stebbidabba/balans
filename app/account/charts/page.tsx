'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'

export default function ChartsPage() {
  const [eligible, setEligible] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setError('Please log in'); setEligible(false); return }

        // Count distinct completed tests from results API
        const res = await fetch('/api/results')
        if (!res.ok) throw new Error('Failed to load results')
        const data = await res.json()
        const count = (data.results || []).length
        setEligible(count >= 3)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load')
        setEligible(false)
      }
    }
    load()
  }, [])

  if (error) return <div className="text-red-400">{error}</div>

  if (eligible === null) return <div className="text-white">Checking eligibility...</div>

  if (!eligible) {
    return (
      <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h1 className="text-2xl font-semibold text-white mb-2">Charts</h1>
        <p className="text-text-muted">You need at least 3 completed tests to view trend charts. Once you have more results, charts will appear here.</p>
      </div>
    )
  }

  return (
    <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      <h1 className="text-2xl font-semibold text-white mb-4">Charts</h1>
      <p className="text-text-muted">Charts coming soon.</p>
    </div>
  )
}


