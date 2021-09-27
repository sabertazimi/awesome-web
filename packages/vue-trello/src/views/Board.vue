<script setup lang="ts">
import HelloWorld from 'src/components/HelloWorld.vue';
</script>

<template>
  <div class="board-view">
    <router-link
      class="router-link"
      :to="{ name: 'task', params: { id: 123 } }"
    >
      To task
    </router-link>
    |
    <router-link class="router-link" :to="{ name: 'board' }">
      Back home
    </router-link>
    <router-view />
  </div>
</template>

<style lang="postcss" scoped>
.board-view {
  @apply p-4 h-full overflow-auto;
}
</style>
