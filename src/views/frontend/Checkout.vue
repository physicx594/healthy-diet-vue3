<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { useLoadingStore } from '@/stores'
import { ordersApi, cartApi } from '@/api'
import Navbar from '@/components/frontend/Navbar.vue'
import Footer from '@/components/frontend/Footer.vue'
import CheckoutNav from '@/components/frontend/CheckoutNav.vue'

const router = useRouter()
const loadingStore = useLoadingStore()

const { handleSubmit, meta } = useForm()

const nameField = useField('name', (value: string) => {
  if (!value) return '姓名 是必填的'
  if (value.length < 3) return '姓名 需至少 3 個字元'
  return true
})

const telField = useField('tel', (value: string) => {
  if (!value) return '電話 是必填的'
  if (value.length < 10) return '電話 需至少 10 個字元'
  return true
})

const emailField = useField('email', (value: string) => {
  if (!value) return '電子信箱 是必填的'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '請輸入有效的電子信箱'
  return true
})

const addressField = useField('address', (value: string) => {
  if (!value) return '地址 是必填的'
  return true
})

const form = reactive({
  message: '',
  payment: ''
})

const createOrder = handleSubmit(async () => {
  const orderData = {
    user: {
      name: nameField.value.value as string,
      email: emailField.value.value as string,
      tel: telField.value.value as string,
      address: addressField.value.value as string
    },
    message: form.message
  }
  const res = await ordersApi.create(orderData)
  router.push({ name: 'checkoutPay', params: { orderId: res.data.orderId } })
})

onMounted(async () => {
  loadingStore.setLoading(true)
  await cartApi.get()
  loadingStore.setLoading(false)
})
</script>

<template>
  <div>
    <Navbar />
    <div class="container mx-auto px-4">
      <CheckoutNav :step1="true" :step2="true" />

      <div class="w-full mb-5">
        <div class="border border-gray-200">
          <div class="bg-primary text-white px-3 py-2 text-left font-bold">顧客資料</div>
          <form class="p-6 text-left text-sm" @submit.prevent="createOrder">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium mb-1 relative">
                  姓名<span class="text-contrast font-bold absolute -top-1 -right-2.5">*</span>
                </label>
                <input
                  v-model="nameField.value.value"
                  type="text"
                  class="w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  :class="nameField.errorMessage.value ? 'border-red-500' : 'border-gray-300'"
                  placeholder="請輸入姓名"
                  @blur="nameField.handleBlur"
                />
                <span v-if="nameField.errorMessage.value" class="text-red-600 text-xs">{{ nameField.errorMessage.value }}</span>
              </div>

              <!-- Tel -->
              <div>
                <label class="block text-sm font-medium mb-1 relative">
                  電話<span class="text-contrast font-bold absolute -top-1 -right-2.5">*</span>
                </label>
                <input
                  v-model="telField.value.value"
                  type="tel"
                  class="w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  :class="telField.errorMessage.value ? 'border-red-500' : 'border-gray-300'"
                  placeholder="請輸入電話"
                  @blur="telField.handleBlur"
                />
                <span v-if="telField.errorMessage.value" class="text-red-600 text-xs">{{ telField.errorMessage.value }}</span>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium mb-1 relative">
                  電子信箱<span class="text-contrast font-bold absolute -top-1 -right-2.5">*</span>
                </label>
                <input
                  v-model="emailField.value.value"
                  type="email"
                  class="w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  :class="emailField.errorMessage.value ? 'border-red-500' : 'border-gray-300'"
                  placeholder="請輸入信箱"
                  @blur="emailField.handleBlur"
                />
                <span v-if="emailField.errorMessage.value" class="text-red-600 text-xs">{{ emailField.errorMessage.value }}</span>
              </div>

              <!-- Address -->
              <div>
                <label class="block text-sm font-medium mb-1 relative">
                  地址<span class="text-contrast font-bold absolute -top-1 -right-2.5">*</span>
                </label>
                <input
                  v-model="addressField.value.value"
                  type="text"
                  class="w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  :class="addressField.errorMessage.value ? 'border-red-500' : 'border-gray-300'"
                  placeholder="請輸入地址"
                  @blur="addressField.handleBlur"
                />
                <span v-if="addressField.errorMessage.value" class="text-red-600 text-xs">{{ addressField.errorMessage.value }}</span>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-medium mb-1">備註</label>
                <textarea
                  v-model="form.message"
                  class="w-full px-3 py-2 border border-gray-300 rounded text-sm h-30 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <!-- Payment + Actions -->
              <div class="relative">
                <label class="block text-sm font-medium mb-1 relative">
                  付款方式<span class="text-contrast font-bold absolute -top-1 -right-2.5">*</span>
                </label>
                <select
                  v-model="form.payment"
                  class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="" disabled>請選擇付款方式</option>
                  <option value="WebATM">WebATM</option>
                  <option value="ATM">ATM</option>
                  <option value="CVS">CVS</option>
                  <option value="Barcode">Barcode</option>
                  <option value="Credit">Credit</option>
                  <option value="ApplePay">ApplePay</option>
                  <option value="GooglePay">GooglePay</option>
                </select>
                <div class="flex justify-between items-center mt-6">
                  <RouterLink to="/cart" class="text-primary hover:text-contrast">&larr;回購物車</RouterLink>
                  <button
                    :disabled="!meta.valid"
                    type="submit"
                    class="bg-primary text-white px-4 py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    提交訂單
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
