// services/auth.service.ts
import apiClient from '@/lib/axios-client'
import { authStorage } from '@/lib/auth'
import type { LoginResponse } from '@/types'

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      email,
      password,
    })

    const data = response.data

    if (data.token) {
      authStorage.setToken(data.token)
    }

    return data
  },

  logout: () => {
    authStorage.removeToken()
  },
}
