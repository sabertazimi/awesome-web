<script setup lang="ts">
import { computed } from 'vue';
import { useAppRouter } from 'src/router';
import { useAppStore } from 'src/store';
import type { BoardColumnType, TaskType } from 'src/services';

const router = useAppRouter();
const store = useAppStore();
const columns = computed(() => store.state.board.columns);

const goToTask = (task: TaskType) =>
  router.push({ name: 'task', params: { id: task.id } });

const createTask = (event: Event, tasks: TaskType[]) => {
  const inputElement = event.target as HTMLInputElement;
  store.commit('createTask', {
    tasks,
    name: inputElement.value,
  });
  inputElement.value = '';
};

const deleteTask = (tasks: TaskType[], id: string) =>
  store.commit('deleteTask', { tasks, id });

const pickupTask = (
  event: DragEvent,
  fromColumnIndex: number,
  taskIndex: number
) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    dataTransfer.dropEffect = 'move';
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('fromColumnIndex', fromColumnIndex.toString());
    dataTransfer.setData('fromTaskIndex', taskIndex.toString());
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
  <div class="board-view">
    <div v-if="columns" class="columns">
      <div
        v-for="(column, columnIndex) in columns"
        :key="column.id"
        class="column"
        draggable="true"
        @dragenter.prevent
        @dragover.prevent
        @drop="moveTaskOrColumn($event, columnIndex)"
        @dragstart.self="pickupColumn($event, columnIndex)"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
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
                <span class="px-4 py-2">
                  {{ task.name }}
                </span>
                <button
                  class="btn-block ml-auto"
                  @click.stop="deleteTask(column.tasks, task.id)"
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
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="postcss" scoped>
.board-view {
  @apply flex flex-row justify-center items-start;
  @apply p-4 h-full overflow-auto bg-green-500;
}

.columns {
  @apply flex flex-row justify-center items-start flex-wrap md:justify-start;
}

.column {
  @apply mr-4 mb-4 p-2 text-left bg-gray-300 shadow-lg;

  min-width: 350px;
}

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
