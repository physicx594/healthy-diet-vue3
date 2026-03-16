// 後台儀表板假資料

// 近 30 天每日營收
const today = new Date()
export const revenueData: { date: string; revenue: number; orders: number }[] = Array.from(
  { length: 30 },
  (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (29 - i))
    const date = `${d.getMonth() + 1}/${d.getDate()}`
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    const base = isWeekend ? 18000 : 12000
    const revenue = Math.floor(base + Math.random() * 12000)
    const orders = Math.floor(revenue / 800 + Math.random() * 5)
    return { date, revenue, orders }
  }
)

// 付款狀態
export const paymentStatus = [
  { value: 68, name: '已付款' },
  { value: 32, name: '未付款' }
]

// 熱銷商品 Top 8
export const topProducts = [
  { name: '有機燕麥奶昔', qty: 312 },
  { name: '冷壓綠拿鐵', qty: 287 },
  { name: '藜麥蛋白棒', qty: 254 },
  { name: '奇亞籽布丁', qty: 231 },
  { name: '超級莓果粉', qty: 198 },
  { name: '薑黃拿鐵', qty: 176 },
  { name: '椰子水補充包', qty: 154 },
  { name: '有機堅果綜合包', qty: 132 }
]

// 分類銷售佔比
export const categorySales = [
  { value: 32, name: '飲品' },
  { value: 25, name: '穀物與燕麥' },
  { value: 18, name: '蛋白質補充' },
  { value: 14, name: '超級食物' },
  { value: 11, name: '堅果與點心' }
]

// KPI 統計卡
export const kpiStats = {
  totalRevenue: revenueData.reduce((sum, d) => sum + d.revenue, 0),
  totalOrders: revenueData.reduce((sum, d) => sum + d.orders, 0),
  paidOrders: Math.floor(revenueData.reduce((sum, d) => sum + d.orders, 0) * 0.68),
  unpaidOrders: Math.floor(revenueData.reduce((sum, d) => sum + d.orders, 0) * 0.32)
}
