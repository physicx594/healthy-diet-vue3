<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productsApi, uploadApi } from '@/api'
import { useNotificationStore, useLoadingStore } from '@/stores'
import { formatMoney } from '@/utils'
import type { Product, Pagination as PaginationType } from '@/types'
import Pagination from '@/components/shared/Pagination.vue'
import BaseModal from '@/components/shared/BaseModal.vue'

const notification = useNotificationStore()
const loadingStore = useLoadingStore()

const products = ref<Product[]>([])
const pagination = ref<Partial<PaginationType>>({})
const isReverse = ref(false)
const sortType = ref('')

const showProductModal = ref(false)
const showDeleteModal = ref(false)
const isEditMode = ref(false)

const tempProduct = ref<Product & { options?: { quantity?: number; coupon?: boolean } }>({
  id: '',
  title: '',
  category: '',
  content: '',
  description: '',
  imageUrl: [],
  is_enabled: 1,
  origin_price: 0,
  price: 0,
  unit: '',
  options: { quantity: 0, coupon: false }
})

const sortData = computed(() => {
  if (!sortType.value) return products.value
  return [...products.value].sort((a, b) => {
    const aVal = a[sortType.value as keyof Product] as number
    const bVal = b[sortType.value as keyof Product] as number
    return isReverse.value ? aVal - bVal : bVal - aVal
  })
})

const getProducts = async (page = 1) => {
  loadingStore.setLoading(true)
  try {
    const res = await productsApi.getAdminAll(page)
    products.value = res.data.products
    pagination.value = res.data.pagination
  } catch {
    notification.show('取得產品失敗', 'error')
  } finally {
    loadingStore.setLoading(false)
  }
}

const openAddModal = () => {
  isEditMode.value = false
  tempProduct.value = {
    id: '',
    title: '',
    category: '',
    content: '',
    description: '',
    imageUrl: [],
    is_enabled: 1,
    origin_price: 0,
    price: 0,
    unit: '',
    options: { quantity: 0, coupon: false }
  }
  showProductModal.value = true
}

const openEditModal = (item: Product) => {
  isEditMode.value = true
  tempProduct.value = {
    ...item,
    imageUrl: item.imageUrl ? [...item.imageUrl] : [],
    options: item.options ? { ...item.options } : { quantity: 0, coupon: false }
  }
  showProductModal.value = true
}

const openDeleteModal = (item: Product) => {
  tempProduct.value = { ...item }
  showDeleteModal.value = true
}

const updateProduct = async () => {
  loadingStore.setLoading(true)
  try {
    if (tempProduct.value.id) {
      await productsApi.update(tempProduct.value.id, tempProduct.value as unknown as Record<string, unknown>)
      notification.show('編輯成功')
    } else {
      await productsApi.create(tempProduct.value as unknown as Record<string, unknown>)
      notification.show('新增成功')
    }
    showProductModal.value = false
    await getProducts()
  } catch {
    notification.show('操作失敗，請檢查', 'error')
  } finally {
    loadingStore.setLoading(false)
  }
}

const deleteProduct = async () => {
  loadingStore.setLoading(true)
  try {
    await productsApi.delete(tempProduct.value.id)
    notification.show('刪除成功')
    showDeleteModal.value = false
    await getProducts()
  } catch {
    notification.show('刪除失敗', 'error')
  } finally {
    loadingStore.setLoading(false)
  }
}

const uploadFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  try {
    const res = await uploadApi.upload(file)
    if (res.data.imageUrl) {
      tempProduct.value.imageUrl.push(res.data.imageUrl)
    }
  } catch {
    notification.show('上傳失敗，不可超過 2MB', 'error')
  }
  target.value = ''
}

const toggleEnabled = async (item: Product) => {
  try {
    const data = { ...item, is_enabled: item.is_enabled ? 0 : 1 }
    await productsApi.update(item.id, data as unknown as Record<string, unknown>)
    await getProducts()
  } catch {
    notification.show('操作失敗', 'error')
  }
}

