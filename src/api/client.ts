import axios from 'axios'
import { getCookie } from '@/utils/cookie'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

apiClient.interceptors.request.use((config) => {
  const token = getCookie('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default apiClient
