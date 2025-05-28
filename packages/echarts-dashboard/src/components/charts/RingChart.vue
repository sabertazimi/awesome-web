<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { init, type ECharts } from 'echarts'
import { onMounted, ref, watch } from 'vue'

interface Props {
  value: number
  color: string
  label?: string
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLabel: true,
})

const chartRef = ref<HTMLElement>()
let chart: ECharts | null = null

const createRingOption = () => ({
  backgroundColor: 'transparent',
  series: [
    // 第一层：最里面的圆（背景色为 props.color）
    {
      type: 'pie',
      radius: ['0', '65%'],
      center: ['50%', '50%'],
      data: [
        {
          value: 100,
          itemStyle: {
            color: props.color,
            shadowBlur: 10,
            shadowColor: props.color + '40',
          },
        },
      ],
      label: {
        show: props.showLabel,
        position: 'center',
        formatter: () => `{a|${props.label}}\n{b|${props.value}%}`,
        rich: {
          a: {
            fontSize: 16,
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 16,
          },
          b: {
            fontSize: 20,
            fontWeight: 200,
            color: '#ffffff',
            opacity: 0.8,
            lineHeight: 20,
          },
        },
      },
      labelLine: {
        show: false,
      },
      emphasis: {
        disabled: true,
      },
      silent: true,
    },
    // 第二层：黑色同心圆
    {
      type: 'pie',
      radius: ['65%', '80%'],
      center: ['50%', '50%'],
      data: [
        {
          value: 100,
          itemStyle: {
            color: 'black',
          },
        },
      ],
      label: {
        show: false,
      },
      emphasis: {
        disabled: true,
      },
      silent: true,
    },
    // 第三层：props.color 的扇形圆（角度取决于 props.value）
    {
      type: 'pie',
      radius: ['80%', '90%'],
      center: ['50%', '50%'],
      startAngle: 90,
      data: [
        {
          value: props.value,
          itemStyle: {
            color: props.color,
            shadowBlur: 15,
            shadowColor: props.color + '60',
          },
        },
        {
          value: 100 - props.value,
          itemStyle: {
            color: 'black',
          },
        },
      ],
      label: {
        show: false,
      },
      emphasis: {
        disabled: false,
      },
      silent: false,
    },
    // 第四层：透明同心圆
    {
      type: 'pie',
      radius: ['90%', '95%'],
      center: ['50%', '50%'],
      data: [
        {
          value: 100,
          itemStyle: {
            color: 'transparent',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
          },
        },
      ],
      label: {
        show: false,
      },
      emphasis: {
        disabled: true,
      },
      silent: true,
    },
    // 第五层：最外层点圈（虚线圆圈）
    {
      type: 'pie',
      radius: ['95%', '96%'],
      center: ['50%', '50%'],
      data: [
        {
          value: 100,
          itemStyle: {
            color: 'transparent',
            borderColor: props.color,
            borderWidth: 1,
            borderType: [1, 1], // 虚线效果
          },
        },
      ],
      label: {
        show: false,
      },
      emphasis: {
        disabled: true,
      },
      silent: true,
      animation: true,
      animationType: 'scale',
      animationDuration: 1000,
    },
  ],
})

const initChart = () => {
  if (!chartRef.value) return

  chart = init(chartRef.value)
  chart.setOption(createRingOption())
}

const updateChart = () => {
  if (chart) {
    chart.setOption(createRingOption())
  }
}

onMounted(() => {
  initChart()

  window.addEventListener('resize', () => {
    chart?.resize()
  })
})

watch([() => props.value, () => props.color, () => props.label], updateChart)
</script>
