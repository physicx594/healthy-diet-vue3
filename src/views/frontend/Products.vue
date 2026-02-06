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
  <div class="bg-bg-light min-h-screen">
    <Navbar />
    <Gotop />
    <div v-if="!loadingStore.isLoading">
      <PageHeader
        title="Products"
        subtitle="享受蔬食的喜悅與美好"
        bg-image="https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1500&q=80"
      />

      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="flex gap-10 max-lg:flex-col">
          <!-- Sidebar Filter (Desktop) -->
          <aside class="w-56 shrink-0 max-lg:hidden">
            <div class="sticky top-20">
              <h3 class="text-xs font-bold text-text-light uppercase tracking-widest mb-5">商品分類</h3>
              <ul class="space-y-1">
                <li v-for="cat in categories" :key="cat">
                  <button
                    class="w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer"
                    :class="category === cat
                      ? 'bg-primary text-white font-medium shadow-sm'
                      : 'text-text-light hover:bg-white hover:text-primary'"
                    @click="category = cat"
                  >
                    {{ cat }}
                  </button>
                </li>
              </ul>
              <div class="mt-6 pt-5 border-t border-bg-dark">
                <p class="text-xs text-text-light">共 {{ filteredProducts.length }} 件商品</p>
              </div>
            </div>
          </aside>

          <!-- Mobile Filter -->
          <div class="hidden max-lg:flex flex-wrap items-center gap-2.5">
            <button
              v-for="cat in categories"
              :key="cat"
              class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
              :class="category === cat
                ? 'bg-primary text-white shadow-md'
                : 'bg-white/80 text-text-light hover:bg-white hover:text-primary border border-secondary/20'"
              @click="category = cat"
            >
              {{ cat }}
            </button>
            <span class="text-text-light text-xs ml-1">{{ filteredProducts.length }} 件</span>
          </div>

          <!-- Main Content -->
          <div class="flex-1 min-w-0">
            <!-- Bento Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <template v-for="(item, index) in filteredProducts" :key="item.id">
                <!-- Featured Card (first item + every 4th) -->
                <div
                  v-if="index % 4 === 0"
                  class="group sm:col-span-2"
                >
                  <div class="bg-white rounded-2xl overflow-hidden shadow-card group-hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col sm:flex-row">
                    <RouterLink :to="`/product/${item.id}`" class="block sm:w-1/2">
                      <div class="relative aspect-[4/3] sm:aspect-auto sm:h-full overflow-hidden">
                        <img
                          :src="item.imageUrl[0]"
                          :alt="item.title"
                          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        <span v-if="item.price" class="absolute top-3 left-3 bg-contrast text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          特價
                        </span>
                      </div>
                    </RouterLink>
                    <div class="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                      <span class="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit mb-3">{{ item.category }}</span>
                      <RouterLink :to="`/product/${item.id}`">
                        <h3 class="font-bold text-text text-xl mb-2 hover:text-primary transition-colors">{{ item.title }}</h3>
                      </RouterLink>
                      <p class="text-text-light text-sm leading-relaxed mb-5 line-clamp-2">{{ item.description }}</p>
                      <div class="flex items-center justify-between mt-auto">
                        <div>
                          <div v-if="item.price" class="flex items-center gap-2">
                            <span class="font-mono text-2xl font-bold text-contrast">{{ formatMoney(item.price) }}</span>
                            <span class="text-text-light text-sm line-through">{{ formatMoney(item.origin_price) }}</span>
                          </div>
                          <span v-else class="font-mono text-2xl font-bold text-text">{{ formatMoney(item.origin_price) }}</span>
                        </div>
                        <button
                          class="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all duration-200 hover:scale-105 cursor-pointer"
                          @click="addToCart(item)"
                        >
                          <i class="fa-solid fa-cart-plus text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Standard Card -->
                <div
                  v-else
                  class="group"
                >
                  <div class="bg-white rounded-2xl overflow-hidden shadow-card group-hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                    <RouterLink :to="`/product/${item.id}`" class="block">
                      <div class="relative aspect-[4/3] overflow-hidden">
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
                        <span v-if="item.price" class="absolute top-3 left-3 bg-contrast text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          特價
                        </span>
                      </div>
                    </RouterLink>
                    <div class="p-5 flex flex-col flex-1">
                      <span class="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit mb-2">{{ item.category }}</span>
                      <h5 class="font-bold text-text mb-3 text-base">{{ item.title }}</h5>
                      <div class="flex items-center justify-between mt-auto">
                        <div>
                          <div v-if="item.price" class="flex items-center gap-2">
                            <span class="font-mono text-lg font-bold text-contrast">{{ formatMoney(item.price) }}</span>
                            <span class="text-text-light text-xs line-through">{{ formatMoney(item.origin_price) }}</span>
                          </div>
                          <span v-else class="font-mono text-lg font-bold text-text">{{ formatMoney(item.origin_price) }}</span>
                        </div>
                        <button
                          class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all duration-200 hover:scale-105 cursor-pointer"
                          @click="addToCart(item)"
                        >
                          <i class="fa-solid fa-cart-plus text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>

            <!-- Empty State -->
            <div v-if="filteredProducts.length === 0" class="text-center py-20">
              <i class="fa-solid fa-leaf text-4xl text-primary/30 mb-4 block"></i>
              <p class="text-text-light">此分類目前沒有商品</p>
            </div>

            <!-- Pagination -->
            <div class="mt-16 mb-8">
              <Pagination :pages="productsStore.pagination" @update="getProducts" />
            </div>
          </div>
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
