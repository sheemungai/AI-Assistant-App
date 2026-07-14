import { createFileRoute } from '@tanstack/react-router'
import { useDashboard } from '@/hooks/useDashboard'
import { StatCard } from '@/components/StatCard'

export const Route = createFileRoute('/dashboard')({ component: DashboardPage })

function DashboardPage() {
  const { overview, byTopic, trend } = useDashboard()

  return (
    <div className="max-w-4xl mx-auto p-8 flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Overview */}
      <section>
        {overview.isLoading && <p>Loading overview...</p>}
        {overview.isError && <p className="text-red-600">{overview.error.message}</p>}
        {overview.data && (
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Completed Sessions" value={overview.data.total_sessions} />
            <StatCard label="Answers Given" value={overview.data.total_answers} />
            <StatCard label="Average Score" value={`${overview.data.average_score}/10`} />
          </div>
        )}
      </section>

      {/* By Topic */}
      <section>
        <h2 className="text-lg font-medium mb-3">Performance by Topic</h2>
        {byTopic.isLoading && <p>Loading...</p>}
        {byTopic.isError && <p className="text-red-600">{byTopic.error.message}</p>}
        {byTopic.data && byTopic.data.length === 0 && (
          <p className="text-gray-500 text-sm">No topic data yet — complete a session to see stats.</p>
        )}
        {byTopic.data && byTopic.data.length > 0 && (
          <div className="flex flex-col gap-2">
            {byTopic.data.map((t) => (
              <div key={t.topic} className="flex items-center gap-3">
                <span className="w-32 text-sm truncate">{t.topic}</span>
                <div className="flex-1 bg-gray-100 rounded h-4 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: `${(t.average_score / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-20 text-right">
                  {t.average_score.toFixed(1)}/10
                </span>
                <span className="text-xs text-gray-400 w-16 text-right">
                  {t.total_answers} answer{t.total_answers !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trend */}
      <section>
        <h2 className="text-lg font-medium mb-3">Session History</h2>
        {trend.isLoading && <p>Loading...</p>}
        {trend.isError && <p className="text-red-600">{trend.error.message}</p>}
        {trend.data && trend.data.length === 0 && (
          <p className="text-gray-500 text-sm">No completed sessions yet.</p>
        )}
        {trend.data && trend.data.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Title</th>
                <th className="py-2">Role</th>
                <th className="py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {trend.data.map((entry, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2">{entry.date}</td>
                  <td className="py-2">{entry.title}</td>
                  <td className="py-2">{entry.role.replace('_', ' ')}</td>
                  <td className="py-2 text-right">{entry.overall_score}/10</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}