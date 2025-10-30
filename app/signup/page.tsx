'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SignUpPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  // Pre-fill email from URL params if available
  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          full_name: fullName,
          date_of_birth: dateOfBirth,
          gender: gender,
          phone: phone
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    setLoading(false)
    
    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email to confirm your account!')
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
                src="/whitelogo4x.png" 
                alt="Balans" 
                className="h-12 w-auto mx-auto"
              />
            </a>
          </div>

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Create Account Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Create account
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

            {/* Sign Up Form */}
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
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
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                />
              </div>

              {/* Date of Birth Field */}
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                />
              </div>

              {/* Gender Field */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                />
              </div>


              {/* Terms and Privacy */}
              <div className="text-sm text-gray-600">
                By creating an account, you agree to our{' '}
                <a href="/terms" className="text-brand hover:text-brand/80 transition-colors">
                  Terms of Use
                </a>
                {' '}and{' '}
                <a href="/privacy" className="text-brand hover:text-brand/80 transition-colors">
                  Privacy Policy
                </a>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>

            {/* Log In Button */}
            <div className="mt-4">
              <a
                href="/login"
                className="w-full block text-center bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200"
              >
                Log in
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
                src="/whitelogo4x.png" 
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