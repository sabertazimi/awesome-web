<template>
  <div ref="chartRef" class="w-full h-40"></div>
</template>

<script setup lang="ts">
import { init, type ECharts } from 'echarts'
import { onMounted, ref, watch } from 'vue'

interface TrendDataPoint {
  time: string
  value: number
}

interface Props {
  option: any
  data: TrendDataPoint[]
  data2: TrendDataPoint[]
}

const props = defineProps<Props>()

const chartRef = ref<HTMLElement>()
let chart: ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  chart = init(chartRef.value)
  chart.setOption(props.option)
}

const updateChart = () => {
  if (chart) {
    chart.setOption({
      xAxis: {
        data: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
      },
      series: [
        {
          data: props.data.map((item) => item.value),
        },
        {
          data: props.data2.map((item) => item.value),
        },
      ],
    })
  }
}

onMounted(() => {
  initChart()

  window.addEventListener('resize', () => {
    chart?.resize()
  })
})

watch(() => [props.data, props.data2], updateChart, { deep: true })
</script>
