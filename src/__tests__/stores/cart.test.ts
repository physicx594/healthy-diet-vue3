import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/types'

const mockCartItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: 'cart-1',
  product_id: 'prod-1',
  product: {
    id: 'prod-1',
    title: '測試商品',
    category: '分類',
    content: '',
    description: '',
    imageUrl: [],
    is_enabled: 1,
    origin_price: 500,
    price: 400,
    unit: '份'
  },
  qty: 1,
  total: 400,
  final_total: 400,
  ...overrides
})

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('computed: totalPrice', () => {
    it('空購物車總價為 0', () => {
      const store = useCartStore()
      expect(store.totalPrice).toBe(0)
    })

    it('計算單一商品總價', () => {
      const store = useCartStore()
      store.items = [mockCartItem({ qty: 2 })]
      expect(store.totalPrice).toBe(800)
    })

    it('計算多商品總價', () => {
      const store = useCartStore()
      store.items = [
        mockCartItem({ qty: 2 }),
        mockCartItem({
          id: 'cart-2',
          product: {
            id: 'prod-2',
            title: '商品二',
            category: '分類',
            content: '',
            description: '',
            imageUrl: [],
            is_enabled: 1,
            origin_price: 300,
            price: 250,
            unit: '份'
          },
          qty: 3
        })
      ]
      expect(store.totalPrice).toBe(800 + 750)
    })

    it('price 為 0 時用 origin_price', () => {
      const store = useCartStore()
      store.items = [
        mockCartItem({
          product: {
            id: 'prod-1',
            title: '測試',
            category: '',
            content: '',
            description: '',
            imageUrl: [],
            is_enabled: 1,
            origin_price: 600,
            price: 0,
            unit: '份'
          },
          qty: 1
        })
      ]
      expect(store.totalPrice).toBe(600)
    })
  })

  describe('computed: shippingFee', () => {
    it('未滿 3000 收 200 運費', () => {
      const store = useCartStore()
      store.items = [mockCartItem({ qty: 1 })]
      expect(store.shippingFee).toBe(200)
    })

    it('滿 3000 免運', () => {
      const store = useCartStore()
      store.items = [mockCartItem({ qty: 8 })]
      expect(store.totalPrice).toBe(3200)
      expect(store.shippingFee).toBe(0)
    })

    it('剛好 3000 不免運（需超過 3000）', () => {
      const store = useCartStore()
      store.items = [
        mockCartItem({
          product: {
            id: 'prod-1',
            title: '測試',
            category: '',
            content: '',
            description: '',
            imageUrl: [],
            is_enabled: 1,
            origin_price: 3000,
            price: 3000,
            unit: '份'
          },
          qty: 1
        })
      ]
      expect(store.shippingFee).toBe(200)
    })

    it('超過 3000 免運', () => {
      const store = useCartStore()
      store.items = [
        mockCartItem({
          product: {
            id: 'prod-1',
            title: '測試',
            category: '',
            content: '',
            description: '',
            imageUrl: [],
            is_enabled: 1,
            origin_price: 3001,
            price: 3001,
            unit: '份'
          },
          qty: 1
        })
      ]
      expect(store.shippingFee).toBe(0)
    })
  })
})
