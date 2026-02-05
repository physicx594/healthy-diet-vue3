import apiClient from './client'
import type { CouponsResponse, CouponApplyResponse } from '@/types'

const uuid = import.meta.env.VITE_UUID

export const couponsApi = {
  apply(code: string) {
    return apiClient.post<CouponApplyResponse>(`/api/${uuid}/coupon`, { data: { code } })
  },
  // Admin
  getAdminAll() {
    return apiClient.get<CouponsResponse>(`/api/${uuid}/admin/coupons`)
  },
  create(data: Record<string, unknown>) {
    return apiClient.post(`/api/${uuid}/admin/coupon`, { data })
  },
  update(id: string, data: Record<string, unknown>) {
    return apiClient.put(`/api/${uuid}/admin/coupon/${id}`, { data })
  },
  delete(id: string) {
    return apiClient.delete(`/api/${uuid}/admin/coupon/${id}`)
  }
}
