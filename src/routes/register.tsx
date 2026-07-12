import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { authApi } from '@/apis/auth'

export const Route = createFileRoute('/register')({ component: RegisterPage })

function RegisterPage() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      navigate({ to: '/' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    registerMutation.mutate({ full_name: fullName, username, email, password, password2 })
  }

  const passwordsMismatch = password2.length > 0 && password !== password2

  return (
    <div className="flex flex-col gap-4 p-8 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold">Sign up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border rounded p-2"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="border rounded p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border rounded p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border rounded p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border rounded p-2"
          type="password"
          placeholder="Confirm password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        {passwordsMismatch && (
          <p className="text-red-600 text-sm">Passwords don't match.</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 disabled:opacity-50"
          disabled={
            registerMutation.isPending ||
            !fullName ||
            !username ||
            !email ||
            !password ||
            passwordsMismatch
          }
        >
          {registerMutation.isPending ? 'Signing up...' : 'Sign up'}
        </button>
        {registerMutation.isError && (
          <p className="text-red-600 text-sm">{registerMutation.error.message}</p>
        )}
      </form>

      <p className="text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Log in
        </Link>
      </p>
    </div>
  )
}