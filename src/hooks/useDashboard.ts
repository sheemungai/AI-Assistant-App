import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '@/apis/analytics'

export function useDashboard() {
  const overview = useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: analyticsApi.overview,
  })

  const byTopic = useQuery({
    queryKey: ['analytics', 'by-topic'],
    queryFn: analyticsApi.byTopic,
  })

  const trend = useQuery({
    queryKey: ['analytics', 'trend'],
    queryFn: analyticsApi.trend,
  })
  const strengths = useQuery({
    queryKey: ['analytics', 'strengths-improvements'],
    queryFn: analyticsApi.strengthsImprovements,
  })



  return { overview, byTopic, trend, strengths }
}