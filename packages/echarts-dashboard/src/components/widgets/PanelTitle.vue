<template>
  <div class="mt-4 ml-4 flex items-center gap-4">
    <PolygonArrow />
    <h3 class="text-white text-lg font-bold tracking-wide">{{ props.title }}</h3>
  </div>
</template>

<script setup lang="ts">
import PolygonArrow from '@/components/widgets/PolygonArrow.vue';

const props = defineProps<{
  title: string
}>()
</script>
