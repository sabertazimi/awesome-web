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
    <template v-for="(_, i) in 3">
      <TileGroup
        v-if="i + props.from === 3"
        :key="`tile-group-${i}`"
        class="tile-group-stacked"
        :class="{
          'tile-group-shimo': props.direction === 1,
          'tile-group-toimen': props.direction === 2,
          'tile-group-kami': props.direction === 3,
        }"
        :direction="props.direction"
        stacked
      >
        <Tile
          v-for="(__, j) in 2"
          :key="`tile-${i}.${j}`"
          class="tile-sided"
          :class="{
            'tile-shimo': props.direction === 1,
            'tile-toimen': props.direction === 2,
            'tile-kami': props.direction === 3,
          }"
          :tile="props.tile"
          :direction="props.direction"
          sided
        />
      </TileGroup>
      <Tile
        v-else
        :key="`tile-${i}`"
        :tile="props.tile"
        :direction="props.direction"
      />
    </template>
  </TileGroup>
</template>

<style scoped>
.tile-sided {
  margin-top: calc(var(--tile-width) - var(--tile-height));
}

.tile-shimo.tile-sided {
  margin-inline: 0;
}

.tile-kami.tile-sided {
  margin-inline: 0;
}

.tile-group-stacked {
  transform: translateY(calc((var(--tile-width) - var(--tile-height)) / 2));
}

.tile-group-shimo.tile-group-stacked {
  transform: translateX(calc(var(--tile-width) - var(--tile-height)));
}

.tile-group-toimen.tile-group-stacked {
  transform: translateY(calc((var(--tile-height) - var(--tile-width)) * 1.5));
}

.tile-group-kami.tile-group-stacked {
  transform: translateX(calc(var(--tile-height) - var(--tile-width)));
}
</style>
