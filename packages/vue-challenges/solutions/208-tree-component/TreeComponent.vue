<script setup lang="ts">
interface TreeData {
  key: string;
  title: string;
  children: TreeData[];
}
defineProps<{ data: TreeData[] }>();
</script>

<template>
  <ul v-for="{ key, title, children } of data" :key="key">
    <li>{{ title }}</li>
    <TreeComponent v-if="Array.isArray(children)" :data="children" />
  </ul>
</template>
