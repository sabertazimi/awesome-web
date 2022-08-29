<script setup lang="ts">
import { ref } from 'vue';
import type { Directive } from 'vue';

const isInputElement = (target: unknown): target is HTMLInputElement =>
  target !== undefined;

const value = ref('Hello Vue.js');

/**
 * Implement a custom directive
 * Create a two-way binding on a form input element
 *
 */
const vOhModel: Directive<HTMLInputElement, string> = {
  mounted(el, binding) {
    el.value = binding.value;
    el.addEventListener('input', event => {
      if (isInputElement(event.target)) {
        value.value = event.target.value;
      }
    });
  },
};
</script>

<template>
  <input v-oh-model="value" type="text" />
  <p>{{ value }}</p>
</template>
