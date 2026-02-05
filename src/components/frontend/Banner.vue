<script setup lang="ts">
defineProps<{
  pageName: string
  content: string
  bgImage: string
}>()

const scrollDown = () => {
  const h = window.innerHeight
  const offset = h >= 625 ? h - 42 : 1208 - h
  window.scrollTo({ top: offset, behavior: 'smooth' })
}
</script>

<template>
  <div class="relative isolate w-full h-screen mb-5">
    <div class="absolute inset-0 -z-10 bg-cover bg-center bg-fixed" :style="{ backgroundImage: `url('${bgImage}')` }" />
    <div class="absolute top-1/2 left-1/2 w-full text-center banner-title">
      <div class="font-yellowtail text-7_5xl max-md:text-6xl font-bold text-primary pr-5">
        {{ pageName }}
      </div>
      <span class="inline-block px-5 py-0 border border-primary shadow-sm text-2xl max-md:text-base max-md:px-2.5 max-md:py-1 font-bold text-primary">
        {{ content }}
      </span>
    </div>
    <div class="absolute bottom-5p max-md:bottom-1/4 left-1/2 -translate-x-1/2">
      <a href="#" class="text-contrast font-bold p-12 relative" @click.prevent="scrollDown">
        <span class="absolute left-1/2 -top-12 w-6 h-6 border-l-5 border-b-5 border-primary box-border scroll-arrow" />
        Scroll
      </a>
    </div>
  </div>
</template>

<style scoped>
.banner-title {
  animation: title 1.5s ease-out forwards;
}

@keyframes title {
  0% {
    opacity: 0;
    transform: translate(-50%, -80%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.scroll-arrow {
  transform: translateX(-50%) rotate(-45deg);
  animation: scroll 1s linear infinite;
}

@keyframes scroll {
  25% { transform: translate(-50%, 5px) rotate(-45deg); }
  50% { transform: translate(-50%, 0) rotate(-45deg); }
  75% { transform: translate(-50%, -5px) rotate(-45deg); }
  100% { transform: translate(-50%, 0) rotate(-45deg); }
}
</style>
