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
  
  // Account fields
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  
  // Payment state
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
        let finalProducts: any[] = [];
        
        if (isFromCart) {
          // Load all cart items
          const fallbackProducts: any = {
            '1': {
              id: 1,
              name: 'hormone_test_kit',
              description: 'Complete hormone test kit',
              price_isk: 12900,
              quantity: cartState.items.find(item => item.id === '1')?.quantity || 0
            },
            '2': {
              id: 2,
              name: 'stress_test_kit',
              description: 'Stress hormone test kit',
              price_isk: 14400,
              quantity: cartState.items.find(item => item.id === '2')?.quantity || 0
            },
            '3': {
              id: 3,
              name: 'comprehensive_test_kit',
              description: 'Comprehensive hormone test kit',
              price_isk: 19900,
              quantity: cartState.items.find(item => item.id === '3')?.quantity || 0
            }
          }
          
          cartState.items.forEach(item => {
            const product = fallbackProducts[item.id]
            if (product && item.quantity > 0) {
              finalProducts.push({ ...product, quantity: item.quantity })
            }
          })
        } else {
          // Load single product
          const fallbackProducts: any = {
            '1': { id: 1, name: 'hormone_test_kit', description: 'Complete hormone test kit', price_isk: 12900 },
            '2': { id: 2, name: 'stress_test_kit', description: 'Stress hormone test kit', price_isk: 14400 },
            '3': { id: 3, name: 'comprehensive_test_kit', description: 'Comprehensive hormone test kit', price_isk: 19900 }
          }
          
          const product = fallbackProducts[String(productId)]
          if (product) {
            finalProducts = [{ ...product, quantity }]
          }
        }

        setProducts(finalProducts)
        setLoading(false)
      } catch (err) {
        console.error('Checkout initialization failed:', err)
        setError('Failed to load checkout')
        setLoading(false)
      }
    }

    initializeCheckout()
  }, [productId])

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!user && (!email.trim() || !fullName.trim() || !phone.trim() || !password.trim())) {
      setError('All fields are required')
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
        fullName: fullName.trim(),
        phone: phone.trim(),
        password: password.trim(),
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
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-center">
            <h1 className="text-2xl font-semibold text-white mb-4">Loading checkout...</h1>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white mb-4">Checkout Error</h1>
            <p className="text-text-muted mb-6">{error}</p>
            <Link href="/shop" className="px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Payment</h1>
              <p className="text-gray-600">Add your payment method details below</p>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500">
                Order ID: {paymentData.orderId.slice(0, 8)}...
              </p>
            </div>

            <StripeCheckoutClient 
              clientSecret={paymentData.clientSecret} 
              orderId={paymentData.orderId}
              email={email}
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Calculate total
  const subtotal = products.reduce((total, product) => total + (product.price_isk * product.quantity), 0)
  const tax = 0 // No tax for now
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Payment Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Payment</h1>
              <p className="text-gray-600">Add your payment method details below</p>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <button className="flex-1 p-3 border-2 border-blue-500 bg-blue-50 rounded-xl flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v12h16V6H4zm2 2h12v2H6V8zm0 4h8v2H6v-2z"/>
                  </svg>
                  <span className="font-medium text-blue-600">Card</span>
                </button>
                <button className="flex-1 p-3 border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:border-gray-400 transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-gray-700">Google Pay</span>
                </button>
              </div>
            </div>

            {/* Account Creation Form (only for non-logged-in users) */}
            {!user && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Account</h2>
                <form onSubmit={handleCreatePayment} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+354 123 4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={creatingPayment}
                    className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {creatingPayment ? 'Creating Account...' : 'Create Account & Continue to Payment'}
                  </button>
                </form>
              </div>
            )}

            {/* Payment Form (for logged-in users) */}
            {user && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h2>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Email: {user.email}</p>
                    <p className="text-sm text-gray-600">Using your account information</p>
                  </div>
                </div>

                <form onSubmit={handleCreatePayment}>
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={creatingPayment}
                    className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {creatingPayment ? 'Setting up payment...' : 'Continue to Payment'}
                  </button>
                </form>
              </div>
            )}

            {/* Terms */}
            <div className="mt-6 text-sm text-gray-600">
              <p>By creating an account, you agree to our{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {products.map((product) => (
                <div key={product.id} className="flex justify-between items-center py-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</h3>
                    <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                  </div>
                  <span className="font-medium text-gray-900">{product.price_isk * product.quantity} ISK</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">{subtotal} ISK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax:</span>
                <span className="text-gray-900">{tax} ISK</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                <span>Total:</span>
                <span>{total} ISK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}