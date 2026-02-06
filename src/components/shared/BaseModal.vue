<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const close = () => {
  emit('update:modelValue', false)
}

const sizeClass: Record<string, string> = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl'
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-modal flex items-center justify-center p-4"
      >
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="close" />
        <div
          class="relative bg-white rounded-2xl w-full overflow-hidden"
          style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);"
          :class="sizeClass[size ?? 'lg']"
        >
          <div class="flex items-center justify-between px-6 py-4 border-b border-bg-dark/50">
            <h3 class="text-lg font-bold text-primary">{{ title }}</h3>
            <button
              type="button"
              class="w-8 h-8 flex items-center justify-center rounded-full text-text-light hover:bg-bg-dark hover:text-text transition-all duration-200 text-xl leading-none"
              @click="close"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="p-6 max-h-70vh overflow-y-auto">
            <slot />
          </div>
          <div v-if="$slots.footer" class="flex justify-end gap-2 px-6 py-4 border-t border-bg-dark/50">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active > div:last-child {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}
.modal-leave-active > div:last-child {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div:last-child {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
.modal-leave-to > div:last-child {
  transform: scale(0.95);
  opacity: 0;
}
</style>
