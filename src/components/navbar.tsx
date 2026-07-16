import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { authApi } from '@/apis/auth'
import { useAuth } from '@/lib/auth'

type NavLink = {
  to: '/' | '/questions' | '/dashboard'
  label: string
}

const navLinks: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/questions', label: 'Questions' },
  { to: '/dashboard', label: 'Dashboard' },
]

function getDisplayName(profile?: { profile?: { full_name?: string }; username?: string }) {
  return profile?.profile?.full_name || profile?.username || 'Profile'
}

export function Navbar() {
  const isLoggedIn = useAuth()

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
    enabled: isLoggedIn,
  })

  const handleLogout = async () => {
    await authApi.logout()
  }

  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <Link to="/" className="text-lg font-semibold tracking-tight text-gray-900">
        AI Interview Assistant
      </Link>

      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            activeProps={{ className: 'text-sm font-medium text-gray-900' }}
          >
            {link.label}
          </Link>
        ))}

        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
            >
              {getDisplayName(profileQuery.data)}
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 transition-colors hover:text-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}