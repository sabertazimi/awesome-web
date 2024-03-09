<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button, Tile, TileGroup } from '@/components'
import type { GameInfo } from '@/mortal'
import { TileUtils } from '@/mortal'

const props = defineProps<{
  info: GameInfo
}>()

const { t } = useI18n()
</script>

<template>
  <div class="info">
    <Button class="info-round">
      {{
        `${t(props.info.bakaze)}${props.info.kyoku}${props.info.honba ? `-${props.info.honba}` : ''}`
      }}
      {{ props.info.kyotaku ? `${props.info.kyotaku * 1000}` : '' }}
    </Button>
    <TileGroup class="info-doras">
      <template v-for="(_, index) in 5" :key="`dora-${index}`">
        <Tile
          v-if="props.info.doraMarkers[index]"
          :tile="props.info.doraMarkers[index]"
          small
        />
        <Tile v-else reversed small />
      </template>
    </TileGroup>
    <span
      v-for="(_, index) in 4"
      :key="`info-p${index}`"
      class="info-player"
      :class="`info-p${index}`"
    >
      {{
        `${t(TileUtils.Winds[Math.abs(info.heroId + index - info.kyoku + 1) % 4])} ${props.info.scores[index]}`
      }}
    </span>
  </div>
</template>

<style scoped>
.info {
  display: grid;
  grid-template-columns: calc(var(--tile-width)) calc(var(--tile-width) * 4) calc(
      var(--tile-width)
    );
  grid-template-rows: repeat(5, calc(var(--tile-width) * 6 / 5));
  grid-template-areas:
    'p3 p2      p2'
    'p3 round   p1'
    'p3 tiles   p1'
    'p3 doras   p1'
    'p0 p0      p1';
  margin: auto;
  background: var(--color-background-dark);
  color: var(--color-text-dark);
}

.info-round {
  grid-area: round;
  justify-self: center;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: center;
}

.info-doras {
  grid-area: doras;
  align-self: center;
  justify-self: center;
}

.info-player {
  display: flex;
  justify-content: space-between;
}

.info-p0 {
  grid-area: p0;
  margin: auto 10px;
}
.info-p1 {
  grid-area: p1;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin: 10px auto;
}

.info-p2 {
  grid-area: p2;
  transform: rotate(180deg);
  margin: auto 10px;
}

.info-p3 {
  grid-area: p3;
  writing-mode: vertical-rl;
  margin: 10px auto;
}
</style>
