<script setup lang="ts">
import type { VNode } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

interface ButtonProps {
  type?: 'primary' | 'left' | 'right'
  block?: boolean
  onClick?: (payload: MouseEvent) => void
}

const props = defineProps<ButtonProps>()
defineSlots<{
  default: () => VNode | VNode[] | string
}>()
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
