<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores'

const notification = useNotificationStore()

const isError = computed(() => notification.current?.type === 'error')
</script>

<template>
  <Teleport to="body">
    <div class="fixed left-1/2 -translate-x-1/2 top-0 min-w-75 z-toast">
      <Transition
        enter-active-class="animate__animated animate__fadeInDownBig"
        leave-active-class="animate__animated animate__fadeOutUp"
      >
        <div
          v-if="notification.current"
          class="mt-3 rounded-md flex justify-center items-center w-87.5 h-11 mx-auto"
          :class="isError ? 'bg-red-600' : 'bg-green-600'"
        >
          <div class="mr-2">
            <i v-if="isError" class="fas fa-ban fa-2x text-white pt-0.5"></i>
            <i v-else class="far fa-check-circle fa-2x text-white pt-0.5"></i>
          </div>
          <div class="text-xl font-bold text-white">{{ notification.current.message }}</div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
