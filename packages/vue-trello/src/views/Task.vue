<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from 'src/store';

const props = defineProps<{ id: string }>();
const store = useAppStore();
const task = computed(() => store.getters.getTask(props.id));
</script>

<template>
  <div class="task-view">
    <router-link :to="{ name: 'board' }">
      <button class="btn">Back home</button>
    </router-link>
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      {{ task.name }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.task-view {
  @apply relative inset-0 flex flex-row max-w-3xl m-32 mx-auto py-4 text-left bg-white rounded shadow-2xl;
}
</style>
