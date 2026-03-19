<script setup lang="ts">
import Skeleton from '@/components/shared/Skeleton.vue'
</script>

<template>
  <div class="shadow-card flex flex-col overflow-hidden rounded-xl bg-white" aria-hidden="true">
    <!-- Image placeholder -->
    <Skeleton class="aspect-square rounded-none" />

    <!-- Content -->
    <div class="flex flex-1 flex-col gap-2 px-3.5 pt-3 pb-3.5">
      <!-- Category label -->
      <Skeleton class="h-3 w-16 rounded-full" />

      <!-- Title -->
      <div class="mb-auto flex flex-col gap-1.5">
        <Skeleton class="h-3.5 w-full" />
        <Skeleton class="h-3.5 w-3/4" />
      </div>

      <!-- Price row -->
      <div class="border-bg-dark/30 mt-3 flex items-center justify-between border-t pt-3">
        <Skeleton class="h-3.5 w-full" />
      </div>
    </div>
  </div>
</template>
