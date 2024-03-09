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
const tileImage = computed(() => `url('${import.meta.env.BASE_URL}tiles/${props.tile.toLowerCase()}.svg')`)
</script>

<template>
  <span
    class="tile"
    :class="{
      'tile-reversed': props.reversed,
      'tile-sided': props.sided,
      'tile-tsumogiri': props.tsumogiri,
      'tile-claimed': props.claimed,
      'tile-small': props.small,
      'tile-transparent': props.tile === '' || props.transparent,
      'tile-shimo': props.direction === 1,
      'tile-toimen': props.direction === 2,
      'tile-kami': props.direction === 3,
      'tile-prob': props.prob,
    }"
  >
    <span
      class="tile-icon"
      :style="{
        backgroundImage: tileImage,
      }"
    />
  </span>
</template>

<style scoped>
.tile {
  position: relative;
  display: inline-block;
  width: var(--tile-width);
  height: var(--tile-height);
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem rgb(0 0 0 / 25%);
  transition: transform 0.25s ease-in-out;
}

.tile-icon {
  display: block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.tile-reversed {
  background-color: var(--tile-reversed-color);
}

.tile-reversed .tile-icon {
  visibility: hidden;
}

.tile-tsumogiri {
  background-color: var(--tile-reversed-color);
  filter: brightness(0.7);
}

.tile-claimed {
  filter: brightness(0.4);
}

.tile-small {
  --tile-height: var(--tile-height-small);
  --tile-width: var(--tile-width-small);
}

.tile-transparent {
  background-color: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.tile-shimo {
  margin-inline: calc((var(--tile-height) - var(--tile-width)) / 2);
  margin-top: calc(var(--tile-width) - var(--tile-height));
  transform: rotate(-90deg)
    translateX(calc((var(--tile-width) - var(--tile-height)) / 2));
}

.tile-toimen {
  transform: rotate(-180deg);
}

.tile-kami {
  margin-inline: calc((var(--tile-height) - var(--tile-width)) / 2);
  margin-top: calc(var(--tile-width) - var(--tile-height));
  transform: rotate(-270deg)
    translateX(calc((var(--tile-height) - var(--tile-width)) / 2));
}

.tile-sided {
  margin-inline: calc((var(--tile-height) - var(--tile-width)) / 2);
  transform: rotate(-90deg)
    translateX(calc((var(--tile-width) - var(--tile-height)) / 2));
}

.tile-shimo.tile-sided {
  margin-top: 0;
  transform: rotate(-180deg)
    translateX(calc((var(--tile-width) - var(--tile-height)) / 2));
}

.tile-toimen.tile-sided {
  transform: rotate(-270deg)
    translateX(calc((var(--tile-width) - var(--tile-height)) / 2));
}

.tile-kami.tile-sided {
  margin-bottom: calc(var(--tile-height) - var(--tile-width));
  transform: translateX(calc((var(--tile-width) - var(--tile-height)) / 2))
    translateY(calc(var(--tile-height) - var(--tile-width)));
}

.tile-prob::before {
  position: absolute;
  /* stylelint-disable function-no-unknown */
  /* stylelint-disable value-keyword-case */
  top: v-bind(probMarginTop);
  /* stylelint-enable function-no-unknown */
  /* stylelint-enable value-keyword-case */
  left: 50%;
  z-index: 1;
  width: 50%;
  /* stylelint-disable function-no-unknown */
  /* stylelint-disable value-keyword-case */
  height: v-bind(probHeight);
  /* stylelint-enable function-no-unknown */
  /* stylelint-enable value-keyword-case */
  pointer-events: none;
  content: '';
  background-color: var(--tile-prob-color);
  transition: transform 0.25s ease-in-out;
  transform: translate(-50%, -50%);
}
</style>
