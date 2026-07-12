import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { authApi } from '@/apis/auth'

export const Route = createFileRoute('/login')({ component: LoginPage })

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      navigate({ to: '/' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate({ username, password })
  }

  return (
    <div className="flex flex-col gap-4 p-8 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold">Log in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border rounded p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border rounded p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 disabled:opacity-50"
          disabled={loginMutation.isPending || !username || !password}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Log in'}
        </button>
        {loginMutation.isError && (
          <p className="text-red-600 text-sm">{loginMutation.error.message}</p>
        )}
      </form>

      <p className="text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}