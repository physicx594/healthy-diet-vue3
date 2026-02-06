<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)

const onScroll = () => {
  show.value = window.pageYOffset >= 560
}

const goTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div
    class="fixed right-6 bottom-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer z-gotop transition-opacity duration-500 animate-bounce-slow"
    :class="show ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    @click="goTop"
  >
    <i class="fa-solid fa-chevron-up text-primary text-sm"></i>
  </div>
</template>
