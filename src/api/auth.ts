import apiClient from './client'
import type { SigninResponse, ApiResponse } from '@/types'

export const authApi = {
  signin(username: string, password: string) {
    return apiClient.post<SigninResponse>('/admin/signin', { username, password })
  },
  check() {
    return apiClient.post<ApiResponse>('/api/user/check')
  }
}
