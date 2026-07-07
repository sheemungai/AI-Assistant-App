import type { Profile, UpdateProfilePayload } from '../types';
import { client } from './client';

export type TargetRole = 'software_developer' | 'sales_manager' | 'product_manager';
export type ExperienceLevel = 'entry' | 'mid' | 'senior';


const BASE = '/users/profiles';

export const usersApi = {
  list: () => client.get<Profile[]>(`${BASE}/`),
  get: (id: number) => client.get<Profile>(`${BASE}/${id}/`),
  update: (id: number, data: UpdateProfilePayload) =>
    client.patch<Profile>(`${BASE}/${id}/`, data),
  replace: (id: number, data: UpdateProfilePayload) =>
    client.put<Profile>(`${BASE}/${id}/`, data),
  delete: (id: number) => client.delete<void>(`${BASE}/${id}/`),
};
