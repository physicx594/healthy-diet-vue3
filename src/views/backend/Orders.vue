<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ordersApi } from '@/api'
import { useNotificationStore, useLoadingStore } from '@/stores'
import { formatMoney } from '@/utils'
import type { Order, Pagination as PaginationType } from '@/types'
import VButton from '@/components/ui/VButton.vue'
import VModal from '@/components/ui/VModal.vue'
import VPagination from '@/components/ui/VPagination.vue'
import AdminDataTable from '@/components/backend/AdminDataTable.vue'
import IconEye from '@/components/icons/IconEye.vue'

const notification = useNotificationStore()
const loadingStore = useLoadingStore()

const orders = ref<Order[]>([])
const pagination = ref<Partial<PaginationType>>({})
const currentPage = ref(1)
const loading = ref(true)
const updatingId = ref('')
const detailOpen = ref(false)
const selectedOrder = ref<Order | null>(null)

const formatDate = (ts: number): string => {
  return new Date(ts * 1000).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getOrders = async (page = 1) => {
  currentPage.value = page
  loading.value = true
  try {
    const res = await ordersApi.getAdminAll(page)
    orders.value = res.data.orders
    pagination.value = res.data.pagination
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
    await getOrders(currentPage.value)
  } catch {
    notification.show('操作失敗', 'error')
  } finally {
    updatingId.value = ''
  }
}

const openDetail = (order: Order) => {
  selectedOrder.value = order
  detailOpen.value = true
}

const productList = (order: Order) => {
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

    <!-- Table -->
    <AdminDataTable
      :columns="[
        { label: '訂單編號' },
        { label: '收件人' },
        { label: 'Email' },
        { label: '總金額' },
        { label: '付款狀態' },
        { label: '建立時間' },
        { label: '操作' }
      ]"
      :items="orders"
      :loading="loading"
      v-slot="{ item: order }"
    >
      <tr :key="order.id" class="hover:bg-bark-50 transition-colors">
        <!-- ID -->
        <td>{{ order.id.slice(0, 10) }}...</td>
        <!-- Name -->
        <td>
          {{ order.user?.name }}
        </td>
        <!-- Email -->
        <td>
          {{ order.user?.email }}
        </td>
        <!-- Total -->
        <td>
          {{ formatMoney(order.total) }}
        </td>
        <!-- Paid Status -->
        <td>
          <button
            :disabled="updatingId === order.id"
            class="inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50"
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
        <td>
          {{ formatDate(order.create_at) }}
        </td>
        <!-- Actions -->
        <td>
          <button
            class="hover:bg-primary-dark/10 cursor-pointer rounded-lg p-2 transition-colors"
            title="查看詳情"
            @click="openDetail(order)"
          >
            <IconEye class="size-4" />
          </button>
        </td>
      </tr>
    </AdminDataTable>

    <!-- Pagination -->
    <div class="mt-4">
      <VPagination
        v-if="(pagination as PaginationType).total_pages"
        :pagination="pagination as PaginationType"
        @change-page="getOrders"
      />
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
