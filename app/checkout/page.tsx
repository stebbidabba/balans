'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from "@/lib/supabase-client"
import { createPaymentAction } from "./actions"
import StripeCheckoutClient from "./StripeCheckoutClient"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useI18n } from "@/contexts/I18nContext"
import Link from "next/link"
import type { User } from '@supabase/supabase-js'
import { useCart } from '@/contexts/CartContext'

export default function CheckoutPage() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const { state: cartState } = useCart()
  const [user, setUser] = useState<User | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [paymentData, setPaymentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [creatingPayment, setCreatingPayment] = useState(false)

  const productId = searchParams.get('product')
  const quantity = Number(searchParams.get('qty') || "1")
  const isFromCart = searchParams.get('cart') === 'true'

      useEffect(() => {
        const initializeCheckout = async () => {
          try {
            console.log('Initializing checkout with productId:', productId, 'isFromCart:', isFromCart)
            
            // If coming from cart, load all cart items
            if (isFromCart) {
              if (cartState.items.length === 0) {
                console.log('Cart is empty')
                setError('Cart is empty')
                setLoading(false)
                return
              }
            } else if (!productId) {
              console.log('No product ID provided')
              setError('No product selected')
              setLoading(false)
              return
            }

            const supabase = createClient()
            
            // Get user session
            const { data: { user: currentUser } } = await supabase.auth.getUser()
            console.log('Current user:', currentUser)
            setUser(currentUser)
            
            if (currentUser?.email) {
              setEmail(currentUser.email)
            }

            // Load products based on source
            let finalProducts = [];
            
            if (isFromCart) {
              // Load all cart items
              const fallbackProducts: any = {
                '1': {
                  id: 1,
                  name: 'Testosterone Kit',
                  description: 'Track free testosterone with a simple saliva test.',
                  price_isk: 12900,
                },
                '2': {
                  id: 2,
                  name: 'Stress & Energy Kit',
                  description: 'Assess cortisol and related markers to understand stress load.',
                  price_isk: 14400,
                },
                '3': {
                  id: 3,
                  name: 'Complete Hormone Panel',
                  description: 'Comprehensive analysis of key hormones for optimal health.',
                  price_isk: 19900,
                }
              }
              
              // Map cart items to products with quantities
              finalProducts = cartState.items.map(cartItem => ({
                ...fallbackProducts[cartItem.id],
                quantity: cartItem.quantity
              }))
            } else {
              // Single product checkout
              const fallbackProducts: any = {
                '1': {
                  id: 1,
                  name: 'Testosterone Kit',
                  description: 'Track free testosterone with a simple saliva test.',
                  price_isk: 12900,
                },
                '2': {
                  id: 2,
                  name: 'Stress & Energy Kit',
                  description: 'Assess cortisol and related markers to understand stress load.',
                  price_isk: 14400,
                },
                '3': {
                  id: 3,
                  name: 'Complete Hormone Panel',
                  description: 'Comprehensive analysis of key hormones for optimal health.',
                  price_isk: 19900,
                }
              }
              
              const product = fallbackProducts[productId]
              if (product) {
                finalProducts = [{ ...product, quantity }]
              }
            }
            
            if (finalProducts.length === 0) {
              console.log('No products found')
              setError('Products not found')
              setLoading(false)
              return
            }

            console.log('Setting products:', finalProducts)
            setProducts(finalProducts)
            setLoading(false)
          } catch (err) {
            console.error('Checkout initialization error:', err)
            setError('Failed to initialize checkout')
            setLoading(false)
          }
        }

        initializeCheckout()
      }, [productId])

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('Email is required')
      return
    }

        if (products.length === 0) {
          setError('Products not found')
          return
        }

    setCreatingPayment(true)
    setError(null)

    try {
          const paymentResult = await createPaymentAction({
            userId: user?.id,
            email: email.trim(),
            products: products,
            isFromCart: isFromCart
          })

      setPaymentData(paymentResult)
    } catch (err) {
      console.error('Payment creation failed:', err)
      setError(err instanceof Error ? err.message : 'Failed to create payment')
    } finally {
      setCreatingPayment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        
        <section className="relative pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-3xl p-12 shadow-soft border border-white/10">
              <div className="animate-pulse">
                <h1 className="text-3xl font-bold text-white mb-6">Loading...</h1>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    )
  }

      if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        
        <section className="relative pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-3xl p-12 shadow-soft border border-white/10">
              <h1 className="text-3xl font-bold text-white mb-6">Checkout Error</h1>
              <p className="text-text-muted mb-8">{error}</p>
              <Link 
                href="/shop"
                className="inline-block px-8 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    )
  }

  // If payment data exists, show Stripe checkout
  if (paymentData?.provider === "stripe") {
    const { clientSecret, orderId } = paymentData
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        
        {/* Background blur effects */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-gradient-to-br from-brand/25 via-purple-500/15 to-blue-500/20 rounded-full blur-blob"></div>
          <div className="absolute top-[20%] -right-[10%] w-[700px] h-[700px] bg-gradient-to-bl from-emerald-400/20 via-cyan-400/15 to-brand/25 rounded-full blur-blob"></div>
        </div>

        <section className="relative pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-6 md:px-8">
            {/* Order Summary */}
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/10 mb-8">
              <h1 className="text-3xl font-bold text-white mb-6">Complete Your Order</h1>
              
                  <div className="space-y-4 mb-6">
                    {/* Products List */}
                    {products.map((product, index) => (
                      <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-text-muted">Product:</span>
                          <span className="text-white font-medium">{product.name}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-text-muted">Quantity:</span>
                          <span className="text-white font-medium">{product.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-muted">Unit Price:</span>
                          <span className="text-white font-medium">{product.price_isk} ISK</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-text-muted">Subtotal:</span>
                          <span className="text-white font-medium">{product.price_isk * product.quantity} ISK</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-text-muted">Email:</span>
                      <span className="text-white font-medium">{email}</span>
                    </div>
                    
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">Total:</span>
                        <span className="text-brand font-bold text-xl">
                          {products.reduce((total, product) => total + (product.price_isk * product.quantity), 0)} ISK
                        </span>
                      </div>
                    </div>
                  </div>
              
              <p className="text-sm text-text-muted">
                Order ID: {orderId.slice(0, 8)}...
              </p>
            </div>

            {/* Payment Form */}
            <StripeCheckoutClient clientSecret={clientSecret} orderId={orderId} />
            
            {/* Account Creation Notice */}
            {!user && (
              <div className="mt-8 bg-brand/10 border border-brand/20 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Create an account to track your results</h3>
                    <p className="text-text-muted text-sm mb-4">
                      After your purchase, you'll need to create an account with this email ({email}) to access your test results and personalized insights.
                    </p>
                    <Link 
                      href="/signup"
                      className="inline-block px-4 py-2 bg-brand text-black text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Create Account Now
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        <Footer />
      </div>
    )
  }

  // Main checkout form
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      
      {/* Background blur effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-gradient-to-br from-brand/25 via-purple-500/15 to-blue-500/20 rounded-full blur-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[700px] h-[700px] bg-gradient-to-bl from-emerald-400/20 via-cyan-400/15 to-brand/25 rounded-full blur-blob"></div>
      </div>

      <section className="relative pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          {/* Order Summary */}
          <div className="bg-bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/10 mb-8">
                <h1 className="text-3xl font-bold text-white mb-6">{t('checkout_title') || 'Checkout'}</h1>
            
                <div className="space-y-4 mb-6">
                  {/* Products List */}
                  {products.map((product, index) => (
                    <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">{t('product') || 'Product'}:</span>
                        <span className="text-white font-medium">{product.name}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">{t('quantity') || 'Quantity'}:</span>
                        <span className="text-white font-medium">{product.quantity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                      <span className="text-text-muted">{t('unit_price') || 'Unit Price'}:</span>
                        <span className="text-white font-medium">{product.price_isk} ISK</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-text-muted">Subtotal:</span>
                        <span className="text-white font-medium">{product.price_isk * product.quantity} ISK</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">{t('total') || 'Total'}:</span>
                      <span className="text-brand font-bold text-xl">
                        {products.reduce((total, product) => total + (product.price_isk * product.quantity), 0)} ISK
                      </span>
                    </div>
                  </div>
                </div>
          </div>

          {/* Email Collection Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('contact_info') || 'Contact Information'}</h2>
            
            <form onSubmit={handleCreatePayment} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('email_address') || 'Email Address'}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  disabled={!!user?.email} // Disable if user is logged in
                />
                {user?.email && (
                  <p className="text-sm text-gray-600 mt-1">Using your account email</p>
                )}
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={creatingPayment || !email.trim()}
                className="w-full px-6 py-4 bg-brand text-black font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                    {creatingPayment ? (t('setting_up_payment') || 'Setting up payment...') : (t('continue_to_payment') || 'Continue to Payment')}
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}