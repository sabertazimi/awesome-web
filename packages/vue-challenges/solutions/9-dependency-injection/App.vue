<script setup lang="ts">
import { provide, ref } from 'vue'
import Child from './Child.vue'
const count = ref(1)
provide('count', count)
setInterval(() => {
  count.value++
}, 1000)
</script>

<template>
  <Child />
</template>
