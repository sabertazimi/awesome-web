<template>
  <div class="w-full h-11/12 card overflow-hidden">
    <!-- 头部区域 -->
    <div class="flex items-center justify-between p-4">
      <!-- 左侧标题 -->
      <h3 class="text-white text-lg font-medium opacity-80">
        {{ title }}
      </h3>
      
      <!-- 右侧操作区域 -->
      <div v-if="action" class="flex items-center gap-2 text-white/90 hover:text-cyan-400 transition-colors cursor-pointer">
        <span class="text-sm font-medium">{{ action }}</span>
        <DoubleArrow class="w-8 h-8 inline-block" />
      </div>
    </div>
    
    <!-- 内容区域 -->
    <div class="px-4 h-[calc(100%-80px)]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import DoubleArrow from './DoubleArrow.vue';

interface Props {
  title: string
  action?: string
}

defineProps<Props>()
</script> 
