import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuestions } from '@/hooks/useQuestions'
import { useCreateSession } from '@/hooks/useCreateSession'
import { QuestionCard } from '@/components/QuestionCard'
import type { Difficulty, QuestionType, Role } from '@/apis/questions'

export const Route = createFileRoute('/questions')({ component: QuestionsPage })

const difficulties: Difficulty[] = ['easy', 'medium', 'hard']
const questionTypes: QuestionType[] = ['behavioral', 'technical', 'situational']
const roles: Role[] = ['software_developer', 'sales_manager', 'product_manager']

function QuestionsPage() {
  const {
    filtered,
    isLoading,
    isError,
    error,
    difficultyFilter,
    setDifficultyFilter,
    typeFilter,
    setTypeFilter,
    roleFilter,
    setRoleFilter,
  } = useQuestions()

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const createSession = useCreateSession()

  const toggleQuestion = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const selectedQuestions = filtered?.filter((q) => selectedIds.includes(q.id)) ?? []
  // Infer role from the first selected question, since sessions need one role
  const inferredRole = selectedQuestions[0]?.role ?? 'software_developer'

  const handleStart = () => {
    createSession.mutate({
      title: `Practice Session — ${new Date().toLocaleDateString()}`,
      role: inferredRole,
      question_ids: selectedIds,
    })
  }

  return (
    <div className="max-w-3xl mx-auto p-8 pb-24">
      <h1 className="text-2xl font-semibold mb-6">Question Bank</h1>

      <div className="flex gap-3 mb-6">
        <select
          className="border rounded p-2 text-sm"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | '')}
        >
          <option value="">All difficulties</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          className="border rounded p-2 text-sm"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as QuestionType | '')}
        >
          <option value="">All types</option>
          {questionTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          className="border rounded p-2 text-sm"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as Role | '')}
        >
          <option value="">All roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>{r.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {isLoading && <p>Loading questions...</p>}
      {isError && <p className="text-red-600">{error.message}</p>}

      {filtered && filtered.length === 0 && (
        <p className="text-gray-500">No questions match those filters.</p>
      )}

      <div className="flex flex-col gap-3">
        {filtered?.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            selectable
            selected={selectedIds.includes(question.id)}
            onToggle={() => toggleQuestion(question.id)}
          />
        ))}
      </div>

      {selectedIds.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between max-w-3xl mx-auto">
          <span className="text-sm text-gray-600">
            {selectedIds.length} question{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={handleStart}
            disabled={createSession.isPending}
            className="bg-blue-600 text-white rounded px-6 py-2 font-medium disabled:opacity-50"
          >
            {createSession.isPending ? 'Starting...' : 'Start Interview'}
          </button>
        </div>
      )}

      {createSession.isError && (
        <p className="text-red-600 text-sm mt-2">{createSession.error.message}</p>
      )}
    </div>
  )
}