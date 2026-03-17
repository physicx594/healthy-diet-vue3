<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore, useCartStore } from '@/stores'
import { formatMoney } from '@/utils'
import PageHeader from '@/components/frontend/PageHeader.vue'
import Pagination from '@/components/shared/Pagination.vue'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const category = ref('全部商品')
const searchQuery = ref('')
const categories = ['全部商品', '新鮮沙拉', '健康餐盒', '舒肥系列']

const categoryIcons: Record<string, string> = {
  全部商品: 'fa-solid fa-seedling',
  新鮮沙拉: 'fa-solid fa-leaf',
  健康餐盒: 'fa-solid fa-bowl-food',
  舒肥系列: 'fa-solid fa-fire-flame-curved',
}

const filteredProducts = computed(() => {
  let items = productsStore.products
  if (category.value !== '全部商品') {
    items = items.filter(item => item.category === category.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    items = items.filter(item => item.title.toLowerCase().includes(q))
  }
  return items
})

const getProducts = (page = 1) => {
  productsStore.getProducts(page)
}

const discountPercent = (origin: number, price: number) => {
  if (!price || price >= origin) return 0
  return Math.round(((origin - price) / origin) * 100)
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
    <PageHeader
      title="Products"
      subtitle="享受蔬食的喜悅與美好"
      bg-image="https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1500&q=80"
    />

    <!-- Category + Search Bar -->
    <nav class="sticky top-14 z-navbar bg-white/85 backdrop-blur-xl border-b border-primary/5" aria-label="商品分類與搜尋">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center gap-4 py-2.5 overflow-x-auto scrollbar-hide">
          <button
            v-for="cat in categories"
            :key="cat"
            class="group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0"
            :class="category === cat
              ? 'bg-primary text-white font-medium shadow-md shadow-primary/20'
              : 'text-text-light hover:text-text hover:bg-bg-light'"
            @click="category = cat"
          >
            <i :class="categoryIcons[cat]" class="text-xs transition-transform duration-300 group-hover:scale-110"></i>
            <span>{{ cat }}</span>
          </button>

          <div class="flex-1"></div>

          <!-- Search -->
          <div class="hidden sm:flex items-center relative shrink-0">
            <i class="fa-solid fa-search text-xs text-text-light/40 absolute left-3 pointer-events-none"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜尋商品..."
              class="w-44 lg:w-52 h-9 pl-8 pr-3 rounded-full bg-bg-light/80 border border-transparent text-sm text-text placeholder:text-text-light/40 transition-all duration-300 focus:outline-none focus:border-primary/30 focus:bg-white focus:w-60 focus:shadow-sm"
            />
          </div>

          <!-- Item count -->
          <div class="hidden sm:flex items-center gap-1.5 pl-4 border-l border-bg-dark/40 shrink-0">
            <span class="font-mono text-xs text-text-light tracking-wider">{{ filteredProducts.length }}</span>
            <span class="text-xs text-text-light/50">件</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Product Grid Section -->
    <section class="bg-bg-light relative">
      <!-- Subtle grain texture overlay -->
      <div class="absolute inset-0 opacity-3 pointer-events-none grain-overlay" />

      <div class="relative max-w-7xl mx-auto px-6 py-16">
        <!-- Section intro -->
        <div class="flex items-center gap-4 mb-10">
          <span class="label-text text-text-light/40">{{ category }}</span>
          <span class="flex-1 h-px bg-bg-dark"></span>
          <span class="label-text text-text-light/40">Curated Selection</span>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          <article
            v-for="(item, index) in filteredProducts"
            :key="item.id"
            class="group product-card"
            :style="{ '--stagger': `${index * 50}ms` }"
          >
            <div class="relative bg-white rounded-xl overflow-hidden shadow-card h-full flex flex-col product-card-inner">
              <!-- Image Container -->
              <RouterLink :to="`/product/${item.id}`" class="block relative overflow-hidden">
                <div class="aspect-square">
                  <img
                    :src="item.imageUrl[0]"
                    :alt="item.title"
                    class="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <!-- Bottom gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <!-- Hover overlay: browse CTA -->
                <div class="absolute inset-0 flex items-end justify-center pb-5">
                  <span class="inline-flex items-center gap-1.5 text-white text-xs font-medium tracking-wider uppercase bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out-expo">
                    查看詳情
                  </span>
                </div>

                <!-- Discount Badge -->
                <span
                  v-if="item.price && discountPercent(item.origin_price, item.price) > 0"
                  class="absolute top-2.5 left-2.5 inline-flex items-center bg-contrast text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-sm"
                >
                  -{{ discountPercent(item.origin_price, item.price) }}%
                </span>
              </RouterLink>

              <!-- Content -->
              <div class="px-3.5 pt-3 pb-3.5 flex flex-col flex-1">
                <!-- Category label -->
                <span class="text-xs font-mono tracking-widest uppercase text-primary/50 mb-1.5">{{ item.category }}</span>

                <!-- Title -->
                <RouterLink :to="`/product/${item.id}`" class="block mb-auto">
                  <h3 class="text-text font-bold text-sm leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {{ item.title }}
                  </h3>
                </RouterLink>

                <!-- Price row -->
                <div class="flex items-end justify-between mt-3 pt-3 border-t border-bg-dark/30">
                  <div class="flex items-baseline gap-1.5">
                    <span
                      class="font-mono text-sm font-bold tracking-tight"
                      :class="item.price ? 'text-contrast' : 'text-text'"
                    >
                      {{ formatMoney(item.price || item.origin_price) }}
                    </span>
                    <span v-if="item.price" class="font-mono text-xs text-text-light/35 line-through">
                      {{ formatMoney(item.origin_price) }}
                    </span>
                  </div>

                  <!-- Add to cart -->
                  <button
                    class="w-8 h-8 rounded-lg bg-primary/8 text-primary flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-sm hover:shadow-primary/15 active:scale-95 cursor-pointer"
                    aria-label="加入購物車"
                    @click="cartStore.addToCart(item.id)"
                  >
                    <i class="fa-solid fa-plus text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-28">
          <div class="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
            <i class="fa-solid fa-seedling text-3xl text-primary/25"></i>
          </div>
          <p class="text-text-light text-sm mb-1">此分類目前沒有商品</p>
          <button
            class="mt-3 text-sm text-primary font-medium hover:text-primary-dark transition-colors cursor-pointer"
            @click="category = '全部商品'"
          >
            瀏覽全部商品 <i class="fa-solid fa-arrow-right text-xs ml-1"></i>
          </button>
        </div>

        <!-- Pagination -->
        <div class="mt-20 mb-4">
          <Pagination :pages="productsStore.pagination" @update="getProducts" />
        </div>
      </div>
    </section>

    <!-- Add to cart toast -->
    <Transition name="toast">
      <div
        v-if="cartStore.openMsg"
        class="fixed top-24 right-4 px-5 py-3.5 rounded-xl text-white text-sm shadow-lg z-cart flex items-center gap-3 backdrop-blur-sm"
        :class="cartStore.joinMsg ? 'bg-primary/95' : 'bg-contrast/95'"
      >
        <i :class="cartStore.joinMsg ? 'fa-solid fa-check-circle' : 'fa-solid fa-info-circle'" class="text-base"></i>
        <span v-if="cartStore.joinMsg">成功加入購物車</span>
        <span v-else>該商品已在購物車中，請至購物車修改數量。</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Card entrance animation with stagger */
.product-card {
  animation: stagger-in 0.5s var(--ease-out-expo) both;
  animation-delay: var(--stagger);
}

/* Card hover: lift + shadow choreography */
.product-card-inner {
  transition:
    transform 0.5s var(--ease-out-expo),
    box-shadow 0.5s var(--ease-out-expo);
}

.group:hover .product-card-inner {
  transform: translateY(-4px);
  box-shadow:
    0 8px 20px -6px rgba(45, 106, 79, 0.1),
    0 16px 36px -10px rgba(0, 0, 0, 0.05);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .product-card {
    animation: none;
  }

  .product-card-inner {
    transition: box-shadow 0.2s ease;
  }

  .group:hover .product-card-inner {
    transform: none;
  }
}

</style>
