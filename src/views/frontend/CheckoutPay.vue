<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore, useLoadingStore } from '@/stores'
import { ordersApi } from '@/api'
import { formatMoney, truncateOrderId } from '@/utils'
import type { Order } from '@/types'
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
  <div v-if="!loadingStore.isLoading" class="container mx-auto px-6">
      <CheckoutNav :step1="true" :step2="true" :step3="true" />

      <div class="max-w-3xl mx-auto mb-16 space-y-6">
        <!-- Cart Summary -->
        <div class="bg-white rounded-2xl shadow-card overflow-hidden">
          <button
            class="w-full px-6 py-4 flex items-center justify-between hover:bg-bg-light/50 transition-colors"
            @click="open = !open"
          >
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-bag-shopping text-primary"></i>
              <span class="font-bold text-text">購物車</span>
              <span v-if="productsList.length" class="text-sm text-text-light">({{ productsList.length }} 件)</span>
            </div>
            <div class="flex items-center gap-3">
              <span v-if="order?.total" class="font-mono font-bold text-contrast">{{ formatMoney(order.total) }}</span>
              <i class="fa-solid fa-chevron-down text-xs text-text-light transition-transform duration-300" :class="{ 'rotate-180': open }"></i>
            </div>
          </button>

          <!-- Expandable Product List -->
          <div class="overflow-hidden transition-all duration-500 ease-out" :class="open ? 'max-h-[600px]' : 'max-h-0'">
            <div class="border-t border-bg-dark/20">
              <div v-for="(item, index) in productsList" :key="index" class="flex items-center gap-4 px-6 py-3 border-b border-bg-dark/10 last:border-b-0">
                <img :src="item.product.imageUrl[0]" class="w-14 h-14 rounded-xl object-cover" />
                <div class="flex-1">
                  <h5 class="text-sm font-medium text-text">{{ item.product.title }}</h5>
                  <span class="text-xs text-text-light">x{{ item.qty }}</span>
                </div>
                <span v-if="item.product.price" class="font-mono text-sm font-bold text-text">{{ formatMoney(item.product.price * item.qty) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Info -->
        <div class="bg-white rounded-2xl shadow-card overflow-hidden">
          <div class="px-6 py-4 border-b border-bg-dark/30 flex items-center justify-between">
            <h3 class="font-bold text-text flex items-center gap-2">
              <i class="fa-solid fa-receipt text-primary"></i>
              訂單資訊
            </h3>
            <span v-if="order?.id" class="text-xs text-text-light font-mono">{{ truncateOrderId(order.id) }}</span>
          </div>

          <div v-if="order?.user" class="divide-y divide-bg-dark/20">
            <div class="flex justify-between px-6 py-3 text-sm">
              <span class="text-text-light">姓名</span>
              <span class="text-text font-medium">{{ order.user.name }}</span>
            </div>
            <div class="flex justify-between px-6 py-3 text-sm">
              <span class="text-text-light">電話</span>
              <span class="text-text font-medium">{{ order.user.tel }}</span>
            </div>
            <div class="flex justify-between px-6 py-3 text-sm">
              <span class="text-text-light">Email</span>
              <span class="text-text font-medium">{{ order.user.email }}</span>
            </div>
            <div class="flex justify-between px-6 py-3 text-sm">
              <span class="text-text-light">地址</span>
              <span class="text-text font-medium">{{ order.user.address }}</span>
            </div>
            <div class="flex justify-between px-6 py-3 text-sm">
              <span class="text-text-light">付款方式</span>
              <span class="text-text font-medium">{{ order.payment }}</span>
            </div>
            <div class="flex justify-between px-6 py-3 text-sm">
              <span class="text-text-light">付款狀態</span>
              <span :class="order.is_paid ? 'text-primary font-bold' : 'text-contrast font-bold'">
                {{ order.is_paid ? '已付款' : '未付款' }}
              </span>
            </div>
          </div>

          <div class="px-6 py-5 border-t border-bg-dark/30">
            <button
              type="button"
              class="w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              @click="paying"
            >
              <i class="fa-solid fa-credit-card"></i>
              確定付款
            </button>
          </div>
        </div>
      </div>
  </div>
</template>
