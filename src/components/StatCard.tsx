interface StatCardProps {
  label: string
  value: string | number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 ring-1 ring-inset ring-white/5 backdrop-blur">
      <p className="text-sm font-medium text-slate-300">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-50">
        {value}
      </p>
    </div>
  )
}