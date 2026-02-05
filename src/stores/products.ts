import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsApi } from '@/api'
import type { Product, Pagination } from '@/types'
import { useLoadingStore } from './loading'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const pagination = ref<Pagination>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: ''
  })

  const getProducts = async (page = 1) => {
    const loading = useLoadingStore()
    loading.setLoading(true)
    try {
      const res = await productsApi.getAll(page)
      products.value = res.data.products
      pagination.value = res.data.pagination
    } finally {
      loading.setLoading(false)
    }
  }

  return { products, pagination, getProducts }
})
