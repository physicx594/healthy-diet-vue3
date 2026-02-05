<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore, useLoadingStore } from '@/stores'
import { ordersApi } from '@/api'
import { formatMoney, truncateOrderId } from '@/utils'
import type { Order } from '@/types'
import Navbar from '@/components/frontend/Navbar.vue'
import Footer from '@/components/frontend/Footer.vue'
import CheckoutNav from '@/components/frontend/CheckoutNav.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const loadingStore = useLoadingStore()

const order = ref<Order | null>(null)
const open = ref(false)

const getOrder = async (id: string) => {
  loadingStore.setLoading(true)
  try {
    const res = await ordersApi.get(id)
    order.value = res.data.order
    await cartStore.getCart()
  } finally {
    loadingStore.setLoading(false)
  }
}

const paying = async () => {
  if (!order.value) return
  const orderId = order.value.id
  await ordersApi.pay(orderId)
  await getOrder(orderId)
  router.push({ name: 'checkoutSuccess' })
}

const productsList = ref<Array<{ product: { title: string; imageUrl: string[]; price: number }; qty: number }>>([])

onMounted(async () => {
  const orderId = route.params.orderId as string
  if (orderId) {
    await getOrder(orderId)
    if (order.value?.products) {
      productsList.value = Object.values(order.value.products)
    }
  }
})
</script>

<template>
  <div>
    <Navbar />
    <div v-if="!loadingStore.isLoading" class="container mx-auto px-4">
      <CheckoutNav :step1="true" :step2="true" :step3="true" />

      <!-- Cart Summary -->
      <div class="w-full border border-gray-200 p-3 relative">
        <div class="text-center">
          <div v-if="order?.total">合計{{ formatMoney(order.total) }}</div>
          <span class="text-sm" v-if="productsList.length">購物車({{ productsList.length }}件)</span>
          <span class="absolute top-1/2 -translate-y-1/2 p-5 cursor-pointer" style="left: 56%" @click="open = !open">
            <i class="fa fa-angle-down text-red-600 transition-transform duration-500" :class="{ 'rotate-180': open }"></i>
          </span>
        </div>
      </div>

      <!-- Expandable Product List -->
      <div class="overflow-hidden transition-all duration-500 ease-out" :class="open ? 'max-h-132.25' : 'max-h-0'">
        <table class="w-full border border-t-0 border-gray-200 text-base">
          <thead>
            <tr>
              <th class="p-2"></th>
              <th class="p-2">品名</th>
              <th class="p-2">單價</th>
              <th class="p-2">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in productsList" :key="index" class="border-b border-gray-200">
              <td class="p-2"><img :src="item.product.imageUrl[0]" class="w-20 h-20 object-cover" /></td>
              <td class="p-2">{{ item.product.title }}</td>
              <td class="p-2">x{{ item.qty }}</td>
              <td v-if="item.product.price" class="p-2">{{ formatMoney(item.product.price * item.qty) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right p-2">
                <i class="fa fa-angle-up fa-2x text-red-600 cursor-pointer" @click="open = !open"></i>
              </td>
              <th class="p-2">合計</th>
              <th v-if="order?.total" class="text-red-600 p-2">{{ formatMoney(order.total) }}</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Order Info -->
      <div class="w-full border border-gray-200 mt-5 mb-24 relative text-sm">
        <div class="bg-primary text-white px-3 py-2 text-left font-bold flex justify-between items-center">
          <span>訂單資訊</span>
          <span v-if="order?.id" class="text-xs">{{ truncateOrderId(order.id) }}</span>
        </div>
        <table v-if="order?.user" class="w-full">
          <tbody>
            <tr class="border-b border-gray-200"><td class="p-2">姓名</td><td class="p-2">{{ order.user.name }}</td></tr>
            <tr class="border-b border-gray-200"><td class="p-2">電話</td><td class="p-2">{{ order.user.tel }}</td></tr>
            <tr class="border-b border-gray-200"><td class="p-2">Email</td><td class="p-2">{{ order.user.email }}</td></tr>
            <tr class="border-b border-gray-200"><td class="p-2">地址</td><td class="p-2">{{ order.user.address }}</td></tr>
            <tr class="border-b border-gray-200"><td class="p-2">付款方式</td><td class="p-2">{{ order.payment }}</td></tr>
            <tr class="border-b border-gray-200">
              <td class="p-2">付款狀態</td>
              <td class="p-2 text-red-600 font-bold">{{ order.is_paid ? '已付款' : '未付款' }}</td>
            </tr>
          </tbody>
        </table>
        <div class="absolute right-0 -bottom-11">
          <button type="button" class="bg-green-600 text-white px-6 py-2 rounded" @click="paying">確定付款</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
