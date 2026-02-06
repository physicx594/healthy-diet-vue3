<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLoadingStore } from '@/stores'
import Navbar from '@/components/frontend/Navbar.vue'
import Footer from '@/components/frontend/Footer.vue'

const loadingStore = useLoadingStore()
const showCheck = ref(false)

onMounted(() => {
  loadingStore.setLoading(true)
  setTimeout(() => {
    loadingStore.setLoading(false)
    setTimeout(() => { showCheck.value = true }, 200)
  }, 800)
})
</script>

<template>
  <div class="min-h-screen bg-bg-light flex flex-col">
    <Navbar />

    <!-- Success content -->
    <div class="flex-1 flex items-center justify-center px-6 pt-16">
      <div class="text-center max-w-md">
        <!-- Animated checkmark -->
        <div class="mb-8">
          <div
            class="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center"
            :class="showCheck ? 'animate-check-bounce' : 'opacity-0'"
          >
            <i class="fa-solid fa-check text-4xl text-primary"></i>
          </div>
        </div>

        <h1 class="font-display text-4xl lg:text-5xl font-semibold text-text mb-4">付款完成</h1>
        <p class="text-text-light text-lg mb-2">感謝您的訂購！</p>
        <p class="text-text-light text-sm mb-10">我們已收到您的訂單，將盡快為您準備新鮮美味的餐點。</p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/products">
            <button class="px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg">
              繼續購物
            </button>
          </RouterLink>
          <RouterLink to="/">
            <button class="px-8 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300">
              回到首頁
            </button>
          </RouterLink>
        </div>

        <!-- Confetti-like decorative dots -->
        <div class="relative mt-16 h-8" :class="showCheck ? 'opacity-100' : 'opacity-0'" style="transition: opacity 1s ease 0.5s;">
          <span class="absolute left-1/4 top-0 w-2 h-2 rounded-full bg-primary-light animate-bounce" style="animation-delay: 0s;"></span>
          <span class="absolute left-1/3 top-2 w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style="animation-delay: 0.2s;"></span>
          <span class="absolute left-1/2 top-0 w-2.5 h-2.5 rounded-full bg-accent animate-bounce" style="animation-delay: 0.1s;"></span>
          <span class="absolute left-2/3 top-3 w-1.5 h-1.5 rounded-full bg-contrast/50 animate-bounce" style="animation-delay: 0.3s;"></span>
          <span class="absolute left-3/4 top-1 w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 0.15s;"></span>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
