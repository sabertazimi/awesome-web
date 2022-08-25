<script setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <!-- eslint-disable-next-line vue/valid-v-model -->
  <input v-model.capitalize="value" type="text" />
</template>
