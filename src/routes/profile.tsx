import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile'
import type { TargetRole, ExperienceLevel } from '@/apis/users'

export const Route = createFileRoute('/profile')({ component: ProfilePage })

const targetRoles: TargetRole[] = ['software_developer', 'sales_manager', 'product_manager']
const experienceLevels: ExperienceLevel[] = ['entry', 'mid', 'senior']

function ProfilePage() {
  const { data, isLoading, isError, error, updateMutation } = useProfile()

  const [fullName, setFullName] = useState('')
  const [targetRole, setTargetRole] = useState<TargetRole | ''>('')
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | ''>('')

  // Sync form fields once profile data loads
  useEffect(() => {
    if (data) {
      setFullName(String(data.profile.full_name ?? ''))
      setTargetRole((data.profile.target_role ?? '') as TargetRole | '')
      setExperienceLevel((data.profile.experience_level ?? '') as ExperienceLevel | '')
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

  if (isLoading) return <p className="p-8">Loading profile...</p>
  if (isError) return <p className="p-8 text-red-600">{error.message}</p>
  if (!data) return null

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="mb-6 text-sm text-gray-500">
        <p>Username: {data.username}</p>
        <p>Email: {data.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600 block mb-1">Full name</label>
          <input
            className="border rounded p-2 w-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Target role</label>
          <select
            className="border rounded p-2 w-full"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value as TargetRole | '')}
          >
            <option value="">Not set</option>
            {targetRoles.map((r) => (
              <option key={r} value={r}>{r.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Experience level</label>
          <select
            className="border rounded p-2 w-full"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel | '')}
          >
            <option value="">Not set</option>
            {experienceLevels.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-blue-600 text-white rounded p-2 disabled:opacity-50"
        >
          {updateMutation.isPending ? 'Saving...' : 'Save changes'}
        </button>

        {updateMutation.isError && (
          <p className="text-red-600 text-sm">{updateMutation.error.message}</p>
        )}
        {updateMutation.isSuccess && (
          <p className="text-green-700 text-sm">Saved!</p>
        )}
      </form>
    </div>
  )
}