<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore, useCartStore, useLoadingStore } from '@/stores'
import { formatMoney } from '@/utils'
import Navbar from '@/components/frontend/Navbar.vue'
import Banner from '@/components/frontend/Banner.vue'
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
      <Banner page-name="Products List" content="享受疏食的喜悅與美好" bg-image="https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1500&q=80" />

      <div class="container mx-auto px-4 mt-5">
        <!-- Category Filter -->
        <div class="w-full">
          <ul class="flex max-md:flex-col justify-center items-center gap-5 max-md:gap-2 mb-4 list-none">
            <li v-for="cat in categories" :key="cat" @click="category = cat">
              <button
                class="rounded-full text-white px-8 py-1.5 font-bold transition-colors"
                :class="category === cat ? 'bg-contrast' : 'bg-primary hover:bg-primary-dark'"
              >
                {{ cat }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
          <div
            v-for="item in filteredProducts"
            :key="item.id"
            class="my-12 text-center"
          >
            <figure class="relative w-full max-w-62.5 max-h-62.5 max-md:w-50 max-md:h-50 rounded-full overflow-hidden mx-auto mb-3 shadow-product group aspect-square">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.imageUrl[0]" class="w-full h-full object-cover transition-all duration-300 group-hover:brightness-20" />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                  <div v-if="!item.price">
                    <div class="text-xl font-bold text-red-500">{{ formatMoney(item.origin_price) }}</div>
                  </div>
                  <div v-else>
                    <div class="text-gray-400"><del>{{ formatMoney(item.origin_price) }}</del></div>
                    <div class="text-2xl font-bold text-red-500">{{ formatMoney(item.price) }}</div>
                  </div>
                </div>
              </RouterLink>
            </figure>
            <h5 class="font-bold mb-3">{{ item.title }}</h5>
            <button
              class="rounded-full border border-primary text-primary px-8 py-1.5 hover:bg-primary hover:text-white transition-colors"
              @click="addToCart(item)"
            >
              加入購物車
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div class="my-18">
          <Pagination :pages="productsStore.pagination" @update="getProducts" />
        </div>
      </div>
    </div>

    <!-- Add to cart message -->
    <div
      class="fixed top-17.75 px-5 py-1.5 text-white text-sm shadow transition-all duration-500 ease-out z-cart"
      :class="[
        cartStore.openMsg ? 'right-2.5' : '-right-87.5',
        cartStore.joinMsg ? 'bg-primary-light' : 'bg-red-600'
      ]"
    >
      <span v-if="cartStore.joinMsg">成功加入購物車</span>
      <span v-else>該商品已放入購物車當中，<br />請至購物車修改數量即可。</span>
    </div>

    <Footer />
  </div>
</template>
