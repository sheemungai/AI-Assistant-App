import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { interviewSessionApi } from '@/apis/interviews'
import type { CreateInterviewSessionPayload } from '#/types'

export function useCreateSession() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (payload: CreateInterviewSessionPayload) => {
      const session = await interviewSessionApi.create(payload)
      return interviewSessionApi.start(session.id)
    },
    onSuccess: (session) => {
      navigate({ to: '/sessions/$sessionId', params: { sessionId: String(session.id) } })
    },
  })
}