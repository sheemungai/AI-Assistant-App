import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/apis/auth'
import { usersApi } from '@/apis/users'
import type { UpdateProfilePayload } from '../types'

export function useProfile() {
  const queryClient = useQueryClient()

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
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