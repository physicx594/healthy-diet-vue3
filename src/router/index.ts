import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/views/frontend/Home.vue'),
      children: [
        { path: '', name: 'index', component: () => import('@/views/frontend/Index.vue') },
        { path: 'products', name: 'products', component: () => import('@/views/frontend/Products.vue') },
        { path: 'product/:id', name: 'product', component: () => import('@/views/frontend/Product.vue') },
        { path: 'about', name: 'about', component: () => import('@/views/frontend/About.vue') },
        { path: 'cart', name: 'cart', component: () => import('@/views/frontend/Cart.vue') },
        { path: 'checkout', name: 'checkout', component: () => import('@/views/frontend/Checkout.vue') },
        { path: 'checkoutPay/:orderId?', name: 'checkoutPay', component: () => import('@/views/frontend/CheckoutPay.vue') },
        { path: 'checkoutSuccess', name: 'checkoutSuccess', component: () => import('@/views/frontend/CheckoutSuccess.vue') }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/backend/Login.vue')
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: () => import('@/views/backend/Dashboard.vue'),
      children: [
        { path: 'products', name: 'admin-products', component: () => import('@/views/backend/Products.vue') },
        { path: 'orders', name: 'admin-orders', component: () => import('@/views/backend/Orders.vue') },
        { path: 'coupons', name: 'admin-coupons', component: () => import('@/views/backend/Coupons.vue') },
        { path: 'storages', name: 'admin-storages', component: () => import('@/views/backend/Storages.vue') }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
