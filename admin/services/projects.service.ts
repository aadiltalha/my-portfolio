// services/projects.service.ts
import apiClient from '@/lib/axios-client'
import type { ApiResponse, Project } from '@/types'

export const projectsService = {
  getAll: async (): Promise<Project[]> => {
    const response = await apiClient.get<ApiResponse<Project[]>>('/projects')
    return response.data.data
  },

  getById: async (id: string): Promise<Project> => {
    const response = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`)
    return response.data.data
  },

  create: async (formData: FormData): Promise<Project> => {
    const response = await apiClient.post<ApiResponse<Project>>('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  update: async (id: string, formData: FormData): Promise<Project> => {
    const response = await apiClient.put<ApiResponse<Project>>(
      `/projects/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`)
  },
}
