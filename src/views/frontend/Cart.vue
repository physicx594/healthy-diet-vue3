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
  <div class="font-bold">
    <Navbar />
    <div class="container mx-auto px-4">
      <CheckoutNav :step1="true" />

      <!-- Cart Items -->
      <div class="w-full border border-gray-200 mb-5">
        <div class="bg-primary text-white px-3 py-2 text-left font-bold">購物清單</div>
        <table class="w-full text-center text-sm">
          <thead>
            <tr>
              <th class="w-[10%] p-2 border-none max-md:hidden"></th>
              <th class="w-[20%] p-2 border-none">品名</th>
              <th class="w-[20%] p-2 border-none">單價</th>
              <th class="w-[20%] p-2 border-none">數量</th>
              <th class="w-[20%] p-2 border-none max-md:hidden">小計</th>
              <th class="w-[10%] p-2 border-none"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartStore.items" :key="item.id" class="border-t border-gray-200">
              <td class="p-2 max-md:hidden">
                <img :src="item.product.imageUrl[0]" class="w-[50px] h-[50px] object-cover" />
              </td>
              <td class="p-2">{{ item.product.title }}</td>
              <td class="p-2">
                {{ item.product.price ? formatMoney(item.product.price) : formatMoney(item.product.origin_price) }}
              </td>
              <td class="p-2">
                <div class="flex items-center justify-center">
                  <button
                    type="button"
                    class="rounded-full border border-primary text-primary w-7 h-7 hover:bg-primary hover:text-accent transition-colors"
                    :disabled="item.qty === 1 || loadingStore.formLoading"
                    @click="changeQuantity(item.id, item.product.id, item.qty - 1)"
                  >-</button>
                  <input
                    type="text"
                    class="w-10 text-center border-y border-gray-300 p-0 mx-0.5"
                    :value="item.qty"
                    @change="changeQuantity(item.id, item.product.id, Number(($event.target as HTMLInputElement).value))"
                  />
                  <button
                    type="button"
                    class="rounded-full border border-primary text-primary w-7 h-7 hover:bg-primary hover:text-accent transition-colors"
                    :disabled="loadingStore.formLoading"
                    @click="changeQuantity(item.id, item.product.id, item.qty + 1)"
                  >+</button>
                </div>
              </td>
              <td class="p-2 max-md:hidden">{{ formatMoney(item.product.price * item.qty) }}</td>
              <td class="p-2">
                <button
                  type="button"
                  class="rounded-full border border-contrast text-contrast px-2 py-1 hover:bg-contrast hover:text-white transition-colors"
                  :disabled="loadingStore.formLoading"
                  @click="delItem(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Order Form + Summary -->
      <div class="w-full flex max-lg:flex-col justify-between gap-4 mb-5 text-sm">
        <!-- Delivery Info -->
        <div class="lg:w-[60%] max-lg:w-full border border-gray-200">
          <div class="bg-primary text-white px-3 py-2 text-left font-bold">選擇送貨及付款方式</div>
          <form class="p-3 text-left">
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1">送貨地點</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>台灣</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1">送貨方式</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>黑貓宅配</option>
              </select>
            </div>
            <div>
              <p class="border-l-[3px] border-bg-dark pl-1.5">全省可宅配，最低訂單量<span class="text-red-600">需滿600元</span>才配送(不含運費)，冷凍運費200元，滿3000元即享免運費。</p>
              <p class="m-0 border-l-[3px] border-bg-dark pl-1.5">「冷凍」和「常溫」為不同溫層的商品，無法一起出貨，請分開下單結帳，謝謝！</p>
            </div>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="lg:w-[35%] max-lg:w-full border border-gray-200 h-[300px] relative">
          <div v-if="!loadingStore.formLoading" class="bg-primary text-white px-3 py-2 text-left font-bold">訂單資訊</div>
          <div v-else class="loading-bar h-10" />
          <div class="p-2.5 border-b border-gray-200">
            <div class="flex justify-between mb-2"><div>小計:</div><div>{{ formatMoney(cartStore.totalPrice) }}</div></div>
            <div class="flex justify-between mb-2">
              <div :class="{ 'text-green-600': cartStore.shippingFee === 0 }">
                {{ cartStore.shippingFee === 0 ? '滿額免運:' : '運費:' }}
              </div>
              <div :class="{ 'text-green-600': cartStore.shippingFee === 0 }">{{ formatMoney(cartStore.shippingFee) }}</div>
            </div>
            <div class="flex justify-between mb-2"><div>折扣碼:</div><div>－{{ formatMoney(discountPrice) }}</div></div>
            <div class="flex justify-between mb-2">
              <input
                v-model="couponCode"
                type="text"
                class="w-[70%] px-3 py-1 border border-gray-300 rounded text-sm"
                placeholder="請輸入折扣碼"
              />
              <button type="button" class="bg-green-600 text-white px-3 py-1 rounded text-sm" @click="useCoupon">使用</button>
            </div>
            <div v-if="couponMsg" class="text-red-600 text-left mb-1">{{ couponMsg }}</div>
            <div v-if="cartStore.totalPrice < 600" class="text-red-600 text-left">最低訂單量，需滿600元才配送(不含運費)</div>
          </div>
          <div class="p-2.5">
            <div class="flex justify-between text-sm mb-1">
              <div>總計:</div>
              <div class="text-red-600">{{ formatMoney(cartStore.totalPrice + cartStore.shippingFee - discountPrice) }}</div>
            </div>
            <RouterLink to="/checkout">
              <button
                :disabled="cartStore.totalPrice < 600"
                type="button"
                class="w-full bg-green-600 text-white py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                前往結帳
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.loading-bar {
  background: linear-gradient(45deg, #FEC81A 0%, #FEC81A 20%, #2a5529 20%, #2a5529 45%, #FEC81A 45%, #FEC81A 70%, #2a5529 70%, #2a5529 95%, #FEC81A 95%, #FEC81A 100%);
  background-size: 30px 30px;
  animation: loading 0.5s infinite linear;
}

@keyframes loading {
  0% { background-position: 0 0; }
  100% { background-position: 30px 0; }
}
</style>
