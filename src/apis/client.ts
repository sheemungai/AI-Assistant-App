import { clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens } from '@/lib/auth'

const BASE_URL = import.meta.env.VITE_API_URL

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken()
  if (!refresh) return null

  const res = await fetch(`${BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })

  if (!res.ok) {
    clearAuthTokens()
    return null
  }

  const data = await res.json()
  setAuthTokens(data.access, data.refresh ?? refresh)
  return data.access
}

async function request<T>(endpoint: string, options: RequestInit = {}, retried = false): Promise<T> {
  const token = getAccessToken()

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (res.status === 401 && !retried) {
    const newToken = await refreshAccessToken()
    if (newToken) return request<T>(endpoint, options, true)
    clearAuthTokens()
    window.location.href = '/login'
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new ApiError(res.status, body?.error ?? body?.detail ?? res.statusText)
  }

  if (res.status === 204 || res.status === 205) return null as T
  return res.json()
}

export const client = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  put: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  patch: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
}