<script setup lang="ts" generic="T extends object">
import { ref, computed } from 'vue'
import IconChevronUp from '@/components/icons/IconChevronUp.vue'
import Skeleton from '@/components/shared/Skeleton.vue'

interface Column {
  label: string
  sortKey?: string
}

interface Props {
  columns: Column[]
  items: T[]
  loading?: boolean
  scrollable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  scrollable: false
})

defineSlots<{ default(props: { item: T }): unknown }>()

const activeSortKey = ref('')
const isReverse = ref(false)

const toggleSort = (key: string) => {
  if (activeSortKey.value === key) {
    isReverse.value = !isReverse.value
  } else {
    activeSortKey.value = key
    isReverse.value = false
  }
}

const sortedItems = computed(() => {
  if (!activeSortKey.value) return props.items
  return [...props.items].sort((a, b) => {
    const aVal = (a as Record<string, number>)[activeSortKey.value] ?? 0
    const bVal = (b as Record<string, number>)[activeSortKey.value] ?? 0
    return isReverse.value ? aVal - bVal : bVal - aVal
  })
})
</script>

<template>
  <div
    :class="[
      'border-bark-100 rounded-xl border bg-white shadow-sm',
      scrollable ? 'scrollbar-hide max-h-full overflow-y-auto' : 'overflow-hidden'
    ]"
  >
    <table class="w-full table-fixed text-sm">
      <thead>
        <tr :class="['bg-primary-dark', scrollable && 'sticky top-0']">
          <th
            v-for="col in columns"
            :key="col.label"
            :class="[
              'px-5 py-3.5 text-center font-medium text-white/60',
              col.sortKey && 'cursor-pointer transition-colors select-none hover:text-white'
            ]"
            @click="col.sortKey && toggleSort(col.sortKey)"
          >
            {{ col.label }}
            <span
              v-if="col.sortKey && (activeSortKey === col.sortKey || activeSortKey === '')"
              class="inline-block transition-transform"
              :class="{ 'rotate-180': activeSortKey === col.sortKey && isReverse }"
            >
              <IconChevronUp class="inline size-3" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-bark-100 divide-y [&_td]:px-5 [&_td]:py-3 [&_td]:text-center">
        <!-- Skeleton -->
        <template v-if="loading">
          <tr v-for="i in 10" :key="i">
            <td :colspan="columns.length">
              <Skeleton :class="'h-8'" />
            </td>
          </tr>
        </template>

        <!-- Empty -->
        <tr v-else-if="!items.length">
          <td :colspan="columns.length" class="text-bark-400 py-12! text-center">尚無資料</td>
        </tr>

        <!-- Data -->
        <slot v-else v-for="item in sortedItems" :item="item" />
      </tbody>
    </table>
  </div>
</template>
