import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabaseServer } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = supabaseServer()
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Auth error:', userError)
      return NextResponse.json({ error: 'Authentication error' }, { status: 401 })
    }
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Fetch user's orders for summary panel
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          unit_price,
          products (
            name,
            description
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (ordersError) {
      console.error('Error fetching user orders:', ordersError)
      // Return empty results if orders table doesn't exist or has issues
      return NextResponse.json({ results: [], orders: [] })
    }

    // Fetch results via proper joins anchored on user's orders:
    // orders (user_id) -> shipments (order_id) -> kits (kit_id) -> samples (kit_id)
    const orderIds = (orders || []).map((o: any) => o.id)
    if (orderIds.length === 0) {
      return NextResponse.json({ results: [], orders: orders || [] })
    }

    const { data: shipments, error: shipmentsErr } = await supabase
      .from('shipments')
      .select('id, order_id, kit_id')
      .in('order_id', orderIds)
    if (shipmentsErr) {
      console.error('Error fetching shipments:', shipmentsErr)
      return NextResponse.json({ results: [], orders: orders || [] })
    }

    const kitIds = (shipments || []).map((s: any) => s.kit_id).filter(Boolean)
    if (kitIds.length === 0) {
      return NextResponse.json({ results: [], orders: orders || [] })
    }

    const { data: kits, error: kitsErr } = await supabase
      .from('kits')
      .select('id, kit_code')
      .in('id', kitIds)
    if (kitsErr) {
      console.error('Error fetching kits:', kitsErr)
      return NextResponse.json({ results: [], orders: orders || [] })
    }

    const kitIdToCode: Record<string, string> = (kits || []).reduce((acc: any, k: any) => { acc[k.id] = k.kit_code; return acc }, {})

    const { data: samples, error: samplesErr } = await supabase
      .from('samples')
      .select('id, received_at_lab, kit_id')
      .in('kit_id', kitIds)
    if (samplesErr) {
      console.error('Error fetching samples:', samplesErr)
      return NextResponse.json({ results: [], orders: orders || [] })
    }

    const sampleIds = (samples || []).map((s: any) => s.id)
    if (sampleIds.length === 0) {
      return NextResponse.json({ results: [], orders: orders || [] })
    }

    // 2) results for those samples with allowed statuses
    const allowedStatuses = ['ready', 'released', 'corrected']
    const { data: resultsRows, error: resultsErr } = await supabase
      .from('results')
      .select('id, sample_id, status')
      .in('sample_id', sampleIds)
      .in('status', allowedStatuses)

    if (resultsErr) {
      console.error('Error fetching results:', resultsErr)
      return NextResponse.json({ results: [], orders: orders || [] })
    }

    const resultIds = (resultsRows || []).map((r: any) => r.id)
    if (resultIds.length === 0) {
      return NextResponse.json({ results: [], orders: orders || [] })
    }

    // 3) result_values for those results
    const { data: resultValues, error: rvErr } = await supabase
      .from('result_values')
      .select('id, result_id, assay_id, value, unit, reference_range_min, reference_range_max, tested_at')
      .in('result_id', resultIds)

    if (rvErr) {
      console.error('Error fetching result_values:', rvErr)
      return NextResponse.json({ results: [], orders: orders || [] })
    }

    const assayIds = Array.from(new Set((resultValues || []).map((rv: any) => rv.assay_id).filter(Boolean)))

    // 4) assays for hormone name
    let assaysMap: Record<string, any> = {}
    if (assayIds.length > 0) {
      const { data: assays, error: assaysErr } = await supabase
        .from('assays')
        .select('id, display_name, ref_low, ref_high')
        .in('id', assayIds)

      if (assaysErr) {
        console.error('Error fetching assays:', assaysErr)
      } else {
        assaysMap = (assays || []).reduce((acc: any, a: any) => { acc[a.id] = a; return acc }, {})
      }
    }

    // 5) Map kit_code -> order_id via shipments already loaded
    const kitCodeToOrderId: Record<string, string> = (shipments || []).reduce((acc: any, s: any) => {
      const code = kitIdToCode[s.kit_id]
      if (code) acc[code] = s.order_id
      return acc
    }, {})

    // Indexes for assembly
    const sampleById = (samples || []).reduce((acc: any, s: any) => { acc[s.id] = s; return acc }, {})
    const resultById = (resultsRows || []).reduce((acc: any, r: any) => { acc[r.id] = r; return acc }, {})

    // 6) Flatten into legacy shape expected by the UI
    const flattened = (resultValues || []).map((rv: any) => {
      const result = resultById[rv.result_id]
      const sample = result ? sampleById[result.sample_id] : null
      const kitCode = sample ? kitIdToCode[sample.kit_id] || null : null
      const orderId = kitCode ? kitCodeToOrderId[kitCode] || null : null
      const assay = assaysMap[rv.assay_id]
      return {
        order_id: orderId,
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

    // Transform orders data
    const transformedOrders = orders.map((order: any) => ({
      ...order,
      products: order.order_items?.map((item: any) => ({
        name: item.products?.name || 'Unknown Product',
        description: item.products?.description || '',
        quantity: item.quantity,
        unit_price: item.unit_price
      })) || []
    }))

    return NextResponse.json({ 
      results: flattened, 
      orders: transformedOrders 
    })
  } catch (error) {
    console.error('Error in GET /api/results:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
