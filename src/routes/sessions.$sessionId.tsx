import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from '@/hooks/useSession'
import { useQuestionsByIds } from '@/hooks/useQuestionsByIds'
import { AnswerForm } from '@/components/AnswerForm'
import { interviewSessionApi } from '@/apis/interviews'

export const Route = createFileRoute('/sessions/$sessionId')({
  component: SessionPage,
})

function SessionPage() {
  const { sessionId } = Route.useParams()
  const id = Number(sessionId)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: session, isLoading, isError, error } = useSession(id)
  const questionQueries = useQuestionsByIds(session?.questions ?? [])

  const completeMutation = useMutation({
    mutationFn: () => interviewSessionApi.complete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] })
      navigate({ to: '/dashboard' })
    },
  })

  if (isLoading) return <p className="p-8">Loading session...</p>
  if (isError) return <p className="p-8 text-red-600">{error.message}</p>
  if (!session) return null

  const allAnswered =
    session.questions.length > 0 &&
    session.questions.every((qid) => session.answers.some((a) => a.question === qid))

  return (
    <div className="max-w-2xl mx-auto p-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{session.title}</h1>
        <span className="text-xs bg-gray-100 rounded px-2 py-1">{session.status}</span>
      </div>

      {session.overall_score && (
        <p className="text-sm font-medium">Overall score: {session.overall_score}/10</p>
      )}

      {questionQueries.map((q) => {
        if (!q.data) return null
        const existingAnswer = session.answers.find((a) => a.question === q.data.id)
        return (
          <AnswerForm
            key={q.data.id}
            sessionId={id}
            question={q.data}
            existingAnswer={existingAnswer}
          />
        )
      })}

      {session.status === 'in_progress' && allAnswered && (
        <button
          onClick={() => completeMutation.mutate()}
          disabled={completeMutation.isPending}
          className="bg-green-600 text-white rounded px-6 py-3 font-medium disabled:opacity-50"
        >
          {completeMutation.isPending ? 'Completing...' : 'Complete Session'}
        </button>
      )}
    </div>
  )
}