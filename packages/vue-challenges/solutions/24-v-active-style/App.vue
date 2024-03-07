<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CSSProperties } from 'vue'

interface Binding {
  value: [CSSProperties, () => boolean]
}

/**
 * Implement the custom directive
 * Make sure the list item text color changes to red when the `toggleTab` is toggled
 *
 */
const vActiveStyle = {
  mounted(el: HTMLLIElement, { value }: Binding) {
    const [styles, fn] = value
    watch(
      fn,
      newValue => {
        for (const [name, style] of Object.entries(styles)) {
          el.style[name] = newValue ? style : ''
        }
      },
      {
        immediate: true,
      }
    )
  },
}

const list = [1, 2, 3, 4, 5, 6, 7, 8]
const activeTab = ref(0)
function toggleTab(index: number) {
  activeTab.value = index
}
</script>

<template>
  <ul>
    <li
      v-for="(item, index) in list"
      :key="index"
      v-active-style="[{ color: 'red' }, () => activeTab === index]"
      @click="toggleTab(index)"
    >
      {{ item }}
    </li>
  </ul>
</template>
