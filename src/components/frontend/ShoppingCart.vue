<script setup lang="ts">
import { useCartStore, useLoadingStore } from '@/stores'
import { formatMoney } from '@/utils'

defineProps<{
  openCart: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const cartStore = useCartStore()
const loadingStore = useLoadingStore()

function changeQuantity(cartItemId: string, productId: string, qty: number) {
  cartStore.changeQuantity(cartItemId, productId, qty)
}

function delItem(id: string) {
  cartStore.deleteItem(id)
}

function closeCart() {
  emit('close')
}
</script>

<template>
  <div
    class="fixed top-[106px] w-full max-w-[500px] max-h-[480px] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)] overflow-x-hidden overflow-y-auto transition-all duration-500 ease-out z-[2000] p-2 max-md:max-w-[300px] max-md:text-sm"
    :class="openCart ? 'right-2.5' : '-right-[500px]'"
  >
    <!-- Has items -->
    <div v-if="cartStore.totalPrice !== 0">
      <table class="w-full">
        <thead>
          <tr>
            <th class="w-[10%] p-2 border-none max-md:hidden"></th>
            <th class="w-[20%] p-2 border-none">品名</th>
            <th class="w-[20%] p-2 border-none">單價</th>
            <th class="w-[20%] p-2 border-none">數量</th>
            <th class="w-[10%] p-2 border-none"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartStore.items" :key="item.id">
            <td class="p-2 max-md:hidden">
              <img :src="item.product.imageUrl[0]" class="w-[50px] h-[50px] object-cover" />
            </td>
            <td class="p-2">{{ item.product.title }}</td>
            <td class="p-2">
              {{ item.product.price ? formatMoney(item.product.price) : formatMoney(item.product.origin_price) }}
            </td>
            <td class="p-2">
              <div class="flex items-center justify-center max-md:justify-center">
                <button
                  type="button"
                  class="cart-btn max-md:w-5 max-md:p-0"
                  :disabled="item.qty === 1 || loadingStore.formLoading"
                  @click="changeQuantity(item.id, item.product.id, item.qty - 1)"
                >-</button>
                <input
                  type="text"
                  class="w-10 text-center border-y border-gray-300 p-0"
                  :value="item.qty"
                  @change="changeQuantity(item.id, item.product.id, Number(($event.target as HTMLInputElement).value))"
                />
                <button
                  type="button"
                  class="cart-btn max-md:w-5 max-md:p-0"
                  :disabled="loadingStore.formLoading"
                  @click="changeQuantity(item.id, item.product.id, item.qty + 1)"
                >+</button>
              </div>
            </td>
            <td class="p-2">
              <button
                type="button"
                class="border border-contrast text-contrast rounded-full px-2 py-1 hover:bg-contrast hover:text-white transition-colors"
                :disabled="loadingStore.formLoading"
                @click="delItem(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-4">
        <div v-if="!loadingStore.formLoading" class="w-full flex justify-center bg-[#f7f7f7] py-1">
          <span class="mr-1">小計:</span>
          <span class="text-red-600 font-bold">{{ formatMoney(cartStore.totalPrice) }}</span>
        </div>
        <div v-else class="loading-bar" />
        <RouterLink to="/cart">
          <button
            v-if="!loadingStore.formLoading"
            class="cart-btn block mx-auto mt-3 px-8 py-1.5"
            @click="closeCart"
          >
            前往購物車
          </button>
        </RouterLink>
      </div>
    </div>

    <!-- Empty cart -->
    <div v-else class="py-3 text-center">
      <h3 class="text-primary font-bold mb-5 text-xl">購物車是空的</h3>
      <RouterLink to="/products">
        <button class="cart-btn px-8 py-1.5" @click="closeCart">來去購物</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.cart-btn {
  border-radius: 50px;
  border: 1px solid #264710;
  color: #264710;
  font-weight: bold;
  transition: all 0.3s;
}

.cart-btn:hover {
  background: #264710;
  color: #FEC81A;
}

.cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-bar {
  width: 100%;
  height: 24px;
  background: linear-gradient(45deg, #FEC81A 0%, #FEC81A 20%, #2a5529 20%, #2a5529 45%, #FEC81A 45%, #FEC81A 70%, #2a5529 70%, #2a5529 95%, #FEC81A 95%, #FEC81A 100%);
  background-size: 30px 30px;
  animation: loading 0.5s infinite linear;
}

@keyframes loading {
  0% { background-position: 0 0; }
  100% { background-position: 30px 0; }
}
</style>
