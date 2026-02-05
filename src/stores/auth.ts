import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/api'
import { getCookie, setCookie, removeCookie } from '@/utils'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const signin = async (username: string, password: string) => {
    const res = await authApi.signin(username, password)
    const { token, expired } = res.data
    setCookie('token', token, new Date(expired * 1000))
    isAuthenticated.value = true
    router.push('/admin/products')
  }

  const checkAuth = async (): Promise<boolean> => {
    const token = getCookie('token')
    if (!token) return false
    try {
      const res = await authApi.check()
      isAuthenticated.value = res.data.success
      return res.data.success
    } catch {
      isAuthenticated.value = false
      return false
    }
  }

  const signout = () => {
    removeCookie('token')
    isAuthenticated.value = false
    router.push('/')
  }

  return { isAuthenticated, signin, checkAuth, signout }
})
