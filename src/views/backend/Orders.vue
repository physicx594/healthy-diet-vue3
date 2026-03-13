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
    minute: '2-digit'
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
      <p class="text-bark-500 text-sm">共 {{ orders.length }} 筆訂單</p>
    </div>

    <VLoading v-if="loading" />

    <!-- Table -->
    <div v-else class="border-bark-100 overflow-hidden rounded-xl border bg-white shadow-sm">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-primary-dark">
            <th class="px-5 py-3.5 text-left font-medium text-white/60">訂單編號</th>
            <th class="px-5 py-3.5 text-left font-medium text-white/60">收件人</th>
            <th class="px-5 py-3.5 text-left font-medium text-white/60">Email</th>
            <th class="px-5 py-3.5 text-right font-medium text-white/60">總金額</th>
            <th class="px-5 py-3.5 text-center font-medium text-white/60">付款狀態</th>
            <th class="px-5 py-3.5 text-left font-medium text-white/60">建立時間</th>
            <th class="px-5 py-3.5 text-right font-medium text-white/60">操作</th>
          </tr>
        </thead>
        <tbody class="divide-bark-100 divide-y">
          <tr v-if="!orders.length">
            <td colspan="7" class="text-bark-400 px-5 py-12 text-center">尚無訂單資料</td>
          </tr>
          <tr v-for="order in orders" :key="order.id" class="hover:bg-bark-50 transition-colors">
            <!-- ID -->
            <td class="px-5 py-3">
              <button
                class="text-primary-dark hover:text-primary font-mono text-xs transition-colors hover:underline"
                @click="openDetail(order)"
              >
                {{ order.id.slice(0, 8) }}...
              </button>
            </td>
            <!-- Name -->
            <td class="text-bark-800 px-5 py-3 font-medium">
              {{ order.user?.name }}
            </td>
            <!-- Email -->
            <td class="text-bark-600 px-5 py-3">
              {{ order.user?.email }}
            </td>
            <!-- Total -->
            <td class="text-primary-dark px-5 py-3 text-right font-medium">
              {{ formatMoney(order.total) }}
            </td>
            <!-- Paid Status -->
            <td class="px-5 py-3 text-center">
              <button
                :disabled="updatingId === order.id"
                class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50"
                :class="
                  order.is_paid
                    ? 'bg-primary-dark/10 text-primary-dark hover:bg-primary-dark/20'
                    : 'bg-terra-50 text-terra-600 hover:bg-terra-100'
                "
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
                      order.is_paid ? 'bg-primary-dark' : 'bg-terra-500'
                    ]"
                  />
                  {{ order.is_paid ? '已付款' : '未付款' }}
                </template>
              </button>
            </td>
            <!-- Date -->
            <td class="text-bark-500 px-5 py-3">
              {{ formatDate(order.create_at) }}
            </td>
            <!-- Actions -->
            <td class="px-5 py-3">
              <div class="flex justify-end">
                <button
                  class="text-bark-400 hover:bg-primary-dark/10 hover:text-primary-dark rounded-lg p-2 transition-colors"
                  title="查看詳情"
                  @click="openDetail(order)"
                >
                  <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
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
          <div class="bg-bark-50 rounded-lg p-4">
            <dl class="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt class="text-bark-500">訂單編號</dt>
                <dd class="text-bark-800 mt-0.5 font-mono text-xs">{{ selectedOrder.id }}</dd>
              </div>
              <div>
                <dt class="text-bark-500">建立時間</dt>
                <dd class="text-bark-800 mt-0.5">{{ formatDate(selectedOrder.create_at) }}</dd>
              </div>
              <div>
                <dt class="text-bark-500">付款狀態</dt>
                <dd class="mt-0.5">
                  <span
                    :class="[
                      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                      selectedOrder.is_paid
                        ? 'bg-primary-dark/10 text-primary-dark'
                        : 'bg-terra-100 text-terra-600'
                    ]"
                  >
                    <span
                      :class="[
                        'size-1.5 rounded-full',
                        selectedOrder.is_paid ? 'bg-primary-dark' : 'bg-terra-500'
                      ]"
                    />
                    {{ selectedOrder.is_paid ? '已付款' : '未付款' }}
                  </span>
                </dd>
              </div>
              <div>
                <dt class="text-bark-500">總金額</dt>
                <dd class="text-primary-dark mt-0.5 font-bold">
                  {{ formatMoney(selectedOrder.total) }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Customer Info -->
          <div>
            <h4 class="text-bark-800 text-sm font-semibold">收件人資訊</h4>
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
            <h4 class="text-bark-800 text-sm font-semibold">備註</h4>
            <p class="text-bark-600 mt-1 text-sm">{{ selectedOrder.message }}</p>
          </div>

          <!-- Products -->
          <div>
            <h4 class="text-bark-800 text-sm font-semibold">訂購商品</h4>
            <div class="divide-bark-100 border-bark-100 mt-2 divide-y rounded-lg border">
              <div
                v-for="item in productList(selectedOrder)"
                :key="item.id"
                class="flex items-center gap-3 px-4 py-3"
              >
                <div class="bg-bark-100 size-10 shrink-0 overflow-hidden rounded-lg">
                  <img
                    v-if="item.product?.imageUrl?.[0]"
                    :src="item.product.imageUrl[0]"
                    :alt="item.product?.title"
                    class="size-full object-cover"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-bark-800 truncate text-sm font-medium">
                    {{ item.product?.title }}
                  </p>
                  <p class="text-bark-400 text-xs">x{{ item.qty }}</p>
                </div>
                <p class="text-bark-800 text-sm font-medium">{{ formatMoney(item.final_total) }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="border-bark-100 flex justify-end border-t pt-4">
            <VButton variant="outline" @click="detailOpen = false">關閉</VButton>
          </div>
        </div>
      </template>
    </VModal>
  </div>
</template>
