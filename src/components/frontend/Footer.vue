<script setup lang="ts">
</script>

<template>
  <footer class="bg-primary-dark text-white/80">
    <div class="container mx-auto px-6 py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        <!-- Brand -->
        <div>
          <h3 class="font-brand text-xl font-semibold text-white mb-3 tracking-wide">Healthy Diet</h3>
          <p class="text-xs leading-relaxed text-white/50 mb-5">
            致力於提供最天然、健康的有機食品。<br />
            吃得健康，活得精彩。
          </p>
          <div class="flex gap-3">
            <a href="https://github.com/physicx594?tab=repositories" target="_blank" class="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/50 hover:bg-primary-light hover:text-white transition-all duration-300 text-xs">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href="#" class="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/50 hover:bg-primary-light hover:text-white transition-all duration-300 text-xs">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#" class="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/50 hover:bg-primary-light hover:text-white transition-all duration-300 text-xs">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-medium text-xs uppercase tracking-[0.15em] mb-4">快速連結</h4>
          <ul class="space-y-2 list-none p-0 m-0">
            <li><RouterLink to="/products" class="text-white/50 hover:text-primary-light transition-colors text-xs">全部商品</RouterLink></li>
            <li><RouterLink to="/about" class="text-white/50 hover:text-primary-light transition-colors text-xs">關於我們</RouterLink></li>
            <li><RouterLink to="/cart" class="text-white/50 hover:text-primary-light transition-colors text-xs">購物車</RouterLink></li>
            <li><RouterLink to="/admin/products" class="text-white/50 hover:text-primary-light transition-colors text-xs">後台管理</RouterLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-white font-medium text-xs uppercase tracking-[0.15em] mb-4">聯絡資訊</h4>
          <ul class="space-y-2.5 list-none p-0 m-0 text-xs text-white/50">
            <li class="flex items-center gap-2.5">
              <i class="fa-solid fa-location-dot text-primary-light/70 w-3.5 text-center"></i>
              台北市大安區健康路 123 號
            </li>
            <li class="flex items-center gap-2.5">
              <i class="fa-solid fa-phone text-primary-light/70 w-3.5 text-center"></i>
              (02) 1234-5678
            </li>
            <li class="flex items-center gap-2.5">
              <i class="fa-solid fa-envelope text-primary-light/70 w-3.5 text-center"></i>
              hello@healthydiet.tw
            </li>
            <li class="flex items-center gap-2.5">
              <i class="fa-solid fa-clock text-primary-light/70 w-3.5 text-center"></i>
              週一至週五 9:00 - 18:00
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/8">
      <div class="container mx-auto px-6 py-3.5 flex max-md:flex-col justify-between items-center gap-1.5 text-[10px] text-white/30 tracking-wide">
        <span>&copy; 2025 Healthy Diet All Rights Reserved.</span>
        <span>Crafted with <i class="fa-solid fa-heart text-contrast/60 text-[9px]"></i> for a healthier world</span>
      </div>
    </div>
  </footer>
</template>
