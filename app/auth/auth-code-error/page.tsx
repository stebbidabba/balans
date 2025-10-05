export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-2">
          Sorry, we couldn't verify your email. The link may be expired or invalid.
        </p>
        <p className="text-gray-600 mb-6">You can create your account below — we'll send a fresh email.</p>
        <div className="space-x-4">
          <a
            href="/signup"
            className="inline-block px-6 py-3 bg-brand text-black font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Go to Sign Up
          </a>
          <a
            href="/"
            className="inline-block px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  )
}




