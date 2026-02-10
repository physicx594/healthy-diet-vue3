<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'

const authStore = useAuthStore()

const user = ref({
  email: '',
  password: ''
})
const errorMsg = ref('')
const loading = ref(false)

const signin = async () => {
  errorMsg.value = ''
  if (!user.value.email.trim() || !user.value.password) {
    errorMsg.value = '請輸入帳號及密碼'
    return
  }
  loading.value = true
  try {
    await authStore.signin(user.value.email, user.value.password)
  } catch {
    errorMsg.value = '登入失敗，請檢查帳號密碼'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-olive-900 px-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <svg class="size-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>

    <div class="relative w-full max-w-sm">
      <!-- Logo -->
      <div class="mb-8 text-center">
        <svg class="mx-auto size-12 text-olive-400" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2" />
          <path d="M16 8c-2 3-6 5-6 10a6 6 0 0012 0c0-5-4-7-6-10z" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <h1 class="mt-4 font-display text-2xl font-bold text-cream-50">Healthy Diet</h1>
        <p class="mt-1 text-sm text-cream-200/60">管理後台</p>
      </div>

      <!-- Form Card -->
      <form
        class="rounded-xl bg-white p-8 shadow-2xl"
        @submit.prevent="signin"
      >
        <h2 class="font-display text-lg font-semibold text-bark-800">管理員登入</h2>

        <!-- Error -->
        <div
          v-if="errorMsg"
          class="mt-4 flex items-center gap-2 rounded-lg bg-terra-500/10 px-4 py-3 text-sm text-terra-600"
        >
          <svg class="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {{ errorMsg }}
        </div>

        <div class="mt-5 space-y-4">
          <VInput
            v-model="user.email"
            label="帳號"
            placeholder="請輸入 Email"
            type="email"
          />
          <VInput
            v-model="user.password"
            label="密碼"
            placeholder="請輸入密碼"
            type="password"
          />
        </div>

        <VButton
          size="lg"
          :loading="loading"
          class="mt-6 w-full"
          type="submit"
        >
          登入
        </VButton>
      </form>

      <!-- Back to frontend -->
      <p class="mt-6 text-center">
        <RouterLink to="/" class="text-sm text-cream-200/50 transition-colors hover:text-cream-100">
          &larr; 回到前台
        </RouterLink>
      </p>
    </div>
  </div>
</template>
