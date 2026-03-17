<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores'
import { productsApi } from '@/api'
import { formatMoney } from '@/utils'
import type { Product } from '@/types'
import Breadcrumb from '@/components/frontend/Breadcrumb.vue'
import SwiperCarousel from '@/components/frontend/SwiperCarousel.vue'

const route = useRoute()
const cartStore = useCartStore()

const tempProduct = ref<Product & { quantity: number }>({
  id: '',
  title: '',
  category: '',
  content: '',
  description: '',
  imageUrl: [],
  is_enabled: 0,
  origin_price: 0,
  price: 0,
  unit: '',
  quantity: 1
})
const selectPic = ref('')
const activeImageIndex = ref(0)

const discountPercent = computed(() => {
  const { origin_price, price } = tempProduct.value
  if (!price || price >= origin_price) return 0
  return Math.round(((origin_price - price) / origin_price) * 100)
})

const promoBadges = [
  { icon: 'fa-solid fa-tag', html: '雙十節 9 折優惠碼：<span class="text-contrast font-bold">taiwan1010</span>' },
  { icon: 'fa-solid fa-truck', html: '全館滿 <span class="text-contrast font-bold">3,000 免運費</span>' },
  { icon: 'fa-solid fa-shield-halved', html: '安心食材，<span class="text-primary font-medium">產地直送</span>' },
]

const addToCart = () => {
  cartStore.addToCart(tempProduct.value.id, tempProduct.value.quantity)
}

onMounted(async () => {
  const { id } = route.params
  const res = await productsApi.getOne(id as string)
  tempProduct.value = { ...res.data.product, quantity: 1 }
  selectPic.value = tempProduct.value.imageUrl[0] ?? ''
})
</script>

