<script setup lang="ts">
interface TreeData {
  key: string;
  title: string;
  children: TreeData[];
}
defineProps<{ data: TreeData[] }>();
</script>

<template>
  <div></div>
</template>
