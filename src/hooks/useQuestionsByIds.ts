import { useQueries } from '@tanstack/react-query'
import { questionsApi } from '@/apis/questions'

export function useQuestionsByIds(ids: number[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ['question', id],
      queryFn: () => questionsApi.get(id),
    })),
  })
}