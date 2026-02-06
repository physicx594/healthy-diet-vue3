<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  bgImage: string
  showBreadcrumb?: boolean
}>()
</script>

<template>
  <div class="relative isolate w-full overflow-hidden h-[40vh] min-h-[280px]">
    <!-- Background image -->
    <div class="absolute inset-0 -z-10 bg-cover bg-center scale-105" :style="{ backgroundImage: `url('${bgImage}')` }" />
    <!-- Gradient overlays -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-primary-dark/80 via-primary-dark/25 to-transparent" />

    <!-- Content -->
    <div class="absolute inset-0 flex flex-col items-center justify-center px-6">
      <!-- Breadcrumb -->
      <nav v-if="showBreadcrumb" class="flex items-center gap-2 text-white/50 text-xs mb-5 tracking-wider">
        <RouterLink to="/" class="hover:text-white/80 transition-colors">首頁</RouterLink>
        <i class="fa-solid fa-chevron-right text-[8px]"></i>
        <span class="text-white/80">{{ title }}</span>
      </nav>

      <h1 class="font-brand text-5xl max-md:text-3xl text-white font-bold leading-tight drop-shadow-lg tracking-wide">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-white/80 text-sm max-md:text-xs mt-3 tracking-[0.15em] font-light">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
