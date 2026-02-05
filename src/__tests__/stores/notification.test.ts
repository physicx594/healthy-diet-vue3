import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNotificationStore } from '@/stores/notification'

describe('notification store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  it('初始狀態為 null', () => {
    const store = useNotificationStore()
    expect(store.current).toBeNull()
  })

  it('show 設定通知訊息', () => {
    const store = useNotificationStore()
    store.show('成功')
    expect(store.current).toEqual({ message: '成功', type: 'success' })
  })

  it('show 預設為 success', () => {
    const store = useNotificationStore()
    store.show('訊息')
    expect(store.current?.type).toBe('success')
  })

  it('show 可設定 error 類型', () => {
    const store = useNotificationStore()
    store.show('失敗', 'error')
    expect(store.current).toEqual({ message: '失敗', type: 'error' })
  })

  it('4 秒後自動清除', () => {
    const store = useNotificationStore()
    store.show('訊息')
    expect(store.current).not.toBeNull()
    vi.advanceTimersByTime(4000)
    expect(store.current).toBeNull()
  })

  it('連續呼叫 show 只保留最新的', () => {
    const store = useNotificationStore()
    store.show('第一則')
    store.show('第二則')
    expect(store.current?.message).toBe('第二則')
  })

  it('clear 立即清除通知', () => {
    const store = useNotificationStore()
    store.show('訊息')
    store.clear()
    expect(store.current).toBeNull()
  })
})
