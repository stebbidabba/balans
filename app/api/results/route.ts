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

    // Fetch test results for user's orders
    const orderIds = orders.map(order => order.id)
    
    if (orderIds.length === 0) {
      return NextResponse.json({ results: [], orders: [] })
    }

    let results = []
    try {
      const { data: resultsData, error: resultsError } = await supabase
        .from('test_results')
        .select('*')
        .in('order_id', orderIds)
        .order('tested_at', { ascending: false })

      if (resultsError) {
        console.error('Error fetching test results:', resultsError)
        // If test_results table doesn't exist, just return empty results
        results = []
      } else {
        results = resultsData || []
      }
    } catch (err) {
      console.error('Exception fetching test results:', err)
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
