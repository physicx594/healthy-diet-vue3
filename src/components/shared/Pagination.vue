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
    <ul class="flex justify-center items-center gap-2">
      <li>
        <a
          href="#"
          class="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm transition-all duration-200 text-text-light hover:bg-primary hover:text-white"
          :class="{ 'opacity-40 pointer-events-none': pages.current_page === 1 }"
          @click.prevent="pageNum(pages.current_page - 1)"
        >
          <i class="fa-solid fa-chevron-left text-xs"></i>
        </a>
      </li>
      <li v-for="item in pages.total_pages" :key="item">
        <a
          href="#"
          class="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200"
          :class="
            pages.current_page === item
              ? 'bg-primary text-white pointer-events-none shadow-md'
              : 'text-text hover:bg-bg-dark hover:text-primary'
          "
          @click.prevent="pageNum(item)"
        >
          {{ item }}
        </a>
      </li>
      <li>
        <a
          href="#"
          class="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm transition-all duration-200 text-text-light hover:bg-primary hover:text-white"
          :class="{ 'opacity-40 pointer-events-none': pages.current_page === pages.total_pages }"
          @click.prevent="pageNum(pages.current_page + 1)"
        >
          <i class="fa-solid fa-chevron-right text-xs"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>
