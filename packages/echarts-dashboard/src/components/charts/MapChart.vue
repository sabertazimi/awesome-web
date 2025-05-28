<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { init, registerMap, type ECharts } from 'echarts'
import { onMounted, ref, watch } from 'vue'

interface MapDataPoint {
  name: string
  coordinates: [number, number]
  value: number
}

interface Props {
  data: MapDataPoint[]
  showTitle?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: false,
  title: '全国IP访问分布',
})

const chartRef = ref<HTMLElement>()
let chart: ECharts | null = null

const initChart = async () => {
  if (!chartRef.value) return

  try {
    // 动态导入地图数据
    const response = await fetch(`${import.meta.env.BASE_URL}china_map.json`)
    const chinaMapData = await response.json()

    // 注册地图
    registerMap('china', chinaMapData)

    chart = init(chartRef.value)

    // 处理IP访问散点数据
    const scatterData = props.data.map((item) => ({
      name: item.name,
      value: [...item.coordinates, item.value],
      symbolSize: Math.sqrt(item.value / 100) + 15,
      itemStyle: {
        color: '#66ffff',
      },
    }))

    const option = {
      backgroundColor: 'transparent',
      ...(props.showTitle && {
        title: {
          text: props.title,
          left: 'center',
          top: 15,
          textStyle: {
            color: '#ffffff',
            fontSize: 15,
            fontWeight: 'bold',
          },
        },
      }),
      geo: [
        // 重影层 - 位于左下侧
        {
          map: 'china',
          roam: false,
          zoom: 1.2,
          center: [105, 36],
          itemStyle: {
            areaColor: '#324abc',
            borderColor: 'transparent',
            shadowBlur: 10, // 添加模糊效果
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOffsetX: -3,
            shadowOffsetY: 3,
          },
          emphasis: {
            itemStyle: {
              areaColor: 'rgba(30, 64, 175, 0.1)',
            },
          },
          regions: [],
          silent: true, // 重影层不响应交互
          z: 1, // 层级较低
        },
        // 主地图层
        {
          map: 'china',
          roam: false,
          zoom: 1.2,
          center: [104, 35],
          itemStyle: {
            areaColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#93caf1', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#0e5fff', // 100% 处的颜色
                },
              ],
            },
            borderColor: 'rgba(255,255,255,0.8)',
            borderWidth: 2,
          },
          emphasis: {
            itemStyle: {
              areaColor: '#1e40af30',
            },
          },
          regions: [],
          z: 2, // 层级较高
        },
      ],
      series: [
        // 地图背景
        {
          type: 'map',
          map: 'china',
          geoIndex: 1, // 关联到主地图层（第二个 geo 配置）
          data: [],
          itemStyle: {
            areaColor: 'transparent',
          },
        },
        // IP访问散点
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          geoIndex: 1, // 关联到主地图层（第二个 geo 配置）
          data: scatterData,
          symbolSize: (val: number[]) => Math.sqrt(val[2] / 100) + 15,
          label: {
            show: true,
            formatter: (params: any) => `${params.name}\n${params.value[2]}`,
            position: 'top',
            color: '#ffffff',
            fontSize: 10,
            fontWeight: 'bold',
            backgroundColor: {
              image: `${import.meta.env.BASE_URL}box.svg`,
            },
            padding: [10, 10],
            width: 40,
            height: 17,
          },
          emphasis: {
            scale: 1.3,
            itemStyle: {
              shadowBlur: 35,
              shadowColor: '#00ffff',
            },
          },
        },
      ],
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 20, 40, 0.95)',
        borderColor: '#00ffff',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff',
          fontSize: 12,
        },
        formatter: (params: any) => {
          if (params.seriesType === 'scatter') {
            return `
              <div style="padding: 5px;">
                <div style="font-weight: bold; margin-bottom: 5px;">${params.name}</div>
                <div>访问量: <span style="color: #00ffff">${params.value[2]}</span></div>
              </div>
            `
          }
          return ''
        },
      },
    }

    chart.setOption(option)
  } catch (error) {
    console.error('Failed to load map data:', error)
  }
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

watch(() => props.data, updateChart, { deep: true })
</script>
