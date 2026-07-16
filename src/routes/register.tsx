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
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 px-6 py-14 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.12),transparent_28%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Create your account
            </div>

            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Build your interview prep workspace in a few minutes.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Sign up to practice real questions, get AI feedback, and track your improvement over time.
            </p>

            <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm font-medium text-slate-50">Quick setup</p>
                <p className="mt-1 text-sm text-slate-300">Create your account and start immediately.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm font-medium text-slate-50">AI feedback</p>
                <p className="mt-1 text-sm text-slate-300">Get strengths and improvement tips.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm font-medium text-slate-50">Progress tracking</p>
                <p className="mt-1 text-sm text-slate-300">Keep a clear record of your growth.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 ring-1 ring-inset ring-white/5 backdrop-blur sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-50">Sign up</h2>
              <p className="mt-2 text-sm text-slate-300">
                Fill in your details to create a new account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Full name
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Username
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Email
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Confirm password
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
                  type="password"
                  placeholder="Confirm your password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>

              {passwordsMismatch && (
                <p className="text-sm text-red-300">Passwords do not match.</p>
              )}

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
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
                <p className="text-sm text-red-300">{registerMutation.error.message}</p>
              )}
            </form>

            <p className="mt-6 text-sm text-slate-300">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}