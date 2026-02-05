<script setup lang="ts">
import Navbar from '@/components/backend/Navbar.vue'
import Toast from '@/components/backend/Toast.vue'
</script>

<template>
  <div>
    <Navbar />
    <Toast />
    <RouterView />
  </div>
</template>
