<template>
  <div class="w-full h-full relative">
    <PanelTitle title="IP统计" />
    <div class="grid grid-cols-2">
      <MapChart :data="chartData" :show-title="false" title="全国IP访问分布" />
      <div class="flex flex-col gap-4 pr-6">
        <h3 class="text-white text-lg font-medium mb-2">IP监测</h3>
        <div class="flex flex-col gap-4 card p-6">
          <MonitorTable title="访问列表" :monitor-list="props.monitorList" />
          <MonitorTable title="重点监测" :monitor-list="props.monitorList" />
        </div>
      </div>
    </div>
    <div
      class="absolute left-12 bottom-24 w-auto h-8 flex flex-row items-center justify-center p-4 ip-container"
    >
      <span>IP管理</span>
      <DoubleArrow class="w-8 h-8 inline-block" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MapChart from '@/components/charts/MapChart.vue'
import MonitorTable from '@/components/widgets/MonitorTable.vue'
import PanelTitle from '@/components/widgets/PanelTitle.vue'
import type { IPStats, Monitor } from '@/types/dashboard'
import { computed } from 'vue'
import DoubleArrow from '../widgets/DoubleArrow.vue'

interface Props {
  ipStats: IPStats[]
  monitorList: Monitor[]
}

const props = defineProps<Props>()

// 将IPStats数据转换为MapChart需要的格式
const chartData = computed(() => {
  return props.ipStats.map((item) => ({
    name: item.province,
    coordinates: item.coordinates,
    value: item.value,
  }))
})
</script>

<style scoped>
.ip-container {
  background: linear-gradient(
    89.8deg,
    rgba(132, 181, 255, 0.8) 0.24%,
    rgba(0, 12, 44, 0.0001) 99.89%,
    rgba(132, 181, 255, 0.9) 99.9%
  );
  border: 0.1px solid #0066ff;
  border-radius: 10px;
}
</style>
