<script setup lang="ts">
import PageHeader from '@/components/frontend/PageHeader.vue'

const timeline = [
  {
    year: '2020',
    title: '品牌創立',
    desc: '因緣際會開始烹煮水煮餐，從一個簡單的念頭出發——吃得健康，也能吃得美味。'
  },
  {
    year: '2021',
    title: '理念成形',
    desc: '確立 Eat Local、Eat Real、Eat Natural 三大核心理念，堅持使用在地當季食材。'
  },
  {
    year: '2022',
    title: '餐盒上線',
    desc: '正式推出線上訂購服務，將健康餐盒送到每一位朋友的手中。'
  },
  { year: '至今', title: '持續前行', desc: '不斷研發新菜色，期望陪伴更多人走上健康飲食的旅途。' }
]

const cookingMethods = [
  { icon: 'fa-solid fa-droplet', title: '水煮', desc: '保留食材原始營養，以最溫和的方式烹調' },
  { icon: 'fa-solid fa-cloud', title: '清蒸', desc: '鎖住鮮甜與水分，呈現食物真實風味' },
  { icon: 'fa-solid fa-fire-flame-curved', title: '水炒', desc: '以水取代油，少油健康不油膩' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <PageHeader
      title="About Us"
      subtitle="發掘蔬食的喜悅與美好"
      bg-image="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?auto=format&fit=crop&w=1500&q=80"
    />

    <!-- Section 1: Brand Story + Timeline -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-5xl px-6">
        <div class="mb-14 text-center">
          <span class="label-text text-secondary font-medium">Our Story</span>
          <h2 class="font-display text-text mt-2 text-3xl font-semibold lg:text-4xl">品牌故事</h2>
        </div>

        <div class="mx-auto mb-16 max-w-3xl">
          <p class="text-text-light text-center leading-relaxed">
            擁有健康的身體有很多種方式——培養運動習慣、良好的生活作息，也可以從飲食開始改變。如同
            Healthy Diet 所相信的，吃得健康，就是幸福的起點。
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
            <div class="mb-6 hidden items-center md:flex">
              <div class="bg-primary/15 h-px flex-1" :class="{ invisible: index === 0 }"></div>
              <div class="bg-primary h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-white"></div>
              <div
                class="bg-primary/15 h-px flex-1"
                :class="{ invisible: index === timeline.length - 1 }"
              ></div>
            </div>

            <!-- Mobile: dot + year inline -->
            <div class="mb-2 flex items-center gap-3 md:hidden">
              <div class="bg-primary h-2.5 w-2.5 shrink-0 rounded-full"></div>
              <span class="text-primary font-mono text-sm font-bold">{{ item.year }}</span>
              <div class="bg-primary/10 h-px flex-1"></div>
            </div>

            <!-- Content -->
            <div class="max-md:pl-5 md:px-4">
              <span class="text-primary font-mono text-sm font-bold max-md:hidden">{{
                item.year
              }}</span>
              <h3 class="text-text mt-1 mb-2 text-lg font-bold">{{ item.title }}</h3>
              <p class="text-text-light text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Our Kitchen -->
    <section class="bg-bg-light relative py-20">
      <div class="grain-overlay pointer-events-none absolute inset-0 opacity-3"></div>

      <div class="relative mx-auto max-w-6xl px-6">
        <div class="flex items-center gap-10 max-lg:flex-col lg:gap-16">
          <!-- Image -->
          <div class="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"
              alt="Healthy Diet 的廚房"
              class="h-about-sm lg:h-about-lg shadow-card w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>

          <!-- Text -->
          <div class="lg:w-1/2">
            <span class="label-text text-secondary font-medium">Our Kitchen</span>
            <h2 class="font-display text-text mt-2 mb-6 text-3xl font-semibold lg:text-4xl">
              我們的廚房
            </h2>
            <p class="text-text-light mb-8 leading-relaxed">
              在 Healthy Diet
              的廚房裡，我們堅持最簡單的烹調方式。不添加過多調味料，讓每一口都能品嚐到食物最真實的味道。簡單，就是最好的味道。
            </p>

            <!-- Cooking methods -->
            <div class="space-y-5">
              <div
                v-for="method in cookingMethods"
                :key="method.title"
                class="flex items-start gap-4"
              >
                <div
                  class="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                >
                  <i :class="method.icon" class="text-primary text-sm"></i>
                </div>
                <div>
                  <h3 class="text-text font-bold">{{ method.title }}</h3>
                  <p class="text-text-light mt-0.5 text-sm">{{ method.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Farm to Table -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-6xl px-6">
        <!-- Section divider -->
        <div class="mb-12 flex items-center gap-4">
          <span class="label-text text-text-light/40">From Farm</span>
          <span class="bg-bg-dark h-px flex-1"></span>
          <span class="label-text text-text-light/40">To Table</span>
        </div>

        <div class="flex items-center gap-10 max-lg:flex-col lg:gap-16">
          <!-- Text -->
          <div class="lg:w-2/5">
            <span class="label-text text-secondary font-medium">Farm to Table</span>
            <h2 class="font-display text-text mt-2 mb-6 text-3xl font-semibold lg:text-4xl">
              食材旅程
            </h2>
            <p class="text-text-light mb-4 leading-relaxed">
              我們與在地小農合作，挑選當季最新鮮的蔬果與優質肉品。從產地到你的餐桌，每一步都是對品質的堅持。
            </p>
            <p class="text-text-light leading-relaxed">
              縮短食物旅程，不只保留了最鮮甜的風味，也減少了碳足跡，讓每一口都是對土地的善待。
            </p>
          </div>

          <!-- Image mosaic -->
          <div class="flex h-72 gap-3 md:h-80 lg:h-96 lg:w-3/5">
            <!-- Left: tall image -->
            <div class="w-1/2">
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80"
                alt="新鮮蔬果"
                class="h-full w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
            <!-- Right: two stacked images -->
            <div class="flex w-1/2 flex-col gap-3">
              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80"
                alt="當季食材"
                class="min-h-0 w-full flex-1 rounded-2xl object-cover"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                alt="在地農產"
                class="min-h-0 w-full flex-1 rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Brand Quote -->
    <section class="bg-accent/50 py-24">
      <div class="mx-auto max-w-3xl px-6 text-center">
        <i class="fa-solid fa-quote-left text-primary/20 mb-6 block text-3xl"></i>
        <blockquote
          class="font-display text-text mb-8 text-2xl leading-snug font-semibold lg:text-4xl"
        >
          健康的生活，<br class="max-md:hidden" />「飲食」是關鍵中的關鍵。
        </blockquote>
        <p class="font-brand text-primary mb-10 text-lg tracking-wider">You Are What You Eat.</p>
        <div class="mb-12 flex items-center justify-center gap-4">
          <div class="bg-secondary h-px w-10"></div>
          <span class="text-text-light text-sm tracking-wider">Healthy Diet</span>
          <div class="bg-secondary h-px w-10"></div>
        </div>
        <RouterLink
          to="/products"
          class="bg-primary hover:bg-primary-dark inline-block rounded-xl px-10 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg"
        >
          立即訂購
        </RouterLink>
      </div>
    </section>
  </div>
</template>
