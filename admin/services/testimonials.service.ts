// services/testimonials.service.ts
import apiClient from '@/lib/axios-client'
import type { ApiResponse, Testimonial } from '@/types'

export const testimonialsService = {
  getAll: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get<ApiResponse<Testimonial[]>>('/testimonials')
    return response.data.data
  },

  // ✅ accept FormData for create
  create: async (data: FormData): Promise<Testimonial> => {
    const response = await apiClient.post<ApiResponse<Testimonial>>(
      '/testimonials',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data.data
  },

  // ✅ accept FormData for update
  update: async (id: string, data: FormData): Promise<Testimonial> => {
    const response = await apiClient.put<ApiResponse<Testimonial>>(
      `/testimonials/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/testimonials/${id}`)
  },
}
