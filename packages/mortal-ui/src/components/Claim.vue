<script setup lang="ts">
import type { ClaimEvent } from '@/mortal'
import { TileUtils } from '@/mortal'

const props = defineProps<{
  claim: ClaimEvent
  direction?: number
}>()
</script>

<template>
  <Chi
    v-if="props.claim.type === 'chi'"
    :tile="TileUtils.get(props.claim.pai)"
    :from="props.claim.consumed.map(tile => TileUtils.get(tile))"
    :direction="props.direction"
  />
  <Pon
    v-else-if="props.claim.type === 'pon'"
    :tile="TileUtils.get(props.claim.pai)"
    :from="TileUtils.getRelativePosition(props.claim.actor, props.claim.target)"
    :direction="props.direction"
  />
  <Daiminkan
    v-else-if="props.claim.type === 'daiminkan'"
    :tile="TileUtils.get(props.claim.pai)"
    :from="TileUtils.getRelativePosition(props.claim.actor, props.claim.target)"
    :direction="props.direction"
  />
  <Kakan
    v-else-if="props.claim.type === 'kakan'"
    :tile="TileUtils.get(props.claim.pai)"
    :from="TileUtils.getRelativePosition(props.claim.actor, props.claim.target)"
    :direction="props.direction"
  />
  <Ankan
    v-else-if="props.claim.type === 'ankan'"
    :tile="TileUtils.get(props.claim.pai)"
    :direction="props.direction"
  />
</template>

<style scoped></style>
