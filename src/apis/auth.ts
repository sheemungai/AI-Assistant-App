import type { AuthResponse, LoginPayload, Profile, RegisterPayload } from "#/types";
import { client } from "./client";

const BASE = "/accounts"; 

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const data = await client.post<AuthResponse>(`${BASE}/register/`, payload);
    client.setTokens(data.access, data.refresh);
    return data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const data = await client.post<AuthResponse>(`${BASE}/login/`, payload);
    client.setTokens(data.access, data.refresh);
    return data;
  },

  logout: async (): Promise<void> => {
    const refresh = localStorage.getItem("refresh_token");
    if (refresh) {
      await client.post(`${BASE}/logout/`, { refresh }).catch(() => {});
    }
    client.clearTokens();
  },

  getProfile: () => client.get<Profile>(`${BASE}/profile/`),
};