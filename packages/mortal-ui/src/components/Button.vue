<script setup lang="ts">
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const props = defineProps<{ type?: 'primary' | 'left' | 'right', block?: boolean, onClick?: (payload: MouseEvent) => void }>()
</script>

<template>
  <ElButton v-if="props.type === 'left'" type="primary" size="large" :icon="ArrowLeft" :class="{ block }" @click="props.onClick">
    <slot />
  </ElButton>
  <ElButton v-else-if="props.type === 'right'" type="primary" size="large" :class="{ block }" @click="props.onClick">
    <slot /><el-icon class="el-icon--right">
      <ArrowRight />
    </el-icon>
  </ElButton>
  <ElButton v-else type="primary" size="large" :class="{ block }" @click="props.onClick">
    <slot />
  </ElButton>
</template>

<style>
.el-button + .el-button {
  margin-left: 0;
}
</style>

<style scoped>
.block {
  display: block;
  width: 50%;
  margin-inline: auto;
}
</style>
