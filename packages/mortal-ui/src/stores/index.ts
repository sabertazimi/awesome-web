import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMortalStore = defineStore('mortal', () => {
  const round = ref(0)
  const turn = ref(0)
  return { round, turn }
})
