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

const cookingMethods = [
  { icon: 'fa-solid fa-droplet', title: '水煮', desc: '保留食材原始營養，以最溫和的方式烹調' },
  { icon: 'fa-solid fa-cloud', title: '清蒸', desc: '鎖住鮮甜與水分，呈現食物真實風味' },
  { icon: 'fa-solid fa-fire-flame-curved', title: '水炒', desc: '以水取代油，少油健康不油膩' },
]

onMounted(() => {
  loadingStore.setLoading(true)
  setTimeout(() => loadingStore.setLoading(false), 1000)
})
</script>

<template>
  <div v-if="!loadingStore.isLoading">
    <!-- Hero -->
    <PageHeader
      title="About Us"
      subtitle="發掘蔬食的喜悅與美好"
      bg-image="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?auto=format&fit=crop&w=1500&q=80"
    />

    <!-- Section 1: Brand Story + Timeline -->
    <section class="py-20 bg-white">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-14">
          <span class="label-text text-secondary font-medium">Our Story</span>
          <h2 class="font-display text-3xl lg:text-4xl font-semibold text-text mt-2">品牌故事</h2>
        </div>

        <div class="max-w-3xl mx-auto mb-16">
          <p class="text-text-light leading-relaxed text-center">
            擁有健康的身體有很多種方式——培養運動習慣、良好的生活作息，也可以從飲食開始改變。如同 Healthy Diet 所相信的，吃得健康，就是幸福的起點。
          </p>
        </div>

        <!-- Horizontal Timeline (desktop) / Vertical cards (mobile) -->
        <div class="flex max-md:flex-col max-md:gap-8">
          <div
            v-for="(item, index) in timeline"
            :key="item.year"
            class="flex-1 text-center max-md:text-left"
          >
            <!-- Desktop: dot + connecting lines -->
            <div class="hidden md:flex items-center mb-6">
              <div
                class="flex-1 h-px bg-primary/15"
                :class="{ invisible: index === 0 }"
              ></div>
              <div class="w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-white shrink-0"></div>
              <div
                class="flex-1 h-px bg-primary/15"
                :class="{ invisible: index === timeline.length - 1 }"
              ></div>
            </div>

            <!-- Mobile: dot + year inline -->
            <div class="md:hidden flex items-center gap-3 mb-2">
              <div class="w-2.5 h-2.5 rounded-full bg-primary shrink-0"></div>
              <span class="font-mono text-primary text-sm font-bold">{{ item.year }}</span>
              <div class="flex-1 h-px bg-primary/10"></div>
            </div>

            <!-- Content -->
            <div class="md:px-4 max-md:pl-5">
              <span class="font-mono text-primary text-sm font-bold max-md:hidden">{{ item.year }}</span>
              <h3 class="font-bold text-text text-lg mt-1 mb-2">{{ item.title }}</h3>
              <p class="text-text-light text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Our Kitchen -->
    <section class="py-20 bg-bg-light relative">
      <div class="absolute inset-0 opacity-3 pointer-events-none grain-overlay"></div>

      <div class="relative max-w-6xl mx-auto px-6">
        <div class="flex max-lg:flex-col items-center gap-10 lg:gap-16">
          <!-- Image -->
          <div class="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"
              alt="Healthy Diet 的廚房"
              class="w-full h-about-sm lg:h-about-lg object-cover rounded-2xl shadow-card"
              loading="lazy"
            />
          </div>

          <!-- Text -->
          <div class="lg:w-1/2">
            <span class="label-text text-secondary font-medium">Our Kitchen</span>
            <h2 class="font-display text-3xl lg:text-4xl font-semibold text-text mt-2 mb-6">我們的廚房</h2>
            <p class="text-text-light leading-relaxed mb-8">
              在 Healthy Diet 的廚房裡，我們堅持最簡單的烹調方式。不添加過多調味料，讓每一口都能品嚐到食物最真實的味道。簡單，就是最好的味道。
            </p>

            <!-- Cooking methods -->
            <div class="space-y-5">
              <div
                v-for="method in cookingMethods"
                :key="method.title"
                class="flex items-start gap-4"
              >
                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <i :class="method.icon" class="text-primary text-sm"></i>
                </div>
                <div>
                  <h3 class="font-bold text-text">{{ method.title }}</h3>
                  <p class="text-text-light text-sm mt-0.5">{{ method.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Farm to Table -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <!-- Section divider -->
        <div class="flex items-center gap-4 mb-12">
          <span class="label-text text-text-light/40">From Farm</span>
          <span class="flex-1 h-px bg-bg-dark"></span>
          <span class="label-text text-text-light/40">To Table</span>
        </div>

        <div class="flex max-lg:flex-col gap-10 lg:gap-16 items-center">
          <!-- Text -->
          <div class="lg:w-2/5">
            <span class="label-text text-secondary font-medium">Farm to Table</span>
            <h2 class="font-display text-3xl lg:text-4xl font-semibold text-text mt-2 mb-6">食材旅程</h2>
            <p class="text-text-light leading-relaxed mb-4">
              我們與在地小農合作，挑選當季最新鮮的蔬果與優質肉品。從產地到你的餐桌，每一步都是對品質的堅持。
            </p>
            <p class="text-text-light leading-relaxed">
              縮短食物旅程，不只保留了最鮮甜的風味，也減少了碳足跡，讓每一口都是對土地的善待。
            </p>
          </div>

          <!-- Image mosaic -->
          <div class="lg:w-3/5 flex gap-3 h-72 md:h-80 lg:h-96">
            <!-- Left: tall image -->
            <div class="w-1/2">
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80"
                alt="新鮮蔬果"
                class="w-full h-full object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
            <!-- Right: two stacked images -->
            <div class="w-1/2 flex flex-col gap-3">
              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80"
                alt="當季食材"
                class="w-full flex-1 object-cover rounded-2xl min-h-0"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                alt="在地農產"
                class="w-full flex-1 object-cover rounded-2xl min-h-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Brand Quote -->
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
