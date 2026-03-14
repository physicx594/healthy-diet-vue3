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
      await productsApi.update(
        tempProduct.value.id,
        tempProduct.value as unknown as Record<string, unknown>
      )
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
  <div class="flex h-full flex-col">
    <!-- Toolbar -->
    <div class="mb-4 flex shrink-0 items-center justify-between">
      <p class="text-bark-500 text-sm">共 {{ products.length }} 筆商品</p>
      <VButton @click="openAddModal">
        <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        新增商品
      </VButton>
    </div>

    <!-- Content area -->
    <div class="min-h-0 flex-1">
      <VLoading v-if="loading" />

      <!-- Table -->
      <div
        v-else
        class="border-bark-100 scrollbar-hide h-full overflow-y-auto rounded-xl border bg-white shadow-sm"
      >
        <table class="w-full table-fixed text-sm">
          <thead>
            <tr class="bg-primary-dark sticky top-0">
              <th class="px-5 py-3.5 text-center font-medium text-white/60">圖片</th>
              <th class="px-5 py-3.5 text-center font-medium text-white/60">商品名稱</th>
              <th class="px-5 py-3.5 text-center font-medium text-white/60">分類</th>
              <th
                class="cursor-pointer px-5 py-3.5 text-center font-medium text-white/60 transition-colors select-none hover:text-white"
                @click="toggleSort('origin_price')"
              >
                原價
                <span
                  v-if="sortType === 'origin_price' || sortType === ''"
                  class="inline-block transition-transform"
                  :class="{ 'rotate-180': isReverse }"
                >
                  <svg class="inline size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </span>
              </th>
              <th
                class="cursor-pointer px-5 py-3.5 text-center font-medium text-white/60 transition-colors select-none hover:text-white"
                @click="toggleSort('price')"
              >
                售價
                <span
                  v-if="sortType === 'price' || sortType === ''"
                  class="inline-block transition-transform"
                  :class="{ 'rotate-180': isReverse }"
                >
                  <svg class="inline size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </span>
              </th>
              <th class="px-5 py-3.5 text-center font-medium text-white/60">狀態</th>
              <th class="px-5 py-3.5 text-center font-medium text-white/60">操作</th>
            </tr>
          </thead>
          <tbody class="divide-bark-100 divide-y">
            <tr v-if="!products.length">
              <td colspan="7" class="text-bark-400 px-5 py-12 text-center">尚無商品資料</td>
            </tr>
            <tr
              v-for="product in sortData"
              :key="product.id"
              class="hover:bg-bark-50 transition-colors"
            >
              <!-- Image -->
              <td class="px-5 py-3 text-center">
                <div class="bg-bark-100 mx-auto size-12 overflow-hidden rounded-lg">
                  <img
                    v-if="product.imageUrl?.[0]"
                    :src="product.imageUrl[0]"
                    :alt="product.title"
                    class="size-full object-cover"
                  />
                </div>
              </td>
              <!-- Title -->
              <td class="px-5 py-3 text-center">
                <p class="text-bark-800 font-medium">{{ product.title }}</p>
              </td>
              <!-- Category -->
              <td class="px-5 py-3 text-center">
                <span
                  class="bg-primary-dark/10 text-primary-dark rounded-full px-2.5 py-1 text-xs font-medium"
                >
                  {{ product.category }}
                </span>
              </td>
              <!-- Origin Price -->
              <td class="text-bark-500 px-5 py-3 text-center">
                {{ formatMoney(product.origin_price) }}
              </td>
              <!-- Price -->
              <td class="text-primary-dark px-5 py-3 text-center font-medium">
                {{ formatMoney(product.price) }}
              </td>
              <!-- Status -->
              <td class="px-5 py-3 text-center">
                <button
                  :class="[
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                    product.is_enabled
                      ? 'bg-primary-dark/10 text-primary-dark hover:bg-primary-dark/20'
                      : 'bg-bark-100 text-bark-500 hover:bg-bark-200'
                  ]"
                >
                  <span
                    :class="[
                      'size-1.5 rounded-full',
                      product.is_enabled ? 'bg-primary-dark' : 'bg-bark-400'
                    ]"
                  />
                  {{ product.is_enabled ? '啟用' : '停用' }}
                </button>
              </td>
              <!-- Actions -->
              <td class="px-5 py-3">
                <div class="flex items-center justify-center gap-1">
                  <button
                    class="text-bark-400 hover:bg-primary-dark/10 hover:text-primary-dark rounded-lg p-2 transition-colors"
                    title="編輯"
                    @click="openEditModal(product)"
                  >
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    class="text-bark-400 hover:bg-terra-50 hover:text-terra-500 rounded-lg p-2 transition-colors"
                    title="刪除"
                    @click="openDeleteModal(product)"
                  >
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-4 shrink-0">
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
            <label class="text-bark-700 block text-sm font-medium">原價</label>
            <input
              v-model.number="tempProduct.origin_price"
              type="number"
              placeholder="0"
              class="border-bark-100 text-bark-800 placeholder:text-bark-400 focus:border-primary-dark focus:ring-primary-dark/10 w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors outline-none focus:ring-2"
            />
          </div>
          <div class="space-y-1.5">
            <label class="text-bark-700 block text-sm font-medium">售價</label>
            <input
              v-model.number="tempProduct.price"
              type="number"
              placeholder="0"
              class="border-bark-100 text-bark-800 placeholder:text-bark-400 focus:border-primary-dark focus:ring-primary-dark/10 w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors outline-none focus:ring-2"
            />
          </div>
          <VInput v-model="tempProduct.unit" label="單位" placeholder="如：包、盒" />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-1.5">
            <label class="text-bark-700 block text-sm font-medium">商品描述</label>
            <textarea
              v-model="tempProduct.description"
              rows="3"
              placeholder="請輸入簡短描述"
              class="border-bark-100 text-bark-800 placeholder:text-bark-400 focus:border-primary-dark focus:ring-primary-dark/10 w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors outline-none focus:ring-2"
            />
          </div>
          <div class="space-y-1.5">
            <label class="text-bark-700 block text-sm font-medium">說明內容</label>
            <textarea
              v-model="tempProduct.content"
              rows="3"
              placeholder="請輸入詳細內容"
              class="border-bark-100 text-bark-800 placeholder:text-bark-400 focus:border-primary-dark focus:ring-primary-dark/10 w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors outline-none focus:ring-2"
            />
          </div>
        </div>

        <!-- Image URLs -->
        <div class="space-y-2">
          <label class="text-bark-700 block text-sm font-medium">圖片網址</label>
          <div v-for="(_, index) in tempProduct.imageUrl" :key="index" class="flex gap-2">
            <input
              v-model="tempProduct.imageUrl[index]"
              type="url"
              placeholder="https://..."
              class="border-bark-100 text-bark-800 placeholder:text-bark-400 focus:border-primary-dark focus:ring-primary-dark/10 flex-1 rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors outline-none focus:ring-2"
            />
            <button
              v-if="tempProduct.imageUrl.length > 1"
              type="button"
              class="text-bark-400 hover:bg-terra-50 hover:text-terra-500 rounded-lg p-2.5 transition-colors"
              @click="removeImageField(index)"
            >
              <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <button
            type="button"
            class="text-primary-dark/70 hover:text-primary-dark text-sm transition-colors"
            @click="addImageField"
          >
            + 新增圖片欄位
          </button>
        </div>

        <!-- Upload -->
        <div class="space-y-1.5">
          <label class="text-bark-700 block text-sm font-medium">或上傳圖片</label>
          <input
            type="file"
            class="text-bark-500 file:bg-primary-dark/10 file:text-primary-dark hover:file:bg-primary-dark/20 w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium"
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
            <div
              class="bg-bark-200 peer-checked:bg-primary-dark h-6 w-11 rounded-full after:absolute after:top-[2px] after:left-[2px] after:size-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"
            />
          </label>
          <span class="text-bark-700 text-sm">{{ tempProduct.is_enabled ? '啟用' : '停用' }}</span>
        </div>

        <!-- Actions -->
        <div class="border-bark-100 flex justify-end gap-3 border-t pt-4">
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
        <p class="text-bark-600 text-sm">
          確定要刪除「<span class="text-bark-800 font-medium">{{ tempProduct.title }}</span
          >」嗎？此操作無法復原。
        </p>
        <div class="flex justify-end gap-3">
          <VButton variant="outline" @click="showDeleteModal = false">取消</VButton>
          <VButton variant="danger" @click="deleteProduct">確認刪除</VButton>
        </div>
      </div>
    </VModal>
  </div>
</template>
