<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import type { ECharts } from 'echarts/core'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, onUnmounted, ref, watch } from 'vue'

// 注册必要的组件
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer
])

interface Props {
  data?: {
    downloadData: number[]
    visitData: number[]
  }
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    visitData: [80, 120, 200, 180, 220, 300, 180, 350, 280, 150, 200, 250],
    downloadData: [120, 180, 150, 280, 320, 250, 380, 200, 150, 300, 280, 350]
  }),
  height: '100%'
})

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
      left: '8%',
      right: '4%',
      bottom: '15%',
      top: '25%',
      containLabel: true
    },
    legend: {
      data: ['总访问量', '总下载量'],
      textStyle: { 
        color: '#fff',
        fontSize: 12
      },
      top: '2%',
      right: '5%',
      itemWidth: 14,
      itemHeight: 14
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: { 
        lineStyle: { 
          color: '#D3D3D3',
          width: 1
        } 
      },
      axisLabel: { 
        color: '#656363',
        fontSize: 10
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: 'k次',
      nameLocation: 'end',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 12,
        align: 'right',
        padding: [0, 10, 0, 0]
      },
      min: 0,
      max: 400,
      interval: 100,
      axisLine: { 
        show: true,
        lineStyle: { 
          color: '#D3D3D3',
          width: 1
        } 
      },
      axisLabel: { 
        color: '#5A6578',
        fontSize: 12,
        formatter: '{value}',
        margin: 10,
        offset: -3
      },
      splitLine: { 
        lineStyle: { 
          color: '#2D568C',
          width: 1,
          type: 'solid'
        } 
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '总访问量',
        type: 'line',
        data: props.data.visitData,
        smooth: false,
        lineStyle: {
          color: '#FFA06C',
          width: 2.5
        },
        itemStyle: {
          color: '#011732',
          borderColor: '#FFA06C',
          borderWidth: 2.5
        },
        symbol: 'circle',
        symbolSize: 8,
        showSymbol: true,
        emphasis: {
          itemStyle: {
            color: 'rgba(255, 160, 108, 0.3)',
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: '#FFA06C'
          }
        }
      },
      {
        name: '总下载量',
        type: 'line',
        data: props.data.downloadData,
        smooth: false,
        lineStyle: {
          color: '#66FFFF',
          width: 2.5
        },
        itemStyle: {
          color: '#011732',
          borderColor: '#66FFFF',
          borderWidth: 2.5
        },
        symbol: 'circle',
        symbolSize: 8,
        showSymbol: true,
        emphasis: {
          itemStyle: {
            color: 'rgba(102, 255, 255, 0.3)',
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: '#66FFFF'
          }
        }
      }
    ]
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

watch(() => props.data, updateChart, { deep: true })
</script>

<style scoped>
/* 确保图表容器有正确的尺寸 */
</style>
