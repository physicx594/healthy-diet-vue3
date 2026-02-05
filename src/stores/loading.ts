import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  const formLoading = ref(false)

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  const setFormLoading = (value: boolean) => {
    formLoading.value = value
  }

  return { isLoading, formLoading, setLoading, setFormLoading }
})
