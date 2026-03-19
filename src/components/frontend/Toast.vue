<script setup lang="ts">
import { useNotificationStore } from '@/stores'

const notification = useNotificationStore()
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
      tag="div"
      class="z-toast pointer-events-none fixed top-20 right-4 flex flex-col gap-2 transition-all"
      enter-active-class="animate__animated animate__slideInRight animate__faster"
      leave-active-class="animate__animated animate__slideOutRight animate__faster"
      move-class="transition-transform duration-300"
    >
      <div
        v-for="n in notification.notifications"
        :key="n.id"
        class="pointer-events-auto flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm text-white shadow-lg backdrop-blur-sm transition-all"
        :class="n.type === 'error' ? 'bg-contrast/95' : 'bg-primary/95'"
      >
        <i
          class="text-base"
          :class="n.type === 'error' ? 'fa-solid fa-info-circle' : 'fa-solid fa-check-circle'"
        ></i>
        <span>{{ n.message }}</span>
      </div>
    </TransitionGroup>
  </Teleport>
</template>
