<script setup lang="ts">
import { ref } from 'vue';

interface UseCounterOptions {
  min: number;
  max: number;
}

/**
 * Implement the composable function
 * Make sure the function works correctly
 */
function useCounter(
  initialValue = 0,
  options: UseCounterOptions = { min: 0, max: 10 }
) {
  const count = ref(initialValue);
  const inc = () => {
    if (count.value < options.max) count.value++;
  };
  const dec = () => {
    if (count.value > options.min) count.value--;
  };
  const reset = () => (count.value = initialValue);
  return { count, inc, dec, reset };
}

const { count, inc, dec, reset } = useCounter(0, { min: 0, max: 10 });
</script>

<template>
  <p>Count: {{ count }}</p>
  <button @click="inc">inc</button>
  <button @click="dec">dec</button>
  <button @click="reset">reset</button>
</template>
