<template>
  <PanelCard title="虚拟实验室" action="管理">
    <div class="w-full h-full grid grid-cols-6 grid-rows-3 gap-4">
      <StatsCard class="col-span-2 row-span-2" size="small" />
      <div ref="chartRef" class="w-[27rem] h-32 cloud-container"></div>
    </div>
  </PanelCard>
</template>

<script setup lang="ts">
import { init, type ECharts } from 'echarts'
import 'echarts-wordcloud'
import { onMounted, ref, watch } from 'vue'

import PanelCard from '@/components/widgets/PanelCard.vue'
import StatsCard from '@/components/widgets/StatsCard.vue'
import type { QAStats } from '@/types/dashboard'

interface Props {
  qaStats: QAStats
}

const props = defineProps<Props>()

const chartRef = ref<HTMLElement>()
let chart: ECharts | null = null

const colors = [
  '#00ffff',
  '#ff6b6b',
  '#51cf66',
  '#339af0',
  '#f06292',
  '#ffb74d',
  '#ba68c8',
  '#4fc3f7',
]

const initChart = () => {
  if (!chartRef.value) return

  chart = init(chartRef.value)

  const option = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'wordCloud',
        sizeRange: [12, 40],
        rotationRange: [0, 90],
        rotationStep: 90,
        gridSize: 1,
        shape: 'diamond',
        width: '100%',
        height: '100%',
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
        },
        emphasis: {
          textStyle: {
            textShadowBlur: 10,
            textShadowColor: '#ffffff',
          },
        },
        data: props.qaStats.keywords.map((item) => ({
          name: item.name,
          value: item.value,
          textStyle: {
            color: colors[Math.floor(Math.random() * colors.length)],
          },
        })),
      },
    ],
    tooltip: {
      show: true,
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00ffff',
      borderWidth: 1,
      textStyle: {
        color: '#ffffff',
      },
      formatter: (params: any) => {
        return `${params.name}: ${params.value}`
      },
    },
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

  window.addEventListener('resize', () => {
    chart?.resize()
  })
})

watch(() => props.qaStats, updateChart, { deep: true })
</script>

<style scoped>
.cloud-container {
  background: hsla(235, 25%, 81%, 0.3);
  opacity: 0.6;
  border: 2px solid #08488a;
  border-radius: 8px;
}
</style>
