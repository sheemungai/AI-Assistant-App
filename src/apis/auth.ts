import type { AuthResponse, LoginPayload, AccountProfile, RegisterPayload } from '../types'
import { client } from './client'
import { clearAuthTokens, setAuthTokens } from '@/lib/auth'

const BASE = '/accounts'

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const data = await client.post<AuthResponse>(`${BASE}/register/`, payload)
    setAuthTokens(data.access, data.refresh)
    return data
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const data = await client.post<AuthResponse>(`${BASE}/login/`, payload)
    setAuthTokens(data.access, data.refresh)
    return data
  },

  logout: async (): Promise<void> => {
    const refresh = localStorage.getItem('refresh_token')
    if (refresh) {
      await client.post(`${BASE}/logout/`, { refresh }).catch(() => {})
    }
    clearAuthTokens()
  },

  getProfile: () => client.get<AccountProfile>(`${BASE}/profile/`),
}