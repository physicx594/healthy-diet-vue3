<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoadingStore, useProductsStore, useCartStore } from '@/stores'
import { formatMoney } from '@/utils'
import Navbar from '@/components/frontend/Navbar.vue'
import Gotop from '@/components/frontend/Gotop.vue'
import Banner from '@/components/frontend/Banner.vue'
import Footer from '@/components/frontend/Footer.vue'

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
  }
]

onMounted(async () => {
  loadingStore.setLoading(true)
  await productsStore.getProducts(1)
  setTimeout(() => loadingStore.setLoading(false), 800)
})
</script>

<template>
  <div>
    <Navbar />
    <Gotop />
    <div v-if="!loadingStore.isLoading">
      <!-- Section 1: Hero Banner -->
      <Banner
        page-name="Healthy Diet"
        content="發現蔬食最新鮮純淨的美味"
        bg-image="https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
      />

      <!-- Section 2: About Us -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-6">
          <div class="flex max-lg:flex-col items-center gap-12 lg:gap-16">
            <!-- Image -->
            <div class="lg:w-1/2" data-aos="fade-right" data-aos-duration="800">
              <div class="relative">
                <img
                  src="https://images.unsplash.com/photo-1595786802424-d6efbc413db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                  class="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl"
                  alt="About us"
                />
                <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-2xl -z-10 max-lg:hidden"></div>
              </div>
            </div>

            <!-- Text -->
            <div class="lg:w-1/2" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">About Us</span>
              <h2 class="font-display text-4xl lg:text-5xl font-semibold text-text mt-3 mb-6 leading-tight">
                用心做好<br />每一份餐點
              </h2>
              <div class="space-y-4 text-text-light leading-relaxed">
                <p>在生活步調快速的現代，忙於課業、工作及娛樂上，飲食也是一種健康的代表，許多人經常用速食來解決三餐，忽略了營養均衡的重要。</p>
                <p>Healthy Diet 屬於輕食文化，採用低鹽低鈉少油，主餐以少量的肉類搭配大量的新鮮蔬果，降低消費者對身體的負擔，注重消費者能夠吃得健康又安心。</p>
              </div>
              <RouterLink to="/about" class="inline-block mt-8">
                <button class="px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg">
                  了解更多
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Features (嚴選) -->
      <section class="py-24 bg-[#F5F7F2]">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Our Promise</span>
            <h2 class="font-display text-4xl lg:text-5xl font-semibold text-text mt-3">嚴選好食材</h2>
            <p class="text-text-light mt-4 max-w-lg mx-auto text-sm">用心對待每份產品，堅持最高品質標準</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group" data-aos="fade-up" data-aos-delay="0">
              <div class="w-16 h-16 rounded-2xl bg-primary-light/15 flex items-center justify-center mb-6 group-hover:bg-primary-light/25 transition-colors">
                <i class="fa-solid fa-seedling text-2xl text-primary"></i>
              </div>
              <h3 class="text-xl font-bold text-text mb-3">在地食材</h3>
              <p class="text-text-light text-sm leading-relaxed">和小農們合作，使用當地、當季的蔬菜，讓消費者吃進肚的更加天然、健康、有機，實踐「吃當季、買在地」。</p>
            </div>

            <!-- Feature 2 -->
            <div class="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group" data-aos="fade-up" data-aos-delay="150">
              <div class="w-16 h-16 rounded-2xl bg-primary-light/15 flex items-center justify-center mb-6 group-hover:bg-primary-light/25 transition-colors">
                <i class="fa-solid fa-leaf text-2xl text-primary"></i>
              </div>
              <h3 class="text-xl font-bold text-text mb-3">天然無添加</h3>
              <p class="text-text-light text-sm leading-relaxed">不做多餘的調味，保留食材本身的鮮與甜，讓您一口就能吃出食物的「美」，吃得健康、吃得安心。</p>
            </div>

            <!-- Feature 3 -->
            <div class="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group" data-aos="fade-up" data-aos-delay="300">
              <div class="w-16 h-16 rounded-2xl bg-primary-light/15 flex items-center justify-center mb-6 group-hover:bg-primary-light/25 transition-colors">
                <i class="fa-solid fa-truck-fast text-2xl text-primary"></i>
              </div>
              <h3 class="text-xl font-bold text-text mb-3">新鮮直送</h3>
              <p class="text-text-light text-sm leading-relaxed">每份餐點都是當日限量，配上專業的冷凍物流，讓您吃到當日最新鮮的食物，消費者吃得安心是對我們最大的鼓勵。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Product Categories -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Categories</span>
            <h2 class="font-display text-4xl lg:text-5xl font-semibold text-text mt-3">探索美味</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Category: 健康餐盒 -->
            <div
              class="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-500"
              data-aos="fade-up" data-aos-delay="0"
              @click="toCategory('健康餐盒')"
            >
              <img
                src="https://images.unsplash.com/photo-1570078420152-d016091ec97a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <h3 class="font-brand text-3xl text-white font-bold mb-1 tracking-wide">Bento</h3>
                <p class="font-mono text-white/70 text-[11px] tracking-wider uppercase">健康餐盒</p>
                <p class="text-white/60 text-sm mt-2 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                  每天都拿不定主意吃什麼嗎？請交給 Healthy Diet 幫您備餐
                </p>
              </div>
            </div>

            <!-- Category: 舒肥系列 -->
            <div
              class="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-500"
              data-aos="fade-up" data-aos-delay="150"
              @click="toCategory('舒肥系列')"
            >
              <img
                src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/H5qxPcglJ1S9RagBQnAT7pKkMgbFlgu7BRyydNvHaPhVkTnuXG6NLduRdk3zsHrfOKTpUzN2rCye7HTKc3JOkCBTe4XiX3fasKdKaM00jWOjiPcvPbxA8IXlPm1RleCK.jpg"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <h3 class="font-brand text-3xl text-white font-bold mb-1 tracking-wide">Sous Vide</h3>
                <p class="font-mono text-white/70 text-[11px] tracking-wider uppercase">舒肥系列</p>
                <p class="text-white/60 text-sm mt-2 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                  多種口味任你挑，輕鬆補足蛋白質，低熱量無負擔
                </p>
              </div>
            </div>

            <!-- Category: 新鮮沙拉 -->
            <div
              class="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-500"
              data-aos="fade-up" data-aos-delay="300"
              @click="toCategory('新鮮沙拉')"
            >
              <img
                src="https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <h3 class="font-brand text-3xl text-white font-bold mb-1 tracking-wide">Salad</h3>
                <p class="font-mono text-white/70 text-[11px] tracking-wider uppercase">新鮮沙拉</p>
                <p class="text-white/60 text-sm mt-2 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                  豐富萵苣、蘿蔓與蔬果，品嚐生菜的鮮甜爽脆
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Popular Products -->
      <section v-if="productsStore.products.length" class="py-24 bg-[#F5F7F2]">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Best Sellers</span>
            <h2 class="font-display text-4xl lg:text-5xl font-semibold text-text mt-3">人氣推薦</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="item in productsStore.products.slice(0, 4)"
              :key="item.id"
              class="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
            >
              <RouterLink :to="`/product/${item.id}`" class="block">
                <div class="relative aspect-square overflow-hidden">
                  <img
                    :src="item.imageUrl[0]"
                    :alt="item.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span class="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                      查看詳情
                    </span>
                  </div>
                </div>
              </RouterLink>
              <div class="p-5">
                <h4 class="font-bold text-text mb-2 truncate">{{ item.title }}</h4>
                <div class="flex items-center justify-between">
                  <div>
                    <span v-if="item.price" class="font-mono text-lg font-bold text-contrast">{{ formatMoney(item.price) }}</span>
                    <span v-else class="font-mono text-lg font-bold text-contrast">{{ formatMoney(item.origin_price) }}</span>
                  </div>
                  <button
                    class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors duration-200"
                    @click.prevent="addToCart(item.id)"
                  >
                    <i class="fa-solid fa-plus text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mt-12">
            <RouterLink to="/products">
              <button class="px-10 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300">
                查看全部商品
              </button>
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- Section 6: Testimonials -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Testimonials</span>
            <h2 class="font-display text-4xl lg:text-5xl font-semibold text-text mt-3">顧客好評</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="(t, i) in testimonials"
              :key="i"
              class="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
              data-aos="fade-up"
              :data-aos-delay="i * 150"
            >
              <div class="flex items-center gap-1 mb-4">
                <i v-for="s in t.rating" :key="s" class="fa-solid fa-star text-secondary text-sm"></i>
              </div>
              <div class="relative mb-6">
                <i class="fa-solid fa-quote-left text-3xl text-primary-light/20 absolute -top-2 -left-1"></i>
                <p class="text-text-light leading-relaxed pl-6">{{ t.text }}</p>
              </div>
              <div class="flex items-center gap-3 pt-4 border-t border-bg-dark/50">
                <div class="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center text-primary font-bold text-sm">
                  {{ t.avatar }}
                </div>
                <div>
                  <div class="font-bold text-text text-sm">{{ t.name }}</div>
                  <div class="text-text-light text-xs">{{ t.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 7: Newsletter -->
      <section class="py-24 bg-primary-dark relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-10 left-10 w-40 h-40 rounded-full border border-white/30"></div>
          <div class="absolute bottom-10 right-10 w-60 h-60 rounded-full border border-white/20"></div>
        </div>
        <div class="container mx-auto px-6 relative z-10">
          <div class="max-w-2xl mx-auto text-center">
            <span class="font-mono text-white/40 text-[11px] tracking-[0.25em] uppercase block mb-3">Newsletter</span>
            <h2 class="font-display text-4xl lg:text-5xl font-semibold text-white mb-4">訂閱我們</h2>
            <p class="text-white/60 mb-8 text-sm">獲得最新消息、獨家優惠與健康飲食小知識</p>
            <div class="flex max-sm:flex-col gap-3 max-w-lg mx-auto">
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
      </section>
    </div>

    <!-- Section 8: Footer -->
    <Footer />
  </div>
</template>
