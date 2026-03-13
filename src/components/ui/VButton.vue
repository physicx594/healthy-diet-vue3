<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

const { variant = 'primary', size = 'md', loading = false, disabled = false } = defineProps<Props>()

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<string, string> = {
  primary: 'bg-primary-dark text-white hover:bg-primary active:bg-primary-dark',
  secondary: 'bg-bark-100 text-bark-700 hover:bg-bark-200 active:bg-bark-100',
  outline:
    'border border-primary-dark/30 text-primary-dark hover:bg-primary-dark/5 active:bg-primary-dark/10',
  danger: 'bg-terra-500 text-white hover:bg-terra-600 active:bg-terra-700',
  ghost: 'text-primary-dark hover:bg-primary-dark/5 active:bg-primary-dark/10'
}

const sizes: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base'
}
</script>

<template>
  <button :class="[base, variants[variant], sizes[size]]" :disabled="disabled || loading">
    <span
      v-if="loading"
      class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
    <slot />
  </button>
</template>
