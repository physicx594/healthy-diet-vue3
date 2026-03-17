<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{ isLoading: boolean }>()

const visible = ref(false)
const width = ref(0)
const fading = ref(false)
let doneTimer: ReturnType<typeof setTimeout>

watch(
  () => props.isLoading,
  async (loading) => {
    clearTimeout(doneTimer)
    if (loading) {
      fading.value = false
      width.value = 3
      visible.value = true
      await nextTick()
      width.value = 85
    } else {
      width.value = 100
      doneTimer = setTimeout(() => {
        fading.value = true
        doneTimer = setTimeout(() => {
          visible.value = false
          fading.value = false
          width.value = 0
        }, 400)
      }, 280)
    }
  }
)
</script>

<template>
  <div
    v-if="visible"
    class="z-loading fixed top-0 left-0 h-1 w-full"
    :class="fading ? 'opacity-0 transition-opacity duration-400' : 'opacity-100'"
  >
    <div
      class="bg-primary h-full"
      :style="{
        width: `${width}%`,
        transition:
          width === 100
            ? 'width 280ms cubic-bezier(0.25, 1, 0.5, 1)'
            : 'width 4s cubic-bezier(0.1, 0.6, 0.3, 1)',
        boxShadow: '4px 0 8px 1px rgba(82, 183, 136, 0.65)'
      }"
    ></div>
  </div>
</template>
