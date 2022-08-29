<script setup>
const msg = 'Hello World';
</script>

<template>
  <!-- Renders it to a child element of the `body` -->
  <Teleport to="body">
    <span>{{ msg }}</span>
  </Teleport>
</template>
