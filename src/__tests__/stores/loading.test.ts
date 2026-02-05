import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLoadingStore } from '@/stores/loading'

describe('loading store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初始狀態都是 false', () => {
    const store = useLoadingStore()
    expect(store.isLoading).toBe(false)
    expect(store.formLoading).toBe(false)
  })

  it('setLoading 更新 isLoading', () => {
    const store = useLoadingStore()
    store.setLoading(true)
    expect(store.isLoading).toBe(true)
    store.setLoading(false)
    expect(store.isLoading).toBe(false)
  })

  it('setFormLoading 更新 formLoading', () => {
    const store = useLoadingStore()
    store.setFormLoading(true)
    expect(store.formLoading).toBe(true)
    store.setFormLoading(false)
    expect(store.formLoading).toBe(false)
  })
})
