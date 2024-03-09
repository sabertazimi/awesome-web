<script setup lang="ts">
import Tile from './Tile.vue'
import TileGroup from './TileGroup.vue'

const props = defineProps<{
  tile: string
  from: number
  direction?: number
}>()
</script>

<template>
  <TileGroup :direction="props.direction">
    <Tile
      v-for="(_, index) in 3"
      :key="index"
      :tile="props.tile"
      :sided="index + props.from === 3"
      :direction="props.direction"
    />
  </TileGroup>
</template>
