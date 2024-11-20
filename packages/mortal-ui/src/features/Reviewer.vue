<script setup lang="ts">
import { Advice } from '@/components'
import { createMachine } from '@/mortal'
import { useMortalStore } from '@/stores'
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Controls from './Controls.vue'
import Game from './Game.vue'

const { t } = useI18n()

useHead({
  title: t('title'),
})

const res = await fetch(`${import.meta.env.BASE_URL}e2e/report.json`)
const log = await res.json()
const machine = createMachine(log)
machine.run()

const store = useMortalStore()
const state = computed(() => machine.state[store.round][store.turn])
const review = computed(() => machine.state[store.round][store.turn].mortalReview)
</script>

<template>
  <main>
    <Game :state="state" />
  </main>

  <aside>
    <Controls :rounds="machine.rounds" :turns="machine.turns" />
    <Advice :review="review" />
  </aside>
</template>

<style scoped>
main {
  line-height: 1.5;
}

aside {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-around;
  margin-top: 2rem;
}

@media (width >= 1024px) {
  main {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
