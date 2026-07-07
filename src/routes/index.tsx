import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { authApi } from '@/apis/auth'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('access_token'),
  )

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => setIsLoggedIn(true),
  })

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
    enabled: isLoggedIn, // only fires once logged in
  })

  return (
    <div className="flex flex-col gap-4 p-8 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold">Backend Connection Test</h1>

      {!isLoggedIn ? (
        <>
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
            className="bg-blue-600 text-white rounded p-2 disabled:opacity-50"
            onClick={() => loginMutation.mutate({ username, password })}
            disabled={loginMutation.isPending || !username || !password}
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
          {loginMutation.isError && (
            <p className="text-red-600 text-sm">{loginMutation.error.message}</p>
          )}
        </>
      ) : (
        <div className="border rounded p-4 space-y-2">
          <p className="text-green-700 font-medium">✅ Logged in</p>

          {profileQuery.isLoading && <p>Loading profile...</p>}

          {profileQuery.isError && (
            <p className="text-red-600 text-sm">
              Profile error: {profileQuery.error.message}
            </p>
          )}

          {profileQuery.isSuccess && (
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(profileQuery.data, null, 2)}
            </pre>
          )}

          <button
            className="text-sm text-red-600 underline"
            onClick={() => {
              authApi.logout()
              setIsLoggedIn(false)
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}