<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { productsApi } from '@/api'
import { formatMoney } from '@/utils'
import type { Product } from '@/types'
import 'swiper/css'

const randomItems = ref<Product[]>([])

const modules = [Autoplay]

onMounted(async () => {
  const res = await productsApi.getAllProducts()
  const products = res.data.products
  randomItems.value = products
    .sort(() => Math.random() - 0.5)
    .slice(0, 8)
})
</script>

<template>
  <Swiper
    class="my-8 relative"
    :modules="modules"
    :speed="1500"
    :slides-per-view="4"
    :space-between="20"
    :slides-per-group="1"
    :loop="true"
    :autoplay="{ delay: 3000 }"
    :breakpoints="{
      320: { slidesPerView: 1, spaceBetween: 16 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 24 }
    }"
  >
    <SwiperSlide v-for="(item, index) in randomItems" :key="index">
      <RouterLink :to="`/product/${item.id}`" class="block group">
        <div class="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
          <div class="aspect-square overflow-hidden">
            <img
              :src="item.imageUrl[0]"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              :alt="item.title"
            />
          </div>
          <div class="p-4">
            <h5 class="font-bold text-text text-sm truncate mb-1">{{ item.title }}</h5>
            <span class="font-mono text-contrast font-bold text-sm">
              {{ formatMoney(item.price || item.origin_price) }}
            </span>
          </div>
        </div>
      </RouterLink>
    </SwiperSlide>
  </Swiper>
</template>

