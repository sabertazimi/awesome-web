<script setup lang="ts">
import { computed } from 'vue';
import { useAppRouter } from 'src/router';
import { useAppStore } from 'src/store';

const props = defineProps<{ id: string }>();
const router = useAppRouter();
const store = useAppStore();
const task = computed(() => store.getters.getTask(props.id));
const closeTask = () => router.push({ name: 'board' });
</script>

<template>
  <div class="task-view">
    <div class="task-item">
      {{ task.name }}
    </div>
    <button class="btn btn-sm mr-1" @click="closeTask">Close Task</button>
  </div>
</template>

<style lang="postcss" scoped>
.task-view {
  @apply relative inset-0 flex flex-row max-w-3xl m-32 mx-auto py-4 text-left bg-white rounded shadow-2xl;
}

.task-item {
  @apply flex flex-col flex-grow items-start justify-center px-4;
}
</style>
