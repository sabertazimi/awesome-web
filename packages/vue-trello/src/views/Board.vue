<script setup lang="ts">
import HelloWorld from 'src/components/HelloWorld.vue';
</script>

<template>
  <HelloWorld msg="Vue Trello App" />
  <router-link class="router-link" :to="{ name: 'task', params: { id: 123 } }">
    To task
  </router-link>
  |
  <router-link class="router-link" :to="{ name: 'board' }">
    Back home
  </router-link>
  <router-view />
</template>
