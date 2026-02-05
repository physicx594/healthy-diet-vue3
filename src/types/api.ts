import type { Product } from './product'
import type { CartData } from './cart'
import type { Order } from './order'
import type { Coupon } from './coupon'
import type { Pagination } from './pagination'

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  [key: string]: unknown
}

export interface ProductsResponse extends ApiResponse {
  products: Product[]
  pagination: Pagination
}

export interface ProductResponse extends ApiResponse {
  product: Product
}

export interface CartResponse extends ApiResponse {
  data: CartData
}

export interface OrdersResponse extends ApiResponse {
  orders: Order[]
  pagination: Pagination
}

export interface OrderResponse extends ApiResponse {
  order: Order
}

export interface CouponsResponse extends ApiResponse {
  coupons: Coupon[]
  pagination: Pagination
}

export interface CouponApplyResponse extends ApiResponse {
  data: {
    final_total: number
  }
}

export interface SigninResponse extends ApiResponse {
  token: string
  expired: number
}

export interface UploadResponse extends ApiResponse {
  imageUrl: string
}

export interface CreateOrderResponse extends ApiResponse {
  orderId: string
}

export interface StoragesResponse extends ApiResponse {
  images: Array<{
    id: string
    path: string
  }>
}
