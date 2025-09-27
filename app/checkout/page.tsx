'use client'

import { useCart } from '../../contexts/CartContext'
import { useEffect, useState } from 'react'

export default function CheckoutPage() {
  const { state } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('Checkout page mounted, cart state:', state)
  }, [])

  useEffect(() => {
    console.log('Cart state changed:', state)
  }, [state])

  // Show loading state until component is mounted and cart is available
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const subtotal = state.total
  const total = subtotal // No additional tax - price includes everything

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background blur effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-gradient-to-br from-brand/30 via-purple-500/20 to-blue-500/25 rounded-full blur-blob"></div>
        <div className="absolute top-[10%] -right-[15%] w-[900px] h-[900px] bg-gradient-to-bl from-emerald-400/25 via-cyan-400/20 to-brand/30 rounded-full blur-blob"></div>
        <div className="absolute top-[40%] left-[5%] w-[700px] h-[700px] bg-gradient-to-tr from-purple-400/20 via-pink-400/15 to-brand/25 rounded-full blur-blob"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-gradient-to-tl from-blue-400/25 via-brand/20 to-emerald-400/20 rounded-full blur-blob"></div>
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <a href="/" className="inline-block hover:opacity-80 transition-opacity mb-8">
              <img 
                src="/whitelogo.png" 
                alt="Balans" 
                className="h-12 w-auto mx-auto"
              />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Your Bag */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">YOUR BAG</h2>
              
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-4">
                  TOTAL: ({state.items.length} {state.items.length === 1 ? 'item' : 'items'}) ${subtotal.toFixed(2)}
                </div>
                <p className="text-sm text-gray-500">
                  Items in your bag are not reserved — check out now to make them yours.
                </p>
              </div>

              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Your bag is empty</p>
                  <a
                    href="/shop"
                    className="inline-block px-6 py-3 bg-brand text-black font-medium rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Continue shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-xl font-bold text-gray-900">${item.price}</p>
                        {item.variant && (
                          <p className="text-sm text-gray-600 mb-2">{item.variant}</p>
                        )}
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Checkout Form */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
              
              {/* Shipping Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="Street address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                        placeholder="Reykjavík"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                        placeholder="101"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>{state.items.length} {state.items.length === 1 ? 'item' : 'items'}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <button className="flex items-center text-sm font-medium text-gray-900 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors">
                  <span className="mr-2 text-brand">%</span>
                  USE A PROMO CODE
                </button>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                
                {/* Apple Pay Button */}
                <button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Pay with Apple Pay
                </button>

                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Credit Card Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center mb-6"
                disabled={state.items.length === 0}
              >
                CHECKOUT
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Accepted Payment Methods */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">ACCEPTED PAYMENT METHODS</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MC</span>
                  </div>
                  <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AMEX</span>
                  </div>
                  <div className="w-12 h-8 bg-black rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Back to Shopping */}
              <div className="text-center">
                <a
                  href="/shop"
                  className="text-brand hover:text-brand/80 font-medium transition-colors"
                >
                  ← Continue shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}