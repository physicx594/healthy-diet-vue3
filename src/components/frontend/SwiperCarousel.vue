<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { productsApi } from '@/api'
import { formatMoney } from '@/utils'
import type { Product } from '@/types'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const randomItems = ref<Product[]>([])

const modules = [Navigation, Pagination, Autoplay]

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
    class="my-8 pb-14 relative"
    :modules="modules"
    :speed="1500"
    :slides-per-view="4"
    :space-between="20"
    :slides-per-group="1"
    :loop="true"
    :pagination="{ clickable: true, dynamicBullets: true }"
    :navigation="true"
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
              {{ item.price ? formatMoney(item.price) : formatMoney(item.origin_price) }}
            </span>
          </div>
        </div>
      </RouterLink>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

:deep(.swiper-button-prev):hover,
:deep(.swiper-button-next):hover {
  transform: scale(1.1);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.swiper-button-prev)::after,
:deep(.swiper-button-next)::after {
  font-size: 0.875rem;
  font-weight: bold;
  color: var(--color-primary);
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--color-primary);
}
</style>
