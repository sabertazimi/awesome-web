<script setup lang="ts">
import Tile from './Tile.vue'
import TileGroup from './TileGroup.vue'

const props = defineProps<{
  tile: string
  direction?: number
}>()
</script>

<template>
  <TileGroup :direction="props.direction">
    <Tile reversed :direction="props.direction" />
    <Tile :tile="props.tile" :direction="props.direction" />
    <Tile :tile="props.tile" :direction="props.direction" />
    <Tile reversed :direction="props.direction" />
  </TileGroup>
</template>

<style scoped></style>
