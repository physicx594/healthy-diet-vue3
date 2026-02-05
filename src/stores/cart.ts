import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cartApi } from '@/api'
import type { CartItem } from '@/types'
import { useLoadingStore } from './loading'
import { useNotificationStore } from './notification'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const openMsg = ref(false)
  const joinMsg = ref(true)

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      const price = item.product.price || item.product.origin_price
      return sum + price * item.qty
    }, 0)
  })

  const shippingFee = computed(() => {
    return totalPrice.value > 3000 ? 0 : 200
  })

  async function getCart() {
    const loading = useLoadingStore()
    try {
      const res = await cartApi.get()
      items.value = res.data.data.carts
    } finally {
      loading.setFormLoading(false)
    }
  }

  async function addToCart(productId: string, qty = 1) {
    try {
      await cartApi.add(productId, qty)
      await getCart()
      openMsg.value = true
      joinMsg.value = true
      setTimeout(() => { openMsg.value = false }, 2500)
    } catch {
      openMsg.value = true
      joinMsg.value = false
      setTimeout(() => {
        openMsg.value = false
        joinMsg.value = true
      }, 2500)
    }
  }

  async function deleteItem(id: string) {
    const loading = useLoadingStore()
    loading.setFormLoading(true)
    await cartApi.delete(id)
    await getCart()
  }

  async function changeQuantity(cartItemId: string, productId: string, qty: number) {
    const loading = useLoadingStore()
    loading.setFormLoading(true)
    await cartApi.update(cartItemId, productId, qty)
    await getCart()
  }

  return {
    items, totalPrice, shippingFee, openMsg, joinMsg,
    getCart, addToCart, deleteItem, changeQuantity
  }
})
