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
    class="fixed top-0 right-0 w-full max-w-md h-full bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-out z-cart flex flex-col"
    :class="openCart ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-5 border-b border-bg-dark/30">
      <h3 class="text-lg font-bold text-text">
        <i class="fa-solid fa-bag-shopping text-primary mr-2"></i>購物車
      </h3>
      <button
        aria-label="關閉購物車"
        class="w-8 h-8 rounded-full flex items-center justify-center text-text-light hover:bg-bg-dark hover:text-text transition-all"
        @click="closeCart"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <!-- Cart content -->
    <div class="flex-1 overflow-y-auto px-6 py-4">
      <div v-if="cartStore.totalPrice !== 0" class="space-y-4">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex gap-4 bg-bg-light rounded-xl p-3"
        >
          <img :src="item.product.imageUrl[0]" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <h5 class="text-sm font-bold text-text truncate">{{ item.product.title }}</h5>
            <p class="text-sm text-contrast font-mono font-bold mt-1">
              {{ item.product.price ? formatMoney(item.product.price) : formatMoney(item.product.origin_price) }}
            </p>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center bg-white rounded-lg border border-bg-dark overflow-hidden">
                <button
                  type="button"
                  class="w-7 h-7 flex items-center justify-center text-text-light hover:text-primary transition-colors disabled:opacity-40"
                  :disabled="item.qty === 1 || loadingStore.formLoading"
                  @click="changeQuantity(item.id, item.product.id, item.qty - 1)"
                >
                  <i class="fa-solid fa-minus text-[10px]"></i>
                </button>
                <span class="w-8 text-center text-sm font-bold text-text">{{ item.qty }}</span>
                <button
                  type="button"
                  class="w-7 h-7 flex items-center justify-center text-text-light hover:text-primary transition-colors disabled:opacity-40"
                  :disabled="loadingStore.formLoading"
                  @click="changeQuantity(item.id, item.product.id, item.qty + 1)"
                >
                  <i class="fa-solid fa-plus text-[10px]"></i>
                </button>
              </div>
              <button
                type="button"
                class="w-7 h-7 rounded-full flex items-center justify-center text-text-light/50 hover:text-contrast hover:bg-contrast/10 transition-all"
                :disabled="loadingStore.formLoading"
                @click="delItem(item.id)"
              >
                <i class="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty cart -->
      <div v-else class="flex flex-col items-center justify-center h-full text-center">
        <i class="fa-solid fa-bag-shopping text-5xl text-bg-dark mb-4"></i>
        <h4 class="text-text font-bold text-lg mb-2">購物車是空的</h4>
        <p class="text-text-light text-sm mb-6">快去探索美味的健康餐點吧！</p>
        <RouterLink to="/products">
          <button class="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors" @click="closeCart">
            來去購物
          </button>
        </RouterLink>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="cartStore.totalPrice !== 0" class="border-t border-bg-dark/30 px-6 py-5">
      <div v-if="!loadingStore.formLoading" class="flex justify-between items-center mb-4">
        <span class="text-text-light">小計</span>
        <span class="text-xl font-mono font-bold text-text">{{ formatMoney(cartStore.totalPrice) }}</span>
      </div>
      <div v-else class="loading-bar h-5 rounded mb-4" />
      <RouterLink to="/cart">
        <button
          v-if="!loadingStore.formLoading"
          class="w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg"
          @click="closeCart"
        >
          前往購物車
        </button>
      </RouterLink>
    </div>
  </div>
</template>
