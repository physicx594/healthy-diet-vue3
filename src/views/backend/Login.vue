<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

const user = ref({
  email: '',
  password: ''
})
const errorMsg = ref('')

const signin = async () => {
  try {
    errorMsg.value = ''
    await authStore.signin(user.value.email, user.value.password)
  } catch {
    errorMsg.value = '登入失敗，請檢查帳號密碼'
  }
}
</script>

<template>
  <div
    class="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
    style="background-image: url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80');"
  >
    <form
      class="w-75 p-8 bg-white rounded-md shadow-login text-center"
      @submit.prevent="signin"
    >
      <h1 class="text-xl font-bold mb-4">會員登入</h1>
      <div class="text-left mb-3">
        <label for="inputEmail" class="block font-bold mb-1 text-sm">帳號</label>
        <input
          id="inputEmail"
          v-model="user.email"
          type="email"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          placeholder="Email address"
          required
          autofocus
        />
      </div>
      <div class="text-left mb-3">
        <label for="inputPassword" class="block font-bold mb-1 text-sm">密碼</label>
        <input
          id="inputPassword"
          v-model="user.password"
          type="password"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          placeholder="Password"
          required
        />
      </div>
      <p v-if="errorMsg" class="text-red-600 text-sm mb-2">{{ errorMsg }}</p>
      <button
        type="submit"
        class="w-full py-2 mt-3 border border-contrast text-contrast rounded hover:bg-contrast hover:text-white transition-colors"
      >
        登入
      </button>
      <RouterLink
        to="/"
        class="block w-full py-2 mt-3 border border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition-colors"
      >
        回首頁
      </RouterLink>
    </form>
  </div>
</template>
