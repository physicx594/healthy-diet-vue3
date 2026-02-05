<script setup lang="ts">
import { onMounted } from 'vue'
import { useLoadingStore } from '@/stores'
import Navbar from '@/components/frontend/Navbar.vue'
import Footer from '@/components/frontend/Footer.vue'

const loadingStore = useLoadingStore()

onMounted(() => {
  loadingStore.setLoading(true)
  setTimeout(() => loadingStore.setLoading(false), 1000)
})
</script>

<template>
  <div class="relative h-full">
    <Navbar />
    <div
      class="w-full h-1/2 bg-cover bg-no-repeat bg-center bg-fixed"
      style="background-image: url('https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80');"
    />
    <div class="w-full min-h-[50%] py-16 px-2.5 -mb-16 text-center">
      <div class="text-4xl max-md:text-3xl font-bold text-primary">付款完成</div>
      <span class="block font-bold text-xl max-md:text-sm mb-2 bg-gradient-to-r from-primary to-contrast bg-clip-text text-transparent">
        我們已收到您的訂單，感謝您的支持
      </span>
      <RouterLink to="/products">
        <button class="rounded-full border border-contrast bg-contrast text-white px-8 py-1.5">
          再去逛逛
        </button>
      </RouterLink>
    </div>
    <Footer />
  </div>
</template>
