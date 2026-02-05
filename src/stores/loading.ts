import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  const formLoading = ref(false)

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  function setFormLoading(value: boolean) {
    formLoading.value = value
  }

  return { isLoading, formLoading, setLoading, setFormLoading }
})
