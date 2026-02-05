<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ordersApi } from '@/api'
import { useNotificationStore, useLoadingStore } from '@/stores'
import { formatMoney } from '@/utils'
import type { Order } from '@/types'

const notification = useNotificationStore()
const loadingStore = useLoadingStore()

const orders = ref<Order[]>([])

const getOrders = async () => {
  loadingStore.setLoading(true)
  try {
    const res = await ordersApi.getAdminAll()
    orders.value = res.data.orders
  } catch {
    notification.show('取得訂單失敗', 'error')
  } finally {
    loadingStore.setLoading(false)
  }
}

const togglePaid = async (item: Order) => {
  loadingStore.setLoading(true)
  try {
    await ordersApi.updateAdmin(item.id, { is_paid: !item.is_paid })
    notification.show('修改成功')
    await getOrders()
  } catch {
    notification.show('操作失敗', 'error')
    loadingStore.setLoading(false)
  }
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString()
}

onMounted(() => {
  getOrders()
})
</script>

<template>
  <div class="container mx-auto px-4 mt-16">
    <div class="overflow-x-auto">
      <table class="w-full mt-3 text-left">
        <thead class="border-b-2 border-gray-300">
          <tr>
            <th class="p-2 text-center w-6p">編號</th>
            <th class="p-2">下單時間</th>
            <th class="p-2">購買款項</th>
            <th class="p-2">付款方式</th>
            <th class="p-2">應付金額</th>
            <th class="p-2 w-12p">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in orders"
            :key="item.id"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <th class="p-2 text-center">{{ index + 1 }}</th>
            <td class="p-2">{{ formatDate(item.create_at) }}</td>
            <td class="p-2">
              <ul class="list-none">
                <li
                  v-for="(product, key) in item.products"
                  :key="key"
                >
                  {{ product.product.title }} 數量：{{ product.qty }} {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="p-2">{{ item.payment }}</td>
            <td class="p-2">{{ formatMoney(item.total) }}</td>
            <td class="p-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  :checked="item.is_paid"
                  class="w-4 h-4"
                  @change="togglePaid(item)"
                />
                <strong v-if="item.is_paid" class="text-green-600">已付款</strong>
                <span v-else class="text-gray-400">尚未付款</span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
