<script setup lang="ts">
interface Props {
  label?: string
  type?: string
  placeholder?: string
  error?: string
}

const { type = 'text' } = defineProps<Props>()
const model = defineModel<string>({ default: '' })
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" class="block text-sm font-medium text-bark-700">{{ label }}</label>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :class="[
        'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-bark-800 outline-none transition-colors',
        'placeholder:text-bark-400',
        error
          ? 'border-terra-400 focus:border-terra-500 focus:ring-2 focus:ring-terra-200'
          : 'border-cream-200 focus:border-olive-400 focus:ring-2 focus:ring-olive-100',
      ]"
    />
    <p v-if="error" class="text-xs text-terra-500">{{ error }}</p>
  </div>
</template>
