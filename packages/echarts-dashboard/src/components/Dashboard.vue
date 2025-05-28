<template>
  <div id="dashboard" class="primary-bg-gradient">
    <!-- 标题 -->
    <Header />

    <!-- 主要内容区域 - 6列3行布局 -->
    <div
      class="grid grid-cols-15 grid-rows-38 gap-6 h-[calc(100vh-100px)] px-6"
    >
      <!-- 第一行 -->
      <!-- 访问信息统计 (左上角，占6列) -->
      <Widget class="col-span-6 row-span-14">
        <VisitInfoPanel :visit-stats="dashboardData.visitStats" />
      </Widget>

      <!-- IP统计 (中上，占9列) -->
      <Widget class="col-span-9 row-span-21">
        <IPStatsPanel
          :ip-stats="dashboardData.ipStats"
          :monitor-list="dashboardData.monitorList"
        />
      </Widget>

      <!-- 第二行 -->
      <!-- 网站负载情况 (左中) -->
      <Widget class="col-span-6 row-span-7">
        <LoadStatsPanel :load-stats="dashboardData.loadStats" />
      </Widget>

      <!-- 第三行 -->
      <!-- 功能使用情况统计 (左下) -->
      <Widget class="col-span-9 row-span-17">
        <FunctionUsagePanel
          :match-data="dashboardData.systemStats"
          :lab-stats="dashboardData.labStats"
          :qa-stats="dashboardData.qaStats"
        />
      </Widget>

      <!-- 文件流量统计 (右下) -->
      <Widget class="col-span-6 row-span-17">
        <FileTrafficPanel
          :file-traffic-stats="dashboardData.fileTrafficStats"
        />
      </Widget>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import FileTrafficPanel from '@/components/panels/FileTrafficPanel.vue'
import FunctionUsagePanel from '@/components/panels/FunctionUsagePanel.vue'
import IPStatsPanel from '@/components/panels/IPStatsPanel.vue'
import LoadStatsPanel from '@/components/panels/LoadStatsPanel.vue'
import VisitInfoPanel from '@/components/panels/VisitInfoPanel.vue'
import Widget from '@/components/Widget.vue'
import useScalePage from '@/hooks/useScalePage'
import { mockDashboardData } from '@/mock/dashboard'
import type { DashboardData } from '@/types/dashboard'
import { ref } from 'vue'

const dashboardData = ref<DashboardData>(mockDashboardData)

useScalePage({
  targetX: 2560,
  targetY: 1440,
  targetRatio: 16 / 9,
})
</script>

<style scoped>
#dashboard {
  display: inline-block;
  width: 2560px;
  height: 1440px;
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
