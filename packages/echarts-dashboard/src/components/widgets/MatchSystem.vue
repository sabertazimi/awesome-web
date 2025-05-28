<template>
  <PanelCard title="竞赛系统" action="管理">
    <div class="h-full grid grid-cols-2 grid-rows-3 gap-4">
      <!-- 项目列表区域 -->
      <div class="col-span-1 row-span-3 space-y-2 overflow-hidden">
        <div
          v-for="project in props.matchData.projects"
          :key="project.id"
          class="p-3 match-container"
        >
          <div class="flex gap-3">
            <!-- 项目图片 -->
            <div
              class="w-12 h-10 bg-gray-600 rounded flex-shrink-0 overflow-hidden"
            >
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- 项目信息 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between mb-1">
                <h5 class="text-white text-xs font-medium truncate">
                  {{ project.title }}
                </h5>
                <span class="text-white/80 text-xs ml-2 flex-shrink-0">{{
                  project.organization
                }}</span>
              </div>

              <p
                class="text-white/60 text-[8px] leading-relaxed mb-1 line-clamp-2"
              >
                {{ project.description }}
              </p>

              <div class="text-[#FFFF62] text-[10px] text-right">
                截止时间：{{ project.deadline }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsCard />
      <HotRank />
    </div>
  </PanelCard>
</template>

<script setup lang="ts">
import type { MatchSystemData } from '@/types/dashboard'
import HotRank from './HotRank.vue'
import PanelCard from './PanelCard.vue'
import StatsCard from './StatsCard.vue'

interface Props {
  matchData: MatchSystemData
}

const props = defineProps<Props>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.match-container {
  background: linear-gradient(
    90deg,
    rgba(64, 158, 255, 0.6) 2.33%,
    rgba(64, 158, 255, 0.258875) 42.83%,
    rgba(64, 158, 255, 6e-5) 100%
  );
  border: 1px solid rgba(40, 236, 255, 0.6);
  border-radius: 2.5px;
}
</style>
