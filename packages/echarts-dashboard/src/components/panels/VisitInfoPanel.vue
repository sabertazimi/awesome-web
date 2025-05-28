<template>
  <div class="w-full h-full grid grid-rows-7">
    <div class="relative row-span-1">
      <!-- 标题区域 -->
      <PanelTitle title="访问信息统计" />

      <!-- 右上角统计块 -->
      <div class="absolute top-4 right-8 flex gap-6">
        <!-- 模块浏览统计 -->
        <div class="w-25 h-20 flex flex-col items-center justify-center box">
          <div class="text-white text-base font-light mb-1">
            {{ formatNumber(props.visitStats.visits) }}
          </div>
          <div class="text-white text-[10px] font-light text-center">
            模块浏览统计
          </div>
        </div>

        <!-- 实时浏览量 -->
        <div class="w-25 h-20 flex flex-col items-center justify-center box">
          <div class="text-white text-base font-light mb-1">
            {{ props.visitStats.duration }}
          </div>
          <div class="text-white text-[10px] font-light text-center">
            实时浏览量
          </div>
        </div>
      </div>
    </div>

    <div class="h-80">
      <BarChart :data="chartData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BarChart from '@/components/charts/BarChart.vue'
import PanelTitle from '@/components/widgets/PanelTitle.vue'
import type { VisitStats } from '@/types/dashboard'
import { computed } from 'vue'

interface Props {
  visitStats: VisitStats
}

const props = defineProps<Props>()

// 格式化数字显示
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toLocaleString()
}

// 将VisitStats数据转换为BarChart需要的格式
const chartData = computed(() => {
  // 模拟 5 天的数据，实际应该从visitStats中获取
  return {
    browsing: [260, 10, 500, 320, 650], // 浏览量数据
    duration: [490, 470, 300, 600, 270], // 浏览时长数据
    avgDuration: [770, 810, 830, 750, 480], // 平均浏览时长数据
    categories: [
      '2022.01.01',
      '2022.01.02',
      '2022.01.03',
      '2022.01.04',
      '2022.01.05',
    ],
  }
})
</script>

<style scoped>
.box {
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(132, 181, 255, 0.8) 0%,
    rgba(0, 10, 37, 0.0001) 49.98%,
    rgba(132, 181, 255, 0.9) 100%
  );
  border: 0.5px solid #0066ff;
  border-radius: 2.37px;
}
</style>
