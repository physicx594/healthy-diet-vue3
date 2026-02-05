import apiClient from './client'
import type { ProductsResponse, ProductResponse } from '@/types'

const uuid = import.meta.env.VITE_UUID

export const productsApi = {
  getAll(page = 1) {
    return apiClient.get<ProductsResponse>(`/api/${uuid}/products?page=${page}`)
  },
  getAllProducts() {
    return apiClient.get<{ products: import('@/types').Product[] }>(`/api/${uuid}/products/all`)
  },
  getOne(id: string) {
    return apiClient.get<ProductResponse>(`/api/${uuid}/product/${id}`)
  },
  // Admin
  getAdminAll(page = 1) {
    return apiClient.get<ProductsResponse>(`/api/${uuid}/admin/products?page=${page}`)
  },
  create(data: Record<string, unknown>) {
    return apiClient.post(`/api/${uuid}/admin/product`, { data })
  },
  update(id: string, data: Record<string, unknown>) {
    return apiClient.put(`/api/${uuid}/admin/product/${id}`, { data })
  },
  delete(id: string) {
    return apiClient.delete(`/api/${uuid}/admin/product/${id}`)
  }
}
