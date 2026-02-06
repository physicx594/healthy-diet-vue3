<script setup lang="ts">
import { onMounted } from 'vue'
import { useLoadingStore } from '@/stores'
import PageHeader from '@/components/frontend/PageHeader.vue'

const loadingStore = useLoadingStore()

const timeline = [
  { year: '2020', title: '品牌創立', desc: '因緣際會開始烹煮水煮餐，從一個簡單的念頭出發——吃得健康，也能吃得美味。' },
  { year: '2021', title: '理念成形', desc: '確立 Eat Local、Eat Real、Eat Natural 三大核心理念，堅持使用在地當季食材。' },
  { year: '2022', title: '餐盒上線', desc: '正式推出線上訂購服務，將健康餐盒送到每一位朋友的手中。' },
  { year: '至今', title: '持續前行', desc: '不斷研發新菜色，期望陪伴更多人走上健康飲食的旅途。' },
]

const values = [
  {
    tag: 'Eat Local',
    title: '在地新鮮',
    desc: '挑選當季在地新鮮蔬菜，使用低脂優質肉類。從產地到餐桌，縮短食物旅程，保留最鮮甜的風味。',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
    icon: 'fa-solid fa-location-dot',
  },
  {
    tag: 'Eat Real',
    title: '真實食物',
    desc: '拒絕使用再製加工品，選用大量天然食材。我們相信——吃食物，不吃食品，才是對身體最好的善待。',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    icon: 'fa-solid fa-apple-whole',
  },
  {
    tag: 'Eat Natural',
    title: '自然烹調',
    desc: '使用水煮、水炒、清蒸等方式，不添加過多調味料，保留食物原始的鮮、甘、甜。簡單，就是最好的味道。',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    icon: 'fa-solid fa-leaf',
  },
]

onMounted(() => {
  loadingStore.setLoading(true)
  setTimeout(() => loadingStore.setLoading(false), 1000)
})
</script>

<template>
  <div v-if="!loadingStore.isLoading">
      <PageHeader
        title="About Us"
        subtitle="發掘蔬食的喜悅與美好"
        bg-image="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
      />

      <!-- Brand Story -->
      <section class="py-20">
        <div class="max-w-5xl mx-auto px-6">
          <div class="text-center mb-14">
            <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Our Story</span>
            <h2 class="font-display text-3xl lg:text-4xl font-semibold text-text mt-2">品牌故事</h2>
          </div>

          <div class="max-w-3xl mx-auto mb-14">
            <p class="text-text-light leading-relaxed text-center">
              擁有健康的身體有很多種方式——培養運動習慣、良好的生活作息，也可以從飲食開始改變。如同 Healthy Diet 所相信的，吃得健康，就是幸福的起點。
            </p>
          </div>

          <!-- Timeline -->
          <div class="relative">
            <!-- Center line -->
            <div class="absolute left-1/2 top-0 bottom-0 w-px bg-primary/15 -translate-x-1/2 max-md:left-6"></div>

            <div class="space-y-12">
              <div
                v-for="(item, index) in timeline"
                :key="item.year"
                class="relative flex items-start gap-8 max-md:ml-14"
                :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
              >
                <!-- Dot -->
                <div class="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-bg-light z-10 max-md:left-6"></div>

                <!-- Content card -->
                <div class="md:w-[calc(50%-2rem)] max-md:w-full">
                  <div class="bg-white rounded-2xl p-6 shadow-card">
                    <span class="font-mono text-primary text-sm font-bold">{{ item.year }}</span>
                    <h3 class="font-bold text-text text-lg mt-1 mb-2">{{ item.title }}</h3>
                    <p class="text-text-light text-sm leading-relaxed">{{ item.desc }}</p>
                  </div>
                </div>

                <!-- Spacer for the other side -->
                <div class="md:w-[calc(50%-2rem)] max-md:hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Values -->
      <section class="py-20">
        <div class="max-w-6xl mx-auto px-6">
          <div class="text-center mb-14">
            <span class="font-mono text-secondary text-[11px] font-medium tracking-[0.25em] uppercase">Our Values</span>
            <h2 class="font-display text-3xl lg:text-4xl font-semibold text-text mt-2">核心理念</h2>
          </div>

          <div class="space-y-16">
            <div
              v-for="(item, index) in values"
              :key="item.tag"
              class="flex max-lg:flex-col items-center gap-10 lg:gap-16"
              :class="index % 2 !== 0 ? 'lg:flex-row-reverse' : ''"
            >
              <!-- Image -->
              <div class="lg:w-1/2">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-[300px] lg:h-[360px] object-cover rounded-2xl"
                />
              </div>

              <!-- Text -->
              <div class="lg:w-1/2">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <i :class="item.icon" class="text-primary"></i>
                  </div>
                  <span class="font-mono text-primary text-xs font-medium tracking-wider uppercase">{{ item.tag }}</span>
                </div>
                <h3 class="font-display text-2xl lg:text-3xl font-semibold text-text mb-4">{{ item.title }}</h3>
                <p class="text-text-light leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Brand Quote -->
      <section class="py-24 bg-accent/50">
        <div class="max-w-3xl mx-auto px-6 text-center">
          <i class="fa-solid fa-quote-left text-3xl text-primary/20 mb-6 block"></i>
          <blockquote class="font-display text-2xl lg:text-4xl font-semibold text-text leading-snug mb-8">
            健康的生活，<br class="max-md:hidden" />「飲食」是關鍵中的關鍵。
          </blockquote>
          <p class="font-brand text-primary text-lg tracking-wider mb-10">You Are What You Eat.</p>
          <div class="flex items-center justify-center gap-4 mb-12">
            <div class="w-10 h-px bg-secondary"></div>
            <span class="text-text-light text-sm tracking-wider">Healthy Diet</span>
            <div class="w-10 h-px bg-secondary"></div>
          </div>
          <RouterLink
            to="/products"
            class="inline-block px-10 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg"
          >
            立即訂購
          </RouterLink>
        </div>
      </section>
  </div>
</template>
