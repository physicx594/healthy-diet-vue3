export interface Product {
  id: string
  title: string
  category: string
  content: string
  description: string
  imageUrl: string[]
  is_enabled: number
  origin_price: number
  price: number
  unit: string
  options?: {
    quantity?: number
    coupon?: boolean
  }
}
