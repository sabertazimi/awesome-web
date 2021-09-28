<script setup lang="ts">
import { computed } from 'vue';
import { useAppRoute, useAppRouter } from 'src/router';
import { useAppStore } from 'src/store';
import type { TaskType } from 'src/services';

const route = useAppRoute();
const router = useAppRouter();
const store = useAppStore();
const columns = computed(() => store.state.board.columns);
const isTaskOpen = computed(() => route.name === 'task');
const goToTask = (task: TaskType) =>
  router.push({ name: 'task', params: { id: task.id } });
const closeTask = () => router.push({ name: 'board' });
</script>

<template>
  <div class="board-view">
    <div v-if="columns" class="flex flex-row flex-start">
      <div v-for="column in columns" :key="column.id" class="column">
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div v-if="column.tasks">
          <div
            v-for="task in column.tasks"
            :key="task.id"
            class="task"
            @click="goToTask(task)"
          >
            <span class="flex-shrink-0 w-full font-bold">
              {{ task.name }}
            </span>
            <p v-if="task.description" class="flex-shrink-0 w-full mt-1">
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isTaskOpen" class="task-modal" @click.self="closeTask">
      <router-view />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.board-view {
  @apply p-4 h-full overflow-auto bg-green-500;
}

.column {
  @apply mr-4 p-2 text-left bg-gray-300 shadow-lg rounded;

  min-width: 350px;
}

.task {
  @apply flex items-center flex-wrap;
  @apply mb-2 py-2 px-2 rounded;
  @apply bg-white text-gray-900 shadow no-underline cursor-pointer;
}

.task-modal {
  @apply absolute inset-0 bg-black bg-opacity-50;
}
</style>
