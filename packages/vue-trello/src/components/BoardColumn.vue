<script setup lang="ts">
import { useAppRouter } from 'src/router';
import { useAppStore } from 'src/store';
import type { BoardColumnType, TaskType } from 'src/services';

defineProps<{ columnIndex: number; column: BoardColumnType }>();

const router = useAppRouter();
const store = useAppStore();

const goToTask = (task: TaskType) =>
  router.push({ name: 'task', params: { id: task.id } });

const createTask = (event: Event, columnIndex: number) => {
  const inputElement = event.target as HTMLInputElement;
  store.commit('createTask', {
    columnIndex,
    name: inputElement.value,
  });
  inputElement.value = '';
};

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

const deleteColumn = (id: string) => store.commit('deleteColumn', { id });

const pickupColumn = (event: DragEvent, fromColumnIndex: number) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    dataTransfer.dropEffect = 'move';
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('fromColumnIndex', fromColumnIndex.toString());
    dataTransfer.setData('type', 'column');
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
    draggable="true"
    @dragenter.prevent
    @dragover.prevent
    @drop="moveTaskOrColumn($event, columnIndex)"
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <div class="flex items-center mb-2 font-bold">
      <span>{{ column.name }}</span>
      <button
        class="btn-block danger ml-auto"
        @click.stop="deleteColumn(column.id)"
      >
        X
      </button>
    </div>
    <div v-if="column.tasks">
      <transition-group v-if="column.tasks">
        <div
          v-for="(task, taskIndex) in column.tasks"
          :key="task.id"
          class="task"
          draggable="true"
          @dragenter.prevent
          @dragover.prevent
          @dragstart="pickupTask($event, columnIndex, taskIndex)"
          @drop.stop="moveTaskOrColumn($event, columnIndex, taskIndex)"
          @click="goToTask(task)"
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
          <p
            v-if="task.description"
            class="flex-shrink-0 w-full mt-1 px-4 py-2"
          >
            {{ task.description }}
          </p>
        </div>
      </transition-group>
      <input
        type="text"
        class="task-input"
        placeholder="+ Enter new task ..."
        @keyup.enter="createTask($event, columnIndex)"
      />
    </div>
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

.task-input {
  @apply block w-full p-2 bg-transparent border border-transparent outline-none;
  @apply focus:border-green-500;
  @apply transition duration-500;
}
</style>
