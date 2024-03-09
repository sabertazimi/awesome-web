<script setup lang="ts">
import { Claim, GameInfo, Score, Tile, TileGroup } from '@/components'
import type { UIState } from '@/mortal'

const props = defineProps<{
  state: UIState
}>()
</script>

<template>
  <div class="game">
    <GameInfo class="info" :info="props.state.info" />
    <template v-for="(_, i) in 4" :key="`player-${i}`">
      <TileGroup class="hand" :class="`hand-p${i}`" :direction="i">
        <Tile
          v-for="(tile, j) in props.state.hands[i].tehai"
          :key="`tehai-p${j}`"
          :tile="tile"
          :direction="i"
          :prob="i === 0 ? props.state.mortalReview.tehaiProb[tile] : 0"
        />
        <Tile
          :class="`tsumo-p${i}`"
          :tile="props.state.hands[i].tsumo"
          :direction="i"
          :prob="i === 0 ? props.state.mortalReview.tsumoProb : 0"
        />
        <Claim
          v-for="(claimed, j) in props.state.hands[i].claimed"
          :key="`claimed-p${i}-${j}`"
          :claim="claimed"
          :direction="i"
        />
      </TileGroup>
      <TileGroup class="discard" :class="`discard-p${i}`" :direction="i">
        <Tile
          v-for="(tile, j) in props.state.discards[i].tiles"
          :key="`discard-p${j}`"
          :tile="tile.pai"
          :sided="tile.type === 'riichi'"
          :tsumogiri="tile.tsumogiri"
          :claimed="tile.claimed"
          :direction="i"
        />
      </TileGroup>
    </template>
    <Score :info="props.state.info" />
  </div>
</template>

<style scoped>
.game {
  display: grid;
  grid-template:
    'hand-p3 hand-p2    hand-p2    hand-p2    hand-p2' 1fr
    'hand-p3 .          discard-p2 .          hand-p1' calc(
      var(--tile-height) * 3
    )
    'hand-p3 discard-p3 info       discard-p1 hand-p1' calc(
      var(--tile-width) * 6
    )
    'hand-p3 .          discard-p0 .          hand-p1' calc(
      var(--tile-height) * 3
    )
    'hand-p0 hand-p0    hand-p0    hand-p0    hand-p1' 1fr / 1fr calc(
      var(--tile-height) * 3
    )
    calc(var(--tile-width) * 6) calc(var(--tile-height) * 3) 1fr;
  width: 100%;
  height: 100%;
}

.info {
  grid-area: info;
}

.hand {
  background-color: var(--color-background-dark);
}

.hand-p0 {
  grid-area: hand-p0;
  padding-top: 4rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
}

.hand-p1 {
  grid-area: hand-p1;
  padding-bottom: 1rem;
  padding-left: 1rem;
}

.hand-p2 {
  grid-area: hand-p2;
  padding-right: 1rem;
  padding-bottom: 3rem;
}

.hand-p3 {
  grid-area: hand-p3;
  padding-top: 1rem;
  padding-right: 1rem;
}

.tsumo-p0,
.tsumo-p2 {
  margin-inline: 0.5rem;
}

.tsumo-p1,
.tsumo-p3 {
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

.discard {
  align-content: flex-start;
}

.discard-p0 {
  grid-area: discard-p0;
  width: calc(var(--tile-width) * 6.5);
}

.discard-p1 {
  grid-area: discard-p1;
  align-self: end;
  height: calc(var(--tile-width) * 6.5);
}

.discard-p2 {
  grid-area: discard-p2;
  justify-self: end;
  width: calc(var(--tile-width) * 6.5);
}

.discard-p3 {
  grid-area: discard-p3;
  height: calc(var(--tile-width) * 6.5);
}
</style>
