<script setup lang="ts">
import type { Pagination } from '@/types'

interface Props {
  pagination: Pagination
}

defineProps<Props>()
const emit = defineEmits<{ changePage: [page: number] }>()

function goPage(page: number) {
  emit('changePage', page)
}
</script>

<template>
  <nav v-if="pagination.total_pages > 1" class="flex items-center justify-center gap-1">
    <button
      :disabled="!pagination.has_pre"
      class="rounded-lg px-3 py-2 text-sm text-bark-600 transition-colors hover:bg-olive-50 disabled:opacity-40 disabled:cursor-not-allowed"
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
        'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
        page === pagination.current_page
          ? 'bg-olive-800 text-cream-50'
          : 'text-bark-600 hover:bg-olive-50',
      ]"
      @click="goPage(page)"
    >
      {{ page }}
    </button>

    <button
      :disabled="!pagination.has_next"
      class="rounded-lg px-3 py-2 text-sm text-bark-600 transition-colors hover:bg-olive-50 disabled:opacity-40 disabled:cursor-not-allowed"
      @click="goPage(pagination.current_page + 1)"
    >
      <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
</template>
