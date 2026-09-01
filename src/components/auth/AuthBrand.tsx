import { Activity } from 'lucide-react'
import { Link } from 'react-router'

interface AuthBrandProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export default function AuthBrand({ variant = 'light', size = 'lg' }: AuthBrandProps) {
  const isDark = variant === 'dark'

  return (
    <Link to="/" className="inline-flex items-center gap-2.5 group transition-transform active:scale-95">
      {/* <div
        className={`flex items-center justify-center rounded-xl transition-colors ${
          size === 'lg' ? 'h-10 w-10' : size === 'md' ? 'h-8 w-8' : 'h-7 w-7'
        } ${
          isDark
            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
            : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
        }`}
      >
        <Activity
          className={`${
            size === 'lg' ? 'h-6 w-6' : size === 'md' ? 'h-5 w-5' : 'h-4 w-4'
          } text-indigo-600 dark:text-indigo-400 transition-transform group-hover:scale-110`}
        />
      </div> */}
      <div className="flex items-baseline gap-1">
        <span
          className={`font-black tracking-tight ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'
            } ${isDark ? 'text-white' : 'text-indigo-600'}`}
        >
          ICL
        </span>
        <span
          className={`font-semibold tracking-tight ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'
            } ${isDark ? 'text-indigo-300' : 'text-gray-900'}`}
        >
          Health
        </span>
      </div>
    </Link>
  )
}

export { AuthBrand }
