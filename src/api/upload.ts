import apiClient from './client'
import type { UploadResponse, StoragesResponse } from '@/types'

const uuid = import.meta.env.VITE_UUID

export const uploadApi = {
  upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post<UploadResponse>(`/api/${uuid}/admin/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  getAll() {
    return apiClient.get<StoragesResponse>(`/api/${uuid}/admin/upload`)
  },
  delete(id: string) {
    return apiClient.delete(`/api/${uuid}/admin/upload/${id}`)
  }
}
