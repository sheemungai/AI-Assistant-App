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
      className={`border rounded p-4 ${selectable ? 'cursor-pointer' : ''} ${
        selected ? 'border-blue-500 bg-blue-50' : ''
      }`}
      onClick={selectable ? onToggle : undefined}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {selectable && (
            <input
              type="checkbox"
              checked={!!selected}
              onChange={onToggle}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <h3 className="font-medium">{question.title}</h3>
        </div>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>
      <p className="text-sm text-gray-600 mb-2">{question.description}</p>
      <div className="flex gap-2 text-xs text-gray-500">
        <span className="bg-gray-100 rounded px-2 py-0.5">{question.topic}</span>
        <span className="bg-gray-100 rounded px-2 py-0.5">{question.question_type}</span>
        <span className="bg-gray-100 rounded px-2 py-0.5">{question.role.replace('_', ' ')}</span>
      </div>
    </div>
  )
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const colors: Record<Difficulty, string> = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`text-xs rounded px-2 py-0.5 font-medium ${colors[difficulty]}`}>
      {difficulty}
    </span>
  )
}