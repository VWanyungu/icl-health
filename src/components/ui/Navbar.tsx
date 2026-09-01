import { Link, NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext.tsx'
import { Activity, LogOut, User as UserIcon } from 'lucide-react'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex h-16 items-center border-b-2 px-1 text-sm font-medium transition-colors ${isActive
      ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
      : 'border-transparent text-gray-600 hover:text-indigo-600'
    }`

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 text-black backdrop-blur-md px-4 sm:px-8 md:px-52">
      <div className="mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-indigo-600">
            {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Activity className="h-5 w-5" />
            </div> */}
            <span>ICL Health</span>
          </Link>

          {isAuthenticated && (
            <nav className="hidden sm:flex items-center gap-6">
              <NavLink to="/patients" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/patient-registration" className={navLinkClass}>
                New Patient
              </NavLink>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleLogout}
            title="Sign out"
            className="flex items-center gap-1.5 border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-gray-900">{user.name}</span>
                <span className="text-2xs text-gray-500">{user.role || user.email}</span>
              </div>


              {/* {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full border border-indigo-200 object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs border border-indigo-200">
                  {user.name.charAt(0) || <UserIcon className="h-4 w-4" />}
                </div>
              )} */}

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs border border-indigo-200">
                {user.name.charAt(0) || <UserIcon className="h-4 w-4" />}
              </div>

            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-full border border-indigo-600/30 px-4 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export { Navbar }

