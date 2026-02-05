<script setup lang="ts">
</script>

<template>
  <footer class="bg-bg-light">
    <div class="container mx-auto flex max-lg:justify-center justify-between items-center px-5 py-5 max-h-16 max-lg:max-h-20 text-base max-lg:text-sm">
      <div>
        <span class="font-bold text-primary">&copy; 2020 Healthy Diet All Rights Reserved.</span>
      </div>
      <div class="hidden lg:flex items-center gap-2">
        <RouterLink to="/admin/products" class="text-primary hover:text-contrast font-medium">｜後台管理｜</RouterLink>
        <a class="fab fa-github text-primary hover:text-contrast" href="https://github.com/physicx594?tab=repositories" target="_blank"></a>
      </div>
    </div>
  </footer>
</template>
