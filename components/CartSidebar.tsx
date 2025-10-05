'use client'

import { useCart } from '../contexts/CartContext'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/contexts/I18nContext'

export default function CartSidebar() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const { t } = useI18n()

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

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const handleCheckout = () => {
    console.log('Checkout clicked, current cart state:', state)
    dispatch({ type: 'CLOSE_CART' })
    
    // If cart has items, go to checkout with cart flag
    if (state.items.length > 0) {
      // For now, use the first item but indicate it's from cart
      const firstItem = state.items[0]
      router.push(`/checkout?product=${firstItem.id}&qty=${firstItem.quantity}&cart=true`)
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
                  {t('total')}: ({state.items.length} {state.items.length === 1 ? t('item') : t('items')}) ${state.total.toFixed(2)}
                </div>
                <p className="text-sm text-text-muted/70 mb-6">
                  Items in your bag are not reserved — check out now to make them yours.
                </p>
                
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">{formatI18n(item.name)}</h3>
                      <p className="text-lg font-semibold text-brand">${item.price}</p>
                      {item.variant && (
                        <p className="text-sm text-text-muted">{formatI18n(item.variant)}</p>
                      )}
                      
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-white/20 rounded flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Sales Tax</span>
                  <span>${(state.total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg text-white border-t border-white/10 pt-2">
                  <span>Total</span>
                  <span>${(state.total * 1.1).toFixed(2)}</span>
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
            </div>
          )}
        </div>
      </div>
    </>
  )
}
