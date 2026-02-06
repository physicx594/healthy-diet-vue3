<script setup lang="ts">
defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <Transition name="loading">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-loading flex flex-col items-center justify-center bg-white"
    >
      <!-- Top progress bar -->
      <div class="absolute top-0 left-0 w-full h-[2px]">
        <div class="h-full bg-primary loading-progress"></div>
      </div>

      <!-- Center logo mark -->
      <div class="loading-content">
        <div class="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center mb-4">
          <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
        </div>
        <span class="font-brand text-sm font-medium text-text/60 tracking-[0.3em] uppercase">
          Healthy Diet
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-progress {
  animation: progress 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  transform-origin: left;
}

@keyframes progress {
  0% {
    transform: scaleX(0);
    opacity: 1;
  }
  50% {
    transform: scaleX(0.7);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 0;
  }
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: content-in 0.4s ease-out both;
}

@keyframes content-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-enter-active {
  transition: opacity 0.2s ease;
}
.loading-leave-active {
  transition: opacity 0.4s ease;
}
.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
