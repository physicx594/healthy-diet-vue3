<script setup lang="ts">
interface Props {
  fullscreen?: boolean
}

const { fullscreen = false } = defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'flex items-center justify-center',
      fullscreen ? 'fixed inset-0 z-50 bg-cream-50/80 backdrop-blur-sm' : 'py-16',
    ]"
  >
    <div class="flex flex-col items-center gap-3">
      <div class="size-8 animate-spin rounded-full border-3 border-olive-200 border-t-olive-700" />
      <p class="text-sm text-bark-500"><slot>載入中...</slot></p>
    </div>
  </div>
</template>
