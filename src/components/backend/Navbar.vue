<script setup lang="ts">
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
</script>

<template>
  <nav class="bg-gray-900 flex items-center justify-between px-6 py-3">
    <a href="#" class="text-white font-bold text-lg">Logo</a>
    <ul class="flex items-center list-none gap-1">
      <li>
        <RouterLink to="/admin/products" class="admin-nav-link">產品列表</RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/coupons" class="admin-nav-link">優惠券列表</RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/orders" class="admin-nav-link">訂單列表</RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/storages" class="admin-nav-link">圖片列表</RouterLink>
      </li>
      <li>
        <RouterLink to="/" class="admin-nav-link">回首頁</RouterLink>
      </li>
    </ul>
    <div>
      <button
        type="button"
        class="border border-gray-300 text-gray-300 rounded px-4 py-1.5 hover:bg-gray-300 hover:text-gray-900 transition-colors"
        @click="authStore.signout()"
      >
        登出
      </button>
    </div>
  </nav>
</template>

<style scoped>
.admin-nav-link {
  position: relative;
  display: block;
  padding: 8px 12px;
  font-weight: bold;
  color: rgb(255 255 255 / 0.75);
  transition: color 0.3s;
}

.admin-nav-link:hover {
  color: #fff;
}

.admin-nav-link::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.5s linear;
}

.admin-nav-link:hover::after {
  width: 100%;
}
</style>
