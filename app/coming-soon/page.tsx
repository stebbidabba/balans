export default function ComingSoon() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-50 text-gray-900 p-6">
      <div className="max-w-xl w-full text-center">
        <div className="mb-8 flex items-center justify-center">
          <img
            src="/logo4x.png"
            alt="Balans logo"
            className="h-12 w-auto opacity-80"
          />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight mb-3">Coming Soon</h1>
        <p className="text-gray-600 mb-8">
          Were preparing something great. Please check back shortly.
        </p>
        <div className="text-sm text-gray-500">© {new Date().getFullYear()} Balans</div>
      </div>
    </main>
  );
}


