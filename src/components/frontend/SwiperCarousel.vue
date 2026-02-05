<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { productsApi } from '@/api'
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
    class="my-5 pb-12 relative"
    :modules="modules"
    :speed="1500"
    :slides-per-view="4"
    :space-between="0"
    :slides-per-group="1"
    :loop="true"
    :pagination="{ clickable: true, dynamicBullets: true }"
    :navigation="true"
    :autoplay="{ delay: 3000 }"
    :breakpoints="{
      320: { slidesPerView: 1, spaceBetween: 10 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 0 },
      1024: { slidesPerView: 4, spaceBetween: 0 }
    }"
  >
    <SwiperSlide v-for="(item, index) in randomItems" :key="index">
      <figure class="w-full max-w-[200px] max-h-[200px] rounded-full overflow-hidden mx-auto cursor-pointer aspect-square">
        <img :src="item.imageUrl[0]" class="w-full h-full object-cover" :alt="item.title" />
      </figure>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #fff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  opacity: 0.8;
  transition: 0.25s ease-in-out;
}

:deep(.swiper-button-prev):hover,
:deep(.swiper-button-next):hover {
  transform: scale(1.2);
  opacity: 1;
}

:deep(.swiper-button-prev)::after,
:deep(.swiper-button-next)::after {
  font-size: 1rem;
  color: #264710;
}

:deep(.swiper-pagination-bullet-active) {
  background: #264710;
}
</style>
