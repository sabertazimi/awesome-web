<script setup>
import { customRef, watch } from 'vue'

/**
 * Implement the function
 */
function useDebouncedRef(value, delay = 200) {
  let timer = null

  return customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newValue) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        value = newValue
        trigger()
      }, delay)
    },
  }))
}

const text = useDebouncedRef('hello')

/**
 * Make sure the callback only gets triggered once when entered multiple times in a certain timeout
 */
watch(text, value => {
  console.log(value)
})
</script>

<template>
  <input v-model="text" />
</template>
