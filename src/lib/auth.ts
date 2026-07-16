// src/lib/auth.ts
import { useSyncExternalStore } from 'react'

type Listener = () => void

const listeners = new Set<Listener>()

function emitAuthChange() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getAccessToken() {
  return localStorage.getItem('access_token')
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}

export function isLoggedIn() {
  return !!getAccessToken()
}

export function setAuthTokens(access: string, refresh: string) {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
  emitAuthChange()
}

export function clearAuthTokens() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  emitAuthChange()
}

export function useAuth() {
  return useSyncExternalStore(subscribe, isLoggedIn, isLoggedIn)
}