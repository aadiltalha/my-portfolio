// services/messages.service.ts
import apiClient from '@/lib/axios-client'
import type { ApiResponse, Message } from '@/types'

export const messagesService = {
  getAll: async (): Promise<Message[]> => {
    const response = await apiClient.get<ApiResponse<Message[]>>('/contact')
    return response.data.data
  },

  markAsRead: async (id: string): Promise<Message> => {
    const response = await apiClient.patch<ApiResponse<Message>>(
      `/contact/${id}/read`,
      {}
    )
    return response.data.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/contact/${id}`)
  },
}
