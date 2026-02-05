export interface Coupon {
  id: string
  title: string
  code: string
  percent: number
  due_date: number
  is_enabled: number
  countdownStatus?: string
}
