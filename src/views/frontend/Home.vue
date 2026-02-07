<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoadingStore, useProductsStore, useCartStore } from '@/stores'
import { formatMoney } from '@/utils'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Banner from '@/components/frontend/Banner.vue'
const router = useRouter()
const loadingStore = useLoadingStore()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const email = ref('')
const toCategory = (category: string) => {
  router.push({ name: 'products', query: { category } })
}
const addToCart = (id: string) => {
  cartStore.addToCart(id)
}
const swiperModules = [Autoplay]
const testimonials = [
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
onMounted(async () => {
  loadingStore.setLoading(true)
  await productsStore.getProducts(1)
  setTimeout(() => loadingStore.setLoading(false), 800)
})

const featuredTestimonial = testimonials[0]!
</script>
<template>
  <div v-if="!loadingStore.isLoading" class="overflow-x-hidden">
      <!-- Section 1: Hero Banner (left-bottom aligned, handled by Banner.vue) -->
      <Banner
        page-name="Healthy Diet"
        content="發現蔬食最新鮮純淨的美味"
        bg-image="https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
      />
      <!-- Section 2: Popular Products — 雜誌偏移格線 (1 large + 3 small) -->
      <section v-if="productsStore.products.length" class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <!-- Title row: left title + right CTA -->
          <div class="flex items-end justify-between mb-12">
            <div>
              <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Best Sellers</span>
              <h2 class="font-display text-4xl lg:text-5xl font-semibold text-text mt-3">人氣推薦</h2>
            </div>
            <RouterLink to="/products" class="max-sm:hidden">
              <button class="px-8 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300 text-sm">
                查看全部 <i class="fa-solid fa-arrow-right ml-2 text-xs"></i>
              </button>
            </RouterLink>
          </div>
          <!-- 1 left large + 2 right stacked -->
          <div class="flex max-lg:flex-col gap-6">
            <!-- Left: large featured card -->
            <div
              v-if="productsStore.products[0]"
              class="lg:w-[60%] group"
            >
              <div class="relative h-full rounded-2xl overflow-hidden shadow-card group-hover:shadow-card-hover transition-all duration-500 cursor-pointer">
                <RouterLink :to="`/product/${productsStore.products[0].id}`" class="block h-full">
                  <img
                    :src="productsStore.products[0].imageUrl[0]"
                    :alt="productsStore.products[0].title"
                    class="w-full h-full min-h-[360px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div class="absolute bottom-0 left-0 right-0 p-8">
                    <span class="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-medium mb-3">
                      {{ productsStore.products[0].category }}
                    </span>
                    <h3 class="font-brand text-2xl lg:text-3xl text-white font-bold mb-2">{{ productsStore.products[0].title }}</h3>
                    <div class="flex items-center gap-4">
                      <span class="font-mono text-2xl font-bold text-white">{{ formatMoney(productsStore.products[0].price || productsStore.products[0].origin_price) }}</span>
                      <span v-if="productsStore.products[0].price" class="font-mono text-sm text-white/50 line-through">{{ formatMoney(productsStore.products[0].origin_price) }}</span>
                    </div>
                  </div>
                </RouterLink>
                <button
                  class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-primary transition-all duration-300"
                  @click.prevent="addToCart(productsStore.products[0].id)"
                >
                  <i class="fa-solid fa-cart-plus text-sm"></i>
                </button>
              </div>
            </div>
            <!-- Right: 2 small cards stacked -->
            <div class="lg:w-[40%] flex flex-col gap-6">
              <div
                v-for="item in productsStore.products.slice(1, 3)"
                :key="item.id"
                class="group flex-1"
              >
                <div class="bg-white rounded-2xl overflow-hidden shadow-card group-hover:shadow-card-hover transition-all duration-500 group-hover:-translate-y-1 cursor-pointer h-full flex max-sm:flex-col sm:flex-row">
                  <RouterLink :to="`/product/${item.id}`" class="sm:w-2/5 shrink-0">
                    <div class="relative aspect-[4/3] sm:aspect-auto sm:h-full overflow-hidden">
                      <img
                        :src="item.imageUrl[0]"
                        :alt="item.title"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-medium text-text shadow-sm">
                        {{ item.category }}
                      </span>
                    </div>
                  </RouterLink>
                  <div class="p-5 flex flex-col justify-center">
                    <h4 class="font-bold text-text mb-2 text-[15px]">{{ item.title }}</h4>
                    <div class="flex items-baseline gap-2 mb-4">
                      <span class="font-mono text-xl font-bold text-primary-dark">{{ formatMoney(item.price || item.origin_price) }}</span>
                      <span v-if="item.price" class="font-mono text-xs text-text-light/60 line-through">{{ formatMoney(item.origin_price) }}</span>
                      <span v-if="item.price" class="px-2 py-0.5 rounded-full bg-contrast/10 text-contrast text-[11px] font-bold">
                        {{ Math.round((1 - item.price / item.origin_price) * 100) }}% OFF
                      </span>
                    </div>
                    <button
                      class="self-start px-5 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300"
                      @click.prevent="addToCart(item.id)"
                    >
                      <i class="fa-solid fa-cart-plus text-xs mr-1.5"></i>加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Mobile CTA -->
          <div class="text-center mt-10 sm:hidden">
            <RouterLink to="/products">
              <button class="px-10 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300 text-sm">
                查看全部商品
              </button>
            </RouterLink>
          </div>
        </div>
      </section>
      <!-- Section 3: Categories — 左標題 + 右側橫向卡片 -->
      <section class="py-20 bg-bg-light">
        <div class="container mx-auto px-6">
          <div class="flex max-lg:flex-col gap-12 lg:gap-16 items-center">
            <!-- Left: title + description -->
            <div class="lg:w-[30%] shrink-0">
              <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Categories</span>
              <h2 class="font-display text-4xl lg:text-5xl font-semibold text-text mt-3 mb-6 leading-tight">探索<br class="max-lg:hidden" />美味</h2>
              <p class="text-text-light text-sm leading-relaxed">從健康餐盒到新鮮沙拉，每一口都是對身體的溫柔呵護。</p>
              <div class="w-16 h-1 bg-primary-light/40 rounded-full mt-6"></div>
            </div>
            <!-- Right: 3 category cards in a row -->
            <div class="lg:w-[70%] grid grid-cols-1 sm:grid-cols-3 gap-5">
              <!-- 健康餐盒 -->
              <div
                class="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-500"
                @click="toCategory('健康餐盒')"
              >
                <img
                  src="https://images.unsplash.com/photo-1570078420152-d016091ec97a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <h3 class="font-brand text-2xl text-white font-bold mb-1 tracking-wide">Bento</h3>
                  <p class="font-mono text-white/70 text-[11px] tracking-wider uppercase">健康餐盒</p>
                </div>
              </div>
              <!-- 舒肥系列 — slightly offset upward -->
              <div
                class="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-500 sm:-mt-6"
                @click="toCategory('舒肥系列')"
              >
                <img
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/H5qxPcglJ1S9RagBQnAT7pKkMgbFlgu7BRyydNvHaPhVkTnuXG6NLduRdk3zsHrfOKTpUzN2rCye7HTKc3JOkCBTe4XiX3fasKdKaM00jWOjiPcvPbxA8IXlPm1RleCK.jpg"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <h3 class="font-brand text-2xl text-white font-bold mb-1 tracking-wide">Sous Vide</h3>
                  <p class="font-mono text-white/70 text-[11px] tracking-wider uppercase">舒肥系列</p>
                </div>
              </div>
              <!-- 新鮮沙拉 -->
              <div
                class="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-500"
                @click="toCategory('新鮮沙拉')"
              >
                <img
                  src="https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <h3 class="font-brand text-2xl text-white font-bold mb-1 tracking-wide">Salad</h3>
                  <p class="font-mono text-white/70 text-[11px] tracking-wider uppercase">新鮮沙拉</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Section 4: About Us + Features -->
      <section class="py-20 bg-white overflow-hidden">
        <div class="container mx-auto px-6">
          <!-- Upper: image + floating card -->
          <div class="relative lg:flex lg:items-center lg:min-h-[480px]">
            <div class="lg:w-[65%] lg:-ml-12">
              <img
                src="https://images.unsplash.com/photo-1595786802424-d6efbc413db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                class="w-full h-[320px] lg:h-[480px] object-cover rounded-2xl"
                alt="About us"
              />
            </div>
            <div
              class="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%] max-lg:mt-8"
            >
              <div class="bg-white rounded-2xl p-8 lg:p-10 shadow-card-hover">
                <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">About Us</span>
                <h2 class="font-display text-3xl lg:text-4xl font-semibold text-text mt-3 mb-6 leading-tight">
                  用心做好<br />每一份餐點
                </h2>
                <div class="space-y-4 text-text-light leading-relaxed text-sm">
                  <p>在生活步調快速的現代，忙於課業、工作及娛樂上，飲食也是一種健康的代表，許多人經常用速食來解決三餐，忽略了營養均衡的重要。</p>
                  <p>Healthy Diet 屬於輕食文化，採用低鹽低鈉少油，主餐以少量的肉類搭配大量的新鮮蔬果，降低消費者對身體的負擔，注重消費者能夠吃得健康又安心。</p>
                </div>
                <RouterLink to="/about" class="inline-block mt-8">
                  <button class="px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg text-sm">
                    了解更多
                  </button>
                </RouterLink>
              </div>
            </div>
          </div>
          <!-- Lower: 3 feature icons row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:mt-20 pt-16 border-t border-bg-dark/40">
            <div class="flex gap-5 items-start">
              <div class="w-14 h-14 rounded-2xl bg-primary-light/15 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-seedling text-xl text-primary"></i>
              </div>
              <div>
                <h3 class="font-bold text-text mb-1.5">在地食材</h3>
                <p class="text-text-light text-sm leading-relaxed">和小農合作，使用當地、當季蔬菜，實踐「吃當季、買在地」。</p>
              </div>
            </div>
            <div class="flex gap-5 items-start">
              <div class="w-14 h-14 rounded-2xl bg-primary-light/15 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-leaf text-xl text-primary"></i>
              </div>
              <div>
                <h3 class="font-bold text-text mb-1.5">天然無添加</h3>
                <p class="text-text-light text-sm leading-relaxed">不做多餘調味，保留食材本身的鮮與甜，吃得健康安心。</p>
              </div>
            </div>
            <div class="flex gap-5 items-start">
              <div class="w-14 h-14 rounded-2xl bg-primary-light/15 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-truck-fast text-xl text-primary"></i>
              </div>
              <div>
                <h3 class="font-bold text-text mb-1.5">新鮮直送</h3>
                <p class="text-text-light text-sm leading-relaxed">當日限量製作，專業冷凍物流配送，確保最新鮮品質。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Section 5: Testimonials — 左側大引言 + 右側輪播 (left-right split) -->
      <section class="py-20 bg-bg-light overflow-hidden">
        <div class="container mx-auto px-6">
          <div class="flex max-lg:flex-col gap-12 lg:gap-0">
            <!-- Left: featured quote (40%) -->
            <div class="lg:w-[40%] lg:pr-12 lg:border-r border-bg-dark/40">
              <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Testimonials</span>
              <h2 class="font-display text-4xl lg:text-5xl font-semibold text-text mt-3 mb-8">顧客好評</h2>
              <!-- Featured large quote -->
              <div class="relative">
                <i class="fa-solid fa-quote-left text-6xl text-primary-light/15 absolute -top-4 -left-2" aria-hidden="true"></i>
                <p class="text-text text-xl lg:text-2xl leading-relaxed font-light pl-4 relative z-10">
                  {{ featuredTestimonial.text }}
                </p>
              </div>
              <div class="flex items-center gap-4 mt-8">
                <div class="w-14 h-14 rounded-full bg-primary-light/20 flex items-center justify-center text-primary font-bold text-lg">
                  {{ featuredTestimonial.avatar }}
                </div>
                <div>
                  <div class="font-bold text-text text-base">{{ featuredTestimonial.name }}</div>
                  <div class="text-text-light text-sm">{{ featuredTestimonial.role }}</div>
                </div>
                <div class="flex items-center gap-0.5 ml-auto">
                  <i v-for="s in featuredTestimonial.rating" :key="s" class="fa-solid fa-star text-secondary text-sm"></i>
                </div>
              </div>
            </div>
            <!-- Right: swiper carousel (60%) -->
            <div class="lg:w-[60%] lg:pl-12 min-w-0">
              <div class="py-4 overflow-hidden">
                <Swiper
                  class="testimonial-swiper"
                  :modules="swiperModules"
                  :slides-per-view="1"
                  :space-between="24"
                  :loop="true"
                  :speed="800"
                  :allow-touch-move="false"
                  :simulate-touch="false"
                  :autoplay="{ delay: 3500, disableOnInteraction: false }"
                  :breakpoints="{
                    1024: { slidesPerView: 2 }
                  }"
                >
                  <SwiperSlide v-for="(t, i) in testimonials.slice(1)" :key="i">
                    <div class="bg-bg-light rounded-2xl p-8 h-full">
                      <div class="flex items-center gap-1 mb-4">
                        <i v-for="s in t.rating" :key="s" class="fa-solid fa-star text-secondary text-sm"></i>
                        <i v-for="s in (5 - t.rating)" :key="'e' + s" class="fa-regular fa-star text-secondary/30 text-sm"></i>
                      </div>
                      <div class="relative mb-6">
                        <i class="fa-solid fa-quote-left text-2xl text-primary-light/20 absolute -top-1 -left-1" aria-hidden="true"></i>
                        <p class="text-text-light leading-relaxed pl-6 text-sm">{{ t.text }}</p>
                      </div>
                      <div class="flex items-center gap-3 pt-4 border-t border-primary-light/10">
                        <div class="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center text-primary font-bold text-sm">
                          {{ t.avatar }}
                        </div>
                        <div>
                          <div class="font-bold text-text text-sm">{{ t.name }}</div>
                          <div class="text-text-light text-xs">{{ t.role }}</div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Section 6: Newsletter — 斜切全出血 + 左右分割 -->
      <section class="relative bg-primary-dark clip-diagonal pt-32 pb-24 overflow-hidden">
        <div class="container mx-auto px-6 relative z-10">
          <div class="flex max-lg:flex-col items-center gap-12 lg:gap-20">
            <!-- Left: decorative large text -->
            <div class="lg:w-[45%] max-lg:text-center">
              <span class="font-brand text-[5rem] md:text-[8rem] lg:text-[12rem] leading-none font-bold text-white/[0.06] select-none block" aria-hidden="true">
                Fresh
              </span>
              <p class="text-white/50 text-sm -mt-8 lg:-mt-12 relative z-10 max-lg:text-center">自然 · 新鮮 · 健康</p>
            </div>
            <!-- Right: title + form -->
            <div class="lg:w-[55%]">
              <span class="font-mono text-white/40 text-[11px] tracking-[0.25em] uppercase block mb-3">Newsletter</span>
              <h2 class="font-display text-4xl lg:text-5xl font-semibold text-white mb-4">訂閱我們</h2>
              <p class="text-white/60 mb-8 text-sm">獲得最新消息、獨家優惠與健康飲食小知識</p>
              <div class="flex max-sm:flex-col gap-3 max-w-lg">
                <input
                  v-model="email"
                  type="email"
                  class="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light text-sm"
                  placeholder="請輸入您的電子信箱"
                />
                <button
                  type="button"
                  class="px-8 py-3.5 rounded-xl bg-contrast text-white font-medium hover:bg-contrast/90 transition-colors text-sm whitespace-nowrap"
                >
                  立即訂閱
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Background decorative elements -->
        <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div class="absolute top-20 right-20 w-40 h-40 rounded-full border border-white/10 max-lg:hidden"></div>
          <div class="absolute bottom-16 left-16 w-24 h-24 rounded-full border border-white/5 max-lg:hidden"></div>
        </div>
      </section>
  </div>
</template>
<style scoped>
.testimonial-swiper {
  padding: 4px;
}
</style>
