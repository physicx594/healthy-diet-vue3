import type { CartItem } from './cart'

export interface OrderUser {
  name: string
  email: string
  tel: string
  address: string
}

export interface Order {
  id: string
  create_at: number
  is_paid: boolean
  message: string
  payment: string
  products: Record<string, CartItem>
  total: number
  user: OrderUser
}

export interface OrderForm {
  user: OrderUser
  message: string
}
