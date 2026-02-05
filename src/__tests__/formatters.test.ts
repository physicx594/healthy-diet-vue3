import { describe, it, expect } from 'vitest'
import { formatMoney, truncateOrderId } from '@/utils/formatters'

describe('formatMoney', () => {
  it('格式化整數金額', () => {
    expect(formatMoney(1000)).toBe('NT $1,000')
  })

  it('格式化大金額', () => {
    expect(formatMoney(1234567)).toBe('NT $1,234,567')
  })

  it('格式化小數金額', () => {
    expect(formatMoney(1500.5)).toBe('NT $1,500.5')
  })

  it('格式化零', () => {
    expect(formatMoney(0)).toBe('NT $0')
  })

  it('處理 undefined', () => {
    expect(formatMoney(undefined)).toBe('NT $0')
  })

  it('處理 null', () => {
    expect(formatMoney(null)).toBe('NT $0')
  })

  it('不格式化三位數以下', () => {
    expect(formatMoney(999)).toBe('NT $999')
  })
})

describe('truncateOrderId', () => {
  it('截斷超過 20 字的訂單 ID', () => {
    const longId = 'abcdefghijklmnopqrstuvwxyz1234567890'
    expect(truncateOrderId(longId)).toBe('abcdefghijklmnopqrst')
    expect(truncateOrderId(longId)).toHaveLength(20)
  })

  it('保留短於 20 字的訂單 ID', () => {
    const shortId = 'abc123'
    expect(truncateOrderId(shortId)).toBe('abc123')
  })

  it('處理剛好 20 字的 ID', () => {
    const exactId = '12345678901234567890'
    expect(truncateOrderId(exactId)).toBe(exactId)
  })
})
