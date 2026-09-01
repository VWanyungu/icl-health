import { useState, useEffect, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuth } from '../../context/AuthContext.tsx'
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function Login() {
  const { isAuthenticated, isLoading, login, loginWithGoogle, forgotPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/patients'

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate, from])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null)
  const [forgotLoading, setForgotLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      setError('Please enter both email and password.')
      return
    }

    try {
      setError(null)
      setLoading(true)
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setError(null)
      await loginWithGoogle()
      navigate(from, { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed. Please try again.'
      setError(msg)
    }
  }

  const handleForgotSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!forgotEmail.trim()) return
    try {
      setForgotLoading(true)
      const res = await forgotPassword(forgotEmail)
      setForgotSuccess(res.message)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email.')
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top spacing / Brand center */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[420px]">
          {/* Logo Header */}
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-2.5 group transition-transform active:scale-95">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-indigo-600 font-black tracking-tight text-lg`}
                  >
                    ICL
                  </span>
                  <span
                    className={`text-indigo-600 font-semibold tracking-tight text-lg
                `}
                  >
                    Health
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-sm text-red-700 animate-fadeIn">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@iclhealth.com"
                className="w-full border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-xs transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email)
                    setForgotSuccess(null)
                    setForgotModalOpen(true)
                  }}
                  className="text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-gray-900 shadow-xs transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center border border-indigo-600/30 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-xs transition-all hover:bg-indigo-50 hover:border-indigo-600/50 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin border-2 border-indigo-600 border-t-transparent" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-500 font-medium">or</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-3 border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-xs transition-all hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {loading && (
              <div className="h-4 w-4 animate-spin border-2 border-indigo-600 border-t-transparent" />
            )}

            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          {/* Sign up prompt */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <span>New to ICL Health? </span>
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
            >
              Create an account.
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="w-full py-6 text-center text-xs text-gray-400">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4">
          <a href="#terms" className="hover:text-gray-600 transition-colors">
            Terms
          </a>
          <a href="#privacy" className="hover:text-gray-600 transition-colors">
            Privacy
          </a>
          <a href="#support" className="hover:text-gray-600 transition-colors">
            Contact Support
          </a>
          <a href="#cookies" className="hover:text-gray-600 transition-colors">
            Manage cookies
          </a>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white p-6 shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Reset your password</h3>
            <p className="text-xs text-gray-600 mb-4">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            {forgotSuccess ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{forgotSuccess}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="w-full rounded-full bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="doctor@iclhealth.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="rounded-full px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-60 transition-colors cursor-pointer"
                  >
                    {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
