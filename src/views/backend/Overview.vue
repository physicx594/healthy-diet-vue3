<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { revenueData, paymentStatus, topProducts, categorySales, kpiStats } from '@/data/dashboard'
import { formatMoney } from '@/utils'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const kpiCards = [
  {
    label: '本月總營收',
    value: formatMoney(kpiStats.totalRevenue),
    sub: '近 30 天',
    color: 'text-primary-dark',
    bg: 'bg-primary-dark/8',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    label: '總訂單數',
    value: kpiStats.totalOrders.toLocaleString(),
    sub: '近 30 天',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
  },
  {
    label: '已付款訂單',
    value: kpiStats.paidOrders.toLocaleString(),
    sub: `佔比 68%`,
    color: 'text-primary',
    bg: 'bg-primary/10',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    label: '待付款訂單',
    value: kpiStats.unpaidOrders.toLocaleString(),
    sub: `佔比 32%`,
    color: 'text-terra-500',
    bg: 'bg-terra-50',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  }
]

// 折線圖：每日營收
const revenueOption = {
  tooltip: {
    trigger: 'axis',
    formatter: (params: { name: string; value: number }[]) =>
      `${params[0]?.name}<br/>營收：${formatMoney(params[0]?.value ?? 0)}`
  },
  grid: { left: 16, right: 16, top: 16, bottom: 0, containLabel: true },
  xAxis: {
    type: 'category',
    data: revenueData.map((d) => d.date),
    axisLine: { lineStyle: { color: '#e5e5e5' } },
    axisTick: { show: false },
    axisLabel: {
      color: '#9ca3af',
      fontSize: 11,
      interval: 4
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#9ca3af',
      fontSize: 11,
      formatter: (v: number) => `$${(v / 1000).toFixed(0)}k`
    },
    splitLine: { lineStyle: { color: '#f3f4f6' } }
  },
  series: [
    {
      data: revenueData.map((d) => d.revenue),
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: { color: '#1B4332', width: 2.5 },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(27,67,50,0.18)' },
            { offset: 1, color: 'rgba(27,67,50,0)' }
          ]
        }
      }
    }
  ]
}

// 環形圖：付款狀態
const paymentOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}：{c} 筆 ({d}%)'
  },
  legend: {
    bottom: 0,
    left: 'center',
    textStyle: { color: '#6b7280', fontSize: 12 }
  },
  series: [
    {
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 14, fontWeight: 'bold' }
      },
      data: paymentStatus,
      color: ['#1B4332', '#C1553B']
    }
  ]
}

// 橫條圖：熱銷商品
const topProductsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: '{b}：{c} 件'
  },
  grid: { left: 16, right: 24, top: 8, bottom: 0, containLabel: true },
  xAxis: {
    type: 'value',
    axisLabel: { color: '#9ca3af', fontSize: 11 },
    splitLine: { lineStyle: { color: '#f3f4f6' } }
  },
  yAxis: {
    type: 'category',
    data: topProducts.map((p) => p.name),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#6b7280', fontSize: 12 }
  },
  series: [
    {
      type: 'bar',
      data: topProducts.map((p) => p.qty),
      barMaxWidth: 20,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#2D6A4F' },
            { offset: 1, color: '#52B788' }
          ]
        },
        borderRadius: [0, 4, 4, 0]
      }
    }
  ]
}

// 圓餅圖：分類銷售
const categoryOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}：{d}%'
  },
  legend: {
    bottom: 0,
    left: 'center',
    textStyle: { color: '#6b7280', fontSize: 12 }
  },
  series: [
    {
      type: 'pie',
      radius: ['0%', '65%'],
      center: ['50%', '45%'],
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 13, fontWeight: 'bold' }
      },
      data: categorySales,
      color: ['#1B4332', '#2D6A4F', '#52B788', '#D4A373', '#FAEDCD']
    }
  ]
}
</script>

<template>
  <div class="space-y-5 overflow-y-auto pb-4">
    <!-- KPI Cards -->
    <div class="grid grid-cols-2 gap-4 xl:grid-cols-4">
      <div
        v-for="card in kpiCards"
        :key="card.label"
        class="flex items-center gap-4 rounded-xl bg-white p-5 shadow-xs"
      >
        <div :class="['flex size-11 shrink-0 items-center justify-center rounded-xl', card.bg]">
          <svg
            :class="['size-5', card.color]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              :d="card.icon"
            />
          </svg>
        </div>
        <div class="min-w-0">
          <p class="text-bark-400 text-xs">{{ card.label }}</p>
          <p :class="['truncate text-xl font-bold', card.color]">{{ card.value }}</p>
          <p class="text-bark-400 text-xs">{{ card.sub }}</p>
        </div>
      </div>
    </div>

    <!-- 折線圖 + 環形圖 -->
    <div class="grid gap-4 xl:grid-cols-3">
      <div class="rounded-xl bg-white p-5 shadow-xs xl:col-span-2">
        <p class="text-bark-700 mb-4 text-sm font-semibold">每日營收趨勢</p>
        <VChart :option="revenueOption" autoresize style="height: 240px" />
      </div>
      <div class="rounded-xl bg-white p-5 shadow-xs">
        <p class="text-bark-700 mb-4 text-sm font-semibold">付款狀態分佈</p>
        <VChart :option="paymentOption" autoresize style="height: 240px" />
      </div>
    </div>

    <!-- 橫條圖 + 圓餅圖 -->
    <div class="grid gap-4 xl:grid-cols-2">
      <div class="rounded-xl bg-white p-5 shadow-xs">
        <p class="text-bark-700 mb-4 text-sm font-semibold">熱銷商品 Top 8</p>
        <VChart :option="topProductsOption" autoresize style="height: 280px" />
      </div>
      <div class="rounded-xl bg-white p-5 shadow-xs">
        <p class="text-bark-700 mb-4 text-sm font-semibold">商品分類銷售佔比</p>
        <VChart :option="categoryOption" autoresize style="height: 280px" />
      </div>
    </div>
  </div>
</template>
