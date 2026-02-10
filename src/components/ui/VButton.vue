<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

const { variant = 'primary', size = 'md', loading = false, disabled = false } = defineProps<Props>()

const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<string, string> = {
  primary: 'bg-olive-800 text-cream-50 hover:bg-olive-700 active:bg-olive-900',
  secondary: 'bg-cream-200 text-olive-900 hover:bg-cream-100 active:bg-cream-200',
  outline: 'border border-olive-300 text-olive-800 hover:bg-olive-50 active:bg-olive-100',
  danger: 'bg-terra-500 text-white hover:bg-terra-600 active:bg-terra-700',
  ghost: 'text-olive-700 hover:bg-olive-50 active:bg-olive-100',
}

const sizes: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
}
</script>

<template>
  <button
    :class="[base, variants[variant], sizes[size]]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </button>
</template>
