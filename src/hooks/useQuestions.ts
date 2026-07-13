import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { questionsApi } from '@/apis/questions'
import type { Difficulty, QuestionType, Role } from '@/apis/questions'

export function useQuestions() {
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | ''>('')
  const [typeFilter, setTypeFilter] = useState<QuestionType | ''>('')
  const [roleFilter, setRoleFilter] = useState<Role | ''>('')

  const query = useQuery({
    queryKey: ['questions'],
    queryFn: questionsApi.list,
  })

  const filtered = query.data?.filter((q) => {
    if (difficultyFilter && q.difficulty !== difficultyFilter) return false
    if (typeFilter && q.question_type !== typeFilter) return false
    if (roleFilter && q.role !== roleFilter) return false
    return true
  })

  return {
    ...query,
    filtered,
    difficultyFilter,
    setDifficultyFilter,
    typeFilter,
    setTypeFilter,
    roleFilter,
    setRoleFilter,
  }
}