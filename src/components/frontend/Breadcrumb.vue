<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="bg-white/80 backdrop-blur-sm text-sm py-3 border-b border-bg-dark/30">
    <div class="container mx-auto px-6 flex items-center gap-2 text-text-light">
      <RouterLink to="/" class="hover:text-primary transition-colors">
        <i class="fa-solid fa-house text-xs"></i>
        <span class="ml-1">首頁</span>
      </RouterLink>
      <i class="fa-solid fa-chevron-right text-[10px] text-text-light/50"></i>
      <RouterLink to="/products" class="hover:text-primary transition-colors">全部商品</RouterLink>
      <i class="fa-solid fa-chevron-right text-[10px] text-text-light/50"></i>
      <span class="text-primary font-medium">{{ product.title }}</span>
    </div>
  </div>
</template>
