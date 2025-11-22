// admin/services/analytics.service.ts
import apiClient from '@/lib/axios-client'
import type { ApiResponse, Analytics } from '@/types'

export const analyticsService = {
  // This is what your dashboard should call
  getSummary: async (): Promise<Analytics> => {
    // ✅ matches backend: GET /api/analytics/summary
    const response = await apiClient.get<ApiResponse<Analytics>>('/analytics/summary')
    return response.data.data
  },
}
