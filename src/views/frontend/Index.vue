<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '@/stores'
import Navbar from '@/components/frontend/Navbar.vue'
import Gotop from '@/components/frontend/Gotop.vue'
import Banner from '@/components/frontend/Banner.vue'
import Footer from '@/components/frontend/Footer.vue'

const router = useRouter()
const loadingStore = useLoadingStore()
const email = ref('')

const toCategory = (category: string) => {
  router.push({ name: 'products', query: { category } })
}

onMounted(() => {
  loadingStore.setLoading(true)
  setTimeout(() => loadingStore.setLoading(false), 1000)
})
</script>

<template>
  <div>
    <Navbar />
    <Gotop />
    <div v-if="!loadingStore.isLoading">
      <Banner page-name="Healthy Diet" content="發現蔬食最新鮮純淨的美味" bg-image="https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" />

      <!-- About Us Section -->
      <div class="container mx-auto px-4">
        <div class="w-full my-15">
          <div class="hidden max-lg:block text-center mb-4">
            <div class="inline-block text-primary font-bold text-2xl p-2.5"><span class="relative before:content-[''] before:absolute before:bottom-0 before:translate-x-1/2 before:w-1/2 before:h-0.5 before:bg-primary before:-mb-2.5">關於我們</span></div>
          </div>
          <div class="flex max-lg:flex-col max-lg:text-center justify-between text-left gap-8 max-lg:gap-0">
            <figure class="lg:w-7/12 p-0 m-0 max-h-97.5 overflow-hidden relative before:content-[''] before:absolute before:w-3/10 before:h-5 before:bg-primary after:content-[''] after:absolute after:w-5 after:h-7/10 after:left-0 after:top-0 after:bg-primary max-lg:before:hidden max-lg:after:hidden" data-aos="fade-right" data-aos-easing="ease-in-out">
              <img src="https://images.unsplash.com/photo-1595786802424-d6efbc413db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" class="w-full h-full object-cover p-2.5 max-lg:p-0 m-5 max-lg:m-0 max-lg:mb-4" />
            </figure>
            <div class="lg:w-5/12 flex flex-col justify-between" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-delay="250">
              <div class="max-lg:hidden inline-block text-primary font-bold text-2xl p-2.5"><span class="relative before:content-[''] before:absolute before:bottom-0 before:translate-x-1/2 before:w-1/2 before:h-0.5 before:bg-primary before:-mb-2.5">關於我們</span></div>
              <div class="font-bold">
                <p>在生活步調快速的現代，忙於課業、工作及娛樂上，<br />飲食也是一種健康的代表，許多人經常用速食來解決三餐，忽略了營養均衡的重要。</p>
                <p>Healthy Diet 屬於輕食文化，採用低鹽低鈉少油，主餐以少量的肉類搭配大量的新鮮蔬果，降低消費者對身體的負擔，注重消費者能夠吃得健康又安心。</p>
              </div>
              <RouterLink to="/about" class="max-lg:mx-auto lg:float-right">
                <button class="rounded-full border border-contrast text-contrast font-bold px-8 py-1.5 hover:bg-contrast hover:text-white transition-colors">更多...</button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Section -->
      <div class="w-full mt-12 bg-cover bg-center bg-fixed" style="background-image: url('https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80');">
        <div class="bg-primary/35 w-full max-h-47.5 py-10 overflow-hidden text-center">
          <div class="text-white text-3.5xl font-bold mb-2 text-shadow-depth">嚴選</div>
          <RouterLink to="/products">
            <p class="inline-block px-8 py-1.5 text-white bg-contrast/80 rounded-full font-bold">用心對待每份產品</p>
          </RouterLink>
        </div>
        <div class="w-full h-87.5 max-md:h-auto bg-white/90 flex max-md:flex-col items-center justify-around">
          <div class="max-w-87.5 w-full mx-2.5 text-center max-md:flex max-md:items-center">
            <figure class="max-w-37.5 w-full h-37.5 max-md:w-25 max-md:h-25 rounded-full bg-primary flex justify-center items-center pb-2.5 mx-auto max-md:mx-2.5 max-md:shrink-0">
              <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/9B85DD8HXDV6UAPLC0VUg3abgxHc98RZsdnmQemeDzsRzlToIoY2LRjN0ff6uR9M6Zw0sbIuPb0bQY2cLAWXzaKAJF4RsO0Pg9ChafZqIWxR8zSfMaNb6RgjSNjOUMGu.svg" class="max-w-18.75 max-md:max-w-12.5" />
            </figure>
            <div class="font-bold text-xl text-green-600 mt-2">在地食材</div>
            <p class="font-bold max-md:hidden">和小農們合作，使用當地、當季的蔬菜、讓消費者吃進肚的，更加天然、健康、有機，<br />實踐「吃當季、買在地」</p>
          </div>
          <div class="max-w-87.5 w-full mx-2.5 text-center max-md:flex max-md:items-center">
            <figure class="max-w-37.5 w-full h-37.5 max-md:w-25 max-md:h-25 rounded-full bg-primary flex justify-center items-center pb-2.5 mx-auto max-md:mx-2.5 max-md:shrink-0">
              <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/vxHS0YRn67GsjSNqYvuRxGVZp9xmYfslZ0QqLkdfRA4sZxar8gX0ffwLlTziIPtoIxncfd3JtdreStGt9yIasWXP5obIDmF80tLoeYW2ZqblYfFUbsdPbD8g01exj9C5.svg" class="max-w-18.75 max-md:max-w-12.5" />
            </figure>
            <div class="font-bold text-xl text-green-600 mt-2">沒有食物添加劑</div>
            <p class="font-bold max-md:hidden">希望消費者吃得健康、吃得安心，我們對食材不做多餘的調味，保留食材本身的鮮與甜，<br />讓您一口就能吃出食物的「美」</p>
          </div>
          <div class="max-w-87.5 w-full mx-2.5 text-center max-md:flex max-md:items-center">
            <figure class="max-w-37.5 w-full h-37.5 max-md:w-25 max-md:h-25 rounded-full bg-primary flex justify-center items-center pb-2.5 mx-auto max-md:mx-2.5 max-md:shrink-0">
              <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/NwYRD1IFuKVZPMLmExI0Kg0qeo8GIkpftkjeGICbfeN60gdqsya1GCxHh9Bnm3F48rJwYHH1Ya052qalxKQCmv6eGI7JUqV1yWfUCxYHPAauA8NgxyAR4Y2vGoiwqsIQ.svg" class="max-w-18.75 max-md:max-w-12.5" />
            </figure>
            <div class="font-bold text-xl text-green-600 mt-2">接單製作、新鮮運送</div>
            <p class="font-bold max-md:hidden">每份餐點都是當日限量，配上專業的冷凍物流，讓您吃到當日最新鮮的食物，消費者吃得安心是對我們最大的鼓勵</p>
          </div>
        </div>
      </div>

      <!-- Products Category -->
      <div class="container mx-auto px-4 mt-5">
        <div class="w-full text-center">
          <div class="inline-block text-primary font-bold text-2xl p-2.5 my-3"><span class="relative before:content-[''] before:absolute before:bottom-0 before:translate-x-1/2 before:w-1/2 before:h-0.5 before:bg-primary before:-mb-2.5">產品分類</span></div>
        </div>
        <div class="flex max-md:flex-col justify-between mt-4 mb-5 gap-4">
          <div class="group relative w-3/10 max-md:w-full max-md:my-2.5 h-[300px] max-lg:h-[150px] py-15 max-lg:py-0 cursor-pointer max-lg:pointer-events-none overflow-hidden bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1570078420152-d016091ec97a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80');" data-aos="flip-up" data-aos-duration="1000" @click="toCategory('健康餐盒')">
            <span class="font-yellowtail text-10xl max-lg:text-6xl max-md:text-7.5xl font-bold text-secondary block leading-tight max-lg:leading-[150px] text-shadow-depth transition-opacity duration-500 group-hover:opacity-0">Bento</span>
            <div class="absolute inset-0 opacity-0 transition-all duration-500 ease-out bg-primary/90 flex flex-col items-center justify-center group-hover:opacity-100">
              <div><img src="@/assets/logo1.png" class="w-3/5 transition-all duration-500 ease-out group-hover:scale-[0.6]" alt="" /></div>
              <p class="font-bold text-white">健康餐盒<br />每天都拿不定主意吃什麼嗎？<br />不知道吃的健不健康嗎?<br />這些心聲，我們都聯到了<br />請交給 HEALTHY DIET 幫您備餐</p>
            </div>
          </div>
          <div class="group relative w-3/10 max-md:w-full max-md:my-2.5 h-[300px] max-lg:h-[150px] py-15 max-lg:py-0 cursor-pointer max-lg:pointer-events-none overflow-hidden bg-cover bg-center" style="background-image: url('https://hexschool-api.s3.us-west-2.amazonaws.com/custom/H5qxPcglJ1S9RagBQnAT7pKkMgbFlgu7BRyydNvHaPhVkTnuXG6NLduRdk3zsHrfOKTpUzN2rCye7HTKc3JOkCBTe4XiX3fasKdKaM00jWOjiPcvPbxA8IXlPm1RleCK.jpg');" data-aos="flip-up" data-aos-duration="1000" data-aos-delay="150" @click="toCategory('舒肥系列')">
            <span class="font-yellowtail text-10xl max-lg:text-6xl max-md:text-7.5xl font-bold text-secondary block leading-20 max-lg:leading-[150px] text-shadow-depth transition-opacity duration-500 group-hover:opacity-0">Sous</span>
            <span class="font-yellowtail text-10xl max-lg:text-6xl max-md:text-7.5xl font-bold text-secondary block leading-tight max-lg:hidden text-shadow-depth transition-opacity duration-500 group-hover:opacity-0">vide</span>
            <div class="absolute inset-0 opacity-0 transition-all duration-500 ease-out bg-primary/90 flex flex-col items-center justify-center group-hover:opacity-100">
              <div><img src="@/assets/logo1.png" class="w-3/5 transition-all duration-500 ease-out group-hover:scale-[0.6]" alt="" /></div>
              <p class="font-bold text-white">舒肥雞胸肉<br />多種口味任你挑，滿足挑剔的味蕾<br />輕鬆補足蛋白質，低熱量無負擔<br />多汁不乾柴，顛覆雞胸肉的印象</p>
            </div>
          </div>
          <div class="group relative w-3/10 max-md:w-full max-md:my-2.5 h-[300px] max-lg:h-[150px] py-15 max-lg:py-0 cursor-pointer max-lg:pointer-events-none overflow-hidden bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80');" data-aos="flip-up" data-aos-duration="1000" data-aos-delay="300" @click="toCategory('新鮮沙拉')">
            <span class="font-yellowtail text-10xl max-lg:text-6xl max-md:text-7.5xl font-bold text-secondary block leading-tight max-lg:leading-[150px] text-shadow-depth transition-opacity duration-500 group-hover:opacity-0">Salad</span>
            <div class="absolute inset-0 opacity-0 transition-all duration-500 ease-out bg-primary/90 flex flex-col items-center justify-center group-hover:opacity-100">
              <div><img src="@/assets/logo1.png" class="w-3/5 transition-all duration-500 ease-out group-hover:scale-[0.6]" alt="" /></div>
              <p class="font-bold text-white">新鮮沙拉<br />採用豐富的萵苣、蘿蔓、生菜葉與蔬果<br />自製的美味醬料，品嚐生菜的鮮甜爽脆<br />並以最嚴謹的態度為您把關<br />與您一同發掘，蔬食最純淨樸實的美味</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscription -->
      <div class="w-full max-h-75 bg-cover bg-center bg-fixed py-12.75 saturate-80 mt-5" style="background-image: url('https://images.unsplash.com/photo-1519897831810-a9a01aceccd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80');">
        <div class="w-full max-w-125 mx-auto bg-white/80 text-primary p-8 text-2.5xl max-md:text-base font-bold" data-aos="zoom-in" data-aos-duration="500">
          <p class="text-left">訂閱我們<br />獲得最新消息及優惠</p>
          <div class="flex">
            <input v-model="email" type="email" class="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none text-sm" placeholder="請輸入信箱" />
            <button type="button" class="bg-primary text-white px-4 py-2 rounded-r text-sm">訂閱</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
