<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { couponsApi } from '@/api'
import { useNotificationStore, useLoadingStore } from '@/stores'
import type { Coupon } from '@/types'
import VButton from '@/components/ui/VButton.vue'
import VInput from '@/components/ui/VInput.vue'
import VModal from '@/components/ui/VModal.vue'
import AdminDataTable from '@/components/backend/AdminDataTable.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconTrash from '@/components/icons/IconTrash.vue'

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

const formatDate = (ts: number): string => {
  return new Date(ts * 1000).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const tsToDateInput = (ts: number): string => {
  return new Date(ts * 1000).toISOString().slice(0, 10)
}

const isExpired = (ts: number): boolean => {
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

const openCreate = () => {
  editingId.value = ''
  Object.assign(form, { ...defaultForm })
  modalOpen.value = true
}

const openEdit = (coupon: Coupon) => {
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

const handleSave = async () => {
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

const openDelete = (coupon: Coupon) => {
  deletingCoupon.value = coupon
  deleteModalOpen.value = true
}

const handleDelete = async () => {
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
        <IconPlus class="size-4" />
        新增優惠券
      </VButton>
    </div>

    <!-- Table -->
    <AdminDataTable
      :columns="[
        { label: '名稱' },
        { label: '優惠碼' },
        { label: '折扣' },
        { label: '到期日' },
        { label: '狀態' },
        { label: '操作' }
      ]"
      :items="coupons"
      :loading="loading"
      v-slot="{ item: coupon }"
    >
      <tr :key="coupon.id" class="hover:bg-bark-50 transition-colors">
        <!-- Title -->
        <td>
          {{ coupon.title }}
        </td>
        <!-- Code -->
        <td>
          <code class="bg-primary-dark/10 text-primary-dark rounded px-2 py-0.5 text-xs">
            {{ coupon.code }}
          </code>
        </td>
        <!-- Percent -->
        <td>{{ coupon.percent }}%</td>
        <!-- Due Date -->
        <td>
          <span :class="isExpired(coupon.due_date) ? 'text-terra-500' : ''">
            {{ formatDate(coupon.due_date) }}
          </span>
          <span v-if="isExpired(coupon.due_date)" class="text-terra-400 ml-1 text-xs">
            已過期
          </span>
        </td>
        <!-- Status -->
        <td>
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
        <td>
          <div class="flex items-center justify-center gap-1">
            <button
              class="hover:bg-primary-dark/10 cursor-pointer rounded-lg p-2 transition-colors"
              title="編輯"
              @click="openEdit(coupon)"
            >
              <IconPencil class="size-4" />
            </button>
            <button
              class="hover:bg-terra-100 hover:text-terra-500 cursor-pointer rounded-lg p-2 transition-colors"
              title="刪除"
              @click="openDelete(coupon)"
            >
              <IconTrash class="size-4" />
            </button>
          </div>
        </td>
      </tr>
    </AdminDataTable>

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
