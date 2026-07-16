import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/apis/auth'
import { usersApi } from '@/apis/users'
import { useAuth } from '@/lib/auth'
import type { UpdateProfilePayload } from '../types'

export function useProfile() {
  const queryClient = useQueryClient()
  const isLoggedIn = useAuth()

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
    enabled: isLoggedIn,
  })

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProfilePayload) => {
      const profileId = profileQuery.data!.profile.id
      return usersApi.update(Number(profileId), data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return { ...profileQuery, updateMutation }
}