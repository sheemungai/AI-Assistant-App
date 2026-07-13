import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { authApi } from '@/apis/auth'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/questions', label: 'Questions' },
  // { to: '/dashboard', label: 'Dashboard' },

] as const

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('access_token'),
  )

  const handleLogout = async () => {
    await authApi.logout()
    setIsLoggedIn(false)
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-gray-800">
      <Link to="/" className="font-semibold text-lg text-white">
        AI Interview Assistant
      </Link>

      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            // from = "/"
            to={link.to}
            className="text-sm text-white font-medium hover:text-gray-300"
            activeProps={{ className: 'text-sm text-black font-medium' }}
          >
            {link.label}
          </Link>
        ))}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-sm text-blue-600 hover:text-blue-800">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}