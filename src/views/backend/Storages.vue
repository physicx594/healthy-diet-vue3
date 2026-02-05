<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { uploadApi } from '@/api'
import { useNotificationStore, useLoadingStore } from '@/stores'
import BaseModal from '@/components/shared/BaseModal.vue'

interface StorageImage {
  id: string
  path: string
}

const notification = useNotificationStore()
const loadingStore = useLoadingStore()

const storages = ref<StorageImage[]>([])
const showDeleteModal = ref(false)
const tempImg = ref<StorageImage>({ id: '', path: '' })

const getStorages = async () => {
  loadingStore.setLoading(true)
  try {
    const res = await uploadApi.getAll()
    storages.value = res.data.images
  } catch {
    notification.show('取得圖片失敗', 'error')
  } finally {
    loadingStore.setLoading(false)
  }
}

const openDeleteModal = (item: StorageImage) => {
  tempImg.value = { ...item }
  showDeleteModal.value = true
}

const deleteImg = async () => {
  loadingStore.setLoading(true)
  try {
    await uploadApi.delete(tempImg.value.id)
    notification.show('刪除成功')
    showDeleteModal.value = false
    await getStorages()
  } catch {
    notification.show('刪除失敗', 'error')
    loadingStore.setLoading(false)
  }
}

onMounted(() => {
  getStorages()
})
</script>

<template>
  <div class="container mx-auto px-4 mt-16">
    <h2 class="text-lg font-bold mb-4 border-b pb-2">圖片庫</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="item in storages"
        :key="item.id"
        class="relative group cursor-pointer"
      >
        <figure class="h-37.5 overflow-hidden rounded-md">
          <img
            :src="item.path"
            class="w-full h-full object-cover object-center transition-all duration-300 group-hover:brightness-20"
          />
        </figure>
        <div
          class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          @click="openDeleteModal(item)"
        >
          <i class="far fa-trash-alt fa-3x text-white hover:text-red-500 transition-colors"></i>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <BaseModal v-model="showDeleteModal" title="刪除圖片" size="sm">
      <figure class="w-50 mx-auto">
        <img :src="tempImg.path" class="w-full rounded" />
      </figure>
      <p class="mt-3">
        是否 <span class="text-red-600 font-bold">刪除</span> 這張圖片
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
          @click="deleteImg"
        >
          確認
        </button>
      </template>
    </BaseModal>
  </div>
</template>
