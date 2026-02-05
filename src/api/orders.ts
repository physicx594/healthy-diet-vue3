import apiClient from './client'
import type { OrdersResponse, OrderResponse, CreateOrderResponse, OrderForm } from '@/types'

const uuid = import.meta.env.VITE_UUID

export const ordersApi = {
  create(data: OrderForm) {
    return apiClient.post<CreateOrderResponse>(`/api/${uuid}/order`, { data })
  },
  get(id: string) {
    return apiClient.get<OrderResponse>(`/api/${uuid}/order/${id}`)
  },
  pay(id: string) {
    return apiClient.post(`/api/${uuid}/pay/${id}`)
  },
  // Admin
  getAdminAll() {
    return apiClient.get<OrdersResponse>(`/api/${uuid}/admin/orders`)
  },
  updateAdmin(id: string, data: Record<string, unknown>) {
    return apiClient.put(`/api/${uuid}/admin/order/${id}`, { data })
  }
}
