'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    })
    
    setLoading(false)
    
    if (error) {
      setError(error.message)
    } else {
      router.push('/account')
    }
  }

  const handleMagicLink = async () => {
    if (!email) {
      setError('Please enter your email first')
      return
    }
    
    setLoading(true)
    setError('')
    
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    
    setLoading(false)
    
    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for a magic link!')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background blur effects */}
      <div className="fixed inset-0 -z-10">
        {/* Large gradient blobs for continuous background */}
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-gradient-to-br from-brand/30 via-purple-500/20 to-blue-500/25 rounded-full blur-blob"></div>
        <div className="absolute top-[10%] -right-[15%] w-[900px] h-[900px] bg-gradient-to-bl from-emerald-400/25 via-cyan-400/20 to-brand/30 rounded-full blur-blob"></div>
        <div className="absolute top-[40%] left-[5%] w-[700px] h-[700px] bg-gradient-to-tr from-purple-400/20 via-pink-400/15 to-brand/25 rounded-full blur-blob"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-gradient-to-tl from-blue-400/25 via-brand/20 to-emerald-400/20 rounded-full blur-blob"></div>
        <div className="absolute bottom-[30%] -left-[5%] w-[750px] h-[750px] bg-gradient-to-tr from-cyan-400/20 via-brand/25 to-purple-400/20 rounded-full blur-blob"></div>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <a href="/" className="inline-block hover:opacity-80 transition-opacity">
              <img 
                src="/whitelogo4x_v2.png" 
                alt="Balans" 
                className="h-12 w-auto mx-auto"
              />
            </a>
          </div>

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Welcome Back Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Welcome back
              </h1>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {message}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                />
              </div>

              {/* Log In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Log in'}
              </button>
            </form>

            {/* Magic Link Option */}
            <div className="mt-4">
              <button
                onClick={handleMagicLink}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send magic link'}
              </button>
            </div>

            {/* Sign Up Button */}
            <div className="mt-4">
              <a
                href="/signup"
                className="w-full block text-center bg-brand hover:bg-brand/90 text-black font-medium py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign up
              </a>
            </div>

            {/* Go Back Button */}
            <div className="mt-6">
              <a
                href="/"
                className="w-full block text-center text-gray-600 hover:text-brand font-medium py-3 transition-colors"
              >
                ← Go back
              </a>
            </div>

            {/* Bottom Links */}
            <div className="mt-4 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <a href="/help" className="hover:text-brand transition-colors">
                  Need Help? Talk To Us
                </a>
                <span className="text-gray-300">•</span>
                <a href="/terms" className="hover:text-brand transition-colors">
                  Terms of Use
                </a>
                <span className="text-gray-300">•</span>
                <a href="/privacy" className="hover:text-brand transition-colors">
                  Privacy Policy
                </a>
              </div>
              <div className="text-center mt-4">
                <a href="/data-privacy" className="text-sm text-gray-600 hover:text-brand transition-colors">
                  Do not sell or share my personal information
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Branding */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center">
              <img 
                src="/whitelogo4x_v2.png" 
                alt="Balans" 
                className="h-6 w-auto opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}