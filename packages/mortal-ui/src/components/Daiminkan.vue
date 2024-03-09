<script setup lang="ts">
import { computed } from 'vue'
import Tile from './Tile.vue'
import TileGroup from './TileGroup.vue'

const props = defineProps<{
  tile: string
  from: number
  direction?: number
}>()

const adjustedFrom = computed(() => (props.from === 3 ? 4 : props.from))
</script>

<template>
  <TileGroup :direction="props.direction">
    <Tile
      v-for="(_, index) in 4"
      :key="index"
      :tile="props.tile"
      :sided="index + adjustedFrom === 4"
      :direction="props.direction"
    />
  </TileGroup>
</template>
