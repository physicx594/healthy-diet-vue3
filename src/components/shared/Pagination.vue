<script setup lang="ts">
import type { Pagination } from '@/types'

const props = defineProps<{
  pages: Pagination
}>()

const emit = defineEmits<{
  update: [page: number]
}>()

const pageNum = (page: number) => {
  emit('update', page)
}
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="flex justify-center items-center gap-1">
      <li>
        <a
          href="#"
          class="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 text-sm transition hover:bg-primary hover:text-white"
          :class="{ 'opacity-50 pointer-events-none': pages.current_page === 1 }"
          @click.prevent="pageNum(pages.current_page - 1)"
        >
          &laquo;
        </a>
      </li>
      <li v-for="item in pages.total_pages" :key="item">
        <a
          href="#"
          class="inline-flex items-center justify-center w-9 h-9 rounded-full border text-sm font-medium transition"
          :class="
            pages.current_page === item
              ? 'bg-primary text-white border-primary pointer-events-none'
              : 'border-gray-300 hover:bg-primary hover:text-white'
          "
          @click.prevent="pageNum(item)"
        >
          {{ item }}
        </a>
      </li>
      <li>
        <a
          href="#"
          class="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 text-sm transition hover:bg-primary hover:text-white"
          :class="{ 'opacity-50 pointer-events-none': pages.current_page === pages.total_pages }"
          @click.prevent="pageNum(pages.current_page + 1)"
        >
          &raquo;
        </a>
      </li>
    </ul>
  </nav>
</template>
