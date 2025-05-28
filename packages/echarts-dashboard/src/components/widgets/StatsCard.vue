<template>
  <div class="card p-4 flex flex-col justify-center">
    <div
      class="text-white leading-relaxed"
      :class="props.size === 'small' ? 'text-xs' : 'text-sm'"
    >
      <div>总访问量：296.6w</div>
      <div>总提交量：232968</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})
</script>
