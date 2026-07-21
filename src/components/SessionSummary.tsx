import type { Answer } from "../types"

export function SessionSummary({ answers }: { answers: Answer[] }) {
  const evaluated = answers.filter((a) => a.is_evaluated)

  if (evaluated.length === 0) return null

  const strengths = evaluated.flatMap((a) => a.ai_strengths)
  const improvements = evaluated.flatMap((a) => a.ai_improvements)

  const scores = evaluated
    .map((a) => (a.ai_score !== null ? Number(a.ai_score) : null))
    .filter((s): s is number => s !== null)

  const avgScore =
    scores.length > 0 ? (scores.reduce((sum, s) => sum + s, 0) / scores.length).toFixed(1) : null

  return (
    <div className="border rounded p-4 bg-slate-50">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Session Summary</h2>
        {avgScore && <span className="text-sm font-medium">Avg score: {avgScore}/10</span>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-green-700 mb-1">Strengths</p>
          {strengths.length === 0 ? (
            <p className="text-sm text-gray-500">None recorded.</p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-1">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-green-600 mt-0.5">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-amber-700 mb-1">Improvements</p>
          {improvements.length === 0 ? (
            <p className="text-sm text-gray-500">None recorded.</p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-1">
              {improvements.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-600 mt-0.5">!</span>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}