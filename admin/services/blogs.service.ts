// services/blogs.service.ts
import apiClient from '@/lib/axios-client'
import type { ApiResponse, Blog } from '@/types'

export const blogsService = {
  getAll: async (): Promise<Blog[]> => {
    const response = await apiClient.get<ApiResponse<Blog[]>>('/blogs')
    return response.data.data
  },

  getById: async (id: string): Promise<Blog> => {
    const response = await apiClient.get<ApiResponse<Blog>>(`/blogs/${id}`)
    return response.data.data
  },

  // ✅ accept FormData for create
  create: async (data: FormData): Promise<Blog> => {
    const response = await apiClient.post<ApiResponse<Blog>>('/blogs', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  // ✅ accept FormData for update
  update: async (id: string, data: FormData): Promise<Blog> => {
    const response = await apiClient.put<ApiResponse<Blog>>(`/blogs/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/blogs/${id}`)
  },
}
