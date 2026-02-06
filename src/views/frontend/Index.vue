<script setup lang="ts">
import { useLoadingStore } from '@/stores'
import Navbar from '@/components/frontend/Navbar.vue'
import Footer from '@/components/frontend/Footer.vue'
import Gotop from '@/components/frontend/Gotop.vue'
import LoadingPage from '@/components/shared/LoadingPage.vue'

const loadingStore = useLoadingStore()
</script>

<template>
  <div class="min-h-screen bg-bg-light flex flex-col">
    <LoadingPage :is-loading="loadingStore.isLoading" />
    <Navbar />
    <main class="flex-1 flex flex-col">
      <RouterView />
    </main>
    <Footer />
    <Gotop />
  </div>
</template>
