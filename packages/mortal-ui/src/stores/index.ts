import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMortalStore = defineStore('mortal', () => {
  const round = ref(0)
  const turn = ref(0)
  return { round, turn }
})
