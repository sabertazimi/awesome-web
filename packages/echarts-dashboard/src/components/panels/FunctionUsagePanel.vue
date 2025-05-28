<template>
  <div class="w-full h-full">
    <PanelTitle title="功能使用情况统计" />
    <div class="grid grid-cols-2 grid-rows-13 h-11/12 py-4 px-8 gap-x-8 gap-y-4">
      <!-- 功能匹配系统 -->
      <MatchSystem class="col-span-1 row-span-13" :match-data="matchData" />

      <!-- 虚拟实验室 -->
      <VirtualLab class="col-span-1 row-span-6" :lab-stats="labStats" />

      <!-- 智能问答词云 -->
      <WordCloud class="col-span-1 row-span-7" :qa-stats="qaStats" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LabStats, MatchSystemData, QAStats } from '@/types/dashboard'
import WordCloud from '../charts/WordCloud.vue'
import MatchSystem from '../widgets/MatchSystem.vue'
import PanelTitle from '../widgets/PanelTitle.vue'
import VirtualLab from '../widgets/VirtualLab.vue'

interface Props {
  matchData: MatchSystemData
  labStats: LabStats
  qaStats: QAStats
}

defineProps<Props>()
</script>
