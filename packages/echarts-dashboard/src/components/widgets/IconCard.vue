<template>
  <div class="card flex flex-col items-center aspect-square">
    <!-- 正方形卡片主体 -->
    <div>
      <slot />
    </div>
    
    <!-- 标签 -->
    <div class="text-white text-[8px] font-medium text-center">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
}

defineProps<Props>()
</script> 
