<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore, useCartStore, useLoadingStore } from '@/stores'
import { formatMoney } from '@/utils'
import Navbar from '@/components/frontend/Navbar.vue'
import PageHeader from '@/components/frontend/PageHeader.vue'
import Footer from '@/components/frontend/Footer.vue'
import Gotop from '@/components/frontend/Gotop.vue'
import Pagination from '@/components/shared/Pagination.vue'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const loadingStore = useLoadingStore()

const category = ref('全部商品')

const categories = ['全部商品', '新鮮沙拉', '健康餐盒', '舒肥系列']

const filteredProducts = computed(() => {
  if (category.value === '全部商品') return productsStore.products
  return productsStore.products.filter(item => item.category === category.value)
})

const getProducts = (page = 1) => {
  productsStore.getProducts(page)
}

const addToCart = (item: { id: string }) => {
  cartStore.addToCart(item.id)
}

onMounted(() => {
  if (route.query.category) {
    category.value = route.query.category as string
  }
  getProducts()
})
</script>

<template>
  <div>
    <Navbar />
    <Gotop />
    <div v-if="!loadingStore.isLoading">
      <PageHeader title="Products" subtitle="享受蔬食的喜悅與美好" />

      <div class="container mx-auto px-6 py-12">
        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
            :class="category === cat
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-text-light hover:bg-bg-dark hover:text-primary border border-bg-dark'"
            @click="category = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="item in filteredProducts"
            :key="item.id"
            class="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Image -->
            <RouterLink :to="`/product/${item.id}`" class="block">
              <div class="relative aspect-square overflow-hidden">
                <img
                  :src="item.imageUrl[0]"
                  :alt="item.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span class="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm">
                    查看詳情
                  </span>
                </div>
              </div>
            </RouterLink>

            <!-- Info -->
            <div class="p-6">
              <h5 class="font-bold text-text mb-3 text-lg">{{ item.title }}</h5>
              <div class="flex items-center justify-between">
                <div>
                  <div v-if="item.price" class="flex items-center gap-2">
                    <span class="font-mono text-xl font-bold text-contrast">{{ formatMoney(item.price) }}</span>
                    <span class="text-text-light text-sm line-through">{{ formatMoney(item.origin_price) }}</span>
                  </div>
                  <span v-else class="font-mono text-xl font-bold text-text">{{ formatMoney(item.origin_price) }}</span>
                </div>
                <button
                  class="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all duration-200 hover:scale-105"
                  @click="addToCart(item)"
                >
                  <i class="fa-solid fa-cart-plus text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-16 mb-8">
          <Pagination :pages="productsStore.pagination" @update="getProducts" />
        </div>
      </div>
    </div>

    <!-- Add to cart toast -->
    <Transition name="toast">
      <div
        v-if="cartStore.openMsg"
        class="fixed top-24 right-4 px-5 py-3 rounded-xl text-white text-sm shadow-lg z-cart flex items-center gap-3"
        :class="cartStore.joinMsg ? 'bg-primary' : 'bg-contrast'"
      >
        <i :class="cartStore.joinMsg ? 'fa-solid fa-check-circle' : 'fa-solid fa-info-circle'"></i>
        <span v-if="cartStore.joinMsg">成功加入購物車</span>
        <span v-else>該商品已在購物車中，請至購物車修改數量。</span>
      </div>
    </Transition>

    <Footer />
  </div>
</template>

<style scoped>
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
