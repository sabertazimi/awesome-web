<script setup lang="ts">
/**
 * Implement the custom directive
 * Make sure the `onClick` method only gets triggered once when clicked many times quickly
 * And you also need to support the debounce delay time option. e.g `v-debounce-click:ms`
 *
 */

const debounce = (fn: Function, delay: number) => {
  let timer = null;

  return function () {
    if (timer) return;
    fn();
    timer = setTimeout(() => (timer = clearTimeout(timer)), delay);
  };
};

const vDebounceClick = {
  mounted(el: HTMLElement, { value, arg }: { value: Function; arg: number }) {
    el.addEventListener('click', debounce(value, arg));
  },
};

function onClick() {
  console.log('Only triggered once when clicked many times quickly');
}
</script>

<template>
  <button v-debounce-click:200="onClick">Click on it many times quickly</button>
</template>
