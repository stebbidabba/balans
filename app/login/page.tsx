import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Balans',
  description: 'Sign in to your Balans account to access your hormone testing results and personalized health insights.',
}

export default function LoginPage() {
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
                src="/whitelogo.png" 
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

            {/* Login Form */}
            <form className="space-y-6">
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
                  defaultValue="samlee.mobbin@gmail.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    defaultValue="••••••••••••••••••"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all pr-12"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-left">
                <a 
                  href="/forgot-password" 
                  className="text-sm text-brand hover:text-brand/80 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign in
              </button>
            </form>

            {/* Bottom Links */}
            <div className="mt-8 pt-6 border-t border-gray-100">
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
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <img 
                src="/whitelogo.png" 
                alt="Balans" 
                className="h-6 w-auto"
              />
              <span className="text-lg font-medium">Balans</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
