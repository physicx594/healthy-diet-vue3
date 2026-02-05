<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores'
import ShoppingCart from './ShoppingCart.vue'

const cartStore = useCartStore()

const show = ref(false)
const openCart = ref(false)

const mask = () => {
  if (!show.value) {
    openCart.value = !openCart.value
  } else if (!openCart.value) {
    show.value = !show.value
  } else {
    show.value = false
    openCart.value = false
  }
}

const closeCart = () => {
  openCart.value = false
}

onMounted(() => {
  cartStore.getCart()
})
</script>

<template>
  <div class="relative w-full">
    <!-- Top bar -->
    <div class="fixed top-0 left-0 w-full z-[1030] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
      <div class="container mx-auto relative flex justify-between items-center px-4 py-2 max-h-20">
        <RouterLink to="/" class="p-0">
          <img src="@/assets/logo.png" class="w-15 max-md:w-20" alt="logo" />
        </RouterLink>

        <!-- Hamburger (mobile) -->
        <div
          class="hidden max-md:block cursor-pointer"
          :class="{ 'hamburger-open': show }"
          @click="show = !show"
        >
          <span class="block my-[5px] mx-auto w-[30px] h-[3px] bg-primary transition-transform duration-300 origin-center" :class="show ? 'rotate-45 translate-y-[9px]' : ''" />
          <span class="block my-[5px] mx-auto w-[30px] h-[3px] bg-primary transition-transform duration-300 origin-center" :class="show ? '-rotate-45' : ''" />
          <span class="block my-[5px] mx-auto w-[30px] h-[3px] bg-primary transition-transform duration-300 origin-center" :class="show ? '-rotate-45 -translate-y-[5.5px] translate-x-[2.5px]' : ''" />
        </div>

        <!-- Desktop nav -->
        <ul class="flex items-center list-none m-0 gap-1 max-md:hidden">
          <li>
            <RouterLink to="/" class="nav-link-item">首頁</RouterLink>
          </li>
          <li>
            <RouterLink to="/products" class="nav-link-item">產品列表</RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="nav-link-item">關於我們</RouterLink>
          </li>
          <li>
            <span class="px-2.5 text-primary font-bold cursor-pointer hover:text-contrast transition-colors">
              <i class="fas fa-user text-lg"></i>
            </span>
          </li>
          <li class="relative cursor-pointer" @click.prevent="openCart = true">
            <span class="px-2.5 text-primary font-bold cursor-pointer hover:text-contrast transition-colors" :class="{ 'text-contrast': openCart }">
              <i class="fas fa-shopping-cart text-lg"></i>
            </span>
            <div
              v-if="cartStore.items.length > 0"
              class="absolute -right-0 -top-0 w-5 h-5 rounded-full text-center text-sm leading-5 bg-white border -translate-x-2.5 -translate-y-2.5 transition-colors"
              :class="openCart ? 'text-contrast border-contrast' : 'text-primary border-primary'"
            >
              {{ cartStore.items.length }}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mobile nav dropdown -->
    <div
      class="fixed top-20 w-full bg-white/95 shadow-[0_2px_6px_rgba(0,0,0,0.1)] z-[2001] overflow-hidden transition-all duration-300 md:hidden"
      :class="show ? 'max-h-[330px]' : 'max-h-0'"
    >
      <ul class="list-none p-5 m-0">
        <li>
          <RouterLink to="/" class="block text-2xl font-medium my-1 text-primary active:bg-primary active:text-white px-2 py-1">首頁</RouterLink>
        </li>
        <li>
          <RouterLink to="/products" class="block text-2xl font-medium my-1 text-primary active:bg-primary active:text-white px-2 py-1">產品列表</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="block text-2xl font-medium my-1 text-primary active:bg-primary active:text-white px-2 py-1">關於我們</RouterLink>
        </li>
        <li>
          <a href="#" class="block text-2xl font-medium my-1 text-primary px-2 py-1">會員專區</a>
        </li>
        <li @click.prevent="openCart = true; show = false">
          <a href="#" class="block text-2xl font-medium my-1 text-primary px-2 py-1">
            購物車<span v-if="cartStore.items.length > 0">( {{ cartStore.items.length }} )</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Shopping cart drawer -->
    <ShoppingCart :open-cart="openCart" @close="closeCart" />

    <!-- Overlay mask -->
    <div
      class="fixed inset-0 z-[1999]"
      :class="openCart || show ? 'block' : 'hidden'"
      @click.prevent="mask"
    />
  </div>
</template>

<style scoped>
.nav-link-item {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  padding: 0 10px;
  margin-right: 10px;
  transition: 0.5s;
  color: #264710;
}

.nav-link-item:hover,
.nav-link-item.active {
  color: #800000;
}

.nav-link-item::after {
  content: '';
  display: block;
  margin: 0 auto;
  width: 0;
  height: 1px;
  background: #800000;
  transition: 0.5s;
}

.nav-link-item:hover::after,
.nav-link-item.active::after {
  width: 50%;
}
</style>
