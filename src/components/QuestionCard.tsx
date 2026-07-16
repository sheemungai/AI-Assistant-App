import type { Question } from '#/types'
import type { Difficulty } from '@/apis/questions'

interface QuestionCardProps {
  question: Question
  selectable?: boolean
  selected?: boolean
  onToggle?: () => void
}

export function QuestionCard({ question, selectable, selected, onToggle }: QuestionCardProps) {
  return (
    <div
      className={`group rounded-2xl border p-5 transition-all duration-200 ${
        selectable ? 'cursor-pointer' : ''
      } ${
        selected
          ? 'border-cyan-300/40 bg-cyan-400/10 ring-1 ring-inset ring-cyan-300/20'
          : 'border-white/10 bg-white/5 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/8'
      } shadow-lg shadow-black/20 backdrop-blur`}
      onClick={selectable ? onToggle : undefined}
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {selectable && (
            <input
              type="checkbox"
              checked={!!selected}
              onChange={onToggle}
              onClick={(e) => e.stopPropagation()}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-400 accent-cyan-400"
            />
          )}
          <div>
            <h3 className="text-base font-semibold text-slate-50">{question.title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-300">{question.description}</p>
          </div>
        </div>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-slate-300">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
          {question.topic}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
          {question.question_type}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
          {question.role.replace('_', ' ')}
        </span>
      </div>
    </div>
  )
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const colors: Record<Difficulty, string> = {
    easy: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
    medium: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
    hard: 'border-rose-400/20 bg-rose-400/10 text-rose-200',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${colors[difficulty]}`}
    >
      {difficulty}
    </span>
  )
}