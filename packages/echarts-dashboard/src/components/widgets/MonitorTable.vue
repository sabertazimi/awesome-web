<template>
  <div class="w-full h-full">
    <div>
      <h3 class="text-white text-base font-medium">{{ props.title }}</h3>
    </div>
    <div class="rounded-none overflow-hidden">
      <div class="odd">
        <div class="grid grid-cols-3 gap-4 px-4 py-2 text-white text-[10px] h-6 overflow-hidden">
          <span>最新人员监控</span>
          <span>人员类型</span>
          <span>时间</span>
        </div>
      </div>
      <div class="max-h-64 overflow-hidden">
        <div
          v-for="(item, index) in props.monitorList"
          :key="item.id"
          :class="index % 2 === 0 ? 'even' : 'odd'"
          class="grid grid-cols-3 gap-4 px-4 py-2 text-white text-[10px] h-6 overflow-hidden"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <span>{{ item.id }}</span>
          <span>{{ item.userType }}</span>
          <span>{{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Monitor } from '@/types/dashboard';

interface Props {
  title: string
  monitorList: Monitor[]
}

const props = defineProps<Props>()
</script>

<style scoped>
.even {
  background: rgba(3, 157, 206, 0.1);
  mix-blend-mode: normal;
}

.odd {
  background: rgba(3, 157, 206, 0.3);
  mix-blend-mode: normal;
}
</style>