const toggleCoupon = async (item: Product) => {
  if (!item.options) return
  try {
    const data = { ...item, options: { ...item.options, coupon: !item.options.coupon } }
    await productsApi.update(item.id, data as unknown as Record<string, unknown>)
    await getProducts()
  } catch {
    notification.show('操作失敗', 'error')
  }
}

const toggleSort = (type: string) => {
  if (sortType.value === type) {
    isReverse.value = !isReverse.value
  } else {
    sortType.value = type
    isReverse.value = false
  }
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <div class="container mx-auto px-4 mt-4">
    <div class="flex justify-end mt-3">
      <button
        type="button"
        class="border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition-colors"
        @click="openAddModal"
      >
        建立新產品
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full mt-3 text-left">
        <thead class="border-b-2 border-gray-300">
          <tr>
            <th class="p-2 text-center w-3/50">編號</th>
            <th class="p-2">分類</th>
            <th class="p-2 w-3/10">產品名稱</th>
            <th
              class="p-2 cursor-pointer select-none"
              @click="toggleSort('origin_price')"
            >
              原價
              <span
                v-if="sortType === 'origin_price' || sortType === ''"
                class="inline-block transition-transform"
                :class="{ 'rotate-180': isReverse }"
              >
                <i class="fas fa-angle-up text-green-600"></i>
              </span>
            </th>
            <th
              class="p-2 cursor-pointer select-none"
              @click="toggleSort('price')"
            >
              售價
              <span
                v-if="sortType === 'price' || sortType === ''"
                class="inline-block transition-transform"
                :class="{ 'rotate-180': isReverse }"
              >
                <i class="fas fa-angle-up text-green-600"></i>
              </span>
            </th>
            <th class="p-2">數量</th>
            <th class="p-2">優惠券</th>
            <th class="p-2">上架</th>
            <th class="p-2 w-3/20">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in sortData"
            :key="item.id"
            class="border-b border-gray-200 hover:bg-gray-50 transition-all hover:shadow-md"
          >
            <th class="p-2 text-center">{{ index + 1 }}</th>
            <td class="p-2">{{ item.category }}</td>
            <td class="p-2">{{ item.title }}</td>
            <td class="p-2">{{ formatMoney(item.origin_price) }}</td>
            <td class="p-2">{{ formatMoney(item.price) }}</td>
            <td class="p-2">{{ item.options?.quantity ?? '' }}</td>
            <td class="p-2">
              <div
                v-if="item.options"
                class="w-15 h-7.5 rounded-full cursor-pointer transition-colors"
                :class="item.options.coupon ? 'bg-green-300' : 'bg-red-300'"
                @click="toggleCoupon(item)"
              >
                <div
                  class="w-7.5 h-7.5 rounded-full transition-all"
                  :class="item.options.coupon ? 'bg-green-600 ml-7.5' : 'bg-red-600'"
                />
              </div>
            </td>
            <td class="p-2">
              <div
                class="w-15 h-7.5 rounded-full cursor-pointer transition-colors"
                :class="item.is_enabled ? 'bg-green-300' : 'bg-red-300'"
                @click="toggleEnabled(item)"
              >
                <div
                  class="w-7.5 h-7.5 rounded-full transition-all"
                  :class="item.is_enabled ? 'bg-green-600 ml-7.5' : 'bg-red-600'"
                />
              </div>
            </td>
            <td class="p-2">
              <button
                type="button"
                class="border border-primary text-primary px-3 py-1 rounded mr-1 hover:bg-primary hover:text-white transition-colors text-sm"
                @click="openEditModal(item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-sm"
                @click="openDeleteModal(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="my-8">
      <Pagination v-if="pagination.total_pages" :pages="pagination as PaginationType" @update="getProducts" />
    </div>

    <!-- Product Modal -->
    <BaseModal v-model="showProductModal" :title="isEditMode ? '編輯產品' : '新增產品'" size="xl">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="md:w-1/3">
          <div v-for="i in 5" :key="i" class="mb-2">
            <label :for="'imageUrl' + (i - 1)" class="block text-sm font-medium mb-1">圖片網址 {{ i }}</label>
            <input
              :id="'imageUrl' + (i - 1)"
              v-model="tempProduct.imageUrl[i - 1]"
              type="text"
              class="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="請輸入圖片網址"
            />
          </div>
          <div class="mb-2">
            <label for="uploadFile" class="block text-sm font-medium mb-1">或 上傳圖片</label>
            <input
              id="uploadFile"
              type="file"
              class="w-full text-sm"
              @change="uploadFile"
            />
          </div>
          <img
            v-if="tempProduct.imageUrl[0]"
            :src="tempProduct.imageUrl[0]"
            class="w-full rounded mt-2"
          />
        </div>
        <div class="md:w-2/3">
          <div class="mb-3">
            <label for="title" class="block text-sm font-medium mb-1">標題</label>
            <input
              id="title"
              v-model="tempProduct.title"
              type="text"
              class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="請輸入標題"
            />
          </div>
          <div class="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label for="category" class="block text-sm font-medium mb-1">分類</label>
              <input
                id="category"
                v-model="tempProduct.category"
                type="text"
                class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="請輸入分類"
              />
            </div>
            <div>
              <label for="unit" class="block text-sm font-medium mb-1">單位</label>
              <input
                id="unit"
                v-model="tempProduct.unit"
                type="text"
                class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="請輸入單位"
              />
            </div>
            <div>
              <label for="quantity" class="block text-sm font-medium mb-1">數量</label>
              <input
                id="quantity"
                v-model.number="tempProduct.options!.quantity"
                type="number"
                class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="請輸入數量"
              />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label for="origin_price" class="block text-sm font-medium mb-1">原價</label>
              <input
                id="origin_price"
                v-model.number="tempProduct.origin_price"
                type="number"
                class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="請輸入原價"
              />
            </div>
            <div>
              <label for="price" class="block text-sm font-medium mb-1">售價</label>
              <input
                id="price"
                v-model.number="tempProduct.price"
                type="number"
                class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="請輸入售價"
              />
            </div>
            <div>
              <label for="coupon" class="block text-sm font-medium mb-1">可用優惠券</label>
              <select
                id="coupon"
                v-model="tempProduct.options!.coupon"
                class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label for="description" class="block text-sm font-medium mb-1">產品描述</label>
              <textarea
                id="description"
                v-model="tempProduct.description"
                rows="5"
                class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                placeholder="請輸入產品描述"
              />
            </div>
            <div>
              <label for="content" class="block text-sm font-medium mb-1">說明內容</label>
              <textarea
                id="content"
                v-model="tempProduct.content"
                rows="5"
                class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                placeholder="請輸入說明內容"
              />
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input
              id="is_enabled"
              v-model="tempProduct.is_enabled"
              type="checkbox"
              :true-value="1"
              :false-value="0"
            />
            <label for="is_enabled">是否上架</label>
          </div>
        </div>
      </div>
      <template #footer>
        <button
          type="button"
          class="border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition-colors"
          @click="showProductModal = false"
        >
          取消
        </button>
        <button
          type="button"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          @click="updateProduct"
        >
          確認
        </button>
      </template>
    </BaseModal>

    <!-- Delete Modal -->
    <BaseModal v-model="showDeleteModal" title="刪除產品" size="sm">
      <p>
        是否刪除 <span class="font-bold text-red-600">{{ tempProduct.title }}</span> 這個商品
      </p>
      <template #footer>
        <button
          type="button"
          class="border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition-colors"
          @click="showDeleteModal = false"
        >
          取消
        </button>
        <button
          type="button"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          @click="deleteProduct"
        >
          確認
        </button>
      </template>
    </BaseModal>
  </div>
</template>
