import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Notification {
  id: number
  message: string
  type: 'success' | 'error'
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])
  let nextId = 0

  const show = (message: string, type: 'success' | 'error' = 'success'): number => {
    const id = nextId++
    notifications.value.push({ id, message, type })
    setTimeout(() => remove(id), 1500)
    return id
  }

  const remove = (id: number) => {
    const idx = notifications.value.findIndex((n) => n.id === id)
    if (idx !== -1) notifications.value.splice(idx, 1)
  }

  const clear = () => {
    notifications.value = []
  }

  return { notifications, show, remove, clear }
})
