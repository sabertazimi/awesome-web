<script setup lang="ts">
import { computed, effectScope, ref, watch, watchEffect } from 'vue'

const counter = ref(1)
const doubled = computed(() => counter.value * 2)

// use the `effectScope` API to make these effects stop together after being triggered once
const scope = effectScope()

scope.run(() => {
  watch(doubled, () => console.log(doubled.value))
  watchEffect(() => console.log(`Count: ${doubled.value}`))
})

counter.value = 2

setTimeout(() => {
  counter.value = 4
  scope.stop()
})
</script>

<template>
  <div>
    <p>
      {{ doubled }}
    </p>
  </div>
</template>
