<script setup lang="ts">
defineProps<{ id: string }>();
</script>

<template>
  <div class="text-white">Task View {{ id }}</div>
</template>

<style lang="postcss" scoped>
.task-view {
  @apply relative inset-0 flex flex-row max-w-3xl m-32 mx-auto py-4 text-left rounded shadow-xl;
}
</style>
