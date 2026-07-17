import { createFileRoute,  Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuestions } from '@/hooks/useQuestions'
import { useCreateSession } from '@/hooks/useCreateSession'
import { QuestionCard } from '@/components/QuestionCard'
import type { Difficulty, QuestionType } from '@/apis/questions'

export const Route = createFileRoute('/questions')({ component: QuestionsPage })

const difficulties: Difficulty[] = ['easy', 'medium', 'hard']
const questionTypes: QuestionType[] = ['behavioral', 'technical', 'situational']

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
  const inferredRole = selectedQuestions[0]?.role ?? 'software_developer'

  const handleStart = () => {
    createSession.mutate({
      title: `Practice Session — ${new Date().toLocaleDateString()}`,
      role: inferredRole,
      question_ids: selectedIds,
    })
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 px-6 py-12 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.10),transparent_26%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 pb-28">
        <section className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Build a practice session from curated interview questions
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Question Bank
              </h1>
              <Link to="/generate" className="text-sm text-yellow-400  underline">
                + Generate a new question
              </Link>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Filter by difficulty, question type, and role. Pick a set of questions and launch a focused interview session.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur">
              <span className="font-medium text-slate-50">{filtered?.length ?? 0}</span> questions available
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/25 ring-1 ring-inset ring-white/5 backdrop-blur sm:p-5">
          <div className="grid gap-3 md:grid-cols-3">
            <select
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | '')}
            >
              <option value="">All difficulties</option>
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as QuestionType | '')}
            >
              <option value="">All types</option>
              {questionTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <input
                   className="border rounded p-2 text-sm"
                   placeholder="Filter by role..."
                  value={roleFilter}
                   onChange={(e) => setRoleFilter(e.target.value)}
            />
          </div>
        </section>

        {isLoading && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 backdrop-blur">
            Loading questions...
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200 backdrop-blur">
            {error.message}
          </div>
        )}

        {!isLoading && !isError && filtered && filtered.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 backdrop-blur">
            No questions match those filters.
          </div>
        )}

        <div className="grid gap-4">
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

        {createSession.isError && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200 backdrop-blur">
            {createSession.error.message}
          </div>
        )}
      </div>

      {selectedIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/90 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <span className="text-sm text-slate-300">
              {selectedIds.length} question{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={handleStart}
              disabled={createSession.isPending}
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {createSession.isPending ? 'Starting...' : 'Start Interview'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}