import type { AnalyticsOverview, TopicStat, TrendEntry } from '../types';
import { client } from './client';

const BASE = '/analytics';

export const analyticsApi = {

  overview: () => client.get<AnalyticsOverview>(`${BASE}/overview/`),
  byTopic: () => client.get<TopicStat[]>(`${BASE}/by-topic/`),
  trend: () => client.get<TrendEntry[]>(`${BASE}/trend/`),
};