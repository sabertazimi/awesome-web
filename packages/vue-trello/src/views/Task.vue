<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from 'src/store';

defineProps<{ id: string }>();

const store = useAppStore();
const columns = computed(() => store.state.board.columns);
</script>

<template>
  <div v-if="columns" class="task-view">
    <div v-for="column in columns" :key="column.name">
      <ul v-if="column.tasks">
        <li v-for="task in column.tasks" :key="task.id">
          {{ task.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.task-view {
  @apply relative flex flex-row max-w-3xl m-32 mx-auto py-4 text-left rounded shadow-xl;
}
</style>
