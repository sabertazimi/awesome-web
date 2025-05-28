<template>
  <div class="relative w-full h-full">
    <div ref="chartRef" class="w-full h-full"></div>

    <!-- 装饰小圆 - 使用绝对定位 -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- 左侧小圆 -->
      <div
        class="absolute w-2 h-2 rounded-full"
        style="
          left: 37.5%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(0deg, #00d1c8 0%, #017c86 100%);
        "
      ></div>

      <!-- 上侧小圆 -->
      <div
        class="absolute w-2 h-2 rounded-full"
        style="
          left: 50%;
          top: 27.5%;
          transform: translate(-50%, -50%);
          background: linear-gradient(0deg, #024154 0%, #017c86 100%);
        "
      ></div>

      <!-- 下侧小圆 -->
      <div
        class="absolute w-3 h-3 rounded-full"
        style="
          left: 54%;
          top: 76%;
          transform: translate(-50%, -50%);
          background: linear-gradient(90deg, #3699fe 0%, #4ec8ea 81.79%);
        "
      ></div>

      <!-- 右下侧小圆 -->
      <div
        class="absolute w-1.5 h-1.5 rounded-full"
        style="
          left: 63.5%;
          top: 64%;
          transform: translate(-50%, -50%);
          background: linear-gradient(0deg, #07ba74 12.36%, #fedb65 100%);
        "
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { init, type ECharts } from 'echarts';
import { onMounted, onUnmounted, ref, watch } from 'vue';

interface Props {
  label?: string
  data?: Array<{ name: string; value: number; color: string }>
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '专栏',
  showLabel: true,
  data: () => [
    { name: '数据1', value: 8, color: '#7D5AFB' },
    { name: '数据2', value: 16, color: '#F9DA4F' },
    { name: '数据3', value: 43, color: '#23BE72' },
    { name: '数据4', value: 43, color: '#00D1C8' },
  ],
})

const chartRef = ref<HTMLElement>()
let chart: ECharts | null = null

const createPieOption = () => {
  // 创建16等分的数据
  const segmentData = Array.from({ length: 32 }, (_, i) => ({
    value: i % 2 === 0 ? Math.floor(100 / 16) : 0.1,
    itemStyle: {
      color: i % 2 === 0 ? 'rgba(0, 224, 219, 0.22)' : 'transparent',
    },
  }))

  return {
    backgroundColor: 'transparent',
    legend: {
      orient: 'vertical',
      right: '5%',
      top: '0%',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 12,
      itemStyle: {
        borderColor: 'transparent',
      },
      textStyle: {
        color: 'transparent',
      },
      icon: 'circle',
      data: ['数据2', '数据4', '数据3', '数据1'],
    },
    series: [
      // 第1层：最内部黑色圆 + 中心文字
      {
        type: 'pie',
        radius: ['0%', '45%'],
        center: ['50%', '50%'],
        data: [
          {
            value: 100,
            itemStyle: { color: '#131415' },
          },
        ],
        label: {
          show: props.showLabel,
          position: 'center',
          formatter: () => `{a|${props.label}}\n{b|占比饼图}`,
          rich: {
            a: {
              fontSize: 16,
              fontWeight: 700,
              color: '#66FFFF',
              lineHeight: 20,
            },
            b: {
              fontSize: 9,
              fontWeight: 400,
              color: '#FFFFFF',
              opacity: 0.8,
              lineHeight: 12,
            },
          },
        },
        labelLine: { show: false },
        emphasis: { disabled: true },
        silent: true,
      },
      /* 椭圆形 */

      // 第2层：#00E0DB 透明22% 同心圆 + 装饰小圆（左侧和上侧）
      {
        type: 'pie',
        radius: ['45%', '47%'],
        center: ['50%', '50%'],
        data: [
          {
            value: 100,
            itemStyle: {
              color: 'rgba(0, 224, 219, 0.22)',
            },
          },
        ],
        label: { show: false },
        emphasis: { disabled: true },
        silent: true,
      },
      // 第3层：黑色同心圆
      {
        type: 'pie',
        radius: ['47%', '55%'],
        center: ['50%', '50%'],
        data: [
          {
            value: 100,
            itemStyle: { color: '#131415' },
          },
        ],
        label: { show: false },
        emphasis: { disabled: true },
        silent: true,
      },

      // 第4层：#00E0DB 透明22% 同心圆 + 装饰小圆（下侧和右下侧）
      {
        type: 'pie',
        radius: ['55%', '57%'],
        center: ['50%', '50%'],
        data: [
          {
            value: 100,
            itemStyle: {
              color: 'rgba(0, 224, 219, 0.22)',
            },
          },
        ],
        label: { show: false },
        emphasis: { disabled: true },
        silent: true,
      },

      // 第5层：黑色同心圆
      {
        type: 'pie',
        radius: ['57%', '65%'],
        center: ['50%', '50%'],
        data: [
          {
            value: 100,
            itemStyle: { color: '#131415' },
          },
        ],
        label: { show: false },
        emphasis: { disabled: true },
        silent: true,
      },

      // 第6层：四色数据扇形
      {
        type: 'pie',
        radius: ['65%', '80%'],
        center: ['50%', '50%'],
        startAngle: 90,
        data: props.data.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.color,
            borderColor: '#131415',
            borderWidth: 1,
            shadowBlur: 8,
            shadowColor: item.color + '40',
          },
        })),
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },

      // 第7层：透明同心圆
      {
        type: 'pie',
        radius: ['80%', '85%'],
        center: ['50%', '50%'],
        data: [
          {
            value: 100,
            itemStyle: { color: 'transparent' },
          },
        ],
        label: { show: false },
        emphasis: { disabled: true },
        silent: true,
      },

      // 第8层：#00E0DB 透明22% 同心圆
      {
        type: 'pie',
        radius: ['85%', '86%'],
        center: ['50%', '50%'],
        data: [
          {
            value: 100,
            itemStyle: {
              color: 'rgba(0, 224, 219, 0.22)',
            },
          },
        ],
        label: { show: false },
        emphasis: { disabled: true },
        silent: true,
      },

      // 第9层：透明同心圆
      {
        type: 'pie',
        radius: ['86%', '87%'],
        center: ['50%', '50%'],
        data: [
          {
            value: 100,
            itemStyle: { color: 'transparent' },
          },
        ],
        label: { show: false },
        emphasis: { disabled: true },
        silent: true,
      },

      // 第10层：16等分的外圈
      {
        type: 'pie',
        radius: ['87%', '92%'],
        center: ['50%', '50%'],
        startAngle: 90,
        data: segmentData,
        label: { show: false },
        emphasis: { disabled: true },
        silent: true,
      },
    ],
  }
}

const initChart = () => {
  if (!chartRef.value) return

  chart = init(chartRef.value)
  chart.setOption(createPieOption())
}

const updateChart = () => {
  if (chart) {
    chart.setOption(createPieOption())
  }
}

const resizeChart = () => {
  chart?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  chart?.dispose()
})

watch([() => props.data, () => props.label], updateChart, { deep: true })
</script>
