<script setup lang="ts">
interface Props {
  title?: string
  size?: 'sm' | 'md' | 'lg'
}

const { size = 'md' } = defineProps<Props>()

const sizes: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl'
}
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="open = false"
      >
        <div class="bg-bark-900/40 fixed inset-0 backdrop-blur-sm" />
        <div
          :class="[
            'animate-slide-up relative w-full rounded-xl bg-white p-6 shadow-2xl',
            sizes[size]
          ]"
        >
          <div v-if="title" class="mb-4 flex items-center justify-between">
            <h3 class="font-display text-bark-800 text-lg">{{ title }}</h3>
            <button
              class="text-bark-400 hover:bg-bark-50 hover:text-bark-600 rounded-lg p-1 transition-colors"
              @click="open = false"
            >
              <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
