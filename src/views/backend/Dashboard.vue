<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores'
import Toast from '@/components/backend/Toast.vue'

const authStore = useAuthStore()
const route = useRoute()

const navItems = [
  { to: '/admin/products', label: '商品管理', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { to: '/admin/coupons', label: '優惠券管理', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
  { to: '/admin/orders', label: '訂單管理', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { to: '/admin/storages', label: '圖片管理', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
]

function isActive(path: string) {
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="flex min-h-screen">
    <Toast />

    <!-- Sidebar -->
    <aside class="flex w-60 flex-col bg-olive-900 text-cream-100">
      <div class="p-6">
        <RouterLink to="/admin/products" class="flex items-center gap-2">
          <svg class="size-7 text-olive-400" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2" />
            <path d="M16 8c-2 3-6 5-6 10a6 6 0 0012 0c0-5-4-7-6-10z" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <span class="font-display text-lg font-semibold">HD Admin</span>
        </RouterLink>
      </div>

      <nav class="flex-1 space-y-1 px-3">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            isActive(item.to)
              ? 'bg-olive-700/50 text-cream-50'
              : 'text-cream-200/70 hover:bg-olive-800 hover:text-cream-100',
          ]"
        >
          <svg class="size-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="item.icon" />
          </svg>
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Bottom -->
      <div class="border-t border-olive-800 p-4">
        <RouterLink
          to="/"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-cream-200/70 transition-colors hover:bg-olive-800 hover:text-cream-100"
        >
          <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          前往前台
        </RouterLink>
        <button
          class="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-cream-200/70 transition-colors hover:bg-olive-800 hover:text-cream-100"
          @click="authStore.signout()"
        >
          <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          登出
        </button>
      </div>
    </aside>

    <!-- Content -->
    <div class="flex flex-1 flex-col">
      <header class="flex items-center justify-between border-b border-cream-200 bg-white px-8 py-4">
        <h2 class="font-display text-lg text-olive-800">
          {{ navItems.find(n => isActive(n.to))?.label ?? '管理後台' }}
        </h2>
      </header>

      <main class="flex-1 bg-cream-50 p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
