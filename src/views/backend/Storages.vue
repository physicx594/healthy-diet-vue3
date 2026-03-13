<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { uploadApi } from '@/api'
import { useNotificationStore, useLoadingStore } from '@/stores'
import VButton from '@/components/ui/VButton.vue'
import VModal from '@/components/ui/VModal.vue'
import VLoading from '@/components/ui/VLoading.vue'

interface StorageImage {
  id: string
  path: string
}

const notification = useNotificationStore()
const loadingStore = useLoadingStore()

const storages = ref<StorageImage[]>([])
const loading = ref(true)
const uploading = ref(false)

const deleteModalOpen = ref(false)
const deletingImage = ref<StorageImage | null>(null)
const deleting = ref(false)

const copiedId = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const getStorages = async () => {
  loading.value = true
  try {
    const res = await uploadApi.getAll()
    storages.value = res.data.images
  } catch {
    notification.show('取得圖片失敗', 'error')
  } finally {
    loading.value = false
    loadingStore.setLoading(false)
  }
}

function triggerUpload() {
  fileInput.value?.click()
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  uploading.value = true
  try {
    await uploadApi.upload(file)
    notification.show('上傳成功')
    await getStorages()
  } catch {
    notification.show('上傳失敗，不可超過 2MB', 'error')
  } finally {
    uploading.value = false
    input.value = ''
  }
}

function openDelete(image: StorageImage) {
  deletingImage.value = image
  deleteModalOpen.value = true
}

async function handleDelete() {
  if (!deletingImage.value) return
  deleting.value = true
  try {
    await uploadApi.delete(deletingImage.value.id)
    notification.show('刪除成功')
    deleteModalOpen.value = false
    deletingImage.value = null
    await getStorages()
  } catch {
    notification.show('刪除失敗', 'error')
  } finally {
    deleting.value = false
  }
}

async function copyUrl(image: StorageImage) {
  await navigator.clipboard.writeText(image.path)
  copiedId.value = image.id
  setTimeout(() => {
    copiedId.value = ''
  }, 2000)
}

onMounted(() => {
  getStorages()
})
</script>

<template>
  <div>
    <!-- Toolbar -->
    <div class="mb-6 flex items-center justify-between">
      <p class="text-bark-500 text-sm">共 {{ storages.length }} 張圖片</p>
      <div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileChange"
        />
        <VButton :loading="uploading" @click="triggerUpload">
          <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          上傳圖片
        </VButton>
      </div>
    </div>

    <VLoading v-if="loading" />

    <!-- Empty State -->
    <div v-else-if="!storages.length" class="py-20 text-center">
      <svg
        class="text-bark-300 mx-auto size-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p class="text-bark-600 mt-4 text-lg font-medium">尚無圖片</p>
      <p class="text-bark-400 mt-1 text-sm">點擊上方按鈕上傳第一張圖片</p>
    </div>

    <!-- Image Grid -->
    <div v-else class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="image in storages"
        :key="image.id"
        class="group border-bark-100 relative overflow-hidden rounded-xl border bg-white"
      >
        <!-- Image -->
        <div class="bg-bark-100 aspect-square">
          <img :src="image.path" :alt="image.id" class="size-full object-cover" />
        </div>

        <!-- Overlay Actions -->
        <div
          class="bg-bark-900/0 group-hover:bg-bark-900/40 absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-all group-hover:opacity-100"
        >
          <button
            class="text-bark-700 rounded-lg bg-white/90 p-2.5 shadow-sm transition-colors hover:bg-white"
            title="複製網址"
            @click="copyUrl(image)"
          >
            <svg
              v-if="copiedId === image.id"
              class="text-primary-dark size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <svg v-else class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button
            class="text-terra-500 rounded-lg bg-white/90 p-2.5 shadow-sm transition-colors hover:bg-white"
            title="刪除"
            @click="openDelete(image)"
          >
            <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <!-- URL Bar -->
        <div class="border-bark-100 border-t px-3 py-2">
          <p class="text-bark-500 truncate text-xs" :title="image.path">
            {{ image.path }}
          </p>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <VModal v-model:open="deleteModalOpen" title="確認刪除">
      <div class="space-y-4">
        <div v-if="deletingImage" class="bg-bark-100 mx-auto size-32 overflow-hidden rounded-lg">
          <img :src="deletingImage.path" :alt="deletingImage.id" class="size-full object-cover" />
        </div>
        <p class="text-bark-600 text-center text-sm">確定要刪除這張圖片嗎？此操作無法復原。</p>
        <div class="flex justify-end gap-3">
          <VButton variant="outline" @click="deleteModalOpen = false">取消</VButton>
          <VButton variant="danger" :loading="deleting" @click="handleDelete">確認刪除</VButton>
        </div>
      </div>
    </VModal>
  </div>
</template>
