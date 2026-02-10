<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productsApi, uploadApi } from '@/api'
import { useNotificationStore, useLoadingStore } from '@/stores'
import { formatMoney } from '@/utils'
import type { Product, Pagination as PaginationType } from '@/types'
import VButton from '@/components/ui/VButton.vue'
import VInput from '@/components/ui/VInput.vue'
import VModal from '@/components/ui/VModal.vue'
import VPagination from '@/components/ui/VPagination.vue'
import VLoading from '@/components/ui/VLoading.vue'

const notification = useNotificationStore()
const loadingStore = useLoadingStore()

const products = ref<Product[]>([])
const pagination = ref<Partial<PaginationType>>({})
const isReverse = ref(false)
const sortType = ref('')
const loading = ref(true)
const saving = ref(false)

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
  loading.value = true
  try {
    const res = await productsApi.getAdminAll(page)
    products.value = res.data.products
    pagination.value = res.data.pagination
  } catch {
    notification.show('取得產品失敗', 'error')
  } finally {
    loading.value = false
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
    imageUrl: [''],
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
    imageUrl: item.imageUrl?.length ? [...item.imageUrl] : [''],
    options: item.options ? { ...item.options } : { quantity: 0, coupon: false }
  }
  showProductModal.value = true
}

const openDeleteModal = (item: Product) => {
  tempProduct.value = { ...item }
  showDeleteModal.value = true
}

const updateProduct = async () => {
  saving.value = true
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
    saving.value = false
  }
}

