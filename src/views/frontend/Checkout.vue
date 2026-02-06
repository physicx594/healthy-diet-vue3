<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { useLoadingStore } from '@/stores'
import { ordersApi, cartApi } from '@/api'
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
  <div class="container mx-auto px-6">
      <CheckoutNav :step1="true" :step2="true" />

      <div class="max-w-3xl mx-auto mb-16">
        <div class="bg-white rounded-2xl shadow-card overflow-hidden">
          <div class="px-6 py-4 border-b border-bg-dark/30">
            <h3 class="font-bold text-text flex items-center gap-2">
              <i class="fa-solid fa-pen-to-square text-primary"></i>
              顧客資料
            </h3>
          </div>

          <form class="p-8" @submit.prevent="createOrder">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-text mb-2">
                  姓名 <span class="text-contrast">*</span>
                </label>
                <input
                  v-model="nameField.value.value"
                  type="text"
                  class="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                  :class="nameField.errorMessage.value ? 'border-contrast' : 'border-bg-dark'"
                  placeholder="請輸入姓名"
                  @blur="nameField.handleBlur"
                />
                <span v-if="nameField.errorMessage.value" class="text-contrast text-xs mt-1 block">{{ nameField.errorMessage.value }}</span>
              </div>

              <!-- Tel -->
              <div>
                <label class="block text-sm font-medium text-text mb-2">
                  電話 <span class="text-contrast">*</span>
                </label>
                <input
                  v-model="telField.value.value"
                  type="tel"
                  class="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                  :class="telField.errorMessage.value ? 'border-contrast' : 'border-bg-dark'"
                  placeholder="請輸入電話"
                  @blur="telField.handleBlur"
                />
                <span v-if="telField.errorMessage.value" class="text-contrast text-xs mt-1 block">{{ telField.errorMessage.value }}</span>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-text mb-2">
                  電子信箱 <span class="text-contrast">*</span>
                </label>
                <input
                  v-model="emailField.value.value"
                  type="email"
                  class="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                  :class="emailField.errorMessage.value ? 'border-contrast' : 'border-bg-dark'"
                  placeholder="請輸入信箱"
                  @blur="emailField.handleBlur"
                />
                <span v-if="emailField.errorMessage.value" class="text-contrast text-xs mt-1 block">{{ emailField.errorMessage.value }}</span>
              </div>

              <!-- Address -->
              <div>
                <label class="block text-sm font-medium text-text mb-2">
                  地址 <span class="text-contrast">*</span>
                </label>
                <input
                  v-model="addressField.value.value"
                  type="text"
                  class="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                  :class="addressField.errorMessage.value ? 'border-contrast' : 'border-bg-dark'"
                  placeholder="請輸入地址"
                  @blur="addressField.handleBlur"
                />
                <span v-if="addressField.errorMessage.value" class="text-contrast text-xs mt-1 block">{{ addressField.errorMessage.value }}</span>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-medium text-text mb-2">備註</label>
                <textarea
                  v-model="form.message"
                  class="w-full px-4 py-3 border border-bg-dark rounded-xl text-sm h-32 focus:ring-2 focus:ring-primary-light focus:border-transparent resize-none transition-all"
                  placeholder="有什麼要告訴我們的嗎？"
                />
              </div>

              <!-- Payment -->
              <div>
                <label class="block text-sm font-medium text-text mb-2">
                  付款方式 <span class="text-contrast">*</span>
                </label>
                <select
                  v-model="form.payment"
                  class="w-full px-4 py-3 border border-bg-dark rounded-xl text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent bg-white transition-all"
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
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between mt-8 pt-6 border-t border-bg-dark/30">
              <RouterLink to="/cart" class="text-text-light hover:text-primary transition-colors flex items-center gap-2 text-sm">
                <i class="fa-solid fa-arrow-left text-xs"></i>
                回購物車
              </RouterLink>
              <button
                :disabled="!meta.valid"
                type="submit"
                class="px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交訂單
              </button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>
