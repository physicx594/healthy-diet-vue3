<script setup lang="ts">
defineProps<{
  step1?: boolean
  step2?: boolean
  step3?: boolean
}>()
</script>

<template>
  <div class="w-full mt-24 mb-8 flex justify-center checkout-steps">
    <div class="step w-full max-w-[240px] h-[70px] text-center relative" :class="{ active: step1 }">
      <div>購物車</div>
    </div>
    <div class="step w-full max-w-[240px] h-[70px] text-center relative" :class="{ active: step2 }">
      <div>填寫資料</div>
    </div>
    <div class="step w-full max-w-[240px] h-[70px] text-center relative" :class="{ active: step3 }">
      <div>訂單確認</div>
    </div>
  </div>
</template>

<style scoped>
.checkout-steps {
  counter-reset: step;
}

.step {
  color: #ced4da;
}

.step::before {
  content: counter(step);
  counter-increment: step;
  display: block;
  color: #fff;
  width: 25px;
  height: 25px;
  line-height: 25px;
  margin: 5px auto;
  border-radius: 50%;
  background-color: #ced4da;
  text-align: center;
  font-size: 14px;
}

.step::after {
  content: '';
  position: absolute;
  top: 17.5px;
  left: -50%;
  width: 100%;
  height: 2px;
  background-color: #ced4da;
  z-index: -1;
}

.step:first-child::after {
  content: none;
}

.step.active {
  color: #264710;
}

.step.active::before {
  background-color: #264710;
}
</style>
