<script setup lang="ts">
import { defineCustomElement, onMounted } from 'vue'

/**
 * Implement the code to create a custom element.
 * Make the output of page show "Hello Vue.js".
 */
const VueJs = defineCustomElement({
  props: {
    message: {
      type: String,
      default: '',
    },
  },
  template: `<span>{{ message }}</span>`,
})

customElements.define('vue-js', VueJs)

onMounted(() => {
  document.getElementById('app')!.innerHTML =
    '<vue-js message="Hello Vue.js"></vue-js>'
})
</script>

<template>
  <div id="app"></div>
</template>
