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

const changeQuantity = (cartItemId: string, productId: string, qty: number) => {
  cartStore.changeQuantity(cartItemId, productId, qty)
}

const delItem = (id: string) => {
  cartStore.deleteItem(id)
}

const closeCart = () => {
  emit('close')
}
</script>

<template>
  <div
    class="fixed top-26.5 w-full max-w-125 max-h-120 bg-white shadow-navbar overflow-x-hidden overflow-y-auto transition-all duration-500 ease-out z-cart p-2 max-md:max-w-75 max-md:text-sm"
    :class="openCart ? 'right-2.5' : '-right-125'"
  >
    <!-- Has items -->
    <div v-if="cartStore.totalPrice !== 0">
      <table class="w-full">
        <thead>
          <tr>
            <th class="p-2 border-none max-md:hidden" style="width: 10%"></th>
            <th class="w-1/5 p-2 border-none">品名</th>
            <th class="w-1/5 p-2 border-none">單價</th>
            <th class="w-1/5 p-2 border-none">數量</th>
            <th class="p-2 border-none" style="width: 10%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartStore.items" :key="item.id">
            <td class="p-2 max-md:hidden">
              <img :src="item.product.imageUrl[0]" class="w-12.5 h-12.5 object-cover" />
            </td>
            <td class="p-2">{{ item.product.title }}</td>
            <td class="p-2">
              {{ item.product.price ? formatMoney(item.product.price) : formatMoney(item.product.origin_price) }}
            </td>
            <td class="p-2">
              <div class="flex items-center justify-center max-md:justify-center">
                <button
                  type="button"
                  class="rounded-full border border-primary text-primary font-bold transition-all duration-300 hover:bg-primary hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed max-md:w-5 max-md:p-0"
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
                  class="rounded-full border border-primary text-primary font-bold transition-all duration-300 hover:bg-primary hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed max-md:w-5 max-md:p-0"
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
        <div v-if="!loadingStore.formLoading" class="w-full flex justify-center bg-bg-light py-1">
          <span class="mr-1">小計:</span>
          <span class="text-red-600 font-bold">{{ formatMoney(cartStore.totalPrice) }}</span>
        </div>
        <div v-else class="loading-bar h-6" />
        <RouterLink to="/cart">
          <button
            v-if="!loadingStore.formLoading"
            class="rounded-full border border-primary text-primary font-bold transition-all duration-300 hover:bg-primary hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed block mx-auto mt-3 px-8 py-1.5"
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
        <button class="rounded-full border border-primary text-primary font-bold transition-all duration-300 hover:bg-primary hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed px-8 py-1.5" @click="closeCart">來去購物</button>
      </RouterLink>
    </div>
  </div>
</template>
