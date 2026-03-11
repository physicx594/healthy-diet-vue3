type Testimonial = {
  name: string
  role: string
  avatar: string
  rating: number
  text: string
}

export const testimonials: [Testimonial, ...Testimonial[]] = [
  {
    name: '林小姐',
    role: '上班族',
    avatar: 'L',
    rating: 5,
    text: '每天訂購 Healthy Diet 的餐盒，不僅方便又健康。食材新鮮，口味清爽，同事們都搶著訂！'
  },
  {
    name: '陳先生',
    role: '健身教練',
    avatar: 'C',
    rating: 5,
    text: '身為健身教練，我對飲食要求特別高。Healthy Diet 的舒肥雞胸肉蛋白質含量高，口感也非常棒。'
  },
  {
    name: '王小姐',
    role: '營養師',
    avatar: 'W',
    rating: 5,
    text: '食材天然無添加，營養搭配均衡。真正做到了健康與美味兼顧，是我最推薦給客戶的外送餐盒。'
  },
  {
    name: '張先生',
    role: '軟體工程師',
    avatar: 'Z',
    rating: 5,
    text: '加班到很晚也不用擔心吃不健康，冷藏配送隔天微波就能吃，味道跟現做的一樣好。'
  },
  {
    name: '李小姐',
    role: '瑜珈老師',
    avatar: 'Li',
    rating: 5,
    text: '沙拉系列是我的最愛！蔬果都很新鮮脆口，醬汁清爽不膩，每週固定訂購三次。'
  },
  {
    name: '黃先生',
    role: '大學生',
    avatar: 'H',
    rating: 4,
    text: '價格對學生來說很友善，份量也很夠。比起外面便當店，吃完不會有罪惡感，大推！'
  },
  {
    name: '吳小姐',
    role: '新手媽媽',
    avatar: 'Wu',
    rating: 5,
    text: '產後調理期間特別注重飲食，Healthy Diet 的低鈉少油料理讓我吃得安心，恢復也更順利。'
  },
  {
    name: '劉先生',
    role: '馬拉松跑者',
    avatar: 'Liu',
    rating: 5,
    text: '備賽期間需要精準控制熱量攝取，每份餐盒都有清楚的營養標示，幫助我維持最佳狀態。'
  }
]
