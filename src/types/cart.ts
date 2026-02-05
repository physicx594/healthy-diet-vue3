import type { Product } from './product'

export interface CartItem {
  id: string
  product_id: string
  product: Product
  qty: number
  total: number
  final_total: number
  coupon?: {
    code: string
    percent: number
  }
}

export interface CartData {
  carts: CartItem[]
  total: number
  final_total: number
}
