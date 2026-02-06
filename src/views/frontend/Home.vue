<script setup lang="ts">
import { useLoadingStore } from '@/stores'
import LoadingPage from '@/components/shared/LoadingPage.vue'

const loadingStore = useLoadingStore()
</script>

<template>
  <div class="min-h-full bg-white">
    <LoadingPage :is-loading="loadingStore.isLoading" />
    <RouterView />
  </div>
</template>
