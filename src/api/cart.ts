import apiClient from './client'
import type { CartResponse } from '@/types'

const uuid = import.meta.env.VITE_UUID

export const cartApi = {
  get() {
    return apiClient.get<CartResponse>(`/api/${uuid}/cart`)
  },
  add(productId: string, qty: number) {
    return apiClient.post(`/api/${uuid}/cart`, { data: { product_id: productId, qty } })
  },
  update(cartItemId: string, productId: string, qty: number) {
    return apiClient.put(`/api/${uuid}/cart/${cartItemId}`, { data: { product_id: productId, qty } })
  },
  delete(cartItemId: string) {
    return apiClient.delete(`/api/${uuid}/cart/${cartItemId}`)
  },
  deleteAll() {
    return apiClient.delete(`/api/${uuid}/carts`)
  }
}
