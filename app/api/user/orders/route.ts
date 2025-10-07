import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabaseServer } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = supabaseServer()
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch user's orders
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          unit_price,
          unit_price_isk,
          kit_code,
          products (
            name,
            description
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user orders:', error)
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    // Transform the data to include products array and kit codes
    const transformedOrders = orders.map((order: any) => {
      // If no order_items, create fallback product data
      let products = []
      if (order.order_items && order.order_items.length > 0) {
        products = order.order_items.map((item: any) => ({
          name: item.products?.name || 'Unknown Product',
          description: item.products?.description || '',
          quantity: item.quantity,
          unit_price: item.unit_price_isk ?? item.unit_price
        }))
      } else {
        // Fallback: create a single product based on order total
        const fallbackProducts = {
          12900: { name: 'Testosterone Kit', description: 'Track free testosterone with a simple saliva test.' },
          14400: { name: 'Stress & Energy Kit', description: 'Assess cortisol and related markers to understand stress load.' },
          19900: { name: 'Complete Hormone Panel', description: 'Comprehensive analysis of key hormones for optimal health.' },
          48700: { name: 'Multiple Test Kits', description: 'Combination of hormone test kits.' }
        }
        
        // For multiple kits, determine quantity based on total amount
        let quantity = 1
        let productName = 'Hormone Test Kit'
        let productDescription = 'Hormone testing kit'
        
        if (order.total_amount >= 48700) {
          // Multiple kits - estimate quantity
          quantity = Math.floor(order.total_amount / 12900) // Assume average price per kit
          productName = 'Multiple Test Kits'
          productDescription = 'Combination of hormone test kits'
        } else if (order.total_amount === 12900) {
          productName = 'Testosterone Kit'
          productDescription = 'Track free testosterone with a simple saliva test.'
        } else if (order.total_amount === 14400) {
          productName = 'Stress & Energy Kit'
          productDescription = 'Assess cortisol and related markers to understand stress load.'
        } else if (order.total_amount === 19900) {
          productName = 'Complete Hormone Panel'
          productDescription = 'Comprehensive analysis of key hormones for optimal health.'
        }
        
        products = [{ name: productName, description: productDescription, quantity: quantity, unit_price: order.total_amount / quantity }]
      }

      return {
        ...order,
        products: products,
        kit_codes: (order.order_items || []).map((it: any) => it.kit_code).filter(Boolean),
        results_uploaded: order.status === 'completed'
      }
    })

    return NextResponse.json({ orders: transformedOrders })
  } catch (error) {
    console.error('Error in GET /api/user/orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Removed mock kit code generation. Kit codes must come from DB via order_items.kit_code
