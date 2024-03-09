<script setup lang="ts">
import Tile from './Tile.vue'
import TileGroup from './TileGroup.vue'

const props = defineProps<{
  tile: string
  from: Array<string>
  direction?: number
}>()
</script>

<template>
  <TileGroup :direction="props.direction">
    <Tile :tile="props.tile" sided :direction="props.direction" />
    <Tile
      v-for="(fromTile, index) in props.from"
      :key="index"
      :tile="fromTile"
      :direction="props.direction"
    />
  </TileGroup>
</template>

<style scoped></style>
