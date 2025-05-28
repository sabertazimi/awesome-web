<template>
  <div class="w-full h-full p-4 px-8">
    <PanelTitle title="文件流量统计" />
    <div class="grid grid-cols-7 grid-rows-2 gap-4 h-10/12">
      <div class="col-span-3 row-span-1">
        <PieChart />
      </div>
      <div class="col-span-3 row-span-1">
        <PieChart label="类型" />
      </div>
      <div class="col-span-1 row-span-1 card px-4 py-2"><span>分析</span></div>
      <HotRank class="col-span-3 row-span-1" title="资源热度排行" />
      <div class="col-span-4 row-span-1 card pt-4">
        <CurveChart :data="curveData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CurveChart from '@/components/charts/CurveChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import HotRank from '@/components/widgets/HotRank.vue'
import PanelTitle from '@/components/widgets/PanelTitle.vue'
import { ref } from 'vue'

// 模拟折线图数据
const curveData = ref({
  visitData: [140, 280, 250, 150, 250, 350, 210, 310, 390, 350, 300, 230],
  downloadData: [40, 210, 190, 40, 180, 310],
})
</script>
