import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Notification {
  message: string
  type: 'success' | 'error'
}

export const useNotificationStore = defineStore('notification', () => {
  const current = ref<Notification | null>(null)
  let timer: ReturnType<typeof setTimeout> | null = null

  const show = (message: string, type: 'success' | 'error' = 'success') => {
    if (timer) clearTimeout(timer)
    current.value = { message, type }
    timer = setTimeout(() => {
      current.value = null
      timer = null
    }, 4000)
  }

  const clear = () => {
    if (timer) clearTimeout(timer)
    current.value = null
    timer = null
  }

  return { current, show, clear }
})
