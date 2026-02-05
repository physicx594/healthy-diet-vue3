<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { couponsApi } from '@/api'
import { useNotificationStore, useLoadingStore } from '@/stores'
import type { Coupon } from '@/types'
import BaseModal from '@/components/shared/BaseModal.vue'

const notification = useNotificationStore()
const loadingStore = useLoadingStore()

const coupons = ref<Coupon[]>([])
const showCouponModal = ref(false)
const showDeleteModal = ref(false)
const isEditMode = ref(false)

const tempCoupon = ref<Partial<Coupon>>({
  title: '',
  is_enabled: 0,
  percent: 100,
  due_date: 0,
  code: ''
})
const dueDate = ref('')
const dueTime = ref('')

let countdownTimer: ReturnType<typeof setInterval> | null = null

const getCountdown = (item: Coupon) => {
  const deadline = item.due_date * 1000
  const now = Date.now()
  const days = Math.floor(((deadline - now) / 1000 / 60 / 60) / 24)
  const hours = Math.floor(((deadline - now) / 1000 / 60 / 60) % 24)
  const minutes = Math.floor(((deadline - now) / 1000 / 60) % 60)

  if (minutes < 0) {
    item.countdownStatus = '過期囉'
    item.is_enabled = 0
    return item.countdownStatus
  } else if (days <= 0 && hours <= 0) {
    return minutes + '分鐘'
  } else if (days <= 0) {
    return hours + '小時'
  } else {
    return days + '天'
  }
}

const getCoupons = async () => {
  loadingStore.setLoading(true)
  try {
    const res = await couponsApi.getAdminAll()
    coupons.value = res.data.coupons.map((c: Coupon) => ({
      ...c,
      countdownStatus: ''
    }))
  } catch {
    notification.show('取得優惠券失敗', 'error')
  } finally {
    loadingStore.setLoading(false)
  }
}

const openAddModal = () => {
  isEditMode.value = false
  tempCoupon.value = {
    title: '',
    is_enabled: 0,
    percent: 100,
    due_date: 0,
    code: ''
  }
  dueDate.value = ''
  dueTime.value = ''
  showCouponModal.value = true
}

const openEditModal = (item: Coupon) => {
  isEditMode.value = true
  tempCoupon.value = { ...item }
  const deadlineDate = new Date(item.due_date * 1000)
  dueDate.value = deadlineDate.toISOString().split('T')[0] ?? ''
  dueTime.value = deadlineDate.toTimeString().split(' ')[0] ?? ''
  showCouponModal.value = true
}

const openDeleteModal = (item: Coupon) => {
  tempCoupon.value = { ...item }
  showDeleteModal.value = true
}

const updateCoupon = async () => {
  tempCoupon.value.due_date = Math.floor(new Date(`${dueDate.value} ${dueTime.value}`).getTime() / 1000)
  try {
    if (tempCoupon.value.id) {
      await couponsApi.update(tempCoupon.value.id, tempCoupon.value as Record<string, unknown>)
      notification.show('編輯成功')
    } else {
      await couponsApi.create(tempCoupon.value as Record<string, unknown>)
      notification.show('新增成功')
    }
    showCouponModal.value = false
    await getCoupons()
  } catch {
    notification.show('操作失敗，請檢查', 'error')
  }
}

const deleteCoupon = async () => {
  try {
    await couponsApi.delete(tempCoupon.value.id!)
    notification.show('刪除成功')
    showDeleteModal.value = false
    await getCoupons()
  } catch {
    notification.show('刪除失敗', 'error')
  }
}

const toggleEnabled = async (item: Coupon) => {
  try {
    const data = { ...item, is_enabled: item.is_enabled ? 0 : 1 }
    await couponsApi.update(item.id, data as unknown as Record<string, unknown>)
    await getCoupons()
  } catch {
    notification.show('操作失敗', 'error')
  }
}

