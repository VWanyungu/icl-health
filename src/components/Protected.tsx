import { type ReactNode } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext.tsx'
import { Activity } from 'lucide-react'

export interface ProtectedProps {
  children?: ReactNode
}

export default function Protected({ children }: ProtectedProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-600 animate-pulse">
            <Activity className="h-8 w-8 animate-spin" />
          </div>
          <div className="text-center">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">ICL Health</h3>
            <p className="text-sm text-gray-500">Checking authentication session...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export { Protected }
