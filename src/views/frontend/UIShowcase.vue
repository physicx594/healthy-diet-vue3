<script setup lang="ts">
// ── Brand Colors ────────────────────────────────────────────────
const brandColors = [
  { name: 'Primary', hex: '#2D6A4F', token: '--color-primary', light: false },
  { name: 'Primary Light', hex: '#52B788', token: '--color-primary-light', light: false },
  { name: 'Primary Dark', hex: '#1B4332', token: '--color-primary-dark', light: false },
  { name: 'Secondary', hex: '#D4A373', token: '--color-secondary', light: false },
  { name: 'Accent', hex: '#FAEDCD', token: '--color-accent', light: true },
  { name: 'Contrast', hex: '#C1553B', token: '--color-contrast', light: false },
  { name: 'BG Light', hex: '#F5F7F2', token: '--color-bg-light', light: true },
  { name: 'BG Dark', hex: '#E9EDC9', token: '--color-bg-dark', light: true },
  { name: 'Text', hex: '#3D405B', token: '--color-text', light: false },
  { name: 'Text Light', hex: '#6B705C', token: '--color-text-light', light: false }
]

// ── Scale Palettes ───────────────────────────────────────────────
const olivePalette = {
  name: 'Olive',
  desc: '後台主色系 — 有機橄欖綠',
  shades: [
    { shade: '900', hex: '#2A3B22' },
    { shade: '800', hex: '#3C5233' },
    { shade: '700', hex: '#4E6944' },
    { shade: '600', hex: '#607F55' },
    { shade: '500', hex: '#739666' },
    { shade: '400', hex: '#8FAD82' },
    { shade: '300', hex: '#ABC49F' },
    { shade: '200', hex: '#C7DBBC' },
    { shade: '100', hex: '#E3EDD9' },
    { shade: '50', hex: '#F1F6EC' }
  ]
}

const terraPalette = {
  name: 'Terra',
  desc: '後台強調色系 — 赤陶磚紅',
  shades: [
    { shade: '700', hex: '#8E3A2B' },
    { shade: '600', hex: '#A8462F' },
    { shade: '500', hex: '#C8553D' },
    { shade: '400', hex: '#D67A66' },
    { shade: '300', hex: '#E4A090' },
    { shade: '100', hex: '#F5D5CD' },
    { shade: '50', hex: '#FDF2F0' }
  ]
}

const barkPalette = {
  name: 'Bark',
  desc: '中性灰階 — 樹皮系',
  shades: [
    { shade: '900', hex: '#1A1A1A' },
    { shade: '800', hex: '#2D2D2D' },
    { shade: '700', hex: '#404040' },
    { shade: '600', hex: '#525252' },
    { shade: '500', hex: '#6B6B6B' },
    { shade: '400', hex: '#8A8A8A' },
    { shade: '300', hex: '#A3A3A3' },
    { shade: '200', hex: '#D4D4D4' },
    { shade: '100', hex: '#E5E5E5' }
  ]
}

const creamPalette = {
  name: 'Cream',
  desc: '後台背景色系 — 奶油米白',
  shades: [
    { shade: '200', hex: '#DDD1BF' },
    { shade: '100', hex: '#EDE5D8' },
    { shade: '50', hex: '#F7F3ED' }
  ]
}

const scalePalettes = [olivePalette, terraPalette, barkPalette, creamPalette]
</script>

<template>
  <!-- ── Brand Colors ────────────────────────────────── -->
  <section class="bg-white py-20">
    <div class="mx-auto max-w-6xl px-6">
      <!-- Section heading -->
      <div class="mb-12">
        <span class="label-text text-secondary font-medium">Brand Identity</span>
        <h2 class="font-brand text-text mt-2 text-3xl">品牌主色</h2>
        <p class="text-text-light mt-2 font-sans text-sm leading-relaxed">
          這 10 個顏色構成整個前台設計系統的核心，涵蓋主色調、背景色與文字色。
        </p>
      </div>

      <!-- Color cards -->
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div
          v-for="color in brandColors"
          :key="color.token"
          class="shadow-card group cursor-default overflow-hidden rounded-xl"
        >
          <!-- Swatch block -->
          <div
            class="h-28 transition-transform duration-300 group-hover:scale-105"
            :style="{ background: color.hex }"
          ></div>

          <!-- Info block -->
          <div class="rounded-b-xl border border-t-0 border-gray-100 bg-white p-3">
            <p class="font-brand text-sm leading-tight font-semibold" :style="{ color: '#3D405B' }">
              {{ color.name }}
            </p>
            <p class="text-text-light mt-0.5 font-mono text-xs tracking-wide">
              {{ color.hex }}
            </p>
            <p class="mt-1 truncate font-mono text-xs" :style="{ color: '#8FAD82' }">
              {{ color.token }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Scale Palettes ─────────────────────────────── -->
  <section class="bg-bg-light py-20">
    <div class="mx-auto max-w-6xl px-6">
      <!-- Section heading -->
      <div class="mb-12">
        <span class="label-text text-secondary font-medium">Extended Scales</span>
        <h2 class="font-brand text-text mt-2 text-3xl">後台色階</h2>
        <p class="text-text-light mt-2 font-sans text-sm leading-relaxed">
          後台管理介面使用的完整色階系統，適用於層次豐富的 UI 元件。
        </p>
      </div>

      <!-- Scale rows -->
      <div class="space-y-10">
        <div
          v-for="palette in scalePalettes"
          :key="palette.name"
          class="flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <!-- Label -->
          <div class="flex-shrink-0 sm:w-36">
            <p class="font-brand text-text text-base font-semibold">{{ palette.name }}</p>
            <p class="text-text-light mt-0.5 font-sans text-xs leading-snug">
              {{ palette.desc }}
            </p>
          </div>

          <!-- Shade swatches -->
          <div class="flex flex-wrap gap-1.5">
            <div v-for="swatch in palette.shades" :key="swatch.shade" class="group relative">
              <!-- Swatch square -->
              <div
                class="h-10 w-10 cursor-default rounded-sm shadow-sm transition-transform duration-200 group-hover:scale-110"
                :style="{ background: swatch.hex }"
              ></div>

              <!-- Tooltip (pure CSS via group) -->
              <div
                class="bg-bark-900 pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                :style="{ background: '#1A1A1A' }"
              >
                <span class="font-mono font-semibold"
                  >{{ palette.name.toLowerCase() }}-{{ swatch.shade }}</span
                >
                <br />
                <span class="font-mono text-gray-300">{{ swatch.hex }}</span>
                <!-- Arrow -->
                <span
                  class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                  style="border-top-color: #1a1a1a"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Gradient Footer Banner ─────────────────────── -->
  <div class="relative h-24 overflow-hidden">
    <div
      class="absolute inset-0"
      style="background: linear-gradient(to right, #1b4332, #2d6a4f, #52b788)"
    ></div>
    <div class="relative flex h-full items-center justify-center">
      <p class="font-brand tracking-expanded text-lg text-white/80">
        Organic Warmth — Design System
      </p>
    </div>
  </div>
</template>
