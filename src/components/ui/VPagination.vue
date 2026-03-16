<script setup lang="ts">
import type { Pagination } from '@/types'

interface Props {
  pagination: Pagination
}

const props = defineProps<Props>()
const emit = defineEmits<{ changePage: [page: number] }>()

const goPage = (page: number) => {
  if (page === props.pagination.current_page) return
  emit('changePage', page)
}
</script>

<template>
  <nav v-if="pagination.total_pages > 1" class="flex items-center justify-center gap-1">
    <button
      :disabled="!pagination.has_pre"
      class="text-bark-600 hover:bg-primary-dark/10 hover:text-primary-dark cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      @click="goPage(pagination.current_page - 1)"
    >
      <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      v-for="page in pagination.total_pages"
      :key="page"
      :class="[
        'cursor-pointer rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
        page === pagination.current_page
          ? 'bg-primary-dark text-white'
          : 'text-bark-600 hover:bg-primary-dark/10 hover:text-primary-dark'
      ]"
      @click="goPage(page)"
    >
      {{ page }}
    </button>

    <button
      :disabled="!pagination.has_next"
      class="text-bark-600 hover:bg-primary-dark/10 hover:text-primary-dark cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      @click="goPage(pagination.current_page + 1)"
    >
      <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
</template>
