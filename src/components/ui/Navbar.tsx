import { Link } from 'react-router'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
            ICL Health
          </Link>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Link to="/patients" className="transition hover:text-indigo-600 dark:hover:text-indigo-400">
            Patients
          </Link>
          <Link to="/patient-registration" className="transition hover:text-indigo-600 dark:hover:text-indigo-400">
            Registration
          </Link>
        </nav>
      </div>
    </header>
  )
}

export { Navbar }
