<script setup lang="ts">
import { ref, vModelText } from 'vue';

vModelText.updated = (el, { value, modifiers: { capitalize } }) => {
  if (capitalize && Object.hasOwn(value, 0)) {
    el.value = value[0].toUpperCase() + value.slice(1);
  }
};

const value = ref('');
</script>

<template>
  <!-- eslint-disable-next-line vue/valid-v-model -->
  <input v-model.capitalize="value" type="text" />
</template>
