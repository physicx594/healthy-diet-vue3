import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNotificationStore } from '@/stores/notification'

describe('notification store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  it('初始狀態為空陣列', () => {
    const store = useNotificationStore()
    expect(store.notifications).toEqual([])
  })

  it('show 新增通知', () => {
    const store = useNotificationStore()
    store.show('成功')
    expect(store.notifications).toHaveLength(1)
    expect(store.notifications[0]!).toMatchObject({ message: '成功', type: 'success' })
  })

  it('show 預設為 success', () => {
    const store = useNotificationStore()
    store.show('訊息')
    expect(store.notifications[0]!.type).toBe('success')
  })

  it('show 可設定 error 類型', () => {
    const store = useNotificationStore()
    store.show('失敗', 'error')
    expect(store.notifications[0]!).toMatchObject({ message: '失敗', type: 'error' })
  })

  it('4 秒後自動移除通知', () => {
    const store = useNotificationStore()
    store.show('訊息')
    expect(store.notifications).toHaveLength(1)
    vi.advanceTimersByTime(4000)
    expect(store.notifications).toHaveLength(0)
  })

  it('連續呼叫 show 會同時存在多則通知', () => {
    const store = useNotificationStore()
    store.show('第一則')
    store.show('第二則')
    expect(store.notifications).toHaveLength(2)
    expect(store.notifications[0]!.message).toBe('第一則')
    expect(store.notifications[1]!.message).toBe('第二則')
  })

  it('各通知獨立計時，依序消失', () => {
    const store = useNotificationStore()
    store.show('第一則')
    vi.advanceTimersByTime(2000)
    store.show('第二則')
    vi.advanceTimersByTime(2000)
    // 第一則 4s 已到
    expect(store.notifications).toHaveLength(1)
    expect(store.notifications[0]!.message).toBe('第二則')
    vi.advanceTimersByTime(2000)
    expect(store.notifications).toHaveLength(0)
  })

  it('remove 移除指定通知', () => {
    const store = useNotificationStore()
    store.show('第一則')
    const id = store.notifications[0]!.id
    store.show('第二則')
    store.remove(id)
    expect(store.notifications).toHaveLength(1)
    expect(store.notifications[0]!.message).toBe('第二則')
  })

  it('clear 清除所有通知', () => {
    const store = useNotificationStore()
    store.show('第一則')
    store.show('第二則')
    store.clear()
    expect(store.notifications).toHaveLength(0)
  })
})
