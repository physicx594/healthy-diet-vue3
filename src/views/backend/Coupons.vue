<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { couponsApi } from '@/api'
import { useNotificationStore, useLoadingStore } from '@/stores'
import type { Coupon } from '@/types'
import VButton from '@/components/ui/VButton.vue'
import VInput from '@/components/ui/VInput.vue'
import VModal from '@/components/ui/VModal.vue'
import VLoading from '@/components/ui/VLoading.vue'

const notification = useNotificationStore()
const loadingStore = useLoadingStore()

const coupons = ref<Coupon[]>([])
const loading = ref(true)
const saving = ref(false)

const modalOpen = ref(false)
const editingId = ref('')

const deleteModalOpen = ref(false)
const deletingCoupon = ref<Coupon | null>(null)
const deleting = ref(false)

const defaultForm = {
  title: '',
  code: '',
  percent: 80,
  due_date: '',
  is_enabled: 1
}

const form = reactive({ ...defaultForm })

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

function tsToDateInput(ts: number): string {
  return new Date(ts * 1000).toISOString().slice(0, 10)
}

function isExpired(ts: number): boolean {
  return ts * 1000 < Date.now()
}

const getCoupons = async () => {
  loading.value = true
  try {
    const res = await couponsApi.getAdminAll()
    coupons.value = res.data.coupons
  } catch {
    notification.show('取得優惠券失敗', 'error')
  } finally {
    loading.value = false
    loadingStore.setLoading(false)
  }
}

function openCreate() {
  editingId.value = ''
  Object.assign(form, { ...defaultForm })
  modalOpen.value = true
}

function openEdit(coupon: Coupon) {
  editingId.value = coupon.id
  Object.assign(form, {
    title: coupon.title,
    code: coupon.code,
    percent: coupon.percent,
    due_date: tsToDateInput(coupon.due_date),
    is_enabled: coupon.is_enabled
  })
  modalOpen.value = true
}

async function handleSave() {
  saving.value = true
  try {
    const dueTs = form.due_date ? Math.floor(new Date(form.due_date).getTime() / 1000) : 0
    const payload = {
      title: form.title,
      code: form.code,
      percent: Number(form.percent),
      due_date: dueTs,
      is_enabled: form.is_enabled
    }
    if (editingId.value) {
      await couponsApi.update(editingId.value, payload as unknown as Record<string, unknown>)
      notification.show('編輯成功')
    } else {
      await couponsApi.create(payload as unknown as Record<string, unknown>)
      notification.show('新增成功')
    }
    modalOpen.value = false
    await getCoupons()
  } catch {
    notification.show('操作失敗，請檢查', 'error')
  } finally {
    saving.value = false
  }
}

function openDelete(coupon: Coupon) {
  deletingCoupon.value = coupon
  deleteModalOpen.value = true
}

async function handleDelete() {
  if (!deletingCoupon.value) return
  deleting.value = true
  try {
    await couponsApi.delete(deletingCoupon.value.id)
    notification.show('刪除成功')
    deleteModalOpen.value = false
    deletingCoupon.value = null
    await getCoupons()
  } catch {
    notification.show('刪除失敗', 'error')
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  getCoupons()
})
</script>

