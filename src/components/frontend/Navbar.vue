<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores'
import ShoppingCart from './ShoppingCart.vue'

const cartStore = useCartStore()

const show = ref(false)
const openCart = ref(false)
const scrolled = ref(false)

const mask = () => {
  show.value = false
  openCart.value = false
}

const closeCart = () => {
  openCart.value = false
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  cartStore.getCart()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="relative w-full">
    <!-- Top bar -->
    <div
      class="fixed top-0 left-0 w-full z-navbar transition-all duration-500"
      :class="scrolled ? 'bg-white/90 backdrop-blur-xl shadow-navbar' : 'bg-transparent'"
    >
      <div class="container mx-auto relative flex justify-between items-center px-6 h-14">
        <!-- Logo -->
        <RouterLink to="/" class="group">
          <span class="font-brand text-lg font-semibold tracking-wider transition-colors duration-300"
            :class="scrolled ? 'text-primary-dark' : 'text-white'"
          >
            Healthy Diet
          </span>
        </RouterLink>

        <!-- Hamburger (mobile) -->
        <button
          class="hidden max-md:flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          @click="show = !show"
        >
          <span
            class="block w-6 h-0.5 transition-all duration-300 origin-center"
            :class="[show ? 'rotate-45 translate-y-2' : '', scrolled ? 'bg-primary' : 'bg-white']"
          />
          <span
            class="block w-6 h-0.5 transition-all duration-300 origin-center"
            :class="[show ? 'opacity-0' : '', scrolled ? 'bg-primary' : 'bg-white']"
          />
          <span
            class="block w-6 h-0.5 transition-all duration-300 origin-center"
            :class="[show ? '-rotate-45 -translate-y-2' : '', scrolled ? 'bg-primary' : 'bg-white']"
          />
        </button>

        <!-- Desktop nav -->
        <ul class="flex items-center list-none m-0 gap-1 max-md:hidden">
          <li>
            <RouterLink to="/" class="nav-link-item" :class="{ 'nav-link-scrolled': scrolled }">首頁</RouterLink>
          </li>
          <li>
            <RouterLink to="/products" class="nav-link-item" :class="{ 'nav-link-scrolled': scrolled }">產品列表</RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="nav-link-item" :class="{ 'nav-link-scrolled': scrolled }">關於我們</RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/products" class="nav-link-item" :class="{ 'nav-link-scrolled': scrolled }">
              <i class="fa-solid fa-user text-base"></i>
            </RouterLink>
          </li>
          <li class="relative cursor-pointer" @click.prevent="openCart = true">
            <span
              class="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-white/20"
              :class="[
                scrolled ? 'text-primary hover:bg-primary/10' : 'text-white',
                openCart ? 'text-contrast' : ''
              ]"
            >
              <i class="fa-solid fa-bag-shopping text-[15px]"></i>
            </span>
            <div
              v-if="cartStore.items.length > 0"
              class="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full text-center text-[10px] leading-[18px] bg-contrast text-white font-bold"
            >
              {{ cartStore.items.length }}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mobile nav drawer -->
    <Transition name="mobile-nav">
      <div
        v-if="show"
        class="fixed inset-0 z-overlay md:hidden"
      >
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="mask" />
        <div class="absolute top-0 right-0 w-72 h-full bg-white/95 backdrop-blur-xl shadow-2xl">
          <div class="pt-18 px-6">
            <ul class="list-none p-0 m-0 space-y-2">
              <li>
                <RouterLink to="/" class="block text-lg font-medium py-3 px-4 rounded-xl text-text hover:bg-bg-dark hover:text-primary transition-all" @click="show = false">
                  <i class="fa-solid fa-house w-6 mr-3 text-primary-light"></i>首頁
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/products" class="block text-lg font-medium py-3 px-4 rounded-xl text-text hover:bg-bg-dark hover:text-primary transition-all" @click="show = false">
                  <i class="fa-solid fa-leaf w-6 mr-3 text-primary-light"></i>產品列表
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/about" class="block text-lg font-medium py-3 px-4 rounded-xl text-text hover:bg-bg-dark hover:text-primary transition-all" @click="show = false">
                  <i class="fa-solid fa-heart w-6 mr-3 text-primary-light"></i>關於我們
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/admin/products" class="block text-lg font-medium py-3 px-4 rounded-xl text-text hover:bg-bg-dark hover:text-primary transition-all" @click="show = false">
                  <i class="fa-solid fa-user w-6 mr-3 text-primary-light"></i>後台管理
                </RouterLink>
              </li>
              <li class="pt-2 border-t border-bg-dark">
                <a href="#" class="block text-lg font-medium py-3 px-4 rounded-xl text-text hover:bg-bg-dark hover:text-primary transition-all" @click.prevent="openCart = true; show = false">
                  <i class="fa-solid fa-bag-shopping w-6 mr-3 text-primary-light"></i>
                  購物車
                  <span v-if="cartStore.items.length > 0" class="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-contrast text-white text-xs font-bold">
                    {{ cartStore.items.length }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Shopping cart drawer -->
    <ShoppingCart :open-cart="openCart" @close="closeCart" />

    <!-- Overlay mask for cart -->
    <div
      class="fixed inset-0 z-overlay bg-black/20 backdrop-blur-sm transition-opacity duration-300"
      :class="openCart ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'"
      @click.prevent="mask"
    />
  </div>
</template>

<style scoped>
.nav-link-item {
  position: relative;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: 6px 12px;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.92);
  border-radius: 6px;
}

.nav-link-scrolled {
  color: var(--color-text);
}

.nav-link-item:hover {
  color: var(--color-primary-light);
}

.nav-link-scrolled:hover {
  color: var(--color-primary);
  background: var(--color-primary-light);
  background: rgba(45, 106, 79, 0.06);
}


.mobile-nav-enter-active {
  transition: opacity 0.3s ease;
}
.mobile-nav-enter-active > div:last-child {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.mobile-nav-leave-active {
  transition: opacity 0.25s ease;
}
.mobile-nav-leave-active > div:last-child {
  transition: transform 0.25s ease;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
}
.mobile-nav-enter-from > div:last-child,
.mobile-nav-leave-to > div:last-child {
  transform: translateX(100%);
}
</style>
