<script setup lang="ts">
import { inject, onMounted } from 'vue';

const timer = inject('timer');
const count = inject('count');

onMounted(() => {
  timer.value = window.setInterval(() => {
    count.value++;
  }, 1000);
});
</script>

<template>
  <div>
    <p>Child Component: {{ count }}</p>
  </div>
</template>
