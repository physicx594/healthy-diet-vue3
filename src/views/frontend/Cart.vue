<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore, useLoadingStore } from '@/stores'
import { formatMoney } from '@/utils'
import { couponsApi } from '@/api'
import Navbar from '@/components/frontend/Navbar.vue'
import Footer from '@/components/frontend/Footer.vue'
import CheckoutNav from '@/components/frontend/CheckoutNav.vue'

const cartStore = useCartStore()
const loadingStore = useLoadingStore()

const discountPrice = ref(0)
const couponCode = ref('')
const couponMsg = ref('')

const useCoupon = async () => {
  couponMsg.value = ''
  loadingStore.setFormLoading(true)
  try {
    const res = await couponsApi.apply(couponCode.value)
    discountPrice.value = Math.floor(cartStore.totalPrice - res.data.data.final_total)
  } catch (error: any) {
    couponMsg.value = error.response?.data?.message || '優惠券使用失敗'
    discountPrice.value = 0
    couponCode.value = ''
  } finally {
    loadingStore.setFormLoading(false)
  }
}

const changeQuantity = (cartItemId: string, productId: string, qty: number) => {
  cartStore.changeQuantity(cartItemId, productId, qty)
}

const delItem = (id: string) => {
  cartStore.deleteItem(id)
}

onMounted(() => {
  loadingStore.setLoading(true)
  setTimeout(() => loadingStore.setLoading(false), 1000)
})
</script>