<template>
  <div>
    <!-- Toolbar -->
    <div class="mb-6 flex items-center justify-between">
      <p class="text-bark-500 text-sm">共 {{ coupons.length }} 筆優惠券</p>
      <VButton @click="openCreate">
        <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        新增優惠券
      </VButton>
    </div>

    <VLoading v-if="loading" />

    <!-- Table -->
    <div v-else class="border-bark-100 overflow-hidden rounded-xl border bg-white shadow-sm">
      <table class="w-full table-fixed text-sm">
        <thead>
          <tr class="bg-primary-dark">
            <th class="px-5 py-3.5 text-center font-medium text-white/60">名稱</th>
            <th class="px-5 py-3.5 text-center font-medium text-white/60">優惠碼</th>
            <th class="px-5 py-3.5 text-center font-medium text-white/60">折扣</th>
            <th class="px-5 py-3.5 text-center font-medium text-white/60">到期日</th>
            <th class="px-5 py-3.5 text-center font-medium text-white/60">狀態</th>
            <th class="px-5 py-3.5 text-center font-medium text-white/60">操作</th>
          </tr>
        </thead>
        <tbody class="divide-bark-100 divide-y">
          <tr v-if="!coupons.length">
            <td colspan="6" class="text-bark-400 px-5 py-12 text-center">尚無優惠券資料</td>
          </tr>
          <tr v-for="coupon in coupons" :key="coupon.id" class="hover:bg-bark-50 transition-colors">
            <!-- Title -->
            <td class="text-bark-800 px-5 py-3 text-center font-medium">
              {{ coupon.title }}
            </td>
            <!-- Code -->
            <td class="px-5 py-3 text-center">
              <code
                class="bg-primary-dark/10 text-primary-dark rounded px-2 py-0.5 font-mono text-xs"
              >
                {{ coupon.code }}
              </code>
            </td>
            <!-- Percent -->
            <td class="text-primary-dark px-5 py-3 text-center font-medium">
              {{ coupon.percent }}%
            </td>
            <!-- Due Date -->
            <td class="px-5 py-3 text-center">
              <span :class="isExpired(coupon.due_date) ? 'text-terra-500' : 'text-bark-600'">
                {{ formatDate(coupon.due_date) }}
              </span>
              <span v-if="isExpired(coupon.due_date)" class="text-terra-400 ml-1 text-xs">
                已過期
              </span>
            </td>
            <!-- Status -->
            <td class="px-5 py-3 text-center">
              <span
                :class="[
                  'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
                  coupon.is_enabled
                    ? 'bg-primary-dark/10 text-primary-dark'
                    : 'bg-bark-100 text-bark-500'
                ]"
              >
                <span
                  :class="[
                    'size-1.5 rounded-full',
                    coupon.is_enabled ? 'bg-primary-dark' : 'bg-bark-400'
                  ]"
                />
                {{ coupon.is_enabled ? '啟用' : '停用' }}
              </span>
            </td>
            <!-- Actions -->
            <td class="px-5 py-3">
              <div class="flex items-center justify-center gap-1">
                <button
                  class="text-bark-400 hover:bg-primary-dark/10 hover:text-primary-dark rounded-lg p-2 transition-colors"
                  title="編輯"
                  @click="openEdit(coupon)"
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
                  @click="openDelete(coupon)"
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

    <!-- Add/Edit Modal -->
    <VModal v-model:open="modalOpen" :title="editingId ? '編輯優惠券' : '新增優惠券'">
      <form class="space-y-4" @submit.prevent="handleSave">
        <VInput v-model="form.title" label="優惠券名稱" placeholder="如：新會員折扣" />
        <VInput v-model="form.code" label="優惠碼" placeholder="如：WELCOME20" />

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-1.5">
            <label class="text-bark-700 block text-sm font-medium">折扣 (%)</label>
            <input
              v-model.number="form.percent"
              type="number"
              min="1"
              max="100"
              placeholder="80"
              class="border-bark-100 text-bark-800 placeholder:text-bark-400 focus:border-primary-dark focus:ring-primary-dark/10 w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors outline-none focus:ring-2"
            />
          </div>
          <div class="space-y-1.5">
            <label class="text-bark-700 block text-sm font-medium">到期日</label>
            <input
              v-model="form.due_date"
              type="date"
              class="border-bark-100 text-bark-800 placeholder:text-bark-400 focus:border-primary-dark focus:ring-primary-dark/10 w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors outline-none focus:ring-2"
            />
          </div>
        </div>

        <!-- Enabled -->
        <div class="flex items-center gap-3">
          <label class="relative inline-flex cursor-pointer items-center">
            <input
              v-model="form.is_enabled"
              type="checkbox"
              :true-value="1"
              :false-value="0"
              class="peer sr-only"
            />
            <div
              class="bg-bark-200 peer-checked:bg-primary-dark h-6 w-11 rounded-full after:absolute after:top-[2px] after:left-[2px] after:size-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"
            />
          </label>
          <span class="text-bark-700 text-sm">{{ form.is_enabled ? '啟用' : '停用' }}</span>
        </div>

        <!-- Actions -->
        <div class="border-bark-100 flex justify-end gap-3 border-t pt-4">
          <VButton variant="outline" type="button" @click="modalOpen = false">取消</VButton>
          <VButton :loading="saving" type="submit">
            {{ editingId ? '更新' : '新增' }}
          </VButton>
        </div>
      </form>
    </VModal>

    <!-- Delete Confirmation -->
    <VModal v-model:open="deleteModalOpen" title="確認刪除">
      <div class="space-y-4">
        <p class="text-bark-600 text-sm">
          確定要刪除「<span class="text-bark-800 font-medium">{{ deletingCoupon?.title }}</span
          >」嗎？此操作無法復原。
        </p>
        <div class="flex justify-end gap-3">
          <VButton variant="outline" @click="deleteModalOpen = false">取消</VButton>
          <VButton variant="danger" :loading="deleting" @click="handleDelete">確認刪除</VButton>
        </div>
      </div>
    </VModal>
  </div>
</template>
