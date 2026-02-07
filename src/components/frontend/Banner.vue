<script setup lang="ts">
defineProps<{
  pageName: string
  content: string
  bgImage: string
  subPage?: boolean
}>()

const scrollDown = () => {
  const h = window.innerHeight
  window.scrollTo({ top: h - 56, behavior: 'smooth' })
}
</script>

<template>
  <div class="relative isolate w-full overflow-hidden" :class="subPage ? 'h-[60vh]' : 'h-screen'">
    <!-- Background image -->
    <div class="absolute inset-0 -z-10 bg-cover bg-center scale-105" :style="{ backgroundImage: `url('${bgImage}')` }" />
    <!-- Gradient overlay -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-primary-dark/80 via-primary-dark/25 to-transparent" />

    <!-- Content: sub-page keeps centered, home page uses left-bottom alignment -->
    <div v-if="subPage" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-4">
      <h1 class="font-brand text-white font-bold leading-tight drop-shadow-lg text-5xl max-md:text-3xl">
        {{ pageName }}
      </h1>
      <p class="text-white/90 text-lg max-md:text-base mt-4 tracking-[0.15em] font-light">
        {{ content }}
      </p>
    </div>

    <!-- Home hero: left-bottom golden ratio alignment -->
    <div v-else class="absolute inset-0 flex items-end pb-28 md:pb-32">
      <div class="container mx-auto px-6 lg:px-12">
        <div class="max-w-2xl animate-banner-title">
          <span class="font-mono text-white/50 text-[11px] tracking-[0.3em] uppercase block mb-4">Organic &amp; Fresh</span>
          <h1 class="font-brand text-white font-bold leading-tight drop-shadow-lg text-5xl md:text-7xl lg:text-8xl text-left">
            {{ pageName }}
          </h1>
          <div class="border-l-4 border-accent pl-6 mt-6">
            <p class="text-white/85 text-lg md:text-xl font-light tracking-[0.1em]">
              {{ content }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative rings (desktop only, home page) -->
    <div v-if="!subPage" class="absolute bottom-16 right-12 max-lg:hidden pointer-events-none" aria-hidden="true">
      <div class="w-48 h-48 rounded-full border-2 border-white/15"></div>
      <div class="absolute top-8 left-8 w-32 h-32 rounded-full border border-white/10"></div>
    </div>

    <!-- Scroll indicator: centered bottom -->
    <div v-if="!subPage" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group" @click="scrollDown">
      <span class="text-white/70 text-xs tracking-[0.2em] uppercase font-light group-hover:text-white transition-colors">Scroll</span>
      <span class="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2 group-hover:border-white/70 transition-colors">
        <span class="w-1.5 h-1.5 rounded-full bg-white animate-scroll-arrow"></span>
      </span>
    </div>
  </div>
</template>
