<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="bg-bg-light/98 text-sm text-gray-400 py-1">
    <div class="container mx-auto px-4 text-left">
      <RouterLink to="/" class="text-inherit hover:text-primary after:content-['_/_']">首頁</RouterLink>
      <RouterLink to="/products" class="text-inherit hover:text-primary after:content-['_/_']">全部商品</RouterLink>
      <span class="text-contrast font-bold">{{ product.title }}</span>
    </div>
  </div>
</template>
