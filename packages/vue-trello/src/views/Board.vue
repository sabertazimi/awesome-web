<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from 'src/store';
import BoardColumn from 'src/components/BoardColumn.vue';

const store = useAppStore();
const columns = computed(() => store.state.board.columns);

const createColumn = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.value) {
    store.commit('createColumn', { name: inputElement.value });
    inputElement.value = '';
  }
};
</script>

<template>
  <div class="board-view">
    <div v-if="columns" class="columns">
      <BoardColumn
        v-for="(column, columnIndex) in columns"
        :key="column.id"
        class="column"
        :column-index="columnIndex"
        :column="column"
      />
      <div class="column">
        <input
          type="text"
          class="column-input"
          placeholder="+ Enter new column ..."
          @keyup.enter="createColumn($event)"
        />
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
  @apply flex flex-col justify-start items-center;
  @apply p-4 h-full overflow-auto bg-green-500;
}

.columns {
  @apply flex flex-row justify-center items-start flex-wrap md:justify-start;
}

.column {
  @apply mr-4 mb-4 p-2 text-left bg-gray-300 shadow-lg;

  min-width: 350px;
}

.column-input {
  @apply block w-full p-2 bg-white border border-transparent outline-none;
  @apply focus:border-green-500;
  @apply transition duration-500;
}
</style>
