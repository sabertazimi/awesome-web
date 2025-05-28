<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { init, type ECharts } from 'echarts'
import { onMounted, ref, watch } from 'vue'

interface BarChartData {
  browsing: number[]
  duration: number[]
  avgDuration: number[]
  categories: string[]
}

interface Props {
  data: BarChartData
}

const props = defineProps<Props>()

const chartRef = ref<HTMLElement>()
let chart: ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  chart = init(chartRef.value)

  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: props.data.categories,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#ffffff30',
        },
      },
      axisLabel: {
        color: '#ffffff80',
        fontSize: 12,
      },
    },
    yAxis: {
      type: 'value',
      max: 1000,
      interval: 250,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#ffffff80',
        fontSize: 12,
      },
    },
    series: [
      {
        name: '浏览量',
        type: 'bar',
        data: props.data.browsing,
        itemStyle: {
          color: '#00D0FFD9'
        },
        barWidth: 15,
        barGap: '20%',
        label: {
          show: false
        }
      },
      {
        name: '浏览时长',
        type: 'bar',
        data: props.data.duration,
        itemStyle: {
          color: '#008FFFD9'
        },
        barWidth: 15,
        label: {
          show: false
        }
      },
      {
        name: '平均浏览时长',
        type: 'bar',
        data: props.data.avgDuration,
        itemStyle: {
          color: '#5BF1F6'
        },
        barWidth: 15,
        label: {
          show: false
        }
      }
    ],
    legend: {
      data: ['浏览量', '浏览时长', '平均浏览时长'],
      bottom: '5%',
      textStyle: {
        color: 'white',
        fontWeight: 200,
        fontSize: 10
      },
      itemGap: 64,
      itemWidth: 10,
      itemHeight: 10,
      icon: 'rect'
    }
  }

  chart.setOption(option)
}

const updateChart = () => {
  if (chart) {
    initChart()
  }
}

onMounted(() => {
  initChart()

  // 响应式处理
  window.addEventListener('resize', () => {
    chart?.resize()
  })
})

watch(() => props.data, updateChart, { deep: true })
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
