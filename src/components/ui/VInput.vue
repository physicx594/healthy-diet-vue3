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
    <label v-if="label" class="text-bark-700 block text-sm font-medium">{{ label }}</label>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :class="[
        'text-bark-800 w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors outline-none',
        'placeholder:text-bark-400',
        error
          ? 'border-terra-400 focus:border-terra-500 focus:ring-terra-200 focus:ring-2'
          : 'border-bark-100 focus:border-primary-dark focus:ring-primary-dark/10 focus:ring-2'
      ]"
    />
    <p v-if="error" class="text-terra-500 text-xs">{{ error }}</p>
  </div>
</template>
