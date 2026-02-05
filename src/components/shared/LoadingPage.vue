<script setup lang="ts">
defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-[2000] bg-primary flex items-center justify-center transition-opacity"
    :class="isLoading ? 'opacity-100 visible' : 'opacity-0 invisible'"
  >
    <div class="text-center text-accent">
      <span class="block font-display text-4xl font-bold relative">
        Healthy Diet<sup class="text-xs absolute -top-1 -right-5 font-noto">&trade;</sup>
      </span>
      <p class="m-0 font-bold">Welcome!</p>
      <p class="font-bold">｜新鮮沙拉｜健康餐盒｜舒肥系列｜</p>
      <div class="flex justify-center mt-2">
        <svg width="24" height="30" viewBox="0 0 24 30">
          <rect x="0" y="13" width="4" height="5" class="fill-accent">
            <animate attributeName="height" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" values="13;5;13" begin="0s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="10" y="13" width="4" height="5" class="fill-accent">
            <animate attributeName="height" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" values="13;5;13" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="20" y="13" width="4" height="5" class="fill-accent">
            <animate attributeName="height" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" values="13;5;13" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </div>
  </div>
</template>
