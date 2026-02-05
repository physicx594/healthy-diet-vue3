<script setup lang="ts">
import { useLoadingStore } from '@/stores'
import LoadingPage from '@/components/shared/LoadingPage.vue'

const loadingStore = useLoadingStore()
</script>

<template>
  <div class="text-center h-full">
    <LoadingPage :is-loading="loadingStore.isLoading" />
    <RouterView />
  </div>
</template>