<template>
  <div>
    <div class="pt-16">
      <Breadcrumb :product="tempProduct" />

      <!-- Product Hero Section -->
      <section class="bg-white">
        <div class="max-w-7xl mx-auto px-6 py-10 lg:py-14">
          <div class="flex max-lg:flex-col gap-10 lg:gap-16">

            <!-- Gallery -->
            <div class="lg:w-7/12">
              <div class="flex max-sm:flex-col-reverse gap-4">
                <!-- Thumbnails (vertical strip) -->
                <div class="flex sm:flex-col gap-2.5 sm:w-20 shrink-0 max-sm:justify-start overflow-x-auto sm:overflow-y-auto sm:max-h-gallery scrollbar-hide">
                  <button
                    v-for="(img, index) in tempProduct.imageUrl"
                    :key="tempProduct.id + index"
                    class="relative w-16 h-16 sm:w-full sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 cursor-pointer"
                    :class="activeImageIndex === index
                      ? 'border-primary shadow-md ring-2 ring-primary/20'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-bg-dark'"
                    @click="selectPic = img; activeImageIndex = index"
                  >
                    <img :src="img" class="w-full h-full object-cover" :alt="`${tempProduct.title} 縮圖 ${index + 1}`" />
                  </button>
                </div>

                <!-- Main Image -->
                <div class="flex-1 relative group">
                  <div class="relative rounded-2xl overflow-hidden bg-bg-light">
                    <div class="aspect-3/4 sm:aspect-4/3 lg:aspect-auto lg:h-gallery">
                      <Transition name="gallery-fade" mode="out-in">
                        <img
                          :key="selectPic"
                          :src="selectPic"
                          :alt="tempProduct.title"
                          class="w-full h-full object-cover object-center"
                        />
                      </Transition>
                    </div>
                    <!-- Zoom hint overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <!-- Discount badge -->
                    <div v-if="discountPercent > 0" class="absolute top-4 left-4 flex items-center gap-1.5 bg-contrast text-white text-sm font-bold px-3.5 py-1.5 rounded-xl shadow-lg">
                      <i class="fa-solid fa-tag text-xs"></i>
                      -{{ discountPercent }}%
                    </div>
                    <!-- Image counter -->
                    <div v-if="tempProduct.imageUrl.length > 1" class="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-mono px-3 py-1.5 rounded-lg">
                      {{ activeImageIndex + 1 }} / {{ tempProduct.imageUrl.length }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div class="lg:w-5/12">
              <div class="flex flex-col h-full lg:sticky lg:top-24">
                <!-- Category -->
                <div class="flex items-center gap-3 mb-5">
                  <span class="label-text text-primary/70">{{ tempProduct.category }}</span>
                  <span class="w-8 h-px bg-primary/20"></span>
                </div>

                <!-- Title -->
                <h1 class="font-display text-3xl lg:text-4xl font-semibold text-text leading-snug mb-6">
                  {{ tempProduct.title }}
                </h1>

                <!-- Price Block -->
                <div class="mb-8">
                  <div v-if="tempProduct.price" class="flex items-baseline gap-4">
                    <span class="font-mono text-3xl font-bold text-contrast tracking-tight">{{ formatMoney(tempProduct.price) }}</span>
                    <span class="text-text-light/50 line-through text-base font-mono">{{ formatMoney(tempProduct.origin_price) }}</span>
                  </div>
                  <div v-else>
                    <span class="font-mono text-3xl font-bold text-text tracking-tight">{{ formatMoney(tempProduct.origin_price) }}</span>
                  </div>
                  <p class="text-text-light/60 text-xs mt-2">/ {{ tempProduct.unit }}</p>
                </div>

                <!-- Content / Short description -->
                <p v-if="tempProduct.content" class="text-text-light leading-relaxed text-sm mb-8">
                  {{ tempProduct.content }}
                </p>

                <!-- Divider -->
                <div class="border-t border-bg-dark/60 mb-8"></div>

                <!-- Promo Badges -->
                <div class="space-y-3 mb-8">
                  <div v-for="badge in promoBadges" :key="badge.icon" class="flex items-center gap-3 text-sm text-text-light">
                    <div class="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <i :class="badge.icon" class="text-secondary text-xs"></i>
                    </div>
                    <span v-html="badge.html" />
                  </div>
                </div>

                <!-- Quantity + Add to Cart -->
                <div class="flex items-center gap-3 mt-auto">
                  <div class="flex items-center bg-bg-light rounded-xl overflow-hidden">
                    <button
                      type="button"
                      class="w-12 h-12 flex items-center justify-center text-text-light hover:text-primary hover:bg-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      :disabled="tempProduct.quantity <= 1"
                      @click="tempProduct.quantity--"
                      aria-label="減少數量"
                    >
                      <i class="fa-solid fa-minus text-xs"></i>
                    </button>
                    <span class="w-10 text-center font-mono font-bold text-base text-text select-none">{{ tempProduct.quantity }}</span>
                    <button
                      type="button"
                      class="w-12 h-12 flex items-center justify-center text-text-light hover:text-primary hover:bg-white transition-colors cursor-pointer"
                      @click="tempProduct.quantity++"
                      aria-label="增加數量"
                    >
                      <i class="fa-solid fa-plus text-xs"></i>
                    </button>
                  </div>
                  <button
                    type="button"
                    class="flex-1 h-12 rounded-xl bg-primary text-white font-medium tracking-wide transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
                    @click="addToCart"
                  >
                    <i class="fa-solid fa-bag-shopping text-sm"></i>
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Description Section -->
      <section class="bg-bg-light">
        <div class="max-w-7xl mx-auto px-6 py-14">
          <div class="max-w-3xl">
            <!-- Section Label -->
            <div class="flex items-center gap-4 mb-8">
              <span class="label-text text-text-light/50">商品描述</span>
              <span class="flex-1 h-px bg-bg-dark"></span>
            </div>
            <!-- Description content -->
            <div class="text-text-light leading-loose whitespace-pre-wrap text-sm">
              {{ tempProduct.description }}
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section class="bg-white">
        <div class="max-w-7xl mx-auto px-6 py-14">
          <div class="flex items-center gap-4 mb-8">
            <span class="label-text text-text-light/50">你可能會喜歡</span>
            <span class="flex-1 h-px bg-bg-dark"></span>
          </div>
          <SwiperCarousel />
        </div>
      </section>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div
        v-if="cartStore.openMsg"
        class="fixed top-24 right-4 px-5 py-3 rounded-xl text-white text-sm shadow-lg z-cart flex items-center gap-3"
        :class="cartStore.joinMsg ? 'bg-primary' : 'bg-contrast'"
      >
        <i :class="cartStore.joinMsg ? 'fa-solid fa-check-circle' : 'fa-solid fa-info-circle'"></i>
        <span v-if="cartStore.joinMsg">成功加入購物車</span>
        <span v-else>該商品已在購物車中，請至購物車修改數量。</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Gallery image crossfade */
.gallery-fade-enter-active {
  transition: opacity 0.3s ease;
}
.gallery-fade-leave-active {
  transition: opacity 0.15s ease;
}
.gallery-fade-enter-from,
.gallery-fade-leave-to {
  opacity: 0;
}

</style>
