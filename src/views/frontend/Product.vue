<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore, useLoadingStore } from '@/stores'
import { productsApi } from '@/api'
import { formatMoney } from '@/utils'
import type { Product } from '@/types'
import Navbar from '@/components/frontend/Navbar.vue'
import Footer from '@/components/frontend/Footer.vue'
import Breadcrumb from '@/components/frontend/Breadcrumb.vue'
import SwiperCarousel from '@/components/frontend/SwiperCarousel.vue'

const route = useRoute()
const cartStore = useCartStore()
const loadingStore = useLoadingStore()

const tempProduct = ref<Product & { quantity: number }>({
  id: '',
  title: '',
  category: '',
  content: '',
  description: '',
  imageUrl: [],
  is_enabled: 0,
  origin_price: 0,
  price: 0,
  unit: '',
  quantity: 1
})
const selectPic = ref('')

const addToCart = () => {
  cartStore.addToCart(tempProduct.value.id, tempProduct.value.quantity)
}

onMounted(async () => {
  loadingStore.setLoading(true)
  const { id } = route.params
  const res = await productsApi.getOne(id as string)
  tempProduct.value = { ...res.data.product, quantity: 1 }
  selectPic.value = tempProduct.value.imageUrl[0] ?? ''
  loadingStore.setLoading(false)
})
</script>

<template>
  <div class="mt-16 max-md:mt-20">
    <Navbar />
    <Breadcrumb :product="tempProduct" />
    <div class="container mx-auto px-4">
      <div class="flex flex-col">
        <!-- Product Images + Info -->
        <div class="flex max-lg:flex-col gap-4">
          <!-- Images -->
          <div class="lg:w-7/12">
            <div class="flex max-lg:flex-col justify-between w-full h-87.5 max-lg:h-auto overflow-hidden">
              <img :src="selectPic" class="w-4/5 max-lg:w-full max-lg:h-70 h-full object-cover object-center" alt="" />
              <div class="max-lg:w-full max-lg:flex max-lg:justify-between max-lg:mt-2" style="width: 18%">
                <figure
                  v-for="(img, key) in tempProduct.imageUrl"
                  :key="tempProduct.id + key"
                  class="w-full lg:h-20 max-lg:w-17.5 max-sm:w-12 mb-2.5 cursor-pointer overflow-hidden"
                >
                  <img :src="img" class="w-full h-full object-cover object-center" @click="selectPic = img" />
                </figure>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="lg:w-5/12 max-lg:p-2.5 max-md:text-sm">
            <div class="relative flex flex-col justify-between text-left h-full">
              <div>
                <h2 class="font-bold text-2xl max-md:text-xl max-md:m-0">{{ tempProduct.title }}</h2>
              </div>
              <div class="max-md:bg-bg-light max-md:p-2.5 max-md:my-1">
                <div v-if="tempProduct.price" class="text-2xl font-bold m-0">
                  {{ formatMoney(tempProduct.price) }}
                  <span class="text-xs font-light px-1.5 rounded-lg bg-contrast text-white">sale</span>
                </div>
                <div v-if="tempProduct.origin_price" class="text-gray-500 italic">
                  <del>{{ formatMoney(tempProduct.origin_price) }}</del>
                </div>
              </div>
              <div class="text-sm max-md:bg-bg-light max-md:p-2.5 max-md:my-1">{{ tempProduct.content }}</div>
              <div class="max-md:bg-bg-light max-md:p-2.5 max-md:my-1">
                <p class="mb-1 border-l-3 border-bg-dark pl-1.5">雙十節9 折優惠碼 : <span class="text-contrast font-bold text-lg ml-1">taiwan1010</span></p>
                <p class="m-0 border-l-3 border-bg-dark pl-1.5">周年慶，全館滿<span class="text-contrast font-bold text-lg ml-1">3000免運費</span></p>
              </div>
              <div class="flex justify-between items-center max-md:mt-1">
                <div class="flex items-center rounded-full shadow-sm" style="width: 45%">
                  <button
                    type="button"
                    class="w-7.5 p-0 text-primary"
                    :disabled="tempProduct.quantity === 1"
                    @click="tempProduct.quantity--"
                  >
                    <i class="fas fa-minus text-base"></i>
                  </button>
                  <input
                    type="text"
                    class="flex-1 bg-bg-light border-none text-center text-primary font-bold text-2_5xl p-0"
                    :value="tempProduct.quantity"
                    disabled
                  />
                  <button
                    type="button"
                    class="w-7.5 p-0 text-primary"
                    @click="tempProduct.quantity++"
                  >
                    <i class="fas fa-plus text-base"></i>
                  </button>
                </div>
                <button
                  type="button"
                  class="rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors py-2" style="width: 45%"
                  @click="addToCart"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Description -->
        <div class="mt-8">
          <div class="font-bold text-xl text-primary my-5 section-title"><span>商品描述</span></div>
          <div class="whitespace-pre-wrap text-left leading-7.5 bg-bg-light p-5 max-sm:p-2.5">
            {{ tempProduct.description }}
          </div>
        </div>

        <!-- Related Products -->
        <div class="w-full">
          <div class="font-bold text-xl text-primary my-5 section-title"><span>你可能會喜歡</span></div>
          <SwiperCarousel />
        </div>
      </div>
    </div>

    <!-- Add to cart message -->
    <div
      class="fixed top-25.75 px-5 py-1.5 text-white text-sm shadow transition-all duration-500 ease-out z-cart"
      :class="[
        cartStore.openMsg ? 'right-2.5' : '-right-87.5',
        cartStore.joinMsg ? 'bg-primary' : 'bg-red-600'
      ]"
    >
      <template v-if="cartStore.joinMsg">
        <span>成功加入購物車</span>
      </template>
      <template v-else>
        <span>該商品已放入購物車當中，</span><br />
        <span>請至購物車修改數量即可。</span>
      </template>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.section-title span {
  position: relative;
}

.section-title span::before {
  position: absolute;
  bottom: 0;
  transform: translateX(50%);
  content: "";
  width: 50%;
  height: 2px;
  background: #264710;
  margin-bottom: -10px;
}
</style>
