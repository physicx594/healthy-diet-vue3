<script setup lang="ts">
import { useLoadingStore } from '@/stores'
import Navbar from '@/components/frontend/Navbar.vue'
import Footer from '@/components/frontend/Footer.vue'
import Gotop from '@/components/frontend/Gotop.vue'
import TopProgressBar from '@/components/frontend/TopProgressBar.vue'
import Toast from '@/components/frontend/Toast.vue'

const loadingStore = useLoadingStore()
</script>

<template>
  <div class="bg-bg-light flex min-h-screen flex-col">
    <TopProgressBar :is-loading="loadingStore.isLoading" />
    <Navbar />
    <main class="flex flex-1 flex-col">
      <RouterView />
    </main>
    <Footer />
    <Gotop />
    <Toast />
  </div>
</template>
