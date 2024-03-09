<script setup lang="ts">
const props = defineProps<{ stacked?: boolean, direction?: number }>()
</script>

<template>
  <span
    class="tile-group"
    :class="{
      'tile-group-stacked': props.stacked,
      'tile-group-shimo': props.direction === 1,
      'tile-group-toimen': props.direction === 2,
      'tile-group-kami': props.direction === 3,
    }"
  >
    <slot />
  </span>
</template>

<style scoped>
.tile-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tile-group-shimo {
  flex-flow: column-reverse wrap;
}

.tile-group-toimen {
  flex-flow: row-reverse wrap-reverse;
}

.tile-group-kami {
  flex-flow: column wrap-reverse;
}

.tile-group-stacked {
  flex-direction: column;
}

.tile-group-shimo.tile-group-stacked {
  flex-direction: row;
}

.tile-group-toimen.tile-group-stacked {
  flex-direction: column-reverse;
}

.tile-group-kami.tile-group-stacked {
  flex-direction: row-reverse;
}
</style>
