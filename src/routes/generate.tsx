import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { questionsApi } from '@/apis/questions'
import { useProfile } from '@/hooks/useProfile'
import type { Difficulty, QuestionType } from '@/apis/questions'

export const Route = createFileRoute('/generate')({ component: GeneratePage })

const difficulties: Difficulty[] = ['easy', 'medium', 'hard']
const questionTypes: QuestionType[] = ['behavioral', 'technical', 'situational']

function GeneratePage() {
  const navigate = useNavigate()
  const { data: profile } = useProfile()

  const [role, setRole] = useState('')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [questionType, setQuestionType] = useState<QuestionType>('behavioral')

  // Pre-fill role from the user's target_role, once profile loads
  useEffect(() => {
    if (profile?.profile.target_role) {
      setRole(profile.profile.target_role)
    }
  }, [profile])

  const generateMutation = useMutation({
    mutationFn: questionsApi.generate,
    onSuccess: () => {
      navigate({ to: '/questions' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generateMutation.mutate({ role, topic, difficulty, question_type: questionType })
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-2">Generate a Question</h1>
      <p className="text-sm text-gray-600 mb-6">
        Get an AI-generated interview question tailored to your role and topic.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600 block mb-1">Role</label>
          <input
            className="border rounded p-2 w-full"
            placeholder="e.g. Junior Developer, UX Designer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Topic</label>
          <input
            className="border rounded p-2 w-full"
            placeholder="e.g. REST APIs, leadership, conflict resolution"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Difficulty</label>
          <select
            className="border rounded p-2 w-full"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Question type</label>
          <select
            className="border rounded p-2 w-full"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
          >
            {questionTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={generateMutation.isPending || !role.trim() || !topic.trim()}
          className="bg-blue-600 text-white rounded p-2 disabled:opacity-50"
        >
          {generateMutation.isPending ? 'Generating...' : 'Generate Question'}
        </button>

        {generateMutation.isError && (
          <p className="text-red-600 text-sm">{generateMutation.error.message}</p>
        )}
      </form>
    </div>
  )
}