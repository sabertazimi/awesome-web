<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue';

const timer = inject('timer', ref(0));
const count = inject('count', ref(0));

onMounted(() => {
  timer.value = window.setInterval(() => {
    count.value++;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer.value);
});
</script>

<template>
  <div>
    <p>Child Component: {{ count }}</p>
  </div>
</template>
