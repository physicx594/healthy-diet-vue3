<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ordersApi } from '@/api'
import { useNotificationStore, useLoadingStore } from '@/stores'
import { formatMoney } from '@/utils'
import type { Order } from '@/types'
import VButton from '@/components/ui/VButton.vue'
import VModal from '@/components/ui/VModal.vue'
import VLoading from '@/components/ui/VLoading.vue'

const notification = useNotificationStore()
const loadingStore = useLoadingStore()

const orders = ref<Order[]>([])
const loading = ref(true)
const updatingId = ref('')

const detailOpen = ref(false)
const selectedOrder = ref<Order | null>(null)

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getOrders = async () => {
  loading.value = true
  try {
    const res = await ordersApi.getAdminAll()
    orders.value = res.data.orders
  } catch {
    notification.show('取得訂單失敗', 'error')
  } finally {
    loading.value = false
    loadingStore.setLoading(false)
  }
}

const togglePaid = async (item: Order) => {
  updatingId.value = item.id
  try {
    await ordersApi.updateAdmin(item.id, { is_paid: !item.is_paid })
    notification.show('修改成功')
    await getOrders()
  } catch {
    notification.show('操作失敗', 'error')
  } finally {
    updatingId.value = ''
  }
}

function openDetail(order: Order) {
  selectedOrder.value = order
  detailOpen.value = true
}

function productList(order: Order) {
  return Object.values(order.products)
}

onMounted(() => {
  getOrders()
})
</script>

