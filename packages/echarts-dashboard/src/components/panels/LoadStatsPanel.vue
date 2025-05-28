<template>
  <div class="w-full h-full relative">
    <PanelTitle title="网站负载情况" />
    <div class="grid grid-cols-2 gap-4 h-64">
      <div class="flex flex-row items-center h-32">
        <RingChart
          :value="props.loadStats.memory"
          color="#38C5C5"
          label="内存负载"
        />
        <RingChart
          :value="props.loadStats.network"
          color="#0DBE7C"
          label="网络负载"
        />
        <RingChart
          :value="props.loadStats.storage"
          color="#2497C2"
          label="存储负载"
        />
      </div>
      <LineChart :option="option" :data="lineData" :data2="lineData2" />
      <div
        class="absolute top-0 right-0 flex justify-between items-center mb-4"
      >
        <span class="text-white text-sm opacity-60 mr-64">服务器编号 SA001</span>
        <div>
          <span class="text-white text-sm opacity-75 inline-block"
            >链接测试</span
          >
          <DoubleArrow class="w-8 h-8 inline-block" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LineChart from '@/components/charts/LineChart.vue'
import RingChart from '@/components/charts/RingChart.vue'
import DoubleArrow from '@/components/widgets/DoubleArrow.vue'
import PanelTitle from '@/components/widgets/PanelTitle.vue'
import type { LoadStats } from '@/types/dashboard'

interface Props {
  loadStats: LoadStats
}

interface TrendDataPoint {
  time: string
  value: number
}

const props = defineProps<Props>()

const lineData: TrendDataPoint[] = [
  { time: '0:00', value: 50 },
  { time: '2:45', value: 130 },
  { time: '5:45', value: 42 },
  { time: '8:00', value: 130 },
  { time: '11:45', value: 16 },
  { time: '14:45', value: 120 },
  { time: '17:00', value: 48 },
  { time: '20:45', value: 101 },
  { time: '23:45', value: 80 },
]

const lineData2: TrendDataPoint[] = [
  { time: '0:00', value: 67 },
  { time: '2:45', value: 120 },
  { time: '5:45', value: 80 },
  { time: '8:45', value: 42 },
  { time: '11:45', value: 102 },
  { time: '14:45', value: 48 },
  { time: '17:45', value: 101 },
  { time: '20:00', value: 40 },
  { time: '23:45', value: 103 },
]

const option = {
  backgroundColor: 'transparent',
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category' as const,
    data: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
    axisLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.45)',
      },
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 0.45)',
      fontSize: 12,
    },
    axisTick: {
      show: true,
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: 'value' as const,
    min: 0,
    max: 140,
    interval: 20,
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      data: lineData.map((item) => item.value),
      type: 'line' as const,
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#06FAC3',
        width: 3,
      },
      markLine: {
        silent: true,
        symbol: 'none',
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          width: 1,
          type: 'solid'
        },
        label: {
          show: false,
        },
        data: [
          { yAxis: 20 },
          { yAxis: 40 },
          { yAxis: 60 },
          { yAxis: 80 },
          { yAxis: 100 },
          { yAxis: 120 }
        ]
      }
    },
    {
      data: lineData2.map((item) => item.value),
      type: 'line' as const,
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#0077FF',
        width: 3,
      },
    },
  ],
  tooltip: {
    trigger: 'axis' as const,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: '#06FAC3',
    borderWidth: 1,
    textStyle: {
      color: '#ffffff',
    },
  },
}
</script>
