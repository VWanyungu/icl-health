import { useState, useEffect, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext.tsx'
import AuthBrand from '../../components/auth/AuthBrand.tsx'
import GoogleButton from '../../components/auth/GoogleButton.tsx'
import hospitalImg from '../../assets/hospital-auth.jpg'
import {
  Check,
  Eye,
  EyeOff,
  AlertCircle,
  Activity,
  ShieldCheck,
} from 'lucide-react'

export default function SignUp() {
  const { isAuthenticated, isLoading, signup, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/patients', { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailPreferences, setEmailPreferences] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Password validation checks
  const isLengthValid = password.length >= 8 && password.length <= 72
  const hasNumber = /\d/.test(password)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please provide an email address.')
      return
    }
    if (!isLengthValid || !hasNumber) {
      setError('Password must be 8-72 characters long and contain at least one number.')
      return
    }

    try {
      setError(null)
      setLoading(true)
      await signup(email, password, { emailPreferences })
      navigate('/patients', { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      setError(null)
      await loginWithGoogle()
      navigate('/patients', { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed. Please try again.'
      setError(msg)
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-white text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* LEFT COLUMN: Hospital Image with Black Overlay & ICL Health Branding */}
      <div className="relative flex min-h-[360px] w-full flex-col justify-between overflow-hidden lg:min-h-screen lg:w-[48%] px-8 py-12 lg:px-14 lg:py-16">
        {/* Hospital Background Image */}
        <img
          src={hospitalImg}
          alt="ICL Health Medical Facility"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Black Gradient / Tint Overlay */}
        <div className="absolute inset-0 bg-black/65 bg-gradient-to-t from-black/90 via-black/60 to-black/50 backdrop-blur-[0.5px]" />

        {/* Top Branding */}
        <div className="relative z-10">
          <AuthBrand variant="dark" size="lg" />
        </div>

        {/* Center / Hero Branding Section */}
        <div className="relative z-10 my-auto py-8">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/20 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md mb-5">
            <Activity className="h-3.5 w-3.5 animate-pulse text-indigo-400" />
            <span>Next-Generation Healthcare Platform</span>
          </div> */}

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
            ICL Health
          </h1>

          <p className="mt-4 max-w-md text-sm text-gray-200 sm:text-base leading-relaxed">
            Assessment tool for modern medical teams, clinicians and patient care management.
          </p>
        </div>

        {/* Left Bottom Trust Statement */}
        <div className="relative z-10 flex items-center gap-2 text-xs font-medium text-gray-300">
          {/* <ShieldCheck className="h-4 w-4 text-indigo-400 shrink-0" /> */}
          <span>Assessment aid</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Sign Up Form (Image 2 Right Side) */}
      <div className="relative flex flex-1 flex-col justify-between px-6 py-10 sm:px-12 lg:px-16">
        {/* Top Right "Already have an account? Sign in ->" */}
        <div className="flex justify-end text-sm">
          <span className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
            >
              Sign in
            </Link>
          </span>
        </div>

        {/* Center Content */}
        <div className="mx-auto w-full max-w-[420px] py-8">
          {/* Header Title */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-indigo-600 sm:text-3xl">
              Sign up for ICL Health
            </h2>
          </div>

          {/* Google Sign In Button */}
          <GoogleButton onClick={handleGoogleSignup} disabled={loading} />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-500 font-medium">or</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-sm text-red-700 animate-fadeIn">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="signup-email" className="block text-xs font-semibold text-gray-800 mb-1.5">
                Email <span className="text-indigo-600">*</span>
              </label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-xs transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="signup-password" className="block text-xs font-semibold text-gray-800 mb-1.5">
                Password <span className="text-indigo-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-gray-900 shadow-xs transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
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

              {/* Password Helper Requirement Text */}
              <p className="mt-1.5 text-xs text-gray-500 leading-normal">
                Password must be 8-72 characters long and contain at least one number.
              </p>

              {/* Live validation feedback */}
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-3 text-2xs">
                  <span
                    className={`flex items-center gap-1 font-medium ${isLengthValid ? 'text-emerald-600' : 'text-gray-400'
                      }`}
                  >
                    <Check className="h-3 w-3" /> 8-72 chars
                  </span>
                  <span
                    className={`flex items-center gap-1 font-medium ${hasNumber ? 'text-emerald-600' : 'text-gray-400'
                      }`}
                  >
                    <Check className="h-3 w-3" /> At least 1 number
                  </span>
                </div>
              )}
            </div>

            {/* Email Preferences Checkbox */}
            {/* <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={emailPreferences}
                  onChange={(e) => setEmailPreferences(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-semibold text-gray-800 group-hover:text-gray-900 block">
                    Email preferences
                  </span>
                  <span className="text-gray-500 block mt-0.5 leading-normal">
                    Receive occasional system updates, clinical feature announcements, and healthcare roundups.
                  </span>
                </div>
              </label>
            </div> */}

            {/* Create Account Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center rounded-full border border-indigo-600/30 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-xs transition-all hover:bg-indigo-50 hover:border-indigo-600/50 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <span>Create account</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Disclaimer */}
        <div className="mx-auto max-w-[480px] pb-4 text-center text-2xs text-gray-400 leading-relaxed">
          <p>
            By creating an account, you agree to the{' '}
            <a href="#terms" className="text-gray-600 hover:text-indigo-600 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-gray-600 hover:text-indigo-600 underline">
              Privacy Policy
            </a>
            .
          </p>
          {/* <p className="mt-1">
            We process your personal data in accordance with our{' '}
            <a href="#privacy-statement" className="text-gray-600 hover:text-indigo-600 underline">
              Global Privacy Statement
            </a>
            .
          </p> */}
        </div>
      </div>
    </div>
  )
}
