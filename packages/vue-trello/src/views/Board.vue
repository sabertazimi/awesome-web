<script setup lang="ts">
import HelloWorld from 'src/components/HelloWorld.vue';
</script>

<template>
  <div class="board-view">
    <router-link :to="{ name: 'task', params: { id: 123 } }">
      <button class="btn">To task</button>
    </router-link>
    <router-link :to="{ name: 'board' }">
      <button class="btn">Back home</button>
    </router-link>
    <router-view />
  </div>
</template>

<style lang="postcss" scoped>
.board-view {
  @apply p-4 h-full overflow-auto;
}
</style>
