
import Link from 'next/link'
import { supabaseServer } from '@/lib/supabase'

interface TestResult {
  id?: number | string
  order_id: string | null
  sample_id?: string | null
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

export default async function AccountResultsPage() {
  const supabase = supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return (
      <div className="text-center">
        <div className="text-red-400 text-xl mb-4">Please log in to view your results</div>
        <Link href="/login" className="text-brand hover:opacity-80">Go to Login</Link>
      </div>
    )
  }

  // Orders for header/context
  const { data: ordersRaw } = await supabase
    .from('orders')
    .select(`*, order_items(id, quantity, unit_price, products(name, description))`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const orders: Order[] = (ordersRaw || []) as any
  console.log('=== ORDERS ===', orders)
  console.log('[DEBUG orders]:', orders?.length || 0, 'first order:', orders?.[0]?.id)

  // Samples joined to kits for kit_code
  const { data: samplesRaw } = await supabase
    .from('samples')
    .select('id, user_id, received_at_lab, kit_id, kits ( id, kit_code )')
    .eq('user_id', user.id)

  const samples = samplesRaw || []
  const sampleIds = samples.map((s: any) => s.id)
  const kitCodes: string[] = samples.map((s: any) => s.kits?.kit_code).filter(Boolean)

  let flattened: TestResult[] = []
  if (sampleIds.length > 0) {
    const allowedStatuses = ['ready', 'released', 'corrected']
    const { data: resultsRows } = await supabase
      .from('results')
      .select('id, sample_id, status')
      .in('sample_id', sampleIds)
      .in('status', allowedStatuses)

    const resultIds = (resultsRows || []).map((r: any) => r.id)
    const sampleById = (samples || []).reduce((acc: any, s: any) => { acc[s.id] = s; return acc }, {})
    const resultById = (resultsRows || []).reduce((acc: any, r: any) => { acc[r.id] = r; return acc }, {})

    if (resultIds.length > 0) {
      const { data: resultValues } = await supabase
        .from('result_values')
        .select('id, result_id, assay_id, value, unit, reference_range_min, reference_range_max, tested_at')
        .in('result_id', resultIds)

      const assayIds = Array.from(new Set((resultValues || []).map((rv: any) => rv.assay_id).filter(Boolean)))
      let assaysMap: Record<string, any> = {}
      if (assayIds.length > 0) {
        const { data: assays } = await supabase
          .from('assays')
          .select('id, display_name, ref_low, ref_high')
          .in('id', assayIds)
        assaysMap = (assays || []).reduce((acc: any, a: any) => { acc[a.id] = a; return acc }, {})
      }

      // Map kit_code -> order_id via kits -> shipments
      let kitCodeToOrderId: Record<string, string> = {}
      if (kitCodes.length > 0) {
        const { data: kits } = await supabase
          .from('kits')
          .select('id, kit_code')
          .in('kit_code', kitCodes)
        const kitIds = (kits || []).map((k: any) => k.id)
        const kitCodeById = (kits || []).reduce((acc: any, k: any) => { acc[k.id] = k.kit_code; return acc }, {})
        if (kitIds.length > 0) {
          const { data: shipments } = await supabase
            .from('shipments')
            .select('id, kit_id, order_id')
            .in('kit_id', kitIds)
          kitCodeToOrderId = (shipments || []).reduce((acc: any, s: any) => {
            const code = kitCodeById[s.kit_id]
            if (code) acc[code] = s.order_id
            return acc
          }, {})
        }
      }

      flattened = (resultValues || []).map((rv: any) => {
        const result = resultById[rv.result_id]
        const sample = result ? sampleById[result.sample_id] : null
        const kitCode = sample?.kits?.kit_code || null
        const orderId = kitCode ? kitCodeToOrderId[kitCode] || null : null
        const assay = assaysMap[rv.assay_id]
        return {
          order_id: orderId,
          sample_id: result?.sample_id ?? null,
          hormone_type: assay?.display_name || 'unknown',
          result_value: rv.value ?? null,
          unit: rv.unit ?? null,
          reference_range_min: rv.reference_range_min ?? assay?.ref_low ?? null,
          reference_range_max: rv.reference_range_max ?? assay?.ref_high ?? null,
          tested_at: rv.tested_at || sample?.received_at_lab || null,
          kit_code: kitCode,
          notes: null,
          status: result?.status || null
        }
      })
    }
  }

  const flattenedResults = flattened
  console.log('=== FLATTENED ===', flattenedResults)
  console.log('[DEBUG results]:', flattenedResults?.length || 0, 'first result order_id:', flattenedResults?.[0]?.order_id)
  console.log('[DEBUG] Raw orders array:', JSON.stringify(((orders as any[]) || []).map((o: any) => ({ id: o.id, user_id: o.user_id })) || []))
  console.log('[DEBUG] Raw flattened results:', JSON.stringify(((flattenedResults as any[]) || []).map((r: any) => ({ order_id: r.order_id, hormone: r.hormone_type })) || []))

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

  // If order mapping fails, show a flat list grouped by sample_id instead
  const groupedResults = (() => {
    const grouped: { [key: string]: { title: string; results: TestResult[] } } = {}
    flattened.forEach(r => {
      const key = r.order_id ?? r.sample_id ?? 'unknown'
      if (!grouped[key]) {
        const order = r.order_id ? orders.find(o => o.id === r.order_id) : null
        const title = order ? `Order #${order.id}` : r.sample_id ? `Sample ${r.sample_id}` : 'Results'
        grouped[key] = { title, results: [] }
      }
      grouped[key].results.push(r)
    })
    return Object.entries(grouped).map(([k, v]) => ({ id: k, title: v.title, results: v.results }))
  })()
  console.log('[ResultsPage] orders count:', (orders || []).length)
  console.log('[ResultsPage] orders ids:', (orders || []).map(o => o.id))
  console.log('[ResultsPage] flattened count:', flattened.length)
  console.log('[ResultsPage] flattened sample:', flattened.slice(0, 3))
  console.log('[ResultsPage] sample order.id:', (orders && orders[0]?.id) || null)
  console.log('[ResultsPage] sample flattened.order_id:', (flattened && flattened[0]?.order_id) || null)
  console.log('[ResultsPage] groupedResults count:', groupedResults.length)
  console.log('[ResultsPage] grouped order ids:', groupedResults.map(g => g.order.id))

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
            {groupedResults.map((group: any) => (
              <div key={group.id} className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-2">{group.title}</h2>
                  <p className="text-text-muted">Tested on {new Date(group.results[0]?.tested_at || new Date()).toLocaleDateString()}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {group.results.map((result: TestResult, idx: number) => (
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


