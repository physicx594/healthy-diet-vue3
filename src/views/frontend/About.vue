<script setup lang="ts">
import { onMounted } from 'vue'
import { useLoadingStore } from '@/stores'
import Navbar from '@/components/frontend/Navbar.vue'
import PageHeader from '@/components/frontend/PageHeader.vue'
import Footer from '@/components/frontend/Footer.vue'

const loadingStore = useLoadingStore()

onMounted(() => {
  loadingStore.setLoading(true)
  setTimeout(() => loadingStore.setLoading(false), 1000)
})
</script>

<template>
  <div>
    <Navbar />
    <div v-if="!loadingStore.isLoading">
      <Banner
        page-name="About Us"
        content="發掘蔬食的喜悅與美好"
        bg-image="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
        :sub-page="true"
      />

      <!-- Brand Story -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-6">
          <div class="flex max-lg:flex-col items-center gap-12 lg:gap-20">
            <!-- Text -->
            <div class="lg:w-1/2" data-aos="fade-right" data-aos-duration="800">
              <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Our Story</span>
              <h2 class="font-display text-4xl lg:text-5xl font-semibold text-text mt-2 mb-8 leading-tight">品牌故事</h2>
              <div class="space-y-4 text-text-light leading-relaxed">
                <p>擁有健康的身體有很多種，可能是培養好的運動習慣、良好的生活作息，也有可能是飲食層面，如同 Healthy Diet 所提倡的，吃得健康!</p>
                <p>健身風氣一年比一年旺，因緣際會開始烹煮水煮餐，不僅是為了健身、減重，外食族的我們，也為了健康、吃清淡與低調味，開始扭轉我們的飲食習慣。</p>
                <p>創立於 2020 年，期望能推廣健康無負擔的飲食，提供餐盒給所有喜愛我們的朋友們，陪伴大家走過這段長長的旅途！</p>
              </div>
            </div>

            <!-- Image -->
            <div class="lg:w-1/2" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              <div class="relative">
                <img
                  src="https://images.unsplash.com/photo-1595786802424-d6efbc413db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                  class="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl"
                  alt="Our Story"
                />
                <div class="absolute -top-6 -left-6 w-32 h-32 bg-accent rounded-2xl -z-10 max-lg:hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Values -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Our Values</span>
            <h2 class="font-display text-4xl lg:text-5xl font-semibold text-text mt-2">核心理念</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="text-center group" data-aos="fade-up" data-aos-delay="0">
              <div class="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <i class="fa-solid fa-location-dot text-3xl text-primary"></i>
              </div>
              <h3 class="text-lg font-bold text-text mb-3">Eat Local</h3>
              <p class="text-text-light text-sm leading-relaxed">吃在地食材，挑選當季在地新鮮蔬菜，使用低脂優質肉類。</p>
            </div>

            <div class="text-center group" data-aos="fade-up" data-aos-delay="150">
              <div class="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <i class="fa-solid fa-apple-whole text-3xl text-primary"></i>
              </div>
              <h3 class="text-lg font-bold text-text mb-3">Eat Real</h3>
              <p class="text-text-light text-sm leading-relaxed">拒絕使用再製加工品，選用大量天然食材；吃食物，不吃食品。</p>
            </div>

            <div class="text-center group" data-aos="fade-up" data-aos-delay="300">
              <div class="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <i class="fa-solid fa-leaf text-3xl text-primary"></i>
              </div>
              <h3 class="text-lg font-bold text-text mb-3">Eat Natural</h3>
              <p class="text-text-light text-sm leading-relaxed">使用水煮、水炒、清蒸等方式；不添加過多的調味料，保留食物原始的鮮、甘、甜。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Brand Quote -->
      <section class="py-24 bg-accent/50">
        <div class="container mx-auto px-6">
          <div class="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <i class="fa-solid fa-quote-left text-4xl text-primary/20 mb-6"></i>
            <blockquote class="font-display text-3xl lg:text-4xl font-semibold text-text leading-snug mb-8">
              健康的生活，「飲食」是關鍵中的關鍵。<br />
              <span class="text-primary">You Are What You Eat.</span>
            </blockquote>
            <div class="flex items-center justify-center gap-4">
              <div class="w-12 h-0.5 bg-secondary"></div>
              <span class="text-text-light text-sm tracking-wider">Healthy Diet</span>
              <div class="w-12 h-0.5 bg-secondary"></div>
            </div>

            <RouterLink to="/products" class="inline-block mt-12">
              <button class="px-10 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg">
                立即訂購
              </button>
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>
