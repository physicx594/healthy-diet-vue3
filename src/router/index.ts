import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/views/frontend/Index.vue'),
      children: [
        { path: '', name: 'home', component: () => import('@/views/frontend/Home.vue') },
        { path: 'products', name: 'products', component: () => import('@/views/frontend/Products.vue') },
        { path: 'product/:id', name: 'product', component: () => import('@/views/frontend/Product.vue') },
        { path: 'about', name: 'about', component: () => import('@/views/frontend/About.vue') },
        { path: 'cart', name: 'cart', component: () => import('@/views/frontend/Cart.vue') },
        { path: 'checkout', name: 'checkout', component: () => import('@/views/frontend/Checkout.vue') },
        { path: 'checkoutPay/:orderId?', name: 'checkoutPay', component: () => import('@/views/frontend/CheckoutPay.vue') },
        { path: 'checkoutSuccess', name: 'checkoutSuccess', component: () => import('@/views/frontend/CheckoutSuccess.vue') },
        { path: 'ui', name: 'ui', component: () => import('@/views/frontend/UIShowcase.vue') }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/backend/Login.vue')
    },
    {
      path: '/admin',
      component: () => import('@/views/backend/Dashboard.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: 'products', name: 'admin-products', component: () => import('@/views/backend/Products.vue') },
        { path: 'orders', name: 'admin-orders', component: () => import('@/views/backend/Orders.vue') },
        { path: 'coupons', name: 'admin-coupons', component: () => import('@/views/backend/Coupons.vue') }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach(async (to, from) => {
  const auth = useAuthStore()

  // 進入登入頁：check 通過直接導後台，不通過留在登入頁
  if (to.name === 'login') {
    const isValid = await auth.checkAuth()
    if (isValid) return { name: 'admin-products' }
    return true
  }

  // 進入後台：已在 admin 內切換、或本次 session 已驗證過，直接放行
  if (to.meta.requiresAuth) {
    if (from.path.startsWith('/admin') || auth.isAuthenticated) return true
    const isValid = await auth.checkAuth()
    if (!isValid) return { name: 'login' }
  }
})

export default router
