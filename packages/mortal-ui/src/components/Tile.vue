<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    tile?: string
    reversed?: boolean
    sided?: boolean
    transparent?: boolean
    tsumogiri?: boolean
    claimed?: boolean
    small?: boolean
    direction?: number
    prob?: number
  }>(),
  {
    tile: '5z', // Default for Ankan
  },
)

const probHeight = computed(() => `${(props.prob || 0) * 100}%`)
const probMarginTop = computed(() => `-${((props.prob || 0) * 100) / 2}%`)
</script>

<template>
  <span
    class="tile"
    :class="{
      'tile--reversed': props.reversed,
      'tile--sided': props.sided,
      'tile--tsumogiri': props.tsumogiri,
      'tile--claimed': props.claimed,
      'tile--small': props.small,
      'tile--transparent': props.tile === '' || props.transparent,
      'tile--shimo': props.direction === 1,
      'tile--toimen': props.direction === 2,
      'tile--kami': props.direction === 3,
      'tile--prob': props.prob,
    }"
  >
    <span
      class="tile-icon"
      :style="{
        backgroundImage: `url('/tiles/${props.tile.toLowerCase()}.svg')`,
      }"
    />
  </span>
</template>

<style scoped>
.tile {
  display: inline-block;
  height: var(--tile-height);
  width: var(--tile-width);
  position: relative;
  border: 1px solid #000;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.25);
  background-color: #fff;
  transition: transform 0.25s ease-in-out;
}

.tile--reversed {
  background-color: var(--tile-reversed-color);
}

.tile--reversed .tile-icon {
  visibility: hidden;
}

.tile--tsumogiri {
  filter: brightness(0.7);
  background-color: var(--tile-reversed-color);
}

.tile--claimed {
  filter: brightness(0.4);
}

.tile--small {
  --tile-height: var(--tile-height-small);
  --tile-width: var(--tile-width-small);
}

.tile--transparent {
  border: none;
  border-radius: 0;
  box-shadow: none;
  background-color: transparent;
}

.tile--shimo {
  transform: rotate(-90deg)
    translateX(calc((var(--tile-width) - var(--tile-height)) / 2));
  margin-inline: calc((var(--tile-height) - var(--tile-width)) / 2);
  margin-top: calc(var(--tile-width) - var(--tile-height));
}

.tile--toimen {
  transform: rotate(-180deg);
}

.tile--kami {
  transform: rotate(-270deg)
    translateX(calc((var(--tile-height) - var(--tile-width)) / 2));
  margin-inline: calc((var(--tile-height) - var(--tile-width)) / 2);
  margin-top: calc(var(--tile-width) - var(--tile-height));
}

.tile--sided {
  transform: rotate(-90deg)
    translateX(calc((var(--tile-width) - var(--tile-height)) / 2));
  margin-inline: calc((var(--tile-height) - var(--tile-width)) / 2);
}

.tile--shimo.tile--sided {
  transform: rotate(-180deg)
    translateX(calc((var(--tile-width) - var(--tile-height)) / 2));
  margin-top: 0;
}

.tile--toimen.tile--sided {
  transform: rotate(-270deg)
    translateX(calc((var(--tile-width) - var(--tile-height)) / 2));
}

.tile--kami.tile--sided {
  transform: translateX(calc((var(--tile-width) - var(--tile-height)) / 2))
    translateY(calc(var(--tile-height) - var(--tile-width)));
  margin-bottom: calc(var(--tile-height) - var(--tile-width));
}

.tile-icon {
  display: block;
  height: 100%;
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.tile--prob::before {
  content: '';
  position: absolute;
  top: v-bind(probMarginTop);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: v-bind(probHeight);
  background-color: var(--tile-prob-color);
  z-index: 1;
  pointer-events: none;
  transition: transform 0.25s ease-in-out;
}
</style>
