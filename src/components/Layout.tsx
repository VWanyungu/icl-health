import type { ReactNode } from 'react'
import { Outlet } from 'react-router'
import Navbar from './ui/Navbar.tsx'
import Footer from './ui/Footer.tsx'

export interface LayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <main className="flex-1">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  )
}

export { Layout }