<template>
  <div class="min-h-screen bg-bg-light">
    <Navbar />
    <div class="container mx-auto px-6">
      <CheckoutNav :step1="true" />

      <!-- Cart Items -->
      <div class="bg-white rounded-2xl shadow-card overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-bg-dark/30">
          <h3 class="font-bold text-text flex items-center gap-2">
            <i class="fa-solid fa-bag-shopping text-primary"></i>
            購物清單
          </h3>
        </div>

        <!-- Desktop table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-text-light text-xs uppercase tracking-wider">
                <th class="p-4 text-left max-md:hidden" style="width: 10%"></th>
                <th class="p-4 text-left">品名</th>
                <th class="p-4 text-center">單價</th>
                <th class="p-4 text-center">數量</th>
                <th class="p-4 text-center max-md:hidden">小計</th>
                <th class="p-4" style="width: 5%"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in cartStore.items"
                :key="item.id"
                class="border-t border-bg-dark/20 hover:bg-bg-light/50 transition-colors"
              >
                <td class="p-4 max-md:hidden">
                  <img :src="item.product.imageUrl[0]" class="w-14 h-14 rounded-xl object-cover" />
                </td>
                <td class="p-4 font-medium text-text">{{ item.product.title }}</td>
                <td class="p-4 text-center font-mono text-text-light">
                  {{ item.product.price ? formatMoney(item.product.price) : formatMoney(item.product.origin_price) }}
                </td>
                <td class="p-4">
                  <div class="flex items-center justify-center">
                    <div class="flex items-center bg-bg-light rounded-lg border border-bg-dark overflow-hidden">
                      <button
                        type="button"
                        class="w-8 h-8 flex items-center justify-center text-text-light hover:text-primary transition-colors disabled:opacity-40"
                        :disabled="item.qty === 1 || loadingStore.formLoading"
                        @click="changeQuantity(item.id, item.product.id, item.qty - 1)"
                      >
                        <i class="fa-solid fa-minus text-[10px]"></i>
                      </button>
                      <span class="w-10 text-center text-sm font-bold text-text">{{ item.qty }}</span>
                      <button
                        type="button"
                        class="w-8 h-8 flex items-center justify-center text-text-light hover:text-primary transition-colors disabled:opacity-40"
                        :disabled="loadingStore.formLoading"
                        @click="changeQuantity(item.id, item.product.id, item.qty + 1)"
                      >
                        <i class="fa-solid fa-plus text-[10px]"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center font-mono font-bold text-text max-md:hidden">{{ formatMoney(item.product.price * item.qty) }}</td>
                <td class="p-4">
                  <button
                    type="button"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-text-light/50 hover:text-contrast hover:bg-contrast/10 transition-all"
                    :disabled="loadingStore.formLoading"
                    @click="delItem(item.id)"
                  >
                    <i class="fa-solid fa-trash-can text-xs"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Delivery + Summary -->
      <div class="flex max-lg:flex-col gap-8 mb-16">
        <!-- Delivery Info -->
        <div class="lg:w-3/5 bg-white rounded-2xl shadow-card overflow-hidden">
          <div class="px-6 py-4 border-b border-bg-dark/30">
            <h3 class="font-bold text-text flex items-center gap-2">
              <i class="fa-solid fa-truck text-primary"></i>
              選擇送貨及付款方式
            </h3>
          </div>
          <form class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-medium text-text mb-2">送貨地點</label>
              <select class="w-full px-4 py-3 border border-bg-dark rounded-xl text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent bg-white transition-all">
                <option>台灣</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-text mb-2">送貨方式</label>
              <select class="w-full px-4 py-3 border border-bg-dark rounded-xl text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent bg-white transition-all">
                <option>黑貓宅配</option>
              </select>
            </div>
            <div class="bg-accent/30 rounded-xl p-4 space-y-2 text-sm text-text-light">
              <p class="flex items-start gap-2">
                <i class="fa-solid fa-circle-info text-secondary mt-0.5"></i>
                全省可宅配，最低訂單量<span class="text-contrast font-bold">需滿600元</span>才配送(不含運費)，冷凍運費200元，滿3000元即享免運費。
              </p>
              <p class="flex items-start gap-2">
                <i class="fa-solid fa-circle-info text-secondary mt-0.5"></i>
                「冷凍」和「常溫」為不同溫層的商品，無法一起出貨，請分開下單結帳，謝謝！
              </p>
            </div>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="lg:w-2/5 bg-white rounded-2xl shadow-card overflow-hidden h-fit">
          <div class="px-6 py-4 border-b border-bg-dark/30">
            <h3 v-if="!loadingStore.formLoading" class="font-bold text-text flex items-center gap-2">
              <i class="fa-solid fa-receipt text-primary"></i>
              訂單資訊
            </h3>
            <div v-else class="loading-bar h-6 rounded" />
          </div>
          <div class="p-6 space-y-4">
            <div class="flex justify-between text-sm">
              <span class="text-text-light">小計</span>
              <span class="font-mono font-bold">{{ formatMoney(cartStore.totalPrice) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span :class="cartStore.shippingFee === 0 ? 'text-primary font-medium' : 'text-text-light'">
                {{ cartStore.shippingFee === 0 ? '滿額免運' : '運費' }}
              </span>
              <span :class="cartStore.shippingFee === 0 ? 'text-primary font-bold font-mono' : 'font-mono font-bold'">
                {{ formatMoney(cartStore.shippingFee) }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-text-light">折扣碼</span>
              <span class="font-mono font-bold text-primary">－{{ formatMoney(discountPrice) }}</span>
            </div>

            <!-- Coupon input -->
            <div class="flex gap-2">
              <input
                v-model="couponCode"
                type="text"
                class="flex-1 px-4 py-2.5 border border-bg-dark rounded-xl text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                placeholder="請輸入折扣碼"
              />
              <button
                type="button"
                class="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                @click="useCoupon"
              >
                使用
              </button>
            </div>
            <div v-if="couponMsg" class="text-contrast text-xs">{{ couponMsg }}</div>
            <div v-if="cartStore.totalPrice < 600" class="text-contrast text-xs flex items-center gap-1">
              <i class="fa-solid fa-triangle-exclamation"></i>
              最低訂單量，需滿600元才配送(不含運費)
            </div>

            <div class="border-t border-bg-dark/30 pt-4">
              <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-text">總計</span>
                <span class="font-mono text-2xl font-bold text-contrast">
                  {{ formatMoney(cartStore.totalPrice + cartStore.shippingFee - discountPrice) }}
                </span>
              </div>
              <RouterLink to="/checkout">
                <button
                  :disabled="cartStore.totalPrice < 600"
                  type="button"
                  class="w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  前往結帳
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
