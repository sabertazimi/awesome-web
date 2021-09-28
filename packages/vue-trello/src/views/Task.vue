<script setup lang="ts">
import { computed } from 'vue';
import { useAppRouter } from 'src/router';
import { useAppStore } from 'src/store';

const props = defineProps<{ id: string }>();
const router = useAppRouter();
const store = useAppStore();
const task = computed(() => store.getters.getTask(props.id));
const close = () => router.push({ name: 'board' });
</script>

<template>
  <div class="task-view">
    <div class="task-item">
      {{ task.name }}
    </div>
    <textarea
      id="task-description"
      name="task-description"
      class="task-description"
      placeholder="Task description here ..."
      :rows="10"
      :cols="30"
      :value="task.description"
    />
    <button class="btn btn-sm h-8" @click="close">Close Task</button>
  </div>
</template>

<style lang="postcss" scoped>
.task-view {
  @apply relative inset-0 flex flex-col max-w-3xl m-32 mx-auto px-2 py-4 text-left bg-white rounded shadow-2xl;
}

.task-item {
  @apply flex flex-col flex-grow items-start justify-between;
}

.task-description {
  @apply relative my-2 p-2 h-64 border bg-transparent;
  @apply focus:border-green-500 focus:outline-none;
}
</style>