const deleteProduct = async () => {
  try {
    await productsApi.delete(tempProduct.value.id)
    notification.show('刪除成功')
    showDeleteModal.value = false
    await getProducts()
  } catch {
    notification.show('刪除失敗', 'error')
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

const toggleSort = (type: string) => {
  if (sortType.value === type) {
    isReverse.value = !isReverse.value
  } else {
    sortType.value = type
    isReverse.value = false
  }
}

function addImageField() {
  tempProduct.value.imageUrl.push('')
}

function removeImageField(index: number) {
  tempProduct.value.imageUrl.splice(index, 1)
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <div>
    <!-- Toolbar -->
    <div class="mb-6 flex items-center justify-between">
      <p class="text-sm text-bark-500">
        共 {{ products.length }} 筆商品
      </p>
      <VButton @click="openAddModal">
        <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        新增商品
      </VButton>
    </div>

    <VLoading v-if="loading" />

    <!-- Table -->
    <div v-else class="overflow-hidden rounded-xl border border-cream-200 bg-white">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-cream-200 bg-cream-50">
            <th class="px-5 py-3 text-left font-medium text-bark-600">圖片</th>
            <th class="px-5 py-3 text-left font-medium text-bark-600">商品名稱</th>
            <th class="px-5 py-3 text-left font-medium text-bark-600">分類</th>
            <th
              class="px-5 py-3 text-right font-medium text-bark-600 cursor-pointer select-none"
              @click="toggleSort('origin_price')"
            >
              原價
              <span
                v-if="sortType === 'origin_price' || sortType === ''"
                class="inline-block transition-transform"
                :class="{ 'rotate-180': isReverse }"
              >
                <svg class="inline size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </span>
            </th>
            <th
              class="px-5 py-3 text-right font-medium text-bark-600 cursor-pointer select-none"
              @click="toggleSort('price')"
            >
              售價
              <span
                v-if="sortType === 'price' || sortType === ''"
                class="inline-block transition-transform"
                :class="{ 'rotate-180': isReverse }"
              >
                <svg class="inline size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </span>
            </th>
            <th class="px-5 py-3 text-center font-medium text-bark-600">狀態</th>
            <th class="px-5 py-3 text-right font-medium text-bark-600">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-cream-100">
          <tr v-if="!products.length">
            <td colspan="7" class="px-5 py-12 text-center text-bark-400">
              尚無商品資料
            </td>
          </tr>
          <tr
            v-for="product in sortData"
            :key="product.id"
            class="transition-colors hover:bg-cream-50/50"
          >
            <!-- Image -->
            <td class="px-5 py-3">
              <div class="size-12 overflow-hidden rounded-lg bg-cream-100">
                <img
                  v-if="product.imageUrl?.[0]"
                  :src="product.imageUrl[0]"
                  :alt="product.title"
                  class="size-full object-cover"
                />
              </div>
            </td>
            <!-- Title -->
            <td class="px-5 py-3">
              <p class="font-medium text-bark-800">{{ product.title }}</p>
            </td>
            <!-- Category -->
            <td class="px-5 py-3">
              <span class="rounded-full bg-olive-50 px-2.5 py-1 text-xs font-medium text-olive-700">
                {{ product.category }}
              </span>
            </td>
            <!-- Origin Price -->
            <td class="px-5 py-3 text-right text-bark-500">
              {{ formatMoney(product.origin_price) }}
            </td>
            <!-- Price -->
            <td class="px-5 py-3 text-right font-medium text-olive-800">
              {{ formatMoney(product.price) }}
            </td>
            <!-- Status -->
            <td class="px-5 py-3 text-center">
              <button
                :class="[
                  'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                  product.is_enabled
                    ? 'bg-olive-50 text-olive-700 hover:bg-olive-100'
                    : 'bg-bark-100 text-bark-500 hover:bg-bark-200',
                ]"
                @click="toggleEnabled(product)"
              >
                <span
                  :class="[
                    'size-1.5 rounded-full',
                    product.is_enabled ? 'bg-olive-500' : 'bg-bark-400',
                  ]"
                />
                {{ product.is_enabled ? '啟用' : '停用' }}
              </button>
            </td>
            <!-- Actions -->
            <td class="px-5 py-3">
              <div class="flex items-center justify-end gap-1">
                <button
                  class="rounded-lg p-2 text-bark-400 transition-colors hover:bg-olive-50 hover:text-olive-700"
                  title="編輯"
                  @click="openEditModal(product)"
                >
                  <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  class="rounded-lg p-2 text-bark-400 transition-colors hover:bg-terra-50 hover:text-terra-500"
                  title="刪除"
                  @click="openDeleteModal(product)"
                >
                  <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-6">
      <VPagination
        v-if="(pagination as PaginationType).total_pages"
        :pagination="pagination as PaginationType"
        @change-page="getProducts"
      />
    </div>

    <!-- Add/Edit Modal -->
    <VModal v-model:open="showProductModal" :title="isEditMode ? '編輯商品' : '新增商品'" size="lg">
      <form class="space-y-4" @submit.prevent="updateProduct">
        <div class="grid gap-4 sm:grid-cols-2">
          <VInput v-model="tempProduct.title" label="商品名稱" placeholder="請輸入商品名稱" />
          <VInput v-model="tempProduct.category" label="分類" placeholder="請輸入分類" />
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-bark-700">原價</label>
            <input
              v-model.number="tempProduct.origin_price"
              type="number"
              placeholder="0"
              class="w-full rounded-lg border border-cream-200 bg-white px-4 py-2.5 text-sm text-bark-800 outline-none transition-colors placeholder:text-bark-400 focus:border-olive-400 focus:ring-2 focus:ring-olive-100"
            />
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-bark-700">售價</label>
            <input
              v-model.number="tempProduct.price"
              type="number"
              placeholder="0"
              class="w-full rounded-lg border border-cream-200 bg-white px-4 py-2.5 text-sm text-bark-800 outline-none transition-colors placeholder:text-bark-400 focus:border-olive-400 focus:ring-2 focus:ring-olive-100"
            />
          </div>
          <VInput v-model="tempProduct.unit" label="單位" placeholder="如：包、盒" />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-bark-700">商品描述</label>
            <textarea
              v-model="tempProduct.description"
              rows="3"
              placeholder="請輸入簡短描述"
              class="w-full rounded-lg border border-cream-200 bg-white px-4 py-2.5 text-sm text-bark-800 outline-none transition-colors placeholder:text-bark-400 focus:border-olive-400 focus:ring-2 focus:ring-olive-100"
            />
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-bark-700">說明內容</label>
            <textarea
              v-model="tempProduct.content"
              rows="3"
              placeholder="請輸入詳細內容"
              class="w-full rounded-lg border border-cream-200 bg-white px-4 py-2.5 text-sm text-bark-800 outline-none transition-colors placeholder:text-bark-400 focus:border-olive-400 focus:ring-2 focus:ring-olive-100"
            />
          </div>
        </div>

        <!-- Image URLs -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-bark-700">圖片網址</label>
          <div
            v-for="(_, index) in tempProduct.imageUrl"
            :key="index"
            class="flex gap-2"
          >
            <input
              v-model="tempProduct.imageUrl[index]"
              type="url"
              placeholder="https://..."
              class="flex-1 rounded-lg border border-cream-200 bg-white px-4 py-2.5 text-sm text-bark-800 outline-none transition-colors placeholder:text-bark-400 focus:border-olive-400 focus:ring-2 focus:ring-olive-100"
            />
            <button
              v-if="tempProduct.imageUrl.length > 1"
              type="button"
              class="rounded-lg p-2.5 text-bark-400 transition-colors hover:bg-terra-50 hover:text-terra-500"
              @click="removeImageField(index)"
            >
              <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            class="text-sm text-olive-600 transition-colors hover:text-olive-800"
            @click="addImageField"
          >
            + 新增圖片欄位
          </button>
        </div>

        <!-- Upload -->
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-bark-700">或上傳圖片</label>
          <input
            type="file"
            class="w-full text-sm text-bark-500 file:mr-3 file:rounded-lg file:border-0 file:bg-olive-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-olive-700 hover:file:bg-olive-100"
            @change="uploadFile"
          />
        </div>

        <!-- Enabled Toggle -->
        <div class="flex items-center gap-3">
          <label class="relative inline-flex cursor-pointer items-center">
            <input
              v-model="tempProduct.is_enabled"
              type="checkbox"
              :true-value="1"
              :false-value="0"
              class="peer sr-only"
            />
            <div class="h-6 w-11 rounded-full bg-bark-200 after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-olive-600 peer-checked:after:translate-x-full" />
          </label>
          <span class="text-sm text-bark-700">{{ tempProduct.is_enabled ? '啟用' : '停用' }}</span>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 border-t border-cream-200 pt-4">
          <VButton variant="outline" type="button" @click="showProductModal = false">取消</VButton>
          <VButton :loading="saving" type="submit">
            {{ isEditMode ? '更新' : '新增' }}
          </VButton>
        </div>
      </form>
    </VModal>

    <!-- Delete Confirmation -->
    <VModal v-model:open="showDeleteModal" title="確認刪除">
      <div class="space-y-4">
        <p class="text-sm text-bark-600">
          確定要刪除「<span class="font-medium text-bark-800">{{ tempProduct.title }}</span>」嗎？此操作無法復原。
        </p>
        <div class="flex justify-end gap-3">
          <VButton variant="outline" @click="showDeleteModal = false">取消</VButton>
          <VButton variant="danger" @click="deleteProduct">確認刪除</VButton>
        </div>
      </div>
    </VModal>
  </div>
</template>
