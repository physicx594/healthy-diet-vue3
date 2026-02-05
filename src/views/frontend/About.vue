<script setup lang="ts">
import { onMounted } from 'vue'
import { useLoadingStore } from '@/stores'
import Navbar from '@/components/frontend/Navbar.vue'
import Banner from '@/components/frontend/Banner.vue'
import Footer from '@/components/frontend/Footer.vue'

const loadingStore = useLoadingStore()

onMounted(() => {
  loadingStore.setLoading(true)
  setTimeout(() => loadingStore.setLoading(false), 1000)
})
</script>

<template>
  <div class="font-bold">
    <Navbar />
    <div v-if="!loadingStore.isLoading">
      <Banner page-name="About Us" content="發掘蔬食的喜悅與美好" />
      <!-- Banner background -->
      <div class="absolute inset-0 -z-10 h-screen bg-cover bg-center bg-fixed" style="background-image: url('https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80');" />

      <div class="container mx-auto px-4">
        <div class="flex max-md:flex-col mb-12 text-left">
          <div class="md:w-7/12">
            <div class="relative inline-block text-primary font-bold font-display text-4xl max-md:text-2_5xl py-2.5 mb-4 section-title">
              Our Story
            </div>
            <div>
              <p>擁有健康的身體有很多種，可能是培養好的運動習、慣良好的生活作息，也有可能是飲食層面，如同 Healthy Diet 所提倡的，吃得健康!</p>
              <p>健身風氣一年比一年旺，因緣際會開始烹煮水煮餐，不僅是為了健身、減重，外食族的我們，也為了健康、吃清淡與低調味，開始扭轉我們的飲食習慣。</p>
              <p>
                我們秉持<br />
              </p>
              <ul class="list-disc pl-5 space-y-1">
                <li><span class="text-green-600">Eat Local</span>：吃在地食材，挑選當季在地新鮮蔬菜，使用低脂優質肉類。</li>
                <li><span class="text-green-600">Eat Real</span>：吃真正食物，拒絕使用再製加工品，選用大量天然食材；吃食物，不吃食品。</li>
                <li><span class="text-green-600">Eat Natural</span>：吃自然風味，烹煮使用水煮、水炒、清蒸等；不添加過多的調味料，保留食物原始的鮮、甘、甜。</li>
              </ul>
              <p class="mt-3">
                創立於 2020 年，<br />
                期望能推廣健康無負擔的飲食，提供餐盒給所有喜愛我們的朋友們，陪伴大家走過這段長長的旅途！<br />
                健康的生活，「飲食」是關鍵中的關鍵！<br />吃什麼決定你是什麼樣的人，<span class="text-green-600">YOU ARE WHAT YOU EAT！</span>
              </p>
            </div>
          </div>
          <div class="md:w-5/12 flex flex-col justify-center items-center">
            <img src="@/assets/logo.png" class="max-w-full" alt="logo" />
            <RouterLink to="/products">
              <button class="rounded-full border border-contrast text-contrast px-8 py-1.5 mt-12 hover:bg-contrast hover:text-white transition-colors">
                立即訂購
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.section-title::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 3px;
  background: #264710;
}
</style>
