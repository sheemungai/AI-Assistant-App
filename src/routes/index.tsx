import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const isLoggedIn = !!localStorage.getItem('access_token')

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">
        Ace Your Next Interview
      </h1>
      <p className="text-gray-600 max-w-md">
        Practice real interview questions and get instant AI feedback on your
        answers — so you walk in prepared.
      </p>

      {isLoggedIn ? (
        <Link
          to="/"
          className="bg-blue-600 text-white rounded px-6 py-3 font-medium hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      ) : (
        <div className="flex gap-3">
          <Link
            to="/register"
            className="bg-blue-600 text-white rounded px-6 py-3 font-medium hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border rounded px-6 py-3 font-medium hover:bg-gray-200"
          >
            Log in
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-3xl">
        <FeatureCard
          title="Practice Questions"
          description="Behavioral, technical, and situational questions across roles and difficulty levels."
        />
        <FeatureCard
          title="AI Feedback"
          description="Get a score, strengths, and improvement tips on every answer you submit."
        />
        <FeatureCard
          title="Track Progress"
          description="See your trends over time and know exactly where to focus."
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border rounded p-4 text-left">
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}