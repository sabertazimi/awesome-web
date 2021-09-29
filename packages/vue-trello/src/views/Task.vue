<script setup lang="ts">
import { computed } from 'vue';
import { useAppRouter } from 'src/router';
import { useAppStore } from 'src/store';
import type { TaskType } from 'src/services';

const props = defineProps<{ id: string }>();
const router = useAppRouter();
const store = useAppStore();
const task = computed(() => store.getters.getTask(props.id));

const close = () => router.push({ name: 'board' });

const updateTask = (event: React.FormEvent, task: TaskType, key: string) => {
  store.commit('updateTask', {
    task,
    key,
    value: (event.target as HTMLInputElement).value,
  });
};
</script>

<template>
  <div class="task-modal" @click.self="close">
    <div class="task-view">
      <input
        type="text"
        class="task-input"
        :value="task.name"
        @change="updateTask($event, task, 'name')"
      />
      <textarea
        id="task-description"
        name="task-description"
        class="task-description"
        placeholder="Task description here ..."
        :rows="10"
        :cols="30"
        :value="task.description"
        @change="updateTask($event, task, 'description')"
      />
      <button class="btn ml-auto" @click="close">Close</button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.task-modal {
  @apply absolute inset-0 bg-black bg-opacity-50;
}
.task-view {
  @apply relative inset-0 flex flex-col max-w-3xl m-32 mx-auto p-8 text-left bg-white shadow-2xl;
}

.task-input {
  @apply block w-full text-xl font-bold outline-none border border-transparent;
  @apply focus:border-green-500 focus:outline-none;
  @apply transition duration-500;
}

.task-description {
  @apply relative w-full my-4 p-2 h-64 border bg-transparent;
  @apply focus:border-green-500 focus:outline-none;
  @apply transition duration-500;
}
</style>