onMounted(() => {
  getCoupons()
  countdownTimer = setInterval(() => {
    coupons.value = [...coupons.value]
  }, 60000)
})

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
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
        建立新優惠券
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full mt-3 text-left">
        <thead class="border-b-2 border-gray-300">
          <tr>
            <th class="p-2 text-center w-6p">編號</th>
            <th class="p-2">名稱</th>
            <th class="p-2">折扣百分比</th>
            <th class="p-2">到期日</th>
            <th class="p-2">倒數</th>
            <th class="p-2">上架</th>
            <th class="p-2 w-15p">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in coupons"
            :key="item.id"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <th class="p-2 text-center">{{ index + 1 }}</th>
            <td class="p-2">{{ item.title }}</td>
            <td class="p-2">{{ item.percent }}</td>
            <td class="p-2">{{ new Date(item.due_date * 1000).toLocaleString() }}</td>
            <td
              class="p-2"
              :class="getCountdown(item) === '過期囉' ? 'text-red-600' : 'text-green-600'"
            >
              {{ getCountdown(item) }}
            </td>
            <td class="p-2">
              <div
                v-if="item.countdownStatus === '過期囉'"
                class="w-15 h-7.5 rounded-full bg-gray-400 cursor-not-allowed"
              >
                <div class="w-7.5 h-7.5 rounded-full bg-gray-600" />
              </div>
              <div
                v-else
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

    <!-- Coupon Modal -->
    <BaseModal v-model="showCouponModal" :title="isEditMode ? '編輯優惠券' : '新增優惠券'" size="md">
      <div class="space-y-3">
        <div>
          <label for="couponTitle" class="block text-sm font-medium mb-1">標題</label>
          <input
            id="couponTitle"
            v-model="tempCoupon.title"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="請輸入標題"
          />
        </div>
        <div>
          <label for="couponCode" class="block text-sm font-medium mb-1">優惠碼</label>
          <input
            id="couponCode"
            v-model="tempCoupon.code"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="請輸入優惠碼"
          />
        </div>
        <div>
          <label for="couponDueDate" class="block text-sm font-medium mb-1">到期日</label>
          <input
            id="couponDueDate"
            v-model="dueDate"
            type="date"
            class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label for="couponDueTime" class="block text-sm font-medium mb-1">到期時間</label>
          <input
            id="couponDueTime"
            v-model="dueTime"
            type="time"
            step="1"
            class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label for="couponPercent" class="block text-sm font-medium mb-1">折扣百分比</label>
          <input
            id="couponPercent"
            v-model.number="tempCoupon.percent"
            type="number"
            class="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="請輸入折扣數量"
          />
        </div>
        <div class="flex items-center gap-2">
          <input
            id="couponEnabled"
            v-model="tempCoupon.is_enabled"
            type="checkbox"
            :true-value="1"
            :false-value="0"
            :disabled="tempCoupon.countdownStatus === '過期囉'"
          />
          <label for="couponEnabled">是否啟用</label>
        </div>
      </div>
      <template #footer>
        <button
          type="button"
          class="border border-gray-500 text-gray-500 px-4 py-2 rounded hover:bg-gray-500 hover:text-white transition-colors"
          @click="showCouponModal = false"
        >
          關閉
        </button>
        <button
          type="button"
          class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
          @click="updateCoupon"
        >
          {{ isEditMode ? '更新' : '新增' }}
        </button>
      </template>
    </BaseModal>

    <!-- Delete Modal -->
    <BaseModal v-model="showDeleteModal" title="刪除優惠券" size="sm">
      <p>
        是否刪除 <strong class="text-red-600">{{ tempCoupon.title }}</strong> 優惠券（刪除後將無法恢復）
      </p>
      <template #footer>
        <button
          type="button"
          class="border border-gray-500 text-gray-500 px-4 py-2 rounded hover:bg-gray-500 hover:text-white transition-colors"
          @click="showDeleteModal = false"
        >
          取消
        </button>
        <button
          type="button"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          @click="deleteCoupon"
        >
          確認刪除
        </button>
      </template>
    </BaseModal>
  </div>
</template>
