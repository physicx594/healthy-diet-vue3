<script setup lang="ts">
defineProps<{
  step1?: boolean
  step2?: boolean
  step3?: boolean
}>()

const steps = [
  { label: '購物車', icon: 'fa-solid fa-cart-shopping' },
  { label: '填寫資料', icon: 'fa-solid fa-pen-to-square' },
  { label: '訂單確認', icon: 'fa-solid fa-check' }
]
</script>

<template>
  <div class="w-full pt-28 pb-8 px-4">
    <div class="max-w-lg mx-auto flex items-center justify-between">
      <template v-for="(s, i) in steps" :key="i">
        <!-- Step circle -->
        <div class="flex flex-col items-center gap-2">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 text-sm"
            :class="(i === 0 && step1) || (i === 1 && step2) || (i === 2 && step3)
              ? 'bg-primary text-white shadow-md'
              : 'bg-bg-dark text-text-light'"
          >
            <i
              v-if="(i === 0 && step2) || (i === 1 && step3)"
              class="fa-solid fa-check text-xs"
            ></i>
            <i v-else :class="s.icon" class="text-xs"></i>
          </div>
          <span
            class="text-xs font-medium transition-colors"
            :class="(i === 0 && step1) || (i === 1 && step2) || (i === 2 && step3)
              ? 'text-primary'
              : 'text-text-light'"
          >
            {{ s.label }}
          </span>
        </div>

        <!-- Connector line -->
        <div
          v-if="i < 2"
          class="flex-1 h-0.5 mx-3 -mt-5 rounded-full transition-colors duration-300"
          :class="(i === 0 && step2) || (i === 1 && step3)
            ? 'bg-primary'
            : 'bg-bg-dark'"
        />
      </template>
    </div>
  </div>
</template>
