<script setup lang="ts">
import { useAppRouter } from 'src/router';
import { useAppStore } from 'src/store';
import type { TaskType } from 'src/services';

defineProps<{ columnIndex: number; taskIndex: number; task: TaskType }>();

const store = useAppStore();
const router = useAppRouter();

const goToTask = (task: TaskType) =>
  router.push({ name: 'task', params: { id: task.id } });

const deleteTask = (columnIndex: number, taskId: string) =>
  store.commit('deleteTask', { columnIndex, taskId });

const pickupTask = (
  event: DragEvent,
  fromColumnIndex: number,
  fromTaskIndex: number
) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    dataTransfer.dropEffect = 'move';
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('fromColumnIndex', fromColumnIndex.toString());
    dataTransfer.setData('fromTaskIndex', fromTaskIndex.toString());
  }
};

const moveTask = (
  event: React.DragEvent,
  toColumnIndex: number,
  toTaskIndex?: number
) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    const fromColumnIndex = parseInt(dataTransfer.getData('fromColumnIndex'));
    const fromTaskIndex = parseInt(dataTransfer.getData('fromTaskIndex'));
    store.commit('moveTask', {
      fromColumnIndex,
      toColumnIndex,
      fromTaskIndex,
      toTaskIndex,
    });
  }
};

const moveColumn = (event: React.DragEvent, toColumnIndex: number) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    const fromColumnIndex = parseInt(dataTransfer.getData('fromColumnIndex'));
    store.commit('moveColumn', { fromColumnIndex, toColumnIndex });
  }
};

const moveTaskOrColumn = (
  event: React.DragEvent,
  toColumnIndex: number,
  toTaskIndex?: number
) => {
  const dataTransfer = event.dataTransfer;
  const type = dataTransfer.getData('type');

  if (type === 'column') {
    moveColumn(event, toColumnIndex);
  } else {
    moveTask(event, toColumnIndex, toTaskIndex);
  }
};
</script>

<template>
  <div
    class="task"
    draggable="true"
    @dragenter.prevent
    @dragover.prevent
    @dragstart.stop="pickupTask($event, columnIndex, taskIndex)"
    @drop.stop="moveTaskOrColumn($event, columnIndex, taskIndex)"
    @click.stop="goToTask(task)"
  >
    <div class="task-name">
      <span class="px-4 py-2">{{ task.name }}</span>
      <button
        class="btn-block ml-auto"
        @click.stop="deleteTask(columnIndex, task.id)"
      >
        X
      </button>
    </div>
    <p v-if="task.description" class="flex-shrink-0 w-full mt-1 px-4 py-2">
      {{ task.description }}
    </p>
  </div>
</template>

<style scoped>
.task {
  @apply flex items-center flex-wrap mb-2;
  @apply bg-white text-gray-900 shadow no-underline cursor-pointer;
}

.task-name {
  @apply flex flex-row items-center flex-shrink-0 w-full font-bold;
}
</style>
