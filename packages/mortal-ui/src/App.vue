<script setup lang="ts">
import { LoadingSquare } from '@/components'
import { Reviewer } from '@/features'
</script>

<template>
  <suspense>
    <template #default>
      <Reviewer />
    </template>
    <template #fallback>
      <LoadingSquare />
    </template>
  </suspense>
</template>

<style scoped>
</style>
