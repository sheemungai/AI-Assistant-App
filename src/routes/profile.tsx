import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useProfile } from '@/hooks/useProfile'
import type { ExperienceLevel, TargetRole } from '@/apis/users'

export const Route = createFileRoute('/profile')({ component: ProfilePage })

const experienceLevels: ExperienceLevel[] = ['entry', 'mid', 'senior']

function ProfilePage() {
  const { data, isLoading, isError, error, updateMutation } = useProfile()

  const [fullName, setFullName] = useState('')
  const [targetRole, setTargetRole] = useState<TargetRole | ''>('')
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | ''>('')

  useEffect(() => {
    if (data) {
      setFullName(String(data.profile.full_name))
      setTargetRole((data.profile.target_role as TargetRole | null) ?? '')
      setExperienceLevel(data.profile.experience_level ?? '')
    }
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate({
      full_name: fullName,
      target_role: targetRole || null,
      experience_level: experienceLevel || null,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-950 px-6 py-12 text-slate-50">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 backdrop-blur">
            Loading profile...
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-950 px-6 py-12 text-slate-50">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200 backdrop-blur">
            {error.message}
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 px-6 py-12 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.10),transparent_26%)]" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-8">
        <section className="flex flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Keep your interview profile up to date
          </div>

          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              My Profile
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Update your details so practice sessions and feedback stay aligned with your goals.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 ring-1 ring-inset ring-white/5 backdrop-blur">
            <h2 className="text-lg font-semibold text-slate-50">Account details</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Username</p>
                <p className="mt-1 text-slate-100">{data.username}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Email</p>
                <p className="mt-1 text-slate-100">{data.email}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 ring-1 ring-inset ring-white/5 backdrop-blur sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-50">Profile settings</h2>
              <p className="mt-2 text-sm text-slate-300">
                Set your name, target role, and experience level.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Full name
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Target role
                </label>
                <input
                  className="border rounded p-2 w-full"
                  placeholder="e.g. Junior Developer, UX Designer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value as TargetRole | '')}
                />      
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Experience level
                </label>
                <select
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel | '')}
                >
                  <option value="">Not set</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {updateMutation.isPending ? 'Saving...' : 'Save changes'}
              </button>

              {updateMutation.isError && (
                <p className="text-sm text-red-300">{updateMutation.error.message}</p>
              )}

              {updateMutation.isSuccess && (
                <p className="text-sm text-emerald-300">Saved successfully.</p>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}