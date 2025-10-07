'use client'

import { useCart } from '../contexts/CartContext'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/contexts/I18nContext'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'

export default function CartSidebar() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const { t } = useI18n()

  const [prodMap, setProdMap] = useState<Record<string, { id: string; name: string; price_isk: number; image_url?: string }>>({})
  const [computedTotal, setComputedTotal] = useState<number>(0)

  useEffect(() => {
    console.log('=== CART SIDEBAR FETCH DEBUG ===')
    console.log('Cart items from state:', JSON.stringify(state.items, null, 2))
    console.log('Number of items:', state.items.length)
    
    if (!state.items.length) {
      console.log('Cart is empty, clearing products and total')
      setProdMap({})
      setComputedTotal(0)
      return
    }

    const fetchProducts = async () => {
      try {
        const supabase = createClient()
        
        if (!supabase) {
          console.error('❌ Supabase client is NULL')
          console.log('Environment check:')
          console.log('  NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ SET' : '✗ MISSING')
          console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ SET' : '✗ MISSING')
          return
        }
        
        const ids = state.items.map(i => i.product_id)
        console.log('Product IDs to fetch:', ids)
        console.log('ID types:', ids.map(id => `${id} (${typeof id})`))
        
        console.log('Executing Supabase query...')
        const { data, error } = await supabase
          .from('products')
          .select('id,name,description,price_isk,image_url')
          .in('id', ids)
        
        console.log('Supabase query completed')
        console.log('  Error:', error)
        console.log('  Data:', data)
        console.log('  Rows returned:', data?.length || 0)
        
        if (error) {
          console.error('❌ Supabase query error:', error.message, error.details, error.hint)
          return
        }
        
        if (!data || data.length === 0) {
          console.error('❌ No products returned from database!')
          console.log('This means cart product IDs do not exist in products table')
          console.log('Cart IDs:', ids)
          console.log('ACTION: Run this SQL to inspect products: SELECT id, name FROM products WHERE active = true;')
          return
        }
        
        console.log('✓ Products fetched successfully:', data.length, 'products')
        
        const map: Record<string, any> = {}
        data.forEach((p: any) => { 
          map[p.id] = p
          console.log(`  ✓ Mapped: ${p.id} → ${p.name} (${p.price_isk} ISK)`) 
        })
        
        setProdMap(map)
        console.log('Products state updated, map has', Object.keys(map).length, 'entries')
        
        const total = state.items.reduce((sum, item) => {
          const product = map[item.product_id]
          if (!product) {
            console.warn(`  ⚠️ No product found for cart item with ID: ${item.product_id}`)
            return sum
          }
          const lineTotal = product.price_isk * item.quantity
          console.log(`  ${product.name} x${item.quantity} = ${lineTotal} ISK`)
          return sum + lineTotal
        }, 0)
        
        console.log('✓ Computed total:', total, 'ISK')
        setComputedTotal(total)
      } catch (err) {
        console.error('❌ Unexpected error in fetchProducts:', err)
      }
    }

    fetchProducts()
  }, [state.items])

  if (!state.isOpen) return null

  const formatI18n = (value: any) => {
    const text = String(value ?? '')
    if (!text) return ''
    if (text.includes('_') && !text.includes(' ')) {
      const spaced = text.replace(/_/g, ' ')
      return spaced.replace(/\b\w/g, (m) => m.toUpperCase())
    }
    return text
  }

  const updateQuantity = (product_id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { product_id, quantity } })
  }

  const removeItem = (product_id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product_id })
  }

  const handleCheckout = () => {
    console.log('Checkout clicked, current cart state:', state)
    dispatch({ type: 'CLOSE_CART' })
    
    // If cart has items, go to checkout with cart flag
    if (state.items.length > 0) {
      router.push(`/checkout?cart=true`)
    } else {
      // If cart is empty, go to shop
      router.push('/shop')
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-bg-card/95 backdrop-blur-xl shadow-2xl border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">{t('your_bag')}</h2>
            <button
              onClick={() => dispatch({ type: 'CLOSE_CART' })}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-muted mb-4">{t('cart_is_empty')}</p>
                <button
                  onClick={() => dispatch({ type: 'CLOSE_CART' })}
                  className="text-brand hover:text-brand/80 font-medium"
                >
                  {t('continue_shopping')}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
              <div className="text-sm text-text-muted mb-4">
                {t('total')}: ({state.items.length} {state.items.length === 1 ? t('item') : t('items')}) {new Intl.NumberFormat('is-IS').format(computedTotal)} ISK
              </div>
                <p className="text-sm text-text-muted/70 mb-6">
                  Items in your bag are not reserved — check out now to make them yours.
                </p>
                
                {state.items.map((item) => (
                  <div key={item.product_id} className="flex gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="relative">
                      <img
                        src={prodMap[item.product_id]?.image_url || '/testkit.png'}
                        alt={prodMap[item.product_id]?.name || 'Product'}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">{prodMap[item.product_id]?.name || 'Product'}</h3>
                      <p className="text-lg font-semibold text-brand">{prodMap[item.product_id] ? `${prodMap[item.product_id].price_isk} ISK` : ''}</p>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="w-8 h-8 border border-white/20 rounded flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="w-8 h-8 border border-white/20 rounded flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-text-muted">
                  <span>{state.items.length} {state.items.length === 1 ? 'item' : 'items'}</span>
                  <span>{new Intl.NumberFormat('is-IS').format(computedTotal)} ISK</span>
                </div>
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Sales Tax</span>
                  <span>0 ISK</span>
                </div>
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg text-white border-t border-white/10 pt-2">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('is-IS').format(computedTotal)} ISK</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-brand hover:bg-brand/90 text-black font-semibold py-4 rounded-xl transition-colors flex items-center justify-center shadow-button"
              >
                {t('checkout')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Debug tools (temporary) */}
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => {
                    console.log('=== MANUAL DEBUG ===')
                    console.log('localStorage cart:', localStorage.getItem('balans-cart'))
                    console.log('Current cart state:', state.items)
                    console.log('Products loaded:', prodMap)
                    console.log('Computed total:', computedTotal)
                  }}
                  className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded text-sm"
                >
                  🐛 Debug Cart (Check Console)
                </button>
                <button
                  onClick={() => {
                    if (confirm('Clear cart and reload page?')) {
                      localStorage.removeItem('balans-cart')
                      window.location.reload()
                    }
                  }}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                >
                  🗑️ Clear Cart & Reload
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
