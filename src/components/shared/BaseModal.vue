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
        class="fixed inset-0 z-[3000] flex items-center justify-center p-4"
      >
        <div class="fixed inset-0 bg-black/50" @click="close" />
        <div
          class="relative bg-white rounded-lg shadow-xl w-full overflow-hidden"
          :class="sizeClass[size ?? 'lg']"
        >
          <div class="flex items-center justify-between p-4 border-b">
            <h3 class="text-lg font-bold text-primary">{{ title }}</h3>
            <button
              type="button"
              class="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              @click="close"
            >
              &times;
            </button>
          </div>
          <div class="p-4 max-h-[70vh] overflow-y-auto">
            <slot />
          </div>
          <div v-if="$slots.footer" class="flex justify-end gap-2 p-4 border-t">
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
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
