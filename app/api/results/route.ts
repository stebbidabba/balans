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

    // Fetch user's orders
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

    // Fetch results using new schema: samples -> results -> result_values
    const orderIds = orders.map((order: any) => order.id)
    if (orderIds.length === 0) {
      return NextResponse.json({ results: [], orders: [] })
    }

    let results: any[] = []
    try {
      // Attempt to fetch nested structure. Adjust field names gracefully.
      const { data: samplesData, error: samplesError } = await supabase
        .from('samples')
        .select(`
          id,
          order_id,
          kit_code,
          tested_at,
          results (
            id,
            hormone_type,
            notes,
            result_values (
              id,
              value,
              unit,
              reference_range_min,
              reference_range_max,
              tested_at
            )
          )
        `)
        .in('order_id', orderIds)
        .order('tested_at', { ascending: false })

      if (samplesError) {
        console.error('Error fetching samples/results:', samplesError)
      }

      const flattened: any[] = []
      ;(samplesData || []).forEach((sample: any) => {
        const sampleOrderId = sample.order_id
        const sampleKitCode = sample.kit_code || null
        const sampleTestedAt = sample.tested_at || null
        ;(sample.results || []).forEach((res: any) => {
          const hormoneType = res.hormone_type || 'unknown'
          const notes = res.notes || null
          ;(res.result_values || []).forEach((rv: any) => {
            flattened.push({
              order_id: sampleOrderId,
              hormone_type: hormoneType,
              result_value: rv.value ?? null,
              unit: rv.unit ?? null,
              reference_range_min: rv.reference_range_min ?? null,
              reference_range_max: rv.reference_range_max ?? null,
              tested_at: rv.tested_at || sampleTestedAt || null,
              kit_code: sampleKitCode,
              notes
            })
          })
        })
      })

      results = flattened
    } catch (err) {
      console.error('Exception fetching results via new schema:', err)
      results = []
    }

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
      results: results, 
      orders: transformedOrders 
    })
  } catch (error) {
    console.error('Error in GET /api/results:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
