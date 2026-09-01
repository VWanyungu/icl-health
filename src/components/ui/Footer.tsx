export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} ICL Health. All rights reserved.</p>
      </div>
    </footer>
  )
}

export { Footer }
