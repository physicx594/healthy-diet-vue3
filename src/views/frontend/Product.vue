<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore, useLoadingStore } from '@/stores'
import { productsApi } from '@/api'
import { formatMoney } from '@/utils'
import type { Product } from '@/types'
import Navbar from '@/components/frontend/Navbar.vue'
import Footer from '@/components/frontend/Footer.vue'
import Breadcrumb from '@/components/frontend/Breadcrumb.vue'
import SwiperCarousel from '@/components/frontend/SwiperCarousel.vue'

const route = useRoute()
const cartStore = useCartStore()
const loadingStore = useLoadingStore()

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

const addToCart = () => {
  cartStore.addToCart(tempProduct.value.id, tempProduct.value.quantity)
}

onMounted(async () => {
  loadingStore.setLoading(true)
  const { id } = route.params
  const res = await productsApi.getOne(id as string)
  tempProduct.value = { ...res.data.product, quantity: 1 }
  selectPic.value = tempProduct.value.imageUrl[0] ?? ''
  loadingStore.setLoading(false)
})
</script>

<template>
  <div class="min-h-screen bg-bg-light">
    <Navbar />
    <div class="pt-16">
      <Breadcrumb :product="tempProduct" />

      <div class="container mx-auto px-6 py-12">
        <!-- Product Main -->
        <div class="flex max-lg:flex-col gap-10 lg:gap-16">
          <!-- Images -->
          <div class="lg:w-7/12">
            <div class="bg-white rounded-2xl overflow-hidden shadow-card">
              <img :src="selectPic" class="w-full h-[500px] max-lg:h-[350px] object-cover object-center" :alt="tempProduct.title" />
            </div>
            <!-- Thumbnails -->
            <div class="flex gap-3 mt-4">
              <button
                v-for="(img, key) in tempProduct.imageUrl"
                :key="tempProduct.id + key"
                class="w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0"
                :class="selectPic === img ? 'border-primary shadow-md' : 'border-transparent opacity-70 hover:opacity-100'"
                @click="selectPic = img"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="lg:w-5/12">
            <div class="flex flex-col h-full">
              <!-- Category badge -->
              <span class="inline-block w-fit px-3 py-1 rounded-full bg-bg-dark text-text-light text-xs font-medium mb-4">
                {{ tempProduct.category }}
              </span>

              <!-- Title -->
              <h1 class="font-display text-3xl lg:text-4xl font-semibold text-text mb-6">{{ tempProduct.title }}</h1>

              <!-- Price -->
              <div class="mb-6">
                <div v-if="tempProduct.price" class="flex items-baseline gap-3">
                  <span class="font-mono text-3xl font-bold text-contrast">{{ formatMoney(tempProduct.price) }}</span>
                  <span class="text-text-light line-through text-lg">{{ formatMoney(tempProduct.origin_price) }}</span>
                  <span class="px-2 py-0.5 rounded-lg bg-contrast/10 text-contrast text-xs font-bold">SALE</span>
                </div>
                <div v-else>
                  <span class="font-mono text-3xl font-bold text-text">{{ formatMoney(tempProduct.origin_price) }}</span>
                </div>
              </div>

              <!-- Content -->
              <p class="text-text-light leading-relaxed mb-6">{{ tempProduct.content }}</p>

              <!-- Promo info -->
              <div class="bg-accent/50 rounded-xl p-5 mb-8 space-y-2">
                <div class="flex items-center gap-2 text-sm">
                  <i class="fa-solid fa-tag text-secondary"></i>
                  <span>雙十節9 折優惠碼：<span class="text-contrast font-bold">taiwan1010</span></span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fa-solid fa-truck text-secondary"></i>
                  <span>全館滿 <span class="text-contrast font-bold">3,000 免運費</span></span>
                </div>
              </div>

              <!-- Quantity + Add to Cart -->
              <div class="flex items-center gap-4 mt-auto">
                <div class="flex items-center bg-white rounded-xl border border-bg-dark overflow-hidden">
                  <button
                    type="button"
                    class="w-11 h-11 flex items-center justify-center text-text-light hover:text-primary hover:bg-bg-dark transition-colors disabled:opacity-40"
                    :disabled="tempProduct.quantity === 1"
                    @click="tempProduct.quantity--"
                  >
                    <i class="fa-solid fa-minus text-xs"></i>
                  </button>
                  <span class="w-12 text-center font-mono font-bold text-lg text-text">{{ tempProduct.quantity }}</span>
                  <button
                    type="button"
                    class="w-11 h-11 flex items-center justify-center text-text-light hover:text-primary hover:bg-bg-dark transition-colors"
                    @click="tempProduct.quantity++"
                  >
                    <i class="fa-solid fa-plus text-xs"></i>
                  </button>
                </div>
                <button
                  type="button"
                  class="flex-1 h-12 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                  @click="addToCart"
                >
                  <i class="fa-solid fa-bag-shopping"></i>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Description -->
        <div class="mt-16">
          <h3 class="font-display text-2xl font-semibold text-text mb-6">商品描述</h3>
          <div class="bg-accent/30 rounded-2xl p-8 whitespace-pre-wrap text-text-light leading-relaxed">
            {{ tempProduct.description }}
          </div>
        </div>

        <!-- Related Products -->
        <div class="mt-16">
          <h3 class="font-display text-2xl font-semibold text-text mb-6">你可能會喜歡</h3>
          <SwiperCarousel />
        </div>
      </div>
    </div>

    <!-- Add to cart toast -->
    <div
      class="fixed top-24 right-4 px-5 py-3 rounded-xl text-white text-sm shadow-lg transition-all duration-500 ease-out z-cart flex items-center gap-3"
      :class="[
        cartStore.openMsg ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        cartStore.joinMsg ? 'bg-primary' : 'bg-contrast'
      ]"
    >
      <i :class="cartStore.joinMsg ? 'fa-solid fa-check-circle' : 'fa-solid fa-info-circle'"></i>
      <span v-if="cartStore.joinMsg">成功加入購物車</span>
      <span v-else>該商品已在購物車中，請至購物車修改數量。</span>
    </div>

    <Footer />
  </div>
</template>
