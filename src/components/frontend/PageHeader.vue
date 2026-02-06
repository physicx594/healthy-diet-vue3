<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="pt-20 pb-12 bg-[#F5F7F2]">
    <div class="container mx-auto px-6 text-center">
      <h1 class="font-display text-4xl lg:text-5xl font-semibold text-text tracking-wide">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-text-light mt-3 text-sm tracking-wider">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
