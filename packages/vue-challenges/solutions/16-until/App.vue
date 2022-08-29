<script setup lang="ts">
import { ref, watch } from 'vue';

const count = ref(0);

/**
 * Implement the until function
 */

function until(initial) {
  function toBe(value) {
    return new Promise(resolve => {
      const stop = watch(initial, newValue => {
        if (newValue === value) {
          resolve();
          stop();
        }
      });
    });
  }

  return {
    toBe,
  };
}

async function increase() {
  count.value = 0;
  setInterval(() => {
    count.value++;
  }, 1000);
  await until(count).toBe(3);
  console.log(count.value === 3); // Make sure the output is true
}
</script>

<template>
  <p @click="increase">Increase</p>
</template>
