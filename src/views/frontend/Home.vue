<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore, useCartStore } from '@/stores'
import { formatMoney } from '@/utils'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Banner from '@/components/frontend/Banner.vue'
import { testimonials } from '@/data/testimonials'
import { categories } from '@/data/categories'

const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const email = ref('')
const swiperModules = [Autoplay]
const [featuredTestimonial, ...restTestimonials] = testimonials

const featuredProduct = computed(() => productsStore.products[0])
const sideProducts = computed(() => productsStore.products.slice(1, 3))

const toCategory = (category: string) => {
  router.push({ name: 'products', query: { category } })
}

const addToCart = (id: string) => {
  cartStore.addToCart(id)
}

onMounted(async () => {
  await productsStore.getProducts(1)
})
</script>

<template>
  <!-- Section 1: Hero Banner -->
  <Banner
    page-name="Healthy Diet"
    content="發現蔬食最新鮮純淨的美味"
    bg-image="https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
  />

  <!-- Section 2: Popular Products -->
  <section v-if="featuredProduct" class="bg-white py-20">
    <div class="container mx-auto px-6">
      <div class="mb-12 flex items-end justify-between">
        <div>
          <span class="label-text text-secondary font-medium">Best Sellers</span>
          <h2 class="font-display text-text mt-3 text-4xl font-semibold lg:text-5xl">人氣推薦</h2>
        </div>
        <RouterLink
          to="/products"
          class="border-primary text-primary hover:bg-primary rounded-xl border-2 px-8 py-3 text-sm font-medium transition-all duration-300 hover:text-white max-sm:hidden"
        >
          查看全部 <i class="fa-solid fa-arrow-right ml-2 text-xs"></i>
        </RouterLink>
      </div>

      <div class="flex gap-6 max-lg:flex-col">
        <!-- Left -->
        <div class="group lg:w-3/5">
          <div
            class="shadow-card group-hover:shadow-card-hover relative h-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-500"
          >
            <RouterLink :to="`/product/${featuredProduct.id}`" class="block h-full">
              <img
                :src="featuredProduct.imageUrl[0]"
                :alt="featuredProduct.title"
                class="min-h-about-lg h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
              />
              <div class="absolute right-0 bottom-0 left-0 p-8">
                <span
                  class="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {{ featuredProduct.category }}
                </span>
                <h3 class="font-brand mb-2 text-2xl font-bold text-white lg:text-3xl">
                  {{ featuredProduct.title }}
                </h3>
                <div class="flex items-center gap-4">
                  <span class="font-mono text-2xl font-bold text-white">{{
                    formatMoney(featuredProduct.price || featuredProduct.origin_price)
                  }}</span>
                  <span
                    v-if="featuredProduct.price"
                    class="font-mono text-sm text-white/50 line-through"
                    >{{ formatMoney(featuredProduct.origin_price) }}</span
                  >
                </div>
              </div>
            </RouterLink>
            <button
              class="hover:bg-primary absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300"
              @click.prevent="addToCart(featuredProduct.id)"
            >
              <i class="fa-solid fa-cart-plus text-sm"></i>
            </button>
          </div>
        </div>
        <!-- Right -->
        <div class="flex flex-col gap-6 lg:w-2/5">
          <div v-for="item in sideProducts" :key="item.id" class="group flex-1">
            <div
              class="shadow-card group-hover:shadow-card-hover flex h-full cursor-pointer overflow-hidden rounded-2xl bg-white transition-all duration-500 group-hover:-translate-y-1 max-sm:flex-col sm:flex-row"
            >
              <RouterLink :to="`/product/${item.id}`" class="shrink-0 sm:w-2/5">
                <div class="relative aspect-4/3 overflow-hidden sm:aspect-auto sm:h-full">
                  <img
                    :src="item.imageUrl[0]"
                    :alt="item.title"
                    class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    class="text-text absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-sm"
                  >
                    {{ item.category }}
                  </span>
                </div>
              </RouterLink>
              <div class="flex flex-col justify-center p-5">
                <h4 class="text-text mb-2 text-base font-bold">{{ item.title }}</h4>
                <div class="mb-4 flex items-baseline gap-2">
                  <span class="text-primary-dark font-mono text-xl font-bold">{{
                    formatMoney(item.price || item.origin_price)
                  }}</span>
                  <span
                    v-if="item.price"
                    class="text-text-light/60 font-mono text-xs line-through"
                    >{{ formatMoney(item.origin_price) }}</span
                  >
                  <span
                    v-if="item.price"
                    class="bg-contrast/10 text-contrast rounded-full px-2 py-0.5 text-xs font-bold"
                  >
                    {{ Math.round((1 - item.price / item.origin_price) * 100) }}% OFF
                  </span>
                </div>
                <button
                  class="bg-primary/10 text-primary hover:bg-primary self-start rounded-lg px-5 py-2 text-sm font-medium transition-all duration-300 hover:text-white"
                  @click.prevent="addToCart(item.id)"
                >
                  <i class="fa-solid fa-cart-plus mr-1.5 text-xs"></i>加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile CTA -->
      <div class="mt-10 text-center sm:hidden">
        <RouterLink
          to="/products"
          class="border-primary text-primary hover:bg-primary rounded-xl border-2 px-10 py-3 text-sm font-medium transition-all duration-300 hover:text-white"
        >
          查看全部商品
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Section 3: Categories -->
  <section class="bg-bg-light py-20">
    <div class="container mx-auto px-6">
      <div class="flex items-center gap-12 max-lg:flex-col lg:gap-16">
        <!-- Left: title + description -->
        <div class="shrink-0 lg:w-3/10">
          <span class="label-text text-secondary font-medium">Categories</span>
          <h2
            class="font-display text-text mt-3 mb-6 text-4xl leading-tight font-semibold lg:text-5xl"
          >
            探索<br class="max-lg:hidden" />美味
          </h2>
          <p class="text-text-light text-base leading-relaxed">
            從健康餐盒到新鮮沙拉，每一口都是對身體的溫柔呵護。
          </p>
          <div class="bg-primary-light/40 mt-6 h-1 w-16 rounded-full"></div>
        </div>
        <!-- Right: category cards -->
        <div class="grid gap-5 sm:grid-cols-3 lg:w-7/10">
          <div
            v-for="cat in categories"
            :key="cat.name"
            class="group shadow-card hover:shadow-card-hover relative aspect-3/4 cursor-pointer overflow-hidden rounded-2xl transition-all duration-500"
            :class="{ 'sm:-mt-6': cat.offset }"
            @click="toCategory(cat.name)"
          >
            <img
              :src="cat.image"
              :alt="cat.name"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
            />
            <div class="absolute right-0 bottom-0 left-0 p-6">
              <h3 class="font-brand mb-1 text-2xl font-bold tracking-wide text-white">
                {{ cat.label }}
              </h3>
              <p class="font-mono text-xs tracking-wider text-white/70 uppercase">{{ cat.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 4: About Us + Features -->
  <section class="overflow-hidden bg-white py-20">
    <div class="container mx-auto px-6">
      <!-- Upper: image + floating card -->
      <div class="relative lg:flex lg:min-h-120 lg:items-center">
        <div class="lg:-ml-12 lg:w-13/20">
          <img
            src="https://images.unsplash.com/photo-1595786802424-d6efbc413db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
            class="h-80 w-full rounded-2xl object-cover lg:h-120"
            alt="About us"
          />
        </div>
        <div
          class="relative max-lg:mt-8 lg:absolute lg:top-1/2 lg:right-0 lg:w-9/20 lg:-translate-y-1/2"
        >
          <div class="shadow-card-hover rounded-2xl bg-white p-8 lg:p-10">
            <span class="label-text text-secondary font-medium">About Us</span>
            <h2
              class="font-display text-text mt-3 mb-6 text-3xl leading-tight font-semibold lg:text-4xl"
            >
              用心做好<br />每一份餐點
            </h2>
            <div class="text-text-light space-y-4 text-base leading-relaxed">
              <p>
                在生活步調快速的現代，忙於課業、工作及娛樂上，飲食也是一種健康的代表，許多人經常用速食來解決三餐，忽略了營養均衡的重要。
              </p>
              <p>
                Healthy Diet
                屬於輕食文化，採用低鹽低鈉少油，主餐以少量的肉類搭配大量的新鮮蔬果，降低消費者對身體的負擔，注重消費者能夠吃得健康又安心。
              </p>
            </div>
            <RouterLink
              to="/about"
              class="bg-primary hover:bg-primary-dark mt-8 inline-block rounded-xl px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg"
            >
              了解更多
            </RouterLink>
          </div>
        </div>
      </div>
      <!-- Lower: 3 feature icons row -->
      <div class="border-bg-dark/40 mt-16 grid gap-6 border-t pt-16 md:grid-cols-3 lg:mt-20">
        <div class="flex items-start gap-5">
          <div
            class="bg-primary-light/15 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
          >
            <i class="fa-solid fa-seedling text-primary text-xl"></i>
          </div>
          <div>
            <h3 class="text-text mb-1.5 font-bold">在地食材</h3>
            <p class="text-text-light text-base leading-relaxed">
              和小農合作，使用當地、當季蔬菜，實踐「吃當季、買在地」。
            </p>
          </div>
        </div>
        <div class="flex items-start gap-5">
          <div
            class="bg-primary-light/15 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
          >
            <i class="fa-solid fa-leaf text-primary text-xl"></i>
          </div>
          <div>
            <h3 class="text-text mb-1.5 font-bold">天然無添加</h3>
            <p class="text-text-light text-base leading-relaxed">
              不做多餘調味，保留食材本身的鮮與甜，吃得健康安心。
            </p>
          </div>
        </div>
        <div class="flex items-start gap-5">
          <div
            class="bg-primary-light/15 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
          >
            <i class="fa-solid fa-truck-fast text-primary text-xl"></i>
          </div>
          <div>
            <h3 class="text-text mb-1.5 font-bold">新鮮直送</h3>
            <p class="text-text-light text-base leading-relaxed">
              當日限量製作，專業冷凍物流配送，確保最新鮮品質。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 5: Testimonials -->
  <section class="bg-bg-light overflow-hidden py-20">
    <div class="container mx-auto px-6">
      <div class="flex gap-12 max-lg:flex-col lg:gap-0">
        <!-- Left: featured quote (40%) -->
        <div class="border-bg-dark/40 lg:w-2/5 lg:border-r lg:pr-12">
          <span class="label-text text-secondary font-medium">Testimonials</span>
          <h2 class="font-display text-text mt-3 mb-8 text-4xl font-semibold lg:text-5xl">
            顧客好評
          </h2>
          <div class="relative">
            <i
              class="fa-solid fa-quote-left text-primary-light/15 absolute -top-4 -left-2 text-6xl"
              aria-hidden="true"
            ></i>
            <p class="text-text pl-4 text-xl leading-relaxed font-light lg:text-2xl">
              {{ featuredTestimonial.text }}
            </p>
          </div>
          <div class="mt-8 flex items-center gap-4">
            <div
              class="bg-primary-light/20 text-primary flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold"
            >
              {{ featuredTestimonial.avatar }}
            </div>
            <div>
              <div class="text-text text-base font-bold">{{ featuredTestimonial.name }}</div>
              <div class="text-text-light text-sm">{{ featuredTestimonial.role }}</div>
            </div>
            <div class="ml-auto flex items-center gap-0.5">
              <i
                v-for="s in featuredTestimonial.rating"
                :key="s"
                class="fa-solid fa-star text-secondary text-sm"
              ></i>
            </div>
          </div>
        </div>
        <!-- Right: swiper carousel (60%) -->
        <div class="min-w-0 lg:w-3/5 lg:pl-12">
          <div class="overflow-hidden py-4">
            <Swiper
              :modules="swiperModules"
              :slides-per-view="1"
              :space-between="24"
              :loop="true"
              :speed="800"
              :allow-touch-move="false"
              :simulate-touch="false"
              :autoplay="{ delay: 3500, disableOnInteraction: false }"
              :breakpoints="{ 1024: { slidesPerView: 2 } }"
            >
              <SwiperSlide v-for="(t, i) in restTestimonials" :key="i">
                <div class="bg-bg-light h-full rounded-2xl p-8">
                  <div class="mb-4 flex items-center gap-1">
                    <i
                      v-for="s in t.rating"
                      :key="s"
                      class="fa-solid fa-star text-secondary text-sm"
                    ></i>
                    <i
                      v-for="s in 5 - t.rating"
                      :key="'e' + s"
                      class="fa-regular fa-star text-secondary/30 text-sm"
                    ></i>
                  </div>
                  <div class="relative mb-6">
                    <i
                      class="fa-solid fa-quote-left text-primary-light/20 absolute -top-1 -left-1 text-2xl"
                      aria-hidden="true"
                    ></i>
                    <p class="text-text-light pl-6 text-base leading-relaxed">{{ t.text }}</p>
                  </div>
                  <div class="border-primary-light/10 flex items-center gap-3 border-t pt-4">
                    <div
                      class="bg-primary-light/20 text-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                    >
                      {{ t.avatar }}
                    </div>
                    <div>
                      <div class="text-text text-base font-bold">{{ t.name }}</div>
                      <div class="text-text-light text-sm">{{ t.role }}</div>
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

  <!-- Section 6: Newsletter -->
  <section class="bg-primary-dark clip-diagonal relative overflow-hidden pt-32 pb-24">
    <div class="relative z-10 container mx-auto px-6">
      <div class="flex items-center gap-12 max-lg:flex-col lg:gap-20">
        <!-- Left: decorative large text -->
        <div class="max-lg:text-center lg:w-9/20">
          <span
            class="font-brand text-7.5xl lg:text-12xl block leading-none font-bold text-white/5 select-none md:text-9xl"
            aria-hidden="true"
          >
            Fresh
          </span>
          <p class="-mt-8 text-sm text-white/50 max-lg:text-center lg:-mt-12">自然 · 新鮮 · 健康</p>
        </div>
        <!-- Right: title + form -->
        <div class="lg:w-11/20">
          <span class="label-text mb-3 block text-white/40">Newsletter</span>
          <h2 class="font-display mb-4 text-4xl font-semibold text-white lg:text-5xl">訂閱我們</h2>
          <p class="mb-8 text-base text-white/60">獲得最新消息、獨家優惠與健康飲食小知識</p>
          <div class="flex max-w-lg gap-3 max-sm:flex-col">
            <input
              v-model="email"
              type="email"
              class="focus:border-primary-light focus:ring-primary-light flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:ring-1 focus:outline-none"
              placeholder="請輸入您的電子信箱"
            />
            <button
              type="button"
              class="bg-contrast hover:bg-contrast/90 rounded-xl px-8 py-3.5 text-sm font-medium whitespace-nowrap text-white transition-colors"
            >
              立即訂閱
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Background decorative elements -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="absolute top-20 right-20 h-40 w-40 rounded-full border border-white/10 max-lg:hidden"
      ></div>
      <div
        class="absolute bottom-16 left-16 h-24 w-24 rounded-full border border-white/5 max-lg:hidden"
      ></div>
    </div>
  </section>
</template>
