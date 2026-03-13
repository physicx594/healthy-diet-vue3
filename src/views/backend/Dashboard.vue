<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores'
import Toast from '@/components/backend/Toast.vue'

const authStore = useAuthStore()
const route = useRoute()

const navItems = [
  {
    to: '/admin/products',
    label: '商品管理',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  },
  {
    to: '/admin/coupons',
    label: '優惠券管理',
    icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z'
  },
  {
    to: '/admin/orders',
    label: '訂單管理',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
  },
  {
    to: '/admin/storages',
    label: '圖片管理',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
  }
]

function isActive(path: string) {
  return route.path.startsWith(path)
}

function currentLabel() {
  return navItems.find((n) => isActive(n.to))?.label ?? '管理後台'
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-white">
    <Toast />

    <!-- ── Sidebar ─────────────────────────────────────── -->
    <aside class="bg-primary-dark flex w-52 shrink-0 flex-col text-white">
      <!-- Brand -->
      <div class="px-6 py-6">
        <span class="font-mono text-xs tracking-widest text-white/40 uppercase">system</span>
        <p class="mt-0.5 font-mono text-xl font-bold tracking-tight text-white">ADMIN</p>
      </div>

      <!-- Divider -->
      <div class="mx-6 h-px bg-white/10"></div>

      <!-- Nav -->
      <nav class="flex-1 space-y-0.5 px-3 py-4">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors',
            isActive(item.to)
              ? 'bg-white/15 font-medium text-white'
              : 'text-white/60 hover:bg-white/10 hover:text-white/90'
          ]"
        >
          <svg class="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              :d="item.icon"
            />
          </svg>
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Divider -->
      <div class="mx-6 h-px bg-white/10"></div>

      <!-- Bottom actions -->
      <div class="space-y-0.5 px-3 py-4">
        <RouterLink
          to="/"
          class="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
        >
          <svg class="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          前往前台
        </RouterLink>
        <button
          class="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
          @click="authStore.signout()"
        >
          <svg class="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          登出
        </button>
      </div>
    </aside>

    <!-- ── Main Content ────────────────────────────────── -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Top bar -->
      <header class="border-bark-100 flex shrink-0 items-center border-b bg-white px-8 py-4">
        <h1 class="font-mono text-sm font-medium tracking-wide text-gray-800">
          {{ currentLabel() }}
        </h1>
      </header>

      <!-- Page content — each page manages its own scroll -->
      <main class="bg-bark-50 flex flex-1 flex-col overflow-hidden p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>
