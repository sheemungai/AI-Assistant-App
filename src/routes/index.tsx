import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const isLoggedIn = !!localStorage.getItem('access_token')

  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.14),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/40 to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-6 py-20 lg:px-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            AI-powered interview practice that feels focused
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Ace your next interview with sharper practice and instant feedback.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Practice real interview questions, get structured AI feedback, and
            track your growth in one polished workspace.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-300"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur transition-colors duration-200 hover:border-white/25 hover:bg-white/10"
                >
                  Log in
                </Link>
              </>
            )}
          </div>

          <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <FeatureCard
              badge="01"
              title="Practice Questions"
              description="Behavioral, technical, and situational questions across roles and difficulty levels."
            />
            <FeatureCard
              badge="02"
              title="AI Feedback"
              description="Get a score, strengths, and improvement tips on every answer you submit."
            />
            <FeatureCard
              badge="03"
              title="Track Progress"
              description="See your trends over time and know exactly where to focus."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  badge,
  title,
  description,
}: {
  badge: string
  title: string
  description: string
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-xl shadow-black/20 ring-1 ring-inset ring-white/5 backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/8">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15 text-sm font-semibold text-cyan-200 ring-1 ring-inset ring-cyan-300/20">
        {badge}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-50">{title}</h3>
      <p className="text-sm leading-6 text-slate-300">{description}</p>
    </div>
  )
}