<template>
  <div>
    <!-- Toolbar -->
    <div class="mb-6">
      <p class="text-sm text-bark-500">
        共 {{ orders.length }} 筆訂單
      </p>
    </div>

    <VLoading v-if="loading" />

    <!-- Table -->
    <div v-else class="overflow-hidden rounded-xl border border-cream-200 bg-white">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-cream-200 bg-cream-50">
            <th class="px-5 py-3 text-left font-medium text-bark-600">訂單編號</th>
            <th class="px-5 py-3 text-left font-medium text-bark-600">收件人</th>
            <th class="px-5 py-3 text-left font-medium text-bark-600">Email</th>
            <th class="px-5 py-3 text-right font-medium text-bark-600">總金額</th>
            <th class="px-5 py-3 text-center font-medium text-bark-600">付款狀態</th>
            <th class="px-5 py-3 text-left font-medium text-bark-600">建立時間</th>
            <th class="px-5 py-3 text-right font-medium text-bark-600">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-cream-100">
          <tr v-if="!orders.length">
            <td colspan="7" class="px-5 py-12 text-center text-bark-400">
              尚無訂單資料
            </td>
          </tr>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="transition-colors hover:bg-cream-50/50"
          >
            <!-- ID -->
            <td class="px-5 py-3">
              <button
                class="font-mono text-xs text-olive-700 transition-colors hover:text-olive-900 hover:underline"
                @click="openDetail(order)"
              >
                {{ order.id.slice(0, 8) }}...
              </button>
            </td>
            <!-- Name -->
            <td class="px-5 py-3 font-medium text-bark-800">
              {{ order.user?.name }}
            </td>
            <!-- Email -->
            <td class="px-5 py-3 text-bark-600">
              {{ order.user?.email }}
            </td>
            <!-- Total -->
            <td class="px-5 py-3 text-right font-medium text-olive-800">
              {{ formatMoney(order.total) }}
            </td>
            <!-- Paid Status -->
            <td class="px-5 py-3 text-center">
              <button
                :disabled="updatingId === order.id"
                class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50"
                :class="order.is_paid
                  ? 'bg-olive-50 text-olive-700 hover:bg-olive-100'
                  : 'bg-terra-50 text-terra-600 hover:bg-terra-100'"
                @click="togglePaid(order)"
              >
                <span
                  v-if="updatingId === order.id"
                  class="size-3 animate-spin rounded-full border-2 border-current border-t-transparent"
                />
                <template v-else>
                  <span
                    :class="[
                      'size-1.5 rounded-full',
                      order.is_paid ? 'bg-olive-500' : 'bg-terra-500',
                    ]"
                  />
                  {{ order.is_paid ? '已付款' : '未付款' }}
                </template>
              </button>
            </td>
            <!-- Date -->
            <td class="px-5 py-3 text-bark-500">
              {{ formatDate(order.create_at) }}
            </td>
            <!-- Actions -->
            <td class="px-5 py-3">
              <div class="flex justify-end">
                <button
                  class="rounded-lg p-2 text-bark-400 transition-colors hover:bg-olive-50 hover:text-olive-700"
                  title="查看詳情"
                  @click="openDetail(order)"
                >
                  <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detail Modal -->
    <VModal v-model:open="detailOpen" title="訂單詳情" size="lg">
      <template v-if="selectedOrder">
        <div class="space-y-5">
          <!-- Order Info -->
          <div class="rounded-lg bg-cream-50 p-4">
            <dl class="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt class="text-bark-500">訂單編號</dt>
                <dd class="mt-0.5 font-mono text-xs text-bark-800">{{ selectedOrder.id }}</dd>
              </div>
              <div>
                <dt class="text-bark-500">建立時間</dt>
                <dd class="mt-0.5 text-bark-800">{{ formatDate(selectedOrder.create_at) }}</dd>
              </div>
              <div>
                <dt class="text-bark-500">付款狀態</dt>
                <dd class="mt-0.5">
                  <span
                    :class="[
                      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                      selectedOrder.is_paid
                        ? 'bg-olive-100 text-olive-700'
                        : 'bg-terra-100 text-terra-600',
                    ]"
                  >
                    <span
                      :class="[
                        'size-1.5 rounded-full',
                        selectedOrder.is_paid ? 'bg-olive-500' : 'bg-terra-500',
                      ]"
                    />
                    {{ selectedOrder.is_paid ? '已付款' : '未付款' }}
                  </span>
                </dd>
              </div>
              <div>
                <dt class="text-bark-500">總金額</dt>
                <dd class="mt-0.5 font-bold text-olive-800">{{ formatMoney(selectedOrder.total) }}</dd>
              </div>
            </dl>
          </div>

          <!-- Customer Info -->
          <div>
            <h4 class="text-sm font-semibold text-bark-800">收件人資訊</h4>
            <dl class="mt-2 grid gap-2 text-sm sm:grid-cols-2">
              <div class="flex justify-between sm:flex-col">
                <dt class="text-bark-500">姓名</dt>
                <dd class="text-bark-800">{{ selectedOrder.user?.name }}</dd>
              </div>
              <div class="flex justify-between sm:flex-col">
                <dt class="text-bark-500">Email</dt>
                <dd class="text-bark-800">{{ selectedOrder.user?.email }}</dd>
              </div>
              <div class="flex justify-between sm:flex-col">
                <dt class="text-bark-500">電話</dt>
                <dd class="text-bark-800">{{ selectedOrder.user?.tel }}</dd>
              </div>
              <div class="flex justify-between sm:flex-col">
                <dt class="text-bark-500">地址</dt>
                <dd class="text-bark-800">{{ selectedOrder.user?.address }}</dd>
              </div>
            </dl>
          </div>

          <!-- Message -->
          <div v-if="selectedOrder.message">
            <h4 class="text-sm font-semibold text-bark-800">備註</h4>
            <p class="mt-1 text-sm text-bark-600">{{ selectedOrder.message }}</p>
          </div>

          <!-- Products -->
          <div>
            <h4 class="text-sm font-semibold text-bark-800">訂購商品</h4>
            <div class="mt-2 divide-y divide-cream-100 rounded-lg border border-cream-200">
              <div
                v-for="item in productList(selectedOrder)"
                :key="item.id"
                class="flex items-center gap-3 px-4 py-3"
              >
                <div class="size-10 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                  <img
                    v-if="item.product?.imageUrl?.[0]"
                    :src="item.product.imageUrl[0]"
                    :alt="item.product?.title"
                    class="size-full object-cover"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium text-bark-800">{{ item.product?.title }}</p>
                  <p class="text-xs text-bark-400">x{{ item.qty }}</p>
                </div>
                <p class="text-sm font-medium text-bark-800">{{ formatMoney(item.final_total) }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end border-t border-cream-200 pt-4">
            <VButton variant="outline" @click="detailOpen = false">關閉</VButton>
          </div>
        </div>
      </template>
    </VModal>
  </div>
</template>
