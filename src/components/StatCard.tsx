interface StatCardProps {
  label: string
  value: string | number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  )
}