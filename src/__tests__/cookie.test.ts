import { describe, it, expect, beforeEach } from 'vitest'
import { getCookie, setCookie, removeCookie } from '@/utils/cookie'

describe('cookie utils', () => {
  beforeEach(() => {
    document.cookie.split(';').forEach((c) => {
      const name = c.split('=')[0]!.trim()
      if (name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
      }
    })
  })

  describe('setCookie / getCookie', () => {
    it('設定並取得 cookie', () => {
      const expires = new Date(Date.now() + 60000)
      setCookie('token', 'abc123', expires)
      expect(getCookie('token')).toBe('abc123')
    })

    it('取得不存在的 cookie 回傳空字串', () => {
      expect(getCookie('nonexistent')).toBe('')
    })
  })

  describe('removeCookie', () => {
    it('移除 cookie', () => {
      const expires = new Date(Date.now() + 60000)
      setCookie('token', 'abc123', expires)
      expect(getCookie('token')).toBe('abc123')
      removeCookie('token')
      expect(getCookie('token')).toBe('')
    })
  })
})
