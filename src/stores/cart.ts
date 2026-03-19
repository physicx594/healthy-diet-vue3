import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cartApi } from '@/api'
import type { CartItem } from '@/types'
import { useLoadingStore } from './loading'
import { useNotificationStore } from './notification'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalQty = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => {
      const price = item.product.price || item.product.origin_price
      return sum + price * item.qty
    }, 0)
  )

  const shippingFee = computed(() => (totalPrice.value > 3000 ? 0 : 200))

  const getCart = async () => {
    const loading = useLoadingStore()
    try {
      const res = await cartApi.get()
      items.value = res.data.data.carts
    } finally {
      loading.setFormLoading(false)
    }
  }

  const addToCart = async (productId: string, qty = 1) => {
    const notification = useNotificationStore()
    try {
      await cartApi.add(productId, qty)
      await getCart()
      notification.show('成功加入購物車')
    } catch {
      notification.show('加入失敗，請稍後再試', 'error')
    }
  }

  const deleteItem = async (id: string) => {
    const loading = useLoadingStore()
    loading.setFormLoading(true)
    await cartApi.delete(id)
    await getCart()
  }

  const changeQuantity = async (cartItemId: string, productId: string, qty: number) => {
    const loading = useLoadingStore()
    loading.setFormLoading(true)
    await cartApi.update(cartItemId, productId, qty)
    await getCart()
  }

  const clearCart = async () => {
    items.value = []
  }

  return {
    items,
    totalQty,
    totalPrice,
    shippingFee,
    getCart,
    addToCart,
    deleteItem,
    changeQuantity,
    clearCart
  }
})
