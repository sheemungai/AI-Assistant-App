import { createFileRoute } from '@tanstack/react-router'
import { useDashboard } from '@/hooks/useDashboard'
import { StatCard } from '@/components/StatCard'

export const Route = createFileRoute('/dashboard')({ component: DashboardPage })

function DashboardPage() {
  const { overview, byTopic, trend } = useDashboard()

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 px-6 py-12 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.10),transparent_26%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 pb-8">
        <section className="flex flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Your interview progress at a glance
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Dashboard
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Review completed sessions, inspect topic performance, and track
              how your interview practice is improving over time.
            </p>
          </div>
        </section>

        <section>
          {overview.isLoading && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 backdrop-blur">
              Loading overview...
            </div>
          )}

          {overview.isError && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200 backdrop-blur">
              {overview.error.message}
            </div>
          )}

          {overview.data && (
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard label="Completed Sessions" value={overview.data.total_sessions} />
              <StatCard label="Answers Given" value={overview.data.total_answers} />
              <StatCard label="Average Score" value={`${overview.data.average_score}/10`} />
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 ring-1 ring-inset ring-white/5 backdrop-blur">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50">Performance by Topic</h2>
              <p className="mt-1 text-sm text-slate-300">
                See which topics are strongest and where to focus next.
              </p>
            </div>
          </div>

          {byTopic.isLoading && (
            <div className="text-sm text-slate-300">Loading...</div>
          )}

          {byTopic.isError && (
            <div className="text-sm text-red-300">{byTopic.error.message}</div>
          )}

          {byTopic.data && byTopic.data.length === 0 && (
            <p className="text-sm text-slate-400">
              No topic data yet — complete a session to see stats.
            </p>
          )}

          {byTopic.data && byTopic.data.length > 0 && (
            <div className="flex flex-col gap-4">
              {byTopic.data.map((topic) => (
                <div
                  key={topic.topic}
                  className="grid items-center gap-3 md:grid-cols-[10rem_minmax(0,1fr)_5rem_5.5rem]"
                >
                  <span className="truncate text-sm font-medium text-slate-200">
                    {topic.topic}
                  </span>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-900/80 ring-1 ring-inset ring-white/10">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-cyan-400 to-sky-500 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                      style={{ width: `${(topic.average_score / 10) * 100}%` }}
                    />
                  </div>

                  <span className="text-right text-sm font-medium text-slate-200">
                    {topic.average_score.toFixed(1)}/10
                  </span>

                  <span className="text-right text-xs text-slate-400">
                    {topic.total_answers} answer{topic.total_answers !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 ring-1 ring-inset ring-white/5 backdrop-blur">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-50">Session History</h2>
            <p className="mt-1 text-sm text-slate-300">
              Review recent sessions and track score trends.
            </p>
          </div>

          {trend.isLoading && <div className="text-sm text-slate-300">Loading...</div>}

          {trend.isError && (
            <div className="text-sm text-red-300">{trend.error.message}</div>
          )}

          {trend.data && trend.data.length === 0 && (
            <p className="text-sm text-slate-400">No completed sessions yet.</p>
          )}

          {trend.data && trend.data.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-slate-900/70 text-left text-slate-300">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 text-right font-medium">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-white/5">
                  {trend.data.map((entry, index) => (
                    <tr key={index} className="transition-colors hover:bg-white/5">
                      <td className="px-4 py-3 text-slate-300">{entry.date}</td>
                      <td className="px-4 py-3 text-slate-100">{entry.title}</td>
                      <td className="px-4 py-3 text-slate-300">
                        {entry.role.replace('_', ' ')}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-cyan-200">
                        {entry.overall_score}/10
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}