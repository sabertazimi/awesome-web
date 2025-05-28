<template>
  <div class="col-span-1 row-span-2 card p-4 flex flex-col">
    <div class="flex items-center justify-between mb-2">
      <h4 class="text-white text-sm font-medium mb-3 opacity-90">
        {{ props.title }}
      </h4>
      <div
        class="flex items-center justify-between mb-2 rank-container px-2 relative"
      >
        <span class="text-white/60 text-xs">月榜</span>
        <DoubleArrow class="w-8 h-8 inline-block rotate-90 -translate-y-1/6" />
      </div>
    </div>
    <div ref="chartRef" class="w-full h-32"></div>
  </div>
</template>

<script setup lang="ts">
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import type { ECharts } from 'echarts/core'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, onUnmounted, ref } from 'vue'
import DoubleArrow from './DoubleArrow.vue'

// 注册 ECharts 组件
echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: '热度排行',
  },
)

const chartRef = ref<HTMLElement>()
let chartInstance: ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance) return

  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#00d4ff',
      textStyle: { color: '#fff', fontSize: 10 },
    },
    xAxis: {
      type: 'category',
      data: [0, 1, 2],
      axisLine: {
        lineStyle: { color: '#d3d3d3', width: 1 },
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: [100, 200, 300],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: '#00308F' },
            { offset: 1, color: '#09C9C5' },
          ]),
        },
        barWidth: "40%",
      },
    ],
  }

  chartInstance.setOption(option)
}

const resizeChart = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance?.dispose()
})
</script>

<style scoped>
.rank-container {
  background: linear-gradient(
    90deg,
    rgba(64, 158, 255, 0.2) 2.33%,
    rgba(64, 158, 255, 0.0862918) 42.83%,
    rgba(64, 158, 255, 2e-5) 100%
  );
  border-radius: 15px 15px 0px 0px;
}

.rank-container::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    #409eff 2.33%,
    rgba(64, 158, 255, 0.431459) 42.83%,
    rgba(64, 158, 255, 0.0001) 100%
  );
}
</style>
