<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'

const authStore = useAuthStore()

const user = ref({
  email: 'hd2026@test.com',
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
  <div class="bg-primary-dark flex min-h-screen items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="mb-8 text-center">
        <h1 class="mt-4 font-mono text-2xl font-bold text-white">ADMIN</h1>
        <p class="mt-1 text-sm text-white/60">管理後台</p>
      </div>

      <!-- Form Card -->
      <form class="rounded-xl bg-white p-8 shadow-2xl" @submit.prevent="signin">
        <!-- Error -->
        <div
          v-if="errorMsg"
          class="bg-terra-500/10 text-terra-600 mb-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
        >
          <svg class="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {{ errorMsg }}
        </div>

        <div class="space-y-4">
          <VInput v-model="user.email" label="帳號" placeholder="請輸入 Email" type="email" />
          <VInput v-model="user.password" label="密碼" placeholder="請輸入密碼" type="password" />
        </div>

        <VButton size="lg" :loading="loading" class="mt-6 w-full" type="submit"> 登入 </VButton>
      </form>

      <!-- Back to frontend -->
      <p class="mt-6 text-center">
        <RouterLink
          to="/"
          class="text-white/60 hover:text-white text-sm transition-colors"
        >
          &larr; 回到前台
        </RouterLink>
      </p>
    </div>
  </div>
</template>
