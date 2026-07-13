import { useQuery } from '@tanstack/react-query'
import { interviewSessionApi } from '@/apis/interviews'

export function useSession(sessionId: number) {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => interviewSessionApi.get(sessionId),
    refetchInterval: (query) => {
      const data = query.state.data
      if (!data) return false
      const hasPendingEvaluation = data.answers.some((a) => !a.is_evaluated)
      return hasPendingEvaluation ? 2000 : false // poll every 2s while anything's still evaluating
    },
  })
}